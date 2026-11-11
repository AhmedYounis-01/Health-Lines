import React, { memo, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: EXPO_OUT, staggerChildren: 0.08 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EXPO_OUT } },
};

// Lightweight IntersectionObserver counter (zero GSAP ScrollTrigger overhead)
const AnimatedCounter = memo(function AnimatedCounter({ value, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const valStr = String(value).trim();
    const isRange = valStr.includes('-');
    let min = 0;
    let max = 0;
    let singleNum = 0;
    let prefix = '';

    if (isRange) {
      const parts = valStr.split('-').map((s) => s.trim());
      min = parseFloat(parts[0].replace(/[^0-9.]/g, ''));
      max = parseFloat(parts[1].replace(/[^0-9.]/g, ''));
      if (isNaN(min) || isNaN(max)) {
        el.textContent = valStr;
        return undefined;
      }
    } else {
      singleNum = parseFloat(valStr.replace(/[^0-9.]/g, ''));
      prefix = valStr.replace(/[0-9.]/g, '').replace(/\d/g, '').trim();
      if (isNaN(singleNum)) {
        el.textContent = valStr;
        return undefined;
      }
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const startTime = performance.now() + delay * 1000;
        const duration = 1100;
        const step = (now) => {
          const progress = Math.max(0, Math.min(1, (now - startTime) / duration));
          const eased = 1 - Math.pow(1 - progress, 3);
          if (isRange) {
            el.textContent = `${Math.round(min * eased)} - ${Math.round(max * eased)}`;
          } else {
            const current = singleNum * eased;
            el.textContent =
              (Number.isInteger(singleNum) ? Math.round(current) : current.toFixed(1)) + prefix;
          }
          if (progress < 1) {
            rafId = requestAnimationFrame(step);
          }
        };
        rafId = requestAnimationFrame(step);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  return (
    <span ref={ref} className={className || "font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight"}>
      0
    </span>
  );
});

function VelaShapeChapter({ t, onOpenBooking }) {
  const [activeArea, setActiveArea] = useState('waist');
  const sectionRef = useRef(null);

  const bodyAreas = t.velashape.areas || [
    { id: 'waist', label: 'Abdomen & Flanks', est: '2.5 - 4 cm avg. reduction' },
    { id: 'thighs', label: 'Thighs & Cellulite', est: 'Deep skin smoothing' },
    { id: 'arms', label: 'Upper Arms Firming', est: 'Targeted skin tightening' },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="velashape"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* High-Performance Atmospheric Image Background — Female Specialist Body Contouring */}
      <ChapterVideoBackground
        posterSrc="/assets/velashape-female-contour.jpg"
        alt="Female Specialist Administering VelaShape III Body Contouring in Private Suite"
        glowClass="bg-[#9d237a]/20 dark:bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#629131]/15 dark:bg-[#84cc16]/25"
        brightness="brightness-[1.08] saturate-[0.94] dark:brightness-[0.72] dark:saturate-100"
        contrast="contrast-[1.02] dark:contrast-[1.08]"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header Copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-semibold tracking-[0.2em] text-[#861365] dark:text-fuchsia-300 uppercase mb-4 flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-white/52 border border-[#9d237a]/22 backdrop-blur-md shadow-sm dark:bg-transparent dark:border-transparent dark:px-0 dark:py-0 dark:shadow-none"
          >
            <Sparkles className="w-4 h-4 text-[#861365] dark:text-fuchsia-300 animate-pulse" />
            <span>{t.velashape.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#170a24] dark:text-white tracking-tight leading-[1.14] mb-6 light-scrim-text">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.velashape.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: EXPO_OUT }}
              className="italic font-normal dark:font-light text-[#861365] dark:text-fuchsia-200 inline-block"
            >
              {t.velashape.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.velashape.readingText} />
        </motion.div>

        {/* Technical Data Cards with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12">
          {t.velashape.specs.map((item, idx) => {
            const isRange = String(item.value).includes('-') || String(item.value).length > 4;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, delay: idx * 0.08, ease: EXPO_OUT },
                  },
                }}
                whileHover={{ y: -6, borderColor: 'rgba(157, 35, 122, 0.45)', boxShadow: '0 20px 40px -10px rgba(157,35,122,0.18)' }}
                transition={{ duration: 0.25 }}
                className="glass-card p-4 sm:p-5 md:p-6 rounded-2xl flex flex-col justify-between group overflow-hidden shadow-lg backdrop-blur-xl"
              >
                <div className="mb-4 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-mono text-[#4d3b62] dark:text-slate-300 uppercase tracking-wider block mb-1 truncate">
                    {item.detail}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#170a24] dark:text-white group-hover:text-[#861365] dark:group-hover:text-fuchsia-200 transition-colors line-clamp-1 font-arabic">
                    {item.name}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 flex-wrap">
                  <AnimatedCounter
                    value={item.value}
                    delay={idx * 0.12}
                    className={`font-editorial font-light text-[#170a24] dark:text-white tracking-tight leading-none ${
                      isRange
                        ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal'
                        : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-mono text-[#355e0d] dark:text-lime-400 font-semibold mt-1 sm:mt-0 whitespace-nowrap">
                    {item.unit}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Target Area Interactive Selector */}
        <motion.div variants={slideUp} className="glass-card p-6 md:p-8 rounded-2xl mb-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4d3b62] dark:text-slate-300 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#355e0d] dark:text-lime-400" />
              <span>{t.velashape.targetZonesTitle || 'TARGET CLINICAL ZONES'}</span>
            </span>
            <span className="text-xs font-mono text-[#355e0d] dark:text-lime-400 font-semibold">
              {t.velashape.targetZonesSubtitle || '0% Surgical Incision · Immediate Normal Routine'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bodyAreas.map((area) => {
              const isActive = activeArea === area.id;
              return (
                <motion.button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveArea(area.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl text-left rtl:text-right border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#9d237a]/16 dark:bg-[#9d237a]/45 border-[#9d237a]/50 dark:border-fuchsia-400/65 text-[#170a24] dark:text-white shadow-lg shadow-[#9d237a]/15 dark:shadow-fuchsia-500/20'
                      : 'bg-white/40 dark:bg-white/[0.06] border-[#9d237a]/15 dark:border-white/10 text-[#2e1f3f] dark:text-slate-300 hover:border-[#9d237a]/35 dark:hover:border-white/25 hover:text-[#170a24] dark:hover:text-white hover:bg-white/62 dark:hover:bg-white/10'
                  }`}
                >
                  <p className="font-semibold text-sm text-[#170a24] dark:text-white mb-1 font-arabic">{area.label}</p>
                  <p className="text-xs font-mono text-[#355e0d] dark:text-lime-400">{area.est}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Note & CTA */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-3.5 rounded-2xl glass-card dark:bg-transparent dark:border-0 dark:border-t dark:border-white/10 dark:rounded-none dark:px-0 dark:pt-4 dark:shadow-none text-xs text-[#2e1f3f] dark:text-slate-300 font-arabic"
        >
          <p className="font-normal dark:font-light text-center sm:text-left rtl:sm:text-right leading-relaxed">
            {t.velashape.note}
          </p>
          <motion.button
            type="button"
            onClick={onOpenBooking}
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1.5 text-[#861365] dark:text-lime-400 hover:text-[#355e0d] dark:hover:text-lime-300 font-mono uppercase tracking-wider shrink-0 cursor-pointer font-bold"
          >
            <span>{t.bookConsultation}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(VelaShapeChapter);
