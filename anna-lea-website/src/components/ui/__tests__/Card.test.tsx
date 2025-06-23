import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from '../Card';

// TDD approach: Write tests first for Card component with glassmorphism
describe('Card Component', () => {
  describe('Card Container', () => {
    it('should render with default glassmorphism styles', () => {
      render(
        <Card data-testid="card">
          <div>Content</div>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('glass-card');
    });

    it('should apply different glass variants', () => {
      render(
        <Card variant="light" data-testid="card-light">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card-light');
      expect(card).toHaveClass('glass-card', 'glass-card-light');
    });

    it('should support different sizes', () => {
      render(
        <Card size="large" data-testid="card-large">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card-large');
      expect(card).toHaveClass('glass-card', 'glass-card-large');
    });

    it('should handle hover effects when interactive', () => {
      render(
        <Card interactive data-testid="card-interactive">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card-interactive');
      expect(card).toHaveClass('glass-card', 'glass-card-interactive');
    });

    it('should apply custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'custom-class');
    });

    it('should handle different border styles', () => {
      render(
        <Card border="strong" data-testid="card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'glass-border-strong');
    });

    it('should support elevation levels', () => {
      render(
        <Card elevation="high" data-testid="card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'glass-elevation-high');
    });
  });

  describe('CardHeader', () => {
    it('should render header content', () => {
      render(
        <Card>
          <CardHeader>
            <h2>Card Title</h2>
          </CardHeader>
        </Card>
      );
      
      const header = screen.getByRole('heading', { name: /card title/i });
      expect(header).toBeInTheDocument();
      expect(header.closest('.glass-card-header')).toBeInTheDocument();
    });

    it('should apply header-specific classes', () => {
      render(
        <Card>
          <CardHeader data-testid="card-header">
            Title
          </CardHeader>
        </Card>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('glass-card-header');
    });

    it('should support different header variants', () => {
      render(
        <Card>
          <CardHeader variant="highlighted" data-testid="card-header">
            Title
          </CardHeader>
        </Card>
      );
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('glass-card-header', 'glass-card-header-highlighted');
    });
  });

  describe('CardBody', () => {
    it('should render body content', () => {
      render(
        <Card>
          <CardBody data-testid="card-body">
            <p>Card content goes here</p>
          </CardBody>
        </Card>
      );
      
      const body = screen.getByTestId('card-body');
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('glass-card-body');
      expect(screen.getByText('Card content goes here')).toBeInTheDocument();
    });

    it('should handle scrollable content', () => {
      render(
        <Card>
          <CardBody scrollable data-testid="card-body">
            Long content
          </CardBody>
        </Card>
      );
      
      const body = screen.getByTestId('card-body');
      expect(body).toHaveClass('glass-card-body', 'glass-card-body-scrollable');
    });

    it('should support different padding variants', () => {
      render(
        <Card>
          <CardBody padding="large" data-testid="card-body">
            Content
          </CardBody>
        </Card>
      );
      
      const body = screen.getByTestId('card-body');
      expect(body).toHaveClass('glass-card-body', 'glass-card-body-padding-large');
    });
  });

  describe('CardFooter', () => {
    it('should render footer content', () => {
      render(
        <Card>
          <CardFooter data-testid="card-footer">
            <button>Action</button>
          </CardFooter>
        </Card>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('glass-card-footer');
      expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
    });

    it('should support different footer alignments', () => {
      render(
        <Card>
          <CardFooter align="center" data-testid="card-footer">
            Footer content
          </CardFooter>
        </Card>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('glass-card-footer', 'glass-card-footer-center');
    });

    it('should handle bordered footer style', () => {
      render(
        <Card>
          <CardFooter bordered data-testid="card-footer">
            Footer
          </CardFooter>
        </Card>
      );
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('glass-card-footer', 'glass-card-footer-bordered');
    });
  });

  describe('Composite Card', () => {
    it('should render complete card with all sections', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <h3>Book Title</h3>
          </CardHeader>
          <CardBody>
            <p>Book description</p>
          </CardBody>
          <CardFooter>
            <button>Add to Cart</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByRole('heading', { name: /book title/i })).toBeInTheDocument();
      expect(screen.getByText('Book description')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('should maintain proper glassmorphism hierarchy', () => {
      render(
        <Card variant="medium" data-testid="card">
          <CardHeader data-testid="header">Header</CardHeader>
          <CardBody data-testid="body">Body</CardBody>
          <CardFooter data-testid="footer">Footer</CardFooter>
        </Card>
      );
      
      const card = screen.getByTestId('card');
      const header = screen.getByTestId('header');
      const body = screen.getByTestId('body');
      const footer = screen.getByTestId('footer');
      
      expect(card).toHaveClass('glass-card-medium');
      expect(header).toHaveClass('glass-card-header');
      expect(body).toHaveClass('glass-card-body');
      expect(footer).toHaveClass('glass-card-footer');
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA attributes', () => {
      render(
        <Card role="article" aria-label="Book card" data-testid="card">
          Content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-label', 'Book card');
    });

    it('should be keyboard navigable when interactive', () => {
      render(
        <Card interactive tabIndex={0} data-testid="card">
          Interactive content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveClass('glass-card-interactive');
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply responsive classes', () => {
      render(
        <Card responsive data-testid="card">
          Responsive content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'glass-card-responsive');
    });

    it('should handle mobile-specific variants', () => {
      render(
        <Card mobileVariant="compact" data-testid="card">
          Mobile content
        </Card>
      );
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('glass-card', 'glass-card-mobile-compact');
    });
  });
});