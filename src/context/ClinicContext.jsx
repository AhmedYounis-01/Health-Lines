import React, { useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';
import { siteConfig } from '../config/siteConfig';
import { ClinicContext } from './clinicContextInstance';

const THEME_STORAGE_KEY = 'hl-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function ClinicContextProvider({ children }) {
  const [lang, setLang] = useState('ar');
  const [theme, setThemeState] = useState(getInitialTheme);
  const [activeChapter, setActiveChapter] = useState('hero');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState(null);

  const t = translations[lang] || translations.ar;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // Synchronize HTML language & direction attributes dynamically
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  // Synchronize theme class, data attribute, meta theme-color, and localStorage safely
  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.dataset.theme = theme;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#271136' : '#fcf9fc');
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures in restricted browsing modes
    }
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(nextTheme === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

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
    theme,
    setTheme,
    toggleTheme,
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
