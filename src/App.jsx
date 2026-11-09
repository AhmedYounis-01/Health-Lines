import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClinicContextProvider } from './context/ClinicContext';
import { useClinicContext } from './context/useClinicContext';
import SmoothScroll from './components/SmoothScroll';
import MorphoHeader from './components/MorphoHeader';
import ChapterNav from './components/ChapterNav';
import AmbientSound from './components/AmbientSound';
import HeroChapter from './components/HeroChapter';
import AboutChapter from './components/AboutChapter';
import DepartmentsChapter from './components/DepartmentsChapter';
import TherapyChapter from './components/TherapyChapter';
import VelaShapeChapter from './components/VelaShapeChapter';
import LymphaticChapter from './components/LymphaticChapter';
import BodyScienceChapter from './components/BodyScienceChapter';
import ContactChapter from './components/ContactChapter';
import MorphoFooter from './components/MorphoFooter';
import BookingModal from './components/BookingModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LocalChatBot from './components/LocalChatBot';

function MainApp() {
  const { lang, setLang, t, activeChapter, setActiveChapter, isBookingOpen, openBooking } = useClinicContext();
  const [isLoaded, setIsLoaded] = useState(false);

  // Page load entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent page scroll while the booking modal is open
  useEffect(() => {
    document.body.style.overflow = isBookingOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isBookingOpen]);

  // Track active chapter as user scrolls
  useEffect(() => {
    const chapterIds = [
      'hero',
      'about',
      'departments',
      'therapy',
      'velashape',
      'lymphatic',
      'science',
      'contact',
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      for (const id of chapterIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveChapter(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveChapter]);

  return (
    <>
      {/* Weighted cinematic smooth scroll inertia */}
      <SmoothScroll isPaused={isBookingOpen} />

      {/* Custom Cursor — desktop only */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Cinematic Page Load */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] bg-[#0c0912] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-12 h-12 rounded-full border-2 border-[#9d237a]/30 border-t-[#84cc16] animate-spin"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`min-h-screen bg-[#0c0912] text-[#e2e8f0] relative selection:bg-[#9d237a]/40 selection:text-fuchsia-200 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}
      >
        {/* Floating Notch Header */}
        <MorphoHeader
          lang={lang}
          setLang={setLang}
          t={t}
          activeChapter={activeChapter}
          onOpenBooking={openBooking}
        />

        {/* Side Vertical Chapter Progress Indicator */}
        <ChapterNav
          chapters={t.chapters}
          activeChapter={activeChapter}
        />

        {/* Ambient Sanctuary Sound Toggle */}
        <AmbientSound t={t} />

        {/* Main Scrollytelling Journey */}
        <main>
          {/* Chapter 01: Hero / Awakening -> الرئيسية */}
          <HeroChapter
            lang={lang}
            t={t}
            onScrollNext={() => {
              const nextEl = document.getElementById('about');
              if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Chapter 02: About Us / Sanctuary -> من نحن */}
          <AboutChapter
            t={t}
            onExploreServices={() => {
              const nextEl = document.getElementById('departments');
              if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Chapter 03: Clinical Departments & Rehabilitation Programs -> خدماتنا */}
          <DepartmentsChapter
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Chapter 04: Physical Therapy & Spine */}
          <TherapyChapter
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Chapter 05: VelaShape III & Contouring */}
          <VelaShapeChapter
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Chapter 06: Lymphatic Detox & Cellular Renewal */}
          <LymphaticChapter
            t={t}
          />

          {/* Chapter 07: Water, Body & Health Science -> المدونة */}
          <BodyScienceChapter
            t={t}
          />

          {/* Chapter 08: The Jeddah Sanctuary & Clinic Contact -> تواصل معنا */}
          <ContactChapter
            t={t}
            onOpenBooking={openBooking}
          />
        </main>

        {/* Luxury Outro Footer */}
        <MorphoFooter
          t={t}
          onOpenBooking={openBooking}
        />

        {/* Interactive Consultation Booking Modal */}
        <BookingModal />

        {/* Floating WhatsApp Contact Button (Bottom-Left) */}
        <FloatingWhatsApp lang={lang} />

        {/* Local Intelligent Clinic Chatbot (Bottom-Right) */}
        <LocalChatBot lang={lang} />
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <ClinicContextProvider>
      <MainApp />
    </ClinicContextProvider>
  );
}