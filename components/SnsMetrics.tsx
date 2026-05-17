import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { SnsScore } from "@/types/news";
import { formatNumber } from "@/lib/newsUtils";

interface SnsMetricsProps {
  score: SnsScore;
}

const PLATFORM_COLORS = {
  twitter: "bg-sky-500/20 text-sky-400",
  facebook: "bg-blue-600/20 text-blue-400",
  line: "bg-green-500/20 text-green-400",
};

export default function SnsMetrics({ score }: SnsMetricsProps) {
  const TrendIcon =
    score.trend === "up" ? TrendingUp : score.trend === "down" ? TrendingDown : Minus;
  const trendColor =
    score.trend === "up"
      ? "text-emerald-400"
      : score.trend === "down"
      ? "text-red-400"
      : "text-gray-400";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">
            {formatNumber(score.total)}
          </span>
          <span className="text-gray-500 text-sm">シェア</span>
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span>
            {score.trend === "stable" ? "横ばい" : `${score.trendPercent}%`}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${PLATFORM_COLORS.twitter}`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.754l7.728-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {formatNumber(score.twitter)}
        </div>
        <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${PLATFORM_COLORS.facebook}`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {formatNumber(score.facebook)}
        </div>
        <div className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium ${PLATFORM_COLORS.line}`}>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
          </svg>
          {formatNumber(score.line)}
        </div>
      </div>
    </div>
  );
}
