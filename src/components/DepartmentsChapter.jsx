import React, { memo, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Activity,
  HeartHandshake
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import useDeviceProfile from '../hooks/useDeviceProfile';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EXPO_OUT },
  },
};

const DepartmentCard = memo(function DepartmentCard({
  item,
  index,
  dept,
  onBookCondition,
  onOpenBooking,
}) {
  const webpSrc =
    item.image && /\.jpe?g$/i.test(item.image)
      ? item.image.replace(/\.jpe?g$/i, '.webp')
      : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.18),
        ease: EXPO_OUT,
      }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative rounded-3xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#9d237a]/45 dark:hover:border-fuchsia-400/45 hover:shadow-2xl hover:shadow-[#9d237a]/15 dark:hover:shadow-fuchsia-950/30"
    >
      {/* Image Section with Smooth Zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f3eaf4] dark:bg-[#2a1339]">
        <picture className="block w-full h-full">
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-white/58 via-white/8 to-transparent dark:from-[#2c123c] dark:via-[#2c123c]/25 dark:to-transparent" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 max-w-[calc(100%-1.75rem)]">
          <span className="inline-block truncate max-w-full px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-white/64 dark:bg-[#2a113a]/80 backdrop-blur-md border border-[#9d237a]/22 dark:border-white/20 text-[#355e0d] dark:text-lime-300 shadow-md">
            {item.subtitle}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-editorial text-xl sm:text-2xl text-[#1f122b] dark:text-white group-hover:text-[#9d237a] dark:group-hover:text-fuchsia-200 transition-colors mb-2.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#4a3b59] dark:text-slate-200 leading-relaxed font-light mb-5 sm:mb-6 line-clamp-3">
            {item.desc}
          </p>
        </div>

        {/* Clinical Assurance & Protocol Badges */}
        <div className="pt-3.5 sm:pt-4 border-t border-[#9d237a]/10 dark:border-white/10 mb-4 sm:mb-5 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap text-xs p-2.5 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.06] border border-[#9d237a]/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 text-[#4a3b59] dark:text-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400 shrink-0" />
              <span>{dept.evaluationLabel || 'كشف وتقييم سريري'}</span>
            </span>
            <span className="text-[#3f6418] dark:text-lime-300 font-semibold text-[11px] px-2.5 py-0.5 rounded-md bg-[#629131]/12 dark:bg-lime-950/45 border border-[#629131]/20 dark:border-lime-500/25">
              {dept.evaluationDetail || 'أخصائية معتمدة 100%'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap text-xs p-2.5 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.06] border border-[#9d237a]/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 text-[#4a3b59] dark:text-slate-200 font-medium">
              <Sparkles className="w-4 h-4 text-[#9d237a] dark:text-fuchsia-300 shrink-0" />
              <span>{dept.privacyLabel || 'طبيعة الجلسات'}</span>
            </span>
            <span className="text-[#861c68] dark:text-fuchsia-200 font-semibold text-[11px] px-2.5 py-0.5 rounded-md bg-[#9d237a]/10 dark:bg-fuchsia-950/40 border border-[#9d237a]/20 dark:border-fuchsia-500/25">
              {dept.privacyDetail || 'أجنحة نسائية خاصة ومغلقة'}
            </span>
          </div>
        </div>

        {/* Booking CTA Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onBookCondition(item.title)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#629131] hover:brightness-110 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>{dept.bookDepartmentCTA}</span>
          </button>

          {onOpenBooking && (
            <button
              type="button"
              onClick={onOpenBooking}
              aria-label={dept.bookAppointmentAria || 'Book Appointment'}
              className="p-3 rounded-xl border border-[#9d237a]/20 dark:border-white/15 hover:border-[#9d237a]/50 dark:hover:border-white/35 text-[#4a3b59] dark:text-slate-200 hover:text-[#9d237a] dark:hover:text-white transition-all bg-white/70 dark:bg-white/[0.06] cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
});

function DepartmentsChapter({ t, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAllMobile, setShowAllMobile] = useState(false);
  const { isMobile } = useDeviceProfile();

  const dept = t?.departments;
  const deptItems = dept?.items;
  const isAr = t?.langCode === 'العربية';

  // Filtered department condition items - called unconditionally
  const filteredItems = useMemo(() => {
    if (!deptItems) return [];
    if (activeCategory === 'all') return deptItems;
    return deptItems.filter((item) => item.category === activeCategory);
  }, [deptItems, activeCategory]);

  // Paginate hero-all grid on mobile to avoid rendering 14 cards simultaneously
  const displayedItems = useMemo(() => {
    if (isMobile && activeCategory === 'all' && !showAllMobile) {
      return filteredItems.slice(0, 6);
    }
    return filteredItems;
  }, [filteredItems, isMobile, activeCategory, showAllMobile]);

  // Compute item count per category for tabs - called unconditionally
  const categoryCounts = useMemo(() => {
    if (!deptItems) return { all: 0 };
    const counts = { all: deptItems.length };
    deptItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [deptItems]);

  const handleBookCondition = useCallback(
    (conditionTitle) => {
      const message = siteConfig.buildConditionInquiry(conditionTitle, isAr ? 'ar' : 'en');
      const whatsappUrl = siteConfig.buildWhatsAppUrl(message);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    },
    [isAr]
  );

  if (!dept) return null;

  return (
    <motion.section
      id="departments"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#9d237a]/10 dark:border-white/10 theme-section-bg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
    >
      {/* Subtle background glow effects matching logo plum & lime (GPU radial gradient, bounded to viewport) */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,95vw)] h-[min(600px,95vw)] rounded-full bg-[radial-gradient(circle,rgba(157,35,122,0.14)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(157,35,122,0.26)_0%,transparent_68%)] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-10 w-[min(450px,80vw)] h-[min(450px,80vw)] rounded-full bg-[radial-gradient(circle,rgba(98,145,49,0.12)_0%,transparent_68%)] dark:bg-[radial-gradient(circle,rgba(132,204,22,0.15)_0%,transparent_68%)] pointer-events-none" />
      <div className="hidden md:block absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.header
          variants={cardVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#629131]/35 dark:border-[#84cc16]/30 text-xs font-mono text-[#4d7c1b] dark:text-[#84cc16] uppercase tracking-[0.2em] mb-5 shadow-lg shadow-[#629131]/10 dark:shadow-lime-950/20">
            <Sparkles className="w-3.5 h-3.5 text-[#4d7c1b] dark:text-[#84cc16] animate-pulse" />
            <span>{dept.eyebrow}</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1f122b] dark:text-white tracking-tight leading-[1.15] mb-6">
            {dept.titlePrefix}{' '}
            <span className="italic font-light bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#629131] dark:from-fuchsia-300 dark:via-pink-200 dark:to-lime-300 bg-clip-text text-transparent">
              {dept.titleEmphasis}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a3b59] dark:text-slate-200/90 leading-relaxed font-light mb-8">
            {dept.readingText}
          </p>

          {/* Clinical Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9d237a]/10 dark:bg-[#9d237a]/25 border border-[#9d237a]/25 dark:border-fuchsia-400/35 text-xs font-medium text-[#7e1c62] dark:text-fuchsia-200">
              <ShieldCheck className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400" />
              <span>{dept.badgeStaff || '100% Certified Female Staff & Specialists'}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#629131]/10 dark:bg-lime-900/35 border border-[#629131]/25 dark:border-lime-400/30 text-xs font-medium text-[#3f6418] dark:text-lime-200">
              <Activity className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400" />
              <span>{dept.badgeEvaluation || 'Comprehensive Clinical Assessment for Every Case'}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 dark:bg-white/[0.06] border border-[#9d237a]/15 dark:border-white/15 text-xs font-medium text-[#4a3b59] dark:text-slate-200">
              <HeartHandshake className="w-4 h-4 text-[#9d237a] dark:text-fuchsia-300" />
              <span>{dept.badgePrivacy || 'Private Closed Suites with Utmost Discretion'}</span>
            </span>
          </div>
        </motion.header>

        {/* Category Filter Navigation Bar with Magnetic Spring Pill (wraps cleanly on mobile) */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="flex flex-wrap items-center justify-center p-1.5 rounded-2xl glass-card gap-1.5 backdrop-blur-xl max-w-full">
            {dept.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAllMobile(false);
                  }}
                  className={`relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#5b4b6b] dark:text-slate-300 hover:text-[#1f122b] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDeptCategory"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] shadow-lg shadow-[#9d237a]/25 dark:shadow-fuchsia-950/40"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span className={`relative z-10 text-[11px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-[#9d237a]/10 dark:bg-white/10 text-[#6b5c7a] dark:text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Conditions & Rehabilitation Grid with Silk-Smooth Crossfade & Cascade */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${showAllMobile ? 'all' : 'slice'}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EXPO_OUT }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {displayedItems.map((item, index) => (
                <DepartmentCard
                  key={item.id}
                  item={item}
                  index={index}
                  dept={dept}
                  onBookCondition={handleBookCondition}
                  onOpenBooking={onOpenBooking}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {isMobile && activeCategory === 'all' && filteredItems.length > 6 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllMobile((prev) => !prev)}
                className="px-6 py-3 rounded-full glass-card border border-[#9d237a]/30 dark:border-fuchsia-400/35 text-xs sm:text-sm font-semibold text-[#1f122b] dark:text-white hover:border-[#629131] dark:hover:border-lime-400 shadow-lg transition-all cursor-pointer"
              >
                {isAr
                  ? showAllMobile
                    ? 'عرض تخصصات أقل'
                    : `عرض جميع التخصصات الطبية (${filteredItems.length})`
                  : showAllMobile
                    ? 'Show Fewer Specialties'
                    : `View All Specialties (${filteredItems.length})`}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Consultation Assistance Note */}
        <motion.div
          variants={cardVariants}
          className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl glass-card"
        >
          <p className="text-sm text-[#4a3b59] dark:text-slate-200 mb-3">
            {dept.helpText || 'محتارة أي برنامج علاجي يناسب حالتكِ؟'}
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4d7c1b] dark:text-lime-400 hover:text-[#9d237a] dark:hover:text-lime-300 underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>{dept.helpCTA || 'احجزي كشف واستشارة لتحديد البرنامج العلاجي المناسب مع الأخصائية'}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(DepartmentsChapter);
