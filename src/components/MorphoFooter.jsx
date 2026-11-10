import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, ArrowRight, Phone, MessageSquare, MapPin } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config/siteConfig';

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
      className="relative theme-footer-bg text-[#4a3b59] dark:text-slate-200 border-t border-[#9d237a]/15 dark:border-white/10 pt-20 pb-12 px-6 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
    >
      {/* Subtle atmosphere glow */}
      <div className="atmosphere-glow w-[600px] h-[300px] bottom-0 left-1/2 -translate-x-1/2 bg-[#9d237a]/12 dark:bg-[#9d237a]/20" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Origin and Back to Top Bar */}
        <motion.div
          variants={slideUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-12 border-b border-[#9d237a]/10 dark:border-white/10 text-xs font-mono tracking-widest uppercase text-[#6b5c7a] dark:text-slate-300"
        >
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="Health Lines Logo" className="w-6 h-6 object-contain rounded-full bg-white p-0.5" />
            <span>{t.footer.origin}</span>
          </div>

          <motion.a
            href="#hero"
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 hover:text-[#9d237a] dark:hover:text-[#84cc16] transition-colors group"
          >
            <span>{t.footer.backToTop}</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp className="w-4 h-4 text-[#629131] dark:text-[#84cc16]" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Big Signature Headline */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-[#9d237a]/10 dark:border-white/10">
          <motion.div variants={slideUp} className="lg:col-span-7">
            <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1f122b] dark:text-white font-normal leading-[1.05] tracking-tight">
              <span>{t.footer.signaturePrefix} </span>
              <em className="italic font-light text-[#9d237a] dark:text-fuchsia-300">{t.footer.signatureEmphasis}</em>
            </h2>
          </motion.div>

          <motion.div
            variants={slideUp}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center"
          >
            <p className="text-[#4a3b59] dark:text-slate-300 font-light text-base md:text-lg mb-8 max-w-md lg:text-right rtl:lg:text-left">
              {t.footer.invitation}
            </p>
            <motion.button
              type="button"
              onClick={onOpenBooking}
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -10px rgba(157,35,122,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#9d237a] to-[#629131] hover:brightness-110 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#9d237a]/25 relative overflow-hidden group cursor-pointer"
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">{t.bookConsultation}</span>
              <ArrowUpRight className="w-5 h-5 text-white relative z-10" />
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation & Newsletter Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#9d237a]/10 dark:border-white/10">
          {/* Quick Links */}
          <motion.div variants={slideUp} className="md:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#6b5c7a] dark:text-slate-400 block mb-6">
              EXPLORE THE SANCTUARY
            </span>
            <nav className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm font-medium">
              {t.footer.links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="text-[#4a3b59] dark:text-slate-300 hover:text-[#9d237a] dark:hover:text-[#84cc16] transition-colors flex items-center gap-1.5 group"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3 h-3 text-[#6b5c7a] dark:text-slate-500 group-hover:text-[#9d237a] dark:group-hover:text-[#84cc16] opacity-0 group-hover:opacity-100 transition-all" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div variants={slideUp} className="md:col-span-7 lg:pl-12 rtl:lg:pl-0 rtl:lg:pr-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#4d7c1b] dark:text-[#84cc16] block mb-2 font-semibold">
              HEALTH LINES JOURNAL
            </span>
            <h3 className="text-2xl font-editorial text-[#1f122b] dark:text-white mb-2">
              {t.footer.journalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#4a3b59] dark:text-slate-300 font-light mb-6">
              {t.footer.journalSub}
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="flex items-center rounded-xl glass-card p-1.5 focus-within:border-[#9d237a]/60 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletterPlaceholder}
                  className="bg-transparent px-3 py-2 text-sm text-[#1f122b] dark:text-white placeholder-[#6b5c7a]/70 dark:placeholder-slate-400 focus:outline-none w-full"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2.5 rounded-lg bg-[#9d237a] hover:bg-[#821c65] dark:bg-[#9d237a]/55 dark:hover:bg-[#9d237a]/75 text-white font-mono text-xs uppercase tracking-wider shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{subscribed ? '✓' : t.footer.subscribe}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </motion.button>
              </div>
            </form>

            <div className="flex items-center gap-4 mt-6">
              {[
                { href: siteConfig.location.googleMapsUrl, icon: MapPin, label: 'Google Maps' },
                { href: siteConfig.social.instagram, icon: InstagramIcon, label: 'Instagram' },
                { href: siteConfig.buildWhatsAppUrl(), icon: MessageSquare, label: 'WhatsApp' },
                { href: `tel:${siteConfig.contact.phone}`, icon: Phone, label: 'Call Center' },
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
                  whileHover={{ scale: 1.1, borderColor: 'rgba(157,35,122,0.5)' }}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[#4a3b59] dark:text-slate-200 hover:text-[#9d237a] dark:hover:text-[#84cc16] transition-colors"
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
          className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6b5c7a] dark:text-slate-400"
        >
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-6">
            <span>{t.footer.license}</span>
            <motion.span className="cursor-pointer hover:text-[#1f122b] dark:hover:text-white transition-colors">
              {t.footer.privacy}
            </motion.span>
            <motion.span className="cursor-pointer hover:text-[#1f122b] dark:hover:text-white transition-colors">
              {t.footer.terms}
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
