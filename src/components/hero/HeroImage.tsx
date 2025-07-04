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
        {/* Olive Branch Arc - Symbol of Peace and Faith */}
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

      {/* HUGE Mountain Ranges - Background Layer */}
      <g opacity="0.25">
        {/* Major Mountain Range - Left */}
        <path d="M0 450 Q 80 300 160 350 Q 240 250 320 300 Q 400 200 480 250 L480 600 L0 600 Z" 
              fill="var(--sage-green)"/>
        
        {/* Major Mountain Range - Right */}  
        <path d="M720 250 Q 800 180 880 220 Q 960 150 1040 190 Q 1120 120 1200 160 L1200 600 L720 600 Z" 
              fill="var(--sage-green)"/>
              
        {/* Mid-range Mountains */}
        <path d="M200 400 Q 300 320 400 360 Q 500 280 600 320 Q 700 240 800 280 Q 900 200 1000 240 L1000 600 L200 600 Z" 
              fill="var(--sage-green)" opacity="0.7"/>
      </g>

      {/* HUGE LDS Temple Complex - Prominent Feature */}
      <g opacity="0.4">
        {/* Main Temple - Central and LARGE (like Cathy Carr buildings) */}
        <g transform="translate(500, 200)">
          {/* Main temple building - MUCH LARGER */}
          <rect x="0" y="120" width="200" height="180" fill="var(--cream)" opacity="0.95"/>
          <polygon points="0,120 100,60 200,120" fill="var(--sage-green)" opacity="0.9"/>
          
          {/* Central Spire - Prominent */}
          <rect x="85" y="60" width="30" height="80" fill="var(--cream)" opacity="0.95"/>
          <polygon points="85,60 100,20 115,60" fill="var(--golden-honey)" opacity="0.95"/>
          
          {/* Side Towers - Larger and More Detailed */}
          <rect x="-40" y="140" width="45" height="100" fill="var(--cream)" opacity="0.9"/>
          <rect x="195" y="140" width="45" height="100" fill="var(--cream)" opacity="0.9"/>
          <polygon points="-40,140 -17.5,100 5,140" fill="var(--sage-green)" opacity="0.85"/>
          <polygon points="195,140 217.5,100 240,140" fill="var(--sage-green)" opacity="0.85"/>
          
          {/* Additional Temple Details */}
          <rect x="20" y="160" width="160" height="8" fill="var(--sage-green)" opacity="0.8"/>
          <rect x="40" y="180" width="120" height="6" fill="var(--sage-green)" opacity="0.7"/>
          <rect x="60" y="200" width="80" height="4" fill="var(--sage-green)" opacity="0.6"/>
        </g>
        
        {/* Secondary Temple Building - Right Side */}
        <g transform="translate(800, 280)">
          <rect x="0" y="80" width="120" height="120" fill="var(--cream)" opacity="0.9"/>
          <polygon points="0,80 60,40 120,80" fill="var(--sage-green)" opacity="0.8"/>
          <rect x="50" y="40" width="20" height="50" fill="var(--cream)" opacity="0.9"/>
          <polygon points="50,40 60,20 70,40" fill="var(--golden-honey)" opacity="0.9"/>
        </g>
        
        {/* Smaller Temple Elements - Left Side */}
        <g transform="translate(200, 320)">
          <rect x="0" y="60" width="80" height="80" fill="var(--cream)" opacity="0.85"/>
          <polygon points="0,60 40,30 80,60" fill="var(--sage-green)" opacity="0.75"/>
          <rect x="35" y="30" width="10" height="35" fill="var(--cream)" opacity="0.85"/>
          <polygon points="35,30 40,15 45,30" fill="var(--golden-honey)" opacity="0.85"/>
        </g>
      </g>

      {/* Enhanced Family Scenes - Much More Visible */}
      <g opacity="0.35">
        {/* Large Family Group - Left Side */}
        <g transform="translate(100, 350)">
          {/* Father figure - LARGER */}
          <circle cx="0" cy="0" r="15" fill="var(--burgundy)"/>
          <rect x="-12" y="15" width="24" height="50" rx="6" fill="var(--burgundy)"/>
          
          {/* Mother figure - LARGER */}
          <circle cx="50" cy="0" r="14" fill="var(--burgundy)"/>
          <path d="M36 15 Q 50 20 64 15 L64 65 L36 65 Z" fill="var(--burgundy)"/>
          
          {/* Teenage child - LARGER */}
          <circle cx="90" cy="8" r="12" fill="var(--burgundy)"/>
          <rect x="78" y="20" width="24" height="40" rx="4" fill="var(--burgundy)"/>
          
          {/* Young child - LARGER */}
          <circle cx="25" cy="15" r="10" fill="var(--burgundy)"/>
          <rect x="15" y="25" width="20" height="30" rx="4" fill="var(--burgundy)"/>
          
          {/* Small child/toddler - NEW */}
          <circle cx="120" cy="20" r="8" fill="var(--burgundy)"/>
          <rect x="112" y="28" width="16" height="22" rx="3" fill="var(--burgundy)"/>
        </g>
        
        {/* Second Family Group - Right Side */}
        <g transform="translate(950, 380)">
          {/* Parents walking together */}
          <circle cx="0" cy="0" r="13" fill="var(--sage-green)"/>
          <rect x="-10" y="13" width="20" height="42" rx="5" fill="var(--sage-green)"/>
          
          <circle cx="35" cy="0" r="12" fill="var(--sage-green)"/>
          <path d="M23 13 Q 35 18 47 13 L47 55 L23 55 Z" fill="var(--sage-green)"/>
          
          {/* Children playing */}
          <circle cx="70" cy="12" r="9" fill="var(--sage-green)"/>
          <rect x="61" y="21" width="18" height="30" rx="3" fill="var(--sage-green)"/>
          
          <circle cx="15" cy="18" r="7" fill="var(--sage-green)"/>
          <rect x="8" y="25" width="14" height="22" rx="3" fill="var(--sage-green)"/>
        </g>
        
        {/* Individual Family Member - Center */}
        <g transform="translate(600, 400)">
          {/* Grandparent figure */}
          <circle cx="0" cy="0" r="11" fill="var(--golden-honey)"/>
          <rect x="-8" y="11" width="16" height="35" rx="4" fill="var(--golden-honey)"/>
          {/* Walking stick detail */}
          <rect x="12" y="5" width="2" height="25" fill="var(--sage-green)"/>
        </g>
      </g>

      {/* People Reading Books - Central Theme */}
      <g opacity="0.3">
        {/* Family Reading Together - Left Side */}
        <g transform="translate(80, 480)">
          {/* Parent reading to children */}
          <circle cx="0" cy="0" r="12" fill="var(--burgundy)"/>
          <rect x="-8" y="12" width="16" height="35" rx="4" fill="var(--burgundy)"/>
          
          {/* Children listening - sitting */}
          <circle cx="25" cy="15" r="8" fill="var(--burgundy)"/>
          <rect x="17" y="23" width="16" height="20" rx="3" fill="var(--burgundy)"/>
          
          <circle cx="45" cy="18" r="7" fill="var(--burgundy)"/>
          <rect x="38" y="25" width="14" height="18" rx="3" fill="var(--burgundy)"/>
          
          {/* Large Book - Central Focus */}
          <rect x="5" y="25" width="20" height="15" rx="2" fill="var(--cream)" opacity="0.9"/>
          <rect x="7" y="27" width="16" height="2" fill="var(--sage-green)" opacity="0.7"/>
          <rect x="7" y="30" width="14" height="1" fill="var(--sage-green)" opacity="0.6"/>
          <rect x="7" y="32" width="12" height="1" fill="var(--sage-green)" opacity="0.6"/>
        </g>
        
        {/* Individual Reader - Center */}
        <g transform="translate(450, 460)">
          {/* Person sitting and reading */}
          <circle cx="0" cy="0" r="11" fill="var(--sage-green)"/>
          <rect x="-8" y="11" width="16" height="32" rx="4" fill="var(--sage-green)"/>
          
          {/* Book in hands */}
          <rect x="-12" y="20" width="24" height="18" rx="3" fill="var(--cream)" opacity="0.9"/>
          <rect x="-10" y="22" width="10" height="2" fill="var(--burgundy)" opacity="0.7"/>
          <rect x="-10" y="25" width="8" height="1" fill="var(--burgundy)" opacity="0.6"/>
          <rect x="-10" y="27" width="9" height="1" fill="var(--burgundy)" opacity="0.6"/>
          <rect x="2" y="22" width="10" height="2" fill="var(--burgundy)" opacity="0.7"/>
          <rect x="2" y="25" width="8" height="1" fill="var(--burgundy)" opacity="0.6"/>
          <rect x="2" y="27" width="7" height="1" fill="var(--burgundy)" opacity="0.6"/>
        </g>
        
        {/* Book Study Group - Right Side */}
        <g transform="translate(900, 470)">
          {/* Multiple people with books */}
          <circle cx="0" cy="0" r="10" fill="var(--golden-honey)"/>
          <rect x="-7" y="10" width="14" height="30" rx="3" fill="var(--golden-honey)"/>
          
          <circle cx="30" cy="0" r="9" fill="var(--golden-honey)"/>
          <rect x="21" y="9" width="18" height="28" rx="3" fill="var(--golden-honey)"/>
          
          <circle cx="60" cy="2" r="8" fill="var(--golden-honey)"/>
          <rect x="52" y="10" width="16" height="25" rx="3" fill="var(--golden-honey)"/>
          
          {/* Shared books */}
          <rect x="10" y="25" width="15" height="12" rx="2" fill="var(--cream)" opacity="0.9"/>
          <rect x="35" y="23" width="18" height="14" rx="2" fill="var(--cream)" opacity="0.9"/>
        </g>
        
        {/* Young Person Reading - Near Temple */}
        <g transform="translate(750, 350)">
          <circle cx="0" cy="0" r="9" fill="var(--sage-green)"/>
          <rect x="-6" y="9" width="12" height="25" rx="3" fill="var(--sage-green)"/>
          
          {/* Book */}
          <rect x="-8" y="15" width="16" height="12" rx="2" fill="var(--cream)" opacity="0.9"/>
          <rect x="-6" y="17" width="6" height="1" fill="var(--burgundy)" opacity="0.7"/>
          <rect x="-6" y="19" width="5" height="1" fill="var(--burgundy)" opacity="0.6"/>
          <rect x="2" y="17" width="6" height="1" fill="var(--burgundy)" opacity="0.7"/>
          <rect x="2" y="19" width="4" height="1" fill="var(--burgundy)" opacity="0.6"/>
        </g>
      </g>
      
      {/* Inspirational Elements */}
      <g opacity="0.15">
        {/* Floating books - scattered around */}
        <g transform="translate(300, 300)">
          <rect x="0" y="0" width="12" height="8" rx="1" fill="var(--burgundy)" transform="rotate(15)"/>
          <rect x="1" y="1" width="5" height="1" fill="var(--cream)" opacity="0.8" transform="rotate(15)"/>
        </g>
        
        <g transform="translate(850, 250)">
          <rect x="0" y="0" width="10" height="7" rx="1" fill="var(--sage-green)" transform="rotate(-20)"/>
          <rect x="1" y="1" width="4" height="1" fill="var(--cream)" opacity="0.8" transform="rotate(-20)"/>
        </g>
        
        <g transform="translate(400, 200)">
          <rect x="0" y="0" width="14" height="9" rx="1" fill="var(--golden-honey)" transform="rotate(30)"/>
          <rect x="1" y="1" width="6" height="1" fill="var(--cream)" opacity="0.8" transform="rotate(30)"/>
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
        paddingBottom: '20px',
        minHeight: '500px'
      }}
    >
      {/* SVG Background */}
      {getSVGContent()}
      
      {/* Content Overlay */}
      {showTypography && (
        <div className="relative max-w-4xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 text-center">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] font-black font-display text-primary mb-8 sm:mb-12 tracking-tighter leading-none">
            Anna Lea Cannon
          </h1>
          
        </div>
      )}
    </section>
  );
};