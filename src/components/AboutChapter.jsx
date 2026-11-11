import React, { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: EXPO_OUT, staggerChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EXPO_OUT } },
};

const StatCard = memo(function StatCard({ num, label, idx }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const rawNum = parseFloat(String(num).replace(/[^0-9.]/g, ''));
    const suffix = String(num).replace(/^[\d.]+/, '').trim();
    if (isNaN(rawNum)) {
      el.textContent = String(num);
      return undefined;
    }

    let rafId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const startTime = performance.now() + idx * 90;
        const duration = 1100;
        const step = (now) => {
          const progress = Math.max(0, Math.min(1, (now - startTime) / duration));
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = rawNum * eased;
          el.textContent =
            (Number.isInteger(rawNum) ? Math.round(current) : current.toFixed(1)) + suffix;
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
  }, [num, idx]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT },
        },
      }}
      whileHover={{ y: -6, borderColor: 'rgba(157, 35, 122, 0.45)', boxShadow: '0 20px 40px -10px rgba(157,35,122,0.18)' }}
      className="glass-card p-4 sm:p-6 md:p-8 rounded-2xl text-center shadow-xl backdrop-blur-xl"
    >
      <div
        ref={ref}
        className="font-editorial text-2xl sm:text-3xl md:text-5xl font-light text-[#629131] dark:text-lime-400 mb-1.5 sm:mb-2 font-mono"
      >
        0
      </div>
      <div className="text-xs font-arabic text-[#4a3b59] dark:text-slate-200 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
});

export default memo(function AboutChapter({ t, onExploreServices }) {
  const sectionRef = useRef(null);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20 sm:py-24 px-4 sm:px-6 border-t border-[#9d237a]/10 dark:border-white/10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Chapter 02: About / Sanctuary Dedicated Interior Visual */}
      <ChapterVideoBackground
        posterSrc="/assets/about-sanctuary-suite.jpg"
        alt="Health Lines Clinic Interior Jeddah Sanctuary"
        glowClass="bg-[#9d237a]/20 dark:bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#629131]/15 dark:bg-[#84cc16]/25"
        brightness="brightness-[0.9] dark:brightness-[0.55]"
        contrast="contrast-[1.03] dark:contrast-[1.08]"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-semibold tracking-[0.2em] text-[#4d7c1b] dark:text-lime-400 uppercase mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400 animate-pulse" />
            <span>{t.sanctuary.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1f122b] dark:text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.sanctuary.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: EXPO_OUT }}
              className="italic font-light text-[#9d237a] dark:text-fuchsia-200 inline-block"
            >
              {t.sanctuary.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.sanctuary.readingText} />
        </motion.div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12">
          {t.sanctuary.stats.map((st, idx) => (
            <StatCard key={idx} num={st.num} label={st.label} idx={idx} />
          ))}
        </div>

        {/* CTA to explore services */}
        <motion.div variants={slideUp} className="flex justify-center sm:justify-start">
          <a
            href="#departments"
            onClick={(e) => {
              if (onExploreServices) {
                e.preventDefault();
                onExploreServices();
              }
            }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white/85 dark:bg-gradient-to-r dark:from-[#9d237a]/45 dark:via-[#49195e]/60 dark:to-[#273824]/50 border border-[#9d237a]/30 dark:border-fuchsia-400/40 hover:border-[#629131] dark:hover:border-lime-400 text-[#1f122b] dark:text-white font-semibold text-xs sm:text-sm font-arabic tracking-wide shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <span>{t.langCode === 'العربية' ? 'استكشفي خدماتنا وبرامجنا العلاجية' : 'Explore Our Therapeutic Services'}</span>
            <ArrowDown className="w-4 h-4 text-[#629131] dark:text-lime-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
});

