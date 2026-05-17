"use client";

import { useState, useEffect, useCallback } from "react";
import { NewsResponse } from "@/types/news";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";

export default function HomePage() {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const res = await fetch(`/api/news?t=${Date.now()}`);
      if (!res.ok) throw new Error("ニュースの取得に失敗しました");
      const json: NewsResponse = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(() => fetchNews(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-4">
        <Header
          updatedAt={data?.updatedAt ?? ""}
          source={data?.source ?? "mock"}
          onRefresh={() => fetchNews(true)}
          isRefreshing={isRefreshing}
        />

        <main className="mt-2">
          {isLoading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-5 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">エラーが発生しました</p>
                <p className="text-sm text-red-400/70 mt-0.5">{error}</p>
              </div>
            </div>
          ) : data?.articles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">ニュースが見つかりませんでした</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data?.articles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
