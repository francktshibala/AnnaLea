'use client';

import React from 'react';

export interface HeroImageProps {
  variant?: 'minimal' | 'biblical-pattern' | 'elegant-frame' | 'nature-inspired';
  showTypography?: boolean;
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({
  variant = 'biblical-pattern',
  showTypography = true,
  className = ''
}) => {
  
  const renderBiblicalPattern = () => (
    <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" className="absolute inset-0">
      {/* Isaiah Tree - Left side with flowing branches */}
      <g opacity="0.35">
        <path 
          d="M100 550 Q 140 450 160 380 Q 180 320 200 260 Q 220 200 240 140 Q 260 80 280 50"
          stroke="var(--sage-green)" 
          strokeWidth="6" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Flowing branches */}
        <path d="M160 380 Q 140 360 115 350 Q 90 340 70 345" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M180 320 Q 200 300 225 295 Q 250 290 270 295" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M200 260 Q 175 240 150 235 Q 125 230 105 235" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M220 200 Q 245 185 275 185 Q 305 185 330 195" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        
        {/* Leaves on branches */}
        <ellipse cx="115" cy="350" rx="8" ry="4" fill="var(--sage-green)" transform="rotate(-15 115 350)"/>
        <ellipse cx="225" cy="295" rx="8" ry="4" fill="var(--sage-green)" transform="rotate(15 225 295)"/>
        <ellipse cx="150" cy="235" rx="8" ry="4" fill="var(--sage-green)" transform="rotate(-20 150 235)"/>
        <ellipse cx="275" cy="185" rx="8" ry="4" fill="var(--sage-green)" transform="rotate(10 275 185)"/>
      </g>

      {/* Sweet Fruit Tree - Right side (palm-like) */}
      <g opacity="0.35">
        <path 
          d="M1100 550 Q 1060 450 1040 380 Q 1020 320 1000 260 Q 980 200 960 140 Q 940 80 920 50"
          stroke="var(--sage-green)" 
          strokeWidth="6" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Palm fronds */}
        <path d="M1040 380 Q 1065 360 1090 355 Q 1115 350 1135 355" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M1020 320 Q 995 300 970 295 Q 945 290 925 295" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M1000 260 Q 1025 240 1050 235 Q 1075 230 1095 235" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M980 200 Q 955 185 925 185 Q 895 185 870 195" stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        
        {/* Fruit/Dates */}
        <circle cx="1090" cy="355" r="5" fill="var(--golden-honey)" opacity="0.8"/>
        <circle cx="970" cy="295" r="5" fill="var(--golden-honey)" opacity="0.8"/>
        <circle cx="1050" cy="235" r="5" fill="var(--golden-honey)" opacity="0.8"/>
        <circle cx="925" cy="185" r="5" fill="var(--golden-honey)" opacity="0.8"/>
      </g>

      {/* Central Spiritual Elements */}
      <g opacity="0.25">
        {/* Gentle Cross */}
        <g transform="translate(590, 120)">
          <rect x="-2" y="0" width="4" height="40" rx="2" fill="var(--burgundy)"/>
          <rect x="-15" y="12" width="30" height="4" rx="2" fill="var(--burgundy)"/>
        </g>
        
        {/* Olive Branch Arc */}
        <g transform="translate(600, 480)">
          <path d="M-120 0 Q -60 -15 0 0 Q 60 -15 120 0" 
                stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          {/* Olive leaves */}
          <ellipse cx="-80" cy="-10" rx="10" ry="5" fill="var(--sage-green)"/>
          <ellipse cx="-40" cy="-12" rx="10" ry="5" fill="var(--sage-green)"/>
          <ellipse cx="0" cy="-8" rx="10" ry="5" fill="var(--sage-green)"/>
          <ellipse cx="40" cy="-12" rx="10" ry="5" fill="var(--sage-green)"/>
          <ellipse cx="80" cy="-10" rx="10" ry="5" fill="var(--sage-green)"/>
        </g>
      </g>

