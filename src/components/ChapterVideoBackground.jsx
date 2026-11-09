import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * High-Performance Cinematic Background (Media / Video / Image)
 * Features:
 * - True Lazy DOM Mounting: Off-screen chapters never mount <video> until user approaches in viewport.
 * - Priority flag: Hero chapter mounts immediately for instant above-the-fold impact.
 * - When videoSrc is omitted: renders pure optimized WebP/JPEG imagery with lazy decoding.
 * - Multi-layer luxury dark gradients ensuring medical legibility and high contrast.
 * - Subtle atmospheric colored glows matching each clinical specialty.
 */
export default function ChapterVideoBackground({
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
  proximityMargin = '350px 0px 350px 0px',
}) {
  const isPriorityEffective = isPriority || priority;
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [shouldMountVideo, setShouldMountVideo] = useState(isPriorityEffective);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Proximity observer: Mount <video> DOM node only when user approaches the chapter
  useEffect(() => {
    if (!videoSrc) return;
    if (isPriorityEffective) {
      setShouldMountVideo(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const mountObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMountVideo(true);
            mountObserver.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin: proximityMargin,
        threshold: 0,
      }
    );

    mountObserver.observe(container);

    return () => {
      mountObserver.disconnect();
    };
  }, [videoSrc, isPriorityEffective, proximityMargin]);

  // Playback observer: Manage play/pause when mounted video enters/leaves the viewport
  useEffect(() => {
    if (!videoSrc || !shouldMountVideo) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

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
    };
  }, [videoSrc, shouldMountVideo]);

  const webpSrc = posterSrc ? posterSrc.replace(/\.jpg$/, '.webp').replace(/\.jpeg$/, '.webp') : null;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Background Media container with optional smooth parallax transform */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        {/* Optimized Image Layer (with WebP support and async decoding) */}
        {posterSrc && (
          <picture className="absolute inset-0 w-full h-full">
            {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
            <img
              src={posterSrc}
              alt={alt}
              loading={isPriorityEffective ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={isPriorityEffective ? 'high' : 'auto'}
              className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-700 ${
                videoSrc && isVideoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>
        )}

        {/* Video Layer — Rendered when videoSrc is passed and approached */}
        {videoSrc && shouldMountVideo && (
          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload={isPriorityEffective ? 'metadata' : 'none'}
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-700 ${
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

        {/* Multi-layer luxury dark shade gradients keeping text crisp & readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0912]/75 via-[#0c0912]/45 to-[#0c0912]/80" />

        {/* Soft radial vignette focusing user eye on central editorial typography */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0c0912_92%)] opacity-60" />

        {/* Atmospheric Medical Color Glows */}
        <div className={`atmosphere-glow w-[520px] h-[520px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[620px] h-[620px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </motion.div>
    </div>
  );
}
