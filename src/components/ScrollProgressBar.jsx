import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #9d237a, #c026d3, #84cc16)',
        boxShadow: '0 0 10px rgba(157, 35, 122, 0.6), 0 0 20px rgba(132, 204, 22, 0.4)',
      }}
    />
  );
}
