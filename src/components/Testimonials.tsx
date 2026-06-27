import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSState } from '../cmsData';

interface TestimonialsProps {
  cmsData: CMSState;
}

export default function Testimonials({ cmsData }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { heading, subheading, items } = cmsData.testimonials;

  const nextTestimonial = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevTestimonial = () => {
    if (items.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="relative bg-luxury-black py-24 border-t border-gold-500/10 overflow-hidden">
      {/* Decorative Radial Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Subtitle Heading */}
        <p className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase">{heading}</p>
        <h2 className="font-display font-light text-3xl md:text-4xl text-white tracking-widest mt-2 uppercase">
          {subheading}
        </h2>
        <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4 mb-16" />

        {/* 3 Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto mb-12">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={item.id || index}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col justify-between bg-luxury-gray/40 p-8 md:p-10 border transition-all duration-500 cursor-pointer select-none h-full ${
                  isActive
                    ? 'border-gold-400/80 shadow-[0_15px_40px_rgba(197,142,55,0.15)] scale-[1.033] z-10 bg-luxury-gray/90'
                    : 'border-gold-500/10 opacity-50 hover:opacity-80 scale-100 z-0'
                } ${
                  // On mobile, only display the active index
                  index === activeIndex ? 'block' : 'hidden md:flex'
                }`}
              >
                {/* Accent decoration corners for active card */}
                {isActive && (
                  <>
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold-400" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-400" />
                  </>
                )}

                <div>
                  {/* Quotes Icon and Stars Row */}
                  <div className="flex justify-between items-center mb-6">
                    <Quote className={`w-8 h-8 ${isActive ? 'text-gold-400' : 'text-gold-500/20'}`} strokeWidth={1} />
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={`${
                            isActive ? 'fill-gold-400 text-gold-400' : 'fill-gold-500/20 text-gold-500/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Text */}
                  <blockquote className="font-serif italic text-sm md:text-base text-gray-200 leading-relaxed font-light text-left">
                    "{item.comment}"
                  </blockquote>
                </div>

                {/* Client Profile Information */}
                <div className="not-italic mt-8 pt-6 border-t border-gold-500/10 text-left">
                  <p className={`font-display text-xs font-semibold tracking-widest uppercase ${isActive ? 'text-gold-300' : 'text-gray-400'}`}>
                    {item.name}
                  </p>
                  <p className="text-[9px] font-mono text-gray-500 tracking-wider uppercase mt-1">
                    {item.role}
                  </p>
                  <p className="text-[9px] font-mono text-gold-400/80 tracking-wider uppercase mt-0.5">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Navigation Controls */}
        {items.length > 0 && (
          <div className="flex items-center justify-between max-w-[180px] mx-auto mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full border border-gold-500/15 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Nav Dot Indicators */}
            <div className="flex items-center gap-1.5">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeIndex === idx ? 'bg-gold-400 w-4' : 'bg-gold-500/20'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border border-gold-500/15 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 transition-colors focus:outline-none cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
