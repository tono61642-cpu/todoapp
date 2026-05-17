import { NewsArticle } from "@/types/news";

export const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "日本のAI技術が世界をリード——新世代の言語モデルが医療現場に革命をもたらす",
    description:
      "国内主要IT企業が共同開発した次世代AIシステムが、医療診断の精度を大幅に向上させることに成功。臨床試験では従来比で診断精度が40%改善され、医師の業務負担も軽減される見込みだ。",
    url: "https://news.google.com/search?q=AI+医療+日本&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    source: { name: "テクノロジーニュース" },
    category: "テクノロジー",
    snsScore: { total: 124500, twitter: 43600, facebook: 24900, instagram: 31200, line: 24800, trend: "up", trendPercent: 234 },
    rank: 1,
  },
  {
    id: "2",
    title: "東京都が2030年までにカーボンニュートラル達成へ——革新的な都市緑化計画を発表",
    description:
      "東京都は都内全域での大規模緑化計画を発表。屋上庭園の義務化や太陽光パネルの普及促進などを含む総合的な脱炭素戦略により、2030年までに温室効果ガス排出量をゼロにする目標を掲げた。",
    url: "https://news.google.com/search?q=東京+カーボンニュートラル+2030&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { name: "環境ニュース" },
    category: "環境",
    snsScore: { total: 98300, twitter: 34400, facebook: 19600, instagram: 24500, line: 19800, trend: "up", trendPercent: 187 },
    rank: 2,
  },
  {
    id: "3",
    title: "日本代表、ワールドカップ予選で劇的な逆転勝利——SNSで歓喜の声が溢れる",
    description:
      "サッカー日本代表がワールドカップアジア最終予選で後半アディショナルタイムに2得点を挙げ、3対2の逆転勝利を収めた。試合終了直後からSNSには感動と興奮のコメントが殺到し、トレンドを独占している。",
    url: "https://news.google.com/search?q=日本代表+サッカー+ワールドカップ予選&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    source: { name: "スポーツニュース" },
    category: "スポーツ",
    snsScore: { total: 87600, twitter: 30700, facebook: 17500, instagram: 21900, line: 17500, trend: "up", trendPercent: 456 },
    rank: 3,
  },
  {
    id: "4",
    title: "新型スマートフォン発表——折りたたみ式ディスプレイと1週間持続するバッテリーで注目",
    description:
      "大手メーカーが次世代フラッグシップスマートフォンを発表。折りたたみ式有機ELディスプレイと革新的なバッテリー技術により、フル充電で最大7日間の使用が可能。価格は15万円台から。",
    url: "https://news.google.com/search?q=折りたたみスマートフォン+新型&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { name: "ガジェット情報" },
    category: "テクノロジー",
    snsScore: { total: 71200, twitter: 24900, facebook: 14200, instagram: 17800, line: 14300, trend: "stable", trendPercent: 12 },
    rank: 4,
  },
  {
    id: "5",
    title: "インバウンド需要が過去最高を更新——外国人観光客数が月間500万人を突破",
    description:
      "観光庁の発表によると、今月の訪日外国人数が初めて500万人を超えた。円安や日本文化への関心の高まりが追い風となり、東京・京都・大阪だけでなく地方都市への波及効果も顕著になっている。",
    url: "https://news.google.com/search?q=インバウンド+訪日外国人+過去最高&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    source: { name: "経済ニュース" },
    category: "経済",
    snsScore: { total: 58900, twitter: 20600, facebook: 11800, instagram: 14700, line: 11800, trend: "up", trendPercent: 89 },
    rank: 5,
  },
  {
    id: "6",
    title: "人気アニメが実写映画化——主演キャスト発表でSNSに賛否両論",
    description:
      "国民的人気アニメの実写映画化が正式発表され、主演キャストが公開された。ファンの間では原作への忠実度やキャスティングを巡って議論が白熱し、関連ワードが一日でトレンド上位を独占した。",
    url: "https://news.google.com/search?q=アニメ+実写映画+キャスト&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { name: "エンタメニュース" },
    category: "エンタメ",
    snsScore: { total: 52400, twitter: 18300, facebook: 10500, instagram: 13100, line: 10500, trend: "up", trendPercent: 312 },
    rank: 6,
  },
  {
    id: "7",
    title: "政府、少子化対策に5兆円規模の新パッケージ——育児支援と教育無償化を柱に",
    description:
      "政府は少子化対策の新たな総合パッケージを閣議決定した。0〜2歳児の保育費完全無償化や第2子以降への育児給付金の大幅拡充を盛り込み、5年間で5兆円規模の財源を確保する方針を示した。",
    url: "https://news.google.com/search?q=少子化対策+育児支援+政府&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    source: { name: "政治ニュース" },
    category: "政治",
    snsScore: { total: 47100, twitter: 16500, facebook: 9400, instagram: 11800, line: 9400, trend: "up", trendPercent: 145 },
    rank: 7,
  },
  {
    id: "8",
    title: "国産電気自動車がEV世界販売ランキング初のトップ3入り——航続距離800kmで話題沸騰",
    description:
      "国内自動車メーカーが発売した新型EVが、月間世界販売台数で初めてトップ3に入った。一回の充電で最大800km走行可能な全固体電池を搭載し、急速充電も10分で80%まで回復する性能が高く評価されている。",
    url: "https://news.google.com/search?q=国産EV+電気自動車+世界販売&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { name: "自動車ニュース" },
    category: "テクノロジー",
    snsScore: { total: 43800, twitter: 15300, facebook: 8800, instagram: 10900, line: 8800, trend: "up", trendPercent: 203 },
    rank: 8,
  },
  {
    id: "9",
    title: "大谷翔平、今季50号本塁打を達成——日本人初の記録にSNS全世界トレンド入り",
    description:
      "メジャーリーグで活躍する大谷翔平選手が今季50号本塁打を放ち、日本人選手として前人未到の記録を達成した。試合終了後すぐに「OHTANI」が世界中のSNSでトレンド入りし、各国メディアも速報で報じた。",
    url: "https://news.google.com/search?q=大谷翔平+本塁打+記録&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
    source: { name: "スポーツニュース" },
    category: "スポーツ",
    snsScore: { total: 39200, twitter: 13700, facebook: 7800, instagram: 9800, line: 7900, trend: "stable", trendPercent: 8 },
    rank: 9,
  },
  {
    id: "10",
    title: "新NISAの口座開設数が2000万を突破——20代の投資デビューが急増",
    description:
      "金融庁の発表によると、新NISA制度の開始から1年で口座開設数が2000万を超えた。特に20代の新規開設が前年比3倍以上となり、SNSでの投資情報の拡散が若年層の資産形成意識を高めていると分析されている。",
    url: "https://news.google.com/search?q=新NISA+口座開設+投資&hl=ja&gl=JP",
    urlToImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { name: "経済ニュース" },
    category: "経済",
    snsScore: { total: 35600, twitter: 12500, facebook: 7100, instagram: 8900, line: 7100, trend: "up", trendPercent: 67 },
    rank: 10,
  },
];
