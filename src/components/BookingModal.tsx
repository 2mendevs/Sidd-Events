import React from 'react';
import { X, CheckCircle2, Calendar, Users, Calculator, Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ConsultationRequest } from '../types';

interface BookingModalProps {
  request: ConsultationRequest | null;
  onClose: () => void;
}

export default function BookingModal({ request, onClose }: BookingModalProps) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-luxury-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-luxury-gray border border-gold-400/40 w-full max-w-xl p-8 md:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(197,142,55,0.25)] text-center flex flex-col items-center"
      >
        {/* Deco borders */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold-500/20" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold-500/20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gold-400 transition-colors focus:outline-none"
        >
          <X size={20} />
        </button>

        {/* Big Success Check */}
        <div className="w-16 h-16 rounded-full border border-gold-400/20 bg-gold-500/10 flex items-center justify-center text-gold-400 mb-6 shadow-[0_0_20px_rgba(197,142,55,0.15)]">
          <CheckCircle2 size={32} strokeWidth={1.5} />
        </div>

        <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">PROVISIONED SUCCESSFUL</span>
        <h3 className="font-display text-2xl font-bold text-white tracking-widest uppercase mt-2">
          CONSULTATION REQUESTED
        </h3>
        <p className="text-xs text-gray-400 max-w-sm mt-3 leading-relaxed font-sans font-light">
          Your dream event outline has been securely logged. Siddharth Vibe Events will reach out within 24 hours to confirm your appointment.
        </p>

        {/* Booking summary card inside */}
        <div className="w-full bg-luxury-black/60 border border-gold-500/10 p-5 text-left flex flex-col gap-3.5 mt-8 font-sans">
          <div className="flex justify-between items-center border-b border-gold-500/5 pb-2.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">CLIENT:</span>
            <span className="text-xs font-semibold text-white tracking-wide">{request.fullName}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gold-500/5 pb-2.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">EVENT MODEL:</span>
            <span className="text-xs font-semibold text-gold-300 uppercase tracking-wider">{request.eventType}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gold-500/5 pb-2.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">DATE EVENT:</span>
            <span className="text-xs text-gray-300 flex items-center gap-1.5 font-light font-mono">
              <Calendar size={12} className="text-gold-400" />
              {request.eventDate}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gold-500/5 pb-2.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">CAPACITY:</span>
            <span className="text-xs text-gray-300 flex items-center gap-1.5 font-light font-mono">
              <Users size={12} className="text-gold-400" />
              {request.guestCount} Guests
            </span>
          </div>

          <div className="flex justify-between items-center pt-1.5">
            <span className="text-[10px] font-mono text-gray-500 uppercase">ESTIMATED BUDGET:</span>
            <span className="text-sm font-bold text-gold-300 font-mono">
              ₹{request.totalEstimatedQuote.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Contact Coordinates info */}
        <div className="mt-8 border-t border-gold-500/10 pt-6 w-full flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Phone size={12} className="text-gold-400" />
            <span>+91 6381690032</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={12} className="text-gold-400" />
            <span>siddharthvibeevents@gmail.com</span>
          </div>
        </div>

        {/* CTA Close */}
        <button
          onClick={onClose}
          className="gold-shimmer-btn text-luxury-black font-semibold text-xs tracking-widest py-3 px-8 mt-8 w-full uppercase focus:outline-none cursor-pointer"
        >
          CONFIRM & CLOSE
        </button>
      </motion.div>
    </div>
  );
}
