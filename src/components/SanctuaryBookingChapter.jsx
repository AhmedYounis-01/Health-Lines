import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Calendar, ShieldCheck, Clock, ArrowUpRight } from 'lucide-react';
import ScrollReadingText from './ScrollReadingWord';
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

// Animated stat counter
function StatCard({ num, label, idx }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rawNum = parseFloat(String(num).replace(/[^0-9.]/g, ''));
    const suffix = String(num).replace(/^[\d.]+/, '').trim();
    if (isNaN(rawNum)) return;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            val: rawNum,
            duration: 2,
            delay: idx * 0.15,
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
          transition: { duration: 0.6, delay: idx * 0.1, ease: EXPO_OUT },
        },
      }}
      whileHover={{ y: -6, borderColor: 'rgba(217, 70, 239, 0.4)', boxShadow: '0 20px 40px -10px rgba(217,70,239,0.15)' }}
      className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 text-center"
    >
      <div
        ref={ref}
        className="font-editorial text-3xl md:text-5xl font-light text-[#84cc16] mb-2"
      >
        0
      </div>
      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

export default function SanctuaryBookingChapter({ t, onOpenBooking }) {
  const bgRef = useRef(null);
  const sectionRef = useRef(null);

  const whatsappUrl = `https://wa.me/966599530955?text=${encodeURIComponent(
    'السلام عليكم، أود الاستفسار وحجز موعد استشارة في مركز خطوط الصحة للعلاج الطبيعي ونحت القوام.'
  )}`;

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
      id="sanctuary"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-[-10%]">
          <img
            src="/assets/hero-sanctuary.jpg"
            alt="Health Lines Clinic Interior Jeddah"
            className="w-full h-full object-cover object-center brightness-[0.25] contrast-[1.1]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0912] via-[#0c0912]/90 to-[#0c0912]" />
        <div className="atmosphere-glow w-[550px] h-[550px] bottom-0 left-1/4 bg-[#9d237a]/15" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header copy */}
        <motion.div variants={slideUp} className="max-w-3xl mb-14">
          <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#84cc16] uppercase mb-4 flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-4 h-4 text-[#84cc16]" />
            </motion.span>
            <span>{t.sanctuary.eyebrow}</span>
          </p>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-6">
            {t.sanctuary.titlePrefix}{' '}
            <em className="italic font-light text-fuchsia-200">{t.sanctuary.titleEmphasis}</em>
          </h2>
          <ScrollReadingText text={t.sanctuary.readingText} />
        </motion.div>

        {/* Animated Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {t.sanctuary.stats.map((st, idx) => (
            <StatCard key={idx} num={st.num} label={st.label} idx={idx} />
          ))}
        </div>

        {/* Location & Quick Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address Details */}
          <motion.div
            variants={slideUp}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#84cc16] uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.sanctuary.addressTitle}</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl text-white mb-4">
                {t.siteTitle}
              </h3>
              <p className="text-slate-300 leading-relaxed text-base mb-6 font-light">
                {t.sanctuary.addressText}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 mb-8">
                <a
                  href="https://maps.app.goo.gl/o9go6Z1e452RcqRh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-[#84cc16]/40 hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>{t.sanctuary.mapLinkText || 'عرض على خرائط جوجل ↗'}</span>
                </a>
                <motion.span
                  whileHover={{ scale: 1.03, borderColor: 'rgba(132,204,22,0.4)' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
                >
                  <Clock className="w-3.5 h-3.5 text-[#84cc16]" />
                  <span>{t.sanctuary.hours || 'Sat - Thu: 9:00 AM – 9:00 PM'}</span>
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.03, borderColor: 'rgba(217,70,239,0.4)' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>{t.sanctuary.privacyBadge || '100% Private Female Suites'}</span>
                </motion.span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px -10px rgba(132,204,22,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#84cc16] hover:bg-lime-400 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-lg shadow-lime-500/20"
              >
                <MessageSquare className="w-4 h-4 text-black" />
                <span>{t.sanctuary.quickActionWhatsApp}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://maps.app.goo.gl/o9go6Z1e452RcqRh8"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, borderColor: 'rgba(217,70,239,0.5)' }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-fuchsia-400/30 hover:border-fuchsia-400 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <MapPin className="w-4 h-4 text-fuchsia-400" />
                <span>{t.sanctuary.googleMapsBtn || 'خرائط جوجل'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href="tel:0126918000"
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-white/10 hover:border-white/20 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#84cc16]" />
                <span>{t.sanctuary.phone}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30, scale: 0.97 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: EXPO_OUT, delay: 0.2 } },
            }}
            className="lg:col-span-5 glass-card p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between bg-gradient-to-br from-[#9d237a]/25 via-[#181124]/70 to-[#0c0912] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-48 h-48 bg-[#9d237a]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-fuchsia-300 block mb-2">
                {t.sanctuary.cardEyebrow || 'PERSONALIZED CONSULTATION'}
              </span>
              <h3 className="text-2xl font-editorial text-white mb-3">
                {t.sanctuary.cardTitle || 'Begin Your Healing Journey'}
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                {t.sanctuary.cardDesc || 'Receive a comprehensive biomechanical evaluation and personalized rehabilitation or body sculpting roadmap with our lead specialists.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <motion.button
                type="button"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.03, boxShadow: '0 25px 50px -10px rgba(157,35,122,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#84cc16] hover:from-[#b02a8a] hover:to-lime-400 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-fuchsia-500/25 relative overflow-hidden group"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calendar className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{t.bookConsultation}</span>
              </motion.button>
              <p className="text-center text-[11px] font-mono text-slate-500">
                {t.sanctuary.cardNotice || 'Direct WhatsApp confirmation · No advance payment needed'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
