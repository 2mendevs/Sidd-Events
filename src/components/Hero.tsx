import React from 'react';
import { Play, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreServices: () => void;
  onViewOurWork: () => void;
}

export default function Hero({ onExploreServices, onViewOurWork }: HeroProps) {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Luxury Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1800"
          alt="Luxury Event Grand Ballroom"
          className="w-full h-full object-cover scale-105 select-none"
          referrerPolicy="no-referrer"
        />
        {/* Dark gold radial wash for maximum focus and luxury drama */}
        <div className="absolute inset-0 bg-radial-luxury opacity-85 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/60 to-transparent z-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/40 z-15" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 mt-16">
        {/* Left Columns - Detailed Promotional Layout */}
        <div className="lg:col-span-9 flex flex-col justify-center text-left">
          
          {/* Subtle Accent Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="w-12 h-[1px] bg-gold-400" />
            <div className="flex flex-col">
              <span className="text-[10px] md:text-xs font-sans font-medium tracking-[0.35em] text-gold-300 uppercase leading-none">
                CRAFTING MOMENTS.
              </span>
              <span className="text-[9px] md:text-[10px] font-sans font-light tracking-[0.35em] text-gold-400/80 uppercase mt-1">
                CREATING MEMORIES.
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="font-display font-light text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[0.03em] uppercase drop-shadow-lg"
          >
            EXTRAORDINARY <br />
            <span className="font-serif italic font-normal text-gold-300 tracking-[0.01em] text-gold-metallic">
              EVENTS.
            </span>
            <br />
            TIMELESS MEMORIES.
          </motion.h1>

          {/* Core Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className="mt-6 text-sm sm:text-base text-gray-300 max-w-xl leading-relaxed font-sans font-light"
          >
            From intimate gatherings to grand celebrations, we design experiences that leave lasting impressions and turn your vision into reality.
          </motion.p>

          {/* Interactive Call-To-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            {/* Explore Services filled button */}
            <button
              onClick={onExploreServices}
              className="gold-shimmer-btn text-luxury-black text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-3 transition-all duration-300 focus:outline-none hover:shadow-[0_0_25px_rgba(197,142,55,0.4)] cursor-pointer"
            >
              EXPLORE SERVICES
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>

            {/* View Our Work hollow button */}
            <button
              onClick={onViewOurWork}
              className="group border border-white/20 hover:border-gold-300 hover:text-gold-300 text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-4 flex items-center gap-3 transition-all duration-300 focus:outline-none cursor-pointer bg-luxury-black/30 backdrop-blur-sm"
            >
              VIEW OUR WORK
              <Play size={14} className="fill-current text-white group-hover:text-gold-300 transition-colors" />
            </button>
          </motion.div>
        </div>

        {/* Right Columns - Float Social Links Vertical Design (from mockup) */}
        <div className="hidden lg:col-span-3 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Vertical FOLLOW US Text */}
            <div className="flex items-center gap-3 rotate-90 origin-center my-12 whitespace-nowrap">
              <span className="w-12 h-[1px] bg-gold-400" />
              <span className="text-[10px] font-sans font-medium tracking-[0.4em] text-gold-400 uppercase">
                FOLLOW US
              </span>
            </div>

            {/* Social Icons inside gold-bordered spheres */}
            <div className="flex flex-col gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gold-400/30 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elegant Gold bottom diamond separator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60">
        <div className="w-1.5 h-1.5 rotate-45 border border-gold-400 bg-transparent" />
        <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-gold-400" />
      </div>
    </section>
  );
}
