'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Author Content */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Anna Lea Cannon
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Christian inspirational storyteller weaving faith, family, and history into 
                heartwarming tales that touch hearts and strengthen faith communities worldwide.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                With over 500 books distributed and a growing community of readers, Anna Lea 
                continues to inspire through her unique blend of historical context and 
                spiritual insight.
              </p>
              <Button variant="primary" size="large">
                Contact Anna Lea
              </Button>
            </div>

            {/* Author Photo Placeholder */}
            <div className="lg:text-right">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl flex items-center justify-center text-blue-600 text-8xl">
                  👩‍💼
                </div>
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Anna Lea Cannon<br />
                  <span className="text-gray-500">Author & Inspirational Writer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Anna Lea's Journey
              </h2>
              <p className="text-xl text-gray-600">
                From faith to storytelling - a life dedicated to inspiring others
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Writing Journey */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  📚 Writing Journey
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Anna Lea's writing journey began with a simple desire to share stories 
                  that strengthen faith and bring hope to families. Drawing inspiration 
                  from biblical narratives and historical events, she crafts tales that 
                  resonate with readers across generations.
                </p>
                <p className="text-lg text-gray-700">
                  Her unique approach combines meticulous historical research with 
                  heartfelt storytelling, creating books that are both educational 
                  and deeply moving.
                </p>
              </div>

              {/* Faith & Ministry */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ✨ Faith & Ministry
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  Rooted in deep Christian faith, Anna Lea's work extends beyond writing. 
                  She actively participates in church ministry and community outreach, 
                  believing that stories have the power to transform lives and 
                  strengthen communities.
                </p>
                <p className="text-lg text-gray-700">
                  Her books have been embraced by churches, schools, and families 
                  worldwide, serving as tools for faith education and inspiration.
                </p>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mission & Vision
              </h3>
              <p className="text-xl text-gray-700 italic mb-4">
                "To weave together faith, history, and hope in stories that inspire 
                readers to discover God's presence in their own lives."
              </p>
              <p className="text-lg text-gray-600">
                Anna Lea believes that every story has the potential to be a bridge 
                between hearts, connecting readers to their faith, their community, 
                and their purpose.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}