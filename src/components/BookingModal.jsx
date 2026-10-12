import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, Sparkles } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, t, lang }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(t.bookingModal.services[0]);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = lang === 'ar'
      ? `السلام عليكم، أود حجز موعد استشارة في مركز خطوط الصحة:
الاسم: ${name || 'لم يحدد'}
الجوال: ${phone || 'لم يحدد'}
الخدمة المطلوبة: ${service}
التاريخ المفضل: ${date || 'في أقرب وقت'}
ملاحظات: ${notes || 'لا يوجد'}`
      : `Hello Health Lines Center, I would like to schedule a consultation:
Name: ${name || 'N/A'}
Phone: ${phone || 'N/A'}
Service: ${service}
Preferred Date: ${date || 'Earliest available'}
Notes: ${notes || 'None'}`;

    setTimeout(() => {
      window.open(`https://wa.me/966599530955?text=${encodeURIComponent(message)}`, '_blank');
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-card bg-[#0e141e]/95 border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl z-10 my-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full glass-card hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label={t.bookingModal.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Health Lines Center · Jeddah</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-editorial text-white mb-2">
              {t.bookingModal.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              {t.bookingModal.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                {t.bookingModal.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'سارة الأحمد' : 'Jane Doe'}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white placeholder-slate-600 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                {t.bookingModal.phoneLabel} *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 5X XXX XXXX"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white placeholder-slate-600 text-sm font-mono transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                {t.bookingModal.serviceLabel}
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#131c28] border border-white/10 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white text-sm transition-colors"
              >
                {t.bookingModal.services.map((s, idx) => (
                  <option key={idx} value={s} className="bg-[#0b0f15] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  {t.bookingModal.dateLabel}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  {t.bookingModal.notesLabel}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثل: ألم أسفل الظهر' : 'e.g., lower back stiffness'}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-emerald-400 text-white placeholder-slate-600 text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-3 w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-xl shadow-emerald-500/25 disabled:opacity-70"
            >
              <MessageSquare className="w-4 h-4 text-black" />
              <span>{isSubmitting ? t.bookingModal.successMsg : t.bookingModal.submitButton}</span>
            </button>
          </form>

          {/* Quick Call Alternative */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <span>{t.bookingModal.directPhone}</span>
            <a
              href="tel:0126918000"
              className="font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0126918000 / 0599530955</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
