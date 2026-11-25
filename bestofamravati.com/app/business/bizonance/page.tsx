'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  timeAgo: string;
  content: string;
}

const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Aashish Nagdive',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '4 months ago',
    content:
      '"Thank you, Aashish Nagdive, for your 5-star rating and support for BIZONANCE. We truly appreciate your trust in our services. Your encouragement motivates our team to continue delivering high quality website development, digital advertising, SEO, social media marketing, and branding solutions for businesses."',
  },
  {
    id: '2',
    name: 'Imagine Creative Photography',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: 'a year ago',
    content:
      '"We recently availed digital marketing services from BIZONANCE for our photography business, and we are extremely happy with the results. Their team is professional, creative, and truly understands how to market photo studios."',
  },
  {
    id: '3',
    name: 'Dhananjay Bhakare',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: 'a year ago',
    content:
      '"BIZONANCE did an amazing job creating a website for my business. Their team was professional, responsive, and delivered exactly what I needed. The design is sleek, user-friendly, and perfectly represents my brand. I\'m fully satisfied with their service and highly recommend them to anyone looking for a top-notch website."',
  },
  {
    id: '4',
    name: 'MR Juned',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: 'a year ago',
    content:
      '"Best guidance. Thank you team Bizonance for assisting with phone number verification on our business profile."',
  },
  {
    id: '5',
    name: 'Dinesh Pawar',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '2 years ago',
    content:
      '"I recently had the pleasure of working with BIZONANCE, and I am thoroughly impressed by their diverse range of services. Their expertise in social media management and web development helped enhance our online presence significantly."',
  },
  {
    id: '6',
    name: 'Quick Creation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '2 years ago',
    content:
      '"Grate Services for Digital marketing. Excellent strategy and execution by Bizonance."',
  },
  {
    id: '7',
    name: 'Yash Dubey',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '3 years ago',
    content:
      '"Great experience working with Bizonance team. Very prompt and professional service!"',
  },
  {
    id: '8',
    name: 'Noman Mansuri',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '3 years ago',
    content:
      '"Best Google business manager in the region. Highly recommended!"',
  },
  {
    id: '9',
    name: 'ASLAM KHAN',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '3 years ago',
    content:
      '"Best google business agency in amravati."',
  },
  {
    id: '10',
    name: 'Sagar Bahadurkar',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&q=80',
    rating: 5,
    timeAgo: '3 years ago',
    content:
      '"Best google business agency. I am happy with services provided by team bizonance."',
  },
];

const SOFTWARE_SERVICES = [
  'Application development',
  'Business to Business',
  'Cloud services',
  'Enterprise software development',
  'IT consulting',
  'Mobile App development',
  'Software consulting',
  'Software development',
  'Software development outsourcing',
  'Solution consulting',
  'Ecommerce services',
];

const MARKETING_SERVICES = [
  'Digital Marketing Strategy',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing (SMM)',
  'Google Business Profile Setup',
  'Content Marketing & Copywriting',
  'Pay-Per-Click Advertising (PPC)',
  'Performance Analytics',
  'Email Marketing Automation',
];

const ADVERTISING_SERVICES = [
  'Brand Positioning',
  'Media Planning & Buying',
  'Creative Ad Campaign Design',
  'Local Geo-Targeted Promotions',
];

const PHOTOS_LIST = [
  {
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    caption: 'Corporate Headquarters Corridor',
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Software Engineering Team Collaboration',
  },
  {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Strategic Digital Marketing Sprint',
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    caption: 'Enterprise Consultation Room',
  },
];

