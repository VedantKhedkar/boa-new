'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AboutUsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  const stats = [
    { value: '500+', label: 'Verified Amravati Partners' },
    { value: '2.5M+', label: 'Local Reel Impressions' },
    { value: '15–30s', label: 'Cinematic High-Converting Ads' },
    { value: '100%', label: 'Civic Trust & Audited Standards' },
  ];

  const reelStrategies = [
    {
      icon: 'storefront',
      title: 'Business Story',
      desc: 'Showcase your origin, craftsmanship, values, and the team behind your business.',
    },
    {
      icon: 'local_offer',
      title: 'Promotions & Offers',
      desc: 'Highlight seasonal discounts and civic deals that drive real footfall.',
    },
    {
      icon: 'category',
      title: 'Signature Offerings',
      desc: 'Spotlight flagship products and services with high-definition visual storytelling.',
    },
    {
      icon: 'rocket_launch',
      title: 'New Launches',
      desc: 'Generate immediate local buzz for new branches, stores, or menu arrivals.',
    },
    {
      icon: 'sentiment_very_satisfied',
      title: 'Customer Voice',
      desc: 'Feature authentic customer testimonials and trusted neighborhood acclaim.',
    },
  ];

  const deliveryCards = [
    {
      badge: 'CREATIVE PRODUCTION',
      title: '4K Creative Reel Ads',
      desc: 'Turn your business narrative into captivating short-form video tailored for Amravati shoppers.',
      highlights: [
        'Localized Marathi & Hindi scripting',
        'On-location 4K shoot with pro lighting & sound',
        'Dynamic captions, subtitles & licensed music',
        'Rapid 3–5 day turnaround delivery',
      ],
      pricingText: 'Starting at ₹10,000 / Reel',
      ctaText: 'View Packages',
      ctaHref: '/pricing',
    },
    {
      badge: 'TARGETED REACH',
      title: 'Multi-Platform Distribution',
      desc: 'Direct visibility in front of active local families and buyers across Amravati district.',
      highlights: [
        'Instagram Reels, YouTube Shorts & Facebook reach',
        'Targeted reach: Amravati, Badnera & Achalpur',
        'Verified profile on BOA portal & mobile app',
        'Transparent audience analytics reports',
      ],
      pricingText: '25,000+ to 100,000+ Views',
      ctaText: 'View Plans',
      ctaHref: '/pricing',
    },
    {
      badge: 'CIVIC AUTHORITY',
      title: 'Awards & Verification',
      desc: 'Elevate your enterprise into an authenticated, trusted landmark brand in the city.',
      highlights: [
        'Official BOA Verified window counter sticker',
        'Eligibility for annual "Best 5" civic rankings',
        'Amravati Business Excellence certificate',
        'Digital press feature and directory badge',
      ],
      pricingText: '100% Certified Civic Seal',
      ctaText: 'Explore Plans',
      ctaHref: '/pricing',
    },
  ];

  const workflowSteps = [
    { num: '01', title: 'Briefing', desc: 'Define your promotion goals & core offer.' },
    { num: '02', title: 'On-Site Shoot', desc: 'Our team films at your location in 4K.' },
    { num: '03', title: 'Creative Cut', desc: 'Editing, color grade & sound design.' },
    { num: '04', title: 'Approval', desc: 'Review the cut and approve the polish.' },
    { num: '05', title: 'Multi-Posting', desc: 'Simultaneous broadcast across channels.' },
    { num: '06', title: 'Civic Push', desc: 'Targeted local boost to Amravati.' },
    { num: '07', title: 'Analytics', desc: 'Performance report on reach & views.' },
  ];

  const credentials = [
    {
      id: 'trademark',
      title: 'Trademark Registration',
      authority: 'Trade Marks Registry, Govt. of India',
      number: 'App No. 6294812 / Class 35',
      desc: 'Protected intellectual property for Best of Amravati (BOA).',
    },
    {
      id: 'udyam',
      title: 'Udyam MSME Certificate',
      authority: 'Ministry of MSME, Govt. of India',
      number: 'UDYAM-MH-03-0091842',
      desc: 'Certified enterprise registered under Micro & Small Enterprises.',
    },
    {
      id: 'iso',
      title: 'ISO 9001:2015 Quality',
      authority: 'International Quality Standards',
      number: 'Certificate QMS-2023-8491',
      desc: 'Certified standard for operational transparency and auditing.',
    },
    {
      id: 'cin',
      title: 'Certificate of Incorporation',
      authority: 'Ministry of Corporate Affairs (MCA)',
      number: 'CIN: U72900MH2020PTC348912',
      desc: 'Incorporated private limited entity under Companies Act 2013.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects in Corners/Center matching landing & pricing pages */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Hero Section */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Identity & Mission */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/15 text-primary text-xs font-semibold tracking-wide     w-fit">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                About Best of Amravati
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-primary/20 bg-white p-1 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/boalogo.svg" alt="BOA Seal" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
                    Amravati&apos;s Civic Business Network
                  </h1>
                  <p className="text-xs sm:text-sm font-semibold text-primary">
                    Connecting Citizens with Verified Local Excellence
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2">
                <strong>Best of Amravati (BOA)</strong> is a hyper-local digital growth platform dedicated to celebrating trusted local businesses, neighborhood services, and homegrown brands across Amravati. We empower local commerce with high-impact 4K creative reels and certified civic recognition.
              </p>

              {/* Entity Info Box */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400     tracking-wider block">
                    Owned & Operated By
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    BIZONANCE INDIA PVT. LTD.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span>
                    ISO 9001:2015
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[11px] font-bold border border-primary/10">
                    MSME Registered
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/pricing"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-[#9e1016] text-white text-xs font-bold     tracking-wider transition shadow-xs flex items-center gap-1.5"
                >
                  <span>Explore Reel Packages</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </Link>
                <a
                  href="tel:+917212990188"
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-xs text-primary">call</span>
                  <span>Contact Bureau</span>
                </a>
              </div>
            </div>

            {/* Right Column: 4 Small Legal Document Cards */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900     tracking-wide flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  Official Legal Credentials
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Govt. Verified</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {credentials.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc.title)}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-base">description</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                        {doc.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                        {doc.authority}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-primary font-semibold">
                      <span>View Seal</span>
                      <span className="material-symbols-outlined text-[11px]">visibility</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                All certifications registered under Ministry of Corporate Affairs & MSME.
              </p>
            </div>
          </div>
        </section>

        {/* 4-Stat Metric Strip */}
        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xs border border-slate-200/80 rounded-xl p-3.5 text-center shadow-xs"
              >
                <div className="text-2xl font-black text-slate-900">{s.value}</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Promotional Strategy Blueprint (5 Small Cards) */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
              Promotional Strategy Blueprint
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              The Power of Creative Reel Ads
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Cinematic short-form storytelling that builds genuine local trust and customer engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {reelStrategies.map((card, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-2.5">
                    <span className="material-symbols-outlined text-lg">{card.icon}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Deliver To Every Business Partner (3 Small Cards) */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
              Complete Promotional Ecosystem
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              What We Deliver To Every Partner
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end promotional solutions combining creative video production, targeted reach, and civic authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {deliveryCards.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-primary tracking-wider     px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10 w-fit block mb-2.5">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[34px]">
                    {item.desc}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600 mb-6">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-900">{item.pricingText}</span>
                  <Link
                    href={item.ctaHref}
                    className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-[#9e1016] text-white text-[11px] font-semibold transition"
                  >
                    {item.ctaText}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Promote Through Best of Amravati (Bento Grid) */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              <span className="text-primary text-[11px] font-bold     tracking-wider">
                The Strategic Advantage
              </span>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                Why Promote Through Best of Amravati?
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Traditional hoardings and random social posts get skipped. BOA combines localized viral storytelling with verifiable civic directory recognition.
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 mt-1">
                <div className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">High Brand Recall</span>
                  <span className="text-[11px] text-slate-500">Over 84% citizen recall rate compared to static posters.</span>
                </div>
              </div>
            </div>

            {/* Right 4 Small Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl mb-1.5 block">group</span>
                <h4 className="text-xs font-bold text-slate-900">Strong Local Audience</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Direct organic reach to 250,000+ local citizens and buying families across Amravati district.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl mb-1.5 block">verified_user</span>
                <h4 className="text-xs font-bold text-slate-900">Trusted Community Seal</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Citizens inherently trust BOA verification over generic unverified social media ads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl mb-1.5 block">savings</span>
                <h4 className="text-xs font-bold text-slate-900">Low Cost, High Impact</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Fraction of the cost of physical hoarding rentals with verifiable view metrics and lead routing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                <span className="material-symbols-outlined text-primary text-xl mb-1.5 block">analytics</span>
                <h4 className="text-xs font-bold text-slate-900">Transparent Analytics</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  Real-time insight into video views, regional engagement, shares, and customer inquiries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Production Pipeline (7 Clean Steps) */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
              Production Pipeline
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Our 7-Step Workflow
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              From creative brief to multi-channel broadcast, we manage every detail.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {workflowSteps.map((step, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs text-center flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  <span className="text-[11px] font-black text-primary block mb-0.5">
                    {step.num}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services (3 Clean Cards) */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-primary text-[11px] font-bold     tracking-wider block mb-1">
              Enterprise Growth Solutions
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Additional Services by BIZONANCE
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Full-stack technological and operational support for regional businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* IT & Software */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-2.5">
                  <span className="material-symbols-outlined text-lg">terminal</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">IT & Software Solutions</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Custom software, web applications, and mobile apps to modernize your business operations.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Websites', 'Mobile Apps', 'E-commerce', 'Billing ERP', 'Cloud Hosting'].map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Digital Media & PR */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-2.5">
                  <span className="material-symbols-outlined text-lg">campaign</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Digital Media & PR</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Strategic digital advertising, organic SEO ranking, and press release distribution.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Google Search Ads', 'Meta Ad Campaigns', 'Local SEO', 'Brand Identity', 'Press Media'].map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Legal & Compliance */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center mb-2.5">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Legal & Documentation</h3>
                <p className="text-xs text-slate-500 mb-3">
                  Statutory corporate registrations, trademark licensing, and compliance documentation.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Trademark Filing', 'ISO 9001', 'Incorporation', 'Udyam MSME', 'GST & MoU'].map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Headquarters & Clean Action Box (Small, Professional) */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Headquarters Card */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary     tracking-wider block mb-1">
                  Registered Headquarters
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  BIZONANCE INDIA PVT. LTD.
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Near Delhi Public School, Ravi Kiran Colony, Saturna, Amravati, Maharashtra 444607.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <span className="text-[10px] text-slate-400     font-semibold block">Phone</span>
                    <strong className="text-slate-800">+91 721-299-0188</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <span className="text-[10px] text-slate-400     font-semibold block">Helpline / WhatsApp</span>
                    <strong className="text-slate-800">+91 91460 51515</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <span className="text-[10px] text-slate-400     font-semibold block">Official Support</span>
                    <strong className="text-slate-800">support@bestofamravati.in</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <span className="text-[10px] text-slate-400     font-semibold block">CIN Record</span>
                    <strong className="text-slate-800">U72900MH2020PTC348912</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean Professional Callout Box */}
            <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary     tracking-wider block mb-1">
                  Connect With Bureau
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Ready to boost your local reach?
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Join 500+ local enterprises benefiting from high-converting video reels, verified ratings, and directory rankings.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2 mt-4">
                <Link
                  href="/pricing"
                  className="flex-1 py-2.5 px-3 bg-primary hover:bg-[#9e1016] text-white rounded-xl text-xs font-bold text-center     tracking-wider transition shadow-xs"
                >
                  View Packages
                </Link>
                <a
                  href="tel:+917212990188"
                  className="py-2.5 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold text-center transition flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm text-primary">call</span>
                  Call Bureau
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Clean Document Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">{selectedDoc}</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="py-5 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">Certified Official Document</h4>
              <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                Audited and registered on official record for BIZONANCE INDIA PVT. LTD. operating Best of Amravati Directory Portal.
              </p>
              <div className="mt-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 w-full text-left font-mono">
                Status: ACTIVE • Registered Authority • Amravati Jurisdiction
              </div>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-1.5 rounded-lg bg-primary hover:bg-[#9e1016] text-white text-xs font-semibold transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
