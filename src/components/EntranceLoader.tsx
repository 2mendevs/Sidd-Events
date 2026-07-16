import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface EntranceLoaderProps {
  cmsData: CMSState;
  onComplete: () => void;
}

export default function EntranceLoader({ cmsData, onComplete }: EntranceLoaderProps) {
  const [phase, setPhase] = useState<'tagline' | 'brand'>('tagline');

  const brandName = cmsData.entranceSettings?.heading || cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.entranceSettings?.subtext || cmsData.navbar.logoSubtext || "EVENTS";
  const tagline = cmsData.entranceSettings?.tagline || "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND";

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Switch to brand reveal after the cinematic tagline intro
    const brandRevealTimer = setTimeout(() => {
      setPhase('brand');
    }, 1800);

    // Complete the beautiful sequence and enter the site
    const completeTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 4800);

    return () => {
      clearTimeout(brandRevealTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  // Generate deterministic golden particle coordinates for a premium aesthetic
  const particles = Array.from({ length: 18 }).map((_, i) => ({
    id: i,
    left: `${(i * 7 + 11) % 100}%`,
    size: ((i * 3 + 1) % 3) + 1.5, // 1.5px to 3.5px
    delay: (i * 0.23) % 2.5,
    duration: ((i * 1.7) % 3) + 4, // 4s to 7s
  }));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.02,
        filter: 'blur(8px)',
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[1000] w-full h-[100dvh] bg-[#020202] flex items-center justify-center overflow-hidden select-none pointer-events-auto transform-gpu font-sans"
    >
      {/* 1. Ambient Moving Spotlight & Background Glare */}
      <motion.div 
        animate={{
          background: [
            'radial-gradient(circle at 45% 45%, rgba(197, 142, 55, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 55% 55%, rgba(197, 142, 55, 0.07) 0%, transparent 60%)',
            'radial-gradient(circle at 45% 55%, rgba(197, 142, 55, 0.05) 0%, transparent 60%)',
            'radial-gradient(circle at 45% 45%, rgba(197, 142, 55, 0.05) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />

      {/* 2. Floating Golden Cinematic Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-b from-amber-200 to-gold-500 opacity-25 blur-[0.3px]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              bottom: '-20px',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: '-115dvh',
              opacity: [0, 0.35, 0.35, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* 3. Theatrical Wide-Screen Letterbox Bars */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: '7vh' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 bg-black/95 border-b border-gold-500/10 z-20 hidden sm:block" 
      />
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: '7vh' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 bg-black/95 border-t border-gold-500/10 z-20 hidden sm:block" 
      />

      {/* 4. Centerpiece Timed Sequence Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-xl w-full text-center px-6">
        <AnimatePresence mode="wait">
          
          {/* Phase 1: Majestic Expanding Tagline & Central Horizon Line */}
          {phase === 'tagline' && (
            <motion.div
              key="tagline-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.45, ease: 'easeInOut' } }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {/* Sleek Golden Drawing Line */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80px', opacity: 0.4 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />

              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.12em', y: 8 }}
                animate={{ opacity: 1, letterSpacing: '0.28em', y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-[10px] sm:text-xs font-mono font-light text-gold-400/90 uppercase tracking-[0.2em] sm:tracking-[0.32em] max-w-md px-4 leading-relaxed transform-gpu"
              >
                {tagline}
              </motion.div>

              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '80px', opacity: 0.4 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"
              />
            </motion.div>
          )}

          {/* Phase 2: The Royal Crest & Brand Reveal */}
          {phase === 'brand' && (
            <motion.div
              key="brand-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative flex flex-col items-center justify-center w-full py-10 px-8 transform-gpu"
            >
              
              {/* Exquisite SVG drawn double-border frame with corner crest accents */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Outermost border */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 border border-gold-400/80 rounded"
                />

                {/* Innermost refined double border */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="absolute inset-2 border border-dashed border-gold-500/40 rounded"
                />

                {/* Glowing Corner Accents */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                >
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-gold-400" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-gold-400" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-gold-400" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-gold-400" />
                </motion.div>
              </div>

              {/* Central Content */}
              <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 z-10">
                
                {/* 1. Custom Logo loaded from local git repo path with royal lift animation */}
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="mb-1"
                >
                  <div className="relative p-1">
                    {/* Golden Backlight halo glow */}
                    <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-xl animate-pulse" />
                    <Logo 
                      size="lg" 
                      showText={false}
                      logoImage="/custom_entrance_logo.png"
                    />
                  </div>
                </motion.div>

                {/* 2. Brand Name Header with majestic letters expansion */}
                <motion.h1 
                  initial={{ opacity: 0, letterSpacing: '0.15em', y: 10 }}
                  animate={{ opacity: 1, letterSpacing: '0.36em', y: 0 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  className="font-display font-medium text-lg sm:text-2xl md:text-3xl text-white uppercase leading-none drop-shadow-2xl px-4 text-center mr-[-0.36em]"
                >
                  {brandName}
                </motion.h1>

                {/* 3. Subtext Accent with Stardust Sparkles */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] text-gold-400 font-mono tracking-[0.3em] sm:tracking-[0.45em] uppercase font-light mr-[-0.3em]"
                >
                  <Sparkles size={8} className="text-gold-400/50 animate-pulse" />
                  <span>{subtext}</span>
                  <Sparkles size={8} className="text-gold-400/50 animate-pulse" />
                </motion.div>
                
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}

