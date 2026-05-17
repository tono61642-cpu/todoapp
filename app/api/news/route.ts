import { NextResponse } from "next/server";
import { processArticles } from "@/lib/newsUtils";
import { mockArticles } from "@/lib/mockNews";
import { NewsResponse } from "@/types/news";

export const revalidate = 300; // 5分キャッシュ

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    const response: NewsResponse = {
      articles: mockArticles,
      updatedAt: new Date().toISOString(),
      source: "mock",
    };
    return NextResponse.json(response);
  }

  try {
    const url = new URL("https://newsapi.org/v2/top-headlines");
    url.searchParams.set("country", "jp");
    url.searchParams.set("pageSize", "10");
    url.searchParams.set("apiKey", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`NewsAPI error: ${res.status}`);
    }

    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      const response: NewsResponse = {
        articles: mockArticles,
        updatedAt: new Date().toISOString(),
        source: "mock",
      };
      return NextResponse.json(response);
    }

    const articles = processArticles(data.articles);
    const response: NewsResponse = {
      articles,
      updatedAt: new Date().toISOString(),
      source: "api",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    const response: NewsResponse = {
      articles: mockArticles,
      updatedAt: new Date().toISOString(),
      source: "mock",
    };
    return NextResponse.json(response);
  }
}
