import { render, screen, fireEvent } from '@testing-library/react';
import { BookCard } from '../BookCard';

// TDD approach: Write failing tests first for BookCard component
describe('BookCard Component', () => {
  const mockBook = {
    id: '1',
    title: 'Isaiah Tree: The Olive Tree That Jesus Touched',
    author: 'Anna Lea Cannon',
    price: 12.99,
    image: '/images/books/isaiah-tree-cover.jpg',
    description: 'A story of hope, faith, and divine connection with an ancient olive tree',
  };

  it('should render book information correctly', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Isaiah Tree: The Olive Tree That Jesus Touched')).toBeInTheDocument();
    expect(screen.getByText('Anna Lea Cannon')).toBeInTheDocument();
    expect(screen.getByText('$12.99')).toBeInTheDocument();
  });

  it('should render book image with correct alt text', () => {
    render(<BookCard book={mockBook} />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/books/isaiah-tree-cover.jpg');
    expect(image).toHaveAttribute('alt', 'Isaiah Tree: The Olive Tree That Jesus Touched');
  });

  it('should have 3D transform classes for styling', () => {
    render(<BookCard book={mockBook} />);
    
    const card = screen.getByTestId('book-card');
    expect(card).toHaveClass('book-card-3d');
  });

  it('should show add to cart button', () => {
    render(<BookCard book={mockBook} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('should handle add to cart click', () => {
    const mockOnAddToCart = jest.fn();
    render(<BookCard book={mockBook} onAddToCart={mockOnAddToCart} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockBook);
  });

  it('should render in loading state', () => {
    render(<BookCard book={mockBook} loading />);
    
    const card = screen.getByTestId('book-card');
    expect(card).toHaveClass('book-card-loading');
  });

  it('should show glassmorphism effect on hover', () => {
    render(<BookCard book={mockBook} />);
    
    const card = screen.getByTestId('book-card');
    fireEvent.mouseEnter(card);
    
    expect(card).toHaveClass('book-card-hover');
  });

  it('should handle responsive design classes', () => {
    render(<BookCard book={mockBook} size="large" />);
    
    const card = screen.getByTestId('book-card');
    expect(card).toHaveClass('book-card-large');
  });
});