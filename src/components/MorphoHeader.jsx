import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Menu, X, Globe, Sun, Moon, Phone, MessageCircle } from 'lucide-react';
import { useClinicContext } from '../context/useClinicContext';

function MorphoHeader({ lang, setLang, t, activeChapter, onOpenBooking }) {
  const { theme, toggleTheme } = useClinicContext();
  const isDark = theme === 'dark';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAr = lang === 'ar';

  // 5 clean navigation items including 'تواصل معنا'
  const navItems = [
    { id: 'hero', label: isAr ? 'الرئيسية' : 'Home', targetId: 'hero' },
    { id: 'services', label: isAr ? 'خدماتنا' : 'Services', targetId: 'services' },
    { id: 'sessions', label: isAr ? 'جلساتنا' : 'Sessions', targetId: 'sessions' },
    { id: 'why', label: isAr ? 'لماذا نحن' : 'Why Us', targetId: 'why' },
    { id: 'contact', label: isAr ? 'تواصل معنا' : 'Contact Us', targetId: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 dark:bg-[#0d0416]/95 backdrop-blur-md border-b border-[#9d237a]/15 dark:border-white/10 shadow-lg shadow-[#9d237a]/5 dark:shadow-black/40 py-2.5 sm:py-3'
          : 'bg-white/80 dark:bg-[#0d0416]/80 backdrop-blur-sm border-b border-[#9d237a]/10 dark:border-white/[0.07] py-3 sm:py-3.5'
      }`}
    >
      <div className="shell flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Title */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-[#9d237a]/50 rounded-xl shrink-0"
          aria-label={t.siteTitle}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white p-1 border border-[#9d237a]/30 dark:border-fuchsia-400/40 flex items-center justify-center group-hover:border-[#629131] dark:group-hover:border-lime-400 transition-all shadow-md overflow-hidden shrink-0">
            <img src="/assets/logo.png" alt="Health Lines Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-editorial text-sm sm:text-base md:text-lg font-bold tracking-wider whitespace-nowrap text-[#1f122b] dark:text-white group-hover:text-[#9d237a] dark:group-hover:text-fuchsia-300 transition-colors leading-tight">
              HEALTH LINES
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#4d7c1b] dark:text-lime-400 tracking-normal whitespace-nowrap leading-tight">
              {isAr ? 'مركز خطوط الصحة للعلاج الطبيعي' : 'Physical Therapy Sanctuary'}
            </span>
          </div>
        </a>

        {/* Center Minimalist Navigation Capsule (Desktop) */}
        <div className="hidden lg:flex items-center">
          <nav
            aria-label={isAr ? 'القائمة الرئيسية' : 'Main Navigation'}
            className="relative px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-[#9d237a]/15 dark:border-white/10 backdrop-blur-md flex items-center gap-6 xl:gap-7 text-sm font-arabic font-medium shadow-sm"
          >
            {navItems.map((item) => {
              const isActive = activeChapter === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.targetId}`}
                  className={`relative py-1 px-1 transition-colors duration-200 ${
                    isActive
                      ? 'text-[#9d237a] dark:text-white font-bold'
                      : 'text-[#4a3b59] dark:text-slate-300 hover:text-[#9d237a] dark:hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#9d237a] to-[#629131] dark:from-fuchsia-400 dark:to-lime-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: WhatsApp CTA, Booking, Theme & Language */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/966599530955"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#25D366]/12 dark:bg-[#25D366]/18 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-[#15803d] dark:text-[#4ade80] hover:text-[#0f5132] dark:hover:text-white text-xs font-bold transition-all shadow-sm"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
            <span className="text-[10px] font-mono opacity-70">↗</span>
          </a>

          {/* Book Consultation Button — Visible on sm+ */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#629131] hover:brightness-110 text-white font-bold text-xs tracking-wide shadow-md shadow-[#9d237a]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>{t.bookConsultation || (isAr ? 'احجز استشارتك' : 'Book Consultation')}</span>
          </button>

          {/* Theme Switcher — Desktop Only */}
          <button
            type="button"
            onClick={toggleTheme}
            className="hidden lg:flex p-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:border-[#9d237a]/30 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer shrink-0"
            aria-label={isDark ? (t.theme?.toLight || 'Switch to Light Mode') : (t.theme?.toDark || 'Switch to Dark Mode')}
            title={isDark ? (t.theme?.toLight || 'Switch to Light Mode') : (t.theme?.toDark || 'Switch to Dark Mode')}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#9d237a]" />}
          </button>

          {/* Language Switcher — Desktop Only */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:border-[#9d237a]/30 text-xs font-semibold text-[#4a3b59] dark:text-slate-200 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-[#629131] dark:text-lime-400 shrink-0" />
            <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.08] border border-black/10 dark:border-white/15 text-[#1f122b] dark:text-white hover:text-[#9d237a] cursor-pointer shrink-0"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Lightweight, High-Performance Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 z-40 bg-white/98 dark:bg-[#10051a]/98 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto border-t border-[#9d237a]/15 dark:border-white/10 shadow-2xl lg:hidden transform-gpu"
          >
            <div>
              {/* Preferences Bar: Theme & Language (Clean & accessible inside drawer) */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-black/5 dark:border-white/10">
                <span className="text-xs font-semibold text-[#861365] dark:text-fuchsia-300">
                  {isAr ? 'الإعدادات والمظهر' : 'Preferences'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#9d237a]" />}
                    <span>{isDark ? (t.theme?.labelLight || 'فاتح') : (t.theme?.labelDark || 'ليلي')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#629131] dark:text-lime-400" />
                    <span>{lang === 'en' ? 'العربية' : 'English'}</span>
                  </button>
                </div>
              </div>

              {/* Clean Navigation Links */}
              <nav className="flex flex-col divide-y divide-black/5 dark:divide-white/10">
                {navItems.map((item) => {
                  const isActive = activeChapter === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.targetId}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-3.5 text-base font-bold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-[#9d237a] dark:text-fuchsia-300 font-extrabold'
                          : 'text-[#1f122b] dark:text-slate-100 hover:text-[#9d237a]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-xs text-[#629131] dark:text-lime-400 opacity-70">↗</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Bottom Quick Actions */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-black/5 dark:border-white/10 mt-auto">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#9d237a] to-[#629131] text-white font-bold text-center text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>{t.bookConsultation || (isAr ? 'احجز استشارتك الآن' : 'Book Consultation Now')}</span>
              </button>

              <a
                href="https://wa.me/966599530955"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-center text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>{isAr ? 'محادثة عبر واتساب' : 'Chat on WhatsApp'}</span>
              </a>

              <a
                href="tel:0126918000"
                className="w-full py-2 rounded-full border border-black/10 dark:border-white/15 text-slate-700 dark:text-slate-300 font-medium text-center text-xs flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-[#629131] dark:text-lime-400" />
                <span>{isAr ? 'اتصال مباشر: 012 691 8000' : 'Direct Call: 012 691 8000'}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default memo(MorphoHeader);
