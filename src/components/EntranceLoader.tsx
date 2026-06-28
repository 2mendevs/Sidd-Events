import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface EntranceLoaderProps {
  cmsData: CMSState;
  onComplete: () => void;
}

export default function EntranceLoader({ cmsData, onComplete }: EntranceLoaderProps) {
  const [phase, setPhase] = useState<'fade-in-tagline' | 'reveal-brand' | 'exit'>('fade-in-tagline');
  const [logoLoaded, setLogoLoaded] = useState(false);

  const brandName = cmsData.entranceSettings?.heading || cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.entranceSettings?.subtext || cmsData.navbar.logoSubtext || "EVENTS";
  const tagline = cmsData.entranceSettings?.tagline || "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND";

  // Use a stable ref for onComplete to prevent any inline function recreation from restarting the effect
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Stage 1: Display the cinematic tagline in the center with letter spacing expansion
    const brandRevealTimer = setTimeout(() => {
      setPhase('reveal-brand');
    }, 1200);

    // Stage 2: Display the grand brand logo & title
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 3200);

    // Stage 3: Finish and fade into the website
    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 3900);

    return () => {
      clearTimeout(brandRevealTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []); // Run EXACTLY ONCE on mount

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeInOut' }}
      className="fixed inset-0 z-[1000] w-full h-full bg-[#030303] flex items-center justify-center overflow-hidden select-none pointer-events-none"
    >
      {/* Royal ambient gold dust background effect */}
      <div className="absolute inset-0 bg-radial-gradient from-[rgba(197,142,55,0.04)] to-transparent opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* Cinematic wide screen letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black/95 border-b border-gold-500/5" />
      <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black/95 border-t border-gold-500/5" />

      {/* Centerpiece Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full text-center px-6">
        
        {/* Phase 1: Cinematic Ambient Tagline */}
        {phase === 'fade-in-tagline' && (
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.1em', filter: 'blur(4px)' }}
            animate={{ opacity: 1, letterSpacing: '0.3em', filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-[11px] md:text-xs font-mono font-light text-gold-400 uppercase tracking-[0.3em]"
          >
            {tagline}
          </motion.div>
        )}

        {/* Phase 2 & 3: The Royal Mirage Reveal */}
        {phase !== 'fade-in-tagline' && (
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Elegant luxury framing borders */}
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: '280px', height: '140px', opacity: 0.15 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute border border-gold-400 rounded"
            />

            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-6 space-y-4"
            >
              {/* Render custom logo only if uploaded, otherwise hide completely */}
              {cmsData.navbar.logoImage && (
                <div className="mb-1">
                  <Logo 
                    size="lg" 
                    showText={false}
                    logoImage={cmsData.navbar.logoImage}
                    onLoad={() => setLogoLoaded(true)}
                  />
                </div>
              )}

              {/* Grand Elegant Typography Title */}
              <h1 className="font-display font-semibold text-2xl md:text-3xl tracking-[0.3em] text-white uppercase leading-none drop-shadow-lg">
                {brandName}
              </h1>

              {/* Subtext Accent */}
              <div className="flex items-center justify-center gap-2 text-[10px] text-gold-400 font-mono tracking-[0.4em] uppercase font-light">
                <Sparkles size={10} className="text-gold-400/50 animate-pulse" />
                <span>{subtext}</span>
                <Sparkles size={10} className="text-gold-400/50 animate-pulse" />
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
