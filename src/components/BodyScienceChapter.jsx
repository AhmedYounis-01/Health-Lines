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
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO_OUT } },
};

// Floating particle dots
function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-emerald-400/30"
          style={{
            left: `${10 + (i * 7.5) % 80}%`,
            top: `${20 + (i * 11) % 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + (i % 3) * 2,
            delay: i * 0.3,
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
    tl.fromTo(bgRef.current, { y: '-8%' }, { y: '8%', ease: 'none' });
    return () => tl.kill();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="science"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Cinematic Looping Ambient Video Background */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-body-science.webm"
        posterSrc="/assets/water-nature.jpg"
        alt="Musculoskeletal Palpation Examination & Biomechanics"
        glowClass="bg-emerald-500/15"
        glowSecondaryClass="bg-teal-500/10"
        brightness="brightness-[0.34]"
        contrast="contrast-[1.12]"
      />

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-emerald-300 uppercase mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-300" />
            <span>{t.science.eyebrow}</span>
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {t.science.titlePrefix}{' '}
            <em className="italic font-light text-emerald-200">{t.science.titleEmphasis}</em>
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
                  hidden: { opacity: 0, y: 50, scale: 0.93 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.65, delay: idx * 0.1, ease: EXPO_OUT },
                  },
                }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(52, 211, 153, 0.4)',
                  boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.2)',
                }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Glow reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                <div>
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5"
                  >
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>BIO-BALANCE</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Citations */}
        <motion.div
          variants={slideUp}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400"
        >
          <span>{t.science.sourceNote}</span>
          <div className="flex items-center gap-4 font-mono uppercase text-emerald-400 shrink-0">
            <motion.span
              whileHover={{ x: 4 }}
              className="hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Clinical Quality Guidelines ↗
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
