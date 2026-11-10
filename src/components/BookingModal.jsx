import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useClinicContext } from '../context/useClinicContext';

export default function BookingModal({
  isOpen: propIsOpen,
  onClose: propOnClose,
  t: propT,
  lang: propLang,
}) {
  const context = useClinicContext();

  const isOpen = propIsOpen !== undefined ? propIsOpen : context.isBookingOpen;
  const onClose = propOnClose || context.closeBooking;
  const t = propT || context.t;
  const lang = propLang || context.lang;
  const siteConfig = context.siteConfig;

  const prefillService = context.bookingPrefill?.service;
  const defaultService = prefillService || t?.bookingModal?.services?.[0] || 'استشارة علاج طبيعي';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [customService, setCustomService] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const service = customService || prefillService || defaultService;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = siteConfig.buildBookingMessage(
      { name, phone, service, date, notes },
      lang
    );
    const whatsappUrl = siteConfig.buildWhatsAppUrl(message);

    // Synchronous execution directly within the user click/submit gesture to prevent popup blocking
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with exit animation */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1f122b]/45 dark:bg-[#1a0826]/75 backdrop-blur-xl"
          />

          {/* Modal Window with entrance and exit animation */}
          <motion.div
            key="modal-window"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card bg-white/95 dark:bg-[#2c123c]/95 border border-[#9d237a]/20 dark:border-fuchsia-300/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-auto"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full glass-card hover:bg-[#9d237a]/10 dark:hover:bg-white/10 text-[#6b5c7a] dark:text-slate-300 hover:text-[#1f122b] dark:hover:text-white transition-colors cursor-pointer"
              aria-label={t.bookingModal.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#4d7c1b] dark:text-[#84cc16] flex items-center gap-1.5 mb-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Health Lines Center · Jeddah</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial text-[#1f122b] dark:text-white mb-2">
                {t.bookingModal.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#4a3b59] dark:text-slate-300 font-light">
                {t.bookingModal.subtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b5c7a] dark:text-slate-300 mb-1.5">
                  {t.bookingModal.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === 'ar' ? 'سارة الأحمد' : 'Jane Doe'}
                  className="w-full px-4 py-3 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.08] border border-[#9d237a]/20 dark:border-white/15 focus:border-[#9d237a] dark:focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-[#9d237a] text-[#1f122b] dark:text-white placeholder-[#6b5c7a]/60 dark:placeholder-slate-400 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b5c7a] dark:text-slate-300 mb-1.5">
                  {t.bookingModal.phoneLabel} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="w-full px-4 py-3 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.08] border border-[#9d237a]/20 dark:border-white/15 focus:border-[#9d237a] dark:focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-[#9d237a] text-[#1f122b] dark:text-white placeholder-[#6b5c7a]/60 dark:placeholder-slate-400 text-sm font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#6b5c7a] dark:text-slate-300 mb-1.5">
                  {t.bookingModal.serviceLabel}
                </label>
                <select
                  value={service}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#faf5fa] dark:bg-[#38174b] border border-[#9d237a]/20 dark:border-white/15 focus:border-[#9d237a] dark:focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-[#9d237a] text-[#1f122b] dark:text-white text-sm transition-colors"
                >
                  {t.bookingModal.services.map((s, idx) => (
                    <option key={idx} value={s} className="bg-white dark:bg-[#2c123c] text-[#1f122b] dark:text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6b5c7a] dark:text-slate-300 mb-1.5">
                    {t.bookingModal.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.08] border border-[#9d237a]/20 dark:border-white/15 focus:border-[#9d237a] dark:focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-[#9d237a] text-[#1f122b] dark:text-white text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#6b5c7a] dark:text-slate-300 mb-1.5">
                    {t.bookingModal.notesLabel}
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={lang === 'ar' ? 'مثل: ألم أسفل الظهر' : 'e.g., lower back stiffness'}
                    className="w-full px-4 py-3 rounded-xl bg-[#9d237a]/[0.04] dark:bg-white/[0.08] border border-[#9d237a]/20 dark:border-white/15 focus:border-[#9d237a] dark:focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-[#9d237a] text-[#1f122b] dark:text-white placeholder-[#6b5c7a]/60 dark:placeholder-slate-400 text-sm transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full py-4 rounded-xl bg-gradient-to-r from-[#9d237a] to-[#629131] hover:brightness-110 text-white font-bold text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-[#9d237a]/25 disabled:opacity-70 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>{isSubmitting ? t.bookingModal.successMsg : t.bookingModal.submitButton}</span>
              </button>
            </form>

            {/* Quick Call Alternative */}
            <div className="mt-6 pt-5 border-t border-[#9d237a]/15 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4a3b59] dark:text-slate-300">
              <span>{t.bookingModal.directPhone}</span>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="font-mono text-[#4d7c1b] dark:text-[#84cc16] hover:text-[#9d237a] dark:hover:text-lime-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{siteConfig.contact.displayPhone} / {siteConfig.contact.displayWhatsapp}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
