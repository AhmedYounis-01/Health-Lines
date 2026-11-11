import { useState, useEffect } from 'react';

/**
 * Detects mobile viewport and low-power / reduced-motion constraints so components
 * can scale down heavy scroll-linked transforms and background video decoders
 * while preserving the visual design on capable desktops.
 */
export function useDeviceProfile() {
  const [profile, setProfile] = useState(() => {
    if (typeof window === 'undefined') {
      return { isMobile: false, isDesktopFinePointer: true, isWeakOrSaveData: false };
    }
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const isDesktopFinePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
    const saveData = Boolean(navigator.connection?.saveData);
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
    const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      isMobile,
      isDesktopFinePointer,
      isWeakOrSaveData: reducedMotion || saveData || (isMobile && (lowCores || lowMemory)),
    };
  });

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 767px)');
    const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      const isMobile = mobileMq.matches;
      const saveData = Boolean(navigator.connection?.saveData);
      const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
      const lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 2;
      setProfile({
        isMobile,
        isDesktopFinePointer: pointerMq.matches,
        isWeakOrSaveData: motionMq.matches || saveData || (isMobile && (lowCores || lowMemory)),
      });
    };

    mobileMq.addEventListener('change', update);
    pointerMq.addEventListener('change', update);
    motionMq.addEventListener('change', update);
    return () => {
      mobileMq.removeEventListener('change', update);
      pointerMq.removeEventListener('change', update);
      motionMq.removeEventListener('change', update);
    };
  }, []);

  return profile;
}

export default useDeviceProfile;
