import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';

// TDD tests for Input component with glassmorphism
describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('should render with default glassmorphism styles', () => {
      render(<Input placeholder="Enter text" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('glass-input');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
    });

    it('should support different types', () => {
      render(<Input type="email" data-testid="email-input" />);
      
      const input = screen.getByTestId('email-input');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should apply custom className', () => {
      render(<Input className="custom-class" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('glass-input', 'custom-class');
    });
  });

  describe('States and Variants', () => {
    it('should render error state', () => {
      render(<Input error="This field is required" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('glass-input', 'glass-input-error');
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('should render success state', () => {
      render(<Input success data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('glass-input', 'glass-input-success');
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('glass-input');
    });

    it('should render with different sizes', () => {
      render(<Input size="large" data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('glass-input', 'glass-input-large');
    });
  });

  describe('Icons and Addons', () => {
    it('should render with left icon', () => {
      const SearchIcon = () => <span data-testid="search-icon">🔍</span>;
      render(<Input leftIcon={<SearchIcon />} data-testid="input" />);
      
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveClass('glass-input-with-left-icon');
    });

    it('should render with right icon', () => {
      const EyeIcon = () => <span data-testid="eye-icon">👁️</span>;
      render(<Input rightIcon={<EyeIcon />} data-testid="input" />);
      
      expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveClass('glass-input-with-right-icon');
    });

    it('should render with both icons', () => {
      const LeftIcon = () => <span data-testid="left-icon">🔍</span>;
      const RightIcon = () => <span data-testid="right-icon">👁️</span>;
      
      render(
        <Input 
          leftIcon={<LeftIcon />} 
          rightIcon={<RightIcon />} 
          data-testid="input" 
        />
      );
      
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveClass('glass-input-with-both-icons');
    });
  });

  describe('Labels and Help Text', () => {
    it('should render with label', () => {
      render(<Input label="Email Address" data-testid="input" />);
      
      const label = screen.getByText('Email Address');
      const input = screen.getByTestId('input');
      
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('glass-input-label');
      expect(input).toHaveAttribute('id');
      expect(label).toHaveAttribute('for', input.getAttribute('id'));
    });

    it('should render with help text', () => {
      render(<Input helpText="We'll never share your email" data-testid="input" />);
      
      const helpText = screen.getByText("We'll never share your email");
      expect(helpText).toBeInTheDocument();
      expect(helpText).toHaveClass('glass-input-help');
    });

    it('should render required label', () => {
      render(<Input label="Password" required data-testid="input" />);
      
      const label = screen.getByText('Password');
      expect(label.textContent).toContain('*');
    });
  });

  describe('Event Handling', () => {
    it('should handle onChange events', () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} data-testid="input" />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'test value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: 'test value'
          })
        })
      );
    });

    it('should handle onFocus and onBlur events', () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(
        <Input 
          onFocus={handleFocus} 
          onBlur={handleBlur} 
          data-testid="input" 
        />
      );
      
      const input = screen.getByTestId('input');
      
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should handle icon click events', () => {
      const handleIconClick = jest.fn();
      const ClickableIcon = () => (
        <button onClick={handleIconClick} data-testid="clickable-icon">
          👁️
        </button>
      );
      
      render(<Input rightIcon={<ClickableIcon />} data-testid="input" />);
      
      const icon = screen.getByTestId('clickable-icon');
      fireEvent.click(icon);
      
      expect(handleIconClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Validation', () => {
    it('should show validation error message', () => {
      render(
        <Input 
          value="invalid-email" 
          error="Please enter a valid email address"
          data-testid="input" 
        />
      );
      
      const input = screen.getByTestId('input');
      const errorMessage = screen.getByText('Please enter a valid email address');
      
      expect(input).toHaveClass('glass-input-error');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('glass-input-error-message');
    });

    it('should clear error state when value becomes valid', () => {
      const { rerender } = render(
        <Input error="Required field" data-testid="input" />
      );
      
      expect(screen.getByTestId('input')).toHaveClass('glass-input-error');
      
      rerender(<Input value="valid value" data-testid="input" />);
      
      expect(screen.getByTestId('input')).not.toHaveClass('glass-input-error');
    });
  });

  describe('Accessibility', () => {
    it('should support ARIA attributes', () => {
      render(
        <Input 
          aria-label="Search books"
          aria-describedby="search-help"
          data-testid="input"
        />
      );
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-label', 'Search books');
      expect(input).toHaveAttribute('aria-describedby', 'search-help');
    });

    it('should be properly labeled for screen readers', () => {
      render(
        <Input 
          label="Email" 
          helpText="Enter your email address"
          data-testid="input" 
        />
      );
      
      const input = screen.getByTestId('input');
      const label = screen.getByText('Email');
      const helpText = screen.getByText('Enter your email address');
      
      expect(label).toHaveAttribute('for', input.getAttribute('id'));
      expect(input).toHaveAttribute('aria-describedby', helpText.getAttribute('id'));
    });

    it('should indicate required fields to screen readers', () => {
      render(<Input label="Password" required data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should announce validation errors to screen readers', () => {
      render(
        <Input 
          error="Password is required" 
          data-testid="input"
        />
      );
      
      const input = screen.getByTestId('input');
      const errorMessage = screen.getByText('Password is required');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', errorMessage.getAttribute('id'));
    });
  });

  describe('Responsive Behavior', () => {
    it('should apply mobile-specific classes', () => {
      render(<Input responsive data-testid="input" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('glass-input', 'glass-input-responsive');
    });
  });
});