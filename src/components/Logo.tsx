import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  logoText?: string;
  logoSubtext?: string;
  logoImage?: string;
  onLoad?: () => void;
}

export default function Logo({ 
  className = '', 
  showText = true, 
  size = 'md', 
  logoText = "SIDDHARTH VIBE", 
  logoSubtext = "EVENTS", 
  logoImage,
  onLoad
}: LogoProps) {
  const [imgLoaded, setImgLoaded] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  // Use a ref to ensure we don't trigger the effect on every render of onLoad
  const onLoadRef = React.useRef(onLoad);
  React.useEffect(() => {
    onLoadRef.current = onLoad;
  }, [onLoad]);

  React.useEffect(() => {
    if (logoImage) {
      const img = new Image();
      img.src = logoImage;
      if (img.complete) {
        setImgLoaded(true);
        onLoadRef.current?.();
      } else {
        setImgLoaded(false);
        setImgError(false);
        img.onload = () => {
          setImgLoaded(true);
          onLoadRef.current?.();
        };
        img.onerror = () => {
          setImgError(true);
          onLoadRef.current?.(); // Call onLoad to unblock even if it fails
        };
      }
    } else {
      setImgLoaded(false);
      setImgError(false);
      onLoadRef.current?.();
    }
  }, [logoImage]);

  const getScale = () => {
    switch (size) {
      case 'sm': return 'scale-75 origin-left';
      case 'lg': return 'scale-125';
      default: return 'scale-100';
    }
  };

  if (logoImage && !imgError) {
    return (
      <div className={`relative flex items-center justify-center select-none ${getScale()} ${className}`}>
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Subtle elegant spinner instead of dummy crest */}
            <div className="w-6 h-6 border-2 border-gold-400/20 border-t-gold-400 rounded-full animate-spin" />
          </div>
        )}
        <img
          src={logoImage}
          alt={logoText || "Siddharth Vibe Events"}
          className={`transition-all duration-500 ease-out transform-gpu ${
            imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${
            size === 'lg'
              ? "h-28 md:h-36 w-auto object-contain max-h-40 filter drop-shadow-[0_0_15px_rgba(197,142,55,0.45)]"
              : size === 'sm'
                ? "h-8 w-auto object-contain max-h-10"
                : "h-11 w-auto object-contain max-h-14"
          }`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${getScale()} ${className}`}>
      {/* No dummy fallback crest/logo shown here before logoImage is uploaded */}

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
