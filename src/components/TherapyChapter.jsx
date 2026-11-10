import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
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
    transition: { duration: 0.8, ease: EXPO_OUT, staggerChildren: 0.12 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 35, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO_OUT } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -25 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
};

export default function TherapyChapter({ t, onOpenBooking }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const currentTab = t.therapy.tabs[selectedTab] || t.therapy.tabs[0];
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  // GSAP Parallax on background image
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
      id="therapy"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-[#9d237a]/10 dark:border-white/10"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* High-Performance Atmospheric Image Background — 100% Female Physiotherapy Clinic Suite */}
      <ChapterVideoBackground
        posterSrc="/assets/therapy-female-spine.jpg"
        alt="Female Physiotherapist providing spine & joint rehabilitation in private Jeddah clinic"
        glowClass="bg-[#9d237a]/20 dark:bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#629131]/15 dark:bg-[#84cc16]/25"
        brightness="brightness-[0.94] dark:brightness-[0.72]"
        contrast="contrast-[1.03] dark:contrast-[1.08]"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-semibold tracking-[0.2em] text-[#4d7c1b] dark:text-lime-400 uppercase mb-4 flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400 animate-pulse" />
            <span>{t.therapy.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1f122b] dark:text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.therapy.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: EXPO_OUT }}
              className="italic font-light text-[#9d237a] dark:text-fuchsia-300 inline-block"
            >
              {t.therapy.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.therapy.readingText} />
        </motion.div>

        {/* Interactive Focus Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Selector List — staggered entrance */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {t.therapy.tabs.map((tab, idx) => {
              const isActive = selectedTab === idx;
              return (
                <motion.button
                  key={tab.id}
                  variants={slideLeft}
                  type="button"
                  onClick={() => setSelectedTab(idx)}
                  whileHover={{ x: isActive ? 0 : 6 }}
                  whileTap={{ scale: 0.98 }}
                  className={`text-left rtl:text-right p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group cursor-pointer ${
                    isActive
                      ? 'glass-card border-[#9d237a]/45 dark:border-fuchsia-400/55 shadow-xl shadow-[#9d237a]/15 dark:shadow-fuchsia-500/20'
                      : 'bg-white/55 dark:bg-white/[0.06] border-[#9d237a]/10 dark:border-white/10 hover:border-[#9d237a]/35 dark:hover:border-fuchsia-400/35 hover:bg-white/80 dark:hover:bg-white/[0.1]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      className={`text-xs font-mono font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-gradient-to-tr from-[#9d237a] to-fuchsia-500 text-white shadow-md'
                          : 'bg-[#9d237a]/10 dark:bg-white/10 text-[#6b5c7a] dark:text-slate-300'
                      }`}
                    >
                      0{idx + 1}
                    </motion.span>
                    <span className={`text-base font-arabic font-medium tracking-wide ${isActive ? 'text-[#1f122b] dark:text-white font-semibold' : 'text-[#4a3b59] dark:text-slate-200 group-hover:text-[#9d237a] dark:group-hover:text-white'}`}>
                      {tab.title}
                    </span>
                  </div>
                  <motion.span
                    animate={isActive ? { scale: 1.4, backgroundColor: '#629131' } : { scale: 1 }}
                    className="w-2.5 h-2.5 rounded-full bg-transparent border border-[#9d237a]/30 dark:border-white/25"
                  />
                </motion.button>
              );
            })}
          </div>

          {/* Active Detail Showcase Panel */}
          <motion.div variants={slideUp} className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTab}
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: EXPO_OUT }}
                className="glass-card p-8 md:p-10 rounded-3xl border border-[#9d237a]/20 dark:border-fuchsia-400/30 relative overflow-hidden shadow-2xl backdrop-blur-xl"
              >
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-44 h-44 bg-[#9d237a]/10 dark:bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-36 h-36 bg-[#629131]/10 dark:bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 text-xs font-mono text-[#4d7c1b] dark:text-lime-400 uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-4 h-4 text-[#4d7c1b] dark:text-lime-400" />
                  <span className="font-semibold">{t.therapy.protocolBadge || "Women's Physical Rehabilitation Protocol"}</span>
                </div>

                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="text-2xl md:text-3xl font-editorial text-[#1f122b] dark:text-white mb-4"
                >
                  {currentTab.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="text-[#4a3b59] dark:text-slate-200 leading-relaxed text-base md:text-lg mb-8 font-light"
                >
                  {currentTab.desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="p-4 rounded-xl bg-[#9d237a]/8 dark:bg-[#491b5c]/65 border border-[#9d237a]/20 dark:border-fuchsia-400/30 flex items-center gap-3 text-sm text-[#7e1c62] dark:text-fuchsia-200 mb-8 shadow-inner"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#4d7c1b] dark:text-lime-400 shrink-0" />
                  <span className="font-medium">{currentTab.stats}</span>
                </motion.div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#9d237a]/10 dark:border-white/10">
                  <span className="text-xs text-[#6b5c7a] dark:text-slate-300 flex items-center gap-1.5 font-arabic">
                    <Sparkles className="w-3.5 h-3.5 text-[#4d7c1b] dark:text-lime-400" />
                    <span>{t.therapy.suiteNote || "Jeddah Clinic · 100% Private Women's Suites"}</span>
                  </span>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9d237a] dark:text-lime-400 hover:text-[#629131] dark:hover:text-lime-300 transition-colors group cursor-pointer"
                  >
                    <span>{t.bookConsultation}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Frame Note */}
        <motion.div
          variants={slideUp}
          className="mt-16 text-center text-xs font-mono tracking-widest text-[#6b5c7a] dark:text-slate-400 uppercase"
        >
          {t.therapy.frameNote}
        </motion.div>
      </div>
    </motion.section>
  );
}
