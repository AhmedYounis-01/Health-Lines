import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Calendar, ShieldCheck, Clock, ArrowUpRight } from 'lucide-react';

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

export default function ContactChapter({ t, onOpenBooking }) {
  const isAr = typeof document !== 'undefined' && (document.documentElement.lang === 'ar' || !document.documentElement.lang);
  const whatsappUrl = `https://wa.me/966599530955?text=${encodeURIComponent(
    isAr
      ? 'السلام عليكم، أود الاستفسار وحجز موعد استشارة في مركز خطوط الصحة للعلاج الطبيعي ونحت القوام.'
      : 'Hello, I would like to inquire and schedule a consultation at Health Lines Center.'
  )}`;

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 px-6 border-t border-white/5 bg-[#09070f]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Atmosphere Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#9d237a]/15 via-fuchsia-950/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#84cc16]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div variants={slideUp} className="max-w-3xl mb-12 text-center sm:text-start">
          <p className="text-xs md:text-sm font-arabic font-medium tracking-[0.2em] text-lime-400 uppercase mb-3 flex items-center gap-2 justify-center sm:justify-start">
            <MapPin className="w-4 h-4 text-lime-400 animate-pulse" />
            <span>{isAr ? 'تواصلِ معنا · مقرنا في جدة' : 'CONTACT US · JEDDAH SANCTUARY'}</span>
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
            {isAr ? 'مقرنا في قلب جدة، ' : 'Our Sanctuary in Jeddah, '}
            <span className="italic font-light text-fuchsia-200">
              {isAr ? 'دائمًا بالقرب منكِ وبأعلى درجات الخصوصية.' : 'Always Near You With Utmost Discretion.'}
            </span>
          </h2>
        </motion.div>

        {/* Location & Quick Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address Details Card */}
          <motion.div
            variants={slideUp}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between shadow-2xl backdrop-blur-xl bg-black/40"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-lime-400 uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium">{t.sanctuary.addressTitle}</span>
              </div>
              <h3 className="font-editorial text-2xl md:text-3xl text-white mb-4">
                {t.siteTitle}
              </h3>
              <p className="text-slate-200 leading-relaxed text-base mb-6 font-light font-arabic">
                {t.sanctuary.addressText}
              </p>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 mb-8 font-arabic">
                <a
                  href="https://maps.app.goo.gl/o9go6Z1e452RcqRh8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-lime-400/50 hover:text-white transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5 text-lime-400" />
                  <span>{t.sanctuary.mapLinkText || 'عرض على خرائط جوجل ↗'}</span>
                </a>
                <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-lime-400" />
                  <span>{t.sanctuary.hours || 'Sat - Thu: 9:00 AM – 9:00 PM'}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-400" />
                  <span>{t.sanctuary.privacyBadge || '100% Private Female Suites'}</span>
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px -10px rgba(132,204,22,0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-200 shadow-lg shadow-lime-500/20 cursor-pointer"
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-fuchsia-400/30 hover:border-fuchsia-400 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-fuchsia-400" />
                <span>{t.sanctuary.googleMapsBtn || 'خرائط جوجل'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href="tel:0126918000"
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card border border-white/10 hover:border-white/20 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-lime-400" />
                <span>{t.sanctuary.phone}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 25, scale: 0.97 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: EXPO_OUT, delay: 0.15 } },
            }}
            className="lg:col-span-5 glass-card p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between bg-gradient-to-br from-[#9d237a]/30 via-[#181124]/80 to-[#0c0912] relative overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-48 h-48 bg-[#9d237a]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-fuchsia-300 block mb-2 font-medium">
                {t.sanctuary.cardEyebrow || 'PERSONALIZED CONSULTATION'}
              </span>
              <h3 className="text-2xl font-editorial text-white mb-3">
                {t.sanctuary.cardTitle || 'Begin Your Healing Journey'}
              </h3>
              <p className="text-sm text-slate-200 font-light leading-relaxed mb-6 font-arabic">
                {t.sanctuary.cardDesc || 'Receive a comprehensive biomechanical evaluation and personalized rehabilitation or body sculpting roadmap with our lead specialists.'}
              </p>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <motion.button
                type="button"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.03, boxShadow: '0 25px 50px -10px rgba(157,35,122,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9d237a] via-fuchsia-600 to-[#84cc16] hover:brightness-110 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-fuchsia-500/25 relative overflow-hidden group cursor-pointer"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Calendar className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{t.bookConsultation}</span>
              </motion.button>
              <p className="text-center text-[11px] font-mono text-slate-400 font-arabic">
                {t.sanctuary.cardNotice || 'Direct WhatsApp confirmation · No advance payment needed'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

