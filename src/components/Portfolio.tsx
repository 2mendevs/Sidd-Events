import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSState, GalleryItem } from '../cmsData';

interface PortfolioProps {
  cmsData: CMSState;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Portfolio({ cmsData, selectedCategory, setSelectedCategory }: PortfolioProps) {
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { heading, description, items, layout } = cmsData.gallery;

  // Filter gallery items by the same category as the active lightbox item to allow navigation
  const categoryItems = lightboxItem 
    ? items.filter(item => (item.category || '').toLowerCase() === (lightboxItem.category || '').toLowerCase())
    : [];

  const currentIndex = lightboxItem 
    ? categoryItems.findIndex(item => item.id === lightboxItem.id)
    : -1;

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (categoryItems.length > 1 && currentIndex !== -1) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : categoryItems.length - 1;
      setLightboxItem(categoryItems[prevIndex]);
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (categoryItems.length > 1 && currentIndex !== -1) {
      const nextIndex = currentIndex < categoryItems.length - 1 ? currentIndex + 1 : 0;
      setLightboxItem(categoryItems[nextIndex]);
    }
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        setLightboxItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem, currentIndex, categoryItems]);

  const defaultCategories = ['All', 'Weddings', 'Birthdays', 'Corporate Events', 'Catering'];
  
  // Dynamically merge default categories, actual item categories, and any actively selected custom category/service name
  const categories = Array.from(new Set([
    ...defaultCategories,
    ...items.map(item => item.category).filter(Boolean),
    ...(selectedCategory && selectedCategory !== 'All' ? [selectedCategory] : [])
  ]));

  // Smart matching filter
  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(item => {
        const itemCatLower = (item.category || '').toLowerCase();
        const selCatLower = selectedCategory.toLowerCase();
        
        // 1. Direct exact match
        if (itemCatLower === selCatLower) return true;
        
        // 2. Cross-containment match
        if (itemCatLower.includes(selCatLower) || selCatLower.includes(itemCatLower)) return true;
        
        // 3. Keyword proximity match (e.g. "Temple Processions" matching category "TEMPLE")
        const selectWords = selCatLower.split(/[\s&,\(\)\/]+/).filter(w => w.length > 3);
        const itemWords = `${itemCatLower} ${(item.title || '').toLowerCase()} ${(item.details || '').toLowerCase()}`.split(/[\s&,\(\)\/]+/);
        
        return selectWords.some(sw => itemWords.some(iw => iw.includes(sw) || sw.includes(iw)));
      });

  // Scroll actions for the horizontal slider (exact match to visual arrows)
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderPortfolioItem = (item: GalleryItem, index: number) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        key={item.id}
        onClick={() => setLightboxItem(item)}
        className="cursor-pointer group/item relative overflow-hidden border border-gold-500/10 hover:border-gold-400/40 transition-all duration-500 bg-luxury-gray"
      >
        {/* Thin gold inner frame border */}
        <div className="absolute inset-0 border border-gold-400/10 m-3 group-hover/item:border-gold-400/40 z-20 transition-all duration-500 pointer-events-none" />

        {/* Aspect ratio box */}
        <div className="relative h-[250px] overflow-hidden bg-luxury-gray">
          <img
            src={item.imageUrl || null}
            alt={item.title}
            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 select-none"
            referrerPolicy="no-referrer"
          />
          
          {/* Subtle golden metallic bottom bar */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/30 to-transparent opacity-80 group-hover/item:opacity-90 transition-opacity duration-500 z-10" />
        </div>

        {/* Content Overlay */}
        <div className="p-5 bg-luxury-gray border-t border-gold-500/5 relative z-20 text-left">
          <span className="text-[9px] font-mono tracking-widest text-gold-400 uppercase">
            {item.category}
          </span>
          <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mt-1 group-hover/item:text-gold-300 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-3 mt-3 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={10} className="text-gold-400/80" />
              {item.location.split(',')[0]}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/40" />
            <span className="flex items-center gap-1">
              <Calendar size={10} className="text-gold-400/80" />
              {item.date}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="portfolio" className="relative bg-luxury-black py-24 border-t border-gold-500/10 overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-mono tracking-[0.4em] text-gold-400 uppercase">OUR PORTFOLIO</p>
          <h2 className="font-display font-light text-3xl md:text-4xl text-white tracking-widest mt-2 uppercase leading-tight">
            {heading}
          </h2>
          <p className="text-xs text-gray-400 mt-2 max-w-xl mx-auto font-sans font-light">
            {description}
          </p>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Category Filters (Pill design) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-pointer border ${
                selectedCategory === category
                  ? 'bg-gold-500/10 text-gold-300 border-gold-400/60'
                  : 'bg-transparent text-gray-400 border-gold-500/10 hover:text-white hover:border-gold-500/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Layout Render */}
        {layout === 'slider' ? (
          <div className="relative group">
            {/* Left Arrow Button */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-gold-400/30 bg-luxury-black/80 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-all duration-300 shadow-xl focus:outline-none cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Slider Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none py-4 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredItems.map((item, index) => (
                <div key={item.id} className="flex-shrink-0 w-[290px] sm:w-[350px] md:w-[380px] snap-start">
                  {renderPortfolioItem(item, index)}
                </div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-gold-400/30 bg-luxury-black/80 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-all duration-300 shadow-xl focus:outline-none cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        ) : layout === 'masonry' ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="break-inside-avoid">
                {renderPortfolioItem(item, index)}
              </div>
            ))}
          </div>
        ) : (
          /* Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => renderPortfolioItem(item, index))}
          </div>
        )}

        {/* View Full Portfolio Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => items.length > 0 && setLightboxItem(items[0])}
            className="group border border-gold-400/20 hover:border-gold-400 hover:bg-gold-500/5 text-gold-300 text-xs font-semibold tracking-[0.2em] px-8 py-3.5 inline-flex items-center gap-3 transition-all duration-300 uppercase focus:outline-none cursor-pointer"
          >
            VIEW FULL GALLERY
            <ExternalLink size={12} className="text-gold-300" />
          </button>
        </div>
      </div>

      {/* Exquisite Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-luxury-gray border border-gold-400/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gold-400 transition-colors z-30 focus:outline-none"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                {/* Image panel with gold thin border frame */}
                <div className="relative overflow-hidden border border-gold-500/20 h-[300px] md:h-[400px] group/lightbox">
                  <div className="absolute inset-0 border border-gold-400/10 m-2.5 z-10 pointer-events-none" />
                  <img
                    src={lightboxItem.imageUrl || null}
                    alt={lightboxItem.title}
                    className="w-full h-full object-cover animate-fade-in"
                    referrerPolicy="no-referrer"
                  />

                  {/* Previous / Next Arrow Overlay inside the image container */}
                  {categoryItems.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-gold-400/30 bg-luxury-black/85 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/15 transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
                        title="Previous Photo in Category"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={handleNextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full border border-gold-400/30 bg-luxury-black/85 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/15 transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
                        title="Next Photo in Category"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Small current image counter indicator */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-luxury-black/90 border border-gold-500/20 px-2.5 py-1 rounded font-mono text-[9px] text-gold-400 tracking-wider">
                        {currentIndex + 1} / {categoryItems.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Details list panel */}
                <div className="flex flex-col gap-5 text-left justify-center">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">
                    {lightboxItem.category} GALLERY
                  </span>
                  
                  <h4 className="font-display text-2xl font-bold text-white tracking-widest uppercase">
                    {lightboxItem.title}
                  </h4>
                  
                  <div className="w-12 h-0.5 bg-gold-400" />

                  {/* Metadata labels */}
                  <div className="flex flex-col gap-3 text-xs text-gray-300 font-sans mt-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-gold-400 w-24 uppercase">LOCATION:</span>
                      <span className="flex items-center gap-1 text-gray-300 font-light">
                        <MapPin size={12} className="text-gold-400/80 mr-1" />
                        {lightboxItem.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-gold-400 w-24 uppercase">DATE EVENT:</span>
                      <span className="flex items-center gap-1 text-gray-300 font-light">
                        <Calendar size={12} className="text-gold-400/80 mr-1" />
                        {lightboxItem.date}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light border-t border-gold-500/10 pt-4 mt-2">
                    {lightboxItem.details}
                  </p>

                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                    Every element was custom styled from scratch. Siddharth Vibe Events coordinated lighting schemes, floristry, high-end fine dining cutlery, and live orchestra staging to construct an eye-catching luxury masterpiece.
                  </p>

                  {/* Booking Link */}
                  <button
                    onClick={() => {
                      setLightboxItem(null);
                      const el = document.getElementById('packages');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="gold-shimmer-btn text-luxury-black text-xs font-semibold tracking-widest py-3 px-6 mt-4 uppercase focus:outline-none cursor-pointer text-center"
                  >
                    INQUIRE ABOUT THIS DESIGN
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
