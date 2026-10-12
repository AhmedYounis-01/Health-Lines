import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic weighted smooth scroll engine (powered by Lenis + GSAP ScrollTrigger)
 * Provides the weighted, luxurious resistance requested by the user:
 * "تقل بسيط كدا وانا بعمل scroll لتحت عشان يلحق يبان الفيديو في الخلفيه"
 */
export default function SmoothScroll({ isPaused = false }) {
  useEffect(() => {
    // Initialize Lenis with cinematic weighted settings
    const lenis = new Lenis({
      duration: 1.45, // Heavy luxury inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.82, // Deliberate weighted resistance for video immersion
      syncTouch: false, // Maintain native smooth touch responsiveness on mobile devices
      touchMultiplier: 1.0,
      infinite: false,
    });

    window.lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    const scrollUpdate = () => ScrollTrigger.update();
    lenis.on('scroll', scrollUpdate);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for all internal anchor hash links (#therapy, #velashape, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: 0,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Pause / resume scroll when modals open
  useEffect(() => {
    if (window.lenis) {
      if (isPaused) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }
  }, [isPaused]);

  return null;
}
