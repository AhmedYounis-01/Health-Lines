import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
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

export default function HeroChapter({ lang, t, onScrollNext }) {
  const sectionRef = useRef(null);
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  // Parallax on background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // GSAP atmosphere glow drift
  useEffect(() => {
    const glows = sectionRef.current?.querySelectorAll('.atmosphere-glow');
    if (!glows) return;
    glows.forEach((el, i) => {
      gsap.to(el, {
        x: i % 2 === 0 ? 30 : -30,
        y: i % 2 === 0 ? -25 : 25,
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
      {/* Chapter 01: Hero Video Background (1 of only 2 videos on the site) */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-hero-clinic.mp4"
        posterSrc="/assets/hero-sanctuary.jpg"
        alt="Health Lines Rehabilitation Sanctuary Suite"
        glowClass="bg-[#9d237a]/30"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.55]"
        contrast="contrast-[1.05]"
        parallaxY={bgY}
        isPriority={true}
      />

      {/* Scrolling content with subtle parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        style={{ y: contentY, opacity }}
      >
        {/* Animated Contact Us Interactive Hero CTA (Replaces Center Logo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EXPO_OUT }}
          className="mb-8"
        >
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact') || document.getElementById('sanctuary');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group cursor-pointer inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-fuchsia-950/70 via-[#150f24]/85 to-emerald-950/70 border border-fuchsia-400/40 hover:border-lime-400 text-white shadow-[0_10px_35px_rgba(157,35,122,0.35)] hover:shadow-[0_15px_45px_rgba(132,204,22,0.5)] backdrop-blur-2xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Shimmer light sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Pulsing Live Concierge Beacon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400 shadow-[0_0_10px_#84cc16]" />
            </span>

            {/* Interactive CTA Label */}
            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-lime-300 transition-colors ${isAr ? 'font-arabic' : 'font-sans'}`}>
                {t.hero?.contactBadge || (isAr ? 'تواصلِ معنا مباشرة · استشارة فورية 24/7' : 'Contact Our Sanctuary · Instant Consultation 24/7')}
              </span>
            </div>

            {/* Glowing Arrow Pill */}
            <span className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-lime-400/20 border border-white/10 group-hover:border-lime-400/40 flex items-center justify-center transition-all duration-300">
              <ArrowDown className="w-3.5 h-3.5 text-lime-400 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.a>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EXPO_OUT }}
          className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-lime-400 uppercase mb-5 flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span>{t.hero.eyebrow}</span>
        </motion.p>

        {/* Headline with word-split animation */}
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.15] mb-6 sm:mb-8">
          <WordSplit
            text={t.hero.titlePrefix}
            delay={0.25}
            className="text-white"
          />
          {' '}
          <motion.em
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 0.7, ease: EXPO_OUT }}
            className="italic font-light text-fuchsia-300 inline-block"
            style={{ fontStyle: 'italic' }}
          >
            {t.hero.titleEmphasis}
          </motion.em>
        </h1>

        {/* Illuminated Reading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="max-w-2xl mb-12"
        >
          <ScrollReadingText text={t.hero.readingText} />
        </motion.div>

        {/* Scroll CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(217, 70, 239, 0.6)' }}
          href="#about"
          onClick={(e) => {
            if (onScrollNext) {
              e.preventDefault();
              onScrollNext();
            }
          }}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-fuchsia-400/30 bg-[#160d22]/60 hover:bg-[#9d237a]/25 hover:border-lime-400/50 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-slate-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/20 cursor-pointer"
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
        transition={{ delay: 1, duration: 0.8 }}
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
