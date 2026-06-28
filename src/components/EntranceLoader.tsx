import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface EntranceLoaderProps {
  cmsData: CMSState;
  onComplete: () => void;
}

export default function EntranceLoader({ cmsData, onComplete }: EntranceLoaderProps) {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [phase, setPhase] = useState<'bloom' | 'expand' | 'reveal' | 'exit'>('bloom');

  const brandName = cmsData.entranceSettings?.heading || cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.entranceSettings?.subtext || cmsData.navbar.logoSubtext || "EVENTS";
  const tagline = cmsData.entranceSettings?.tagline || "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND";

  useEffect(() => {
    // Stage 1: Central dot blooms into a horizon thread
    const bloomTimer = setTimeout(() => {
      setPhase('expand');
    }, 400);

    // Stage 2: Golden thread expands horizontally
    const expandTimer = setTimeout(() => {
      setPhase('reveal');
    }, 1000);

    // Stage 3: The final exit sequence starts
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2400);

    // Stage 4: Trigger parent complete when animation ends
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    // Safe unblock fallback if anything prevents render
    const fallbackTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(bloomTimer);
      clearTimeout(expandTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] w-full h-full overflow-hidden bg-black select-none pointer-events-none">
      {/* Cinematic Golden Aura background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#020202]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,142,55,0.06)_0%,transparent_70%)]" />

      {/* Theatrical Upper and Lower Matte Curtains that split open during 'exit' */}
      <motion.div
        initial={{ y: '0%' }}
        animate={phase === 'exit' ? { y: '-100%' } : { y: '0%' }}
        transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#030303] z-20 border-b border-gold-500/5 transform-gpu"
      />
      <motion.div
        initial={{ y: '0%' }}
        animate={phase === 'exit' ? { y: '100%' } : { y: '0%' }}
        transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#030303] z-20 border-t border-gold-500/5 transform-gpu"
      />

      {/* Main Cinematic stage */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4">
        
        {/* Step 1: Central Golden Bloom Star Point */}
        {phase === 'bloom' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.3, 1], opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 shadow-[0_0_20px_#dfc27d]"
          />
        )}

        {/* Step 2: Horizon Line Thread & Logo Reveal */}
        {phase !== 'bloom' && (
          <div className="relative flex flex-col items-center justify-center w-full max-w-xl">
            
            {/* Elegant Horizontal Golden Thread */}
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: phase === 'expand' ? '40%' : '100%' }}
              transition={{ duration: phase === 'expand' ? 0.6 : 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gold-400/80 to-transparent relative my-8"
            >
              {/* Central glowing micro dot on the line */}
              <motion.div 
                animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-200 shadow-[0_0_12px_#dfc27d]"
              />
            </motion.div>

            {/* Logo Masked Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={phase === 'reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-32 flex flex-col items-center"
            >
              <div className="relative p-1">
                <Logo 
                  size="lg" 
                  showText={false}
                  logoImage={cmsData.navbar.logoImage}
                  onLoad={() => setIsLogoLoaded(true)}
                />
              </div>
            </motion.div>

            {/* Wordmark and Tagline Masked Entrance */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={phase === 'reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="absolute top-12 flex flex-col items-center space-y-3"
            >
              <h1 className="font-display font-bold text-xl md:text-2xl tracking-[0.4em] text-white uppercase select-none text-center">
                {brandName}
              </h1>
              
              {/* Premium Subtext */}
              <div className="text-[9px] text-gold-400/80 font-mono uppercase tracking-[0.4em] font-light flex items-center gap-1.5 select-none">
                <Sparkles size={8} className="text-gold-400/60 animate-pulse" />
                {subtext}
                <Sparkles size={8} className="text-gold-400/60 animate-pulse" />
              </div>
            </motion.div>

          </div>
        )}

      </div>

      {/* Decorative Widescreen Overlay borders for cinema feels */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-black/80 z-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/80 z-40 pointer-events-none" />
    </div>
  );
}
