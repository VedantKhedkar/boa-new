'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTypewriterPlaceholder } from '@/hooks/useTypewriterPlaceholder';
import { DirectoryPageSkeleton } from '@/components/Skeleton';
import {
  fetchCategories,
  fetchBusinesses,
  getBusinessImage,
  ApiCategory,
  ApiBusiness,
} from '@/lib/api';

function BusinessListingContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSub = searchParams.get('sub') || '';
  const urlQuery = searchParams.get('q') || '';

  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [businesses, setBusinesses] = useState<ApiBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(urlSub);
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const typewriterPlaceholder = useTypewriterPlaceholder();

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Full-Screen Carousel ref & auto-scroll state
  const basicScrollRef = useRef<HTMLDivElement>(null);
  const [isBasicHovered, setIsBasicHovered] = useState(false);

  // Fetch live categories & businesses from database
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

  // Sync URL params
  useEffect(() => {
    setSelectedCategory(urlCategory || 'all');
  }, [urlCategory]);

  useEffect(() => {
    if (urlQuery) setSearchQuery(urlQuery);
  }, [urlQuery]);

  // Build category grid items ("All Categories" + DB categories)
  const categoryGridItems = useMemo(() => {
    return [
      { id: 'all', slug: 'all', name: 'All Categories', icon: 'grid_view' },
      ...categories.map((c) => ({
        id: c.slug,
        slug: c.slug,
        name: c.name,
        icon: c.icon || 'category',
      })),
    ];
  }, [categories]);

  // Separate Verified / Ranked listings vs Basic Pack listings
  const rankedBusinesses = useMemo(() => {
    const verifiedList = businesses.filter(
      (b) => b.pricingTier !== 'Basic Pack' && b.status === 'verified'
    );

    return verifiedList
      .filter((b) => {
        if (selectedCategory !== 'all') {
          const matchesSlug = b.categorySlug === selectedCategory;
          const matchesName =
            b.category.toLowerCase() === selectedCategory.toLowerCase();
          if (!matchesSlug && !matchesName) return false;
        }

        if (selectedSubCategory.trim() !== '') {
          const subQ = selectedSubCategory.toLowerCase();
          const subWords = subQ
            .split(/[\s&/,-]+/)
            .filter((w) => w.length > 2);
          const services = Array.isArray(b.services) ? b.services : [];
          const bizSub = (b.subCategory || '').toLowerCase();
          const bizText = `${b.name} ${bizSub} ${services.join(' ')}`.toLowerCase();
          const matchesSub =
            bizSub.includes(subQ) ||
            bizText.includes(subQ) ||
            subWords.some((w) => bizText.includes(w));
          if (!matchesSub) return false;
        }

        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const services = Array.isArray(b.services) ? b.services : [];
          const matchesName = b.name.toLowerCase().includes(q);
          const matchesCat = b.category.toLowerCase().includes(q);
          const matchesServices = services.some((s) =>
            String(s).toLowerCase().includes(q)
          );
          const matchesAddress = b.address.toLowerCase().includes(q);
          const matchesLocality = b.locality.toLowerCase().includes(q);
          if (
            !matchesName &&
            !matchesCat &&
            !matchesServices &&
            !matchesAddress &&
            !matchesLocality
          ) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return b.rating - a.rating;
      });
  }, [businesses, selectedCategory, selectedSubCategory, searchQuery]);

  const activeCategorySubcategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const found = categories.find((c) => c.slug === selectedCategory);
    return found?.subcategories || [];
  }, [categories, selectedCategory]);

  // Search suggestions (universal: categories + businesses)
  const suggestionCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return categories
      .filter((c) => {
        const keywords = Array.isArray(c.metadata?.searchKeywords)
          ? c.metadata.searchKeywords
          : [];
        return (
          c.name.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          keywords.some((k) => String(k).toLowerCase().includes(q))
        );
      })
      .slice(0, 6);
  }, [categories, searchQuery]);

  const suggestionBusinesses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return businesses
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
      .slice(0, 6);
  }, [businesses, searchQuery]);

  // Basic Pack / Entry Tier listings for bottom carousel
  const filteredBasicPartners = useMemo(() => {
    const basicList = businesses.filter(
      (b) => b.pricingTier === 'Basic Pack' || !b.verified
    );

    let list = basicList;
    if (selectedCategory !== 'all') {
      const categoryMatches = basicList.filter(
        (b) =>
          b.categorySlug === selectedCategory ||
          b.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      const otherMatches = basicList.filter(
        (b) =>
          b.categorySlug !== selectedCategory &&
          b.category.toLowerCase() !== selectedCategory.toLowerCase()
      );
      list = [...categoryMatches, ...otherMatches];
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.locality.toLowerCase().includes(q) ||
          b.address.toLowerCase().includes(q)
      );
    }

    return list;
  }, [businesses, selectedCategory, searchQuery]);

  const groupedByCategory = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim() !== '') return [];
    const map = new Map<string, ApiBusiness[]>();
    rankedBusinesses.forEach((b) => {
      const key = b.categorySlug || b.category;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    });
    return categories
      .map((cat) => ({
        category: cat,
        items: map.get(cat.slug) || map.get(cat.name) || [],
      }))
      .filter((g) => g.items.length > 0);
  }, [categories, rankedBusinesses, selectedCategory, searchQuery]);

  // Auto-scroll one card at a time
  useEffect(() => {
    if (isBasicHovered || filteredBasicPartners.length === 0) return;
    const container = basicScrollRef.current;
    if (!container) return;

    const timer = setInterval(() => {
      const firstCard = container.firstElementChild as HTMLElement | null;
      const step = firstCard ? firstCard.offsetWidth + 16 : 280;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 25
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isBasicHovered, filteredBasicPartners]);

  const handleBasicScroll = (direction: 'left' | 'right') => {
    const container = basicScrollRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 16 : 280;
    container.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  if (loading) {
    return <DirectoryPageSkeleton />;
  }

  const currentCategoryMeta =
    categoryGridItems.find((c) => c.slug === selectedCategory) ||
    categoryGridItems[0];

  const renderBusinessCard = (company: ApiBusiness, idx: number) => {
    const rankNumber = idx + 1;
    const isTopRank = company.featured || rankNumber === 1;
    const services = Array.isArray(company.services) ? company.services : [];
    const imageSrc = getBusinessImage(company, idx);

    return (
      <article
        key={company.id}
        className={`relative flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden group transition-all duration-300 border border-slate-200/90 ${
          isTopRank
            ? 'shadow-[0_4px_24px_rgba(183,19,26,0.08)] hover:shadow-[0_8px_30px_rgba(183,19,26,0.12)] hover:border-primary/40'
            : 'shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-slate-300'
        }`}
      >
        {/* Left Visual / Image Presentation (Fixed 4:3 Aspect Ratio) */}
        <div className="w-full sm:w-64 md:w-72 aspect-[4/3] relative overflow-hidden bg-slate-100 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={`${company.name} in ${company.locality}, Amravati`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden" />

          {/* Ranking Badge */}
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-slate-200/80">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-[#8c0b11] text-white flex items-center justify-center text-[10.5px] font-black leading-none shadow-xs">
              #{rankNumber}
            </span>
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              Best #{rankNumber}
            </span>
          </div>

          {/* Mobile Area Badge */}
          <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-white sm:hidden text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm truncate max-w-[170px]">
              {company.locality || 'Amravati'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 font-medium">
              {company.timings || 'Open · 7:00 PM'}
            </span>
          </div>
        </div>

        {/* Right Content & Operational Details */}
        <div className="p-4 sm:p-5 flex flex-col justify-between gap-3 flex-1">
          <div className="flex flex-col gap-2">
            {/* Title with Verified Tick */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href={`/business/${company.slug}`} className="group/title">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover/title:text-primary transition-colors">
                  {company.name}
                </h3>
              </Link>
              {company.verified && (
                <span
                  className="inline-flex items-center text-primary shrink-0"
                  title="Verified Business"
                >
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </span>
              )}
              <span className="ml-auto px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10.5px] font-semibold">
                {company.category}
              </span>
            </div>

            {/* Google Reviews Rating & Timing Line */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-label="Google Review">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="text-xs font-bold text-slate-800 leading-none">
                  {Number(company.rating).toFixed(1)}
                </span>
                <div className="flex items-center text-[#e7711b] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[10.5px] text-slate-500 font-medium">
                  ({company.reviewCount})
                </span>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10.5px] font-medium border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {company.timings || 'Open · Closes 7:00 PM'}
              </span>
            </div>

            {services.length > 0 && (
              <div className="flex flex-wrap gap-1 my-0.5">
                {services.slice(0, 5).map((svc) => (
                  <span
                    key={svc}
                    className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/70 text-slate-600 text-[11px] font-medium"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-1 text-[11px] text-slate-500 mt-0.5">
              <div className="flex items-start gap-1">
                <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span className="leading-snug">{company.address}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <a
                href={`tel:${company.phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200/80 hover:border-slate-300 shadow-2xs transition-all active:scale-95 group/btn"
              >
                <svg className="w-3.5 h-3.5 text-primary shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${(company.whatsapp || company.phone).replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello ${company.name}, I found your verified business profile on Best of Amravati Directory.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#0d7d36] text-xs font-semibold border border-[#25D366]/30 hover:border-[#25D366]/50 shadow-2xs transition-all active:scale-95 group/btn"
              >
                <svg className="w-3.5 h-3.5 shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#25D366" d="M12.004 2C6.486 2 2.008 6.478 2.008 11.996c0 1.815.488 3.522 1.341 5.004L2 22l5.163-1.323a9.954 9.954 0 0 0 4.841 1.32c5.518 0 9.996-4.478 9.996-9.996C22 6.478 17.522 2 12.004 2z" />
                  <path fill="#FFFFFF" d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.634-.927-2.237-.244-.588-.492-.508-.677-.518-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.802.375-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            <Link
              href={`/business/${company.slug}`}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-[#9e1016] text-white text-xs font-semibold shadow-xs transition"
            >
              <span>View Profile</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hero & Search Header Section (z-30 so suggestions overlay floats above listings stream) */}
      <section className="relative z-30 w-full pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-3"
          >
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] text-slate-300">
              chevron_right
            </span>
            <Link href="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <span className="material-symbols-outlined text-[14px] text-slate-300">
              chevron_right
            </span>
            {selectedCategory !== 'all' && selectedSubCategory ? (
              <>
                <Link
                  href={`/categories?category=${encodeURIComponent(selectedCategory)}`}
                  className="hover:text-primary transition-colors"
                >
                  {currentCategoryMeta?.name}
                </Link>
                <span className="material-symbols-outlined text-[14px] text-slate-300">
                  chevron_right
                </span>
                <span className="text-slate-900 font-semibold">
                  {selectedSubCategory}
                </span>
              </>
            ) : (
              <span className="text-slate-900 font-semibold">
                {currentCategoryMeta?.name || 'All Categories'} Listings
              </span>
            )}
          </nav>

          {/* Search Omnibox with Universal Rich Suggestions */}
          <div ref={searchWrapperRef} className="relative w-full max-w-xl mx-auto my-3 sm:my-4 z-50">
            <div className="relative flex items-center bg-white rounded-full border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(183,19,26,0.08)] hover:border-primary/40 transition-all duration-300 p-1">
              <div className="pl-3.5 flex items-center justify-center pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M16 16l4.5 4.5" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setIsSearchFocused(false);
                }}
                placeholder={typewriterPlaceholder}
                className="w-full py-2 pl-3 pr-3 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 placeholder:italic focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-slate-400 hover:text-slate-600 transition"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-base">
                    close
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsSearchFocused(false)}
                aria-label="Submit search"
                className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-primary to-[#9c0f15] text-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(183,19,26,0.25)] hover:brightness-105 active:scale-95 transition-all shrink-0 cursor-pointer"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>

            {/* Larger Floating Search Suggestions Panel */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-[680px] top-[calc(100%+10px)] z-50 bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.16)] p-4 sm:p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Matching Categories */}
                {suggestionCategories.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Matching Categories
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {suggestionCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setSearchQuery('');
                            setIsSearchFocused(false);
                            window.history.pushState(
                              null,
                              '',
                              `/businesslisting?category=${encodeURIComponent(cat.slug)}`
                            );
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-primary/10 border border-slate-200/80 hover:border-primary/40 text-xs font-semibold text-slate-800 hover:text-primary transition cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px] text-primary">
                            {cat.icon || 'category'}
                          </span>
                          <span>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matching Businesses (Larger Rich Preview Cards) */}
                {suggestionBusinesses.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Top Matching Businesses
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsSearchFocused(false)}
                        className="text-[11px] font-semibold text-primary hover:underline cursor-pointer"
                      >
                        Filter list below ↓
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {suggestionBusinesses.map((biz, idx) => {
                        const svcs = Array.isArray(biz.services) ? biz.services : [];
                        return (
                          <Link
                            key={biz.id}
                            href={`/business/${biz.slug}`}
                            onClick={() => setIsSearchFocused(false)}
                            className="group flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF8F7]/70 hover:bg-white border border-slate-200/70 hover:border-primary/40 hover:shadow-md transition-all"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/60">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={getBusinessImage(biz, idx)}
                                alt={biz.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
                                  {biz.name}
                                </h4>
                                {biz.verified && (
                                  <span
                                    className="material-symbols-outlined text-[15px] text-primary shrink-0"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                  >
                                    verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                                <span className="font-bold text-amber-600">
                                  ★ {Number(biz.rating).toFixed(1)}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="truncate font-medium text-slate-700">
                                  {biz.category}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span className="truncate">{biz.locality}</span>
                              </div>
                              {svcs.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {svcs.slice(0, 2).map((s) => (
                                    <span
                                      key={s}
                                      className="px-1.5 py-0.5 rounded bg-white border border-slate-200/70 text-[10px] text-slate-600 font-medium truncate max-w-[110px]"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {suggestionCategories.length === 0 &&
                  suggestionBusinesses.length === 0 && (
                    <div className="py-4 text-center text-xs text-slate-500">
                      No quick matches for &quot;{searchQuery}&quot;. Try another keyword.
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* Small Category Cards Grid */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[13px] text-slate-900 tracking-wider flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-primary text-sm">
                  category
                </span>
                Browse By Category ({categories.length}):
              </span>
              {categoryGridItems.length > 24 && (
                <button
                  type="button"
                  onClick={() =>
                    setIsCategoriesExpanded(!isCategoriesExpanded)
                  }
                  className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-primary/40 text-slate-600 hover:text-primary text-xs font-medium shadow-2xs transition-all cursor-pointer"
                  title={
                    isCategoriesExpanded
                      ? 'Show less categories'
                      : 'Show all categories'
                  }
                >
                  <span>{isCategoriesExpanded ? 'Less' : 'All'}</span>
                  <span
                    className={`material-symbols-outlined text-[17px] text-slate-500 group-hover:text-primary transition-transform duration-200 ${
                      isCategoriesExpanded ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1.5 sm:gap-2">
              {(isCategoriesExpanded
                ? categoryGridItems
                : categoryGridItems.slice(0, 24)
              ).map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setSelectedSubCategory('');
                      const newUrl =
                        cat.slug === 'all'
                          ? '/businesslisting'
                          : `/businesslisting?category=${encodeURIComponent(
                              cat.slug
                            )}`;
                      window.history.pushState(null, '', newUrl);
                    }}
                    className={`group aspect-square p-1.5 sm:p-2 rounded-xl transition-all duration-200 text-center flex flex-col items-center justify-center gap-1 cursor-pointer relative ${
                      isSelected
                        ? 'bg-white border-2 border-primary shadow-[0_4px_14px_rgba(183,19,26,0.12)] ring-2 ring-primary/10 -translate-y-0.5'
                        : 'bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-xs hover:-translate-y-0.5'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-slate-50 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] sm:text-[19px]">
                        {cat.icon}
                      </span>
                    </div>
                    <span
                      className={`text-[9.5px] sm:text-[10.5px] leading-tight line-clamp-2 px-0.5 font-['Inter',sans-serif] ${
                        isSelected
                          ? 'font-medium text-primary'
                          : 'font-normal text-slate-600 group-hover:text-slate-900 transition-colors'
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subcategories Filter Strip when a Main Category is Selected */}
            {selectedCategory !== 'all' && activeCategorySubcategories.length > 0 && (
              <div className="mt-4 pt-3.5 border-t border-slate-200/70">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Subcategories ({activeCategorySubcategories.length})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSubCategory('')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSubCategory === ''
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-primary/40 hover:text-primary'
                    }`}
                  >
                    All {currentCategoryMeta?.name}
                  </button>
                  {activeCategorySubcategories.map((sub) => {
                    const isSubActive =
                      selectedSubCategory.toLowerCase() === sub.name.toLowerCase();
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() =>
                          setSelectedSubCategory(isSubActive ? '' : sub.name)
                        }
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                          isSubActive
                            ? 'bg-primary text-white border-primary shadow-xs font-semibold'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-primary/40 hover:text-primary'
                        }`}
                      >
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Listings Stream Container */}
      <section className="relative z-10 w-full py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-5">
          {selectedCategory === 'all' && searchQuery.trim() === '' ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-1">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider mb-1.5">
                    <span className="material-symbols-outlined text-[13px]">
                      workspace_premium
                    </span>
                    All Categories
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent">
                    Best of Amravati
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Top-ranked verified businesses across all {groupedByCategory.length} categories in Amravati.
                  </p>
                </div>
              </div>
              {groupedByCategory.map(({ category, items }) => {
              const topItems = items.slice(0, 5);
              return (
                <div key={category.slug} className="flex flex-col gap-4 mb-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          {category.icon || 'workspace_premium'}
                        </span>
                      </span>
                      <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                          Best in {category.name}
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          Top {topItems.length} verified businesses in Amravati
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory(category.slug);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-primary hover:text-white text-primary text-xs font-semibold border border-primary/25 shadow-2xs transition-all cursor-pointer"
                    >
                      <span>View {category.name}</span>
                      <span className="material-symbols-outlined text-[14px]">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    {topItems.map((company, idx) =>
                      renderBusinessCard(company, idx)
                    )}
                  </div>
                </div>
              );
              })}
            </>
          ) : (
            <>
              {rankedBusinesses.length > 0 && (
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-slate-200/80">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                      {searchQuery.trim() !== ''
                        ? `Search Results for "${searchQuery}"`
                        : `Best in ${currentCategoryMeta?.name || 'Amravati'}`}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Showing {rankedBusinesses.length} verified{' '}
                      {rankedBusinesses.length === 1 ? 'business' : 'businesses'}
                    </p>
                  </div>
                  {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-2xs transition cursor-pointer"
                    >
                      <span>All Categories</span>
                    </button>
                  )}
                </div>
              )}
              {rankedBusinesses.map((company, idx) =>
                renderBusinessCard(company, idx)
              )}
            </>
          )}

          {/* Empty Search / Filter State */}
          {rankedBusinesses.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
              <span className="material-symbols-outlined text-slate-300 text-5xl">
                search_off
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">
                No matching businesses found
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No verified listings match &quot;{searchQuery}&quot; under{' '}
                {currentCategoryMeta?.name}. Try searching for another service
                or choose &quot;All Categories&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-primary hover:bg-[#9e1016] text-white rounded-xl text-xs font-semibold transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Basic Plan Community Partners Section */}
      {filteredBasicPartners.length > 0 && (
        <section className="relative z-10 w-full py-10 border-t border-slate-200/80 overflow-hidden">
          <div className="w-full px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                  Other Businesses in Amravati (Basic Plan)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Explore local establishments, neighborhood shops, and community services beyond the Best 5.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <span className="text-xs text-slate-500 font-medium mr-1 hidden sm:inline">
                  {filteredBasicPartners.length} Basic Listings
                </span>
                <button
                  type="button"
                  onClick={() => handleBasicScroll('left')}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-primary/40 hover:bg-slate-50 text-slate-700 hover:text-primary flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                  aria-label="Previous businesses"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    chevron_left
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleBasicScroll('right')}
                  className="w-9 h-9 rounded-full bg-white border border-slate-200/80 hover:border-primary/40 hover:bg-slate-50 text-slate-700 hover:text-primary flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
                  aria-label="Next businesses"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            <div
              ref={basicScrollRef}
              onMouseEnter={() => setIsBasicHovered(true)}
              onMouseLeave={() => setIsBasicHovered(false)}
              className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none no-scrollbar snap-x snap-mandatory"
            >
              {filteredBasicPartners.map((item, idx) => (
                <div
                  key={item.id}
                  className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getBusinessImage(item, idx)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-700 shadow-xs border border-slate-200/60">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-1.5 py-0.5 rounded-md bg-amber-600 text-[9px] font-bold text-white shadow-xs">
                        {item.pricingTier || 'Basic Pack'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5">
                    <div>
                      <Link href={`/business/${item.slug}`}>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <svg
                          className="w-3 h-3 shrink-0"
                          viewBox="0 0 24 24"
                          aria-label="Google"
                        >
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span className="text-[11px] font-bold text-slate-800 leading-none">
                          {Number(item.rating).toFixed(1)}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({item.reviewCount})
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10.5px] text-slate-500 truncate">
                          {item.locality}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${item.phone}`}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[10.5px] font-semibold border border-slate-200/60 transition flex items-center justify-center gap-1 active:scale-95 group/btn"
                      >
                        <svg
                          className="w-3 h-3 text-primary shrink-0 group-hover/btn:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${(item.whatsapp || item.phone).replace(
                          /\D/g,
                          ''
                        )}?text=${encodeURIComponent(
                          `Hello ${item.name}, I found your listing on Best of Amravati Directory.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#0d7d36] text-[10.5px] font-semibold border border-[#25D366]/30 transition flex items-center justify-center gap-1 active:scale-95 group/btn"
                      >
                        <svg
                          className="w-3 h-3 shrink-0 group-hover/btn:scale-110 transition-transform"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#25D366"
                            d="M12.004 2C6.486 2 2.008 6.478 2.008 11.996c0 1.815.488 3.522 1.341 5.004L2 22l5.163-1.323a9.954 9.954 0 0 0 4.841 1.32c5.518 0 9.996-4.478 9.996-9.996C22 6.478 17.522 2 12.004 2z"
                          />
                          <path
                            fill="#FFFFFF"
                            d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.634-.927-2.237-.244-.588-.492-.508-.677-.518-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.802.375-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351z"
                          />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function BusinessListingPage() {
  return (
    <Suspense fallback={<DirectoryPageSkeleton />}>
      <BusinessListingContent />
    </Suspense>
  );
}
