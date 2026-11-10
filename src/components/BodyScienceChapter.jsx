import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Sun, Thermometer } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPO_OUT = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EXPO_OUT, staggerChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO_OUT } },
};

// Floating particle dots (lightweight, runs off main thread with CSS transforms)
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${i % 2 === 0 ? 'bg-[#84cc16]/40' : 'bg-[#d946ef]/40'}`}
          style={{
            left: `${15 + (i * 11) % 75}%`,
            top: `${20 + (i * 13) % 60}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.2, 0.55, 0.2],
          }}
          transition={{
            duration: 4.5 + (i % 3) * 2,
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function BodyScienceChapter({ t }) {
  const icons = [Thermometer, Activity, Brain, Sun];
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  // GSAP Parallax
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
    tl.fromTo(bgRef.current, { y: '-6%' }, { y: '6%', ease: 'none' });
    return () => tl.kill();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="science"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-[#9d237a]/10 dark:border-white/10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* High-Performance Atmospheric Image Background — Female Rehabilitation & Body Vitality */}
      <ChapterVideoBackground
        posterSrc="/assets/bodyscience-female-vitality.jpg"
        alt="Female Physiotherapist guiding female client in body alignment and posture vitality"
        glowClass="bg-[#629131]/15 dark:bg-[#84cc16]/25"
        glowSecondaryClass="bg-[#9d237a]/15 dark:bg-[#9d237a]/25"
        brightness="brightness-[0.94] dark:brightness-[0.72]"
        contrast="contrast-[1.03] dark:contrast-[1.08]"
      />

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-semibold tracking-[0.2em] text-[#4d7c1b] dark:text-[#84cc16] uppercase mb-4 flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-[#4d7c1b] dark:text-[#84cc16] animate-pulse" />
            <span>{t.science.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1f122b] dark:text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.science.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: EXPO_OUT }}
              className="italic font-light text-[#4d7c1b] dark:text-[#a3e635] inline-block"
            >
              {t.science.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.science.readingText} />
        </motion.div>

        {/* 4 Health Roles Grid — staggered with reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.science.items.map((item, idx) => {
            const Icon = icons[idx] || Activity;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT },
                  },
                }}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(98, 145, 49, 0.45)',
                  boxShadow: '0 25px 50px -12px rgba(98, 145, 49, 0.2)',
                }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between group relative overflow-hidden shadow-xl backdrop-blur-xl"
              >
                {/* Glow reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#629131]/0 to-transparent group-hover:from-[#629131]/10 dark:group-hover:from-[#84cc16]/15 group-hover:to-transparent transition-all duration-500 rounded-2xl pointer-events-none" />

                <div>
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: -4 }}
                    transition={{ type: 'spring', stiffness: 350 }}
                    className="w-10 h-10 rounded-xl bg-[#629131]/15 dark:bg-[#84cc16]/20 border border-[#629131]/30 dark:border-[#84cc16]/35 flex items-center justify-center text-[#4d7c1b] dark:text-[#84cc16] mb-5 shadow-sm"
                  >
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-[#1f122b] dark:text-white mb-3 group-hover:text-[#4d7c1b] dark:group-hover:text-[#a3e635] transition-colors font-arabic">
                    {item.title}
                  </h3>
                  <p className="text-[#4a3b59] dark:text-slate-200 font-light text-xs md:text-sm leading-relaxed font-arabic">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#9d237a]/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-[#6b5c7a] dark:text-slate-400">
                  <span className="text-[#9d237a] dark:text-[#e879f9] font-semibold">BIO-BALANCE</span>
                  <span className="text-[#4d7c1b] dark:text-lime-400 font-bold">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Citations */}
        <motion.div
          variants={slideUp}
          className="p-5 rounded-2xl glass-card flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4a3b59] dark:text-slate-300 font-arabic backdrop-blur-md"
        >
          <span className="leading-relaxed">{t.science.sourceNote}</span>
          <div className="flex items-center gap-4 font-mono uppercase text-[#4d7c1b] dark:text-[#84cc16] shrink-0 font-bold">
            <span className="hover:text-[#9d237a] dark:hover:text-lime-300 transition-colors">
              Clinical Quality Guidelines ↗
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
