'use client';

import dynamic from 'next/dynamic';

// Dynamically import Styled Components BookCard to bypass CSS build optimization issues
const BookCard = dynamic(() => import('./BookCardStyled').then(mod => ({ default: mod.BookCard })), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="w-full h-[420px] bg-gray-100 rounded-xl animate-pulse" />
    </div>
  ),
});

export { BookCard };
export type { Book, BookCardProps } from './BookCardStyled';