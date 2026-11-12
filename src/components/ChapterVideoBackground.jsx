import React, { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeviceProfile } from '../hooks/useDeviceProfile';

/**
 * High-Performance Cinematic Background (Media / Video / Image)
 * Memory & GPU Optimized while preserving Light & Dark modes:
 * - Renders lightweight WebP/JPEG <picture> with lazy decoding across all sections.
 * - Desktop Hero: Mounts <video> while within retentionMargin and pauses when off-screen.
 * - Mobile (< 768px): Plays Hero video only while Hero is in view at top; immediately
 *   releases & swaps back to lightweight static WebP image the moment the user scrolls down
 *   to another section. Low-power / Save-Data devices render static WebP immediately.
 */
function ChapterVideoBackground({
  videoSrc = null,
  posterSrc,
  alt = 'Health Lines Center Women Physical Therapy Sanctuary',
  glowClass = 'bg-[#9d237a]/25',
  glowSecondaryClass = 'bg-[#84cc16]/20',
  brightness = 'brightness-[0.65]',
  contrast = 'contrast-[1.05]',
  parallaxY = null,
  scale = 'md:scale-105',
  isPriority = false,
  priority = false,
  retentionMargin = '500px 0px 500px 0px',
}) {
  const isPriorityEffective = isPriority || priority;
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const { isMobile, isWeakOrSaveData, shouldDisableVideo } = useDeviceProfile();

  const [shouldMountVideo, setShouldMountVideo] = useState(
    Boolean(videoSrc) && isPriorityEffective && !shouldDisableVideo
  );
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Release decoded video frames immediately when scrolled away (stricter on mobile)
  useEffect(() => {
    if (!videoSrc || shouldDisableVideo) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) return undefined;

    const retentionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMountVideo(true);
          } else {
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
        rootMargin: isMobile ? '0px' : retentionMargin,
        threshold: isMobile ? 0.05 : 0,
      }
    );

    retentionObserver.observe(container);
    return () => retentionObserver.disconnect();
  }, [videoSrc, shouldDisableVideo, isMobile, retentionMargin]);

  // Playback Observer + fast readiness detection
  useEffect(() => {
    if (!videoSrc || !shouldMountVideo || shouldDisableVideo) return undefined;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return undefined;

    let isSubscribed = true;

    // Ensure mobile browsers / iOS WebViews recognize muted inline autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      if (!isSubscribed) return;
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    const markReady = () => {
      if (isSubscribed) {
        setIsVideoLoaded(true);
        tryPlay();
      }
    };

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isSubscribed) return;
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: isMobile ? '0px' : '120px 0px 120px 0px',
        threshold: 0.05,
      }
    );

    playbackObserver.observe(container);

    if (video.readyState >= 2) {
      queueMicrotask(markReady);
    } else {
      video.addEventListener('loadeddata', markReady);
      video.addEventListener('canplay', markReady);
      video.addEventListener('playing', markReady);
    }

    tryPlay();

    return () => {
      isSubscribed = false;
      playbackObserver.disconnect();
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('playing', markReady);
      video.pause();
    };
  }, [videoSrc, shouldMountVideo, shouldDisableVideo, isMobile]);

  const webpSrc = posterSrc
    ? posterSrc.replace(/\.jpg$/i, '.webp').replace(/\.jpeg$/i, '.webp')
    : null;

  const WrapperTag = parallaxY && !isMobile && !isWeakOrSaveData ? motion.div : 'div';
  const wrapperProps =
    parallaxY && !isMobile && !isWeakOrSaveData ? { style: { y: parallaxY } } : {};

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <WrapperTag className="absolute inset-0 w-full h-full" {...wrapperProps}>
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
                videoSrc && !shouldDisableVideo && shouldMountVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>
        )}

        {/* Video Layer — Mounted only while Hero is in view */}
        {videoSrc && shouldMountVideo && !shouldDisableVideo && (
          <video
            ref={videoRef}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload={isPriorityEffective ? 'auto' : 'metadata'}
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

        {/* Multi-layer theme-adaptive gradients keeping text crisp & underlying media clearly visible in Light Mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9fc]/60 via-[#fbf3fb]/34 to-[#fcf9fc]/65 dark:from-[#271136]/72 dark:via-[#3d1649]/45 dark:to-[#212e21]/76 transition-colors duration-500" />

        {/* Soft radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,rgba(249,240,249,0.44)_92%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,#241033_92%)] opacity-55 dark:opacity-65" />

        {/* Atmospheric Medical Color Glows */}
        <div className={`atmosphere-glow w-[260px] h-[260px] sm:w-[480px] sm:h-[480px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[280px] h-[280px] sm:w-[560px] sm:h-[560px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </WrapperTag>
    </div>
  );
}

export default memo(ChapterVideoBackground);
