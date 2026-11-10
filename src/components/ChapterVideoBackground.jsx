import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * High-Performance Cinematic Background (Media / Video / Image)
 * Memory & GPU Optimized:
 * - Renders lightweight WebP/JPEG <picture> with lazy decoding.
 * - When videoSrc is passed (Hero only): mounts <video> only while within 500px
 *   of the viewport and releases decoded video frames from RAM when scrolled away.
 * - Automatically disables <video> when user prefers reduced motion.
 */
const WEBP_ENABLED_POSTERS = new Set([
  '/assets/therapy-female-spine.jpg',
  '/assets/velashape-female-contour.jpg',
  '/assets/lymphatic-female-drainage.jpg',
  '/assets/bodyscience-female-vitality.jpg',
]);

function ChapterVideoBackground({
  videoSrc = null,
  posterSrc,
  alt = 'Health Lines Center Women Physical Therapy Sanctuary',
  glowClass = 'bg-[#9d237a]/25',
  glowSecondaryClass = 'bg-[#84cc16]/20',
  brightness = 'brightness-[0.65]',
  contrast = 'contrast-[1.05]',
  parallaxY = null,
  scale = 'scale-105',
  isPriority = false,
  priority = false,
  retentionMargin = '500px 0px 500px 0px',
}) {
  const isPriorityEffective = isPriority || priority;
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [prefersReducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [shouldMountVideo, setShouldMountVideo] = useState(
    Boolean(videoSrc) && isPriorityEffective && !prefersReducedMotion
  );
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Memory Retention Observer: Mount when approaching, unmount & release buffer when far off-screen
  useEffect(() => {
    if (!videoSrc || prefersReducedMotion) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const retentionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMountVideo(true);
          } else {
            // Release decoded video frames from RAM/VRAM when scrolled far past Hero
            const vid = videoRef.current;
            if (vid) {
              vid.pause();
              vid.removeAttribute('src');
              vid.querySelectorAll('source').forEach((srcEl) => srcEl.removeAttribute('src'));
              vid.load();
            }
            setIsVideoLoaded(false);
            setShouldMountVideo(false);
          }
        });
      },
      {
        root: null,
        rootMargin: retentionMargin,
        threshold: 0,
      }
    );

    retentionObserver.observe(container);
    return () => retentionObserver.disconnect();
  }, [videoSrc, prefersReducedMotion, retentionMargin]);

  // Playback Observer: Play only when actually visible in viewport
  useEffect(() => {
    if (!videoSrc || !shouldMountVideo || prefersReducedMotion) return undefined;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return undefined;

    let isSubscribed = true;

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isSubscribed) return;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay restricted or battery saver mode active
            });
          } else {
            video.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: '120px 0px 120px 0px',
        threshold: 0.05,
      }
    );

    playbackObserver.observe(container);

    const handleLoadedData = () => {
      if (isSubscribed) setIsVideoLoaded(true);
    };
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      isSubscribed = false;
      playbackObserver.disconnect();
      video.removeEventListener('loadeddata', handleLoadedData);
      video.pause();
      video.removeAttribute('src');
      video.querySelectorAll('source').forEach((srcEl) => srcEl.removeAttribute('src'));
      video.load();
    };
  }, [videoSrc, shouldMountVideo, prefersReducedMotion]);

  const webpSrc =
    posterSrc && WEBP_ENABLED_POSTERS.has(posterSrc)
      ? posterSrc.replace(/\.jpg$/, '.webp').replace(/\.jpeg$/, '.webp')
      : null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Background Media container with optional smooth parallax transform */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        {/* Optimized Image Layer */}
        {posterSrc && (
          <picture className="absolute inset-0 w-full h-full">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={posterSrc}
              alt={alt}
              loading={isPriorityEffective ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={isPriorityEffective ? 'high' : 'auto'}
              className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-500 ${
                videoSrc && shouldMountVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>
        )}

        {/* Video Layer — Mounted only while within active retention zone */}
        {videoSrc && shouldMountVideo && !prefersReducedMotion && (
          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {Array.isArray(videoSrc) ? (
              videoSrc.map((src) => (
                <source
                  key={src}
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

        {/* Multi-layer theme-adaptive gradients keeping text crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9fc]/82 via-[#f7eef7]/62 to-[#fcf9fc]/86 dark:from-[#271136]/72 dark:via-[#3d1649]/45 dark:to-[#212e21]/76 transition-colors duration-500" />

        {/* Soft radial vignette focusing user eye on central editorial typography */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.22)_0%,rgba(250,242,248,0.88)_92%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#241033_92%)] opacity-75 dark:opacity-65" />

        {/* Atmospheric Medical Color Glows */}
        <div className={`atmosphere-glow w-[480px] h-[480px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[560px] h-[560px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </motion.div>
    </div>
  );
}

export default memo(ChapterVideoBackground);
