import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollReadingText({ text, className = '' }) {
  const containerRef = useRef(null);
  const words = text.split(' ');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <p ref={containerRef} className={`text-lg md:text-2xl leading-relaxed font-light ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

function Word({ word, progress, range }) {
  const opacity = useTransform(progress, range, [0.32, 1]);
  const color = useTransform(progress, range, ['#64748b', '#ffffff']);
  const shadow = useTransform(
    progress,
    range,
    ['0 0 0px rgba(255,255,255,0)', '0 0 16px rgba(255,255,255,0.4)']
  );

  return (
    <motion.span
      style={{ opacity, color, textShadow: shadow }}
      className="inline-block mr-2 rtl:ml-2 rtl:mr-0 transition-all duration-150"
    >
      {word}
    </motion.span>
  );
}
