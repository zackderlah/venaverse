'use client';

import { useState, useEffect } from 'react'
import { reviews } from '@/data/reviews'
import ReviewCard from '@/components/ReviewCard'
import SearchBar from '@/components/SearchBar'
import SortSelect from '@/components/SortSelect'

export default function BooksPage() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  
  const bookReviews = reviews.filter(review => review.category === 'books');
  
  const sortedAndFilteredReviews = bookReviews
    .filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-black mb-4 lowercase">book reviews</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg lowercase">
          a collection of my thoughts and ratings for books i've read.
        </p>
        <div className="space-y-8">
          <SearchBar value={search} onChange={setSearch} placeholder="search books by title..." />
          <div className="border-t-2 border-b-2 border-black dark:border-white py-4">
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>
      </section>

      <section>
        <div className="space-y-6">
          {sortedAndFilteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
} 