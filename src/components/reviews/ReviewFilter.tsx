'use client';

import React, { useState } from 'react';
import { featuredBooks } from '@/data/books';

export interface FilterOptions {
  bookId: string;
  rating: number;
  sortBy: 'date' | 'rating' | 'helpful';
  sortOrder: 'asc' | 'desc';
}

interface ReviewFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  totalReviews: number;
  filteredCount: number;
}

export const ReviewFilter: React.FC<ReviewFilterProps> = ({
  onFilterChange,
  totalReviews,
  filteredCount
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    bookId: 'all',
    rating: 0,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const bookOptions = [
    { id: 'all', title: 'All Books' },
    ...featuredBooks.map(book => ({ id: book.id, title: book.title }))
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'rating', label: 'Rating' },
    { value: 'helpful', label: 'Most Helpful' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Filter Info */}
        <div className="flex-shrink-0">
          <h3 className="text-lg font-semibold font-display text-primary mb-1">
            Filter Reviews
          </h3>
          <p className="text-sm text-secondary">
            Showing {filteredCount} of {totalReviews} reviews
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Book Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-secondary mb-2">
              Book
            </label>
            <select
              value={filters.bookId}
              onChange={(e) => handleFilterChange({ bookId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors duration-200"
              style={{ borderColor: 'var(--border-light)' }}
            >
              {bookOptions.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-secondary mb-2">
              Rating
            </label>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange({ rating: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors duration-200"
              style={{ borderColor: 'var(--border-light)' }}
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-secondary mb-2">
              Sort by
            </label>
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors duration-200"
                style={{ borderColor: 'var(--border-light)' }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => handleFilterChange({ 
                  sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' 
                })}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                style={{ borderColor: 'var(--border-light)' }}
                title={filters.sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex-shrink-0">
          <button
            onClick={() => handleFilterChange({
              bookId: 'all',
              rating: 0,
              sortBy: 'date',
              sortOrder: 'desc'
            })}
            className="px-4 py-2 text-sm font-medium text-secondary border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            style={{ borderColor: 'var(--border-light)' }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};