import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useClinicContext } from '../context/useClinicContext';

export default function ScrollReadingText({ text, className = '' }) {
  const containerRef = useRef(null);
  const { theme } = useClinicContext();
  const isDark = theme === 'dark';
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'end 0.45'],
  });

  return (
    <p ref={containerRef} className={`text-lg md:text-2xl leading-relaxed font-light ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isDark={isDark}
          />
        );
      })}
    </p>
  );
}

function Word({ word, progress, range, isDark }) {
  const opacity = useTransform(progress, range, [0.68, 1]);
  const color = useTransform(
    progress,
    range,
    isDark ? ['#cbb8dc', '#ffffff'] : ['#4a3b59', '#1f122b']
  );
  const shadow = useTransform(
    progress,
    range,
    isDark
      ? ['0 0 0px rgba(255,255,255,0)', '0 0 16px rgba(255,255,255,0.35)']
      : ['0 0 0px rgba(157,35,122,0)', '0 0 14px rgba(157,35,122,0.16)']
  );

  return (
    <motion.span
      style={{ opacity, color, textShadow: shadow }}
      className="inline-block mr-2 rtl:ml-2 rtl:mr-0 transition-colors duration-200 font-normal"
    >
      {word}
    </motion.span>
  );
}
