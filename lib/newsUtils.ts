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

// キーワード → 画像の詳細マッピング（タイトルの語句で検索）
const KEYWORD_IMAGES: Array<{ keywords: string[]; images: string[] }> = [
  // AI・テクノロジー
  { keywords: ["ai", "人工知能", "chatgpt", "生成ai", "llm"],
    images: ["https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop"] },
  { keywords: ["スマートフォン", "iphone", "android", "スマホ"],
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop"] },
  { keywords: ["半導体", "チップ", "cpu", "gpu"],
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop"] },
  { keywords: ["ev", "電気自動車", "テスラ"],
    images: ["https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"] },
  { keywords: ["宇宙", "ロケット", "nasa", "jaxa"],
    images: ["https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&auto=format&fit=crop"] },
  // 医療・健康
  { keywords: ["ワクチン", "接種", "予防接種"],
    images: ["https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&auto=format&fit=crop"] },
  { keywords: ["感染", "ウイルス", "covid", "コロナ", "はしか", "インフル"],
    images: ["https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&auto=format&fit=crop"] },
  { keywords: ["病院", "医療", "手術", "医師", "看護"],
    images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop"] },
  { keywords: ["がん", "癌", "治療"],
    images: ["https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop"] },
  // 災害・気象
  { keywords: ["地震", "震度", "津波"],
    images: ["https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1603789543200-bc0bdf7e2a21?w=800&auto=format&fit=crop"] },
  { keywords: ["台風", "大雨", "洪水", "豪雨", "暴風"],
    images: ["https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800&auto=format&fit=crop"] },
  { keywords: ["火事", "火災", "炎上"],
    images: ["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&auto=format&fit=crop"] },
  // 経済・金融
  { keywords: ["株", "日経", "ダウ", "相場", "株価"],
    images: ["https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1642790595397-7047e1c4e679?w=800&auto=format&fit=crop"] },
  { keywords: ["円安", "円高", "為替", "ドル", "レート"],
    images: ["https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&auto=format&fit=crop"] },
  { keywords: ["nisa", "投資", "資産", "idc", "ファンド"],
    images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=800&auto=format&fit=crop"] },
  { keywords: ["物価", "インフレ", "値上げ", "スーパー", "食料品"],
    images: ["https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop"] },
  { keywords: ["企業", "ビジネス", "決算", "売上", "経営"],
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop"] },
  // 政治・社会
  { keywords: ["選挙", "投票", "参院", "衆院", "総選挙"],
    images: ["https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop"] },
  { keywords: ["首相", "大臣", "内閣", "政府", "官邸"],
    images: ["https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&auto=format&fit=crop"] },
  { keywords: ["逮捕", "事件", "裁判", "容疑者", "警察"],
    images: ["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=800&auto=format&fit=crop"] },
  { keywords: ["少子化", "出生率", "育児", "保育", "子ども"],
    images: ["https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&auto=format&fit=crop"] },
  // 国際
  { keywords: ["イラン", "中東", "ペルシャ", "海峡"],
    images: ["https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop"] },
  { keywords: ["ウクライナ", "ロシア", "戦争", "紛争", "侵攻"],
    images: ["https://images.unsplash.com/photo-1646994280430-c9f76eb77591?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop"] },
  { keywords: ["米国", "アメリカ", "バイデン", "トランプ", "ワシントン"],
    images: ["https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1524293568345-75d62c3664f7?w=800&auto=format&fit=crop"] },
  { keywords: ["中国", "北京", "習近平", "台湾"],
    images: ["https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&auto=format&fit=crop"] },
  { keywords: ["韓国", "ソウル", "朝鮮"],
    images: ["https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&auto=format&fit=crop"] },
  // スポーツ
  { keywords: ["サッカー", "ワールドカップ", "jリーグ", "代表"],
    images: ["https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&auto=format&fit=crop"] },
  { keywords: ["野球", "mlb", "npb", "大谷", "ホームラン"],
    images: ["https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1508344928928-7165b67de128?w=800&auto=format&fit=crop"] },
  { keywords: ["バスケ", "nba", "バスケットボール"],
    images: ["https://images.unsplash.com/photo-1546519638399-1274d2e4b1d6?w=800&auto=format&fit=crop"] },
  { keywords: ["テニス", "全仏", "ウィンブルドン", "全米", "全豪"],
    images: ["https://images.unsplash.com/photo-1542144582-1ba00456b5e3?w=800&auto=format&fit=crop"] },
  { keywords: ["ゴルフ", "マスターズ"],
    images: ["https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop"] },
  { keywords: ["マラソン", "陸上", "オリンピック", "五輪"],
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop"] },
  // エンタメ
  { keywords: ["映画", "興行収入", "ヒット", "公開"],
    images: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop"] },
  { keywords: ["アニメ", "漫画", "コミック"],
    images: ["https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1560942485-b2a11cc13456?w=800&auto=format&fit=crop"] },
  { keywords: ["音楽", "ライブ", "コンサート", "アルバム"],
    images: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop"] },
  { keywords: ["ドラマ", "テレビ", "視聴率"],
    images: ["https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop"] },
  // 環境・エネルギー
  { keywords: ["太陽光", "再生可能", "脱炭素", "温暖化", "co2"],
    images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop"] },
  { keywords: ["原発", "核", "エネルギー"],
    images: ["https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop"] },
  // 観光・食
  { keywords: ["インバウンド", "観光", "訪日", "外国人旅行"],
    images: ["https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop"] },
  { keywords: ["食料", "グルメ", "レストラン", "料理"],
    images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop"] },
];

const CATEGORY_IMAGES: Record<string, string[]> = {
  テクノロジー: [
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
  ],
  経済: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop",
  ],
  スポーツ: [
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&auto=format&fit=crop",
  ],
  政治: [
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&auto=format&fit=crop",
  ],
  エンタメ: [
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop",
  ],
  環境: [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=800&auto=format&fit=crop",
  ],
  健康: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
  ],
  国際: [
    "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&auto=format&fit=crop",
  ],
  一般: [
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop",
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
  const lowerTitle = title.toLowerCase();

  // キーワードで詳細マッチ
  for (const { keywords, images } of KEYWORD_IMAGES) {
    if (keywords.some((kw) => lowerTitle.includes(kw))) {
      let hash = 0;
      for (let i = 0; i < title.length; i++) {
        hash = Math.imul(31, hash) + title.charCodeAt(i);
      }
      return images[Math.abs(hash) % images.length];
    }
  }

  // カテゴリ画像にフォールバック
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
