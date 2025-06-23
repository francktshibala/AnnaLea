import { render, screen } from '@testing-library/react';
import { MorphingGradient } from '../MorphingGradient';

// TDD tests for MorphingGradient component
describe('MorphingGradient Component', () => {
  describe('Basic Rendering', () => {
    it('should render gradient background', () => {
      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toBeInTheDocument();
      expect(gradient).toHaveClass('morphing-gradient');
    });

    it('should apply default theme', () => {
      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-default');
    });
  });

  describe('Theme Variants', () => {
    it('should apply divine theme', () => {
      render(<MorphingGradient theme="divine" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-divine');
    });

    it('should apply heavenly theme', () => {
      render(<MorphingGradient theme="heavenly" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-heavenly');
    });

    it('should apply blessed theme', () => {
      render(<MorphingGradient theme="blessed" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-blessed');
    });

    it('should apply custom theme', () => {
      render(<MorphingGradient theme="custom" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-custom');
    });
  });

  describe('Animation Speed', () => {
    it('should apply slow animation speed', () => {
      render(<MorphingGradient speed="slow" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-slow');
    });

    it('should apply fast animation speed', () => {
      render(<MorphingGradient speed="fast" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-fast');
    });

    it('should apply medium speed by default', () => {
      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-medium');
    });
  });

  describe('Overlay Options', () => {
    it('should render with overlay when specified', () => {
      render(<MorphingGradient overlay data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-overlay');
    });

    it('should apply different overlay opacities', () => {
      render(<MorphingGradient overlay overlayOpacity="light" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-overlay-light');
    });

    it('should support dark overlay', () => {
      render(<MorphingGradient overlay overlayOpacity="dark" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-overlay-dark');
    });
  });

  describe('Direction and Pattern', () => {
    it('should support different gradient directions', () => {
      render(<MorphingGradient direction="vertical" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-vertical');
    });

    it('should support radial pattern', () => {
      render(<MorphingGradient pattern="radial" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-radial');
    });

    it('should support conic pattern', () => {
      render(<MorphingGradient pattern="conic" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-conic');
    });
  });

  describe('Performance and Accessibility', () => {
    it('should respect reduced motion preference', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-reduced-motion');
    });

    it('should be positioned behind content', () => {
      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveStyle({ 
        position: 'absolute',
        zIndex: '-1'
      });
    });

    it('should not interfere with pointer events', () => {
      render(<MorphingGradient data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveStyle({ pointerEvents: 'none' });
    });
  });

  describe('Custom Colors', () => {
    it('should accept custom color array', () => {
      const customColors = ['#ff0000', '#00ff00', '#0000ff'];
      render(
        <MorphingGradient 
          customColors={customColors} 
          data-testid="gradient" 
        />
      );
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient');
      // Custom colors would be applied via inline styles
      expect(gradient).toHaveStyle({ 
        background: expect.stringContaining('linear-gradient')
      });
    });

    it('should validate custom colors array', () => {
      const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
      
      render(
        <MorphingGradient 
          customColors={['invalid']} 
          data-testid="gradient" 
        />
      );
      
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringContaining('CustomColors should contain at least 2 colors')
      );
      
      consoleWarn.mockRestore();
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply mobile-specific optimizations', () => {
      render(<MorphingGradient responsive data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-responsive');
    });

    it('should support full viewport coverage', () => {
      render(<MorphingGradient fullscreen data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-fullscreen');
    });
  });

  describe('Customization', () => {
    it('should apply custom className', () => {
      render(<MorphingGradient className="custom-gradient" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'custom-gradient');
    });

    it('should support intensity levels', () => {
      render(<MorphingGradient intensity="subtle" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-subtle');
    });

    it('should support blend modes', () => {
      render(<MorphingGradient blendMode="multiply" data-testid="gradient" />);
      
      const gradient = screen.getByTestId('gradient');
      expect(gradient).toHaveClass('morphing-gradient', 'morphing-gradient-multiply');
    });
  });
});