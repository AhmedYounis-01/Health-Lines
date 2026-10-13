import React, { useState, useMemo } from 'react';
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

const EXPO_OUT = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EXPO_OUT },
  },
};

export default function DepartmentsChapter({ t, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const dept = t.departments;
  if (!dept) return null;

  // Filtered department condition items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return dept.items;
    return dept.items.filter((item) => item.category === activeCategory);
  }, [dept.items, activeCategory]);

  // Compute item count per category for tabs
  const categoryCounts = useMemo(() => {
    const counts = { all: dept.items.length };
    dept.items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [dept.items]);

  const handleBookCondition = (conditionTitle) => {
    const isAr = document.documentElement.lang === 'ar' || !document.documentElement.lang;
    const phone = '966599530955';
    const text = isAr
      ? `السلام عليكم، أود الاستفسار وحجز استشارة وجلسة علاجية في مركز خطوط الصحة بخصوص: (${conditionTitle}). هل يمكن تزويدي بالمواعيد المتاحة؟`
      : `Hello, I would like to inquire and book a therapeutic consultation at Health Lines Center regarding: (${conditionTitle}). What appointment slots are available?`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section
      id="departments"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0c0912]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-6%' }}
    >
      {/* Subtle background glow effects matching logo plum & lime */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#9d237a]/15 via-fuchsia-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-[#84cc16]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.header
          variants={cardVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-[#84cc16]/30 text-xs font-mono text-[#84cc16] uppercase tracking-[0.2em] mb-5 shadow-lg shadow-lime-950/20">
            <Sparkles className="w-3.5 h-3.5 text-[#84cc16] animate-pulse" />
            <span>{dept.eyebrow}</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.15] mb-6">
            {dept.titlePrefix}{' '}
            <span className="italic font-light bg-gradient-to-r from-fuchsia-300 via-pink-200 to-lime-300 bg-clip-text text-transparent">
              {dept.titleEmphasis}
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-light mb-8">
            {dept.readingText}
          </p>

          {/* Clinical Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9d237a]/15 border border-[#9d237a]/30 text-xs font-medium text-fuchsia-200">
              <ShieldCheck className="w-4 h-4 text-lime-400" />
              <span>{dept.badgeStaff || '100% Certified Female Staff & Specialists'}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-950/30 border border-lime-500/25 text-xs font-medium text-lime-300">
              <Activity className="w-4 h-4 text-lime-400" />
              <span>{dept.badgeEvaluation || 'Comprehensive Clinical Assessment for Every Case'}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs font-medium text-slate-300">
              <HeartHandshake className="w-4 h-4 text-fuchsia-300" />
              <span>{dept.badgePrivacy || 'Private Closed Suites with Utmost Discretion'}</span>
            </span>
          </div>
        </motion.header>

        {/* Category Filter Navigation Bar with Magnetic Spring Pill */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/10 gap-1.5 bg-black/50 backdrop-blur-xl">
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
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDeptCategory"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] shadow-lg shadow-fuchsia-950/40"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span className={`relative z-10 text-[11px] font-mono px-1.5 py-0.2 rounded-full transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
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
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 22, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.045,
                    ease: EXPO_OUT,
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative rounded-3xl glass-card border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-fuchsia-400/40 hover:shadow-2xl hover:shadow-fuchsia-950/30 bg-[#120d1c]/80"
                >
                  {/* Image Section with Smooth Zoom */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120d1c] via-[#120d1c]/30 to-transparent" />
                    
                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-black/60 backdrop-blur-md border border-white/15 text-lime-300 shadow-md">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-editorial text-xl sm:text-2xl text-white group-hover:text-fuchsia-200 transition-colors mb-2.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    {/* Replaced Prices with Clinical Assurance & Protocol Badges */}
                    <div className="pt-4 border-t border-white/10 mb-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
                          <span>{dept.evaluationLabel || 'كشف وتقييم سريري'}</span>
                        </span>
                        <span className="text-lime-300 font-medium text-[11px] px-2.5 py-0.5 rounded-md bg-lime-950/40 border border-lime-500/20">
                          {dept.evaluationDetail || 'أخصائية معتمدة 100%'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <Sparkles className="w-4 h-4 text-fuchsia-400 shrink-0" />
                          <span>{dept.privacyLabel || 'طبيعة الجلسات'}</span>
                        </span>
                        <span className="text-fuchsia-200 font-medium text-[11px] px-2.5 py-0.5 rounded-md bg-fuchsia-950/30 border border-fuchsia-500/20">
                          {dept.privacyDetail || 'أجنحة نسائية خاصة ومغلقة'}
                        </span>
                      </div>
                    </div>

                    {/* Booking CTA Button */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleBookCondition(item.title)}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#9d237a] via-fuchsia-700 to-[#629131] hover:from-fuchsia-600 hover:to-lime-500 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2 group-hover:shadow-fuchsia-900/40 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>{dept.bookDepartmentCTA}</span>
                      </button>

                      {onOpenBooking && (
                        <button
                          type="button"
                          onClick={onOpenBooking}
                          aria-label={dept.bookAppointmentAria || "Book Appointment"}
                          className="p-3 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-all bg-white/[0.03] cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Consultation Assistance Note */}
        <motion.div
          variants={cardVariants}
          className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl glass-card border border-white/10 bg-black/40"
        >
          <p className="text-sm text-slate-300 mb-3">
            {dept.helpText || 'محتارة أي برنامج علاجي يناسب حالتكِ؟'}
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-lime-400 hover:text-lime-300 underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>{dept.helpCTA || 'احجزي كشف واستشارة لتحديد البرنامج العلاجي المناسب مع الأخصائية'}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
