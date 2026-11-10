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
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.035, 0.25),
        ease: EXPO_OUT,
      }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      className="group relative rounded-3xl glass-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#9d237a]/45 dark:hover:border-fuchsia-400/45 hover:shadow-2xl hover:shadow-[#9d237a]/15 dark:hover:shadow-fuchsia-950/30"
    >
      {/* Image Section with Smooth Zoom */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f3eaf4] dark:bg-[#2a1339]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/15 to-transparent dark:from-[#2c123c] dark:via-[#2c123c]/25 dark:to-transparent" />

        {/* Category Pill Tag */}
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-white/85 dark:bg-[#2a113a]/80 backdrop-blur-md border border-[#9d237a]/20 dark:border-white/20 text-[#4d7c1b] dark:text-lime-300 shadow-md">
            {item.subtitle}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-editorial text-xl sm:text-2xl text-[#1f122b] dark:text-white group-hover:text-[#9d237a] dark:group-hover:text-fuchsia-200 transition-colors mb-2.5 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#4a3b59] dark:text-slate-200 leading-relaxed font-light mb-6 line-clamp-3">
            {item.desc}
          </p>
        </div>

        {/* Clinical Assurance & Protocol Badges */}
        <div className="pt-4 border-t border-[#9d237a]/10 dark:border-white/10 mb-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.06] border border-[#9d237a]/10 dark:border-white/10">
            <span className="flex items-center gap-1.5 text-[#4a3b59] dark:text-slate-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400 shrink-0" />
              <span>{dept.evaluationLabel || 'كشف وتقييم سريري'}</span>
            </span>
            <span className="text-[#3f6418] dark:text-lime-300 font-semibold text-[11px] px-2.5 py-0.5 rounded-md bg-[#629131]/12 dark:bg-lime-950/45 border border-[#629131]/20 dark:border-lime-500/25">
              {dept.evaluationDetail || 'أخصائية معتمدة 100%'}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.06] border border-[#9d237a]/10 dark:border-white/10">
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

  const dept = t?.departments;
  const deptItems = dept?.items;

  // Filtered department condition items - called unconditionally
  const filteredItems = useMemo(() => {
    if (!deptItems) return [];
    if (activeCategory === 'all') return deptItems;
    return deptItems.filter((item) => item.category === activeCategory);
  }, [deptItems, activeCategory]);

  // Compute item count per category for tabs - called unconditionally
  const categoryCounts = useMemo(() => {
    if (!deptItems) return { all: 0 };
    const counts = { all: deptItems.length };
    deptItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [deptItems]);

  const handleBookCondition = useCallback((conditionTitle) => {
    const isAr = document.documentElement.lang === 'ar' || !document.documentElement.lang;
    const message = siteConfig.buildConditionInquiry(conditionTitle, isAr ? 'ar' : 'en');
    const whatsappUrl = siteConfig.buildWhatsAppUrl(message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }, []);

  if (!dept) return null;

  return (
    <motion.section
      id="departments"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-28 px-4 sm:px-6 lg:px-8 border-t border-[#9d237a]/10 dark:border-white/10 theme-section-bg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
    >
      {/* Subtle background glow effects matching logo plum & lime */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#9d237a]/12 via-fuchsia-400/10 to-transparent dark:from-[#9d237a]/25 dark:via-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-[#629131]/12 to-transparent dark:from-[#84cc16]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

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

        {/* Category Filter Navigation Bar with Magnetic Spring Pill */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl glass-card gap-1.5 backdrop-blur-xl">
            {dept.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 ${
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
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: EXPO_OUT }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredItems.map((item, index) => (
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
