'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF8F7] pt-6 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* 2. MAIN WHITE FOOTER CARD                                    */}
        {/* ============================================================ */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 sm:p-10 lg:p-12 mb-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
            {/* Left Column: Brand Logo, Taglines, Social Icons */}
            <div className="flex flex-col items-start max-w-xl">
              {/* Brand Logo & Name */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center p-1.5 overflow-hidden group-hover:scale-105 transition-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/boalogo.svg"
                    alt="Best of Amravati Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-[#b7131a] transition-colors">
                    Best of Amravati
                  </span>
                  <span className="text-[11px] font-semibold text-[#b7131a] tracking-wide uppercase">
                    A Bizonance Initiative
                  </span>
                </div>
              </Link>

              {/* Tagline Accent */}
              <h4 className="text-sm font-bold text-slate-900 mt-5 flex items-center gap-1.5">
                <span>Where Excellence Meets Recognition</span>
                <span>🏅</span>
              </h4>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed max-w-md font-medium">
                Bringing you the best of our city ✨
              </p>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed max-w-md">
                Ready to transform our city.
              </p>

              {/* Social Media Icons Row */}
              <div className="flex items-center gap-3 mt-6">
                {/* Google */}
                {/* <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-[#EA4335] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a> */}

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/bestofamravati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#1877F2] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/bestofamravati/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-pink-50 text-slate-600 hover:text-[#E4405F] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                {/* <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-[#0A66C2] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a> */}

                {/* YouTube */}
                <a
                  href="https://youtube.com/@bestofamravati"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-[#FF0000] border border-slate-200/70 flex items-center justify-center transition-all hover:scale-110 shadow-2xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Corporate Credential Card & Legal Links */}
            <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
              {/* Corporate Credential Card (Matches screenshot layout) */}
              <div className="w-full sm:w-[320px] rounded-2xl bg-[#FFF8F7] border border-[#FFDADA]/90 p-4 sm:p-5 text-left sm:text-right shadow-2xs transition-all hover:border-[#FFC7C7]">
                <div className="text-[10px] sm:text-[11px] font-bold text-[#b7131a] tracking-widest uppercase mb-1">
                  EST. 2017
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  BIZONANCE INDIA PVT LTD
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-1">
                  CIN: U74999MH2017PTC301018
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                  Registered Trademark • IP India
                </div>
              </div>

              {/* Legal & Policy Links */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium mt-6 lg:mt-8">
                <Link
                  href="/about-us"
                  className="hover:text-[#b7131a] transition-colors"
                >
                  About Us
                </Link>
                <span>•</span>
                <Link
                  href="/contact"
                  className="hover:text-[#b7131a] transition-colors"
                >
                  Contact Desk
                </Link>
                <span>•</span>
                <Link
                  href="/about-us"
                  className="hover:text-[#b7131a] transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link
                  href="/about-us"
                  className="hover:text-[#b7131a] transition-colors"
                >
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. CENTERED BOTTOM COPYRIGHT TEXT                            */}
        {/* ============================================================ */}
        <div className="text-center text-xs text-slate-500 font-medium pt-2 pb-4">
          © 2026 BIZONANCE. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
