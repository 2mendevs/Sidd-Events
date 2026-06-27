import React, { useState, useEffect } from 'react';
import { Phone, Mail, Calendar, Users, Sliders, DollarSign, ArrowRight, Check, MapPin, Clock, Instagram, Facebook, Linkedin, Compass, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICE_ITEMS } from '../data';
import { ConsultationRequest } from '../types';

const MAPS_URL = 'https://maps.app.goo.gl/UoRgDmgte9ft5f7G8';

interface ConsultationProps {
  selectedServiceId: string;
  onBookingSuccess: (request: ConsultationRequest) => void;
}

export default function Consultation({ selectedServiceId, onBookingSuccess }: ConsultationProps) {
  // Form States
  const [eventType, setEventType] = useState('temple-processions');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !eventDate) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending data to backend
    setTimeout(() => {
      const baseService = SERVICE_ITEMS.find(s => s.id === eventType) || SERVICE_ITEMS[0];
      const basePrice = baseService.basePrice * 80; // Convert to Rupees baseline
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
    <section id="packages" className="relative bg-luxury-black py-24 border-t border-gold-500/10">
      
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
          className="relative border border-gold-400/40 p-8 md:p-12 mb-20 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-luxury-gray/80 backdrop-blur-sm"
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
                  <p className="text-xs font-mono font-semibold text-white tracking-wider">6381690032</p>
                  <p className="text-[10px] text-gray-500">Call us anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400">
                  <Mail size={14} />
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold text-white tracking-wider">siddharthvibeevents@gmail.com</p>
                  <p className="text-[10px] text-gray-500">Drop us an email</p>
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
        <div id="consultation-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Left Column: Interactive Map, Address, Contact details & Socials */}
          <div className="lg:col-span-5 bg-luxury-gray border border-gold-500/10 p-8 md:p-10 relative shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
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
              <div className="relative w-full h-[320px] bg-luxury-black border border-gold-500/15 overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Embedded Real Google Map with high contrast, luxurious dark-themed styling filters */}
                <iframe
                  src="https://maps.google.com/maps?q=Siddharth%20Vibe%20Event,%20Opp%20Hdfc%20Bank,%20Thirupparankundram,%20Madurai,%20Tamil%20Nadu%20625005&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500 filter invert-[90%] hue-rotate-[180deg] saturate-[30%] brightness-[90%] contrast-[110%]"
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

                {/* Immersive CTA Hover Overlay */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-luxury-black/30 hover:bg-luxury-black/10 transition-colors duration-500 flex flex-col items-center justify-center gap-2 group cursor-pointer z-10"
                >
                  <div className="bg-luxury-gray/95 border border-gold-400/30 px-4 py-2 text-[10px] font-mono tracking-[0.2em] text-gold-300 uppercase flex items-center gap-2 group-hover:scale-105 group-hover:border-gold-300 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                    <span>OPEN IN GOOGLE MAPS</span>
                    <ExternalLink size={12} className="text-gold-400" />
                  </div>
                </a>
              </div>

              {/* HQ details */}
              <div className="flex flex-col gap-4 text-left border-t border-gold-500/10 pt-6 mt-6">
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

            {/* Social Media Redirection Links */}
            <div className="border-t border-gold-500/10 pt-6 mt-6">
              <h6 className="text-[10px] font-mono tracking-widest text-gold-400 uppercase mb-4">Connect With Us</h6>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-500/10 hover:border-gold-400 flex items-center justify-center text-gray-400 hover:text-white bg-luxury-black/40 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-500/10 hover:border-gold-400 flex items-center justify-center text-gray-400 hover:text-white bg-luxury-black/40 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
                  title="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-500/10 hover:border-gold-400 flex items-center justify-center text-gray-400 hover:text-white bg-luxury-black/40 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold-500/10 hover:border-gold-400 flex items-center justify-center text-gray-400 hover:text-white bg-luxury-black/40 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer"
                  title="Pinterest"
                >
                  <Compass size={16} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Request Consultation Scheduler Form */}
          <div className="lg:col-span-7 bg-luxury-gray border border-gold-500/10 p-8 md:p-10 relative shadow-[0_15px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            {/* Corner accent decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-400/20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-400/20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-400/20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-400/20" />
            
            <div className="flex items-center gap-3 mb-8 text-left border-b border-gold-500/10 pb-4">
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
                    {SERVICE_ITEMS.map((srv) => (
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
                    placeholder="e.g. Boopathi Aka Sanjay"
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
                    placeholder="e.g. boopathiakasanjay@gmail.com"
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
                    placeholder="e.g. 6381690032"
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
