'use client';

import dynamic from 'next/dynamic';

// Dynamically import BookCard to disable SSR and prevent hydration issues
const BookCard = dynamic(() => import('./BookCard').then(mod => ({ default: mod.BookCard })), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="w-full h-[420px] bg-gray-100 rounded-xl animate-pulse" />
    </div>
  ),
});

export { BookCard };
export type { Book, BookCardProps } from './BookCard';