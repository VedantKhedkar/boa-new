import { BusinessCardSkeleton, Skeleton } from '@/components/Skeleton';

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-[#faf8f7] pb-16 overflow-hidden">
      {/* Top Banner Skeleton */}
      <section className="relative w-full pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-9 w-3/4 max-w-xl rounded-lg" />
          <Skeleton className="h-4 w-full max-w-2xl rounded-md" />
        </div>
      </section>

      {/* Cards List Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col gap-6">
          <BusinessCardSkeleton />
          <BusinessCardSkeleton />
          <BusinessCardSkeleton />
        </div>
      </section>
    </div>
  );
}
