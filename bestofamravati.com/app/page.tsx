'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTypewriterPlaceholder } from '@/hooks/useTypewriterPlaceholder';
import {
  fetchCategories,
  fetchBusinesses,
  getBusinessImage,
  ApiCategory,
  ApiBusiness,
} from '@/lib/api';
import { HomeCategoryCardsSkeleton } from '@/components/Skeleton';

function CategoryIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'restaurant':
    case 'bakery_dining':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
        </svg>
      );
    case 'shopping_bag':
    case 'checkroom':
    case 'shopping_cart':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case 'diamond':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M10 3l2 6 4 12M14 3l-2 6-4 12" />
        </svg>
      );
    case 'favorite_border':
    case 'local_hospital':
    case 'biotech':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'school':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    case 'home':
    case 'home_work':
    case 'chair':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'domain':
    case 'hotel':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    case 'settings':
    case 'terminal':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'photo_camera':
    case 'celebration':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'directions_car':
    case 'local_shipping':
      return (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2-3H9L7 7H4a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      );
    default:
      return (
        <span className="material-symbols-outlined text-[20px]">
          {icon || 'category'}
        </span>
      );
  }
}

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [businesses, setBusinesses] = useState<ApiBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const typewriterPlaceholder = useTypewriterPlaceholder();

  useEffect(() => {
    let active = true;
    Promise.all([fetchCategories(), fetchBusinesses()]).then(([cats, bizs]) => {
      if (!active) return;
      setCategories(cats);
      setBusinesses(bizs);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const isSearching = q.length > 0;

  const displayedCategories = isSearching
    ? categories
        .filter((cat) => {
          const keywords = Array.isArray(cat.metadata?.searchKeywords)
            ? cat.metadata.searchKeywords
            : [];
          const subs = Array.isArray(cat.subcategories) ? cat.subcategories : [];
          return (
            cat.name.toLowerCase().includes(q) ||
            cat.sector.toLowerCase().includes(q) ||
            (cat.description || '').toLowerCase().includes(q) ||
            keywords.some((k) => String(k).toLowerCase().includes(q)) ||
            subs.some((s) => s.name.toLowerCase().includes(q))
          );
        })
        .slice(0, 30)
    : categories.slice(0, 30);

  const matchingBusinesses = isSearching
    ? businesses
        .filter((b) => {
          const services = Array.isArray(b.services) ? b.services : [];
          const tags = Array.isArray(b.tags) ? b.tags : [];
          return (
            b.name.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            (b.subCategory || '').toLowerCase().includes(q) ||
            b.locality.toLowerCase().includes(q) ||
            b.address.toLowerCase().includes(q) ||
            services.some((s) => String(s).toLowerCase().includes(q)) ||
            tags.some((t) => String(t).toLowerCase().includes(q))
          );
        })
        .sort((a, b) => {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.rating - a.rating;
        })
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/businesslisting?q=${encodeURIComponent(q)}`);
    } else {
      router.push('/businesslisting');
    }
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden bg-[#faf8f7]">
      {/* Subtle Soft Radiant Glow Effects in Corners/Center */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Hero Stage */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 flex flex-col items-center text-center">
        {/* Central Trademarked Badge Icon with One-time Entrance Animation */}
        <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 animate-hero-logo">
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center shadow-[0_16px_40px_rgba(183,19,26,0.28)] ring-4 ring-white/90 relative overflow-hidden bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/boalogo.svg"
              alt="Best of Amravati (BOA) Trademarked Badge"
              className="w-full h-full object-cover select-none"
            />
          </div>
          {/* Radiant Aura Bloom - One-time on load */}
          <div className="absolute inset-0 rounded-full bg-primary/25 blur-3xl -z-10 group-hover:bg-primary/45 transition-all animate-hero-aura pointer-events-none"></div>
        </div>

        {/* Radiant Hero Headline with One-time Staggered Entrance */}
        <h1 className="mt-6 sm:mt-8 max-w-4xl flex items-baseline justify-center flex-wrap sm:flex-nowrap gap-x-2.5 sm:gap-x-3.5 text-center leading-tight animate-hero-title">
          <span className="font-dancing text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-slate-700 tracking-wide">
            Search the
          </span>
          <span className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-[#e63533] to-[#880d13] bg-clip-text text-transparent whitespace-nowrap">
            Best of Amravati
          </span>
        </h1>

        {/* Descriptive Civic Subtitle */}
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl font-medium animate-hero-subtitle">
          Discover best local business categories
        </p>

        {/* Pill Search Omnibox */}
        <form onSubmit={handleSearchSubmit} className="mt-5 sm:mt-6 w-full max-w-lg px-3 animate-hero-search">
          <div className="relative flex items-center bg-white rounded-full border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(183,19,26,0.08)] hover:border-primary/40 transition-all duration-300 p-1">
            <div className="pl-3.5 pr-1 flex items-center justify-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M16 16l4.5 4.5" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={typewriterPlaceholder}
              className="w-full py-1.5 sm:py-2 pl-2 pr-3 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-2 text-slate-400 hover:text-slate-600 transition flex items-center justify-center"
                title="Clear search"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <button
              type="submit"
              aria-label="Submit search"
              className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-primary to-[#9c0f15] text-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(183,19,26,0.25)] hover:shadow-[0_4px_12px_rgba(183,19,26,0.35)] hover:brightness-105 active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </form>
      </section>

      {/* Universal Search Preview (Businesses + Categories) & Hot Categories Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 space-y-8">
        {/* Live Business Preview Cards while Searching */}
        {isSearching && !loading && matchingBusinesses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-bold text-slate-800 tracking-wider">
                  Matching Businesses ({matchingBusinesses.length})
                </span>
              </div>
              <Link
                href={`/businesslisting?q=${encodeURIComponent(searchQuery.trim())}`}
                className="group inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
              >
                <span>See all results</span>
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {matchingBusinesses.slice(0, 8).map((biz, idx) => (
                <Link
                  key={biz.id}
                  href={`/business/${biz.slug}`}
                  className="group flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(183,19,26,0.09)] hover:border-primary/40 transition-all duration-200"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getBusinessImage(biz, idx)}
                      alt={biz.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                        {biz.name}
                      </h3>
                      {biz.verified && (
                        <span
                          className="material-symbols-outlined text-[14px] text-primary shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {biz.category}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px]">
                      <span className="font-bold text-amber-600 flex items-center gap-0.5">
                        ★ {Number(biz.rating).toFixed(1)}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 truncate">{biz.locality}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid (Matching Categories when searching, or Hot Categories when idle) */}
        {(!isSearching || displayedCategories.length > 0 || loading) && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-xs font-bold text-slate-800 tracking-wider">
                  {isSearching
                    ? `Matching Categories (${displayedCategories.length})`
                    : `All Categories (${displayedCategories.length})`}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-1 text-xs text-slate-500 hover:text-primary font-medium transition-colors"
                >
                  <span>View All Categories</span>
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {loading ? (
              <HomeCategoryCardsSkeleton count={30} />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3 w-full">
                {displayedCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories?category=${encodeURIComponent(cat.slug)}`}
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(183,19,26,0.09)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary/10 text-slate-700 group-hover:text-primary flex items-center justify-center transition-all mb-2 group-hover:scale-110">
                      <CategoryIcon icon={cat.icon} />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-800 text-center leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {cat.name}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {isSearching && !loading && displayedCategories.length === 0 && matchingBusinesses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
            <svg className="w-10 h-10 text-slate-400 mx-auto stroke-current fill-none stroke-2 mb-2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="M16 16l4.5 4.5" />
              <path strokeLinecap="round" d="M8 8l6 6" />
            </svg>
            <p className="text-slate-600 text-sm font-medium">
              No businesses or categories match &quot;{searchQuery}&quot;. Try searching for &quot;Hospital&quot;, &quot;Cafe&quot;, or &quot;Bizonance&quot;.
            </p>
          </div>
        )}
      </section>

      {/* Verified Directory Quick Stat & Civic Assurance Ribbon */}
      {/* <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[26px]">verified</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Where Excellence Meets Recognition.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Bringing you the best of our city.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <Link
              href="/about-us"
              className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
            >
              How Rankings Work
            </Link>
            <Link
              href="/join-us"
              className="w-full md:w-auto text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-[#9c0f15] text-white text-xs font-semibold shadow-[0_2px_10px_rgba(183,19,26,0.25)] hover:shadow-[0_4px_14px_rgba(183,19,26,0.38)] transition-all whitespace-nowrap"
            >
              Submit Your Business
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
