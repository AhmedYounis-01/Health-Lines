import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Zap } from 'lucide-react';
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

// Counter that animates smoothly to target value when in view
function AnimatedCounter({ value, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const valStr = String(value).trim();

    // Range like "700-2000"
    if (valStr.includes('-')) {
      const parts = valStr.split('-').map((s) => s.trim());
      const min = parseFloat(parts[0].replace(/[^0-9.]/g, ''));
      const max = parseFloat(parts[1].replace(/[^0-9.]/g, ''));

      if (!isNaN(min) && !isNaN(max)) {
        const ctx = gsap.context(() => {
          const counter = { val1: 0, val2: 0 };
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(counter, {
                val1: min,
                val2: max,
                duration: 1.8,
                delay,
                ease: 'power3.out',
                onUpdate: () => {
                  el.textContent = `${Math.round(counter.val1)} - ${Math.round(counter.val2)}`;
                },
              });
            },
          });
        });
        return () => ctx.revert();
      }
    }

    // Single number
    const num = parseFloat(valStr.replace(/[^0-9.]/g, ''));
    const prefix = valStr.replace(/[0-9.]/g, '').replace(/\d/g, '').trim();
    if (isNaN(num)) {
      el.textContent = valStr;
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
            val: num,
            duration: 1.8,
            delay,
            ease: 'power3.out',
            onUpdate: () => {
              el.textContent = (Number.isInteger(num) ? Math.round(counter.val) : counter.val.toFixed(1)) + prefix;
            },
          });
        },
      });
    });
    return () => ctx.revert();
  }, [value, delay]);

  return (
    <span ref={ref} className={className || "font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight"}>
      0
    </span>
  );
}

export default function VelaShapeChapter({ t, onOpenBooking }) {
  const [activeArea, setActiveArea] = useState('waist');
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  const bodyAreas = t.velashape.areas || [
    { id: 'waist', label: 'Abdomen & Flanks', est: '2.5 - 4 cm avg. reduction' },
    { id: 'thighs', label: 'Thighs & Cellulite', est: 'Deep skin smoothing' },
    { id: 'arms', label: 'Upper Arms Firming', est: 'Targeted skin tightening' },
  ];

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
      id="velashape"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* High-Performance Atmospheric Image Background — Female Specialist Body Contouring */}
      <ChapterVideoBackground
        posterSrc="/assets/velashape-female-contour.jpg"
        alt="Female Specialist Administering VelaShape III Body Contouring in Private Suite"
        glowClass="bg-[#9d237a]/25"
        glowSecondaryClass="bg-[#84cc16]/20"
        brightness="brightness-[0.70]"
        contrast="contrast-[1.08]"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header Copy with animated text reveal */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EXPO_OUT }}
            className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-fuchsia-300 uppercase mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-fuchsia-300 animate-pulse" />
            <span>{t.velashape.eyebrow}</span>
          </motion.p>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.14] mb-6">
            <motion.span
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EXPO_OUT }}
              className="inline-block"
            >
              {t.velashape.titlePrefix}{' '}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.12, ease: EXPO_OUT }}
              className="italic font-light text-fuchsia-200 inline-block"
            >
              {t.velashape.titleEmphasis}
            </motion.em>
          </h2>

          <ScrollReadingText text={t.velashape.readingText} />
        </motion.div>

        {/* Technical Data Cards with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12">
          {t.velashape.specs.map((item, idx) => {
            const isRange = String(item.value).includes('-') || String(item.value).length > 4;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, delay: idx * 0.08, ease: EXPO_OUT },
                  },
                }}
                whileHover={{ y: -6, borderColor: 'rgba(217, 70, 239, 0.45)', boxShadow: '0 20px 40px -10px rgba(217,70,239,0.2)' }}
                transition={{ duration: 0.25 }}
                className="glass-card p-4 sm:p-5 md:p-6 rounded-2xl border border-white/10 flex flex-col justify-between group overflow-hidden shadow-lg backdrop-blur-xl"
              >
                <div className="mb-4 sm:mb-6">
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1 truncate">
                    {item.detail}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-fuchsia-200 transition-colors line-clamp-1 font-arabic">
                    {item.name}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 flex-wrap">
                  <AnimatedCounter
                    value={item.value}
                    delay={idx * 0.12}
                    className={`font-editorial font-light text-white tracking-tight leading-none ${
                      isRange
                        ? 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal'
                        : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-mono text-lime-400 font-semibold mt-1 sm:mt-0 whitespace-nowrap">
                    {item.unit}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Target Area Interactive Selector */}
        <motion.div variants={slideUp} className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 mb-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-lime-400" />
              <span>{t.velashape.targetZonesTitle || 'TARGET CLINICAL ZONES'}</span>
            </span>
            <span className="text-xs font-mono text-lime-400 font-medium">
              {t.velashape.targetZonesSubtitle || '0% Surgical Incision · Immediate Normal Routine'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bodyAreas.map((area) => {
              const isActive = activeArea === area.id;
              return (
                <motion.button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveArea(area.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl text-left rtl:text-right border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#9d237a]/35 border-[#d946ef]/65 text-white shadow-lg shadow-fuchsia-500/20'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                  }`}
                >
                  <p className="font-semibold text-sm text-white mb-1 font-arabic">{area.label}</p>
                  <p className="text-xs font-mono text-lime-400">{area.est}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Note & CTA */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400 font-arabic"
        >
          <p className="font-light text-center sm:text-left rtl:sm:text-right leading-relaxed">
            {t.velashape.note}
          </p>
          <motion.button
            type="button"
            onClick={onOpenBooking}
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1.5 text-lime-400 hover:text-lime-300 font-mono uppercase tracking-wider shrink-0 cursor-pointer font-bold"
          >
            <span>{t.bookConsultation}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
