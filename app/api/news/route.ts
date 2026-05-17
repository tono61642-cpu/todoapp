import { NextResponse } from "next/server";
import { processArticles } from "@/lib/newsUtils";
import { mockArticles } from "@/lib/mockNews";
import { NewsResponse } from "@/types/news";

export const revalidate = 300;

const RSS_FEEDS = [
  { url: "https://news.yahoo.co.jp/rss/topics/top-picks.xml", source: "Yahoo!ニュース" },
  { url: "https://news.yahoo.co.jp/rss/topics/domestic.xml", source: "Yahoo!国内" },
  { url: "https://news.yahoo.co.jp/rss/topics/business.xml", source: "Yahoo!経済" },
  { url: "https://news.yahoo.co.jp/rss/topics/entertainment.xml", source: "Yahoo!エンタメ" },
  { url: "https://news.yahoo.co.jp/rss/topics/sports.xml", source: "Yahoo!スポーツ" },
  { url: "https://news.yahoo.co.jp/rss/topics/it.xml", source: "Yahoo!テクノロジー" },
];

function parseRSS(xml: string, sourceName: string) {
  const items: Array<{
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    source: { name: string };
  }> = [];

  const itemMatches = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g));
  for (const match of itemMatches) {
    const item = match[1];
    const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      ?? item.match(/<title>(.*?)<\/title>/)?.[1]
      ?? "";
    const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
      ?? item.match(/<description>(.*?)<\/description>/)?.[1]
      ?? null;
    const link = item.match(/<link>(.*?)<\/link>/)?.[1]
      ?? item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1]
      ?? "";
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? new Date().toISOString();

    // RSS内の画像URLを探す
    const urlToImage =
      item.match(/<media:content[^>]+url="([^"]+)"/)?.[1]
      ?? item.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1]
      ?? item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1]
      ?? null;

    if (title && link) {
      items.push({
        title: title.trim(),
        description: description?.trim() ?? null,
        url: link.trim(),
        urlToImage,
        publishedAt: new Date(pubDate).toISOString(),
        source: { name: sourceName },
      });
    }
  }
  return items;
}

// 記事URLからOG画像を取得（タイムアウト付き）
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)" },
    });
    clearTimeout(timeout);
    const html = await res.text();
    const match = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)
      ?? html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      RSS_FEEDS.map(({ url, source }) =>
        fetch(url, { next: { revalidate: 300 } })
          .then((r) => r.text())
          .then((xml) => parseRSS(xml, source))
      )
    );

    const allArticles = results
      .filter((r): r is PromiseFulfilledResult<ReturnType<typeof parseRSS>> => r.status === "fulfilled")
      .flatMap((r) => r.value);

    if (allArticles.length === 0) {
      const response: NewsResponse = {
        articles: mockArticles,
        updatedAt: new Date().toISOString(),
        source: "mock",
      };
      return NextResponse.json(response);
    }

    // 重複除去
    const seen = new Set<string>();
    const unique = allArticles.filter((a) => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    // 画像がない記事だけOG画像を並列取得（最大20件まで）
    const toFetch = unique.slice(0, 20).filter((a) => !a.urlToImage);
    const ogImages = await Promise.allSettled(
      toFetch.map((a) => fetchOgImage(a.url))
    );
    let ogIndex = 0;
    const withImages = unique.map((a) => {
      if (!a.urlToImage && ogIndex < toFetch.length) {
        const result = ogImages[ogIndex++];
        return { ...a, urlToImage: result.status === "fulfilled" ? result.value : null };
      }
      return a;
    });

    const articles = processArticles(withImages);
    const response: NewsResponse = {
      articles,
      updatedAt: new Date().toISOString(),
      source: "rss",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch RSS:", error);
    const response: NewsResponse = {
      articles: mockArticles,
      updatedAt: new Date().toISOString(),
      source: "mock",
    };
    return NextResponse.json(response);
  }
}
