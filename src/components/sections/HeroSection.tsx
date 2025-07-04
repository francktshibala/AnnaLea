'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input, BookGlow, TrustBadge } from '@/components/ui';
import { FloatingParticles } from '@/components/animations/FloatingParticles';
import { MorphingGradient } from '@/components/animations/MorphingGradient';
import { cn } from '@/utils';

// HeroSection component interface
export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  backgroundTheme?: 'default' | 'divine' | 'heavenly' | 'blessed';
  responsive?: boolean;
  lazyLoad?: boolean;
  showTestimonials?: boolean;
  showStats?: boolean;
  customContent?: React.ReactNode;
  onExploreBooks?: () => void;
  onWatchTrailer?: () => void;
  onNewsletterSignup?: (email: string) => void;
}

// Testimonial data
const testimonials = [
  {
    text: "Anna Lea's stories touch the heart and strengthen faith",
    author: "Sarah M.",
    location: "Texas"
  },
  {
    text: "Inspiring stories that bring families together",
    author: "Michael R.",
    location: "California"
  }
];

// Stats data
const stats = [
  { number: "500+", label: "Books Distributed" },
  { number: "1000+", label: "Readers Worldwide" },
  { number: "50+", label: "5-Star Reviews" }
];

// HeroSection component for cinematic landing experience
export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundTheme = 'divine',
  responsive = true,
  lazyLoad = false,
  showTestimonials = false,
  showStats = true,
  customContent,
  onExploreBooks,
  onWatchTrailer,
  onNewsletterSignup,
  className,
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion and mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    
    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', checkMobile);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle newsletter signup
  const handleNewsletterSignup = () => {
    if (email && onNewsletterSignup) {
      onNewsletterSignup(email);
      setEmail('');
    }
  };

  // Container classes
  const heroClasses = cn(
    'hero-section',
    'relative',
    'min-h-screen',
    'flex',
    'items-center',
    'justify-center',
    'overflow-hidden',
    'hero-layout-animate',
    {
      'hero-section-responsive': responsive,
      'hero-section-reduced-motion': reducedMotion,
      'hero-section-lazy': lazyLoad,
    },
    className
  );

  return (
    <section
      className={heroClasses}
      role="banner"
      aria-label="Anna Lea Cannon - Christian Author and Storyteller"
      {...props}
    >
      {/* Cinematic Background */}
      <MorphingGradient
        theme={backgroundTheme}
        speed="medium"
        overlay
        overlayOpacity="light"
        responsive={responsive}
        data-testid="hero-gradient"
      />
      
      <FloatingParticles
        count={isMobile ? 20 : 50}
        size="medium"
        color="white"
        speed="slow"
        direction="up"
        type="star"
        opacity="subtle"
        responsive={responsive}
        data-testid="hero-particles"
      />

      {/* Enhanced Balanced Main Content Container */}
      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10" 
        style={{ maxWidth: '1200px' }}
      >
        <div 
          className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-12 items-center min-h-[75vh]"
        >
          
          {/* Left Column - Enhanced Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8 lg:pr-8 px-4 lg:px-0">
            {/* Enhanced Main Heading with New Typography */}
            <h1 className="text-hero mb-6 text-white text-shadow-lg"
                style={{ 
                  letterSpacing: '-0.02em'
                }}>
              <span className="block">
                Anna Lea
              </span>
              <span className="block text-subtitle opacity-90 mt-1"
                    style={{ 
                      letterSpacing: '0.05em'
                    }}>
                Cannon
              </span>
            </h1>

            {/* Enhanced Tagline with New Typography */}
            <p className="text-body-elegant text-white/90 mb-8 max-w-md lg:max-w-none">
              Christian inspirational storyteller focusing on{' '}
              <span className="font-semibold text-shadow-sm" 
                    style={{ 
                      color: 'var(--golden-honey)',
                      fontSize: '1.05em'
                    }}>faith</span>,{' '}
              <span className="font-semibold text-shadow-sm" 
                    style={{ 
                      color: 'var(--golden-honey)',
                      fontSize: '1.05em'
                    }}>family</span>, and{' '}
              <span className="font-semibold text-shadow-sm" 
                    style={{ 
                      color: 'var(--golden-honey)',
                      fontSize: '1.05em'
                    }}>history</span>
            </p>

            {/* Enhanced Call to Action Buttons with Mobile Optimization */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8">
              <Button
                variant="primary"
                size="large"
                onClick={onExploreBooks}
                className="text-lg font-semibold px-8 sm:px-10 py-4 sm:py-5 pulse-glow transform hover:scale-105 transition-all duration-300 shadow-2xl w-full sm:w-auto"
                tabIndex={0}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  letterSpacing: '0.5px',
                  minHeight: '56px'
                }}
              >
                Explore Books
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={onWatchTrailer}
                className="text-lg font-medium px-8 py-4 border-2 border-white/80 text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                tabIndex={0}
                style={{
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.125rem)',
                  letterSpacing: '0.3px',
                  minHeight: '56px'
                }}
              >
                Watch Trailer
              </Button>
            </div>

            {/* Enhanced Newsletter Signup */}
            <div className="backdrop-blur-md rounded-2xl p-6 border transition-all duration-300"
                 style={{
                   backgroundColor: 'var(--sage-green-light)',
                   borderColor: 'var(--border-light)',
                   opacity: '0.95'
                 }}>
              <h3 className="text-ui text-lg font-semibold text-white mb-3">
                Get Updates on New Releases
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/60"
                  aria-label="Email address for newsletter signup"
                />
                <Button
                  variant="secondary"
                  onClick={handleNewsletterSignup}
                  disabled={!email}
                  tabIndex={0}
                  className="transform hover:scale-105 transition-all duration-300"
                >
                  Get Updates
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Author Photo */}
          <div className="flex justify-center lg:justify-center items-center relative lg:pl-4 mt-8 lg:mt-0">
            <BookGlow
              intensity="medium"
              color="gold"
              animated={!reducedMotion}
              size="large"
              className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              <div
                className="author-photo-container relative group author-photo-enhanced author-photo-glow"
                data-testid="author-photo"
                style={{ 
                  filter: 'drop-shadow(0 30px 50px rgba(0, 0, 0, 0.3)) drop-shadow(0 10px 20px rgba(212, 175, 55, 0.15))',
                  transformOrigin: 'center center'
                }}
              >
                {/* Trust Badge */}
                <TrustBadge
                  type="stat"
                  value="500+"
                  label="Copies"
                  variant="gold"
                  size="medium"
                  animated={!reducedMotion}
                  position="top-right"
                  className="trust-badge-float"
                />

                {/* Enhanced Professional Photo Frame */}
                <div 
                  className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden transition-all duration-500 book-shimmer"
                  style={{
                    background: 'var(--gradient-secondary)',
                    padding: isMobile ? '6px' : '8px',
                    boxShadow: 'var(--shadow-dark), 0 20px 40px rgba(212, 175, 55, 0.2), 0 0 0 3px var(--golden-honey)',
                    maxWidth: '500px',
                    width: '100%',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  {/* Author Photo */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/anna-lea-author.jpg"
                      alt="Anna Lea Cannon, Christian author and storyteller holding her book"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={!lazyLoad}
                      sizes="(max-width: 480px) 300px, (max-width: 768px) 400px, 500px"
                      style={{
                        filter: 'brightness(1.05) contrast(1.1) saturate(1.1)'
                      }}
                    />
                    
                    {/* Professional vignette effect */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ 
                        background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.1) 100%)',
                        pointerEvents: 'none'
                      }}
                    />
                    
                    {/* Warm overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: 'var(--gradient-accent)' }}
                    />
                  </div>
                </div>
              </div>
            </BookGlow>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        {showStats && (
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center stagger-fade-in">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="backdrop-blur-md rounded-xl p-6 border hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--burgundy)',
                  borderColor: 'var(--border-light)',
                  opacity: '0.9'
                }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 hero-text-shimmer font-display">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm lg:text-base font-sans">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {showTestimonials && (
          <div className="mt-20 text-center stagger-fade-in">
            <h3 className="text-2xl font-bold text-white mb-8 hero-text-shimmer">
              What Readers Are Saying
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300"
                >
                  <p className="text-white/90 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                  <cite className="text-white/70 text-sm">
                    — {testimonial.author}, {testimonial.location}
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {/* Custom Content */}
        {customContent && (
          <div className="mt-20 stagger-fade-in">
            {customContent}
          </div>
        )}
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};