import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Layers } from 'lucide-react';
import InstagramIcon from './InstagramIcon';

const EXPO_OUT = [0.16, 1, 0.3, 1];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EXPO_OUT, staggerChildren: 0.1 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EXPO_OUT } },
};

export default function InstagramGallery({ t }) {
  const trackRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const scroll = (direction) => {
    if (trackRef.current) {
      const isRtl = document.documentElement.dir === 'rtl';
      const scrollAmount = 360;
      const delta = direction === 'left' ? -scrollAmount : scrollAmount;
      const actualDelta = isRtl ? -delta : delta;
      trackRef.current.scrollBy({
        left: actualDelta,
        behavior: 'smooth',
      });
    }
  };

  const handleTrackScroll = () => {
    if (trackRef.current) {
      const currentScroll = Math.abs(trackRef.current.scrollLeft);
      const cardWidth = 340;
      const index = Math.round(currentScroll / cardWidth);
      setScrollIndex(Math.min(Math.max(index, 0), t.instagram.posts.length - 1));
    }
  };

  return (
    <motion.section
      id="instagram"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden py-24 px-6 border-t border-white/5 bg-[#0c0912]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
    >
      {/* Subtle grain background */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.header
          variants={slideUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs md:text-sm font-mono tracking-[0.25em] text-[#84cc16] uppercase mb-4 flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-[#84cc16]" />
              <span>{t.instagram.eyebrow}</span>
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12]">
              {t.instagram.titlePrefix}{' '}
              <em className="italic font-light text-fuchsia-200">{t.instagram.titleEmphasis}</em>
            </h2>
          </div>

          <motion.a
            href="https://www.instagram.com/healthlinescenter/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(217, 70, 239, 0.4)',
              boxShadow: '0 20px 40px -10px rgba(217,70,239,0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            className="group glass-card px-6 py-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 transition-all duration-300 shrink-0"
          >
            <div>
              <span className="font-mono text-sm font-bold text-white group-hover:text-fuchsia-300 transition-colors flex items-center gap-1.5">
                <span>{t.instagram.handle}</span>
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#84cc16]"
                />
              </span>
              <span className="text-xs text-slate-400 block mt-0.5">
                {t.instagram.followers} · {t.instagram.tagline}
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-[#84cc16] group-hover:border-[#84cc16] transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </motion.a>
        </motion.header>

        {/* Horizontal Carousel Track — Morphowater stagger style */}
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 -mx-6 px-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {t.instagram.posts.map((post, idx) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.93 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.65,
                    delay: idx * 0.07, // morphowater-style --post-delay stagger
                    ease: EXPO_OUT,
                  },
                },
              }}
              whileHover={{ y: -10, borderColor: 'rgba(217, 70, 239, 0.35)' }}
              transition={{ duration: 0.3 }}
              className="shrink-0 w-[290px] sm:w-[340px] md:w-[370px] glass-card rounded-3xl border border-white/10 overflow-hidden group flex flex-col justify-between"
              style={{ scrollSnapAlign: 'start' }}
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/5] overflow-hidden bg-slate-900"
              >
                <motion.img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover object-center brightness-90 group-hover:brightness-100"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: EXPO_OUT }}
                />

                {/* Type Badge */}
                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  {post.type.includes('Reel') || post.type.includes('ريلز') ? (
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Play className="w-3 h-3 text-[#84cc16] fill-[#84cc16]" />
                    </motion.span>
                  ) : post.type.includes('Gallery') || post.type.includes('ألبوم') ? (
                    <Layers className="w-3 h-3 text-fuchsia-400" />
                  ) : (
                    <ImageIcon className="w-3 h-3 text-[#84cc16]" />
                  )}
                  <span>{post.type}</span>
                </span>

                {/* Open Hover Icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.7 }}
                    whileHover={{ scale: 1 }}
                    className="w-12 h-12 rounded-full bg-[#84cc16] text-black flex items-center justify-center shadow-2xl"
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </a>

              {/* Caption and Date */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-medium text-white text-base mb-2 group-hover:text-fuchsia-200 transition-colors line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 mb-4">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{post.date}</span>
                  <motion.span
                    whileHover={{ x: 2 }}
                    className="text-[#84cc16] cursor-pointer"
                  >
                    {t.instagram.openPost} ↗
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Carousel Controls */}
        <motion.div
          variants={slideUp}
          className="flex items-center justify-between pt-6 border-t border-white/10"
        >
          <p className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span className="text-[#84cc16] font-bold">
              0{scrollIndex + 1} — 0{t.instagram.posts.length}
            </span>
            <span>Real moments of care. A sanctuary for you.</span>
          </p>

          <div className="flex items-center gap-2">
            <motion.button
              type="button"
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1, borderColor: 'rgba(132,204,22,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass-card border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Previous Instagram posts"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1, borderColor: 'rgba(132,204,22,0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full glass-card border border-white/10 text-slate-300 hover:text-white transition-colors"
              aria-label="Next Instagram posts"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
