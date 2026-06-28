import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageCircle, Search, Sparkles, SlidersHorizontal, Tag, Check } from 'lucide-react';
import { CMSState } from '../cmsData';

interface ProductsPageProps {
  cmsData: CMSState;
  onBack: () => void;
}

export default function ProductsPage({ cmsData, onBack }: ProductsPageProps) {
  const { products, heading } = cmsData.mascotSection;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  // Extract unique categories and tags for filtering
  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => {
      if (p.category) list.add(p.category);
    });
    return ['All', ...Array.from(list)];
  }, [products]);

  const allTags = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => {
      if (p.tags) p.tags.forEach(t => list.add(t));
    });
    return ['All', ...Array.from(list)];
  }, [products]);

  // Clean WhatsApp phone number from contact information
  const whatsappLink = (productName: string, productCategory: string) => {
    const rawPhone = cmsData.contact.phone || "+91 63816 90032";
    // Strip non-digit characters
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const message = `Hello Siddharth Vibe Events! I am very interested in booking or purchasing the "${productName}" (${productCategory}) from your mascot costumes collection. Could you please share more information regarding availability and process? Thank you!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || (p.tags && p.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [products, searchQuery, selectedCategory, selectedTag]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-luxury-black text-gray-200 py-24 px-6 md:px-12 relative z-50"
    >
      {/* Decorative luxury backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-gold-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-[60%] right-[10%] w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(197,142,55,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(197,142,55,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Navigation & Back Action */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 px-4 py-2 bg-gold-500/5 hover:bg-gold-500/10 border border-gold-500/15 hover:border-gold-400/50 text-gold-400 hover:text-gold-300 font-mono text-[10px] tracking-[0.25em] uppercase rounded-sm transition-all cursor-pointer backdrop-blur-sm"
          >
            <ArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to main site</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/5 border border-gold-500/15 rounded-full text-gold-400 font-mono text-[9px] uppercase tracking-widest">
            <Sparkles size={8} className="animate-spin-slow" />
            <span>EXCLUSIVE EXPORT-QUALITY RANGE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
            Premium Costumes Gallery
          </h1>
          <p className="text-sm md:text-base text-gray-400 font-sans">
            Explore our state-of-the-art collection of giant 12ft pneumatic inflatables and 6-8ft lifelike mascot dolls available for sale and rent. Secure booking via instant WhatsApp.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto pt-1" />
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-luxury-gray/40 border border-gold-500/10 p-5 md:p-6 rounded-md mb-10 backdrop-blur-sm shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Search mascot names, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold-500/15 rounded-md py-3 pl-11 pr-4 text-xs font-sans text-white focus:outline-none focus:border-gold-400/50 transition-colors placeholder:text-gray-600"
              />
            </div>

            {/* Category Select Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold-500/15 rounded-md py-3 px-4 text-xs font-sans text-gray-300 focus:outline-none focus:border-gold-400/50 transition-colors cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tag Select Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-gold-500/15 rounded-md py-3 px-4 text-xs font-sans text-gray-300 focus:outline-none focus:border-gold-400/50 transition-colors cursor-pointer"
              >
                <option value="All">All Status/Types</option>
                {allTags.filter(t => t !== 'All').map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick-filter Pills row for fast selection */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gold-500/5">
            <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <SlidersHorizontal size={10} />
              <span>Quick Categories:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-[10px] font-mono tracking-wider rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-500 to-amber-400 text-luxury-black font-semibold'
                    : 'bg-gold-500/5 border border-gold-500/10 text-gray-400 hover:text-gold-300 hover:border-gold-400/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-8 text-xs font-mono text-gray-500">
          <span>SHOWING {filteredProducts.length} PREMIUM PRODUCTS</span>
          {(searchQuery || selectedCategory !== 'All' || selectedTag !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
            >
              RESET FILTERS
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-luxury-gray/10 border border-dashed border-gold-500/10 rounded-md p-16 text-center">
            <p className="text-gray-400 font-sans text-sm">No premium products match your current filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag('All');
              }}
              className="mt-4 text-xs font-mono tracking-widest text-gold-400 hover:text-gold-300 uppercase underline"
            >
              Clear filters and search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.div
                  key={prod.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-luxury-gray/30 border border-gold-500/10 rounded-lg overflow-hidden flex flex-col hover:border-gold-400/30 transition-all duration-300 shadow-lg relative"
                >
                  {/* Category Pill Overlaid on Image */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-luxury-black/80 backdrop-blur-md border border-gold-500/15 rounded text-[9px] font-mono tracking-wider text-gold-300 uppercase">
                    {prod.category}
                  </div>

                  {/* Image Frame */}
                  <div className="relative aspect-square overflow-hidden bg-black p-1">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Name */}
                      <h3 className="text-lg font-display font-medium text-white group-hover:text-gold-300 transition-colors leading-snug">
                        {prod.name}
                      </h3>
                      {/* Description */}
                      <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                        {prod.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {/* Tags */}
                      {prod.tags && prod.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {prod.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="inline-flex items-center gap-1 text-[9px] font-mono text-gold-400 bg-gold-400/5 border border-gold-400/10 px-2 py-0.5 rounded-sm">
                              <Tag size={8} />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* No price mentioned. Just booking button */}
                      <a
                        href={whatsappLink(prod.name, prod.category)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 py-3 bg-gold-500/10 hover:bg-gold-500 hover:text-luxury-black border border-gold-500/30 text-gold-300 hover:border-gold-400 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 rounded-sm font-semibold"
                      >
                        <MessageCircle size={14} className="fill-current" />
                        <span>BOOK / INQUIRE</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </motion.div>
  );
}
