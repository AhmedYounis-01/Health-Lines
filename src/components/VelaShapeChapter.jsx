import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
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

// Counter that animates to a target value when in view
function AnimatedCounter({ value, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Parse numeric prefix
    const num = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    const prefix = String(value).replace(/[0-9.]/g, '').replace(/\d/g, '').trim();
    if (isNaN(num)) return;

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
    <span ref={ref} className="font-editorial text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-tight">
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
    tl.fromTo(bgRef.current, { y: '-8%' }, { y: '8%', ease: 'none' });
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
      {/* Cinematic Looping Ambient Video Background */}
      <ChapterVideoBackground
        videoSrc="/videos/pt-velashape-contour.webm"
        posterSrc="/assets/velashape-tech.jpg"
        alt="VelaShape III Medical Device Suite & Vibration Dynamics"
        glowClass="bg-amber-500/15"
        glowSecondaryClass="bg-emerald-500/10"
        brightness="brightness-[0.35]"
        contrast="contrast-[1.15]"
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Header Copy */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-amber-300 uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{t.velashape.eyebrow}</span>
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {t.velashape.titlePrefix}{' '}
            <em className="italic font-light text-amber-200">{t.velashape.titleEmphasis}</em>
          </h2>
          <ScrollReadingText text={t.velashape.readingText} />
        </motion.div>

        {/* Technical Data Cards with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {t.velashape.specs.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, delay: idx * 0.1, ease: EXPO_OUT },
                },
              }}
              whileHover={{ y: -6, borderColor: 'rgba(251, 191, 36, 0.4)', boxShadow: '0 20px 40px -10px rgba(251,191,36,0.15)' }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-between group"
            >
              <div className="mb-6">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  {item.detail}
                </span>
                <span className="text-sm font-semibold text-white group-hover:text-amber-200 transition-colors">
                  {item.name}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={item.value} delay={idx * 0.15} />
                <span className="text-xs font-mono text-amber-300">
                  {item.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Target Area Interactive Selector */}
        <motion.div variants={slideUp} className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {t.velashape.targetZonesTitle || 'TARGET CLINICAL ZONES'}
            </span>
            <span className="text-xs font-mono text-emerald-400">
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
                  className={`p-4 rounded-xl text-left rtl:text-right border transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-950/30 border-amber-400/40 text-white shadow-lg shadow-amber-500/10'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/15 hover:text-slate-200'
                  }`}
                >
                  <p className="font-medium text-sm text-white mb-1">{area.label}</p>
                  <p className="text-xs font-mono text-amber-300">{area.est}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Note & CTA */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-slate-400"
        >
          <p className="font-light text-center sm:text-left rtl:sm:text-right">
            {t.velashape.note}
          </p>
          <motion.button
            type="button"
            onClick={onOpenBooking}
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono uppercase tracking-wider shrink-0"
          >
            <span>{t.bookConsultation}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
