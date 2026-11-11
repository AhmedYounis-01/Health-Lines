import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const TARGET_VOLUME = 0.42;
const FADE_IN_MS = 450;
const FADE_OUT_MS = 180;

/**
 * Sanctuary Ambient Sound Component
 * Plays a lightweight (~245 KB), seamlessly crossfaded spa music loop (`preload="none"`)
 * with instant playback inside user gesture, smooth volume fades, race-condition-safe
 * toggle state, and a gentle harmonic Web Audio fallback only on media load failure.
 */
function AmbientSound({ t }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const fadeFinishTimeoutRef = useRef(null);
  const playRequestIdRef = useRef(0);

  // Fallback gentle Web Audio chime/pad refs (used only if <audio> playback fails)
  const fallbackCtxRef = useRef(null);
  const fallbackGainRef = useRef(null);
  const fallbackOscsRef = useRef([]);
  const fallbackCleanupTimerRef = useRef(null);

  const cancelFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
    if (fadeFinishTimeoutRef.current) {
      clearTimeout(fadeFinishTimeoutRef.current);
      fadeFinishTimeoutRef.current = null;
    }
  }, []);

  const stopFallbackAudio = useCallback(() => {
    try {
      if (fallbackCleanupTimerRef.current) {
        clearTimeout(fallbackCleanupTimerRef.current);
        fallbackCleanupTimerRef.current = null;
      }
      if (fallbackGainRef.current && fallbackCtxRef.current) {
        const ctx = fallbackCtxRef.current;
        fallbackGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
        fallbackGainRef.current.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.08);
      }
      const oscsToStop = fallbackOscsRef.current;
      fallbackOscsRef.current = [];
      fallbackCleanupTimerRef.current = setTimeout(() => {
        oscsToStop.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
      }, 180);
    } catch {
      // Ignore cleanup errors
    }
  }, []);

  const startFallbackAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return false;

      if (fallbackCleanupTimerRef.current) {
        clearTimeout(fallbackCleanupTimerRef.current);
        fallbackCleanupTimerRef.current = null;
      }

      if (!fallbackCtxRef.current || fallbackCtxRef.current.state === 'closed') {
        fallbackCtxRef.current = new AudioCtx();
      }
      const ctx = fallbackCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      fallbackOscsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore
        }
      });

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.9);
      masterGain.connect(ctx.destination);
      fallbackGainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, ctx.currentTime);
      filter.connect(masterGain);

      // Gentle warm major-9th spa pad only when HTML5 audio cannot load
      const oscs = [220.0, 277.18, 329.63, 493.88].map((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        const g = ctx.createGain();
        g.gain.setValueAtTime(idx === 0 ? 0.3 : 0.16, ctx.currentTime);
        osc.connect(g);
        g.connect(filter);
        osc.start();
        return osc;
      });

      fallbackOscsRef.current = oscs;
      return true;
    } catch {
      return false;
    }
  }, []);

  const rampAudioVolume = useCallback(
    (audio, targetVolume, durationMs, requestId, onComplete) => {
      cancelFade();
      let startVol = TARGET_VOLUME;
      try {
        startVol = audio.volume;
      } catch {
        onComplete?.();
        return;
      }

      const startTime = performance.now();
      const finish = () => {
        cancelFade();
        if (playRequestIdRef.current !== requestId) return;
        try {
          audio.volume = targetVolume;
        } catch {
          // Ignore read-only volume browsers
        }
        onComplete?.();
      };

      fadeTimerRef.current = setInterval(() => {
        if (playRequestIdRef.current !== requestId) {
          cancelFade();
          return;
        }
        const elapsed = performance.now() - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = 1 - Math.pow(1 - progress, 2);
        try {
          audio.volume = Math.max(0, Math.min(1, startVol + (targetVolume - startVol) * eased));
        } catch {
          // Some mobile browsers treat volume as read-only
        }

        if (progress >= 1) {
          finish();
        }
      }, 20);

      fadeFinishTimeoutRef.current = setTimeout(finish, durationMs + 25);
    },
    [cancelFade]
  );

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      playRequestIdRef.current += 1;
      cancelFade();
      if (audioEl) {
        audioEl.pause();
      }
      stopFallbackAudio();
      if (fallbackCtxRef.current && fallbackCtxRef.current.state !== 'closed') {
        fallbackCtxRef.current.close().catch(() => {});
      }
    };
  }, [cancelFade, stopFallbackAudio]);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    const requestId = ++playRequestIdRef.current;

    if (!isPlaying) {
      stopFallbackAudio();
      if (!audio) {
        const started = startFallbackAudio();
        setIsPlaying(started);
        return;
      }

      try {
        audio.volume = 0;
      } catch {
        // Ignore read-only volume browsers
      }

      setIsPlaying(true);
      const playPromise = audio.play();

      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            if (playRequestIdRef.current !== requestId) {
              audio.pause();
              return;
            }
            rampAudioVolume(audio, TARGET_VOLUME, FADE_IN_MS, requestId);
          })
          .catch((err) => {
            if (playRequestIdRef.current !== requestId) return;
            if (err && err.name === 'AbortError') return;
            const started = startFallbackAudio();
            setIsPlaying(started);
          });
      } else {
        rampAudioVolume(audio, TARGET_VOLUME, FADE_IN_MS, requestId);
      }
    } else {
      setIsPlaying(false);
      stopFallbackAudio();
      if (audio && !audio.paused) {
        rampAudioVolume(audio, 0, FADE_OUT_MS, requestId, () => {
          if (playRequestIdRef.current === requestId) {
            audio.pause();
          }
        });
      }
    }
  }, [isPlaying, rampAudioVolume, startFallbackAudio, stopFallbackAudio]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/sanctuary-ambient.mp3"
        loop
        preload="none"
        playsInline
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isPlaying ? t.soundOff : t.soundOn}
        className={`fixed bottom-[18px] left-[72px] md:bottom-24 md:left-6 z-40 flex items-center gap-2 px-3 md:px-3.5 h-11 md:h-auto md:py-2 rounded-full glass-card border transition-all duration-300 md:hover:scale-105 shadow-lg md:shadow-xl md:backdrop-blur-xl cursor-pointer ${
          isPlaying
            ? 'border-[#629131]/55 dark:border-lime-400/50 bg-[#eef7e6]/72 dark:bg-[#22351b]/80 text-[#355e0d] dark:text-lime-300 shadow-[0_0_25px_rgba(98,145,49,0.2)]'
            : 'border-[#9d237a]/22 dark:border-fuchsia-300/20 hover:border-[#9d237a]/45 dark:hover:border-fuchsia-400/45 text-[#2e1f3f] dark:text-slate-200 hover:text-[#170a24] dark:hover:text-white'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5" aria-hidden="true">
              <span className="w-1 bg-[#629131] dark:bg-lime-400 rounded-full animate-pulse h-2.5" />
              <span className="w-1 bg-[#9d237a] dark:bg-fuchsia-400 rounded-full animate-pulse h-3.5 delay-75" />
              <span className="w-1 bg-[#629131] dark:bg-lime-400 rounded-full animate-pulse h-2 delay-150" />
            </div>
            <Volume2 className="w-3.5 h-3.5 text-[#629131] dark:text-lime-400" />
            <span className="text-[11px] sm:text-xs font-arabic font-semibold text-[#3f6418] dark:text-lime-300">
              {t.soundOn}
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#6b5c7a] dark:text-slate-300" />
            <span className="text-[11px] sm:text-xs font-arabic font-medium text-[#4a3b59] dark:text-slate-200">
              {t.soundOff}
            </span>
          </>
        )}
      </button>
    </>
  );
}

export default memo(AmbientSound);
