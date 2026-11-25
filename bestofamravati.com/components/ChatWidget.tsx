'use client';

import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Action Button */}
      <button
        aria-label="Open support chat"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-primary hover:bg-[#990e14] text-white shadow-[0_4px_16px_rgba(183,19,26,0.3)] hover:shadow-[0_6px_20px_rgba(183,19,26,0.42)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group border border-white/15"
      >
        <div className="relative flex items-center justify-center">
          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
            {isOpen ? 'close' : 'chat'}
          </span>
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
        </div>
        <span className="font-semibold text-xs tracking-wide">
          {isOpen ? 'Close' : "Let's Chat"}
        </span>
      </button>

      {/* Support Dialog Popup */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 bg-surface-container-lowest rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.14)] p-4 border border-outline-variant/30 backdrop-blur-sm">
          <div className="flex items-start justify-between pb-3 border-b border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-xs border border-primary/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/boalogo.svg" alt="BOA Helpdesk" className="w-full h-full object-cover" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-on-surface leading-tight">
                  BOA Civic Helpdesk
                </h5>
                <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Now
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Close Helpdesk Dialog"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-on-surface-variant leading-relaxed">
            Namaste! Need assistance discovering verified Amravati businesses, services, or claiming your listing?
          </p>

          <div className="mt-3 flex flex-col gap-1.5">
            <button
              onClick={() => alert('Searching emergency healthcare providers near Rajkamal Square...')}
              className="w-full text-left px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium transition-colors flex items-center gap-2"
            >
              <span className="text-sm">📍</span> Find healthcare near Rajkamal
            </button>
            <button
              onClick={() => alert('Opening business nomination form...')}
              className="w-full text-left px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium transition-colors flex items-center gap-2"
            >
              <span className="text-sm">⭐</span> Nominate local Amravati business
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
