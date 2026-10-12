import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic video background inspired by morphowater.com (.water-film + .water-atmosphere + .water-shade)
 * Features:
 * - Lazy play/pause using IntersectionObserver for optimal 60fps performance
 * - Graceful poster image fallback while video buffers
 * - Multi-layer dark shade gradients ensuring luxury contrast and legibility
 * - Atmospheric colored ambient glow blobs matching the chapter's medical theme
 */
export default function ChapterVideoBackground({
  videoSrc,
  posterSrc,
  alt = 'Health Lines Center Cinematic Ambience',
  glowClass = 'bg-emerald-500/20',
  glowSecondaryClass = 'bg-teal-500/15',
  brightness = 'brightness-[0.38]',
  contrast = 'contrast-[1.1]',
  parallaxY = null,
  scale = 'scale-105',
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let isSubscribed = true;

    // Use IntersectionObserver to play only when near the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isSubscribed) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay policy or low power mode - keep muted and poster visible
            });
          } else {
            video.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: '250px 0px 250px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(container);

    const handleLoadedData = () => {
      if (isSubscribed) setIsVideoLoaded(true);
    };
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      isSubscribed = false;
      observer.disconnect();
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [videoSrc]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background Media with optional parallax transform */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        {/* Fallback Poster Image */}
        {posterSrc && (
          <img
            src={posterSrc}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Cinematic Looping Ambient Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {Array.isArray(videoSrc) ? (
              videoSrc.map((src, i) => (
                <source
                  key={i}
                  src={src}
                  type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                />
              ))
            ) : (
              <source
                src={videoSrc}
                type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
              />
            )}
          </video>
        )}

        {/* Morphowater .water-shade: Vertical Cinematic Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f15]/90 via-[#0b0f15]/40 to-[#0b0f15]" />

        {/* Radial Depth Vignette for Edge Focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#0b0f15_85%)]" />

        {/* Morphowater .water-atmosphere: Atmospheric Color Glows */}
        <div className={`atmosphere-glow w-[550px] h-[550px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[650px] h-[650px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </motion.div>
    </div>
  );
}
