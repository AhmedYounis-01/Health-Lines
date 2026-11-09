import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, HeartHandshake, ArrowDown } from 'lucide-react';
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

function StatCard({ num, label, idx }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rawNum = parseFloat(String(num).replace(/[^0-9.]/g, ''));
    const suffix = String(num).replace(/^[\d.]+/, '').trim();
    if (isNaN(rawNum)) {
      el.textContent = String(num);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: rawNum,
            duration: 1.8,
            delay: idx * 0.12,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = (Number.isInteger(rawNum) ? Math.round(counter.val) : counter.val.toFixed(1)) + suffix;
            },
          });
        },
      });
    });
    return () => ctx.revert();
  }, [num, idx]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, delay: idx * 0.08, ease: EXPO_OUT },
        },
      }}
      whileHover={{ y: -6, borderColor: 'rgba(217, 70, 239, 0.45)', boxShadow: '0 20px 40px -10px rgba(217,70,239,0.2)' }}
      className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 text-center shadow-xl backdrop-blur-xl"
    >
      <div
        ref={ref}
        className="font-editorial text-3xl md:text-5xl font-light text-lime-400 mb-2 font-mono"
      >
        0
      </div>
      <div className="text-xs font-arabic text-slate-300 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}

export default function AboutChapter({ t, onExploreServices }) {
  const sectionRef = useRef(null);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Chapter 02: About / Sanctuary Interior Video Background */}
      <ChapterVideoBackground
        videoSrc="/videos/hero-ambience.mp4"
        posterSrc="/assets/hero-sanctuary.jpg"
        alt="Health Lines Clinic Interior Jeddah Sanctuary"
        glowClass="bg-[#9d237a]/25"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.45]"
        contrast="contrast-[1.08]"
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-lime-400 uppercase mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />
            <span>{t.sanctuary.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.sanctuary.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: EXPO_OUT }}
              className="italic font-light text-fuchsia-200 inline-block"
            >
              {t.sanctuary.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.sanctuary.readingText} />
        </motion.div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {t.sanctuary.stats.map((st, idx) => (
            <StatCard key={idx} num={st.num} label={st.label} idx={idx} />
          ))}
        </div>

        {/* CTA to explore services */}
        <motion.div variants={slideUp} className="flex justify-center sm:justify-start">
          <a
            href="#departments"
            onClick={(e) => {
              if (onExploreServices) {
                e.preventDefault();
                onExploreServices();
              }
            }}
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#9d237a]/30 via-fuchsia-950/40 to-lime-950/30 border border-fuchsia-400/40 hover:border-lime-400 text-white font-medium text-xs sm:text-sm font-arabic tracking-wide shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <span>{t.langCode === 'العربية' ? 'استكشفي خدماتنا وبرامجنا العلاجية' : 'Explore Our Therapeutic Services'}</span>
            <ArrowDown className="w-4 h-4 text-lime-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

