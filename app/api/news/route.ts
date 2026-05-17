import { NextResponse } from "next/server";
import { processArticles } from "@/lib/newsUtils";
import { mockArticles } from "@/lib/mockNews";
import { NewsResponse } from "@/types/news";

export const revalidate = 300;

const RSS_FEEDS = [
  { url: "https://www3.nhk.or.jp/rss/news/cat0.xml", source: "NHKニュース" },
  { url: "https://www3.nhk.or.jp/rss/news/cat5.xml", source: "NHK経済" },
  { url: "https://www3.nhk.or.jp/rss/news/cat7.xml", source: "NHKスポーツ" },
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

    if (title && link) {
      items.push({
        title: title.trim(),
        description: description?.trim() ?? null,
        url: link.trim(),
        urlToImage: null,
        publishedAt: new Date(pubDate).toISOString(),
        source: { name: sourceName },
      });
    }
  }
  return items;
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

    // 重複除去（同じタイトルを除く）
    const seen = new Set<string>();
    const unique = allArticles.filter((a) => {
      if (seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    });

    const articles = processArticles(unique);
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
