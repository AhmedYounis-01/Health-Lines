import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Use event delegation on document so dynamic elements are always caught
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, [data-hoverable]');
      setIsHovered(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  // Only render on desktop (hidden on tablet and mobile)
  return (
    <div
      dir="ltr"
      className="hidden lg:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Outer Spring Ring - explicitly pinned to top: 0, left: 0 to prevent RTL horizontal flip */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          top: 0,
          left: 0,
          right: 'auto',
          bottom: 'auto',
          position: 'fixed',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(217, 70, 239, 0.9)' : 'rgba(157, 35, 122, 0.55)',
          backgroundColor: isHovered ? 'rgba(157, 35, 122, 0.16)' : 'transparent',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="w-9 h-9 rounded-full border border-fuchsia-500/50 backdrop-blur-[0.5px] shadow-lg shadow-fuchsia-500/20 pointer-events-none"
      />

      {/* Inner Immediate Dot - explicitly pinned to top: 0, left: 0 */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          top: 0,
          left: 0,
          right: 'auto',
          bottom: 'auto',
          position: 'fixed',
        }}
        animate={{
          scale: isHovered ? 0.7 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full bg-lime-400 shadow-md shadow-lime-400 pointer-events-none"
      />
    </div>
  );
}
