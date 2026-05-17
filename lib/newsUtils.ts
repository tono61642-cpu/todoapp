import { NewsArticle, SnsScore } from "@/types/news";

const CATEGORIES: Record<string, string[]> = {
  テクノロジー: ["tech", "technology", "ai", "digital", "software", "apple", "google"],
  経済: ["business", "economy", "finance", "market", "stock", "startup"],
  スポーツ: ["sport", "soccer", "baseball", "tennis", "olympic"],
  政治: ["politics", "government", "election", "policy"],
  エンタメ: ["entertainment", "music", "movie", "celebrity", "anime"],
  環境: ["environment", "climate", "green", "energy", "carbon"],
  健康: ["health", "medical", "covid", "hospital", "wellness"],
};

export function detectCategory(title: string, description: string | null): string {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => text.includes(kw))) return category;
  }
  return "一般";
}

export function generateSnsScore(article: {
  publishedAt: string;
  title: string;
  rank: number;
}): SnsScore {
  const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / 3600000;
  const recencyBoost = Math.max(0, 1 - hoursAgo / 24);
  const titleLength = article.title.length;
  const seed = titleLength * 1234 + article.rank * 567;
  const pseudoRandom = (n: number) => {
    let h = seed ^ (n * 2654435769);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    return Math.abs(h ^ (h >>> 16)) % 1000;
  };

  const base = Math.floor(30000 + pseudoRandom(1) * 100 + recencyBoost * 50000);
  const twitter = Math.floor(base * (0.45 + (pseudoRandom(2) % 20) / 100));
  const facebook = Math.floor(base * (0.25 + (pseudoRandom(3) % 15) / 100));
  const line = base - twitter - facebook;

  const trendOptions: Array<"up" | "down" | "stable"> = ["up", "up", "up", "stable", "down"];
  const trend = trendOptions[pseudoRandom(4) % trendOptions.length];
  const trendPercent = Math.floor(10 + pseudoRandom(5) % 290);

  return { total: base, twitter, facebook, line, trend, trendPercent };
}

export function processArticles(rawArticles: Array<{
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}>): NewsArticle[] {
  return rawArticles.slice(0, 5).map((article, index) => {
    const rank = index + 1;
    const category = detectCategory(article.title, article.description);
    const snsScore = generateSnsScore({ publishedAt: article.publishedAt, title: article.title, rank });

    return {
      id: `article-${rank}`,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source,
      category,
      snsScore,
      rank,
    };
  });
}

export function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}千`;
  return n.toString();
}
