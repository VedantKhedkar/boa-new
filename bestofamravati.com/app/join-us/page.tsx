'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JoinUsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-6">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Home</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
        <span className="text-slate-800 font-semibold">Join Us / Claim Listing</span>
      </nav>

      {/* Hero Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span>Business Registration & Listing Verification</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
          Claim or List Your Amravati Business
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
          Join Amravati&apos;s verified civic network. Submit your establishment details to undergo our rigorous on-ground review for the Best 5 rankings in your sector.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Registration Received!</h3>
              <p className="text-slate-600 mt-2 max-w-md text-sm leading-relaxed">
                Thank you! Our on-ground verification audit team will examine your business documents and contact you within 48 hours to complete your verification badge.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all"
                >
                  Submit Another
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-[#9c0f15] text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all"
                >
                  Back to Home Portal
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                  Business Name <span className="text-primary">*</span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Bizonance India Pvt. Ltd."
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                    Primary Category <span className="text-primary">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  >
                    <option value="">Select Category</option>
                    <option value="software">Services & IT Software</option>
                    <option value="food">Food & Restaurants</option>
                    <option value="health">Health & Clinics</option>
                    <option value="education">Education & Coaching</option>
                    <option value="jewelry">Jewelry & Gold</option>
                    <option value="auto">Automobiles & Showrooms</option>
                    <option value="hotels">Hotels & Banquets</option>
                    <option value="home">Home & Decor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                    Locality in Amravati <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Saturna, Rajapeth, Badnera Rd"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                    Owner / Representative Name <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                    Official Mobile Number <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98XXXXXXXX"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5">
                  CIN / GSTIN / MSME Registration Number{' '}
                  <span className="text-slate-400 font-normal">(Optional, speeds up review)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 27ABCDE1234F1Z5 or U72900MH2020PTC..."
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3 px-6 rounded-full bg-gradient-to-r from-primary to-[#9c0f15] text-white text-sm font-semibold shadow-[0_4px_16px_rgba(183,19,26,0.3)] hover:shadow-[0_6px_22px_rgba(183,19,26,0.45)] hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>Submit for Verification Audit</span>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </button>
            </form>
          )}
        </div>

        {/* Benefits & Trust Side Cards */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">policy</span>
              Why Get Listed on BOA?
            </h3>
            <ul className="flex flex-col gap-3.5 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  <strong className="text-slate-800">Civic Certified Badge:</strong> Gain trust across Amravati citizens through our verified authentic seal.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  <strong className="text-slate-800">Best 5 Leaderboard Eligibility:</strong> Eligible to be spotlighted in Amravati&apos;s coveted Best 5 rankings.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  <strong className="text-slate-800">48-Hour Rapid Verification:</strong> Our local ground auditors inspect documentation promptly.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/5 via-white to-white p-6 rounded-3xl border border-primary/20 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Direct Verification Desk</h4>
                <p className="text-[11px] text-slate-500">Need instant assistance?</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Call our Amravati bureau directly at <strong className="text-slate-800">+91 721 299 0188</strong> (Mon–Sat 10am–7pm) or email <strong className="text-slate-800">support@bestofamravati.in</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
