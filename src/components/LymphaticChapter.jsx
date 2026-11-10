import React, { memo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, HeartHandshake, Sparkles, Feather } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';
import { gsap } from 'gsap';

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

function LymphaticChapter({ t }) {
  const icons = [Droplets, HeartHandshake, Sparkles, Feather];
  const sectionRef = useRef(null);
  const waveRef = useRef(null);

  // GSAP wave animation
  useEffect(() => {
    if (!waveRef.current) return undefined;
    const tween = gsap.to(waveRef.current, {
      x: '-50%',
      duration: 18,
      repeat: -1,
      ease: 'none',
    });
    return () => tween.kill();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="lymphatic"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-[#9d237a]/10 dark:border-white/10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* High-Performance Atmospheric Image Background — Female Lymphatic Drainage Therapy */}
      <ChapterVideoBackground
        posterSrc="/assets/lymphatic-female-drainage.jpg"
        alt="Certified Female Lymphatic Drainage Specialist in Private Clinic Suite Jeddah"
        glowClass="bg-[#9d237a]/20 dark:bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#629131]/15 dark:bg-[#84cc16]/25"
        brightness="brightness-[0.94] dark:brightness-[0.72]"
        contrast="contrast-[1.03] dark:contrast-[1.08]"
      />

      {/* Animated gentle wave overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-15 dark:opacity-15 pointer-events-none z-0">
        <div
          ref={waveRef}
          className="absolute bottom-0 flex"
          style={{ width: '200%' }}
        >
          <svg viewBox="0 0 1440 80" className="w-1/2 fill-[#9d237a]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
          <svg viewBox="0 0 1440 80" className="w-1/2 fill-[#629131] dark:fill-[#84cc16]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-semibold tracking-[0.2em] text-[#9d237a] dark:text-fuchsia-300 uppercase mb-4 flex items-center gap-2"
          >
            <Droplets className="w-4 h-4 text-[#9d237a] dark:text-fuchsia-300 animate-pulse" />
            <span>{t.lymphatic.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1f122b] dark:text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.lymphatic.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease: EXPO_OUT }}
              className="italic font-light text-[#9d237a] dark:text-fuchsia-200 inline-block"
            >
              {t.lymphatic.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.lymphatic.readingText} />
        </motion.div>

        {/* 4 Pillars Grid — staggered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.lymphatic.pillars.map((pillar, idx) => {
            const IconComponent = icons[idx] || Droplets;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, delay: idx * 0.1, ease: EXPO_OUT },
                  },
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(157, 35, 122, 0.45)',
                  boxShadow: '0 25px 50px -10px rgba(157,35,122,0.18)',
                }}
                transition={{ duration: 0.25 }}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group shadow-xl backdrop-blur-xl"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9d237a]/0 to-transparent group-hover:from-[#9d237a]/10 dark:group-hover:from-[#9d237a]/20 group-hover:to-transparent transition-all duration-500 rounded-3xl pointer-events-none" />

                <motion.div
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className="w-12 h-12 rounded-2xl bg-[#9d237a]/12 dark:bg-[#9d237a]/30 border border-[#9d237a]/30 dark:border-fuchsia-400/40 flex items-center justify-center text-[#9d237a] dark:text-fuchsia-300 mb-6 shadow-md"
                >
                  <IconComponent className="w-6 h-6 text-[#9d237a] dark:text-fuchsia-300" />
                </motion.div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-medium text-[#1f122b] dark:text-white group-hover:text-[#9d237a] dark:group-hover:text-fuchsia-200 transition-colors font-arabic">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-[#4d7c1b] dark:text-lime-400 font-semibold">0{idx + 1}</span>
                </div>

                <p className="text-[#4a3b59] dark:text-slate-200 font-light text-sm md:text-base leading-relaxed font-arabic">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Healing Quote Callout with animated text & glowing border */}
        <motion.div
          variants={slideUp}
          className="mt-14 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#9d237a]/10 via-white/80 to-[#629131]/12 dark:from-[#9d237a]/30 dark:via-[#3e184b]/65 dark:to-[#629131]/25 border border-[#9d237a]/25 dark:border-fuchsia-400/35 text-center relative overflow-hidden backdrop-blur-xl shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,35,122,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.14)_0%,transparent_70%)] pointer-events-none" />
          <motion.p
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EXPO_OUT }}
            className="font-editorial text-xl md:text-2xl italic text-[#1f122b] dark:text-slate-100 max-w-3xl mx-auto relative z-10 leading-relaxed font-arabic"
          >
            {t.lymphatic.quote || '"When the lymph moves freely, inflammation dissipates and true cellular regeneration begins."'}
          </motion.p>
          <span className="block text-xs font-mono text-[#4d7c1b] dark:text-lime-400 mt-3 tracking-widest uppercase relative z-10 font-bold">
            {t.lymphatic.quoteAuthor || 'Health Lines Clinical Philosophy · Jeddah'}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default memo(LymphaticChapter);
