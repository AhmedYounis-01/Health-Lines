import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, Globe, ChevronDown, Stethoscope, Video, CalendarCheck } from 'lucide-react';

export default function MorphoHeader({ lang, setLang, t, activeChapter, onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAr = lang === 'ar';

  const navItems = [
    { id: 'hero', label: t.nav.home || 'الرئيسية' },
    { id: 'about', label: t.nav.about || 'من نحن' },
    { id: 'services', label: t.nav.services || 'خدماتنا', targetId: 'departments' },
    // Center Dropdown Item
    {
      id: 'center-dropdown',
      label: t.nav.center || (isAr ? 'مركز خطوط الصحة' : 'HEALTH LINES'),
      isDropdown: true,
      items: [
        {
          label: t.nav.team || (isAr ? 'الفريق الطبي والأخصائيات' : 'Medical Team & Specialists'),
          action: () => {
            const el = document.getElementById('departments');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          },
        },
        {
          label: t.nav.techDevices || (isAr ? 'الأجهزة والتقنيات العلاجية' : 'Therapeutic Technologies'),
          action: () => {
            const el = document.getElementById('velashape') || document.getElementById('therapy');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          },
        },
        {
          label: t.nav.customPrograms || (isAr ? 'أحجز برامج علاجية مخصصة' : 'Book Custom Programs'),
          action: () => {
            if (onOpenBooking) onOpenBooking();
          },
        },
      ],
    },
    { id: 'science', label: t.nav.blog || 'المدونة' },
    { id: 'contact', label: t.nav.contact || 'تواصل معنا' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-3 flex items-center justify-between ${
          isScrolled ? 'bg-[#0b0f15]/85 backdrop-blur-xl border-b border-white/5 py-2.5 shadow-2xl' : 'bg-transparent'
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
            <span className="text-[10px] font-medium text-lime-400 tracking-wider">
              {isAr ? 'مركز خطوط الصحة للعلاج الطبيعي' : 'Rehabilitation & Wellness'}
            </span>
          </div>
        </a>

        {/* Center Navigation Bar (Desktop) — Exact Titles & Dropdown from Image */}
        <div className="hidden lg:flex items-center">
          <div className="relative glass-notch px-6 py-2 rounded-full flex items-center gap-7 border border-white/10 shadow-2xl">
            <nav className="flex items-center gap-6 text-sm font-arabic font-medium tracking-wide">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div
                      key={item.id}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                          dropdownOpen ? 'text-white font-semibold' : 'text-slate-200 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            dropdownOpen ? 'rotate-180 text-lime-400' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu — styled to match the image */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full -right-4 mt-2 w-56 rounded-2xl bg-[#14121a]/98 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden z-50 text-right rtl:text-right"
                          >
                            <div className="py-1">
                              {item.items.map((subItem, sIdx) => {
                                const isLast = sIdx === item.items.length - 1;
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => {
                                      setDropdownOpen(false);
                                      subItem.action();
                                    }}
                                    className={`w-full px-5 py-3.5 text-center text-sm font-arabic font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer ${
                                      !isLast ? 'border-b border-dashed border-white/10' : ''
                                    }`}
                                  >
                                    {subItem.label}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                const targetAnchor = item.targetId || item.id;
                const isServicesActive = item.id === 'services' && ['services', 'departments', 'therapy', 'velashape', 'lymphatic'].includes(activeChapter);
                const isActive = activeChapter === item.id || activeChapter === targetAnchor || isServicesActive;

                return (
                  <a
                    key={item.id}
                    href={`#${targetAnchor}`}
                    className={`relative py-1.5 transition-colors duration-200 hover:text-white ${
                      isActive ? 'text-white font-semibold' : 'text-slate-200'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500 to-lime-400 rounded-full"
                      />
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card hover:border-fuchsia-400/40 text-xs font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
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
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#629131] hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-fuchsia-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>{t.bookConsultation}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full glass-card text-slate-300 hover:text-white border border-white/10 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0c0912]/98 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 text-base font-arabic font-medium">
              {navItems.map((item) => {
                if (item.isDropdown) {
                  return (
                    <div key={item.id} className="border-b border-white/10 pb-3">
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        className="w-full py-2.5 flex items-center justify-between text-white font-semibold cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileDropdownOpen ? 'rotate-180 text-lime-400' : 'text-slate-400'
                          }`}
                        />
                      </button>

                      {mobileDropdownOpen && (
                        <div className="mt-2 mr-3 pr-3 border-r border-fuchsia-500/30 flex flex-col gap-2">
                          {item.items.map((sub, sIdx) => (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                sub.action();
                              }}
                              className="text-right rtl:text-right py-2 text-sm text-slate-300 hover:text-white border-b border-dashed border-white/5 last:border-b-0"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                const targetAnchor = item.targetId || item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${targetAnchor}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 border-b border-white/10 flex items-center justify-between text-white hover:text-lime-300"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500 rtl:rotate-180">→</span>
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-4 pt-6">
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
              <div className="text-center text-xs text-slate-400 font-arabic">
                {t.location}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
