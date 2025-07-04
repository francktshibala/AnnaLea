'use client';

import React, { useState } from 'react';
import { HeroImage } from '@/components/hero/HeroImage';

export default function HeroTestPage() {
  const [selectedOption, setSelectedOption] = useState<string>('current');

  const renderCurrentHero = () => (
    <section className="relative overflow-hidden" style={{ 
      backgroundColor: 'var(--cream)',
      paddingTop: '120px',
      paddingBottom: '80px',
      minHeight: '500px'
    }}>
      <div className="max-w-6xl mx-auto px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
          Anna Lea Cannon
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-body mb-8 max-w-2xl mx-auto">
          Inspirational Christian Storyteller
        </p>
        <p className="text-lg text-secondary font-body mb-12 max-w-3xl mx-auto">
          Weaving together faith, family, and history in captivating stories that touch hearts 
          and strengthen faith communities worldwide.
        </p>
        <div className="text-sm text-muted">
          📝 Current: Clean text-only hero (no background image)
        </div>
      </div>
    </section>
  );

  const renderSVGOption1 = () => (
    <section className="relative overflow-hidden" style={{ 
      backgroundColor: 'var(--cream)',
      paddingTop: '120px',
      paddingBottom: '80px',
      minHeight: '500px'
    }}>
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none">
          {/* Isaiah Tree - Left */}
          <path 
            d="M150 500 Q 180 400 200 350 Q 220 300 250 250 Q 280 200 300 150"
            stroke="var(--sage-green)" 
            strokeWidth="8" 
            fill="none"
          />
          {/* Tree Branches */}
          <path d="M250 250 Q 230 230 210 220" stroke="var(--sage-green)" strokeWidth="4" fill="none"/>
          <path d="M280 200 Q 300 180 320 170" stroke="var(--sage-green)" strokeWidth="4" fill="none"/>
          
          {/* Sweet Fruit Tree - Right */}
          <path 
            d="M1050 500 Q 1020 400 1000 350 Q 980 300 950 250 Q 920 200 900 150"
            stroke="var(--sage-green)" 
            strokeWidth="8" 
            fill="none"
          />
          {/* Tree Branches */}
          <path d="M950 250 Q 970 230 990 220" stroke="var(--sage-green)" strokeWidth="4" fill="none"/>
          <path d="M920 200 Q 900 180 880 170" stroke="var(--sage-green)" strokeWidth="4" fill="none"/>
          
          {/* Central Cross */}
          <g transform="translate(580, 150)">
            <rect x="-3" y="0" width="6" height="60" fill="var(--burgundy)" opacity="0.6"/>
            <rect x="-20" y="15" width="40" height="6" fill="var(--burgundy)" opacity="0.6"/>
          </g>
          
          {/* Decorative Books */}
          <g transform="translate(400, 400)">
            <rect x="0" y="0" width="80" height="60" rx="4" fill="var(--burgundy)" opacity="0.4"/>
            <rect x="10" y="10" width="60" height="8" fill="var(--cream)" opacity="0.8"/>
            <rect x="10" y="25" width="50" height="6" fill="var(--cream)" opacity="0.6"/>
          </g>
          
          <g transform="translate(720, 420)">
            <rect x="0" y="0" width="80" height="60" rx="4" fill="var(--sage-green)" opacity="0.4"/>
            <rect x="10" y="10" width="60" height="8" fill="var(--cream)" opacity="0.8"/>
            <rect x="10" y="25" width="50" height="6" fill="var(--cream)" opacity="0.6"/>
          </g>
        </svg>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
          Anna Lea Cannon
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-body mb-8 max-w-2xl mx-auto">
          Inspirational Christian Storyteller
        </p>
        <p className="text-lg text-secondary font-body mb-12 max-w-3xl mx-auto">
          Weaving together faith, family, and history in captivating stories that touch hearts 
          and strengthen faith communities worldwide.
        </p>
        <div className="text-sm text-muted">
          🌿 Option 1: Biblical trees + cross + books pattern (subtle)
        </div>
      </div>
    </section>
  );

  const renderSVGOption2 = () => (
    <section className="relative overflow-hidden" style={{ 
      backgroundColor: 'var(--cream)',
      paddingTop: '120px',
      paddingBottom: '80px',
      minHeight: '500px'
    }}>
      {/* Background SVG with Frame */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none">
          {/* Decorative Frame */}
          <rect x="50" y="50" width="1100" height="500" rx="20" 
                stroke="var(--sage-green)" strokeWidth="3" fill="none" opacity="0.2"/>
          
          {/* Corner Flourishes */}
          <g transform="translate(80, 80)" opacity="0.3">
            <path d="M0 0 Q 20 10 40 0 Q 20 20 0 40" fill="var(--sage-green)"/>
          </g>
          <g transform="translate(1120, 80) scale(-1, 1)" opacity="0.3">
            <path d="M0 0 Q 20 10 40 0 Q 20 20 0 40" fill="var(--sage-green)"/>
          </g>
          <g transform="translate(80, 520) scale(1, -1)" opacity="0.3">
            <path d="M0 0 Q 20 10 40 0 Q 20 20 0 40" fill="var(--sage-green)"/>
          </g>
          <g transform="translate(1120, 520) scale(-1, -1)" opacity="0.3">
            <path d="M0 0 Q 20 10 40 0 Q 20 20 0 40" fill="var(--sage-green)"/>
          </g>
          
          {/* Central Olive Branch */}
          <g transform="translate(600, 450)" opacity="0.4">
            <path d="M-100 0 Q -50 -10 0 0 Q 50 -10 100 0" 
                  stroke="var(--sage-green)" strokeWidth="4" fill="none"/>
            {/* Leaves */}
            <ellipse cx="-70" cy="-8" rx="12" ry="6" fill="var(--sage-green)"/>
            <ellipse cx="-30" cy="-12" rx="12" ry="6" fill="var(--sage-green)"/>
            <ellipse cx="30" cy="-12" rx="12" ry="6" fill="var(--sage-green)"/>
            <ellipse cx="70" cy="-8" rx="12" ry="6" fill="var(--sage-green)"/>
          </g>
          
          {/* Scripture Banner */}
          <g transform="translate(600, 120)" opacity="0.15">
            <path d="M-150 0 Q 0 -20 150 0 Q 0 20 -150 0" fill="var(--burgundy)"/>
          </g>
        </svg>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6">
          Anna Lea Cannon
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-body mb-8 max-w-2xl mx-auto">
          Inspirational Christian Storyteller
        </p>
        <p className="text-lg text-secondary font-body mb-12 max-w-3xl mx-auto">
          Weaving together faith, family, and history in captivating stories that touch hearts 
          and strengthen faith communities worldwide.
        </p>
        <div className="text-sm text-muted">
          🎨 Option 2: Elegant frame + olive branch + banner (more prominent)
        </div>
      </div>
    </section>
  );

  const renderPhotoMockup = () => (
    <section className="relative overflow-hidden" style={{ 
      backgroundColor: 'var(--cream)',
      paddingTop: '120px',
      paddingBottom: '80px',
      minHeight: '500px'
    }}>
      {/* Photo Placeholder with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, var(--sage-green) 0%, var(--cream) 50%, var(--burgundy) 100%)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-8xl">📸</div>
        </div>
      </div>
      
      <div className="relative max-w-6xl mx-auto px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-6 drop-shadow-lg">
          Anna Lea Cannon
        </h1>
        <p className="text-xl md:text-2xl text-secondary font-body mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Inspirational Christian Storyteller
        </p>
        <p className="text-lg text-secondary font-body mb-12 max-w-3xl mx-auto drop-shadow-sm">
          Weaving together faith, family, and history in captivating stories that touch hearts 
          and strengthen faith communities worldwide.
        </p>
        <div className="text-sm text-muted">
          📷 Option 3: Photo background mockup (future enhancement)
        </div>
      </div>
    </section>
  );

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-lg p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold font-display text-primary mb-4">
            Hero Image Testing Lab
          </h1>
          <p className="text-secondary font-body mb-6">
            Compare different hero image options to find the perfect match for Anna Lea's author brand.
          </p>
          
          {/* Option Selector */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedOption('current')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedOption === 'current' 
                  ? 'text-white' 
                  : 'text-secondary border border-gray-300'
              }`}
              style={{
                backgroundColor: selectedOption === 'current' ? 'var(--sage-green)' : 'transparent'
              }}
            >
              Current (Text Only)
            </button>
            <button
              onClick={() => setSelectedOption('svg1')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedOption === 'svg1' 
                  ? 'text-white' 
                  : 'text-secondary border border-gray-300'
              }`}
              style={{
                backgroundColor: selectedOption === 'svg1' ? 'var(--sage-green)' : 'transparent'
              }}
            >
              SVG Option 1 (Biblical Pattern)
            </button>
            <button
              onClick={() => setSelectedOption('svg2')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedOption === 'svg2' 
                  ? 'text-white' 
                  : 'text-secondary border border-gray-300'
              }`}
              style={{
                backgroundColor: selectedOption === 'svg2' ? 'var(--sage-green)' : 'transparent'
              }}
            >
              SVG Option 2 (Elegant Frame)
            </button>
            <button
              onClick={() => setSelectedOption('refined')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedOption === 'refined' 
                  ? 'text-white' 
                  : 'text-secondary border border-gray-300'
              }`}
              style={{
                backgroundColor: selectedOption === 'refined' ? 'var(--sage-green)' : 'transparent'
              }}
            >
              Refined SVG
            </button>
            <button
              onClick={() => setSelectedOption('nature')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedOption === 'nature' 
                  ? 'text-white' 
                  : 'text-secondary border border-gray-300'
              }`}
              style={{
                backgroundColor: selectedOption === 'nature' ? 'var(--sage-green)' : 'transparent'
              }}
            >
              Nature Inspired
            </button>
          </div>
        </div>
      </div>

      {/* Hero Display */}
      {selectedOption === 'current' && renderCurrentHero()}
      {selectedOption === 'svg1' && renderSVGOption1()}
      {selectedOption === 'svg2' && renderSVGOption2()}
      {selectedOption === 'refined' && <HeroImage variant="biblical-pattern" />}
      {selectedOption === 'nature' && <HeroImage variant="nature-inspired" />}
      {selectedOption === 'photo' && renderPhotoMockup()}

      {/* Analysis Section */}
      <div className="bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold font-display text-primary mb-6">
            Option Analysis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold text-primary mb-2">Current (Text Only)</h3>
              <p className="text-sm text-secondary mb-2">Clean, minimal, fast loading</p>
              <div className="text-xs text-muted">
                ✅ Professional<br/>
                ✅ Fast<br/>
                ❌ Less engaging
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold text-primary mb-2">SVG Option 1</h3>
              <p className="text-sm text-secondary mb-2">Biblical trees + cross + books pattern</p>
              <div className="text-xs text-muted">
                ✅ Brand relevant<br/>
                ✅ Scalable<br/>
                ✅ Customizable
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold text-primary mb-2">SVG Option 2</h3>
              <p className="text-sm text-secondary mb-2">Elegant frame + olive branch</p>
              <div className="text-xs text-muted">
                ✅ Sophisticated<br/>
                ✅ Scripture-inspired<br/>
                ✅ Clean design
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold text-primary mb-2">Refined SVG</h3>
              <p className="text-sm text-secondary mb-2">Sophisticated biblical elements</p>
              <div className="text-xs text-muted">
                ✅ Professional quality<br/>
                ✅ Biblical trees + books<br/>
                ✅ Perfect branding
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-bold text-primary mb-2">Nature Inspired</h3>
              <p className="text-sm text-secondary mb-2">Gentle mountains + spiritual elements</p>
              <div className="text-xs text-muted">
                ✅ Peaceful atmosphere<br/>
                ✅ Natural beauty<br/>
                ✅ Subtle approach
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}