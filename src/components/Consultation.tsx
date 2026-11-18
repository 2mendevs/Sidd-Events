import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, Users, Sliders, DollarSign, ArrowRight, Check, MapPin, Clock, Instagram, Facebook, Linkedin, Compass, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConsultationRequest } from '../types';
import { CMSState } from '../cmsData';

const MAPS_URL = 'https://maps.app.goo.gl/UoRgDmgte9ft5f7G8';

interface ConsultationProps {
  selectedServiceId: string;
  onBookingSuccess: (request: ConsultationRequest) => void;
  cmsData: CMSState;
}

export default function Consultation({ selectedServiceId, onBookingSuccess, cmsData }: ConsultationProps) {
  // Form States
  const [eventType, setEventType] = useState('srv-1');
  const [guestCount, setGuestCount] = useState(250);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync selected service from parent if changed
  useEffect(() => {
    if (selectedServiceId) {
      setEventType(selectedServiceId);
      // Scroll to packages section
      const el = document.getElementById('packages');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedServiceId]);

  // Set default eventType when cmsData loads
  useEffect(() => {
    if (cmsData?.services?.items?.length && !selectedServiceId) {
      setEventType(cmsData.services.items[0].id);
    }
  }, [cmsData, selectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !eventDate) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending data to backend
    setTimeout(() => {
      const baseService = cmsData.services.items.find(s => s.id === eventType) || cmsData.services.items[0];
      const basePrice = baseService.basePrice;
      const estimatedCatering = 1200 * guestCount; // Premium Buffet baseline
      const estimatedDecor = 200000; // Regal Gold baseline
      const totalEstimate = basePrice + estimatedCatering + estimatedDecor;

      const request: ConsultationRequest = {
        fullName,
        email,
        phone,
        eventType: baseService.title,
        eventDate,
        guestCount,
        message,
        servicesNeeded: ['Event Styling & Theme Design', 'Vendor Coordination'],
        cateringOption: 'Premium Gourmet Buffet',
        decorationTier: 'Regal Floral & Lighting Decor',
        totalEstimatedQuote: totalEstimate,
      };

      onBookingSuccess(request);
      setIsSubmitting(false);

      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
      setEventDate('');
      setMessage('');
    }, 1500);
  };

  return (
    <section id="packages" className="relative bg-luxury-black pt-12 pb-20 border-t border-gold-500/10">
      
      {/* Absolute glow background decorative bubbles */}
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* ========================================== */}
        {/* 1. LET'S CREATE SOMETHING EXTRAORDINARY BANNER */}
        {/* ========================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative border border-gold-400/40 p-6 md:p-10 mb-12 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-luxury-gray/80 backdrop-blur-sm"
        >
          {/* Subtle gold inner accent border */}
          <div className="absolute inset-0 border border-gold-400/10 m-2 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="lg:col-span-5 text-left">
               <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">LET'S CREATE</span>
              <h3 className="font-display font-light text-2xl md:text-3xl text-white tracking-widest mt-1 uppercase leading-snug">
                SOMETHING <span className="text-gold-metallic font-semibold">EXTRAORDINARY</span>
              </h3>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed font-sans font-light">
                Share your vision with us and let's turn it into a celebration that will be remembered forever.
              </p>
            </div>

            {/* Middle Contact Info */}
            <div className="lg:col-span-4 flex flex-col gap-4 text-left border-y lg:border-y-0 lg:border-x border-gold-500/10 py-6 lg:py-0 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-white tracking-wider">{cmsData.contact.phone}</p>
                  <p className="text-[10px] text-gray-500">Call us anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-white tracking-wider">{cmsData.contact.email}</p>
                  <p className="text-[10px] text-gray-500">Drop us an e-mail</p>
                </div>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="lg:col-span-3 flex justify-start lg:justify-end">
              <button
                onClick={() => {
                  const element = document.getElementById('consultation-form');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="gold-shimmer-btn text-luxury-black font-semibold text-xs tracking-widest py-4 px-8 w-full lg:w-auto uppercase shadow-[0_0_20px_rgba(197,142,55,0.2)] focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
              >
                BOOK A CONSULTATION
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ========================================== */}
        {/* 2. REQUEST CONSULTATION FORM (TWO COLUMN)  */}
        {/* ========================================== */}
        <div id="consultation-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 max-w-6xl mx-auto">
          
          {/* Left Column: Interactive Map, Address, Contact details & Socials */}
          <div className="lg:col-span-6 bg-luxury-gray border border-gold-500/10 p-6 md:p-8 relative shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-start gap-5">
            {/* Corner accent decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-400/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-400/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-400/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/20" />

            <div>
              <div className="flex items-center gap-3 mb-6 text-left border-b border-gold-500/10 pb-4">
                <Compass className="text-gold-400 w-5 h-5" />
                <h4 className="font-display text-sm font-semibold tracking-[0.25em] text-white uppercase">
                  OUR STUDIO
                </h4>
              </div>

              {/* LUXURY REALISTIC EMBEDDED MAP */}
              <div className="relative w-full h-[285px] bg-luxury-black border border-gold-500/15 overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                {/* Embedded Real Google Map with high contrast, luxurious dark-themed styling filters */}
                <div className="relative w-full h-[235px] overflow-hidden">
                  <iframe
                    src="https://maps.google.com/maps?q=Siddharth%20Vibe%20Event,%20Opp%20Hdfc%20Bank,%20Thirupparankundram,%20Madurai,%20Tamil%20Nadu%20625005&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity duration-500 filter invert-[90%] hue-rotate-[180deg] saturate-[30%] brightness-[90%] contrast-[110%]"
                    allowFullScreen
                    loading="lazy"
                    title="Siddharth Vibe Events Location Map"
                  ></iframe>

                  {/* Accent overlay highlights */}
                  <div className="absolute inset-0 pointer-events-none border border-gold-500/10" />

                  {/* Ambient Info Panels */}
                  <div className="absolute top-3 left-3 bg-luxury-black/90 border border-gold-500/10 px-2 py-1 text-[8px] font-mono text-gray-400 uppercase tracking-widest pointer-events-none z-10 shadow-lg">
                    LIVE COORDINATE ACTIVE
                  </div>
                  <div className="absolute bottom-3 left-3 bg-luxury-black/90 border border-gold-500/10 px-2 py-1 text-[8px] font-mono text-gold-400/90 uppercase tracking-widest pointer-events-none z-10 shadow-lg">
                    THIRUPPARANKUNDRAM, MADURAI
                  </div>
                </div>

                {/* Immersive CTA Google Maps Link Button inside, below the map image */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-luxury-black/95 hover:bg-gold-500/5 py-3 text-[10px] font-mono tracking-[0.2em] text-gold-300 hover:text-white uppercase border-t border-gold-500/15 transition-all duration-300 cursor-pointer"
                >
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ExternalLink size={12} className="text-gold-400" />
                </a>
              </div>

              {/* HQ details */}
              <div className="flex flex-col gap-4 text-left border-t border-gold-500/10 pt-5 mt-5">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gold-400 w-4 h-4 mt-1 flex-shrink-0" />
                  <div>
                    <h6 className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Headquarters</h6>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1 font-light">
                      Siddharth Vibe Events<br />
                      Opp Hdfc Bank, Thirupparankundram,<br />
                      Madurai, Tamil Nadu 625005, India
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="flex items-start gap-3">
                    <Phone className="text-gold-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h6 className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Call Us</h6>
                      <p className="text-xs text-gray-300 mt-1 font-mono font-medium">+91 63816 90032</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="text-gold-400 w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <h6 className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Hours</h6>
                      <p className="text-xs text-gray-300 mt-1 font-light">Mon - Sat: 9 AM - 8 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Request Consultation Scheduler Form */}
          <div className="lg:col-span-6 bg-luxury-gray border border-gold-500/10 p-6 md:p-8 relative shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-start gap-4">
            {/* Corner accent decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-400/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-400/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-400/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/20" />
            
            <div className="flex items-center gap-3 mb-6 text-left border-b border-gold-500/10 pb-4">
              <Calendar className="text-gold-400 w-5 h-5" />
              <h4 className="font-display text-sm font-semibold tracking-[0.25em] text-white uppercase">
                REQUEST CONSULTATION
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Event Category dropdown */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Event Category *
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 tracking-wider focus:outline-none focus:border-gold-400/50"
                  >
                    {cmsData.services.items.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Capacity select */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Estimated Guests *
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 tracking-wider focus:outline-none focus:border-gold-400/50"
                  >
                    <option value="50">Intimate Celebration (50-100 guests)</option>
                    <option value="150">Mid-size Event (100-250 guests)</option>
                    <option value="300">Grand Gala (250-500 guests)</option>
                    <option value="750">Royal Majestic (500-1000+ guests)</option>
                  </select>
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name input */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                {/* Email input */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 focus:outline-none focus:border-gold-400/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone input */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 focus:outline-none focus:border-gold-400/50"
                  />
                </div>

                {/* Event date picker */}
                <div>
                  <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 focus:outline-none focus:border-gold-400/50 accent-gold-400"
                  />
                </div>
              </div>

              {/* Message text area */}
              <div>
                <label className="text-[9px] font-mono tracking-widest text-gold-400 uppercase block mb-2">
                  Describe Your Dream Event (Optional)
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details like color palettes, specific themes, custom layout concepts..."
                  className="w-full bg-luxury-black border border-gold-500/10 py-3.5 px-4 text-xs text-gray-300 focus:outline-none focus:border-gold-400/50 resize-none"
                />
              </div>

              {/* Submission CTA button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="gold-shimmer-btn text-luxury-black text-xs font-semibold tracking-widest py-4 mt-2 w-full uppercase focus:outline-none shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-luxury-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    PROVISIONING CONSULTATION...
                  </span>
                ) : (
                  <>
                    SUBMIT REQUEST
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
