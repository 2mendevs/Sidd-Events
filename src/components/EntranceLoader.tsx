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
  const [phase, setPhase] = useState<'fade-in-tagline' | 'reveal-brand'>('fade-in-tagline');

  const brandName = cmsData.entranceSettings?.heading || cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.entranceSettings?.subtext || cmsData.navbar.logoSubtext || "EVENTS";
  const tagline = cmsData.entranceSettings?.tagline || "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND";

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Stage 1: Display the cinematic tagline
    const brandRevealTimer = setTimeout(() => {
      setPhase('reveal-brand');
    }, 1300);

    // Stage 2: Let the user absorb the brand identity, then complete
    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 3500);

    return () => {
      clearTimeout(brandRevealTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.01,
        transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] } 
      }}
      className="fixed inset-0 z-[1000] w-full h-full bg-[#030303] flex items-center justify-center overflow-hidden select-none pointer-events-none transform-gpu"
    >
      {/* Royal ambient gold dust background effect */}
      <div className="absolute inset-0 bg-radial-gradient from-[rgba(197,142,55,0.03)] to-transparent opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.01]" />

      {/* Cinematic wide screen letterbox bars (optimized scale for mobile screens) */}
      <div className="absolute top-0 left-0 right-0 h-[4vh] sm:h-[6vh] md:h-[8vh] bg-black/95 border-b border-gold-500/5 z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[4vh] sm:h-[6vh] md:h-[8vh] bg-black/95 border-t border-gold-500/5 z-20" />

      {/* Centerpiece Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full text-center px-4 sm:px-6">
        
        {/* Phase 1: Cinematic Ambient Tagline */}
        {phase === 'fade-in-tagline' && (
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.1em', y: 5 }}
            animate={{ opacity: 1, letterSpacing: '0.22em', y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-[10px] sm:text-xs font-mono font-light text-gold-400 uppercase tracking-[0.18em] sm:tracking-[0.3em] max-w-xs sm:max-w-md px-4 leading-relaxed transform-gpu"
          >
            {tagline}
          </motion.div>
        )}

        {/* Phase 2: The Royal Mirage Reveal */}
        {phase === 'reveal-brand' && (
          <div className="relative flex flex-col items-center justify-center w-full transform-gpu">
            
            {/* Elegant luxury framing borders (optimized responsiveness for both mobile & laptops) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute border border-gold-400 rounded w-[260px] h-[130px] sm:w-[320px] sm:h-[150px] md:w-[360px] md:h-[170px]"
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center p-4 sm:p-6 space-y-3 sm:space-y-4"
            >
              {/* Custom Logo Image - loaded directly with elegant opacity transition */}
              {cmsData.navbar.logoImage && (
                <div className="mb-0.5 sm:mb-1">
                  <Logo 
                    size="lg" 
                    showText={false}
                    logoImage={cmsData.navbar.logoImage}
                  />
                </div>
              )}

              {/* Grand Elegant Typography Title */}
              <h1 className="font-display font-semibold text-lg sm:text-2xl md:text-3xl tracking-[0.2em] sm:tracking-[0.32em] text-white uppercase leading-none drop-shadow-xl px-2">
                {brandName}
              </h1>

              {/* Subtext Accent */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gold-400 font-mono tracking-[0.25em] sm:tracking-[0.4em] uppercase font-light">
                <Sparkles size={8} className="text-gold-400/40 animate-pulse" />
                <span>{subtext}</span>
                <Sparkles size={8} className="text-gold-400/40 animate-pulse" />
              </div>
            </motion.div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
