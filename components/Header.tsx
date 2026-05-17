"use client";

import { TrendingUp, RefreshCw } from "lucide-react";

interface HeaderProps {
  updatedAt: string;
  source: "api" | "mock";
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function Header({ updatedAt, source, onRefresh, isRefreshing }: HeaderProps) {
  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleString("ja-JP", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <header className="relative pt-12 pb-8 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-medium">LIVE</span>
          </div>
          {source === "mock" && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
              <span className="text-amber-300 text-xs font-medium">デモデータ</span>
            </div>
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-white mb-2">
              <TrendingUp className="w-8 h-8 text-indigo-400" strokeWidth={2.5} />
              <span className="text-gradient">SNSトレンドニュース</span>
            </h1>
            <p className="text-gray-400 text-sm">
              SNSで最も注目されているニュース TOP5
            </p>
          </div>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-gray-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1 shrink-0"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">更新</span>
          </button>
        </div>

        {formattedTime && (
          <p className="text-gray-500 text-xs mt-3">
            最終更新: {formattedTime}
          </p>
        )}
      </div>
    </header>
  );
}
