'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchCategories, ApiCategory } from '@/lib/api';
import { HomeCategoryCardsSkeleton } from '@/components/Skeleton';

function CategoriesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlCategory = searchParams.get('category') || 'all';

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let active = true;
    fetchCategories().then((cats) => {
      if (!active) return;
      setCategories(cats);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const selectedCategory = useMemo(() => {
    if (urlCategory === 'all') return null;
    return categories.find((c) => c.slug === urlCategory) || null;
  }, [categories, urlCategory]);

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const baseList = selectedCategory ? [selectedCategory] : categories;

    if (!q) {
      return baseList.map((cat) => ({
        category: cat,
        subcategories: cat.subcategories || [],
      }));
    }

    return baseList
      .map((cat) => {
        const catMatches =
          cat.name.toLowerCase().includes(q) ||
          cat.sector.toLowerCase().includes(q);
        const subs = (cat.subcategories || []).filter(
          (sub) =>
            catMatches ||
            sub.name.toLowerCase().includes(q) ||
            (sub.description || '').toLowerCase().includes(q)
        );
        return {
          category: cat,
          subcategories: subs,
        };
      })
      .filter((section) => section.subcategories.length > 0);
  }, [categories, selectedCategory, searchQuery]);

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Search Section */}
      <section className="relative z-20 w-full pt-6 pb-6 border-b border-slate-200/70 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-slate-500 mb-4"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[15px]">home</span>
              Home
            </Link>
            <span className="material-symbols-outlined text-[14px] text-slate-400">
              chevron_right
            </span>
            {selectedCategory ? (
              <>
                <Link
                  href="/categories"
                  className="hover:text-primary transition-colors"
                >
                  Categories
                </Link>
                <span className="material-symbols-outlined text-[14px] text-slate-400">
                  chevron_right
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedCategory.name}
                </span>
              </>
            ) : (
              <span className="font-semibold text-slate-800">Categories</span>
            )}
          </nav>

          {/* Title & Search Bar Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <span className="material-symbols-outlined text-[13px]">
                  category
                </span>
                {selectedCategory ? selectedCategory.sector : 'All Categories'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {selectedCategory
                  ? selectedCategory.name
                  : 'All Categories & Subcategories'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                {selectedCategory
                  ? `Choose a subcategory under ${selectedCategory.name} to view top-ranked verified businesses in Amravati.`
                  : `Browse all ${categories.length} main categories and their subcategories across Amravati. Click any subcategory to view its businesses.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Subcategories */}
              <div className="relative w-full sm:w-72">
                <span className="material-symbols-outlined text-[18px] text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search categories or subcategories..."
                  className="w-full h-10 pl-9 pr-8 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => router.push('/categories')}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    grid_view
                  </span>
                  <span>View All Categories</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Subcategory Card Sections (No Business Listings Here) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {loading ? (
          <HomeCategoryCardsSkeleton count={selectedCategory ? 10 : 30} />
        ) : filteredSections.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
            <span className="material-symbols-outlined text-slate-300 text-5xl">
              search_off
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-3">
              No matching subcategories found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try another keyword or reset your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                if (selectedCategory) router.push('/categories');
              }}
              className="mt-4 px-4 py-2 bg-primary hover:bg-[#9e1016] text-white rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Show All Categories
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {filteredSections.map(({ category, subcategories }) => (
              <div key={category.id} className="flex flex-col gap-4">
                {/* Main Category Heading */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {category.icon || 'category'}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        {subcategories.length} subcategories in Amravati
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/businesslisting?category=${encodeURIComponent(
                      category.slug
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-primary hover:text-white text-primary text-xs font-semibold border border-primary/25 shadow-2xs transition-all"
                  >
                    <span>All {category.name} Businesses</span>
                    <span className="material-symbols-outlined text-[14px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                {/* Subcategories Grid — Same Card UI as Landing Page */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2.5 sm:gap-3 w-full">
                  {subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/businesslisting?category=${encodeURIComponent(
                        category.slug
                      )}&sub=${encodeURIComponent(sub.name)}`}
                      className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(183,19,26,0.09)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary/10 text-slate-700 group-hover:text-primary flex items-center justify-center transition-all mb-2 group-hover:scale-110">
                        <span className="material-symbols-outlined text-[20px]">
                          {sub.icon || category.icon || 'category'}
                        </span>
                      </div>
                      <h3 className="text-xs font-semibold text-slate-800 text-center leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {sub.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <HomeCategoryCardsSkeleton count={30} />
        </div>
      }
    >
      <CategoriesPageContent />
    </Suspense>
  );
}
