import React, { memo } from 'react';
import { motion } from 'framer-motion';

const EXPO_OUT = [0.16, 1, 0.3, 1];

/**
 * High-performance illuminated reading text.
 * Uses a single lightweight viewport reveal instead of per-word scroll hooks,
 * eliminating scroll-jank across 8 chapters while staying crisp in Light & Dark modes.
 */
function ScrollReadingText({ text, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0.45, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.65, ease: EXPO_OUT }}
      className={`text-lg md:text-2xl leading-relaxed font-normal text-[#3b2d4a] dark:text-[#ece2f5] ${className}`}
    >
      {text}
    </motion.p>
  );
}

export default memo(ScrollReadingText);
