# Review System Components

A complete review system for Anna Lea's book website featuring star ratings, individual review cards, and comprehensive review sections.

## Components

### StarRating
Displays star ratings with visual stars and optional numeric rating.

**Props:**
- `rating` (number): Rating value (0-5)
- `maxRating` (number, optional): Maximum rating value (default: 5)
- `size` ('sm' | 'md' | 'lg', optional): Star size (default: 'md')
- `showNumber` (boolean, optional): Show numeric rating (default: false)
- `className` (string, optional): Additional CSS classes

**Example:**
```tsx
<StarRating rating={4.5} size="lg" showNumber />
```

### ReviewCard
Individual review display with rating, title, content, and reviewer information.

**Props:**
- `review` (Review): Review data object
- `variant` ('default' | 'highlighted' | 'compact', optional): Card style variant
- `className` (string, optional): Additional CSS classes

**Example:**
```tsx
<ReviewCard review={reviewData} variant="highlighted" />
```

### ReviewsSection
Complete reviews section with stats, rating distribution, and review grid.

**Props:**
- `reviews` (Review[]): Array of review objects
- `stats` (ReviewStats): Review statistics object
- `bookTitle` (string, optional): Book title for section header
- `showAll` (boolean, optional): Show all reviews by default (default: false)
- `maxReviews` (number, optional): Maximum reviews to show initially (default: 6)
- `className` (string, optional): Additional CSS classes

**Example:**
```tsx
<ReviewsSection
  reviews={bookReviews}
  stats={bookStats}
  bookTitle="Book Title"
  maxReviews={8}
/>
```

## Data Structures

### Review Interface
```typescript
interface Review {
  id: string;
  bookId: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  reviewerName: string;
  reviewerLocation?: string;
  isVerifiedPurchase?: boolean;
  isHighlighted?: boolean; // For featured reviews
  date: string;
}
```

### ReviewStats Interface
```typescript
interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}
```

## Sample Data

The review system includes comprehensive sample data for Anna Lea's books:

- **Isaiah Tree**: 6 reviews (4.8 avg rating)
- **Sweet Fruit**: 4 reviews (4.5 avg rating)
- **A Missionary Widow**: 5 reviews (4.8 avg rating)

Use the helper functions in `/src/data/reviews.ts`:

```typescript
import { 
  getReviewsByBookId, 
  generateBookStats, 
  getHighlightedReviews 
} from '@/data/reviews';

// Get reviews for a specific book
const bookReviews = getReviewsByBookId('1');

// Generate statistics for a book
const bookStats = generateBookStats('1');

// Get highlighted reviews across all books
const featuredReviews = getHighlightedReviews();
```

## Design Features

- **Professional Color Palette**: Uses Anna Lea's sage green, burgundy, and cream colors
- **Typography**: Playfair Display for headings, Lora for body text, Source Sans Pro for UI
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Animations**: Subtle hover effects and transitions
- **Verified Purchase Badges**: Special indicators for verified reviews
- **Rating Distribution**: Visual charts showing rating breakdown

## Integration Examples

### On Book Pages
```tsx
import { ReviewsSection } from '@/components/reviews';
import { getReviewsByBookId, generateBookStats } from '@/data/reviews';

const BookPage = ({ book }) => {
  const reviews = getReviewsByBookId(book.id);
  const stats = generateBookStats(book.id);
  
  return (
    <div>
      {/* Book details */}
      <ReviewsSection
        reviews={reviews}
        stats={stats}
        bookTitle={book.title}
      />
    </div>
  );
};
```

### On Homepage
```tsx
import { ReviewCard, StarRating } from '@/components/reviews';
import { getHighlightedReviews } from '@/data/reviews';

const Homepage = () => {
  const featuredReviews = getHighlightedReviews();
  
  return (
    <section>
      <h2>What Readers Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredReviews.map(review => (
          <ReviewCard key={review.id} review={review} variant="compact" />
        ))}
      </div>
    </section>
  );
};
```

## Demo Page

Visit `/reviews-demo` to see all components in action with various configurations and examples.

## Files Created

- `/src/components/reviews/StarRating.tsx` - Star rating component
- `/src/components/reviews/ReviewCard.tsx` - Individual review card
- `/src/components/reviews/ReviewsSection.tsx` - Complete reviews section
- `/src/components/reviews/index.ts` - Barrel export file
- `/src/data/reviews.ts` - Sample data and helper functions
- `/src/types/index.ts` - Updated with Review and ReviewStats types
- `/src/app/reviews-demo/page.tsx` - Demonstration page
- `/src/components/book/BookPageWithReviews.tsx` - Example integration

## Next Steps

1. **Integration**: Add review components to existing book pages
2. **Data**: Replace sample data with real review data source
3. **Features**: Add review submission form
4. **Analytics**: Track review engagement and ratings
5. **SEO**: Add structured data for review rich snippets