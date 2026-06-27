import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, VolumeX, Volume2 } from 'lucide-react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface EntranceLoaderProps {
  cmsData: CMSState;
  onComplete: () => void;
}

export default function EntranceLoader({ cmsData, onComplete }: EntranceLoaderProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  // Generate premium golden floating particles
  useEffect(() => {
    const generated = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * -10,
    }));
    setParticles(generated);
  }, []);

  // Handle fake progress bar for premium cinematic anticipation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Realistic step speed
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(12, Math.floor(remaining * 0.12)));
        return prev + step;
      });
    }, 180);

    // Show skip button after 1.2 seconds so they don't feel trapped but can experience the art
    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, []);

  // When loading reaches 100%, hold for 0.8 seconds then transition out
  useEffect(() => {
    if (loadingProgress >= 100) {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 900);
      return () => clearTimeout(finishTimer);
    }
  }, [loadingProgress, onComplete]);

  const brandName = cmsData.navbar.logoText || "SIDDHARTH VIBE";
  const subtext = cmsData.navbar.logoSubtext || "EVENTS";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.08,
        filter: "blur(15px)",
        transition: { duration: 1.1, ease: [0.43, 0.13, 0.23, 0.96] } 
      }}
      className="fixed inset-0 z-[1000] w-full h-full bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Cinematic grid lines backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,142,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,142,55,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Deep premium radial ambient spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(175,115,43,0.15)_0%,transparent_70%)]" />

      {/* Luxury Golden Sparkles / Dust Particles floating upwards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-t from-gold-500 to-amber-300"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: 0.15,
              boxShadow: '0 0 8px rgba(197,142,55,0.6)',
            }}
            animate={{
              y: ['0vh', '-110vh'],
              x: ['0vw', `${(p.id % 2 === 0 ? 1 : -1) * (Math.random() * 8 + 2)}vw`],
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Outer elegant borders to frame the intro */}
      <div className="absolute inset-6 border border-gold-500/10 pointer-events-none" />
      <div className="absolute inset-8 border border-gold-500/5 pointer-events-none" />
      
      {/* Corners accent styling */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold-400/40" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold-400/40" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold-400/40" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold-400/40" />

      {/* Main Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg">
        
        {/* Shimmering Halo Aura behind the Logo */}
        <div className="absolute w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] animate-pulse pointer-events-none" />

        {/* Cinematic Logo Draw & Scale Entrance */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Elegant Nested Rotating Golden Luxury Rings */}
          <motion.div 
            className="absolute w-44 h-44 rounded-full border border-gold-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full border border-dashed border-gold-400/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full border border-gold-600/5"
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 filter drop-shadow-[0_0_35px_rgba(197,142,55,0.4)]">
            <Logo 
              size="lg" 
              showText={false}
              logoImage={cmsData.navbar.logoImage}
            />
          </div>
          
          {/* Animated Gold Ring Flare Sweep */}
          <motion.div
            className="absolute -inset-6 rounded-full border border-gold-400/30 pointer-events-none"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.8, 1.4, 1.8], opacity: [0, 0.8, 0] }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>

        {/* Wordmark tracking reveal with beautiful spacing */}
        <div className="space-y-4">
          <h1 className="relative font-display font-bold text-2xl md:text-3xl tracking-[0.35em] text-white uppercase overflow-hidden py-1">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {brandName}
            </motion.span>
            
            {/* Shimmer sweep line */}
            <motion.div 
              className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-transparent via-gold-300/35 to-transparent skew-x-12"
              animate={{ x: ['-100%', '300%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </h1>

          {/* Subtext reveal */}
          <motion.div
            initial={{ tracking: "0.1em", opacity: 0 }}
            animate={{ tracking: "0.6em", opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.8, ease: "easeOut" }}
            className="text-[11px] text-gold-400/90 font-mono uppercase tracking-[0.6em] font-light flex items-center justify-center gap-1.5"
          >
            <Sparkles size={10} className="text-gold-400 animate-spin-slow" />
            {subtext}
            <Sparkles size={10} className="text-gold-400 animate-spin-slow" />
          </motion.div>
        </div>

        {/* Luxurious Loading Bar and status messages */}
        <div className="mt-12 w-60 md:w-72 space-y-3 relative">
          <div className="flex justify-between items-center text-[9px] font-mono tracking-wider text-gold-400/60 uppercase">
            <span>
              {loadingProgress < 40 ? 'INITIATING ROYAL EXPERIENCES...' : 
               loadingProgress < 80 ? 'STAGING DESIGN PRESETS...' : 'ENTERING THE REALM...'}
            </span>
            <span>{loadingProgress}%</span>
          </div>
          
          {/* Track and fill */}
          <div className="h-[2px] w-full bg-gold-950/40 border border-gold-500/10 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 via-gold-400 to-amber-500 rounded"
              style={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.15 }}
            />
            {/* Light flare running along the progress */}
            <div 
              className="absolute top-0 bottom-0 w-10 bg-white/40 blur-[2px] animate-pulse"
              style={{ left: `calc(${loadingProgress}% - 20px)` }}
            />
          </div>
        </div>

        {/* Quick Skip/Enter Luxury Button */}
        <AnimatePresence>
          {showSkip && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-10"
            >
              <button
                onClick={onComplete}
                className="group flex items-center gap-2.5 px-6 py-2.5 bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/35 hover:border-gold-300/80 text-gold-300 hover:text-white text-[10px] font-mono uppercase tracking-[0.2em] transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>SKIP INTRO</span>
                <ArrowRight size={12} className="transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Brand Tagline at base */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-[0.3em] uppercase text-gray-500 flex items-center gap-2 whitespace-nowrap"
      >
        <span>EXPERIENCE LUXURY EVENTS</span>
        <span className="text-gold-400">•</span>
        <span>MADURAI & BEYOND</span>
      </motion.div>
    </motion.div>
  );
}
