import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, HeartHandshake, Sparkles, Feather } from 'lucide-react';
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

export default function LymphaticChapter({ t }) {
  const icons = [Droplets, HeartHandshake, Sparkles, Feather];
  const bgRef = useRef(null);
  const sectionRef = useRef(null);
  const waveRef = useRef(null);

  // GSAP Parallax background
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

  // GSAP wave animation
  useEffect(() => {
    if (!waveRef.current) return;
    gsap.to(waveRef.current, {
      x: '-50%',
      duration: 18,
      repeat: -1,
      ease: 'none',
    });
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      id="lymphatic"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Cinematic Looping Ambient Video Background */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-lymphatic-drainage.mp4"
        posterSrc="/assets/lymphatic-massage.jpg"
        alt="Tranquil Lymphatic Drainage Manual Therapy Suite"
        glowClass="bg-[#9d237a]/25"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.75]"
        contrast="contrast-[1.05]"
      />

      {/* Animated gentle wave overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-10 pointer-events-none z-0">
        <div
          ref={waveRef}
          className="absolute bottom-0 flex"
          style={{ width: '200%' }}
        >
          <svg viewBox="0 0 1440 80" className="w-1/2 fill-[#9d237a]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
          <svg viewBox="0 0 1440 80" className="w-1/2 fill-[#84cc16]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-fuchsia-300 uppercase mb-4 flex items-center gap-2">
            <Droplets className="w-4 h-4 text-fuchsia-300" />
            <span>{t.lymphatic.eyebrow}</span>
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {t.lymphatic.titlePrefix}{' '}
            <em className="italic font-light text-fuchsia-200">{t.lymphatic.titleEmphasis}</em>
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
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.65, delay: idx * 0.12, ease: EXPO_OUT },
                  },
                }}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(217, 70, 239, 0.4)',
                  boxShadow: '0 25px 50px -10px rgba(217,70,239,0.15)',
                }}
                transition={{ duration: 0.3 }}
                className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9d237a]/0 to-transparent group-hover:from-[#9d237a]/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-12 h-12 rounded-2xl bg-[#9d237a]/20 border border-[#9d237a]/40 flex items-center justify-center text-fuchsia-300 mb-6"
                >
                  <IconComponent className="w-6 h-6" />
                </motion.div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-medium text-white group-hover:text-fuchsia-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-mono text-[#84cc16]">0{idx + 1}</span>
                </div>

                <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed">
                  {pillar.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Healing Quote Callout */}
        <motion.div
          variants={slideUp}
          className="mt-14 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#9d237a]/20 via-[#629131]/15 to-[#9d237a]/20 border border-[#9d237a]/30 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.08)_0%,transparent_70%)]" />
          <motion.p
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EXPO_OUT }}
            className="font-editorial text-xl md:text-2xl italic text-slate-200 max-w-3xl mx-auto relative z-10 leading-relaxed"
          >
            {t.lymphatic.quote || '"When the lymph moves freely, inflammation dissipates and true cellular regeneration begins."'}
          </motion.p>
          <span className="block text-xs font-mono text-[#84cc16] mt-3 tracking-widest uppercase relative z-10">
            {t.lymphatic.quoteAuthor || 'Health Lines Clinical Philosophy · Jeddah'}
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
