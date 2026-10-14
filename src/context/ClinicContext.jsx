import React, { useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';
import { siteConfig } from '../config/siteConfig';
import { ClinicContext } from './clinicContextInstance';

export function ClinicContextProvider({ children }) {
  const [lang, setLang] = useState('ar');
  const [activeChapter, setActiveChapter] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState(null);

  const t = translations[lang] || translations.ar;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Synchronize HTML attributes dynamically
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  // Open booking modal with optional service or note prefill
  const openBooking = useCallback((prefill = null) => {
    setBookingPrefill(prefill);
    setIsBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const value = {
    lang,
    setLang,
    toggleLang,
    dir,
    t,
    activeChapter,
    setActiveChapter,
    isBookingOpen,
    bookingPrefill,
    openBooking,
    closeBooking,
    siteConfig,
  };

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
}

export default ClinicContextProvider;
