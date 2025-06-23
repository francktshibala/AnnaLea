import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

// Mock the animation components
jest.mock('../../animations/FloatingParticles', () => ({
  FloatingParticles: ({ 'data-testid': testId, ...props }: any) => (
    <div data-testid={testId} {...props}>Floating Particles</div>
  ),
}));

jest.mock('../../animations/MorphingGradient', () => ({
  MorphingGradient: ({ 'data-testid': testId, ...props }: any) => (
    <div data-testid={testId} {...props}>Morphing Gradient</div>
  ),
}));

// TDD tests for HeroSection component
describe('HeroSection Component', () => {
  describe('Basic Rendering', () => {
    it('should render hero section with all elements', () => {
      render(<HeroSection />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText(/Anna Lea/i)).toBeInTheDocument();
      expect(screen.getByText(/Christian inspirational storyteller/i)).toBeInTheDocument();
    });

    it('should include cinematic background elements', () => {
      render(<HeroSection />);
      
      expect(screen.getByText('Morphing Gradient')).toBeInTheDocument();
      expect(screen.getByText('Floating Particles')).toBeInTheDocument();
    });

    it('should render main call-to-action buttons', () => {
      render(<HeroSection />);
      
      expect(screen.getByRole('button', { name: /explore books/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /watch trailer/i })).toBeInTheDocument();
    });
  });

  describe('Content Sections', () => {
    it('should display author introduction', () => {
      render(<HeroSection />);
      
      expect(screen.getByText(/Anna Lea Cannon/i)).toBeInTheDocument();
      expect(screen.getByText(/faith, family, and history/i)).toBeInTheDocument();
    });

    it('should show featured book information', () => {
      render(<HeroSection />);
      
      const featuredBook = screen.getByTestId('featured-book');
      expect(featuredBook).toBeInTheDocument();
      expect(featuredBook).toHaveClass('floating-3d');
    });

    it('should display key statistics', () => {
      render(<HeroSection />);
      
      expect(screen.getByText(/500\+/)).toBeInTheDocument(); // Books distributed
      expect(screen.getByText(/readers/i)).toBeInTheDocument();
    });
  });

  describe('Interactive Elements', () => {
    it('should handle explore books button click', () => {
      const mockOnExplore = jest.fn();
      render(<HeroSection onExploreBooks={mockOnExplore} />);
      
      const exploreButton = screen.getByRole('button', { name: /explore books/i });
      fireEvent.click(exploreButton);
      
      expect(mockOnExplore).toHaveBeenCalledTimes(1);
    });

    it('should handle watch trailer button click', () => {
      const mockOnTrailer = jest.fn();
      render(<HeroSection onWatchTrailer={mockOnTrailer} />);
      
      const trailerButton = screen.getByRole('button', { name: /watch trailer/i });
      fireEvent.click(trailerButton);
      
      expect(mockOnTrailer).toHaveBeenCalledTimes(1);
    });

    it('should handle newsletter signup', () => {
      const mockOnSignup = jest.fn();
      render(<HeroSection onNewsletterSignup={mockOnSignup} />);
      
      const emailInput = screen.getByPlaceholderText(/enter your email/i);
      const signupButton = screen.getByRole('button', { name: /get updates/i });
      
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(signupButton);
      
      expect(mockOnSignup).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('3D Book Element', () => {
    it('should render floating book with 3D effects', () => {
      render(<HeroSection />);
      
      const book = screen.getByTestId('floating-book');
      expect(book).toBeInTheDocument();
      expect(book).toHaveClass('book-3d', 'floating-3d');
    });

    it('should display book cover and title', () => {
      render(<HeroSection />);
      
      const book = screen.getByTestId('floating-book');
      expect(book).toHaveTextContent(/Isaiah Tree/i);
    });

    it('should be interactive on hover', () => {
      render(<HeroSection />);
      
      const book = screen.getByTestId('floating-book');
      fireEvent.mouseEnter(book);
      
      // Should have hover class or effect
      expect(book).toHaveClass('book-3d');
    });
  });

  describe('Responsive Behavior', () => {
    it('should adapt layout for mobile', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<HeroSection />);
      
      const hero = screen.getByRole('banner');
      expect(hero).toHaveClass('hero-section-responsive');
    });

    it('should adjust animations for mobile', () => {
      render(<HeroSection responsive />);
      
      expect(screen.getByText('Floating Particles')).toBeInTheDocument();
      expect(screen.getByText('Morphing Gradient')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<HeroSection />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent(/Anna Lea/i);
    });

    it('should include descriptive alt text for images', () => {
      render(<HeroSection />);
      
      const bookImage = screen.getByAltText(/Isaiah Tree book cover/i);
      expect(bookImage).toBeInTheDocument();
    });

    it('should be keyboard navigable', () => {
      render(<HeroSection />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('tabIndex');
      });
    });

    it('should have aria labels for complex interactions', () => {
      render(<HeroSection />);
      
      const hero = screen.getByRole('banner');
      expect(hero).toHaveAttribute('aria-label', expect.stringContaining('Anna Lea'));
    });
  });

  describe('Performance Features', () => {
    it('should respect reduced motion preferences', () => {
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

      render(<HeroSection />);
      
      const hero = screen.getByRole('banner');
      expect(hero).toHaveClass('hero-section-reduced-motion');
    });

    it('should lazy load background animations', () => {
      render(<HeroSection lazyLoad />);
      
      const hero = screen.getByRole('banner');
      expect(hero).toHaveClass('hero-section-lazy');
    });
  });

  describe('Customization Options', () => {
    it('should support custom background theme', () => {
      render(<HeroSection backgroundTheme="divine" />);
      
      expect(screen.getByText('Morphing Gradient')).toBeInTheDocument();
    });

    it('should allow custom hero content', () => {
      const customContent = <div data-testid="custom-content">Custom Hero Content</div>;
      render(<HeroSection customContent={customContent} />);
      
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<HeroSection className="custom-hero" />);
      
      const hero = screen.getByRole('banner');
      expect(hero).toHaveClass('hero-section', 'custom-hero');
    });
  });

  describe('Social Proof Elements', () => {
    it('should display testimonial quotes', () => {
      render(<HeroSection showTestimonials />);
      
      expect(screen.getByText(/inspiring stories/i)).toBeInTheDocument();
    });

    it('should show reader statistics', () => {
      render(<HeroSection showStats />);
      
      expect(screen.getByText(/500\+/)).toBeInTheDocument();
      expect(screen.getByText(/readers worldwide/i)).toBeInTheDocument();
    });
  });
});