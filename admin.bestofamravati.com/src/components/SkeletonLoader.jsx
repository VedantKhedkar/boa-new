export function SkeletonBox({ className = "" }) {
  return <div className={`skeleton-shimmer rounded-md ${className}`} />;
}

export function TableRowsSkeleton({ rows = 7, cols = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="border-b border-gray-100">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <td key={cIdx} className="px-4 py-3.5">
              {cIdx === 0 ? (
                <div className="flex items-center gap-3">
                  <SkeletonBox className="w-8 h-8 rounded-xl shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <SkeletonBox className="h-3.5 w-36 rounded-md" />
                    <SkeletonBox className="h-2.5 w-24 rounded-md" />
                  </div>
                </div>
              ) : cIdx === cols - 1 ? (
                <div className="flex justify-end gap-1.5 pr-2">
                  <SkeletonBox className="w-7 h-7 rounded-lg" />
                  <SkeletonBox className="w-7 h-7 rounded-lg" />
                </div>
              ) : (
                <SkeletonBox className="h-4 w-24 rounded-md" />
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* 6 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs"
          >
            <SkeletonBox className="w-10 h-10 rounded-xl mb-3" />
            <SkeletonBox className="h-2.5 w-20 rounded-md mb-2" />
            <SkeletonBox className="h-7 w-12 rounded-md mb-2" />
            <SkeletonBox className="h-2.5 w-24 rounded-md" />
          </div>
        ))}
      </div>

      {/* 2 Quick Launch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <SkeletonBox className="w-9 h-9 rounded-xl" />
              <SkeletonBox className="h-5 w-28 rounded-full" />
            </div>
            <SkeletonBox className="h-5 w-56 rounded-md" />
            <div className="space-y-2">
              <SkeletonBox className="h-3.5 w-full rounded-md" />
              <SkeletonBox className="h-3.5 w-4/5 rounded-md" />
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <SkeletonBox className="h-3 w-36 rounded-md" />
              <SkeletonBox className="h-3 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Sector Analytics Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <SkeletonBox className="h-5 w-48 rounded-md" />
            <SkeletonBox className="h-3 w-64 rounded-md" />
          </div>
          <SkeletonBox className="h-6 w-28 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 space-y-2"
            >
              <SkeletonBox className="h-3.5 w-24 rounded-md" />
              <SkeletonBox className="h-6 w-12 rounded-md" />
              <SkeletonBox className="h-2.5 w-28 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReviewsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1.5">
              <SkeletonBox className="h-4 w-36 rounded-md" />
              <SkeletonBox className="h-3 w-48 rounded-md" />
            </div>
            <SkeletonBox className="h-4 w-20 rounded-md" />
          </div>
          <SkeletonBox className="h-16 w-full rounded-xl" />
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <SkeletonBox className="h-3 w-20 rounded-md" />
            <div className="flex items-center gap-2">
              <SkeletonBox className="h-6 w-20 rounded-full" />
              <SkeletonBox className="h-6 w-6 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
