'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Anna Lea Cannon
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Christian inspirational storyteller weaving faith, family, and history
            </p>
          </div>
        </div>
      </section>

      {/* Basic content placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-lg text-gray-700">
              About page content coming soon...
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}