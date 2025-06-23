import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/utils';

// FloatingParticles component interface
export interface FloatingParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'white' | 'golden' | 'blue' | 'rainbow';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'up' | 'down' | 'random';
  type?: 'circle' | 'star' | 'cross' | 'dot';
  density?: 'sparse' | 'normal' | 'dense';
  opacity?: 'subtle' | 'normal' | 'bright';
  responsive?: boolean;
  adaptive?: boolean;
}

// Individual particle properties
interface ParticleProps {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
  type: string;
}

// FloatingParticles component for cinematic background effects
export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 50,
  size = 'medium',
  color = 'white',
  speed = 'medium',
  direction = 'up',
  type = 'circle',
  density = 'normal',
  opacity = 'normal',
  responsive = false,
  adaptive = false,
  className,
  ...props
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Adjust particle count based on device and settings
  const adjustedCount = useMemo(() => {
    let baseCount = count;

    if (responsive && isMobile) {
      baseCount = Math.floor(baseCount * 0.4); // Reduce by 60% on mobile
    }

    if (density === 'sparse') {
      baseCount = Math.floor(baseCount * 0.6);
    } else if (density === 'dense') {
      baseCount = Math.floor(baseCount * 1.4);
    }

    return Math.max(baseCount, 5); // Minimum 5 particles
  }, [count, responsive, isMobile, density]);

  // Generate particle properties
  const particles = useMemo((): ParticleProps[] => {
    return Array.from({ length: adjustedCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random position (0-100%)
      top: Math.random() * 100,
      delay: Math.random() * 10, // Random delay (0-10s)
      duration: getAnimationDuration(speed) + Math.random() * 5, // Varied duration
      size: getParticleSize(size) + Math.random() * 2, // Varied size
      type,
    }));
  }, [adjustedCount, speed, size, type]);

  // Get animation duration based on speed
  function getAnimationDuration(speed: string): number {
    switch (speed) {
      case 'slow': return 15;
      case 'fast': return 5;
      default: return 10;
    }
  }

  // Get particle size based on size prop
  function getParticleSize(size: string): number {
    switch (size) {
      case 'small': return 2;
      case 'large': return 6;
      default: return 4;
    }
  }

  // Container classes
  const containerClasses = cn(
    'floating-particles',
    
    // Size classes
    {
      'floating-particles-small': size === 'small',
      'floating-particles-medium': size === 'medium',
      'floating-particles-large': size === 'large',
    },
    
    // Color classes
    {
      'floating-particles-white': color === 'white',
      'floating-particles-golden': color === 'golden',
      'floating-particles-blue': color === 'blue',
      'floating-particles-rainbow': color === 'rainbow',
    },
    
    // Speed classes
    {
      'floating-particles-slow': speed === 'slow',
      'floating-particles-medium': speed === 'medium',
      'floating-particles-fast': speed === 'fast',
    },
    
    // Direction classes
    {
      'floating-particles-up': direction === 'up',
      'floating-particles-down': direction === 'down',
      'floating-particles-random': direction === 'random',
    },
    
    // Density classes
    {
      'floating-particles-sparse': density === 'sparse',
      'floating-particles-normal': density === 'normal',
      'floating-particles-dense': density === 'dense',
    },
    
    // Opacity classes
    {
      'floating-particles-subtle': opacity === 'subtle',
      'floating-particles-normal': opacity === 'normal',
      'floating-particles-bright': opacity === 'bright',
    },
    
    // State classes
    {
      'floating-particles-reduced-motion': reducedMotion,
      'floating-particles-responsive': responsive,
      'floating-particles-adaptive': adaptive,
    },
    
    className
  );

  // Individual particle component
  const Particle: React.FC<{ particle: ParticleProps }> = ({ particle }) => {
    const particleClasses = cn(
      'particle',
      `particle-${particle.type}`,
      {
        'particle-circle': particle.type === 'circle',
        'particle-star': particle.type === 'star',
        'particle-cross': particle.type === 'cross',
        'particle-dot': particle.type === 'dot',
      }
    );

    const particleStyle: React.CSSProperties = {
      left: `${particle.left}%`,
      top: `${particle.top}%`,
      animationDelay: `${particle.delay}s`,
      animationDuration: `${particle.duration}s`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
    };

    // Render different particle shapes
    const renderParticleContent = () => {
      switch (particle.type) {
        case 'star':
          return '✦';
        case 'cross':
          return '✚';
        case 'dot':
          return '•';
        default:
          return '';
      }
    };

    return (
      <div 
        className={particleClasses}
        style={particleStyle}
        aria-hidden="true"
      >
        {renderParticleContent()}
      </div>
    );
  };

  return (
    <div
      className={containerClasses}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
      {...props}
    >
      {particles.map(particle => (
        <Particle key={particle.id} particle={particle} />
      ))}
    </div>
  );
};