      {/* Scattered Book Elements */}
      <g opacity="0.18">
        {/* Small book illustrations */}
        <g transform="translate(200, 450)">
          <rect x="0" y="0" width="60" height="45" rx="3" fill="var(--burgundy)"/>
          <rect x="5" y="5" width="50" height="6" fill="var(--cream)" opacity="0.8"/>
          <rect x="5" y="15" width="40" height="4" fill="var(--cream)" opacity="0.6"/>
          <rect x="5" y="25" width="35" height="4" fill="var(--cream)" opacity="0.6"/>
        </g>
        
        <g transform="translate(940, 470)">
          <rect x="0" y="0" width="60" height="45" rx="3" fill="var(--sage-green)"/>
          <rect x="5" y="5" width="50" height="6" fill="var(--cream)" opacity="0.8"/>
          <rect x="5" y="15" width="40" height="4" fill="var(--cream)" opacity="0.6"/>
          <rect x="5" y="25" width="35" height="4" fill="var(--cream)" opacity="0.6"/>
        </g>
        
        <g transform="translate(400, 480)">
          <rect x="0" y="0" width="50" height="38" rx="3" fill="var(--burgundy)"/>
          <rect x="4" y="4" width="42" height="5" fill="var(--cream)" opacity="0.8"/>
          <rect x="4" y="12" width="35" height="3" fill="var(--cream)" opacity="0.6"/>
          <rect x="4" y="18" width="30" height="3" fill="var(--cream)" opacity="0.6"/>
        </g>
      </g>

      {/* LDS Temple - Mountain Background */}
      <g opacity="0.15">
        {/* Mountain silhouettes */}
        <path d="M0 500 Q 150 450 300 480 Q 450 420 600 460 Q 750 400 900 450 Q 1050 420 1200 460 L1200 600 L0 600 Z" 
              fill="var(--sage-green)"/>
        
        {/* Temple structure */}
        <g transform="translate(950, 380)">
          {/* Main temple building */}
          <rect x="0" y="40" width="80" height="60" fill="var(--cream)" opacity="0.9"/>
          <polygon points="0,40 40,15 80,40" fill="var(--sage-green)" opacity="0.8"/>
          
          {/* Temple spire */}
          <rect x="35" y="15" width="10" height="25" fill="var(--cream)" opacity="0.9"/>
          <polygon points="35,15 40,5 45,15" fill="var(--golden-honey)" opacity="0.9"/>
          
          {/* Side towers */}
          <rect x="-10" y="50" width="15" height="30" fill="var(--cream)" opacity="0.8"/>
          <rect x="75" y="50" width="15" height="30" fill="var(--cream)" opacity="0.8"/>
          <polygon points="-10,50 -2.5,40 5,50" fill="var(--sage-green)" opacity="0.7"/>
          <polygon points="75,50 82.5,40 90,50" fill="var(--sage-green)" opacity="0.7"/>
        </g>
      </g>

      {/* Family Silhouettes */}
      <g opacity="0.12">
        {/* Family group - left side */}
        <g transform="translate(150, 420)">
          {/* Father figure */}
          <circle cx="0" cy="0" r="8" fill="var(--burgundy)"/>
          <rect x="-6" y="8" width="12" height="25" rx="3" fill="var(--burgundy)"/>
          {/* Mother figure */}
          <circle cx="25" cy="0" r="7" fill="var(--burgundy)"/>
          <path d="M18 8 Q 25 12 32 8 L32 33 L18 33 Z" fill="var(--burgundy)"/>
          {/* Child figures */}
          <circle cx="45" cy="5" r="5" fill="var(--burgundy)"/>
          <rect x="40" y="10" width="10" height="18" rx="2" fill="var(--burgundy)"/>
          <circle cx="15" cy="8" r="4" fill="var(--burgundy)"/>
          <rect x="11" y="12" width="8" height="15" rx="2" fill="var(--burgundy)"/>
        </g>
      </g>

