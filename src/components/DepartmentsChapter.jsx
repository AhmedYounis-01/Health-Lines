import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Calendar, 
  Activity, 
  ShieldCheck, 
  ChevronRight, 
  Tag, 
  Filter 
} from 'lucide-react';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EXPO_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

export default function DepartmentsChapter({ t, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPlanType, setSelectedPlanType] = useState('all'); // 'all', 'standard', 'intensive'

  const dept = t.departments;
  if (!dept) return null;

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return dept.items;
    return dept.items.filter((item) => item.category === activeCategory);
  }, [dept.items, activeCategory]);

  const handleBookCondition = (conditionTitle) => {
    const isAr = document.documentElement.lang === 'ar' || !document.documentElement.lang;
    const phone = '966599530955';
    const text = isAr
      ? `السلام عليكم، أود الاستفسار وحجز باقة علاجية في مركز خطوط الصحة بخصوص: (${conditionTitle}). هل يمكن تزويدي بالمواعيد المتاحة؟`
      : `Hello, I would like to inquire and book a rehabilitation package at Health Lines Center regarding: (${conditionTitle}). What appointment slots are available?`;
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

          <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-light">
            {dept.readingText}
          </p>
        </motion.header>

        {/* Unified Transparent Package Pricing Showcase Banner */}
        <motion.div
          variants={cardVariants}
          className="relative glass-card border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 mb-16 overflow-hidden shadow-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01]"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#84cc16] uppercase tracking-wider mb-2">
                <Tag className="w-3.5 h-3.5 text-[#84cc16]" />
                <span>{dept.packagesSubtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial text-white">
                {dept.packagesTitle}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#9d237a]/20 border border-[#9d237a]/40 text-xs font-medium text-fuchsia-200">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>100% كادر نسائي معتمد</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-950/40 border border-lime-500/30 text-xs font-medium text-lime-300">
                <Activity className="w-3.5 h-3.5 text-lime-400" />
                <span>كشف سريري مجاني شامل</span>
              </span>
            </div>
          </div>

          {/* Pricing Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard Tier */}
            <div className="relative rounded-2xl p-6 sm:p-7 border border-white/10 bg-white/[0.02] hover:border-fuchsia-500/40 transition-all duration-300 group">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  {dept.standardPlan.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[11px] font-mono text-slate-300 border border-slate-700">
                  خطة علاجية أساسية
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-editorial text-white group-hover:text-fuchsia-200 transition-colors mb-3">
                {dept.standardPlan.name}
              </h4>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                {dept.standardPlan.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">٦ جلسات</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-white">850 <span className="text-xs font-normal text-slate-400">ريال</span></span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">١٢ جلسة</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#84cc16]">1,700 <span className="text-xs font-normal text-slate-400">ريال</span></span>
                </div>
              </div>
            </div>

            {/* Intensive Tier */}
            <div className="relative rounded-2xl p-6 sm:p-7 border border-[#9d237a]/50 bg-gradient-to-b from-[#9d237a]/15 to-transparent hover:border-[#84cc16]/60 transition-all duration-300 group shadow-lg shadow-fuchsia-950/30">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-mono tracking-widest text-fuchsia-300 uppercase">
                  {dept.intensivePlan.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#84cc16]/20 text-[11px] font-mono text-[#84cc16] border border-[#84cc16]/40 font-bold">
                  ★ الأكثر شمولاً
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-editorial text-white group-hover:text-lime-200 transition-colors mb-3">
                {dept.intensivePlan.name}
              </h4>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {dept.intensivePlan.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-xl bg-black/50 border border-fuchsia-500/20">
                  <span className="text-xs text-slate-300 block mb-1">٦ جلسات مكثفة</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-white">1,200 <span className="text-xs font-normal text-slate-400">ريال</span></span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-lime-500/20">
                  <span className="text-xs text-slate-300 block mb-1">١٢ جلسة مكثفة</span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-[#84cc16]">2,500 <span className="text-xs font-normal text-slate-400">ريال</span></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Navigation Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl glass-card border border-white/10 gap-1.5 bg-black/40 backdrop-blur-xl">
            {dept.categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDeptCategory"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] shadow-lg shadow-fuchsia-950/40"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Medical Conditions & Rehabilitation Grid */}
        <motion.div
          variants={containerVariants}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                key={item.id}
                variants={cardVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-3xl glass-card border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-fuchsia-400/40 hover:shadow-2xl hover:shadow-fuchsia-950/30 bg-[#120d1c]/80"
              >
                {/* Image Section */}
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

                  {/* Pricing Chips */}
                  <div className="pt-4 border-t border-white/10 mb-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-slate-400 font-mono">الباقات العادية</span>
                      <span className="text-white font-mono font-medium">850 / 1,700 <span className="text-[10px] text-slate-400">ريال</span></span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-fuchsia-300 font-mono">الباقات المكثفة</span>
                      <span className="text-[#84cc16] font-mono font-bold">1,200 / 2,500 <span className="text-[10px] text-slate-400">ريال</span></span>
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
                        aria-label="حجز موعد"
                        className="p-3 rounded-xl border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-all bg-white/[0.03] cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Consultation Assistance Note */}
        <motion.div
          variants={cardVariants}
          className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl glass-card border border-white/10 bg-black/40"
        >
          <p className="text-sm text-slate-300 mb-3">
            محتارة أي باقة أو برنامج يناسب حالتكِ؟
          </p>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-lime-400 hover:text-lime-300 underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>احجزي كشف واستشارة مجانية لتحديد البرنامج المناسب مع الأخصائية</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
