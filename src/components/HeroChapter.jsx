import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';
import HeroContactDock from './HeroContactDock';
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

export default function HeroChapter({ lang, t, onScrollNext, onOpenBooking }) {
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
        {/* Chapter 01: Hero Video Background */}
        <ChapterVideoBackground
          videoSrc={['/videos/pt-hero-clinic.webm', '/videos/pt-hero-clinic.mp4']}
          posterSrc="/assets/hero-sanctuary.jpg"
          alt="Health Lines Rehabilitation Sanctuary Suite"
          glowClass="bg-[#9d237a]/25 dark:bg-[#9d237a]/35"
          glowSecondaryClass="bg-[#629131]/20 dark:bg-[#84cc16]/25"
          brightness="brightness-[0.92] dark:brightness-[0.65]"
          contrast="contrast-[1.03] dark:contrast-[1.05]"
          parallaxY={bgY}
          priority={true}
        />

      {/* Scrolling content with subtle parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
        style={{ y: contentY, opacity }}
      >
        {/* Animated Contact Us Interactive Hero CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -15, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: EXPO_OUT }}
          className="mb-7"
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
            className="group cursor-pointer inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/85 dark:bg-gradient-to-r dark:from-[#4b1a60]/80 dark:via-[#2c123c]/85 dark:to-[#243722]/80 border border-[#9d237a]/30 dark:border-fuchsia-400/40 hover:border-[#629131] dark:hover:border-lime-400 text-[#1f122b] dark:text-white shadow-[0_10px_30px_rgba(157,35,122,0.16)] dark:shadow-[0_10px_35px_rgba(157,35,122,0.35)] hover:shadow-[0_15px_40px_rgba(98,145,49,0.28)] dark:hover:shadow-[0_15px_45px_rgba(132,204,22,0.45)] backdrop-blur-2xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Shimmer light sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#9d237a]/10 dark:via-white/10 to-transparent pointer-events-none" />

            {/* Pulsing Live Concierge Beacon */}
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#629131] dark:bg-lime-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#629131] dark:bg-lime-400 shadow-[0_0_10px_#629131] dark:shadow-[0_0_10px_#84cc16]" />
            </span>

            {/* Interactive CTA Label */}
            <div className="flex items-center gap-2">
              <span className={`text-xs sm:text-sm font-semibold tracking-wide text-[#1f122b] dark:text-white group-hover:text-[#9d237a] dark:group-hover:text-lime-300 transition-colors ${isAr ? 'font-arabic' : 'font-sans'}`}>
                {t.hero?.contactBadge || (isAr ? 'تواصلِ معنا مباشرة · استشارة فورية 24/7' : 'Contact Our Sanctuary · Instant Consultation 24/7')}
              </span>
            </div>

            {/* Glowing Arrow Pill */}
            <span className="w-6 h-6 rounded-full bg-[#9d237a]/10 dark:bg-white/10 group-hover:bg-[#629131]/15 dark:group-hover:bg-lime-400/20 border border-[#9d237a]/15 dark:border-white/10 group-hover:border-[#629131]/40 dark:group-hover:border-lime-400/40 flex items-center justify-center transition-all duration-300">
              <ArrowDown className="w-3.5 h-3.5 text-[#629131] dark:text-lime-400 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.a>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EXPO_OUT }}
          className="text-xs md:text-sm font-arabic font-semibold tracking-[0.18em] text-[#4d7c1b] dark:text-lime-400 uppercase mb-4 flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#4d7c1b] dark:text-lime-400 animate-pulse" />
          <span>{t.hero.eyebrow}</span>
        </motion.p>

        {/* Headline with word-split animation */}
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-[#1f122b] dark:text-white tracking-tight leading-[1.15] mb-5 sm:mb-7">
          <WordSplit
            text={t.hero.titlePrefix}
            delay={0.25}
            className="text-[#1f122b] dark:text-white"
          />
          {' '}
          <motion.em
            initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.5, duration: 0.7, ease: EXPO_OUT }}
            className="italic font-light text-[#9d237a] dark:text-fuchsia-300 inline-block"
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
          className="max-w-2xl mb-8"
        >
          <ScrollReadingText text={t.hero.readingText} />
        </motion.div>

        {/* Scroll CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          whileHover={{ scale: 1.05, borderColor: 'rgba(157, 35, 122, 0.6)' }}
          href="#about"
          onClick={(e) => {
            if (onScrollNext) {
              e.preventDefault();
              onScrollNext();
            }
          }}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#9d237a]/30 dark:border-fuchsia-400/30 bg-white/80 dark:bg-[#361645]/65 hover:bg-[#9d237a]/10 dark:hover:bg-[#9d237a]/35 hover:border-[#629131]/60 dark:hover:border-lime-400/50 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-[#1f122b] dark:text-slate-100 hover:text-[#9d237a] dark:hover:text-white transition-all duration-300 shadow-md shadow-[#9d237a]/10 dark:shadow-fuchsia-500/15 cursor-pointer"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#629131] dark:text-lime-400" />
          </motion.span>
          <span className="font-arabic font-medium">{t.scrollExplore}</span>
        </motion.a>

        {/* Unified Modern Frosted Glass Contact Dock */}
        <HeroContactDock t={t} lang={lang} onOpenBooking={onOpenBooking} />
      </motion.div>

      {/* Frame Note Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-5 right-8 rtl:right-auto rtl:left-8 hidden md:flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#4a3b59] dark:text-slate-300 uppercase"
      >
        <span className="font-arabic">{t.hero.badge}</span>
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#629131] dark:bg-lime-400"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>JEDDAH</span>
      </motion.div>
    </section>
  );
}