      {/* Biblical Characters Silhouettes */}
      <g opacity="0.10">
        {/* Prophet figure with scroll */}
        <g transform="translate(450, 450)">
          <circle cx="0" cy="0" r="10" fill="var(--sage-green)"/>
          <rect x="-8" y="10" width="16" height="35" rx="4" fill="var(--sage-green)"/>
          {/* Scroll in hand */}
          <rect x="12" y="15" width="8" height="20" rx="4" fill="var(--cream)" opacity="0.8"/>
        </g>
        
        {/* Angel figure */}
        <g transform="translate(750, 440)">
          <circle cx="0" cy="0" r="8" fill="var(--golden-honey)"/>
          <rect x="-6" y="8" width="12" height="30" rx="3" fill="var(--cream)" opacity="0.9"/>
          {/* Wings */}
          <ellipse cx="-12" cy="15" rx="8" ry="15" fill="var(--golden-honey)" opacity="0.7" transform="rotate(-20 -12 15)"/>
          <ellipse cx="12" cy="15" rx="8" ry="15" fill="var(--golden-honey)" opacity="0.7" transform="rotate(20 12 15)"/>
        </g>
      </g>

      {/* Enhanced Light Rays */}
      <g opacity="0.12">
        <path d="M600 100 Q 500 200 450 300 Q 400 400 380 500" 
              stroke="var(--golden-honey)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M600 100 Q 700 200 750 300 Q 800 400 820 500" 
              stroke="var(--golden-honey)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M600 100 Q 550 250 500 400 Q 450 500 430 550" 
              stroke="var(--golden-honey)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M600 100 Q 650 250 700 400 Q 750 500 770 550" 
              stroke="var(--golden-honey)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Additional radiating light */}
        <path d="M600 100 Q 520 180 480 280 Q 440 380 420 480" 
              stroke="var(--golden-honey)" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M600 100 Q 680 180 720 280 Q 760 380 780 480" 
              stroke="var(--golden-honey)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );

  const renderElegantFrame = () => (
    <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" className="absolute inset-0">
      {/* Elegant border frame */}
      <g opacity="0.15">
        <rect x="60" y="60" width="1080" height="480" rx="15" 
              stroke="var(--sage-green)" strokeWidth="2" fill="none"/>
        <rect x="80" y="80" width="1040" height="440" rx="10" 
              stroke="var(--sage-green)" strokeWidth="1" fill="none" opacity="0.5"/>
      </g>
      
      {/* Corner flourishes */}
      <g opacity="0.2">
        {/* Top left */}
        <g transform="translate(100, 100)">
          <path d="M0 0 Q 15 5 30 0 Q 15 15 0 30 Q -5 15 0 0" fill="var(--sage-green)"/>
        </g>
        {/* Top right */}
        <g transform="translate(1100, 100) scale(-1, 1)">
          <path d="M0 0 Q 15 5 30 0 Q 15 15 0 30 Q -5 15 0 0" fill="var(--sage-green)"/>
        </g>
        {/* Bottom left */}
        <g transform="translate(100, 500) scale(1, -1)">
          <path d="M0 0 Q 15 5 30 0 Q 15 15 0 30 Q -5 15 0 0" fill="var(--sage-green)"/>
        </g>
        {/* Bottom right */}
        <g transform="translate(1100, 500) scale(-1, -1)">
          <path d="M0 0 Q 15 5 30 0 Q 15 15 0 30 Q -5 15 0 0" fill="var(--sage-green)"/>
        </g>
      </g>

      {/* Central vine decoration */}
      <g opacity="0.12">
        <g transform="translate(600, 520)">
          {/* Main vine */}
          <path d="M-200 0 Q -100 -12 0 0 Q 100 -12 200 0" 
                stroke="var(--sage-green)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          {/* Vine leaves */}
          <ellipse cx="-150" cy="-8" rx="12" ry="8" fill="var(--sage-green)" transform="rotate(-10 -150 -8)"/>
          <ellipse cx="-75" cy="-10" rx="12" ry="8" fill="var(--sage-green)" transform="rotate(15 -75 -10)"/>
          <ellipse cx="0" cy="-6" rx="12" ry="8" fill="var(--sage-green)"/>
          <ellipse cx="75" cy="-10" rx="12" ry="8" fill="var(--sage-green)" transform="rotate(-15 75 -10)"/>
          <ellipse cx="150" cy="-8" rx="12" ry="8" fill="var(--sage-green)" transform="rotate(10 150 -8)"/>
        </g>
      </g>

      {/* Scripture banner space */}
      <g opacity="0.08">
        <g transform="translate(600, 140)">
          <path d="M-180 0 Q 0 -15 180 0 Q 0 15 -180 0" fill="var(--burgundy)"/>
        </g>
      </g>
    </svg>
  );

