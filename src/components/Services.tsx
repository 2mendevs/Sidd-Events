import React, { useState } from 'react';
import { 
  Sparkles, Cake, Briefcase, Camera, UtensilsCrossed, X, Check, HelpCircle,
  Flame, Smile, Music, Heart, Tv, Disc, Shield, Crown, Zap, Gift, Users, PlusCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSState, ServiceCard } from '../cmsData';

interface ServicesProps {
  onSelectServiceForCalculator: (serviceId: string) => void;
  cmsData: CMSState;
  onViewServicePortfolio?: (categoryName: string) => void;
}

export default function Services({ 
  onSelectServiceForCalculator, 
  cmsData,
  onViewServicePortfolio 
}: ServicesProps) {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const { heading, subheading, items } = cmsData.services;

  // Map icon name to React element
  const renderIcon = (iconName: string) => {
    const iconClass = "w-8 h-8 text-gold-400 group-hover:text-gold-200 transition-colors duration-300";
    switch (iconName) {
      case 'Ring':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={iconClass}>
            <circle cx="12" cy="14" r="6" />
            <path d="M12 2 L15 5 L12 8 L9 5 Z" fill="currentColor" fillOpacity="0.2" />
          </svg>
        );
      case 'Cake':
        return <Cake className={iconClass} strokeWidth={1.5} />;
      case 'Briefcase':
        return <Briefcase className={iconClass} strokeWidth={1.5} />;
      case 'Camera':
        return <Camera className={iconClass} strokeWidth={1.5} />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className={iconClass} strokeWidth={1.5} />;
      case 'Flame':
        return <Flame className={iconClass} strokeWidth={1.5} />;
      case 'Smile':
        return <Smile className={iconClass} strokeWidth={1.5} />;
      case 'Music':
        return <Music className={iconClass} strokeWidth={1.5} />;
      case 'Heart':
        return <Heart className={iconClass} strokeWidth={1.5} />;
      case 'Tv':
        return <Tv className={iconClass} strokeWidth={1.5} />;
      case 'Disc':
        return <Disc className={iconClass} strokeWidth={1.5} />;
      case 'Shield':
        return <Shield className={iconClass} strokeWidth={1.5} />;
      case 'Crown':
        return <Crown className={iconClass} strokeWidth={1.5} />;
      case 'Zap':
        return <Zap className={iconClass} strokeWidth={1.5} />;
      case 'Gift':
        return <Gift className={iconClass} strokeWidth={1.5} />;
      case 'Users':
        return <Users className={iconClass} strokeWidth={1.5} />;
      case 'PlusCircle':
        return <PlusCircle className={iconClass} strokeWidth={1.5} />;
      default:
        return <Sparkles className={iconClass} strokeWidth={1.5} />;
    }
  };

  return (
    <section id="services" className="relative bg-luxury-black py-24 border-t border-gold-500/10">
      
      {/* Dynamic Background Noise / Blur effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading (Matching visual text style) */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase">{heading}</p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-white tracking-widest mt-2 uppercase">
            {subheading}
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* 5-Column Grid with modern responsive cards layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((service, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group p-8 flex flex-col items-center text-center cursor-pointer bg-luxury-gray/40 border border-gold-500/10 hover:border-gold-400/30 hover:bg-luxury-charcoal/40 transition-all duration-500 hover:shadow-[inset_0_0_30px_rgba(197,142,55,0.05)] relative overflow-hidden"
            >
              {/* Top hover indicator */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400 transition-all duration-500" />
              
              {/* Icon Container with subtle radial pulse */}
              <div className="relative mb-6 p-4 border border-gold-500/10 rounded-full group-hover:border-gold-400/40 transition-all duration-500 bg-luxury-black">
                {renderIcon(service.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-display text-sm font-semibold tracking-[0.2em] text-white group-hover:text-gold-300 transition-colors duration-300 uppercase">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-400 mt-4 leading-relaxed font-sans font-light">
                {service.description}
              </p>

              {/* Read More dynamic hover cue */}
              <span className="text-[10px] font-mono tracking-widest text-gold-400/0 group-hover:text-gold-400 mt-6 transition-all duration-300 uppercase flex items-center gap-1">
                READ MORE +
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exquisite Detailed Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-luxury-gray border border-gold-400/30 w-full max-w-2xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(197,142,55,0.15)]"
            >
              {/* Deco Corner Borders */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-500/20" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold-500/20" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gold-400 transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>

              {/* Modal Content */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 border border-gold-400/20 rounded-full bg-luxury-black">
                    {renderIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">SERVICE EXCELLENCE</span>
                    <h4 className="font-display text-xl font-semibold text-white tracking-[0.15em] uppercase mt-1">
                      {selectedService.title}
                    </h4>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">
                  {selectedService.detailText}
                </p>

                {/* Key Features Checkbox-style layout */}
                <div>
                  <h5 className="text-xs font-mono tracking-wider text-gold-400 uppercase mb-3">KEY INCLUSIONS:</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-400">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Check size={14} className="text-gold-400 flex-shrink-0" />
                        <span className="font-sans font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing / CTA */}
                <div className="border-t border-gold-500/10 pt-6 mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">ESTIMATED STARTING FROM</span>
                    <p className="text-lg font-mono text-gold-400 font-semibold mt-1">
                      ₹{selectedService.basePrice.toLocaleString()} <span className="text-xs text-gray-500 font-normal">onwards</span>
                    </p>
                  </div>
                  
                  {/* Action */}
                  <div className="flex flex-wrap items-center gap-3">
                    {onViewServicePortfolio && (
                      <button
                        onClick={() => {
                          onViewServicePortfolio(selectedService.title);
                          setSelectedService(null);
                        }}
                        className="border border-gold-400 text-gold-400 hover:bg-gold-500/10 text-xs font-semibold tracking-widest py-3 px-6 uppercase focus:outline-none transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        SEE IMAGES
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onSelectServiceForCalculator(selectedService.id);
                        setSelectedService(null);
                      }}
                      className="gold-shimmer-btn text-luxury-black text-xs font-semibold tracking-widest py-3 px-6 uppercase focus:outline-none hover:shadow-[0_0_15px_rgba(197,142,55,0.3)] transition-all cursor-pointer"
                    >
                      CUSTOMIZE PACKAGE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
