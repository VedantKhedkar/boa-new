'use client';

import React, { useState } from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-md ${className}`} />;
}

// Image with automatic skeleton shimmer loader while loading
export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  containerClassName = '',
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-10" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

// 10 Category Cards Skeleton for Landing Page
export function HomeCategoryCardsSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3 w-full">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
        >
          <div className="w-10 h-10 rounded-xl skeleton-shimmer mb-2" />
          <div className="w-12 h-3 skeleton-shimmer rounded-md" />
        </div>
      ))}
    </div>
  );
}

// Skeleton for the category navigation grid
export function CategoryGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5 sm:gap-2">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="aspect-square p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center gap-1.5"
        >
          <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg" />
          <Skeleton className="w-10 h-2.5 rounded-sm" />
        </div>
      ))}
    </div>
  );
}

// Skeleton for Main Business Listing Cards (4:3 aspect ratio, title, rating, tags, buttons)
export function BusinessCardSkeleton() {
  return (
    <article className="relative flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs">
      {/* Left Image Placeholder (4:3) */}
      <div className="w-full sm:w-64 md:w-72 aspect-[4/3] shrink-0">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Right Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between gap-3 flex-1">
        <div className="flex flex-col gap-2.5">
          {/* Title & Verified Tick */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-48 sm:w-64 rounded-md" />
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>

          {/* Rating & Timing Line */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5 mt-1">
            <Skeleton className="h-5 w-24 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>

          {/* Location & Highlight */}
          <div className="flex flex-col gap-1.5 mt-1">
            <Skeleton className="h-3.5 w-3/4 rounded-sm" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-16 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
          <Skeleton className="h-7 w-28 rounded-lg" />
        </div>
      </div>
    </article>
  );
}

// Skeleton for the Bottom Basic Plan Horizontal Carousel
export function BasicCarouselSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden pt-1 pb-4">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between"
        >
          <Skeleton className="w-full aspect-[16/10] rounded-none" />
          <div className="p-3.5 flex flex-col gap-2.5">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-1/2 rounded-md" />
            <div className="pt-2.5 border-t border-slate-100 flex gap-2">
              <Skeleton className="h-6 flex-1 rounded-lg" />
              <Skeleton className="h-6 flex-1 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Full Business Listing Page Skeleton
export function DirectoryPageSkeleton() {
  return (
    <div className="relative min-h-screen bg-[#faf8f7] pb-16 overflow-hidden">
      {/* Search Header Skeleton */}
      <section className="relative z-10 w-full pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3.5 w-20" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3.5 w-32" />
          </div>

          {/* Search Omnibox Skeleton */}
          <div className="w-full max-w-xl mx-auto my-3 sm:my-4">
            <div className="h-12 w-full rounded-full bg-white border border-slate-200/90 p-1 flex items-center justify-between px-3">
              <Skeleton className="h-4 w-48 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>

          {/* Category Cards Skeleton (2 rows matching live directory) */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-14 rounded-lg" />
            </div>
            <CategoryGridSkeleton count={24} />
          </div>
        </div>
      </section>

      {/* Main Listings Stream Skeleton */}
      <section className="relative z-10 w-full py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
          <BusinessCardSkeleton />
          <BusinessCardSkeleton />
          <BusinessCardSkeleton />
        </div>
      </section>

      {/* Bottom Basic Listings Section Skeleton */}
      <section className="relative z-10 w-full py-10 border-t border-slate-200/80 overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-6 w-64 rounded-md" />
              <Skeleton className="h-3.5 w-96 rounded-md" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-9 h-9 rounded-full" />
              <Skeleton className="w-9 h-9 rounded-full" />
            </div>
          </div>
          <BasicCarouselSkeleton count={5} />
        </div>
      </section>
    </div>
  );
}

// Full Business Profile Page Skeleton (matches /business/bizonance layout)
export function ProfilePageSkeleton() {
  return (
    <div className="relative min-h-screen bg-[#faf8f7] pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3.5 w-40" />
        </div>

        {/* Card 1: Banner + Header Skeleton */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Panoramic Cover Banner */}
          <Skeleton className="w-full h-56 sm:h-72 md:h-84 lg:h-[380px] rounded-none" />

          {/* Profile Header Details with Overlapping Logo */}
          <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 pt-0">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 md:gap-8">
              {/* Overlapping Logo Box */}
              <div className="relative -mt-14 sm:-mt-20 md:-mt-24 shrink-0 z-10">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl bg-white border-4 border-white shadow-lg p-2 flex items-center justify-center">
                  <Skeleton className="w-full h-full rounded-2xl" />
                </div>
              </div>

              {/* Title & Info Skeleton */}
              <div className="flex flex-col gap-2 flex-1 pt-2 sm:pt-4 w-full">
                <Skeleton className="h-8 w-3/4 max-w-md rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
                <Skeleton className="h-3.5 w-80 rounded-md" />
                <Skeleton className="h-3.5 w-72 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md mt-1" />
              </div>
            </div>

            {/* Action Pills */}
            <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap gap-2.5 sm:gap-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-full" />
              ))}
            </div>
          </div>
        </article>

        {/* Card 2: About Us Skeleton */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-4">
          <Skeleton className="h-6 w-36 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-11/12 rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        {/* Card 3: Tabs Skeleton */}
        <div className="flex gap-2.5">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
        </div>

        {/* Card 4: Services / Accordion Skeleton */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-40 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>
        </section>

        {/* Card 5: Reviews Skeleton */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 md:p-10 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex gap-4">
                <Skeleton className="w-11 h-11 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="h-4 w-40 rounded-md" />
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3.5 w-3/4 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