  const renderNatureInspired = () => (
    <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" className="absolute inset-0">
      {/* Gentle mountain silhouettes */}
      <g opacity="0.06">
        <path d="M0 400 Q 150 350 300 400 Q 450 450 600 400 Q 750 350 900 400 Q 1050 450 1200 400 L1200 600 L0 600 Z" 
              fill="var(--sage-green)"/>
        <path d="M0 450 Q 200 400 400 450 Q 600 500 800 450 Q 1000 400 1200 450 L1200 600 L0 600 Z" 
              fill="var(--sage-green)" opacity="0.5"/>
      </g>
      
      {/* Floating spiritual elements */}
      <g opacity="0.08">
        {/* Doves/Birds */}
        <g transform="translate(300, 200)">
          <path d="M0 0 Q 10 -5 20 0 Q 15 5 10 8 Q 5 5 0 0" fill="var(--sage-green)"/>
          <path d="M8 2 Q 15 -2 22 2" stroke="var(--sage-green)" strokeWidth="1" fill="none"/>
        </g>
        <g transform="translate(800, 180)">
          <path d="M0 0 Q 10 -5 20 0 Q 15 5 10 8 Q 5 5 0 0" fill="var(--sage-green)"/>
          <path d="M8 2 Q 15 -2 22 2" stroke="var(--sage-green)" strokeWidth="1" fill="none"/>
        </g>
        
        {/* Gentle clouds */}
        <ellipse cx="400" cy="150" rx="40" ry="15" fill="var(--cream)" opacity="0.3"/>
        <ellipse cx="850" cy="120" rx="35" ry="12" fill="var(--cream)" opacity="0.3"/>
      </g>

      {/* Flowing water element */}
      <g opacity="0.06">
        <path d="M0 500 Q 300 480 600 500 Q 900 520 1200 500" 
              stroke="var(--sage-green)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M0 510 Q 250 495 500 510 Q 750 525 1000 510 Q 1100 505 1200 510" 
              stroke="var(--sage-green)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.7"/>
      </g>
    </svg>
  );

  const renderMinimal = () => (
    <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" className="absolute inset-0">
      {/* Just a gentle gradient overlay */}
      <defs>
        <radialGradient id="gentle-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--cream)" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="var(--sage-green)" stopOpacity="0.05"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#gentle-glow)"/>
    </svg>
  );

  const getSVGContent = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimal();
      case 'biblical-pattern':
        return renderBiblicalPattern();
      case 'elegant-frame':
        return renderElegantFrame();
      case 'nature-inspired':
        return renderNatureInspired();
      default:
        return renderBiblicalPattern();
    }
  };

  return (
    <section 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        backgroundColor: 'var(--cream)',
        paddingTop: '120px',
        paddingBottom: '80px',
        minHeight: '500px'
      }}
    >
      {/* SVG Background */}
      {getSVGContent()}
      
      {/* Content Overlay */}
      {showTypography && (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold font-display text-primary mb-4 sm:mb-6 tracking-tight">
            Anna Lea Cannon
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-secondary font-body mb-6 sm:mb-8 max-w-2xl mx-auto">
            Inspirational Christian Storyteller
          </p>
          <p className="text-base sm:text-lg text-secondary font-body mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Weaving together faith, family, and history in captivating stories that touch hearts 
            and strengthen faith communities worldwide.
          </p>
        </div>
      )}
    </section>
  );
};