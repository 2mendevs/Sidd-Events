import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface EntranceLoaderProps {
  cmsData: CMSState;
  onComplete: () => void;
}

export default function EntranceLoader({ cmsData, onComplete }: EntranceLoaderProps) {
  const [showSkip, setShowSkip] = useState(false);

  const durationSeconds = cmsData.entranceSettings?.durationSeconds ?? 1.2;
  const brandName = cmsData.entranceSettings?.heading || cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.entranceSettings?.subtext || cmsData.navbar.logoSubtext || "EVENTS";
  const tagline = cmsData.entranceSettings?.tagline || "EXPERIENCE LUXURY EVENTS • MADURAI & BEYOND";

  // Automatically proceed after the defined duration
  useEffect(() => {
    const totalMs = durationSeconds * 1000;
    
    const finishTimer = setTimeout(() => {
      onComplete();
    }, totalMs);

    // Show skip button quickly
    const skipTimer = setTimeout(() => {
      setShowSkip(cmsData.entranceSettings?.showSkipButton !== false);
    }, Math.min(400, totalMs / 2));

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(skipTimer);
    };
  }, [durationSeconds, cmsData.entranceSettings?.showSkipButton, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
      }}
      className="fixed inset-0 z-[1000] w-full h-full bg-[#030303] flex flex-col items-center justify-center overflow-hidden transform-gpu"
    >
      {/* Luxurious Backdrop Grid & Spotlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,142,55,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,142,55,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,142,55,0.12)_0%,transparent_75%)]" />

      {/* Decorative Golden Corner Accents */}
      <div className="absolute inset-6 border border-gold-500/5 pointer-events-none" />
      <div className="absolute inset-8 border border-gold-500/10 pointer-events-none" />
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold-400/30" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold-400/30" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold-400/30" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold-400/30" />

      {/* Unified Main Content Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg transform-gpu"
      >
        {/* Soft Golden Aura behind the logo */}
        <div className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(197,142,55,0.15)_0%,transparent_70%)] blur-2xl pointer-events-none" />

        {/* Cinematic Logo Wrapper */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer elegant spinning ring */}
          <motion.div 
            className="absolute w-40 h-40 rounded-full border border-gold-500/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner dashed reverse spinning ring */}
          <motion.div 
            className="absolute w-36 h-36 rounded-full border border-dashed border-gold-400/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          {/* Gentle breathing ring */}
          <motion.div 
            className="absolute w-44 h-44 rounded-full border border-gold-600/5"
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 p-2">
            <Logo 
              size="lg" 
              showText={false}
              logoImage={cmsData.navbar.logoImage}
            />
          </div>
        </div>

        {/* Wordmark & Subtitle */}
        <div className="space-y-4">
          <h1 className="relative font-display font-bold text-2xl md:text-3xl tracking-[0.35em] text-white uppercase py-1 select-none">
            {brandName}
            {/* Elegant premium gold shimmer light pass */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/25 to-transparent skew-x-12 pointer-events-none"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.0, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
          </h1>

          {/* Premium Animated Subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[10px] text-gold-400/80 font-mono uppercase tracking-[0.45em] font-light flex items-center justify-center gap-1.5 select-none"
          >
            <Sparkles size={8} className="text-gold-400/60 animate-pulse" />
            {subtext}
            <Sparkles size={8} className="text-gold-400/60 animate-pulse" />
          </motion.div>
        </div>

        {/* Luxury Skip Action */}
        <AnimatePresence>
          {showSkip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <button
                onClick={onComplete}
                className="group flex items-center gap-2 px-5 py-2 bg-gold-400/5 hover:bg-gold-400/10 border border-gold-400/20 hover:border-gold-300/60 text-gold-300 text-[9px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>ENTER PREVIEWS</span>
                <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative Base Tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-[0.3em] uppercase text-gray-500 flex items-center justify-center gap-2 whitespace-nowrap px-4 text-center select-none"
      >
        <span>{tagline}</span>
      </motion.div>
    </motion.div>
  );
}
