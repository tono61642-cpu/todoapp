import { NewsArticle, SnsScore } from "@/types/news";

const CATEGORIES: Record<string, string[]> = {
  テクノロジー: ["tech", "technology", "ai", "digital", "software", "apple", "google", "スマートフォン", "ai", "ロボット", "半導体", "it", "sns", "アプリ"],
  経済: ["business", "economy", "finance", "market", "stock", "startup", "円", "株", "物価", "景気", "gdp", "貿易", "nisa", "投資", "銀行"],
  スポーツ: ["sport", "soccer", "baseball", "tennis", "olympic", "サッカー", "野球", "バスケ", "陸上", "水泳", "柔道", "大谷", "代表"],
  政治: ["politics", "government", "election", "policy", "首相", "大臣", "国会", "選挙", "政府", "外交", "条約", "法案"],
  エンタメ: ["entertainment", "music", "movie", "celebrity", "anime", "ドラマ", "映画", "アニメ", "俳優", "歌手", "コンサート", "芸能"],
  環境: ["environment", "climate", "green", "energy", "carbon", "脱炭素", "再生可能", "温暖化", "台風", "地震", "災害"],
  健康: ["health", "medical", "covid", "hospital", "wellness", "病院", "感染", "ワクチン", "医療", "がん", "薬"],
  国際: ["international", "world", "global", "イラン", "中国", "米国", "アメリカ", "ロシア", "ウクライナ", "北朝鮮", "韓国", "戦争", "紛争"],
};

const CATEGORY_IMAGES: Record<string, string[]> = {
  テクノロジー: [
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
  ],
  経済: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop",
  ],
  スポーツ: [
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
  ],
  政治: [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&auto=format&fit=crop",
  ],
  エンタメ: [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  ],
  環境: [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&auto=format&fit=crop",
  ],
  健康: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
  ],
  国際: [
    "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&auto=format&fit=crop",
  ],
  一般: [
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
  ],
};

export function detectCategory(title: string, description: string | null): string {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORIES)) {
    if (keywords.some((kw) => text.includes(kw))) return category;
  }
  return "一般";
}

function pickImage(category: string, title: string): string {
  const images = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["一般"];
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = Math.imul(31, hash) + title.charCodeAt(i);
  }
  return images[Math.abs(hash) % images.length];
}

export function generateSnsScore(article: {
  publishedAt: string;
  title: string;
}): SnsScore {
  const hoursAgo = (Date.now() - new Date(article.publishedAt).getTime()) / 3600000;
  const recencyBoost = Math.max(0, 1 - hoursAgo / 24);

  // タイトル全体をシードに使い、記事ごとに固有のスコアを生成
  let seed = 0;
  for (let i = 0; i < article.title.length; i++) {
    seed = Math.imul(31, seed) + article.title.charCodeAt(i);
  }
  const pseudoRandom = (n: number) => {
    let h = seed ^ (n * 2654435769);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    return Math.abs(h ^ (h >>> 16)) % 1000;
  };

  // 新しい記事ほど高スコア、タイトルの個性でばらつきを出す
  const base = Math.floor(20000 + pseudoRandom(1) * 80 + recencyBoost * 60000);
  const twitter = Math.floor(base * (0.35 + (pseudoRandom(2) % 15) / 100));
  const facebook = Math.floor(base * (0.20 + (pseudoRandom(3) % 10) / 100));
  const instagram = Math.floor(base * (0.25 + (pseudoRandom(6) % 12) / 100));
  const line = base - twitter - facebook - instagram;

  const trendOptions: Array<"up" | "down" | "stable"> = ["up", "up", "up", "stable", "down"];
  const trend = trendOptions[pseudoRandom(4) % trendOptions.length];
  const trendPercent = Math.floor(10 + pseudoRandom(5) % 290);

  return { total: base, twitter, facebook, line, instagram, trend, trendPercent };
}

export function processArticles(rawArticles: Array<{
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}>): NewsArticle[] {
  // 全記事のスコアを先に計算
  const scored = rawArticles.map((article) => {
    const category = detectCategory(article.title, article.description);
    const snsScore = generateSnsScore({ publishedAt: article.publishedAt, title: article.title });
    const urlToImage = article.urlToImage ?? pickImage(category, article.title);
    return { ...article, category, snsScore, urlToImage };
  });

  // シェア数スコア降順で並び替えてTOP10を決定
  scored.sort((a, b) => b.snsScore.total - a.snsScore.total);

  return scored.slice(0, 10).map((article, index) => {
    const rank = index + 1;
    return {
      id: `article-${rank}`,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source,
      category: article.category,
      snsScore: article.snsScore,
      rank,
    };
  });
}

export function formatNumber(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}千`;
  return n.toString();
}
