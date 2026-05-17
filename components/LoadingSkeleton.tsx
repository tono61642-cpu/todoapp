export default function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          <div className="flex gap-4 p-5">
            <div className="w-12 h-12 rounded-2xl shimmer-bg shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded-full shimmer-bg" />
                <div className="h-5 w-24 rounded-full shimmer-bg" />
              </div>
              <div className="h-5 w-full rounded-lg shimmer-bg" />
              <div className="h-5 w-3/4 rounded-lg shimmer-bg" />
              <div className="h-4 w-1/2 rounded-lg shimmer-bg" />
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-6 w-24 rounded-lg shimmer-bg" />
                  <div className="h-5 w-16 rounded-lg shimmer-bg" />
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 rounded-lg shimmer-bg" />
                  <div className="h-7 w-20 rounded-lg shimmer-bg" />
                  <div className="h-7 w-16 rounded-lg shimmer-bg" />
                </div>
              </div>
            </div>
            <div className="w-28 h-28 rounded-xl shimmer-bg shrink-0 hidden sm:block" />
          </div>
        </div>
      ))}
    </div>
  );
}
