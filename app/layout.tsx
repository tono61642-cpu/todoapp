import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SNSトレンドニュース | 注目度ランキング TOP5",
  description: "SNSで今最も話題になっているニュースをリアルタイムで分析・表示します",
  openGraph: {
    title: "SNSトレンドニュース | 注目度ランキング TOP5",
    description: "SNSで今最も話題になっているニュースをリアルタイムで分析",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
