import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, MessageCircle, ArrowRight, Heart } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer id="contact" className="relative bg-[#030303] border-t border-gold-500/10 pt-20 pb-8 text-left">
      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Column 1 - Brand & Socials */}
        <div className="flex flex-col gap-5">
          <Logo size="sm" />
          <p className="text-xs text-gray-400 leading-relaxed font-sans font-light mt-2 max-w-sm">
            We design unforgettable experiences with elegance, creativity, and perfect execution. Specializing in bespoke luxury events across Madurai and South India.
          </p>

          {/* Social Icons matching visual design */}
          <div className="flex items-center gap-3 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={14} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 hover:text-white hover:border-gold-300 hover:bg-gold-500/10 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs font-semibold tracking-widest text-white uppercase border-b border-gold-500/10 pb-2">
            QUICK LINKS
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-sans font-light">
            <li>
              <button onClick={() => onNavigate('home')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('portfolio')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('packages')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Packages
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Our Services list */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs font-semibold tracking-widest text-white uppercase border-b border-gold-500/10 pb-2">
            OUR SERVICES
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-gray-400 font-sans font-light">
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Weddings
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Birthdays
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Corporate Events
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Photography
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Entertainment
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('services')} className="hover:text-gold-300 transition-colors cursor-pointer text-left">
                Catering
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact Us Coordinates & Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="font-display text-xs font-semibold tracking-widest text-white uppercase border-b border-gold-500/10 pb-2">
            CONTACT US
          </h4>
          <address className="not-italic flex flex-col gap-2.5 text-xs text-gray-400 font-sans font-light">
            <span className="text-white font-mono font-medium">6381690032</span>
            <span>siddharthvibeevents@gmail.com</span>
            <span>Thirupparankundram, Madurai, India</span>
          </address>

          {/* Newsletter Box (exact match layout) */}
          <div className="flex flex-col gap-2 mt-4">
            <h5 className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">NEWSLETTER</h5>
            <p className="text-[10px] text-gray-500 font-sans font-light">Subscribe to get the latest updates and offers.</p>
            
            <form onSubmit={handleSubscribe} className="flex border border-gold-500/25 mt-1 bg-luxury-black max-w-sm">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Your email address"
                className="bg-transparent flex-grow text-xs text-gray-300 px-3 py-2.5 focus:outline-none placeholder-gray-600"
              />
              <button
                type="submit"
                className="bg-gold-500 hover:bg-gold-400 text-luxury-black font-semibold px-4.5 py-2.5 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Subscribe submit"
              >
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-green-400 font-mono mt-1">Thank you! Subscribed successfully.</p>
            )}
          </div>
        </div>

      </div>

      {/* Footer Bottom copyright area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gold-500/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
        <p className="text-[10px] text-gray-500 font-sans font-light">
          © 2025 Siddharth Vibe Events. All Rights Reserved.
        </p>
        <p className="text-[10px] text-gray-500 font-sans font-light flex items-center gap-1.5">
          Designed with <Heart size={10} className="text-gold-500 fill-gold-500" /> by 2Mendevs
        </p>
      </div>
    </footer>
  );
}
