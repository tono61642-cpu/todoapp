interface RankBadgeProps {
  rank: number;
}

const RANK_STYLES: Record<number, { bg: string; text: string; border: string; glow: string; label: string }> = {
  1: {
    bg: "bg-gradient-to-br from-amber-400 to-yellow-600",
    text: "text-white",
    border: "border-amber-400/50",
    glow: "rank-glow-1",
    label: "🥇",
  },
  2: {
    bg: "bg-gradient-to-br from-slate-300 to-gray-500",
    text: "text-white",
    border: "border-gray-400/50",
    glow: "rank-glow-2",
    label: "🥈",
  },
  3: {
    bg: "bg-gradient-to-br from-amber-700 to-amber-900",
    text: "text-white",
    border: "border-amber-700/50",
    glow: "rank-glow-3",
    label: "🥉",
  },
};

export default function RankBadge({ rank }: RankBadgeProps) {
  const style = RANK_STYLES[rank];

  if (style) {
    return (
      <div
        className={`
          flex items-center justify-center
          w-12 h-12 rounded-2xl shrink-0
          ${style.bg} ${style.glow}
          border ${style.border}
          font-bold text-lg shadow-lg
        `}
      >
        {style.label}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 bg-white/5 border border-white/10 font-bold text-gray-400 text-lg">
      {rank}
    </div>
  );
}
