import React, { useEffect, useState, useMemo } from 'react';
import { cn } from '@/utils';

// MorphingGradient component interface
export interface MorphingGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'default' | 'divine' | 'heavenly' | 'blessed' | 'custom';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'diagonal' | 'vertical' | 'horizontal';
  pattern?: 'linear' | 'radial' | 'conic';
  overlay?: boolean;
  overlayOpacity?: 'light' | 'medium' | 'dark';
  intensity?: 'subtle' | 'normal' | 'vibrant';
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay';
  customColors?: string[];
  responsive?: boolean;
  fullscreen?: boolean;
}

// Predefined color themes
const colorThemes = {
  default: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
  divine: ['#0ea5e9', '#075985', '#fbbf24', '#0284c7'],
  heavenly: ['#e0f2fe', '#bae6fd', '#fef3c7', '#f0f9ff'],
  blessed: ['#dbeafe', '#93c5fd', '#fde68a', '#fef3c7'],
  custom: ['#667eea', '#764ba2'], // Will be overridden by customColors
};

// Animation duration mappings
const speedDurations = {
  slow: '20s',
  medium: '15s',
  fast: '8s',
};

// MorphingGradient component for cinematic backgrounds
export const MorphingGradient: React.FC<MorphingGradientProps> = ({
  theme = 'default',
  speed = 'medium',
  direction = 'diagonal',
  pattern = 'linear',
  overlay = false,
  overlayOpacity = 'medium',
  intensity = 'normal',
  blendMode = 'normal',
  customColors,
  responsive = false,
  fullscreen = false,
  className,
  style,
  ...props
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

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

  // Get colors for the gradient
  const colors = useMemo(() => {
    if (customColors) {
      if (customColors.length < 2) {
        console.warn('CustomColors should contain at least 2 colors for gradient effect');
        return colorThemes.default;
      }
      return customColors;
    }
    return colorThemes[theme] || colorThemes.default;
  }, [theme, customColors]);

  // Generate gradient CSS based on pattern and direction
  const gradientStyle = useMemo(() => {
    const colorStops = colors.join(', ');
    
    let gradientFunction = '';
    let backgroundSize = '400% 400%';
    
    switch (pattern) {
      case 'radial':
        gradientFunction = `radial-gradient(circle, ${colorStops})`;
        backgroundSize = '400% 400%';
        break;
      case 'conic':
        gradientFunction = `conic-gradient(${colorStops})`;
        backgroundSize = '400% 400%';
        break;
      default: // linear
        const directionAngle = getDirectionAngle(direction);
        gradientFunction = `linear-gradient(${directionAngle}, ${colorStops})`;
        backgroundSize = '400% 400%';
        break;
    }

    return {
      background: gradientFunction,
      backgroundSize,
      animationDuration: speedDurations[speed],
      mixBlendMode: blendMode as any,
    };
  }, [colors, pattern, direction, speed, blendMode]);

  // Get direction angle for linear gradients
  function getDirectionAngle(direction: string): string {
    switch (direction) {
      case 'vertical':
        return '0deg';
      case 'horizontal':
        return '90deg';
      default: // diagonal
        return '-45deg';
    }
  }

  // Container classes
  const containerClasses = cn(
    'morphing-gradient',
    
    // Theme classes
    {
      'morphing-gradient-default': theme === 'default',
      'morphing-gradient-divine': theme === 'divine',
      'morphing-gradient-heavenly': theme === 'heavenly',
      'morphing-gradient-blessed': theme === 'blessed',
      'morphing-gradient-custom': theme === 'custom',
    },
    
    // Speed classes
    {
      'morphing-gradient-slow': speed === 'slow',
      'morphing-gradient-medium': speed === 'medium',
      'morphing-gradient-fast': speed === 'fast',
    },
    
    // Direction classes
    {
      'morphing-gradient-diagonal': direction === 'diagonal',
      'morphing-gradient-vertical': direction === 'vertical',
      'morphing-gradient-horizontal': direction === 'horizontal',
    },
    
    // Pattern classes
    {
      'morphing-gradient-linear': pattern === 'linear',
      'morphing-gradient-radial': pattern === 'radial',
      'morphing-gradient-conic': pattern === 'conic',
    },
    
    // Overlay classes
    {
      'morphing-gradient-overlay': overlay,
      'morphing-gradient-overlay-light': overlay && overlayOpacity === 'light',
      'morphing-gradient-overlay-medium': overlay && overlayOpacity === 'medium',
      'morphing-gradient-overlay-dark': overlay && overlayOpacity === 'dark',
    },
    
    // Intensity classes
    {
      'morphing-gradient-subtle': intensity === 'subtle',
      'morphing-gradient-normal': intensity === 'normal',
      'morphing-gradient-vibrant': intensity === 'vibrant',
    },
    
    // Blend mode classes
    {
      'morphing-gradient-multiply': blendMode === 'multiply',
      'morphing-gradient-screen': blendMode === 'screen',
      'morphing-gradient-overlay-blend': blendMode === 'overlay',
    },
    
    // State classes
    {
      'morphing-gradient-reduced-motion': reducedMotion,
      'morphing-gradient-responsive': responsive,
      'morphing-gradient-fullscreen': fullscreen,
    },
    
    className
  );

  // Combined styles
  const combinedStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none',
    ...gradientStyle,
    ...style,
  };

  // Add fullscreen styles if needed
  if (fullscreen) {
    combinedStyle.position = 'fixed';
    combinedStyle.width = '100vw';
    combinedStyle.height = '100vh';
  }

  return (
    <div
      className={containerClasses}
      style={combinedStyle}
      aria-hidden="true"
      {...props}
    >
      {/* Overlay layer if enabled */}
      {overlay && (
        <div 
          className={cn(
            'morphing-gradient-overlay-layer',
            {
              'morphing-gradient-overlay-layer-light': overlayOpacity === 'light',
              'morphing-gradient-overlay-layer-medium': overlayOpacity === 'medium',
              'morphing-gradient-overlay-layer-dark': overlayOpacity === 'dark',
            }
          )}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: getOverlayColor(overlayOpacity),
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

// Helper function to get overlay color
function getOverlayColor(opacity: string): string {
  switch (opacity) {
    case 'light':
      return 'rgba(0, 0, 0, 0.1)';
    case 'dark':
      return 'rgba(0, 0, 0, 0.4)';
    default: // medium
      return 'rgba(0, 0, 0, 0.2)';
  }
}