export default function BizonanceProfilePage() {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'photos' | 'videos'>('services');
  const [softwareOpen, setSoftwareOpen] = useState(true);
  const [marketingOpen, setMarketingOpen] = useState(false);
  const [advertisingOpen, setAdvertisingOpen] = useState(false);
  const [showHoursDropdown, setShowHoursDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);

  // Trigger copy toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Share link
  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'BIZONANCE INDIA PVT. LTD. - Best of Amravati',
            text: 'Discover BIZONANCE INDIA PVT. LTD. on Best of Amravati Directory',
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          triggerToast('Profile link copied to clipboard!');
        }
      } catch {
        triggerToast('Profile link copied to clipboard!');
      }
    }
  };

  // Handle Add Review
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: String(Date.now()),
      name: newReviewName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80',
      rating: newReviewRating,
      timeAgo: 'Just now',
      content: `"${newReviewComment.trim()}"`,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewReviewName('');
    setNewReviewComment('');
    triggerToast('Thank you! Your review has been submitted.');
  };

  // Toggle All Accordions
  const areAllExpanded = softwareOpen && marketingOpen && advertisingOpen;
  const toggleAll = () => {
    const nextState = !areAllExpanded;
    setSoftwareOpen(nextState);
    setMarketingOpen(nextState);
    setAdvertisingOpen(nextState);
  };

  const scrollToReviews = () => {
    const element = document.getElementById('reviews-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans pb-16 overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects matching landing page */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Write a Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200/80 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <h3 className="text-base font-bold text-slate-900">Write a Review</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddReview} className="mt-4 flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <svg
                        className={`w-6 h-6 ${star <= newReviewRating ? 'text-[#f59e0b]' : 'text-slate-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">{newReviewRating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Review</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your experience working with BIZONANCE..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-[#9e1016] text-white text-xs font-semibold shadow-xs transition"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Container - Matched to wide viewport proportions */}
      <div className="relative z-10 w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* ======================================================== */}
        {/* CARD 1: HERO BANNER + PROFILE HEADER + ACTION PILLS      */}
        {/* ======================================================== */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Top Wide Banner Image (Taller & Panoramic) */}
          <div className="w-full h-60 sm:h-72 md:h-84 lg:h-[400px] relative overflow-hidden bg-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85"
              alt="Bizonance India Pvt Ltd Modern Office Infrastructure"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Identity & Details with Overlapping Brand Logo */}
          <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 pt-0">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 md:gap-8">
              {/* Overlapping Transparent Brand Logo */}
              <div className="relative -mt-16 sm:-mt-20 md:-mt-24 shrink-0 z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-transparent flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/bizonance_logo.png"
                    alt="Bizonance Logo"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Title & Core Details */}
              <div className="flex flex-col gap-1.5 flex-1 pt-2 sm:pt-4 min-w-0">
                {/* Business Name with Verified Badge */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                    BIZONANCE INDIA PVT. LTD.
                  </h1>
                  <span className="inline-flex items-center text-primary shrink-0" title="Verified Business Profile">
                    <span className="material-symbols-outlined text-[26px] md:text-[30px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </span>
                </div>

                {/* Rating Line */}
                <div className="flex items-center gap-1.5 flex-wrap text-sm sm:text-base">
                  <span className="font-extrabold text-slate-900">5.0</span>
                  <div className="flex items-center text-[#e7711b]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={scrollToReviews}
                    className="text-[#1a73e8] font-semibold hover:underline cursor-pointer ml-1 text-sm sm:text-base"
                  >
                    47 BIZONACE Reviews
                  </button>
                </div>

                {/* Sub-Category / Industry */}
                <p className="text-sm sm:text-base font-bold text-slate-800 mt-0.5">
                  Software Company in Amravati, Maharashtra
                </p>

                {/* Taglines */}
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  The Special Kind of Business Reinforcement
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  End-to-End Business Solutions for Startups &amp; Growing Enterprises
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Custom Software • Cloud Apps • Digital Marketing &amp; SEO • Branding • Legal Services
                </p>

                {/* Address Line */}
                <div className="flex items-start gap-1.5 text-xs sm:text-sm text-slate-600 mt-1">
                  <span className="material-symbols-outlined text-[#e53935] text-[17px] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <span className="leading-snug">
                    Ravi Kiran, near Delhi Public School, Colony, Saturna, Amravati, Maharashtra 444605
                  </span>
                </div>

                {/* Operating Status Dropdown */}
                <div className="relative inline-block mt-1">
                  <button
                    type="button"
                    onClick={() => setShowHoursDropdown(!showHoursDropdown)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-700 hover:text-slate-900 font-medium transition cursor-pointer"
                  >
                    <span className="text-emerald-700 font-bold">Open</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600">Closes 2 pm</span>
                    <span
                      className={`material-symbols-outlined text-[16px] text-slate-400 transition-transform ${
                        showHoursDropdown ? 'rotate-180' : ''
                      }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>

                  {showHoursDropdown && (
                    <div className="absolute top-7 left-0 z-20 w-72 p-3.5 bg-white rounded-xl shadow-xl border border-slate-200/90 text-xs text-slate-600 flex flex-col gap-2 animate-in fade-in duration-150">
                      <div className="flex justify-between font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                        <span>Day</span>
                        <span>Hours</span>
                      </div>
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Monday – Friday</span>
                        <span>10:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Micro Action Buttons Pill Row - Wider Spacing & Generous Padding */}
            <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Call Us */}
              <a
                href="tel:+917212530123"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95 group/btn"
              >
                <svg className="w-4 h-4 text-[#1a73e8] shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>Call Us</span>
              </a>

              {/* Enquiry Now (WhatsApp) */}
              <a
                href={`https://wa.me/918956727311?text=${encodeURIComponent(
                  'Hello BIZONANCE INDIA PVT. LTD., I found your verified business profile on Best of Amravati Directory and would like to make an enquiry.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95 group/btn"
              >
                <svg className="w-4 h-4 shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path
                    fill="#25D366"
                    d="M12.004 2C6.486 2 2.008 6.478 2.008 11.996c0 1.815.488 3.522 1.341 5.004L2 22l5.163-1.323a9.954 9.954 0 0 0 4.841 1.32c5.518 0 9.996-4.478 9.996-9.996C22 6.478 17.522 2 12.004 2z"
                  />
                  <path
                    fill="#FFFFFF"
                    d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.634-.927-2.237-.244-.588-.492-.508-.677-.518-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.802.375-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351z"
                  />
                </svg>
                <span>Enquiry Now</span>
              </a>

              {/* Website */}
              <a
                href="https://bizonance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px] text-[#1a73e8]">language</span>
                <span>Website</span>
              </a>

              {/* Directions */}
              <a
                href="https://maps.google.com/?q=Bizonance+Amravati+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px] text-[#1a73e8]">directions</span>
                <span>Directions</span>
              </a>

              {/* Write a Review */}
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] text-[#1a73e8]">rate_review</span>
                <span>Write a review</span>
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold shadow-2xs transition active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[17px] text-slate-600">share</span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </article>

        {/* ======================================================== */}
        {/* CARD 2: ABOUT US + FOLLOW US                             */}
        {/* ======================================================== */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[19px]">badge</span>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              About Us
            </h2>
          </div>

          {/* Description Paragraphs */}
          <div className="flex flex-col gap-3.5 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            <p>
              We are <strong className="text-slate-900 font-semibold">BIZONANCE INDIA PVT. LTD.</strong>, specially
              recognized across India for &apos;<span className="text-primary font-medium">The Special Kind of Business Reinforcement</span>&apos;. Founded in 2020 in Amravati,
              Maharashtra, we empower startups, small businesses, and enterprise organizations to achieve sustainable global growth.
            </p>
            <p>
              As a premier Internet and IT consultancy firm, we offer end-to-end digital transformation solutions — including Custom
              Software &amp; Mobile App Development, Cloud Architecture, Digital Marketing, SEO Optimization, Brand Identity &amp; UI/UX Design,
              Corporate Legal Services, and Outcome-Based Industrial Training.
            </p>
            <p>
              Our mission is to bridge technical excellence with business strategy, ensuring every client gains a competitive advantage
              through scalable technology, high-impact marketing, and 24/7 dedicated support.
            </p>
          </div>

          {/* Follow Us Footer */}
          <div className="pt-5 border-t border-slate-100 flex items-center gap-5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-slate-800">Follow Us</span>
            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on Instagram"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Connect on LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Like on Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Subscribe on YouTube"
                className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-xs hover:opacity-90 transition active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow on X"
                className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs hover:opacity-90 transition active:scale-95"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* TAB BUTTONS (Services / Products / Photos / Videos)      */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
            }`}
          >
            Services
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
            }`}
          >
            Products
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer ${
              activeTab === 'photos'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
            }`}
          >
            Photos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-slate-300'
            }`}
          >
            Videos
          </button>
        </div>

        {/* ======================================================== */}
        {/* CARD 3: TAB CONTENT (SERVICES ACCORDION BY DEFAULT)      */}
        {/* ======================================================== */}
        {activeTab === 'services' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[19px]">layers</span>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-tight text-slate-900">
                    Our Services
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">3 Categories • 23+ Specializations</p>
                </div>
              </div>

              {/* Expand All / Collapse All */}
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{areAllExpanded ? 'Collapse All' : 'Expand All'}</span>
                <span className="material-symbols-outlined text-[18px]">
                  {areAllExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </button>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col gap-3.5">
              {/* Accordion 1: Software Company */}
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40 transition">
                <button
                  type="button"
                  onClick={() => setSoftwareOpen(!softwareOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">terminal</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Software Company</h3>
                      <p className="text-xs text-slate-500">11 services available</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[22px]">
                    {softwareOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>

                {softwareOpen && (
                  <div className="p-5 pt-2 border-t border-slate-100 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {SOFTWARE_SERVICES.map((svc) => (
                        <div
                          key={svc}
                          className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-primary/40 hover:bg-slate-50/60 transition flex items-center gap-2.5 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Marketing Agency */}
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40 transition">
                <button
                  type="button"
                  onClick={() => setMarketingOpen(!marketingOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">campaign</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Marketing Agency</h3>
                      <p className="text-xs text-slate-500">8 services available</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[22px]">
                    {marketingOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>

                {marketingOpen && (
                  <div className="p-5 pt-2 border-t border-slate-100 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {MARKETING_SERVICES.map((svc) => (
                        <div
                          key={svc}
                          className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-primary/40 hover:bg-slate-50/60 transition flex items-center gap-2.5 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Advertising Agency */}
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40 transition">
                <button
                  type="button"
                  onClick={() => setAdvertisingOpen(!advertisingOpen)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 transition cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">ads_click</span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">Advertising Agency</h3>
                      <p className="text-xs text-slate-500">4 services available</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-400 text-[22px]">
                    {advertisingOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>

                {advertisingOpen && (
                  <div className="p-5 pt-2 border-t border-slate-100 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {ADVERTISING_SERVICES.map((svc) => (
                        <div
                          key={svc}
                          className="p-3 rounded-xl border border-slate-200/80 bg-white hover:border-primary/40 hover:bg-slate-50/60 transition flex items-center gap-2.5 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[13px] font-bold">check</span>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-slate-700 leading-tight">{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENT: PRODUCTS */}
        {activeTab === 'products' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-1">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[19px]">inventory_2</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                Featured Software Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:border-primary/40 transition">
                <h3 className="text-base font-bold text-slate-900">BOA Directory Engine</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Hyperlocal civic commerce directory engine built for tier-2 smart cities.
                </p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  SaaS Platform
                </span>
              </div>
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:border-primary/40 transition">
                <h3 className="text-base font-bold text-slate-900">ERP Cloud Suite</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Cloud accounting, inventory, and order fulfillment system for manufacturing businesses.
                </p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Enterprise
                </span>
              </div>
            </div>
          </section>
        )}

        {/* TAB CONTENT: PHOTOS */}
        {activeTab === 'photos' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-1">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[19px]">photo_library</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                Workplace &amp; Gallery
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PHOTOS_LIST.map((item, idx) => (
                <div key={idx} className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs sm:text-sm font-semibold">{item.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB CONTENT: VIDEOS */}
        {activeTab === 'videos' && (
          <section className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-3 pb-1">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[19px]">video_library</span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                Video Highlights
              </h2>
            </div>
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <span className="material-symbols-outlined text-slate-400 text-4xl">play_circle</span>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">Video showcases and case study reels coming soon.</p>
            </div>
          </section>
        )}

        {/* ======================================================== */}
        {/* CARD 4: REVIEWS SECTION (10 REAL VERIFIED TESTIMONIALS)   */}
        {/* ======================================================== */}
        <section id="reviews-section" className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                Reviews
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-medium ml-1">5.0 • (47 verified reviews)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Write a review</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Review List */}
          <div className="flex flex-col gap-3.5">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/60 transition flex items-start gap-4"
              >
                {/* Reviewer Avatar */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-slate-200 shrink-0 border border-slate-300/60 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">{rev.name}</h3>
                    <div className="flex items-center text-[#e7711b]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{rev.timeAgo}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mt-1 font-sans">
                    {rev.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="pt-3 flex items-center justify-end gap-3 text-xs sm:text-sm text-slate-500 font-medium">
            <span>1-10 of 47</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 disabled:opacity-40 cursor-pointer transition shadow-2xs"
                disabled
                title="Previous page"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Showing next verified review set.')}
                className="w-8 h-8 rounded-lg border border-slate-200/80 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer transition shadow-2xs active:scale-95"
                title="Next page"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
