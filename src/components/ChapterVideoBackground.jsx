import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic video background with True Lazy DOM Mounting
 * Features:
 * - Deferred DOM mounting: Off-screen chapters never mount <video> until user approaches in viewport
 * - Priority flag: Hero chapter mounts immediately for instant above-the-fold impact
 * - Eliminates browser HTTP/1.1 connection pool starvation on localhost
 * - Graceful poster image fallback while video is unmounted or buffering
 * - IntersectionObserver play/pause lifecycle to release GPU memory when off-screen
 * - Multi-layer dark shade gradients ensuring luxury contrast and legibility
 */
export default function ChapterVideoBackground({
  videoSrc,
  posterSrc,
  alt = 'Health Lines Center Cinematic Ambience',
  glowClass = 'bg-[#9d237a]/25',
  glowSecondaryClass = 'bg-[#84cc16]/20',
  brightness = 'brightness-[0.50]',
  contrast = 'contrast-[1.05]',
  parallaxY = null,
  scale = 'scale-105',
  priority = false,
  proximityMargin = '350px 0px 350px 0px',
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [shouldMountVideo, setShouldMountVideo] = useState(priority);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Proximity observer: Mount <video> DOM node only when user approaches the chapter
  useEffect(() => {
    if (priority) return;

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
  }, [priority, proximityMargin]);

  // Playback observer: Manage play/pause when mounted video enters/leaves the viewport
  useEffect(() => {
    if (!shouldMountVideo) return;

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
              // Autoplay policy or low power mode - caught silently
            });
          } else {
            video.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: '100px 0px 100px 0px',
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
  }, [shouldMountVideo]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Background Media with optional parallax transform */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={parallaxY ? { y: parallaxY } : undefined}
      >
        {/* Fallback Poster Image - Always rendered, acts as instant placeholder */}
        {posterSrc && (
          <img
            src={posterSrc}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Cinematic Looping Ambient Video - Mounted only when in proximity */}
        {videoSrc && shouldMountVideo && (
          <video
            ref={videoRef}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
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

        {/* Semi-transparent Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0912]/60 via-[#0c0912]/30 to-[#0c0912]/65" />

        {/* Soft Radial Depth Vignette for Edge Focus */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0c0912_90%)] opacity-50" />

        {/* Atmospheric Color Glows */}
        <div className={`atmosphere-glow w-[550px] h-[550px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[650px] h-[650px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </motion.div>
    </div>
  );
}
