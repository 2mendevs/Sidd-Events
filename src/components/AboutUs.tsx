import React from 'react';
import { CheckCircle2, Trophy, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { STATS_ITEMS } from '../data';

export default function AboutUs() {
  return (
    <section id="about" className="relative bg-luxury-black py-24 border-t border-gold-500/10 overflow-hidden">
      {/* Decorative Golden Line Wash */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Core Pitch */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase">ABOUT US</span>
            
            <h2 className="font-display font-light text-4xl md:text-5xl text-white tracking-widest mt-2 uppercase leading-[1.15]">
              DETAILS MAKE <br />
              <span className="text-gold-metallic font-semibold">PERFECTION</span>
            </h2>
            
            <div className="w-12 h-[2px] bg-gold-400 my-6" />

            <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
              At Siddharth Vibe Events, we believe every detail matters. Our passionate team blends creativity, precision, and dedication to craft celebrations that are seamless, stylish, and unforgettable.
            </p>

            <p className="text-xs text-gray-400 leading-relaxed font-sans font-light mt-4">
              We specialize in curating high-end bespoke environments in Madurai and across South India. By blending exquisite lighting designs, magnificent floral setups, and top-tier culinary collaborations, we turn every single venue into an immersive visual sanctuary.
            </p>

            {/* Founder Signature (Classy layout) */}
            <div className="mt-8 pt-6 border-t border-gold-500/10 flex flex-col items-start">
              {/* Cursive Custom SVG/Font Signature */}
              <span className="font-signature text-3xl text-gold-300 italic tracking-wider">
                Siddharth
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 uppercase mt-2">
                FOUNDER & CEO
              </span>
            </div>
          </div>

          {/* Right Column - Staggered Photos & Stats Panel */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative">
            
            {/* Staggered Portrait Images Grid (Visual design matches the mockup) */}
            <div className="grid grid-cols-3 gap-4 h-[420px]">
              
              {/* Photo 1 (Slightly lower) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="rounded-none overflow-hidden h-[90%] mt-auto border border-gold-500/10 hover:border-gold-400/40 transition-all duration-500 shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400"
                  alt="Golden event lights"
                  className="w-full h-full object-cover hover:scale-115 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Photo 2 (Centered, Tallest) */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-none overflow-hidden h-[100%] border border-gold-500/10 hover:border-gold-400/40 transition-all duration-500 shadow-xl relative"
              >
                {/* Gold glowing frame inside */}
                <div className="absolute inset-0 border border-gold-400/20 m-1.5 pointer-events-none" />
                <img
                  src="https://images.unsplash.com/photo-1507504038482-762103743ec1?auto=format&fit=crop&q=80&w=400"
                  alt="Chandelier detail setup"
                  className="w-full h-full object-cover hover:scale-115 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Photo 3 (Lower too) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="rounded-none overflow-hidden h-[90%] mt-auto border border-gold-500/10 hover:border-gold-400/40 transition-all duration-500 shadow-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400"
                  alt="Fine dining details"
                  className="w-full h-full object-cover hover:scale-115 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>

            {/* Translucent Floating Stats Bar overlay (exact visual representation) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] bg-luxury-black/85 backdrop-blur-md border border-gold-400/30 py-6 px-4 grid grid-cols-4 items-center justify-center text-center shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            >
              {STATS_ITEMS.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center border-r last:border-r-0 border-gold-500/10">
                  <span className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-gold-300 tracking-tight text-gold-metallic">
                    {stat.value}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-sans font-light text-gray-400 tracking-widest uppercase mt-1 px-1 leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
