'use client';

import { useState } from 'react';
import Link from 'next/link';

const STATES_DATA: Record<string, string[]> = {
  Maharashtra: [
    'Amravati',
    'Badnera',
    'Achalpur',
    'Nagpur',
    'Pune',
    'Mumbai',
    'Akola',
    'Yavatmal',
    'Wardha',
    'Nashik',
    'Chhatrapati Sambhajinagar',
    'Other City',
  ],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Burhanpur', 'Other City'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Other City'],
  Delhi: ['New Delhi', 'North Delhi', 'South Delhi', 'Other City'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi', 'Other City'],
  'Other State': ['Other City'],
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    state: 'Maharashtra',
    city: 'Amravati',
    message: '',
  });

  const handlePhoneChange = (val: string) => {
    // Keep only numbers and max 10 digits
    const cleaned = val.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: cleaned }));
  };

  const handleStateChange = (stateVal: string) => {
    const availableCities = STATES_DATA[stateVal] || ['Other City'];
    setFormData((prev) => ({
      ...prev,
      state: stateVal,
      city: availableCities[0] || 'Other City',
    }));
  };

  // Calculate word count for message
  const wordsCount = formData.message.trim() === '' ? 0 : formData.message.trim().split(/\s+/).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#faf8f7] text-slate-800 font-sans overflow-hidden">
      {/* Subtle Soft Radiant Glow Effects in Corners/Center matching landing, pricing & about pages */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-[#da3433] to-[#880d13] bg-clip-text text-transparent inline-block">
            Contact Us
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Two-Column Grid matching the reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: 5 Stacked Cards */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">

            {/* Card 1: Corporate Office */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">location_on</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  Corporate Office
                </span>
                <h3 className="text-xs font-bold text-slate-900 leading-snug">
                  BIZONANCE INDIA PRIVATE LIMITED
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                  Near Delhi Public School, Ravi Kiran Colony, Saturna, Amravati MH 444605
                </p>
                <div className="mt-3">
                  <a
                    href="https://maps.google.com/?q=Saturna+Amravati+Maharashtra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold transition"
                  >
                    <span className="material-symbols-outlined text-xs">near_me</span>
                    <span>Get Directions</span>
                    <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Customer Support */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  Customer Support
                </span>
                <a
                  href="tel:+918956727311"
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-primary transition"
                >
                  +91 89567 27311
                </a>
              </div>
            </div>

            {/* Card 3: Official Email */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  Official Email
                </span>
                <a
                  href="mailto:info@bizonance.in"
                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-primary transition truncate block"
                >
                  info@bizonance.in
                </a>
              </div>
            </div>

            {/* Card 4: Working Hours */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 transition flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">
                  Working Hours
                </span>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Mon – Sat: 10:00 AM – 7:00 PM
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Sunday: Closed</p>
              </div>
            </div>

            {/* Card 5: Company Info */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
              <span className="text-[10px] font-bold text-primary     tracking-wider block mb-1">
                Company info
              </span>
              <h4 className="text-xs font-bold text-slate-900">
                BIZONANCE INDIA PRIVATE LIMITED
              </h4>
              <p className="text-[10px] text-slate-500 font-mono mt-1">
                CIN: U74999MH2017PTC301018
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">verified</span>
                Registered Trademark · IP India
              </p>
            </div>

          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 md:p-9">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">task_alt</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
                    Thank you, <strong className="text-slate-900">{formData.fullName || 'Partner'}</strong>. Our desk team has received your inquiry and will contact you at <strong className="text-primary">{formData.phone}</strong> within 24 hours.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                    <a
                      href={`https://wa.me/918956727311?text=${encodeURIComponent(
                        `Hello Best of Amravati / Bizonance, I submitted a contact inquiry for ${formData.fullName} (${formData.profession}, ${formData.city}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-2 transition shadow-xs group/btn"
                    >
                      <svg className="w-4 h-4 shrink-0 group-hover/btn:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path
                          fill="#FFFFFF"
                          d="M12.004 2C6.486 2 2.008 6.478 2.008 11.996c0 1.815.488 3.522 1.341 5.004L2 22l5.163-1.323a9.954 9.954 0 0 0 4.841 1.32c5.518 0 9.996-4.478 9.996-9.996C22 6.478 17.522 2 12.004 2z"
                        />
                        <path
                          fill="#25D366"
                          d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.3-.777.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.175.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.634-.927-2.237-.244-.588-.492-.508-.677-.518-.175-.01-.376-.01-.576-.01-.2 0-.527.075-.802.375-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.543.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.303.175-1.43-.075-.126-.275-.201-.576-.351z"
                        />
                      </svg>
                      Connect on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          email: '',
                          phone: '',
                          profession: '',
                          state: 'Maharashtra',
                          city: 'Amravati',
                          message: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-slate-400 bg-white"
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-slate-400 bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-slate-400 bg-white"
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {formData.phone.length}/10 digits
                      </span>
                    </div>
                  </div>

                  {/* Profession */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Profession <span className="text-primary">*</span>
                    </label>
                    <select
                      required
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition bg-white text-slate-800"
                    >
                      <option value="" disabled>Select your profession</option>
                      <option value="Business Owner / Merchant">Business Owner / Merchant</option>
                      <option value="Retailer / Trader">Retailer / Trader</option>
                      <option value="Doctor / Healthcare Provider">Doctor / Healthcare Provider</option>
                      <option value="IT & Software Professional">IT & Software Professional</option>
                      <option value="Professional Consultant / CA / Advocate">Professional Consultant / CA / Advocate</option>
                      <option value="Restaurant & Hospitality">Restaurant & Hospitality</option>
                      <option value="Real Estate & Construction">Real Estate & Construction</option>
                      <option value="Student / Citizen">Student / Citizen</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* State and City (Side by Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        State <span className="text-primary">*</span>
                      </label>
                      <select
                        required
                        value={formData.state}
                        onChange={(e) => handleStateChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition bg-white text-slate-800"
                      >
                        {Object.keys(STATES_DATA).map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        City <span className="text-primary">*</span>
                      </label>
                      <select
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition bg-white text-slate-800"
                      >
                        {(STATES_DATA[formData.state] || ['Other City']).map((ct) => (
                          <option key={ct} value={ct}>
                            {ct}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        Message <span className="text-primary">*</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {wordsCount}/200 words
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us how we can help you..."
                      value={formData.message}
                      onChange={(e) => {
                        const val = e.target.value;
                        const w = val.trim() === '' ? 0 : val.trim().split(/\s+/).length;
                        if (w <= 200 || val.length < formData.message.length) {
                          setFormData({ ...formData, message: val });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition placeholder:text-slate-400 bg-white resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-[#9e1016] text-white font-bold text-xs     tracking-wider transition shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      <span>Send Message</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
