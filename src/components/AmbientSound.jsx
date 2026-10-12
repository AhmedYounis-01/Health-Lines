import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSound({ t }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscNodesRef = useRef([]);

  const toggleSound = () => {
    if (!isPlaying) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
  };

  const startAmbientAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create soothing multi-frequency binaural drone (warm, calm, zen spa frequencies: 108Hz, 216Hz, 432Hz)
      const freqs = [108, 162, 216, 432];
      const oscs = freqs.map((freq) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        osc.connect(filter);
        if (panner) {
          panner.pan.value = (Math.random() - 0.5) * 0.8;
          filter.connect(panner);
          panner.connect(masterGain);
        } else {
          filter.connect(masterGain);
        }

        osc.start();
        return osc;
      });

      oscNodesRef.current = oscs;
      setIsPlaying(true);
    } catch (e) {
      console.warn("Web Audio autoplay policy:", e);
    }
  };

  const stopAmbientAudio = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      setTimeout(() => {
        oscNodesRef.current.forEach((osc) => {
          try { osc.stop(); } catch {}
        });
        oscNodesRef.current = [];
        if (ctx.state !== 'closed') {
          ctx.close();
        }
        setIsPlaying(false);
      }, 1200);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={isPlaying ? t.soundOff : t.soundOn}
      className="fixed bottom-5 right-5 rtl:right-auto rtl:left-5 z-40 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass-card border border-white/10 hover:border-emerald-400/40 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl text-slate-300 hover:text-white backdrop-blur-md"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-2.5"></span>
            <span className="w-1 bg-emerald-300 rounded-full animate-pulse h-3.5 delay-75"></span>
            <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-1.5 delay-150"></span>
          </div>
          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-medium text-emerald-400">{t.soundOn}</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.soundOff}</span>
        </>
      )}
    </button>
  );
}
