import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';

export default function FloatingWhatsApp({ lang = 'ar' }) {
  const isAr = lang === 'ar';
  const text = isAr
    ? 'السلام عليكم، أود الاستفسار وحجز موعد في مركز خطوط الصحة للسيدات.'
    : 'Hello, I would like to inquire and book an appointment at Health Lines Center.';
  const whatsappUrl = siteConfig.buildWhatsAppUrl(text);

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-50 flex items-center group">
      {/* Floating Interactive Pill Label (Desktop & Tablet) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -12, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.04, x: 2 }}
        className="hidden md:flex items-center gap-2.5 mr-3.5 px-4 py-2 rounded-full bg-white/90 dark:bg-[#2b123b]/90 border border-emerald-500/35 dark:border-emerald-400/40 hover:border-emerald-500 text-[#1f122b] dark:text-white shadow-[0_8px_30px_rgba(16,185,129,0.18)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 group/pill cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col text-left rtl:text-right">
          <span className="text-xs font-semibold tracking-wide text-[#1f122b] dark:text-white group-hover/pill:text-emerald-700 dark:group-hover/pill:text-emerald-300 transition-colors">
            {isAr ? 'تحدثي معنا واتساب' : 'Chat on WhatsApp'}
          </span>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-mono leading-none">
            {isAr ? 'رد فوري واستفسار مباشر' : 'Fast response 24/7'}
          </span>
        </div>
      </motion.a>

      {/* Floating Circular Luxury WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? 'تواصل عبر الواتساب' : 'Contact via WhatsApp'}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0a5c43] via-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_12px_35px_rgba(37,211,102,0.45)] hover:shadow-[0_16px_45px_rgba(37,211,102,0.7)] border-2 border-emerald-300/40 cursor-pointer group/btn"
      >
        {/* Soft radial aura glow */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 blur-sm animate-pulse pointer-events-none" />

        {/* Outer concentric ping ring */}
        <span className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-ping pointer-events-none" />

        {/* Specular gloss reflection overlay */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/20 pointer-events-none" />

        {/* WhatsApp Icon - flawless, fully rounded vector path */}
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10 drop-shadow-md transition-transform duration-300 group-hover/btn:scale-110" 
          viewBox="0 0 448 512" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>

        {/* Online Status Beacon with gentle pulse */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0a5c43] rounded-full shadow-md z-20">
          <span className="animate-ping absolute inset-0 rounded-full bg-emerald-300 opacity-75" />
        </span>
      </motion.a>
    </aside>
  );
}
