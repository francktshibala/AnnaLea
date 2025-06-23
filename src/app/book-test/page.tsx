import { BookCard } from '@/components/book';

export default function BookTestPage() {
  const mockBook = {
    id: '1',
    title: 'Isaiah Tree: The Olive Tree That Jesus Touched',
    author: 'Anna Lea Cannon',
    price: 12.99,
    image: '/images/isaiah-tree.jpg',
    description: 'A story of hope, faith, and divine connection with an ancient olive tree that witnessed Christ\'s presence.',
  };

  const handleAddToCart = (book: any) => {
    console.log('Added to cart:', book);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          BookCard Component Test
        </h1>
        
        {/* Different sizes showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Small Size</h2>
            <BookCard 
              book={mockBook} 
              size="small" 
              onAddToCart={handleAddToCart}
            />
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Medium Size (Default)</h2>
            <BookCard 
              book={mockBook} 
              size="medium" 
              onAddToCart={handleAddToCart}
            />
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Large Size</h2>
            <BookCard 
              book={mockBook} 
              size="large" 
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Loading state */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-xl font-semibold mb-4">Loading State</h2>
          <div className="max-w-sm">
            <BookCard 
              book={mockBook} 
              loading={true}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>

        {/* Responsive grid */}
        <h2 className="text-2xl font-bold text-center mb-8">Responsive Grid Test</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <BookCard
              key={index}
              book={{
                ...mockBook,
                id: String(index + 1),
                title: `Book ${index + 1}: ${mockBook.title}`,
                price: 12.99 + index * 2,
              }}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}