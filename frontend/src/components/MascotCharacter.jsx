import React from 'react';

const MascotCharacter = ({ className }) => {
  return (
    <div className={className}>
      <svg 
        viewBox="0 0 300 420" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
      >
        <defs>
          {/* Hoodie Gradients */}
          <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4600C" />
            <stop offset="100%" stopColor="#C04C0A" />
          </linearGradient>
          <radialGradient id="hoodShadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#1A1A0F" stopOpacity="0" />
            <stop offset="100%" stopColor="#1A1A0F" stopOpacity="0.4" />
          </radialGradient>
          
          {/* Mask Gradients */}
          <linearGradient id="maskGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F5F0E8" />
          </linearGradient>
          
          {/* Glossy sheen */}
          <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Filters */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* --- Body / Torso --- */}
        <path 
          d="M60 300 Q60 220 150 220 Q240 220 240 300 L260 420 L40 420 Z" 
          fill="url(#hoodieGradient)" 
        />
        
        {/* Zipper line */}
        <path d="M150 240 L150 420" stroke="#1A1A0F" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
        
        {/* ANON Badge */}
        <rect x="170" y="280" width="45" height="25" rx="4" fill="#F5F0E8" stroke="#1A1A0F" strokeWidth="2" />
        <text x="175" y="297" fill="#1A1A0F" fontSize="12" fontWeight="900" fontFamily="sans-serif">ANON</text>

        {/* --- Neck --- */}
        <rect x="135" y="200" width="30" height="20" fill="#2A2A2A" />

        {/* --- Face / Under-mask --- */}
        <circle cx="150" cy="150" r="75" fill="#1A1A0F" />

        {/* --- Hoodie Hood / Hair framing --- */}
        <path 
          d="M70 150 A80 85 0 0 1 230 150 L235 220 Q150 235 65 220 Z" 
          fill="#F4600C" 
        />
        <path 
          d="M75 155 A75 80 0 0 1 225 155 L220 215 Q150 225 80 215 Z" 
          fill="url(#hoodShadow)" 
        />

        {/* --- Mask Face --- */}
        <g transform="rotate(7 150 160)">
          <rect x="85" y="90" width="130" height="140" rx="60" fill="url(#maskGradient)" stroke="#1A1A0F" strokeWidth="1" />
          
          {/* Eyes */}
          <ellipse cx="115" cy="140" rx="12" ry="18" fill="#1A1A0F" />
          <ellipse cx="185" cy="140" rx="12" ry="18" fill="#1A1A0F" />
          
          {/* Smile */}
          <path d="M110 180 Q150 215 190 180" stroke="#1A1A0F" strokeWidth="6" fill="none" strokeLinecap="round" />
          
          {/* Rosy Cheeks */}
          <circle cx="105" cy="175" r="10" fill="#FFB6C1" opacity="0.4" />
          <circle cx="195" cy="175" r="10" fill="#FFB6C1" opacity="0.4" />
          
          {/* Glossy Sheen */}
          <ellipse cx="115" cy="115" rx="25" ry="15" fill="url(#sheen)" transform="rotate(-30 115 115)" />
        </g>

        {/* --- Hands peeking from sleeves --- */}
        <rect x="35" y="380" width="30" height="40" rx="15" fill="#2A2A2A" />
        <rect x="235" y="380" width="30" height="40" rx="15" fill="#2A2A2A" />
        
        {/* Highlights */}
        <path d="M80 240 Q100 230 130 235" stroke="white" strokeOpacity="0.2" strokeWidth="10" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
};

export default MascotCharacter;
