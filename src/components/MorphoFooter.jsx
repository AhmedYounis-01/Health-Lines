import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EXPO_OUT, staggerChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EXPO_OUT } },
};

export default function MorphoFooter({ t, onOpenBooking }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <motion.footer
      className="relative bg-[#070a0e] text-slate-300 border-t border-white/10 pt-20 pb-12 px-6 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
    >
      {/* Subtle atmosphere glow */}
      <div className="atmosphere-glow w-[600px] h-[300px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-500/8" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Origin and Back to Top Bar */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-12 border-b border-white/10 text-xs font-mono tracking-widest uppercase text-slate-400"
        >
          <div className="flex items-center gap-2">
            <span>{t.footer.origin}</span>
          </div>

          <motion.a
            href="#hero"
            whileHover={{ y: -2, color: '#34d399' }}
            className="flex items-center gap-2 hover:text-emerald-400 transition-colors group"
          >
            <span>{t.footer.backToTop}</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp className="w-4 h-4 text-emerald-400" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Big Signature Headline */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-white/10">
          <motion.div variants={slideUp} className="lg:col-span-7">
            <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] tracking-tight">
              <span>{t.footer.signaturePrefix} </span>
              <em className="italic font-light text-emerald-300">{t.footer.signatureEmphasis}</em>
            </h2>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center"
          >
            <p className="text-slate-400 font-light text-base md:text-lg mb-8 max-w-md lg:text-right rtl:lg:text-left">
              {t.footer.invitation}
            </p>
            <motion.button
              type="button"
              onClick={onOpenBooking}
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -10px rgba(16,185,129,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-xl shadow-emerald-500/20 relative overflow-hidden group"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{t.bookConsultation}</span>
              <ArrowUpRight className="w-5 h-5 text-black relative z-10" />
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation & Newsletter Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10">
          {/* Quick Links */}
          <motion.div variants={slideUp} className="md:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 block mb-6">
              EXPLORE THE SANCTUARY
            </span>
            <nav className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm font-medium">
              {t.footer.links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  whileHover={{ x: 4, color: '#6ee7b7' }}
                  className="text-slate-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 group"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div variants={slideUp} className="md:col-span-7 lg:pl-12 rtl:lg:pl-0 rtl:lg:pr-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
              HEALTH LINES JOURNAL
            </span>
            <h3 className="text-2xl font-editorial text-white mb-2">
              {t.footer.journalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light mb-6">
              {t.footer.journalSub}
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="flex items-center rounded-xl glass-card border border-white/10 p-1.5 focus-within:border-emerald-400/50 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="bg-transparent px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none w-full"
                />
                <motion.button
                  type="submit"
                  whileHover={{ backgroundColor: 'rgba(52,211,153,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-xs uppercase tracking-wider shrink-0 transition-colors flex items-center gap-1.5"
                >
                  <span>{subscribed ? '✓' : t.footer.subscribe}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </motion.button>
              </div>
            </form>

            <div className="flex items-center gap-4 mt-6">
              {[
                { href: 'https://www.instagram.com/healthlinescenter/', icon: InstagramIcon, label: 'Instagram' },
                { href: 'https://wa.me/966599530955', icon: MessageSquare, label: 'WhatsApp' },
                { href: 'tel:0126918000', icon: Phone, label: 'Call Center' },
              ].map(({ href, icon: Icon, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: EXPO_OUT }}
                  whileHover={{ scale: 1.1, borderColor: 'rgba(52,211,153,0.4)', color: '#fff' }}
                  className="w-10 h-10 rounded-full glass-card border border-white/10 flex items-center justify-center text-slate-300 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Legal & Credentials */}
        <motion.div
          variants={slideUp}
          className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500"
        >
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-6">
            <span>{t.footer.license}</span>
            <motion.span whileHover={{ color: '#94a3b8' }} className="cursor-pointer transition-colors">
              {t.footer.privacy}
            </motion.span>
            <motion.span whileHover={{ color: '#94a3b8' }} className="cursor-pointer transition-colors">
              {t.footer.terms}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
