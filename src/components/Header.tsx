import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CMSState } from '../cmsData';
import Logo from './Logo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onBookConsultation: () => void;
  onOpenAdmin: () => void;
  cmsData: CMSState;
}

export default function Header({ activeSection, onNavigate, onBookConsultation, onOpenAdmin, cmsData }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isSticky = cmsData.navbar.isSticky;

  return (
    <>
      <header
        className={`${isSticky ? 'fixed' : 'absolute'} top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-luxury-black/95 backdrop-blur-md border-b border-gold-500/10 py-3 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <button onClick={() => handleNavClick('home')} className="focus:outline-none">
            <Logo 
              size="md" 
              logoText={cmsData.navbar.logoText} 
              logoSubtext={cmsData.navbar.logoSubtext} 
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {cmsData.navbar.links.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-xs font-medium tracking-[0.2em] transition-all duration-300 focus:outline-none ${
                    isActive ? 'text-gold-300' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gold-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Consultation CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBookConsultation}
              className="hidden md:block border border-gold-400/40 hover:border-gold-300 hover:bg-gold-500/10 text-gold-300 text-[10px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 rounded-none transition-all duration-300 focus:outline-none cursor-pointer"
            >
              {cmsData.navbar.ctaText}
            </button>

            {/* Admin Console Lock */}
            <button
              onClick={onOpenAdmin}
              className="border border-gold-500/25 hover:border-gold-400/60 hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center gap-1.5 text-[9px] font-mono tracking-widest uppercase py-2.5 px-3"
              title="Admin Terminal"
            >
              <Shield size={12} className="animate-pulse" />
              <span className="hidden xl:inline">ADMIN</span>
            </button>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gold-400 hover:text-gold-300 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-luxury-black/98 backdrop-blur-xl flex flex-col justify-center px-12 md:px-24"
          >
            {/* Close Button on Top Right */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gold-400 hover:text-gold-300 focus:outline-none"
              >
                <X size={28} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-6 text-left my-auto">
              {cmsData.navbar.links.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-xl font-display tracking-[0.25em] text-left uppercase focus:outline-none ${
                      isActive ? 'text-gold-300 border-l-2 border-gold-400 pl-4' : 'text-gray-400 pl-0 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom Contact Details in mobile drawer */}
            <div className="mb-12 border-t border-gold-500/10 pt-8">
              <p className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">GET IN TOUCH</p>
              <p className="text-sm font-sans mt-2 text-gray-300">{cmsData.contact.phone}</p>
              <p className="text-xs font-sans text-gray-500">{cmsData.contact.email}</p>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookConsultation();
                  }}
                  className="w-full text-center bg-gradient-to-r from-gold-600 to-gold-400 text-luxury-black font-semibold text-xs tracking-widest py-3 uppercase cursor-pointer"
                >
                  {cmsData.navbar.ctaText}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-center border border-gold-500/30 hover:border-gold-400 bg-luxury-black/50 text-gold-400 font-semibold text-xs tracking-widest py-3 uppercase cursor-pointer flex items-center justify-center gap-2"
                >
                  <Shield size={14} className="animate-pulse" />
                  ADMIN CONSOLE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
