'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Business', href: '/business/bizonance' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-14 sm:h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 focus:outline-none group z-10">
          <div className="h-8 sm:h-9 min-w-[120px] flex items-center shrink-0 group-hover:scale-105 transition-transform duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/boanav.svg"
              alt="Best of Amravati (BOA)"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation - Centered Exactly in Viewport */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60 shadow-2xs">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? 'bg-white text-primary shadow-[0_1px_4px_rgba(0,0,0,0.08)]'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 z-10">
          <Link
            href="/join-us"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-full border border-slate-200/80 text-slate-700 hover:text-primary hover:border-primary/40 hover:bg-primary/5 text-xs font-semibold transition-all duration-200 whitespace-nowrap"
          >
            Join Us
          </Link>
          <Link
            href="/join-us"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gradient-to-r from-primary to-[#9c0f15] text-white text-xs font-semibold shadow-[0_2px_8px_rgba(183,19,26,0.25)] hover:shadow-[0_4px_14px_rgba(183,19,26,0.38)] hover:brightness-105 active:scale-95 transition-all duration-200 whitespace-nowrap"
          >
          List your business
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors ml-0.5"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 py-3 flex flex-col gap-1 shadow-lg animate-in fade-in duration-150">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 mt-1 border-t border-slate-100 flex items-center gap-2">
            <Link
              href="/join-us"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-full border border-slate-200 text-slate-700 text-xs font-semibold"
            >
              Join Us
            </Link>
            <Link
              href="/join-us"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-xs"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
