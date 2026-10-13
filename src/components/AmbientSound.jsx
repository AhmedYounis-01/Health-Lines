import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientSound({ t }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    // Create audio instance with soothing spa ambient music
    const audio = new Audio('/audio/placid-ambient.ogg');
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const startAmbientAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    audio.volume = 0;
    audio.play().then(() => {
      setIsPlaying(true);
      // Smooth fade-in to comfortable, gentle 0.28 volume
      let vol = 0;
      fadeIntervalRef.current = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.28) {
          audio.volume = 0.28;
          clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = vol;
        }
      }, 80);
    }).catch((err) => {
      console.warn("Audio play prevented:", err);
    });
  };

  const stopAmbientAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    let vol = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      vol -= 0.04;
      if (vol <= 0.01) {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeIntervalRef.current);
        setIsPlaying(false);
      } else {
        audio.volume = Math.max(0, vol);
      }
    }, 60);
  };

  const toggleSound = () => {
    if (!isPlaying) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
  };

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={isPlaying ? t.soundOff : t.soundOn}
      className="fixed bottom-24 left-6 z-40 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full glass-card border border-white/10 hover:border-[#84cc16]/40 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl text-slate-300 hover:text-white backdrop-blur-md cursor-pointer"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3.5">
            <span className="w-1 bg-[#84cc16] rounded-full animate-pulse h-2.5"></span>
            <span className="w-1 bg-[#d946ef] rounded-full animate-pulse h-3.5 delay-75"></span>
            <span className="w-1 bg-[#84cc16] rounded-full animate-pulse h-1.5 delay-150"></span>
          </div>
          <Volume2 className="w-3.5 h-3.5 text-[#84cc16]" />
          <span className="font-medium text-[#84cc16]">{t.soundOn}</span>
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
