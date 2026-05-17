"use client";

import { ExternalLink, Clock } from "lucide-react";
import Image from "next/image";
import { NewsArticle } from "@/types/news";
import RankBadge from "./RankBadge";
import SnsMetrics from "./SnsMetrics";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  テクノロジー: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  経済: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  スポーツ: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  政治: "bg-red-500/15 text-red-300 border-red-500/25",
  エンタメ: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  環境: "bg-green-500/15 text-green-300 border-green-500/25",
  健康: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  一般: "bg-gray-500/15 text-gray-300 border-gray-500/25",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}分前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}時間前`;
  return `${Math.floor(hours / 24)}日前`;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const categoryColor = CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS["一般"];
  const delay = `${index * 80}ms`;

  return (
    <article
      className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl overflow-hidden card-glow transition-all duration-300 animate-slide-up"
      style={{ animationDelay: delay, animationFillMode: "backwards" }}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={article.title}
      >
        <div className="flex gap-4 p-5">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <RankBadge rank={article.rank} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${categoryColor}`}>
                {article.category}
              </span>
              <span className="text-gray-500 text-xs">{article.source.name}</span>
              <div className="flex items-center gap-1 text-gray-600 text-xs ml-auto">
                <Clock className="w-3 h-3" />
                {timeAgo(article.publishedAt)}
              </div>
            </div>

            <h2 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-indigo-200 transition-colors line-clamp-2">
              {article.title}
            </h2>

            {article.description && (
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                {article.description}
              </p>
            )}

            <div className="pt-3 border-t border-white/[0.06]">
              <SnsMetrics score={article.snsScore} />
            </div>
          </div>

          {article.urlToImage && (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 hidden sm:block">
              <Image
                src={article.urlToImage}
                alt=""
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                sizes="112px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/10 rounded-lg p-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-gray-300" />
          </div>
        </div>
      </a>
    </article>
  );
}
