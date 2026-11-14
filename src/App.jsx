import React, { useEffect, lazy, Suspense } from 'react';
import { ClinicContextProvider } from './context/ClinicContext';
import { useClinicContext } from './context/useClinicContext';
import SmoothScroll from './components/SmoothScroll';
import MorphoHeader from './components/MorphoHeader';
import ChapterNav from './components/ChapterNav';
import AmbientSound from './components/AmbientSound';
import HeroChapter from './components/HeroChapter';
import IntroSection from './components/IntroSection';
import ServicesSection from './components/ServicesSection';
import SessionsSection from './components/SessionsSection';
import WhyUsSection from './components/WhyUsSection';
import ProcessSection from './components/ProcessSection';
import FAQSection from './components/FAQSection';
import BookingBandSection from './components/BookingBandSection';
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
  useEffect(() => {
    const sectionToChapter = {
      hero: 'hero',
      services: 'services',
      'services-grid': 'services',
      sessions: 'sessions',
      why: 'why',
      process: 'why',
      faq: 'why',
      contact: 'contact',
    };

    const sectionIds = ['hero', 'services', 'services-grid', 'sessions', 'why', 'process', 'faq', 'contact'];

    const elements = sectionIds
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

        // Bottom of page priority check
        const scrollBottom = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        if (scrollBottom >= totalHeight - 250) {
          setActiveChapter('contact');
          return;
        }

        for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
          const id = sectionIds[i];
          if (intersecting.has(id)) {
            const mapped = sectionToChapter[id] || id;
            setActiveChapter(mapped);
            return;
          }
        }
      },
      {
        root: null,
        rootMargin: '-15% 0px -25% 0px',
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Handle bottom of page scroll boundary to lock activeChapter to contact
    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= totalHeight - 250) {
        setActiveChapter('contact');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setActiveChapter]);

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
        {/* Floating Topbar & Notch Header */}
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

        {/* Main Section Architecture matching datails-sa.online */}
        <main>
          {/* Section 1: Hero with Dual Sequential Video & 4 Facts Strip */}
          <HeroChapter
            lang={lang}
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Section 2: Intro Section (الرعاية تبدأ بالفهم) */}
          <IntroSection
            lang={lang}
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Section 3: Services Section (خدماتنا العلاجية والتأهيلية) */}
          <ServicesSection
            lang={lang}
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Section 4: Therapy Showcase / Sessions (جلساتنا باحتراف) */}
          <SessionsSection
            lang={lang}
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Section 5: Why Us (لماذا نحن / معك من أول تقييم) */}
          <WhyUsSection
            lang={lang}
            t={t}
            onOpenBooking={openBooking}
          />

          {/* Section 6: Process (رحلة بسيطة / من التواصل إلى أول جلسة) */}
          <ProcessSection
            lang={lang}
            t={t}
          />

          {/* Section 7: FAQ (الأسئلة الشائعة) */}
          <FAQSection
            lang={lang}
            t={t}
          />

          {/* Section 8: Booking Band (جاهزون لخدمتك في جدة) */}
          <BookingBandSection
            lang={lang}
            t={t}
          />
        </main>

        {/* Luxury Outro Footer */}
        <MorphoFooter
          t={t}
          onOpenBooking={openBooking}
        />

        {/* Interactive Consultation Booking Modal (lazy loaded) */}
        {isBookingOpen && (
          <Suspense fallback={null}>
            <BookingModal />
          </Suspense>
        )}

        {/* Floating WhatsApp Contact Button (Bottom-Left) */}
        <FloatingWhatsApp lang={lang} />

        {/* Local Intelligent Clinic Chatbot (Bottom-Right) */}
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
