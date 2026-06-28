import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CMSState } from '../cmsData';

interface MascotSectionProps {
  cmsData: CMSState;
  onViewProducts: () => void;
}

export default function MascotSection({ cmsData, onViewProducts }: MascotSectionProps) {
  const { badgeText, heading, description, highlightWords, tags, imageUrl, ctaText } = cmsData.mascotSection;

  // Helper to highlight specific words in the description
  const renderHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-gold-400 font-semibold">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <section id="mascots" className="relative py-24 bg-[#070707] overflow-hidden border-t border-b border-gold-500/10">
      {/* Premium Backdrop Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,142,55,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,142,55,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content & Action */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Elegant Capsule Badge */}
            {badgeText && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-500/15 bg-gold-500/5 text-gold-400 text-[10px] font-mono tracking-[0.2em] uppercase"
              >
                <Sparkles size={10} className="text-gold-400/80 animate-pulse" />
                <span>{badgeText}</span>
              </motion.div>
            )}

            {/* Custom Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white leading-tight"
            >
              {heading}
            </motion.h2>

            {/* Description with highlights */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm md:text-base text-gray-400 font-sans leading-relaxed max-w-2xl"
            >
              {renderHighlightedText(description, highlightWords)}
            </motion.p>

            {/* Tags list */}
            {tags && tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap gap-2.5 pb-2"
              >
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-md border border-gold-500/10 bg-gold-500/5 text-gold-300/80 text-[11px] font-mono tracking-wider transition-all hover:border-gold-400/30 hover:text-gold-300"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-2"
            >
              <button
                onClick={onViewProducts}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-amber-400 hover:from-gold-400 hover:to-amber-300 text-luxury-black font-semibold text-xs font-mono tracking-[0.15em] uppercase px-8 py-4 shadow-[0_4px_20px_rgba(197,142,55,0.15)] hover:shadow-[0_4px_25px_rgba(197,142,55,0.3)] transition-all duration-300 rounded-sm overflow-hidden cursor-pointer"
              >
                <span>{ctaText}</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                {/* Glossy light sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
              </button>
            </motion.div>

          </div>

          {/* Right Column: Premium overlapping image & visual decoration */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Overlap Circle / Orbit Graphic */}
            <div className="absolute w-[320px] h-[320px] rounded-full border border-gold-500/10 animate-spin-slow pointer-events-none" />
            
            {/* Elegant Background Glow behind characters */}
            <div className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(197,142,55,0.15)_0%,transparent_70%)] blur-2xl" />

            {/* Main Visual Image container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-lg overflow-hidden border border-gold-500/15 p-1 bg-luxury-gray/40 backdrop-blur-sm max-w-md w-full shadow-2xl group"
            >
              {/* Outer Golden Sparkle Particles on corners */}
              <Sparkles size={16} className="absolute top-4 right-4 text-gold-400 animate-pulse z-20 pointer-events-none" />
              <Sparkles size={12} className="absolute bottom-6 left-6 text-gold-300 animate-pulse z-20 pointer-events-none" />
              
              <div className="relative aspect-[4/3] rounded overflow-hidden">
                <img
                  src={imageUrl}
                  alt={heading}
                  className="w-full h-full object-cover transform scale-102 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Premium Golden Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-80" />
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
