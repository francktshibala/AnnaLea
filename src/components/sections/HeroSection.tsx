'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from '@/components/ui';
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

      {/* Main Content Container */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="font-bold text-white mb-6 stagger-fade-in"
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-hero)',
                  lineHeight: 'var(--leading-tight)' 
                }}>
              <span className="block text-shimmer">Anna Lea</span>
              <span className="block font-normal text-white/90 mt-2"
                    style={{ 
                      fontSize: 'var(--text-author-subtitle)',
                      fontFamily: 'var(--font-body-refined)' 
                    }}>
                Cannon
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-white/80 mb-8 stagger-fade-in"
               style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: 'var(--text-author-body)',
                 lineHeight: 'var(--leading-relaxed)' 
               }}>
              Christian inspirational storyteller focusing on{' '}
              <span className="font-semibold" style={{ color: 'var(--color-warm-gold)' }}>faith</span>,{' '}
              <span className="font-semibold" style={{ color: 'var(--color-warm-gold)' }}>family</span>, and{' '}
              <span className="font-semibold" style={{ color: 'var(--color-warm-gold)' }}>history</span>
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 stagger-fade-in">
              <Button
                variant="primary"
                size="large"
                onClick={onExploreBooks}
                className="text-lg px-8 py-4 pulse-glow"
                tabIndex={0}
              >
                Explore Books
              </Button>
              <Button
                variant="outline"
                size="large"
                onClick={onWatchTrailer}
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600"
                tabIndex={0}
              >
                Watch Trailer
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 stagger-fade-in">
              <h3 className="text-lg font-semibold text-white mb-3">
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
                >
                  Get Updates
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Author Photo */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="author-photo-container relative"
              data-testid="author-photo"
            >
              {/* Author Photo */}
              <div className="relative w-64 h-80 lg:w-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/anna-lea-author.jpg"
                  alt="Anna Lea Cannon, Christian author and storyteller"
                  fill
                  className="object-cover"
                  priority={!lazyLoad}
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        {showStats && (
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center stagger-fade-in">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Testimonials */}
        {showTestimonials && (
          <div className="mt-20 text-center stagger-fade-in">
            <h3 className="text-2xl font-bold text-white mb-8">
              What Readers Are Saying
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <blockquote
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
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

      {/* Scroll Indicator */}
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