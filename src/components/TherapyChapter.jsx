import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
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
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO_OUT } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -30 },
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
    tl.fromTo(bgRef.current, { y: '-8%' }, { y: '8%', ease: 'none' });
    return () => tl.kill();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="therapy"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Cinematic Looping Ambient Video Background - Female Physiotherapy */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-therapy-spine.mp4"
        posterSrc="/assets/spine-biomechanics.jpg"
        alt="Physical Therapy Spine & Joint Mobility Assessment"
        glowClass="bg-[#9d237a]/25"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.75]"
        contrast="contrast-[1.05]"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy */}
        <motion.div variants={slideUp} className="max-w-3xl mb-12">
          <p className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-lime-400 uppercase mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-lime-400" />
            <span>{t.therapy.eyebrow}</span>
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {t.therapy.titlePrefix}{' '}
            <em className="italic font-light text-fuchsia-300">{t.therapy.titleEmphasis}</em>
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
                  whileHover={{ x: isActive ? 0 : 4 }}
                  className={`text-left rtl:text-right p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isActive
                      ? 'glass-card border-fuchsia-400/50 bg-[#28133a]/50 shadow-xl shadow-fuchsia-500/15'
                      : 'bg-white/[0.02] border-white/5 hover:border-fuchsia-400/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.span
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      className={`text-xs font-mono font-bold w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? 'bg-gradient-to-tr from-[#9d237a] to-fuchsia-500 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      0{idx + 1}
                    </motion.span>
                    <span className={`text-base font-arabic font-medium tracking-wide ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                      {tab.title}
                    </span>
                  </div>
                  <motion.span
                    animate={isActive ? { scale: 1.4, backgroundColor: '#84cc16' } : { scale: 1 }}
                    className="w-2 h-2 rounded-full bg-transparent"
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
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="glass-card p-8 md:p-10 rounded-3xl border border-fuchsia-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-40 h-40 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 rtl:left-auto rtl:right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-3 text-xs font-mono text-lime-400 uppercase tracking-widest mb-4">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  <span className="font-medium">{t.therapy.protocolBadge || "Women's Physical Rehabilitation Protocol"}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-editorial text-white mb-4">
                  {currentTab.title}
                </h3>

                <p className="text-slate-200 leading-relaxed text-base md:text-lg mb-8 font-light">
                  {currentTab.desc}
                </p>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-4 rounded-xl bg-[#221033]/60 border border-fuchsia-500/30 flex items-center gap-3 text-sm text-fuchsia-200 mb-8"
                >
                  <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0" />
                  <span className="font-medium">{currentTab.stats}</span>
                </motion.div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-slate-400">
                    {t.therapy.suiteNote || "Jeddah Clinic · 100% Private Women's Suites"}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors group cursor-pointer"
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
          className="mt-16 text-center text-xs font-mono tracking-widest text-slate-500 uppercase"
        >
          {t.therapy.frameNote}
        </motion.div>
      </div>
    </motion.section>
  );
}
