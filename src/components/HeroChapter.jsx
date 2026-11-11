import React, { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
import ChapterVideoBackground from './ChapterVideoBackground';
import HeroContactDock from './HeroContactDock';
import { useDeviceProfile } from '../hooks/useDeviceProfile';

// Reusable animation variants (GPU-composited opacity + transform only)
const EXPO_OUT = [0.16, 1, 0.3, 1];

// Split a string into words for staggered animation
function WordSplit({ text, className, delay = 0, instantMobile = false }) {
  if (instantMobile) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EXPO_OUT }}
        className={className}
      >
        {text}
      </motion.span>
    );
  }

  const words = String(text || '').split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
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

function HeroChapter({ lang, t, onScrollNext, onOpenBooking }) {
  const sectionRef = useRef(null);
  const { isMobile, isWeakOrSaveData } = useDeviceProfile();
  const useStaticMobile = isMobile || isWeakOrSaveData;
  const isAr = lang === 'ar' || t.langCode === 'العربية';

  // Parallax on desktop only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20 pb-20 sm:pb-16 px-4 sm:px-6"
    >
      {/* Chapter 01: Hero Video Background */}
      <ChapterVideoBackground
        videoSrc={['/videos/pt-hero-clinic.webm', '/videos/pt-hero-clinic.mp4']}
        posterSrc="/assets/hero-sanctuary.jpg"
        alt="Health Lines Rehabilitation Sanctuary Suite"
        glowClass="bg-[#9d237a]/22 dark:bg-[#9d237a]/35"
        glowSecondaryClass="bg-[#629131]/18 dark:bg-[#84cc16]/25"
        brightness="brightness-[1.04] saturate-[0.94] dark:brightness-[0.65] dark:saturate-100"
        contrast="contrast-[1.02] dark:contrast-[1.05]"
        parallaxY={useStaticMobile ? null : bgY}
        priority={true}
      />

      {/* Scrolling content with subtle parallax on desktop */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center w-full"
        style={useStaticMobile ? undefined : { y: contentY, opacity }}
      >
        {/* Animated Contact Us Interactive Hero CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          className="mb-4 sm:mb-7"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('contact') || document.getElementById('sanctuary');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="animate-float-gentle group cursor-pointer inline-flex items-center gap-2.5 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-white/55 hover:bg-white/75 dark:bg-gradient-to-r dark:from-[#4b1a60]/85 dark:via-[#2c123c]/88 dark:to-[#243722]/85 border border-[#9d237a]/30 dark:border-fuchsia-400/40 hover:border-[#629131] dark:hover:border-lime-400 text-[#170a24] dark:text-white shadow-[0_10px_30px_rgba(157,35,122,0.16)] dark:shadow-[0_10px_35px_rgba(157,35,122,0.35)] md:backdrop-blur-2xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Shimmer light sweep on hover */}
            <span className="hidden md:block absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#9d237a]/10 dark:via-white/10 to-transparent pointer-events-none" />

            {/* Pulsing Live Concierge Beacon */}
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
              <span className="hidden md:inline-flex animate-ping absolute h-full w-full rounded-full bg-[#629131] dark:bg-lime-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#4d7c1b] dark:bg-lime-400 shadow-[0_0_8px_#629131] dark:shadow-[0_0_10px_#84cc16]" />
            </span>

            {/* Interactive CTA Label */}
            <span className={`text-[11px] sm:text-sm font-semibold tracking-wide text-[#170a24] dark:text-white group-hover:text-[#861365] dark:group-hover:text-lime-300 transition-colors ${isAr ? 'font-arabic' : 'font-sans'}`}>
              {t.hero?.contactBadge || (isAr ? 'تواصلِ معنا مباشرة · استشارة فورية 24/7' : 'Contact Our Sanctuary · Instant Consultation 24/7')}
            </span>

            {/* Glowing Arrow Pill */}
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9d237a]/12 dark:bg-white/10 group-hover:bg-[#629131]/15 dark:group-hover:bg-lime-400/20 border border-[#9d237a]/20 dark:border-white/10 group-hover:border-[#629131]/40 dark:group-hover:border-lime-400/40 flex items-center justify-center transition-all duration-300 shrink-0">
              <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#355e0d] dark:text-lime-400 group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EXPO_OUT }}
          className={`text-[11px] sm:text-xs md:text-sm font-semibold text-[#355e0d] dark:text-lime-400 mb-3 sm:mb-4 flex items-center justify-center gap-2 max-w-xl leading-relaxed px-3.5 py-1 rounded-full bg-white/48 border border-[#629131]/22 backdrop-blur-md shadow-sm dark:bg-transparent dark:border-transparent dark:px-0 dark:py-0 dark:shadow-none ${
            isAr ? 'font-arabic' : 'uppercase tracking-[0.18em]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#355e0d] dark:text-lime-400" />
          <span>{t.hero.eyebrow}</span>
        </motion.p>

        {/* Headline with word-split animation */}
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-normal text-[#170a24] dark:text-white tracking-tight leading-[1.18] mb-4 sm:mb-7 light-scrim-text">
          <WordSplit
            text={t.hero.titlePrefix}
            delay={0.2}
            instantMobile={useStaticMobile}
            className="text-[#170a24] dark:text-white"
          />
          {' '}
          <motion.em
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: useStaticMobile ? 0.1 : 0.4, duration: 0.55, ease: EXPO_OUT }}
            className="italic font-normal dark:font-light text-[#861365] dark:text-fuchsia-300 inline-block"
            style={{ fontStyle: 'italic' }}
          >
            {t.hero.titleEmphasis}
          </motion.em>
        </h1>

        {/* Illuminated Reading Text */}
        <div className="max-w-2xl mb-5 sm:mb-8 px-1">
          <ScrollReadingText text={t.hero.readingText} />
        </div>

        {/* Scroll CTA */}
        <motion.a
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: useStaticMobile ? 0.15 : 0.6 }}
          href="#about"
          onClick={(e) => {
            if (onScrollNext) {
              e.preventDefault();
              onScrollNext();
            }
          }}
          className="group inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[#9d237a]/30 dark:border-fuchsia-400/30 bg-white/52 dark:bg-[#361645]/75 hover:bg-white/75 dark:hover:bg-[#9d237a]/35 hover:border-[#629131]/60 dark:hover:border-lime-400/50 md:backdrop-blur-md text-xs font-medium text-[#170a24] dark:text-slate-100 hover:text-[#861365] dark:hover:text-white transition-all duration-300 shadow-md shadow-[#9d237a]/10 dark:shadow-fuchsia-500/15 cursor-pointer"
        >
          <ArrowDown className="w-4 h-4 text-[#355e0d] dark:text-lime-400 group-hover:translate-y-0.5 transition-transform" />
          <span className={isAr ? 'font-arabic font-medium' : 'font-mono tracking-wider uppercase'}>{t.scrollExplore}</span>
        </motion.a>

        {/* Unified Modern Frosted Glass Contact Dock */}
        <HeroContactDock t={t} lang={lang} onOpenBooking={onOpenBooking} />

        {/* Subtle Jeddah Badge centered cleanly on desktop/tablet */}
        <div className="hidden md:flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest text-[#2e1f3f] dark:text-slate-300 uppercase mt-5 px-4 py-1.5 rounded-full bg-white/48 border border-[#9d237a]/18 backdrop-blur-md dark:bg-transparent dark:border-transparent dark:px-0 dark:py-0">
          <span className="font-arabic">{t.hero.badge}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#355e0d] dark:bg-lime-400" />
          <span>JEDDAH</span>
        </div>
      </motion.div>
    </section>
  );
}

export default memo(HeroChapter);
