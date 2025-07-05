// Sample review data for Anna Lea's books
// Realistic Christian book reviews with appropriate themes

import { Review, ReviewStats } from '@/types';

export const sampleReviews: Review[] = [
  // Reviews for "Isaiah Tree: The Olive Tree That Jesus Touched"
  {
    id: 'review-1',
    bookId: '1',
    rating: 5,
    title: 'A Beautiful Testament to Faith',
    content: 'Anna Lea has crafted a truly moving story that speaks to the heart of what it means to witness Christ\'s love. The personification of the olive tree creates such a unique perspective on familiar biblical events. I found myself deeply moved by Isaiah\'s observations and the way faith is portrayed through nature itself.',
    reviewerName: 'Sarah M.',
    reviewerLocation: 'Nashville, TN',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-11-15'
  },
  {
    id: 'review-2',
    bookId: '1',
    rating: 5,
    title: 'Perspective-Changing Read',
    content: 'I\'ve read many Christian fiction books, but this one stands out for its originality. The idea of experiencing Jesus through the eyes of a tree that witnessed His presence is both creative and deeply spiritual. It reminded me that God speaks through all of creation.',
    reviewerName: 'Michael Chen',
    reviewerLocation: 'San Diego, CA',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-10-28'
  },
  {
    id: 'review-3',
    bookId: '1',
    rating: 4,
    title: 'Gentle and Inspiring',
    content: 'A lovely story that my book club enjoyed discussing. Anna Lea writes with such warmth and reverence. While the pacing was a bit slow for my taste, the spiritual insights more than made up for it. Perfect for quiet reflection.',
    reviewerName: 'Linda Johnson',
    reviewerLocation: 'Franklin, TN',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-10-12'
  },
  {
    id: 'review-4',
    bookId: '1',
    rating: 5,
    title: 'Gift from Heaven',
    content: 'I bought this book during a particularly difficult time in my life, and Isaiah\'s story became a source of comfort and strength. The way Anna Lea weaves together hope, faith, and the natural world is simply beautiful. This book will stay with me forever.',
    reviewerName: 'Rebecca Torres',
    reviewerLocation: 'Austin, TX',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-09-22'
  },
  {
    id: 'review-5',
    bookId: '1',
    rating: 4,
    title: 'Unique Approach to Biblical Fiction',
    content: 'As someone who reads a lot of Christian fiction, I appreciated the fresh perspective. The olive tree narrator was a creative choice that really worked. Some parts felt a bit sentimental for my taste, but overall a solid read with genuine spiritual depth.',
    reviewerName: 'David K.',
    reviewerLocation: 'Denver, CO',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-09-08'
  },

  // Reviews for "Sweet Fruit: The Palm Tree That Was Touched by Jesus"
  {
    id: 'review-6',
    bookId: '2',
    rating: 5,
    title: 'A Story of Renewal and Hope',
    content: 'Sweet Fruit\'s journey from loss to renewal mirrors so many of our own struggles. Anna Lea has a gift for making biblical events feel personal and immediate. The Palm Sunday connection was beautifully handled - I felt like I was right there witnessing Christ\'s triumphal entry.',
    reviewerName: 'Patricia Williams',
    reviewerLocation: 'Atlanta, GA',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-11-08'
  },
  {
    id: 'review-7',
    bookId: '2',
    rating: 4,
    title: 'Touching and Well-Written',
    content: 'I read this during Lent and found it to be perfect companion reading. The themes of suffering leading to new life resonated deeply. Anna Lea writes with such compassion and understanding of the human (and tree!) condition.',
    reviewerName: 'James Martinez',
    reviewerLocation: 'Phoenix, AZ',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-10-19'
  },
  {
    id: 'review-8',
    bookId: '2',
    rating: 5,
    title: 'Beautiful Storytelling',
    content: 'The way Anna Lea brings Sweet Fruit to life is simply magical. I found myself caring deeply about this palm tree and her journey. The book reminded me that God can use our deepest sorrows to create something beautiful and life-giving.',
    reviewerName: 'Emily Davis',
    reviewerLocation: 'Charlotte, NC',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-09-30'
  },
  {
    id: 'review-9',
    bookId: '2',
    rating: 4,
    title: 'Heartwarming and Hopeful',
    content: 'This book came recommended by my pastor, and I can see why. It\'s a gentle reminder that even in our darkest moments, God is working to bring about renewal and growth. The palm tree perspective was surprisingly moving.',
    reviewerName: 'Robert Thompson',
    reviewerLocation: 'Memphis, TN',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-09-15'
  },

  // Reviews for "A Missionary Widow: The Enduring Power of Faith and Love"
  {
    id: 'review-10',
    bookId: '3',
    rating: 5,
    title: 'Powerful Testament to God\'s Faithfulness',
    content: 'As a missionary myself, I found Pete and Suzanne\'s story deeply moving and authentic. Anna Lea captures the real challenges of missionary life while showing how God\'s love sustains us through unimaginable loss. This book will encourage anyone facing trials.',
    reviewerName: 'Dr. Susan Rodriguez',
    reviewerLocation: 'Miami, FL',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-11-20'
  },
  {
    id: 'review-11',
    bookId: '3',
    rating: 5,
    title: 'Couldn\'t Put It Down',
    content: 'I read this entire book in one sitting - it was that compelling. Suzanne\'s journey from young love to profound loss to renewed purpose is handled with such sensitivity and grace. Anna Lea has a gift for writing about difficult topics with hope and healing.',
    reviewerName: 'Margaret Foster',
    reviewerLocation: 'Richmond, VA',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-10-25'
  },
  {
    id: 'review-12',
    bookId: '3',
    rating: 4,
    title: 'Real and Raw',
    content: 'This book doesn\'t shy away from the harsh realities of loss and grief, but it does so with such gentleness and faith. I appreciated how Anna Lea showed both the strength and vulnerability of those called to serve. Very well researched and emotionally honest.',
    reviewerName: 'Thomas Lee',
    reviewerLocation: 'Portland, OR',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-10-05'
  },
  {
    id: 'review-13',
    bookId: '3',
    rating: 5,
    title: 'A Story of True Love',
    content: 'The love story between Pete and Suzanne is beautiful, but what struck me most was how their love for God and others sustained them through everything. This book reminded me that love - divine and human - truly conquers all.',
    reviewerName: 'Jennifer Walsh',
    reviewerLocation: 'Seattle, WA',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-09-18'
  },
  {
    id: 'review-14',
    bookId: '3',
    rating: 4,
    title: 'Inspiring and Educational',
    content: 'I learned so much about missionary work and the sacrifices families make to serve others. Anna Lea presents these challenges with respect and understanding. The book is both heart-breaking and uplifting - a difficult balance to achieve.',
    reviewerName: 'Kevin Brown',
    reviewerLocation: 'Dallas, TX',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-09-03'
  },

  // Additional reviews across books
  {
    id: 'review-15',
    bookId: '1',
    rating: 5,
    title: 'Perfect for Bible Study Groups',
    content: 'Our women\'s Bible study read this together and had such rich discussions. Anna Lea provides wonderful discussion questions at the end. The book sparked conversations about how we see God working in the natural world around us.',
    reviewerName: 'Carol Peterson',
    reviewerLocation: 'Oklahoma City, OK',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-08-28'
  },
  {
    id: 'review-16',
    bookId: '2',
    rating: 5,
    title: 'Beautiful Easter Reading',
    content: 'I bought this for my teenage daughter and ended up reading it myself. The Palm Sunday connection made it perfect Easter reading for our family. Anna Lea has a wonderful way of making biblical events accessible and meaningful.',
    reviewerName: 'Michelle Anderson',
    reviewerLocation: 'Salt Lake City, UT',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-08-15'
  },
  {
    id: 'review-17',
    bookId: '3',
    rating: 4,
    title: 'Honest and Hopeful',
    content: 'Having lost my own spouse, I found comfort in Suzanne\'s story. Anna Lea doesn\'t minimize the pain of loss, but she shows how faith can carry us through the darkest valleys. This book was a blessing during my own grief journey.',
    reviewerName: 'Dorothy Hill',
    reviewerLocation: 'Savannah, GA',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-08-01'
  },

  // Amazon Reviews - Real customer feedback
  {
    id: 'amazon-review-1',
    bookId: '3',
    rating: 5,
    title: 'An insightful glimpse into a 1950s LDS romance and missionary service',
    content: 'This biographical account of the courting and marriage of Pete and Suzanne Black takes an interesting turn when he is called on an LDS mission to Minnesota a few weeks after their wedding in the 1950s. Transcriptions from their letters and journals reveals the joys and challenges of growing faith and love in marriage while physically separated by time and distance. The author provides a window into the remarkable lives of these faithful Latter-day Saints.',
    reviewerName: 'Jay H. Buckley',
    reviewerLocation: 'United States',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2025-01-13'
  },
  {
    id: 'amazon-review-2',
    bookId: '1',
    rating: 4,
    title: 'Beautiful illustrations and memorable story',
    content: 'My family really enjoyed this book. Had beautiful illustrations and a message that we enjoyed.',
    reviewerName: 'SC',
    reviewerLocation: 'United States',
    isVerifiedPurchase: true,
    isHighlighted: false,
    date: '2024-12-18'
  },
  {
    id: 'amazon-review-3',
    bookId: '2',
    rating: 5,
    title: 'Sweet Fruit',
    content: 'An excellent read to share with the entire family. This sweet story demonstrates the importance of hope and continued growth for all.',
    reviewerName: 'triciajbiggs',
    reviewerLocation: 'United States',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-07-04'
  },
  {
    id: 'amazon-review-4',
    bookId: '2',
    rating: 5,
    title: 'A wonderful book told from the perspective of nature',
    content: 'I love the narration of this book. It has such a tender and loving feel to it. The illustrations are so beautiful and colorful. The story is beautifully told from the perspective of a fruit tree who witnesses the marvelous events that took place during the ministry of Jesus Christ. I recommend this book for every child to read!',
    reviewerName: 'Ben',
    reviewerLocation: 'United States',
    isVerifiedPurchase: true,
    isHighlighted: true,
    date: '2024-08-15'
  }
];

// Generate stats for each book
export const generateBookStats = (bookId: string): ReviewStats => {
  const bookReviews = sampleReviews.filter(review => review.bookId === bookId);
  const totalReviews = bookReviews.length;
  
  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    };
  }
  
  const ratingDistribution = bookReviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc]++;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  
  const averageRating = bookReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  
  return {
    averageRating,
    totalReviews,
    ratingDistribution
  };
};

// Overall stats for all books
export const overallStats: ReviewStats = {
  averageRating: 4.7,
  totalReviews: sampleReviews.length,
  ratingDistribution: sampleReviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc]++;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 })
};

// Helper functions
export const getReviewsByBookId = (bookId: string): Review[] => {
  return sampleReviews.filter(review => review.bookId === bookId);
};

export const getHighlightedReviews = (bookId?: string): Review[] => {
  const reviews = bookId ? getReviewsByBookId(bookId) : sampleReviews;
  return reviews.filter(review => review.isHighlighted);
};

export const getRecentReviews = (limit: number = 5): Review[] => {
  return sampleReviews
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getTopRatedReviews = (limit: number = 5): Review[] => {
  return sampleReviews
    .filter(review => review.rating >= 4)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};