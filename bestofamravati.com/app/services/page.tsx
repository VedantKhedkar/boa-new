'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBusinesses, getBusinessImage, ApiBusiness } from '@/lib/api';
import { BusinessCardSkeleton } from '@/components/Skeleton';

export default function ServicesPage() {
  const [businesses, setBusinesses] = useState<ApiBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterOpenNow, setFilterOpenNow] = useState(false);
  const [sortByRating, setSortByRating] = useState(true);

  useEffect(() => {
    let active = true;
    fetchBusinesses({ category: 'it-software', status: 'verified' }).then((data) => {
      if (!active) return;
      setBusinesses(data);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  const filteredCompanies = [...businesses]
    .filter((b) => {
      if (filterVerifiedOnly && !b.verified) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      if (sortByRating) return b.rating - a.rating;
      return 0;
    })
    .slice(0, 5)
    .map((b, idx) => ({
      rank: `0${idx + 1}`,
      name: b.name,
      isFeatured: b.featured || idx === 0,
      rating: Number(b.rating),
      reviewsCount: b.reviewCount,
      timing: 'Open · Closes 7 pm',
      isOpenNow: true,
      services: Array.isArray(b.services) ? b.services : [],
      address: b.address,
      highlights: b.verified ? ['Locally Verified', b.locality] : [b.locality],
      image: getBusinessImage(b, idx),
      imageAlt: `${b.name} office in ${b.locality}, Amravati`,
      profileUrl: `/business/${b.slug}`,
      phone: b.phone,
    }));

  return (
    <div className="flex flex-col w-full bg-[#faf8f7]">
      {/* Top Ambient Glow & Page Header */}
      <div className="w-full relative overflow-hidden bg-white pb-8 border-b border-slate-200/80">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 -left-24 w-80 h-80 rounded-full bg-primary/5 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-4">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="text-slate-600">Services & Tech</span>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="text-slate-900 font-semibold">
              Best 5 Software & IT Companies in Amravati
            </span>
          </nav>

          {/* Page Header & Civic Trust Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
            <div className="max-w-3xl flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold w-fit mb-1">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span>Civic Certified Directory • Updated Q2 2024</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-extrabold leading-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                Best 5 Software &amp; IT Companies in Amravati
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Verified, top-rated local enterprises evaluated for service excellence, client satisfaction, and technical performance across Vidarbha.
              </p>
            </div>

            {/* Trust Mini Counter / Metric Pill */}
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2.5 rounded-2xl shrink-0 self-start lg:self-auto border border-slate-200/80">
              <div className="flex flex-col">
                <span className="text-xl text-primary font-bold leading-none">100%</span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">Locally Verified</span>
              </div>
              <div className="w-px h-7 bg-slate-200"></div>
              <div className="flex flex-col">
                <span className="text-xl text-slate-900 font-bold leading-none">157+</span>
                <span className="text-[11px] text-slate-500 font-medium mt-0.5">Peer Reviews</span>
              </div>
            </div>
          </div>

          {/* Filter / Sort Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 sm:p-3 bg-white rounded-2xl shadow-sm px-4 border border-slate-200/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500     tracking-wider mr-1">
                Filters:
              </span>

              {/* Ranked by Rating Pill */}
              <button
                onClick={() => setSortByRating(!sortByRating)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-transform active:scale-95 ${sortByRating
                    ? 'bg-primary text-white shadow-[0_2px_8px_rgba(183,19,26,0.25)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">military_tech</span>
                <span>Ranked by Rating</span>
                {sortByRating && <span className="material-symbols-outlined text-[14px]">check</span>}
              </button>

              {/* Verified Only Pill */}
              <button
                onClick={() => setFilterVerifiedOnly(!filterVerifiedOnly)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${filterVerifiedOnly
                    ? 'bg-primary text-white shadow-[0_2px_8px_rgba(183,19,26,0.25)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                <span>Verified Only</span>
              </button>

              {/* Toggle Open Now Pill */}
              <button
                onClick={() => setFilterOpenNow(!filterOpenNow)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${filterOpenNow
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Open Now</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <span>
                Displaying <strong>{filteredCompanies.length} of {businesses.length}</strong> Top Listed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Stream Container */}
      <div className="w-full py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {loading ? (
            <>
              <BusinessCardSkeleton />
              <BusinessCardSkeleton />
              <BusinessCardSkeleton />
            </>
          ) : (
            filteredCompanies.map((company) => {
            const isTopRank = company.isFeatured;

            return (
              <article
                key={company.rank}
                className={`relative flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden group transition-all duration-300 border border-slate-200/90 ${isTopRank
                    ? 'shadow-[0_8px_30px_rgba(183,19,26,0.08)] hover:shadow-[0_16px_40px_rgba(183,19,26,0.14)] hover:border-primary/50'
                    : 'shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-slate-300'
                  }`}
              >
                {/* Top Featured Badge Ribbon for #1 */}
                {isTopRank && (
                  <div className="absolute top-0 right-0 z-20">
                    <div className="bg-gradient-to-r from-primary to-[#9c0f15] text-white px-4 py-1 rounded-bl-2xl text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/boalogo.svg" alt="BOA" className="w-3.5 h-3.5 object-cover rounded-full" />
                      <span>BOA #1 Choice • Featured Enterprise</span>
                    </div>
                  </div>
                )}

                {/* Left Visual / Image Presentation */}
                <div
                  className={`${isTopRank ? 'lg:w-2/5 min-h-[240px]' : 'lg:w-1/3 min-h-[200px]'
                    } lg:min-h-full relative overflow-hidden bg-slate-100`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={company.image}
                    alt={company.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden"></div>

                  {/* Floating Rank Badge */}
                  <div
                    className={`absolute top-4 left-4 z-10 ${isTopRank
                        ? 'w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-[#8c0b11] text-white shadow-lg'
                        : 'w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-900 shadow-md border border-slate-200'
                      } flex flex-col items-center justify-center font-extrabold leading-none`}
                  >
                    <span className="text-[9px]     tracking-wider opacity-80 leading-none">
                      Rank
                    </span>
                    <span className={`text-base font-black ${isTopRank ? 'text-white' : 'text-primary'}`}>
                      {company.rank}
                    </span>
                  </div>

                  {/* Bottom Micro Badge on Image for Mobile */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white lg:hidden text-xs">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm truncate max-w-[180px]">
                      {company.address.split(',')[1]?.trim() || 'Amravati'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600/90 font-semibold">
                      {company.timing}
                    </span>
                  </div>
                </div>

                {/* Right Content & Operational Details */}
                <div className={`${isTopRank ? 'lg:w-3/5' : 'lg:w-2/3'} p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-4`}>
                  <div className="flex flex-col gap-2">
                    {/* Top: Business Title with Verified Tick next to it */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Link href={company.profileUrl} className="group/title">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight group-hover/title:text-primary transition-colors">
                          {company.name}
                        </h2>
                      </Link>
                      <span className="inline-flex items-center text-primary shrink-0" title="Verified Business">
                        <span className="material-symbols-outlined text-[20px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                      </span>
                    </div>

                    {/* Below Title: Google Reviews Rating & Timing Line */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Google Reviews Style Rating */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                        {/* Official Google G Logo */}
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" aria-label="Google Review">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span className="text-xs font-bold text-slate-800 leading-none">
                          {company.rating.toFixed(1)}
                        </span>
                        {/* Authentic Google Stars */}
                        <div className="flex items-center text-[#e7711b] gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium">
                          ({company.reviewsCount})
                        </span>
                      </div>

                      {/* Status Tag (Desktop) */}
                      <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {company.timing}
                      </span>
                    </div>

                    {/* Tags / Services */}
                    <div className="flex flex-wrap gap-1.5 my-1">
                      {company.services.map((svc) => (
                        <span
                          key={svc}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>

                    {/* Address and Micro Info */}
                    <div className="flex flex-col gap-1 text-xs text-slate-600 mt-1">
                      <div className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[17px] shrink-0 mt-0.5">
                          location_on
                        </span>
                        <span className="leading-relaxed">{company.address}</span>
                      </div>
                      {company.highlights && (
                        <div className="flex items-center gap-2 mt-1">
                          {company.highlights.map((hl) => (
                            <span
                              key={hl}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md"
                            >
                              <span className="material-symbols-outlined text-[13px]">check</span>
                              {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Operational Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${company.phone}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-primary/5 text-xs font-semibold transition-all shadow-2xs active:scale-95 group/btn"
                      >
                        {/* Premium Phone Call SVG Icon */}
                        <svg className="w-3.5 h-3.5 text-primary shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>Call Business</span>
                      </a>
                      <a
                        href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/10 text-[#0d7d36] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold transition-colors shadow-2xs active:scale-95 group/btn"
                      >
                        {/* Official Original WhatsApp SVG Icon */}
                        <svg className="w-3.5 h-3.5 shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                          <path
                            fill="#25D366"
                            d="M12.004 2C6.486 2 2.008 6.478 2.008 11.996c0 1.815.488 3.522 1.341 5.004L2 22l5.163-1.323a9.954 9.954 0 0 0 4.841 1.32c5.518 0 9.996-4.478 9.996-9.996C22 6.478 17.522 2 12.004 2z"
                          />
                          <path
                            fill="#FFFFFF"
                            d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.634-.927-2.237-.244-.588-.492-.508-.677-.518-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.802.375-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351z"
                          />
                        </svg>
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>

                    <Link
                      href={company.profileUrl}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-primary to-[#9c0f15] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(183,19,26,0.25)] hover:shadow-[0_4px_14px_rgba(183,19,26,0.38)] hover:brightness-105 active:scale-95 transition-all ml-auto"
                    >
                      <span>Explore Profile</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
          )}
        </div>
      </div>

      {/* Civic Evaluation Standard Note */}
      <div className="w-full bg-white py-8 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900">
                How are the Best 5 chosen?
              </span>
              <span className="text-xs text-slate-600 mt-0.5 max-w-xl">
                Evaluated quarterly via verified client track records, on-ground Amravati presence, registered MSME/CIN credentials, and response reliability.
              </span>
            </div>
          </div>
          <Link
            href="/join-us"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-primary hover:bg-primary hover:text-white hover:border-primary text-xs font-semibold shadow-xs transition-all whitespace-nowrap"
          >
            <span>Are you an IT firm in Amravati? Claim Listing</span>
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
