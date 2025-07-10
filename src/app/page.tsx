'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { HeroImage } from '@/components/hero/HeroImage';
import { EndorsementSection } from '@/components/endorsements/EndorsementSection';

export default function Home() {
  // Navigation handler functions
  const handleExploreBooks = () => {
    // Navigate to books page
    window.location.href = '/books';
  };


  return (
    <main className="min-h-screen">
      {/* Hero Image with Biblical Elements */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Church Leader Endorsement */}
      <EndorsementSection />
    </main>
  );
}

