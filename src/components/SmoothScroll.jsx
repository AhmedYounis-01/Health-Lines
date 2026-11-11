import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceProfile } from '../hooks/useDeviceProfile';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lightweight, high-FPS smooth scroll engine (Lenis + ScrollTrigger sync).
 * Automatically bypassed on mobile/touch & low-power devices so native touch
 * scrolling runs completely un-throttled without an extra rAF loop.
 */
export default function SmoothScroll({ isPaused = false }) {
  const { isMobile, isWeakOrSaveData } = useDeviceProfile();

  useEffect(() => {
    if (isMobile || isWeakOrSaveData) return undefined;

    const lenis = new Lenis({
      lerp: 0.12,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      infinite: false,
    });

    window.lenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for internal anchor links (#about, #departments, etc.)
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
            duration: 1.0,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      window.lenis = null;
    };
  }, [isMobile, isWeakOrSaveData]);

  // Pause / resume scroll when booking modal opens
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
