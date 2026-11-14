import React, { memo, useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useDeviceProfile } from '../hooks/useDeviceProfile';

/**
 * High-Performance Dual-Video Cinematic Background
 * Sequential Playback:
 * - Stage 1: Video 1 (Jeddah City) plays first.
 * - Stage 2: Smooth crossfade into Video 2 (Clinic Sanctuary), which loops continuously.
 * - Fully hardware-accelerated with CSS opacity crossfade.
 * - Mobile & weak-device aware: pauses off-screen, releases decoders when scrolled away.
 */
function ChapterVideoBackground({
  videoSequence = null, // Array: [{ src, duration, label }, { src, loop: true, label }]
  videoSrc = null,      // Fallback single video string or array
  posterSrc,
  alt = 'Health Lines Center Physical Therapy & Rehabilitation',
  glowClass = 'bg-[#9d237a]/25',
  glowSecondaryClass = 'bg-[#629131]/20',
  brightness = 'brightness-[1.0] dark:brightness-[0.72]',
  contrast = 'contrast-[1.0] dark:contrast-[1.02]',
  parallaxY = null,
  scale = '',
  isPriority = false,
  priority = false,
  retentionMargin = '500px 0px 500px 0px',
  onSequenceChange = null,
}) {
  const isPriorityEffective = isPriority || priority;
  const containerRef = useRef(null);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  const { isMobile, isWeakOrSaveData, shouldDisableVideo } = useDeviceProfile();

  // Active video sequence memoized to prevent unnecessary hook re-evaluation
  const sequence = useMemo(() => {
    return videoSequence || (videoSrc ? [{ src: videoSrc, loop: true }] : null);
  }, [videoSequence, videoSrc]);
  const hasDualVideo = Array.isArray(sequence) && sequence.length > 1;

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [shouldMountVideo, setShouldMountVideo] = useState(
    Boolean(sequence) && isPriorityEffective && !shouldDisableVideo
  );
  const [isVideo1Loaded, setIsVideo1Loaded] = useState(false);
  const [isVideo2Loaded, setIsVideo2Loaded] = useState(false);

  // Transition to next video in sequence
  const transitionToNextVideo = useCallback(() => {
    if (!hasDualVideo) return;
    setActiveVideoIndex(1);
    const v2 = video2Ref.current;
    if (v2) {
      v2.play().catch(() => {});
    }
    if (onSequenceChange) {
      onSequenceChange(1);
    }
  }, [hasDualVideo, onSequenceChange]);

  // Release video decoders when completely scrolled off-screen
  useEffect(() => {
    if (!sequence || shouldDisableVideo) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const retentionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMountVideo(true);
          } else {
            const v1 = video1Ref.current;
            const v2 = video2Ref.current;
            if (v1) {
              v1.pause();
              v1.removeAttribute('src');
              v1.querySelectorAll('source').forEach((s) => s.removeAttribute('src'));
              v1.load();
            }
            if (v2) {
              v2.pause();
              v2.removeAttribute('src');
              v2.querySelectorAll('source').forEach((s) => s.removeAttribute('src'));
              v2.load();
            }
            setIsVideo1Loaded(false);
            setIsVideo2Loaded(false);
            setShouldMountVideo(false);
          }
        });
      },
      {
        root: null,
        rootMargin: isMobile ? '0px' : retentionMargin,
        threshold: isMobile ? 0.25 : 0,
      }
    );

    retentionObserver.observe(container);
    return () => retentionObserver.disconnect();
  }, [sequence, shouldDisableVideo, isMobile, retentionMargin]);

  // Playback observer & timer for dual video transition
  useEffect(() => {
    if (!sequence || !shouldMountVideo || shouldDisableVideo) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    let isSubscribed = true;
    let timerId = null;

    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    const markV1Ready = () => {
      if (isSubscribed) setIsVideo1Loaded(true);
    };
    const markV2Ready = () => {
      if (isSubscribed) setIsVideo2Loaded(true);
    };

    if (v1) {
      if (v1.readyState >= 2) markV1Ready();
      else {
        v1.addEventListener('loadeddata', markV1Ready);
        v1.addEventListener('playing', markV1Ready);
      }
    }
    if (v2) {
      if (v2.readyState >= 2) markV2Ready();
      else {
        v2.addEventListener('loadeddata', markV2Ready);
        v2.addEventListener('playing', markV2Ready);
      }
    }

    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isSubscribed) return;
          if (entry.isIntersecting) {
            if (activeVideoIndex === 0 && v1) {
              v1.play().catch(() => {});
            } else if (activeVideoIndex === 1 && v2) {
              v2.play().catch(() => {});
            }
          } else {
            if (v1) v1.pause();
            if (v2) v2.pause();
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

    // If dual video, schedule crossfade after duration (default 5.5s)
    if (hasDualVideo && activeVideoIndex === 0) {
      const v1Duration = sequence[0]?.duration || 5.5;
      timerId = setTimeout(() => {
        if (isSubscribed) {
          transitionToNextVideo();
        }
      }, v1Duration * 1000);
    }

    return () => {
      isSubscribed = false;
      if (timerId) clearTimeout(timerId);
      playbackObserver.disconnect();
      if (v1) {
        v1.removeEventListener('loadeddata', markV1Ready);
        v1.removeEventListener('playing', markV1Ready);
        v1.pause();
      }
      if (v2) {
        v2.removeEventListener('loadeddata', markV2Ready);
        v2.removeEventListener('playing', markV2Ready);
        v2.pause();
      }
    };
  }, [sequence, shouldMountVideo, shouldDisableVideo, isMobile, activeVideoIndex, hasDualVideo, transitionToNextVideo]);

  const webpSrc = posterSrc
    ? posterSrc.replace(/\.jpg$/i, '.webp').replace(/\.jpeg$/i, '.webp')
    : null;

  const WrapperTag = parallaxY && !isMobile && !isWeakOrSaveData ? motion.div : 'div';
  const wrapperProps =
    parallaxY && !isMobile && !isWeakOrSaveData ? { style: { y: parallaxY } } : {};

  const v1Config = sequence?.[0];
  const v2Config = sequence?.[1];

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <WrapperTag className="absolute inset-0 w-full h-full" {...wrapperProps}>
        {/* Optimized Static Image Fallback */}
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
                shouldMountVideo && (isVideo1Loaded || isVideo2Loaded) ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>
        )}

        {/* Video 1: Jeddah City / First Clip */}
        {v1Config && shouldMountVideo && !isWeakOrSaveData && (
          <video
            ref={video1Ref}
            poster={posterSrc}
            autoPlay
            muted
            playsInline
            preload={isPriorityEffective ? 'auto' : 'metadata'}
            aria-hidden="true"
            onEnded={() => transitionToNextVideo()}
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-1000 ${
              isVideo1Loaded && activeVideoIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {Array.isArray(v1Config.src) ? (
              v1Config.src.map((src) => (
                <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
              ))
            ) : (
              <source src={v1Config.src} type={v1Config.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            )}
          </video>
        )}

        {/* Video 2: Clinic Sanctuary / Second Clip */}
        {v2Config && shouldMountVideo && !isWeakOrSaveData && (
          <video
            ref={video2Ref}
            autoPlay={activeVideoIndex === 1}
            muted
            loop={v2Config.loop ?? true}
            playsInline
            preload="metadata"
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center ${brightness} ${contrast} ${scale} transition-opacity duration-1000 ${
              isVideo2Loaded && activeVideoIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {Array.isArray(v2Config.src) ? (
              v2Config.src.map((src) => (
                <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
              ))
            ) : (
              <source src={v2Config.src} type={v2Config.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            )}
          </video>
        )}

        {/* Multi-layer theme-adaptive scrim ensuring text legibility over city & clinic media */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcf9fc]/50 via-[#fbf3fb]/15 to-[#fcf9fc]/55 dark:from-[#1b0826]/85 dark:via-[#2b0c33]/55 dark:to-[#121c0f]/85 transition-colors duration-500" />

        {/* Soft radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(249,240,249,0.25)_95%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,#15051f_95%)] opacity-50 dark:opacity-70" />

        {/* Atmospheric Medical Color Glows */}
        <div className={`atmosphere-glow w-[260px] h-[260px] sm:w-[480px] sm:h-[480px] -top-24 -left-24 ${glowClass}`} />
        <div className={`atmosphere-glow w-[280px] h-[280px] sm:w-[560px] sm:h-[560px] -bottom-32 -right-32 ${glowSecondaryClass}`} />
      </WrapperTag>
    </div>
  );
}

export default memo(ChapterVideoBackground);
