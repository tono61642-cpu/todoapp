export interface NewsArticle {
  id: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
  snsScore: SnsScore;
  rank: number;
}

export interface SnsScore {
  total: number;
  twitter: number;
  facebook: number;
  line: number;
  instagram: number;
  trend: "up" | "down" | "stable";
  trendPercent: number;
}

export interface NewsResponse {
  articles: NewsArticle[];
  updatedAt: string;
  source: "api" | "mock";
}
