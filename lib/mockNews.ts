import { NewsArticle } from "@/types/news";

export const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "日本のAI技術が世界をリード——新世代の言語モデルが医療現場に革命をもたらす",
    description:
      "国内主要IT企業が共同開発した次世代AIシステムが、医療診断の精度を大幅に向上させることに成功。臨床試験では従来比で診断精度が40%改善され、医師の業務負担も軽減される見込みだ。",
    url: "https://example.com/news/1",
    urlToImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { name: "テクノロジーニュース" },
    category: "テクノロジー",
    snsScore: {
      total: 124500,
      twitter: 78200,
      facebook: 31800,
      line: 14500,
      trend: "up",
      trendPercent: 234,
    },
    rank: 1,
  },
  {
    id: "2",
    title: "東京都が2030年までにカーボンニュートラル達成へ——革新的な都市緑化計画を発表",
    description:
      "東京都は都内全域での大規模緑化計画を発表。屋上庭園の義務化や太陽光パネルの普及促進などを含む総合的な脱炭素戦略により、2030年までに温室効果ガス排出量をゼロにする目標を掲げた。",
    url: "https://example.com/news/2",
    urlToImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "環境ニュース" },
    category: "環境",
    snsScore: {
      total: 98300,
      twitter: 52100,
      facebook: 28700,
      line: 17500,
      trend: "up",
      trendPercent: 187,
    },
    rank: 2,
  },
  {
    id: "3",
    title: "日本代表、ワールドカップ予選で劇的な逆転勝利——SNSで歓喜の声が溢れる",
    description:
      "サッカー日本代表がワールドカップアジア最終予選で後半アディショナルタイムに2得点を挙げ、3対2の逆転勝利を収めた。試合終了直後からSNSには感動と興奮のコメントが殺到し、トレンドを独占している。",
    url: "https://example.com/news/3",
    urlToImage:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { name: "スポーツニュース" },
    category: "スポーツ",
    snsScore: {
      total: 87600,
      twitter: 61400,
      facebook: 15800,
      line: 10400,
      trend: "up",
      trendPercent: 456,
    },
    rank: 3,
  },
  {
    id: "4",
    title: "新型スマートフォン発表——折りたたみ式ディスプレイと1週間持続するバッテリーで注目",
    description:
      "大手メーカーが次世代フラッグシップスマートフォンを発表。折りたたみ式有機ELディスプレイと革新的なバッテリー技術により、フル充電で最大7日間の使用が可能。価格は15万円台から。",
    url: "https://example.com/news/4",
    urlToImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "ガジェット情報" },
    category: "テクノロジー",
    snsScore: {
      total: 71200,
      twitter: 43600,
      facebook: 18900,
      line: 8700,
      trend: "stable",
      trendPercent: 12,
    },
    rank: 4,
  },
  {
    id: "5",
    title: "インバウンド需要が過去最高を更新——外国人観光客数が月間500万人を突破",
    description:
      "観光庁の発表によると、今月の訪日外国人数が初めて500万人を超えた。円安や日本文化への関心の高まりが追い風となり、東京・京都・大阪だけでなく地方都市への波及効果も顕著になっている。",
    url: "https://example.com/news/5",
    urlToImage:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { name: "経済ニュース" },
    category: "経済",
    snsScore: {
      total: 58900,
      twitter: 31200,
      facebook: 19400,
      line: 8300,
      trend: "up",
      trendPercent: 89,
    },
    rank: 5,
  },
];
