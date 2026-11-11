import React, { useEffect, useCallback, lazy, Suspense } from 'react';
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
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const BookingModal = lazy(() => import('./components/BookingModal'));
const LocalChatBot = lazy(() => import('./components/LocalChatBot'));

function MainApp() {
  const { lang, setLang, t, activeChapter, setActiveChapter, isBookingOpen, openBooking } = useClinicContext();

  // Prevent page scroll while the booking modal is open
  useEffect(() => {
    document.body.style.overflow = isBookingOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isBookingOpen]);

  // Track active chapter cleanly via center-band IntersectionObserver
  // (works reliably for both short sections and multi-screen tall #departments)
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

    const elements = chapterIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const intersecting = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id);
          } else {
            intersecting.delete(entry.target.id);
          }
        });

        for (let i = chapterIds.length - 1; i >= 0; i -= 1) {
          const id = chapterIds[i];
          if (intersecting.has(id)) {
            setActiveChapter(id);
            return;
          }
        }
      },
      {
        root: null,
        rootMargin: '-38% 0px -58% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [setActiveChapter]);

  const scrollToAbout = useCallback(() => {
    const nextEl = document.getElementById('about');
    if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToDepartments = useCallback(() => {
    const nextEl = document.getElementById('departments');
    if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Weighted cinematic smooth scroll inertia */}
      <SmoothScroll isPaused={isBookingOpen} />

      {/* Custom Cursor — desktop only */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      <div
        className={`min-h-screen theme-page-bg text-[#1f122b] dark:text-[#fdfaff] relative selection:bg-[#9d237a]/25 selection:text-[#9d237a] dark:selection:text-fuchsia-200 transition-colors duration-300 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}
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
            onOpenBooking={openBooking}
            onScrollNext={scrollToAbout}
          />

          {/* Chapter 02: About Us / Sanctuary -> من نحن */}
          <AboutChapter
            t={t}
            onExploreServices={scrollToDepartments}
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

        {/* Interactive Consultation Booking Modal (lazy chunk loaded on demand) */}
        {isBookingOpen && (
          <Suspense fallback={null}>
            <BookingModal />
          </Suspense>
        )}

        {/* Floating WhatsApp Contact Button (Bottom-Left) */}
        <FloatingWhatsApp lang={lang} />

        {/* Local Intelligent Clinic Chatbot (Bottom-Right, split into async chunk) */}
        <Suspense fallback={null}>
          <LocalChatBot lang={lang} />
        </Suspense>
      </div>
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