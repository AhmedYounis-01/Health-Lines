import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChapterNav({ chapters, activeChapter }) {
  const currentIndex = Math.max(
    0,
    chapters.findIndex((c) => c.id === activeChapter)
  );
  const currentChapter = chapters[currentIndex] || chapters[0];

  return (
    <nav
      aria-label="Story chapters"
      className="hidden xl:flex fixed left-8 rtl:left-auto rtl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-start gap-4"
    >
      {/* Chapter Counter Badge */}
      <motion.div
        layout
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-emerald-400 mb-2 shadow-lg"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentChapter.num}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="font-bold"
          >
            {currentChapter.num}
          </motion.span>
        </AnimatePresence>
        <span className="text-slate-500">/</span>
        <span className="text-slate-400">{chapters[chapters.length - 1].num}</span>
      </motion.div>

      {/* Chapters list */}
      <div className="relative flex flex-col gap-3 pl-3 rtl:pl-0 rtl:pr-3 border-l rtl:border-l-0 rtl:border-r border-white/10">
        {chapters.map((ch) => {
          const isActive = ch.id === activeChapter;
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              className={`group flex items-center gap-3 transition-all duration-300 ${
                isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {/* Animated dot */}
              <div className="relative flex items-center justify-center w-2 h-2">
                <motion.span
                  animate={
                    isActive
                      ? { scale: 1.3, backgroundColor: '#34d399' }
                      : { scale: 1, backgroundColor: '#475569' }
                  }
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-2 h-2 rounded-full block relative"
                />
                {/* Animated ring for active dot */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      key="ring"
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-full border border-emerald-400/50"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Chapter label */}
              <motion.span
                animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
                className="text-xs tracking-wider font-medium pointer-events-none"
                style={{ originX: 0 }}
              >
                {ch.label}
              </motion.span>

              {/* Hover label for inactive */}
              {!isActive && (
                <span className="text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-8 rtl:left-auto rtl:right-8 bg-[#0b0f15]/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10 whitespace-nowrap pointer-events-none">
                  {ch.label}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
