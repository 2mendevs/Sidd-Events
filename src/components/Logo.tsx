import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  logoText?: string;
  logoSubtext?: string;
  logoImage?: string;
}

export default function Logo({ className = '', showText = true, size = 'md', logoText = "SIDDHARTH VIBE", logoSubtext = "EVENTS", logoImage }: LogoProps) {
  const getScale = () => {
    switch (size) {
      case 'sm': return 'scale-75 origin-left';
      case 'lg': return 'scale-125';
      default: return 'scale-100';
    }
  };

  if (logoImage) {
    return (
      <div className={`flex items-center justify-center select-none ${getScale()} ${className}`}>
        <img
          src={logoImage}
          alt={logoText || "Siddharth Vibe Events"}
          className={
            size === 'lg'
              ? "h-28 md:h-36 w-auto object-contain max-h-40 filter drop-shadow-[0_0_15px_rgba(197,142,55,0.45)]"
              : size === 'sm'
                ? "h-8 w-auto object-contain max-h-10"
                : "h-11 w-auto object-contain max-h-14"
          }
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${getScale()} ${className}`}>
      {/* Golden Crest SVG */}
      <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full text-gold-400 drop-shadow-[0_0_8px_rgba(197,142,55,0.4)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Crown on top */}
          <path
            d="M35 25 L40 33 L50 22 L60 33 L65 25 L61 40 L39 40 Z"
            fill="url(#goldGradient)"
            stroke="none"
          />
          <circle cx="35" cy="25" r="1" fill="#dfc27d" />
          <circle cx="50" cy="22" r="1.5" fill="#dfc27d" />
          <circle cx="65" cy="25" r="1" fill="#dfc27d" />

          {/* Leaf wreath left */}
          <path d="M28 45 C23 52, 23 68, 38 78" strokeWidth="1.2" />
          <path d="M24 48 L28 49 M22 55 L26 55 M23 62 L28 60 M26 69 L31 66 M32 75 L36 71" strokeWidth="1" />

          {/* Leaf wreath right */}
          <path d="M72 45 C77 52, 77 68, 62 78" strokeWidth="1.2" />
          <path d="M76 48 L72 49 M78 55 L74 55 M77 62 L72 60 M74 69 L69 66 M68 75 L64 71" strokeWidth="1" />

          {/* Double Golden Circles */}
          <circle cx="50" cy="58" r="23" strokeWidth="1" />
          <circle cx="50" cy="58" r="20" strokeWidth="1.5" strokeDasharray="1 2" />

          {/* Central Elegant Serif "S" */}
          <text
            x="50"
            y="65"
            fontSize="22"
            fontFamily="'Cinzel', 'Playfair Display', serif"
            fontWeight="bold"
            textAnchor="middle"
            fill="url(#goldGradient)"
            stroke="none"
          >
            S
          </text>

          {/* Gradients definition */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5eed9" />
              <stop offset="35%" stopColor="#dfc27d" />
              <stop offset="70%" stopColor="#c58e37" />
              <stop offset="100%" stopColor="#af732b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col tracking-[0.18em]">
          <span className="font-display font-semibold text-lg text-white leading-tight drop-shadow-md">
            {logoText}
          </span>
          <span className="text-[10px] text-gold-400 font-sans font-light tracking-[0.45em] -mt-0.5 uppercase">
            {logoSubtext}
          </span>
        </div>
      )}
    </div>
  );
}
