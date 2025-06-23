import { render, screen } from '@testing-library/react';
import { FloatingParticles } from '../FloatingParticles';

// TDD tests for FloatingParticles animation component
describe('FloatingParticles Component', () => {
  describe('Basic Rendering', () => {
    it('should render particle container', () => {
      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('floating-particles');
    });

    it('should render default number of particles', () => {
      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      expect(particles).toHaveLength(50); // Default count
    });

    it('should render custom number of particles', () => {
      render(<FloatingParticles count={20} data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      expect(particles).toHaveLength(20);
    });
  });

  describe('Particle Configuration', () => {
    it('should apply different particle sizes', () => {
      render(<FloatingParticles size="large" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-large');
    });

    it('should support different colors', () => {
      render(<FloatingParticles color="golden" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-golden');
    });

    it('should apply different animation speeds', () => {
      render(<FloatingParticles speed="fast" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-fast');
    });

    it('should support different directions', () => {
      render(<FloatingParticles direction="up" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-up');
    });
  });

  describe('Particle Types', () => {
    it('should render circle particles by default', () => {
      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      particles.forEach(particle => {
        expect(particle).toHaveClass('particle-circle');
      });
    });

    it('should render star particles when specified', () => {
      render(<FloatingParticles type="star" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      particles.forEach(particle => {
        expect(particle).toHaveClass('particle-star');
      });
    });

    it('should render cross particles when specified', () => {
      render(<FloatingParticles type="cross" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      particles.forEach(particle => {
        expect(particle).toHaveClass('particle-cross');
      });
    });
  });

  describe('Animation Properties', () => {
    it('should have random animation delays', () => {
      render(<FloatingParticles count={5} data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      
      const delays = Array.from(particles).map(particle => 
        window.getComputedStyle(particle).animationDelay
      );
      
      // Check that not all delays are the same (should be randomized)
      const uniqueDelays = new Set(delays);
      expect(uniqueDelays.size).toBeGreaterThan(1);
    });

    it('should have staggered starting positions', () => {
      render(<FloatingParticles count={5} data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      const particles = container.querySelectorAll('.particle');
      
      const positions = Array.from(particles).map(particle => ({
        left: window.getComputedStyle(particle).left,
        top: window.getComputedStyle(particle).top,
      }));
      
      // Check that particles have different positions
      const uniquePositions = new Set(positions.map(p => `${p.left}-${p.top}`));
      expect(uniquePositions.size).toBeGreaterThan(1);
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

      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-reduced-motion');
    });

    it('should be hidden from screen readers', () => {
      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveAttribute('aria-hidden', 'true');
    });

    it('should not interfere with pointer events', () => {
      render(<FloatingParticles data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveStyle({ pointerEvents: 'none' });
    });
  });

  describe('Customization', () => {
    it('should apply custom className', () => {
      render(<FloatingParticles className="custom-particles" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'custom-particles');
    });

    it('should support density control', () => {
      render(<FloatingParticles density="sparse" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-sparse');
    });

    it('should support opacity variants', () => {
      render(<FloatingParticles opacity="subtle" data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-subtle');
    });
  });

  describe('Responsive Behavior', () => {
    it('should reduce particle count on mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<FloatingParticles responsive data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-responsive');
    });

    it('should adapt to container size', () => {
      render(<FloatingParticles adaptive data-testid="particles" />);
      
      const container = screen.getByTestId('particles');
      expect(container).toHaveClass('floating-particles', 'floating-particles-adaptive');
    });
  });
});