'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  fetchBusinessBySlug,
  getBusinessImage,
  ApiBusiness,
  ApiReview,
} from '@/lib/api';
import { CATEGORY_COVER_IMAGES } from '@/lib/imagesData';
import { ProfilePageSkeleton } from '@/components/Skeleton';

export default function DynamicBusinessProfilePage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const [business, setBusiness] = useState<ApiBusiness | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'photos' | 'videos'>('services');
  const [isServicesExpanded, setIsServicesExpanded] = useState(true);
  const [copied, setCopied] = useState(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ApiReview[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let active = true;
    fetchBusinessBySlug(slug).then((data) => {
      if (!active) return;
      setBusiness(data);
      setReviewsList(Array.isArray(data?.reviews) ? data.reviews : []);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <ProfilePageSkeleton />;
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#faf8f7] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 max-w-md w-full shadow-xs">
          <span className="material-symbols-outlined text-5xl text-slate-300">
            storefront
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-3">
            Business Profile Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            The listing you are looking for may have been moved or is no longer active.
          </p>
          <Link
            href="/businesslisting"
            className="mt-5 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-[#9c0f15] transition"
          >
            <span>Browse Directory</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  const services = Array.isArray(business.services) ? business.services : [];
  const products = Array.isArray(business.products) ? business.products : [];
  const tags = Array.isArray(business.tags) ? business.tags : [];
  const bannerImg = getBusinessImage(business, 0);
  const customPhotos = Array.isArray(business.photos) && business.photos.length > 0 ? business.photos : null;
  const galleryImages = customPhotos || CATEGORY_COVER_IMAGES[business.categorySlug] || [bannerImg];
  const videos = Array.isArray(business.videos) ? business.videos : [];
  const socialLinks = business.socialLinks || {};
  const isBizonance =
    business.slug === 'bizonance-india-pvt-ltd' || business.slug === 'bizonance';
  const logoSrc =
    business.logoUrl && business.logoUrl.trim()
      ? business.logoUrl.trim()
      : isBizonance
      ? '/bizonance_logo.png'
      : '/boalogo.svg';

  const scrollToReviews = () => {
    const element = document.getElementById('reviews-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${business.name} - Best of Amravati`,
          text: `Discover ${business.name} on Best of Amravati Directory`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore cancel
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;
    const newRev: ApiReview = {
      id: `rev-${Date.now()}`,
      name: newReviewName.trim(),
      rating: newReviewRating,
      timeAgo: 'Just now',
      comment: `"${newReviewText.trim()}"`,
      status: 'approved',
      createdAt: new Date().toISOString(),
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewName('');
    setNewReviewText('');
    setNewReviewRating(5);
    setIsReviewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f7] text-slate-800 pb-14">
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-slate-500 font-medium flex-wrap"
        >
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-slate-300">
            chevron_right
          </span>
          <Link href="/businesslisting" className="hover:text-primary transition-colors">
            Business
          </Link>
          <span className="material-symbols-outlined text-[14px] text-slate-300">
            chevron_right
          </span>
          <Link
            href={`/businesslisting?category=${encodeURIComponent(business.categorySlug || 'all')}`}
            className="hover:text-primary transition-colors"
          >
            {business.category}
          </Link>
          <span className="material-symbols-outlined text-[14px] text-slate-300">
            chevron_right
          </span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {business.name}
          </span>
        </nav>

        {/* ============================================================ */}
        {/* CARD 1: BANNER + OVERLAPPING LOGO + CORE HEADER DETAILS      */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          {/* Cover Banner */}
          <div className="relative w-full h-56 sm:h-72 md:h-84 lg:h-[340px] bg-slate-100 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bannerImg}
              alt={`${business.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-slate-800 shadow-xs">
                {business.sector}
              </span>
            </div>
          </div>

          {/* Profile Identity & Details */}
          <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 pt-0">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 md:gap-8">
              {/* Overlapping Transparent Logo */}
              <div className="relative -mt-16 sm:-mt-20 md:-mt-24 shrink-0 z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-transparent flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoSrc}
                    alt={business.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Title & Core Meta */}
              <div className="flex flex-col gap-1.5 flex-1 pt-2 sm:pt-4 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                    {business.name}
                  </h1>
                  {business.verified && (
                    <span
                      className="inline-flex items-center text-primary shrink-0"
                      title="Verified Business Profile"
                    >
                      <span
                        className="material-symbols-outlined text-[26px] md:text-[30px] text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </span>
                  )}
                </div>

                {/* Rating & Reviews Count */}
                <div className="flex items-center gap-2.5 flex-wrap mt-0.5">
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {Number(business.rating).toFixed(1)}
                  </span>
                  <div className="flex items-center text-[#fbbc04] gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={scrollToReviews}
                    className="text-xs sm:text-sm font-semibold text-primary hover:underline cursor-pointer"
                  >
                    {business.reviewCount} Verified Reviews
                  </button>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-600">
                    {business.pricingTier || 'Verified Listing'}
                  </span>
                </div>

                {/* Category & Location */}
                <p className="text-sm sm:text-base font-medium text-slate-800 mt-1">
                  {business.subCategory || business.category} in {business.locality}, {business.city}
                </p>

                {business.tagline && (
                  <p className="text-xs sm:text-sm font-medium text-slate-700 italic">
                    {business.tagline}
                  </p>
                )}

                {services.length > 0 && (
                  <p className="text-xs sm:text-sm text-slate-600">
                    {services.join(' • ')}
                  </p>
                )}

                <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 mt-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span>{business.address}</span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm mt-1">
                  <span className="text-emerald-700 font-bold">
                    {business.timings || 'Open · Closes 7:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Pills Row */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition shadow-2xs"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">call</span>
                <span>Call Us</span>
              </a>

              <a
                href={`https://wa.me/${(business.whatsapp || business.phone).replace(
                  /\D/g,
                  ''
                )}?text=${encodeURIComponent(
                  `Hello ${business.name}, I found your profile on Best of Amravati Directory.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 text-xs sm:text-sm font-semibold text-[#0d7d36] transition shadow-2xs"
              >
                <span>Enquiry Now</span>
              </a>

              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[17px] text-primary">language</span>
                  <span>Website</span>
                </a>
              )}

              <a
                href={
                  business.directionsUrl && business.directionsUrl.trim()
                    ? business.directionsUrl.trim()
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${business.name} ${business.address}`
                      )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition shadow-2xs"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">directions</span>
                <span>Directions</span>
              </a>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] text-primary">edit_note</span>
                <span>Write a review</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-slate-200 hover:border-primary/40 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px]">share</span>
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* CARD 2: ABOUT US + BUSINESS METADATA + FOLLOW US             */}
        {/* ============================================================ */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              About Us
            </h2>
          </div>

          <div className="flex flex-col gap-3 text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
            {business.about ? (
              <p>{business.about}</p>
            ) : (
              <>
                <p>
                  <strong className="text-slate-900 font-semibold">{business.name}</strong> is a{' '}
                  {business.verified ? 'verified' : 'listed'} commercial establishment in{' '}
                  <strong className="text-slate-800">{business.locality}, {business.city}</strong>, operating in the{' '}
                  <span className="text-primary font-semibold">{business.category}</span> ({business.sector}) vertical.
                  {business.owner ? ` Led by ${business.owner}, ` : ' '}
                  we are committed to delivering trusted quality and dependable service to residents and businesses across Amravati &amp; Vidarbha.
                </p>
                {services.length > 0 && (
                  <p>
                    Our core specializations include {services.join(', ')}. Reach out via Call or WhatsApp for appointments, quotes, or enquiries.
                  </p>
                )}
              </>
            )}
          </div>

          {/* Key Metadata Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#FAF8F7] border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Locality</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{business.locality}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F7] border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Established</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{business.establishedYear || 'Local Enterprise'}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F7] border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Team Size</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">{business.employeeCount || '5-15'} Staff</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FAF8F7] border border-slate-200/70">
              <div className="text-[11px] text-slate-500 font-semibold uppercase">Listing Tier</div>
              <div className="text-sm font-bold text-primary mt-0.5">{business.pricingTier || 'Verified'}</div>
            </div>
          </div>

          {/* Follow Us Bar */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-4 flex-wrap">
            <span className="text-sm font-bold text-slate-900">Follow Us</span>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href={socialLinks.instagram || 'https://instagram.com/bestofamravati/'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-pink-50 hover:bg-pink-100 text-[#E4405F] border border-pink-200/60 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={socialLinks.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0A66C2] border border-blue-200/60 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={socialLinks.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877F2] border border-blue-200/60 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={socialLinks.youtube || 'https://youtube.com/@bestofamravati'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 text-[#FF0000] border border-red-200/60 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={socialLinks.twitter || 'https://x.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* NAVIGATION TABS: SERVICES | PRODUCTS | PHOTOS | VIDEOS       */}
        {/* ============================================================ */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {(['services', 'products', 'photos', 'videos'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* CARD 3: OUR SERVICES / TAB CONTENT                           */}
        {/* ============================================================ */}
        {activeTab === 'services' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">layers</span>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                    Our Services
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    {business.category} • {services.length} Specializations
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isServicesExpanded ? 'Collapse' : 'Expand'}</span>
                <span className="material-symbols-outlined text-base">
                  {isServicesExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {isServicesExpanded && (
              <div className="rounded-2xl border border-slate-200/90 p-5 sm:p-6 bg-[#FAF8F7]/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {business.subCategory || business.category}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {services.length} services available
                    </p>
                  </div>
                </div>

                {services.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {services.map((svc) => (
                      <div
                        key={svc}
                        className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-200/80 bg-white text-xs sm:text-sm font-medium text-slate-800 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                        <span>{svc}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    Contact {business.name} directly for full service offerings.
                  </p>
                )}

                {tags.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-200/70 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {activeTab === 'products' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
              Products &amp; Packages
            </h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {products.map((prod) => (
                  <div
                    key={prod}
                    className="flex items-center gap-2.5 p-3.5 rounded-xl border border-slate-200/80 bg-[#FAF8F7] text-xs sm:text-sm font-semibold text-slate-800"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      inventory_2
                    </span>
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">
                {business.name} provides custom packages under {business.category}. Call{' '}
                <a href={`tel:${business.phone}`} className="text-primary font-semibold hover:underline">
                  {business.phone}
                </a>{' '}
                for pricing and availability.
              </p>
            )}
          </section>
        )}

        {activeTab === 'photos' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((imgUrl, idx) => (
                <div key={idx} className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`${business.name} gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'videos' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Videos &amp; Showcase
            </h2>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((vidUrl, idx) => (
                  <a
                    key={idx}
                    href={vidUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-[#FAF8F7] hover:border-primary/40 transition group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined">play_circle</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-primary truncate">
                        Video Showcase #{idx + 1}
                      </div>
                      <div className="text-xs text-slate-500 truncate">{vidUrl}</div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-slate-300">
                  videocam
                </span>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  No videos uploaded yet for {business.name}.
                </p>
              </div>
            )}
          </section>
        )}

        {/* ============================================================ */}
        {/* CARD 4: REVIEWS SECTION (ALWAYS VISIBLE AT BOTTOM)           */}
        {/* ============================================================ */}
        <section
          id="reviews-section"
          className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5"
        >
          <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className="material-symbols-outlined text-amber-500 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                Reviews
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-medium ml-1">
                {Number(business.rating).toFixed(1)} • ({business.reviewCount} verified reviews)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Write a review</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {reviewsList.length > 0 ? (
            <div className="space-y-3">
              {reviewsList.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F7] border border-slate-200/70"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                        <div className="text-amber-500 text-xs font-bold">
                          {'★'.repeat(Math.round(rev.rating))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{rev.timeAgo}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed italic">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-2xl bg-[#FAF8F7] border border-slate-200/70 text-xs sm:text-sm text-slate-600">
              Rated <strong className="text-slate-900">{Number(business.rating).toFixed(1)} ★</strong> across{' '}
              <strong className="text-slate-900">{business.reviewCount}</strong> verified community reviews.
              Be the first to share your experience!
            </div>
          )}
        </section>
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Write a Review for {business.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <form onSubmit={handleAddReview} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Rajesh Deshmukh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className={`text-2xl cursor-pointer ${
                        star <= newReviewRating ? 'text-amber-500' : 'text-slate-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share your feedback..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-primary resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-primary hover:bg-[#9c0f15] text-white text-xs font-semibold cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
