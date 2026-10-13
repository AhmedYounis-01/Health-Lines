import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, HeartPulse } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable animation variants
const EXPO_OUT = [0.16, 1, 0.3, 1];

// Split a string into words for staggered animation
function WordSplit({ text, className, delay = 0 }) {
  const words = String(text || '').split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.07,
            duration: 0.65,
            ease: EXPO_OUT,
          }}
          className="inline-block me-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroChapter({ t, onScrollNext }) {
  const sectionRef = useRef(null);

  // Parallax on background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // GSAP atmosphere glow drift
  useEffect(() => {
    const glows = sectionRef.current?.querySelectorAll('.atmosphere-glow');
    if (!glows) return;
    glows.forEach((el, i) => {
      gsap.to(el, {
        x: i % 2 === 0 ? 40 : -40,
        y: i % 2 === 0 ? -30 : 30,
        duration: 12 + i * 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16 px-6"
    >
      {/* Cinematic Physical Therapy Ambient Video Background - 100% Female Clinic */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-hero-clinic.mp4"
        posterSrc="/assets/hero-sanctuary.jpg"
        alt="Health Lines Rehabilitation Sanctuary Suite"
        glowClass="bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.50]"
        contrast="contrast-[1.05]"
        parallaxY={bgY}
      />

      {/* Scrolling content with subtle parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        style={{ y: contentY, opacity }}
      >
        {/* Emblem - Official Brand Logo with Pulsing Glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EXPO_OUT }}
          className="mb-8"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-fuchsia-400/40 bg-white/95 p-3 flex items-center justify-center relative shadow-2xl shadow-fuchsia-500/30 group">
            <span className="absolute inset-0 rounded-full border border-fuchsia-400/50 pulse-ring" />
            <span className="absolute inset-0 rounded-full border border-lime-400/40 pulse-ring" style={{ animationDelay: '0.9s' }} />
            <img
              src="/assets/logo.png"
              alt="Health Lines Logo"
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EXPO_OUT }}
          className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-lime-400 uppercase mb-5"
        >
          {t.hero.eyebrow}
        </motion.p>

        {/* Headline with word-split animation */}
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.15] mb-6 sm:mb-8">
          <WordSplit
            text={t.hero.titlePrefix}
            delay={0.3}
            className="text-white"
          />
          {' '}
          <motion.em
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.55, duration: 0.7, ease: EXPO_OUT }}
            className="italic font-light text-fuchsia-300 not-italic"
            style={{ fontStyle: 'italic' }}
          >
            {t.hero.titleEmphasis}
          </motion.em>
        </h1>

        {/* Illuminated Reading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <ScrollReadingText text={t.hero.readingText} />
        </motion.div>

        {/* Scroll CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(217, 70, 239, 0.6)' }}
          href="#therapy"
          onClick={(e) => {
            if (onScrollNext) {
              e.preventDefault();
              onScrollNext();
            }
          }}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-fuchsia-400/30 bg-[#160d22]/60 hover:bg-[#9d237a]/25 hover:border-lime-400/50 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-slate-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-lime-400" />
          </motion.span>
          <span className="font-arabic font-medium">{t.scrollExplore}</span>
        </motion.a>
      </motion.div>

      {/* Frame Note Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 right-8 rtl:right-auto rtl:left-8 hidden sm:flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-400 uppercase"
      >
        <span className="font-arabic">{t.hero.badge}</span>
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-lime-400"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>JEDDAH</span>
      </motion.div>
    </section>
  );
}
