import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp({ lang = 'ar' }) {
  const isAr = lang === 'ar';
  const phone = '966599530955';
  const text = isAr
    ? 'السلام عليكم، أود الاستفسار وحجز موعد في مركز خطوط الصحة للسيدات.'
    : 'Hello, I would like to inquire and book an appointment at Health Lines Center.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 left-6 z-50 flex items-center group">
      {/* Floating Interactive Pill Label (Desktop & Tablet) */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: -12, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.04, x: 2 }}
        className="hidden md:flex items-center gap-2.5 mr-3.5 px-4 py-2 rounded-full bg-[#0c0912]/90 border border-emerald-500/40 hover:border-emerald-400 text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 group/pill cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col text-left rtl:text-right">
          <span className="text-xs font-semibold tracking-wide text-white group-hover/pill:text-emerald-300 transition-colors">
            {isAr ? 'تحدثي معنا واتساب' : 'Chat on WhatsApp'}
          </span>
          <span className="text-[10px] text-emerald-400/90 font-mono leading-none">
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

        {/* WhatsApp Icon - perfectly padded and unclipped */}
        <svg 
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 drop-shadow-md transition-transform duration-300 group-hover/btn:scale-110" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.31a8.188 8.188 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m-3.53 3.43c-.19 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.08-.13-.27-.2-.56-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01"/>
        </svg>

        {/* Online Status Beacon */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0c0912] rounded-full shadow-md z-20" />
      </motion.a>
    </aside>
  );
}
