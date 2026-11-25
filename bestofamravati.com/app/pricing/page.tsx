'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>('Business Package');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    package: 'Business Package (₹1,20,000 / Year)',
    category: 'Food & Restaurants',
    notes: '',
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const stats = [
    { value: '500+', label: 'Verified Partners' },
    { value: '2.5M+', label: 'Local Reel Views' },
    { value: 'Best 5', label: 'Search Placements' },
    { value: '100%', label: 'Organic Amravati Reach' },
  ];

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'Single Campaign',
      badgeClass: 'bg-slate-100 text-slate-700',
      description: 'Quick promotional boost for seasonal offers or single events.',
      price: '₹10,000',
      period: '/ Reel',
      deliverables: [
        '1x 4K Cinematic Reel (15–30 sec)',
        '1–2 Hours on-location shoot',
        '15,000+ Guaranteed local views',
        'Verified business listing on BOA',
        'Official QR window sticker',
      ],
      isPopular: false,
    },
    {
      id: 'basic',
      name: 'Growth',
      badge: 'Half-Yearly',
      badgeClass: 'bg-slate-100 text-slate-700',
      description: 'Steady presence across Amravati with recurring quarterly reach.',
      price: '₹60,000',
      period: '/ 6 Months',
      deliverables: [
        '3x 4K High-Impact Reels',
        '50,000+ Guaranteed views',
        'Priority category placement',
        'Verified reviews & ratings badge',
        'Framed BOA partner certificate',
      ],
      isPopular: false,
    },
    {
      id: 'business',
      name: 'Business',
      badge: 'Most Popular',
      badgeClass: 'bg-primary/10 text-primary font-bold border border-primary/20',
      description: 'Complete visibility package for growing brands and SMBs.',
      price: '₹1,20,000',
      period: '/ Year',
      deliverables: [
        '6x Premium 4K Cinematic Reels',
        '150,000+ Guaranteed targeted views',
        'Guaranteed Best 5 category rank',
        'Dedicated script & video team',
        'Official engraved BOA Trophy',
        'WhatsApp direct lead button',
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      badge: 'Category Exclusive',
      badgeClass: 'bg-amber-50 text-amber-800 font-bold border border-amber-200',
      description: 'Strictly 1 partner per vertical. Complete category exclusivity.',
      price: '₹1,80,000',
      period: '/ Year',
      deliverables: [
        '12x Monthly 4K Reels (1/month)',
        '100% Category Exclusivity (No rivals)',
        'Drone + Multi-cam cinema crew',
        '350,000+ Local impressions',
        'Homepage Hero banner spotlight',
        'Permanent #1 category rank',
      ],
      isPopular: false,
    },
  ];

  const comparisonRows = [
    { feature: 'Price & Billing', starter: '₹10,000 (One-Time)', basic: '₹60,000 (Half-Yearly)', business: '₹1,20,000 (Annual)', premium: '₹1,80,000 (Annual)' },
    { feature: '4K Cinematic Reels', starter: '1 Reel', basic: '3 Reels', business: '6 Reels', premium: '12 Reels (Monthly)' },
    { feature: 'Guaranteed Views', starter: '15,000+', basic: '50,000+', business: '150,000+', premium: '350,000+' },
    { feature: 'Production Rig', starter: 'Single 4K Rig', basic: 'Pro Dual Rig', business: 'Cinema Cam + Pro Sound', premium: '4K Drone + Multi-Cam' },
    { feature: 'BOA Verification', starter: 'Digital Listing', basic: 'Priority Badge', business: 'VIP Verified + Trophy', premium: 'Exclusive #1 VIP' },
    { feature: 'Category Exclusivity', starter: '—', basic: '—', business: 'Best 5 Placement', premium: '100% Category Lock' },
    { feature: 'Homepage Spotlight', starter: '—', basic: '—', business: '30 Days Spotlight', premium: '365 Days Hero Spotlight' },
    { feature: 'WhatsApp Lead Engine', starter: 'Standard Link', basic: 'Click-to-Chat', business: 'Direct WhatsApp CTA', premium: 'Automated CRM Routing' },
  ];

  const documents = [
    {
      id: 'rate-card',
      title: 'Statutory Rate Card',
      ref: 'STR-2024-V2',
      summary: 'Verified tariff schedule, production deliverables, and distribution SLAs for all campaign tiers.',
    },
    {
      id: 'mou-partnership',
      title: 'Partnership Agreement (MoU)',
      ref: 'MOU-AP-2024',
      summary: 'Commercial terms, category lock exclusivity guidelines, and regional publishing frameworks.',
    },
    {
      id: 'payment-schedule',
      title: 'Payment & Revision Policy',
      ref: 'PSP-REV-2024',
      summary: '50% advance milestone guidelines, 7-day turnaround SLA, and 2-round revision policy.',
    },
  ];

  const faqs = [
    {
      q: 'How are guaranteed video views delivered and tracked?',
      a: 'All view guarantees are hyper-targeted to the Amravati district via our verified Instagram handle, civic broadcasts, and portal reels. We share a verified Meta Insights report after each campaign showing authentic local reach.',
    },
    {
      q: 'What is Category Exclusivity under the Premium plan?',
      a: 'We accept strictly one partner per category (e.g. only one Orthopedic Hospital or one Cafe). We commit to not running commercial promotions for direct local competitors in that vertical during your contract.',
    },
    {
      q: 'Can I start with a single reel and upgrade later?',
      a: 'Yes. If you start with a ₹10,000 Starter reel, you can upgrade to the Growth or Annual Business plan within 30 days. Your initial payment will be 100% credited toward the upgrade.',
    },
    {
      q: 'Who owns the copyright of the produced video reels?',
      a: 'You receive full commercial rights to use the high-definition video reels on your own social channels, store displays, and ads without royalty fees.',
    },
    {
      q: 'What is the production turnaround time?',
      a: 'Our standard turnaround is 7 business days from the shoot date. A draft cut is provided within 4 days for your approval, with 2 complimentary revision rounds included.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects in Corners/Center matching landing page */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Clean, Minimal Hero */}
        <section className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wide     mb-3">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            Pricing & Advertising Packages
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
            Simple, Transparent Plans for Every Business
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Reach thousands of verified Amravati residents with professional 4K Reels, guaranteed organic visibility, and premier directory placements.
          </p>

          {/* Minimal Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-xl p-3 text-center shadow-xs"
              >
                <div className="text-xl font-bold text-slate-900">{s.value}</div>
                <div className="text-[11px] text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 Clean, Compact Pricing Cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${pkg.isPopular
                    ? 'border-2 border-primary shadow-lg shadow-primary/5 ring-4 ring-primary/5'
                    : 'border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm'
                  }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px]     tracking-wider px-2.5 py-0.5 rounded-full ${pkg.badgeClass}`}>
                      {pkg.badge}
                    </span>
                    {pkg.isPopular && (
                      <span className="text-[10px] font-bold text-primary flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-xs">star</span>
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 min-h-[32px] leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Price */}
                  <div className="py-3 mb-4 border-y border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{pkg.period}</span>
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] font-bold text-slate-400     tracking-wider block">
                      Includes:
                    </span>
                    {pkg.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <a
                  href="#booking-form"
                  onClick={() => {
                    setSelectedPackage(`${pkg.name} (${pkg.price} ${pkg.period})`);
                    setFormData((prev) => ({
                      ...prev,
                      package: `${pkg.name} (${pkg.price} ${pkg.period})`,
                    }));
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold tracking-wide transition flex items-center justify-center gap-1 ${pkg.isPopular
                      ? 'bg-primary hover:bg-[#9e1016] text-white shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                >
                  Choose {pkg.name}
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-7">
            <div className="mb-5">
              <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
                Detailed Comparison
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                Compare Plan Features
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-700 font-bold     tracking-wider">
                    <th className="py-3 px-3 min-w-[160px]">Deliverable</th>
                    <th className="py-3 px-3 text-center min-w-[110px]">Starter</th>
                    <th className="py-3 px-3 text-center min-w-[110px]">Growth</th>
                    <th className="py-3 px-3 text-center min-w-[120px] text-primary bg-primary/5 rounded-t-lg">Business</th>
                    <th className="py-3 px-3 text-center min-w-[120px]">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-medium text-slate-800">{row.feature}</td>
                      <td className="py-3 px-3 text-center">{row.starter}</td>
                      <td className="py-3 px-3 text-center">{row.basic}</td>
                      <td className="py-3 px-3 text-center font-semibold text-slate-900 bg-primary/5">
                        {row.business}
                      </td>
                      <td className="py-3 px-3 text-center font-medium text-slate-800">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Official Documents & Bank Details (Two Column, Small Clean Cards) */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Official Documents */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">description</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Official Rate Cards & Documents</h3>
                  <p className="text-[11px] text-slate-500">Certified by Bizonance India Pvt. Ltd.</p>
                </div>
              </div>

              <div className="space-y-2.5 mb-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{doc.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                          {doc.ref}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{doc.summary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedDoc(doc.id)}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-[11px] font-semibold rounded-lg shrink-0 transition"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-3 border-t border-slate-100">
              <span className="material-symbols-outlined text-xs text-primary">verified</span>
              Compliant with statutory MSME & ISO 9001:2015 frameworks.
            </p>
          </div>

          {/* Official Bank Account & Terms */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">account_balance</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Official Bank Account</h3>
                  <p className="text-[11px] text-slate-500">State Bank of India (Amravati Main Branch)</p>
                </div>
              </div>

              {/* Minimal Account Rows */}
              <div className="space-y-2 p-3 bg-slate-50/60 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">A/C Name:</span>
                  <span className="font-semibold text-slate-800">BIZONANCE INDIA PVT. LTD.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">A/C Number:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">4091 7834 9102</span>
                    <button
                      onClick={() => handleCopy('409178349102', 'acct')}
                      className="text-primary hover:underline text-[10px] font-bold"
                    >
                      {copiedField === 'acct' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">IFSC Code:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">SBIN0000314</span>
                    <button
                      onClick={() => handleCopy('SBIN0000314', 'ifsc')}
                      className="text-primary hover:underline text-[10px] font-bold"
                    >
                      {copiedField === 'ifsc' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">UPI ID:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-slate-900">bizonance@sbi</span>
                    <button
                      onClick={() => handleCopy('bizonance@sbi', 'upi')}
                      className="text-primary hover:underline text-[10px] font-bold"
                    >
                      {copiedField === 'upi' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms summary */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="block text-slate-800 text-xs">50% Advance</strong>
                  Mobilization fee
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="block text-slate-800 text-xs">7 Days SLA</strong>
                  Shoot to delivery
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <strong className="block text-slate-800 text-xs">2 Revisions</strong>
                  Free iterations
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 mt-4">
              Direct Desk: <a href="tel:+917212990188" className="text-primary font-medium hover:underline">+91 721-299-0188</a> | support@bestofamravati.in
            </p>
          </div>
        </section>

        {/* Clean, User-Friendly Booking Form */}
        <section id="booking-form" className="mb-16 scroll-mt-12">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
                Direct Reservation
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Reserve Your Promotion Slot
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Zero lock-in obligation. Our team calls to confirm dates and category exclusivity.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Slot Request Received!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.ownerName || 'Partner'}</strong>. We received your request for <strong>{formData.package}</strong>.
                  We will reach you at <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 justify-center">
                  <a
                    href={`https://wa.me/919146051515?text=${encodeURIComponent(
                      `Hello Best of Amravati team, I reserved the ${formData.package} for ${formData.businessName}. Please share details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span className="material-symbols-outlined text-sm">chat</span>
                    Chat on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-medium transition"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Business / Store Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Sweets"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Patil"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98220 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Selected Plan *
                    </label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white transition"
                    >
                      <option value="Starter (₹10,000 / Reel)">Starter (₹10,000 / Reel)</option>
                      <option value="Growth (₹60,000 / 6 Mo)">Growth (₹60,000 / 6 Mo)</option>
                      <option value="Business (₹1,20,000 / Year)">Business (₹1,20,000 / Year) - Most Popular</option>
                      <option value="Premium (₹1,80,000 / Year)">Premium (₹1,80,000 / Year) - Exclusive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Business Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white transition"
                  >
                    <option value="Food & Restaurants">Food, Sweets & Dining</option>
                    <option value="Fashion & Lifestyle">Fashion, Boutiques & Retail</option>
                    <option value="Jewelry & Sarafa">Jewelry & Sarafa Bazar</option>
                    <option value="Health & Medical">Hospitals, Clinics & Doctors</option>
                    <option value="Education & Coaching">Schools, Colleges & Classes</option>
                    <option value="Home & Interior">Interior, Furniture & Tiles</option>
                    <option value="Hotels & Banquets">Hotels, Resorts & Event Lawns</option>
                    <option value="Services & IT">IT, Software & Professional Services</option>
                    <option value="Automobiles">Automobiles, Showrooms & Spares</option>
                    <option value="Other">Other Commercial Category</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Notes or Preferred Shoot Date (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Planning a seasonal launch next month..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-[#9e1016] text-white rounded-xl text-xs font-bold     tracking-wider transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Submit Reservation Request
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Minimal FAQs */}
        <section className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Common questions about reels, reach guarantees, and contracts.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-800 hover:text-primary transition"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-slate-400 text-sm transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* Clean Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">description</span>
                <div>
                  <h3 className="font-bold text-xs text-slate-900">
                    {documents.find((d) => d.id === selectedDoc)?.title}
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    {documents.find((d) => d.id === selectedDoc)?.ref}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 text-xs text-slate-600 bg-[#faf8f7]">
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2 font-mono text-[11px]">
                <div className="text-center pb-2 border-b border-dashed border-slate-200">
                  <p className="font-bold text-slate-900 text-xs">BIZONANCE INDIA PRIVATE LIMITED</p>
                  <p className="text-slate-400 text-[10px]">CIN: U74999MH2021PTC368945 | ISO 9001:2015</p>
                </div>
                <div className="space-y-1 text-slate-600">
                  <p><strong>DOCUMENT:</strong> {documents.find((d) => d.id === selectedDoc)?.title}</p>
                  <p><strong>CODE:</strong> {documents.find((d) => d.id === selectedDoc)?.ref}</p>
                  <p><strong>SUMMARY:</strong> {documents.find((d) => d.id === selectedDoc)?.summary}</p>
                </div>
                <p className="text-[10px] text-slate-400 pt-2 border-t border-dashed border-slate-200">
                  Statutory certified copy issued by Bizonance Media Bureau. Valid across Amravati district jurisdictions.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Official BOA Archive</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert('Download initiated')}
                  className="px-3 py-1.5 bg-primary hover:bg-[#9e1016] text-white rounded-lg text-xs font-semibold transition"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="px-3 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-lg text-xs transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
