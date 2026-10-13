import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, Globe, HeartPulse } from 'lucide-react';

export default function MorphoHeader({ lang, setLang, t, activeChapter, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t.nav.story },
    { id: 'therapy', label: t.nav.therapy },
    { id: 'velashape', label: t.nav.sculpt },
    { id: 'lymphatic', label: t.nav.lymphatic },
    { id: 'science', label: t.nav.body },
    { id: 'sanctuary', label: t.nav.sanctuary },
    { id: 'departments', label: t.nav.departments },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-3 flex items-center justify-between ${
          isScrolled ? 'bg-[#0b0f15]/80 backdrop-blur-xl border-b border-white/5 py-2.5' : 'bg-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 rounded-xl"
          aria-label={t.siteTitle}
        >
          <div className="w-10 h-10 rounded-full bg-white p-1 border border-fuchsia-400/40 flex items-center justify-center group-hover:border-lime-400/80 transition-all shadow-lg shadow-fuchsia-500/15 overflow-hidden">
            <img src="/assets/logo.png" alt="Health Lines Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-lg md:text-xl font-medium tracking-widest text-white group-hover:text-fuchsia-300 transition-colors">
              HEALTH LINES
            </span>
            <span className="text-[10px] font-arabic font-medium text-lime-400 tracking-wider">
              {lang === 'ar' ? 'مركز خطوط الصحة للعلاج الطبيعي' : 'Rehabilitation & Wellness'}
            </span>
          </div>
        </a>

        {/* Center Morpho Notch Bar (Desktop) */}
        <div className="hidden lg:flex items-center">
          <div className="relative glass-notch px-6 py-2.5 rounded-full flex items-center gap-6 border border-white/10 shadow-2xl">
            <nav className="flex items-center gap-5 text-xs tracking-wider uppercase font-medium">
              {navLinks.map((link) => {
                const isActive = activeChapter === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`relative transition-all duration-200 hover:text-white py-1 ${
                      isActive ? 'text-fuchsia-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-lime-500 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Actions: Language Switch & Booking CTA */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:border-fuchsia-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all duration-200"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-lime-400" />
            <span className={lang === 'en' ? 'text-fuchsia-400 font-bold' : ''}>EN</span>
            <span className="text-slate-600">/</span>
            <span className={lang === 'ar' ? 'text-fuchsia-400 font-bold font-arabic' : 'font-arabic'}>عربي</span>
          </button>

          {/* Book Consultation Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#629131] hover:from-fuchsia-500 hover:to-lime-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-fuchsia-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>{t.bookConsultation}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0912]/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 lg:hidden">
          <nav className="flex flex-col gap-5 text-lg font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-white/5 flex items-center justify-between ${
                  activeChapter === link.id ? 'text-fuchsia-400 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 rtl:rotate-180">→</span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9d237a] to-lime-600 text-white font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Calendar className="w-4 h-4 text-white" />
              <span>{t.bookConsultation}</span>
            </button>
            <div className="text-center text-xs text-slate-500">
              {t.location}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
