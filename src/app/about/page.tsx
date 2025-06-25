'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { HeroSectionEnhanced } from '@/components/sections/HeroSectionEnhanced';
import { JourneyCardExpandable } from '@/components/sections/JourneyCardExpandable';
import { MissionVisionQuote } from '@/components/sections/MissionVisionQuote';
import { ContactFormEnhanced } from '@/components/sections/ContactFormEnhanced';

export default function AboutPage() {
  const handleFormSubmit = async (formData: any) => {
    // Simulate form submission with existing behavior
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Thank you for your message! Anna Lea will get back to you soon.');
  };

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSectionEnhanced
        title="Meet Anna Lea Cannon"
        subtitle="Christian inspirational storyteller weaving faith, family, and history into heartwarming tales that touch hearts and strengthen faith communities worldwide."
        description="With over 500 books distributed and a growing community of readers, Anna Lea continues to inspire through her unique blend of historical context and spiritual insight."
        ctaText="Contact Anna Lea"
        onCtaClick={handleContactClick}
        authorName="Anna Lea Cannon"
        authorTitle="Author & Inspirational Writer"
      />

      {/* Biography Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 lg:mb-24">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8">
                Anna Lea's Journey
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                From faith to storytelling - a life dedicated to inspiring others
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20 lg:mb-24">
              {/* Enhanced Writing Journey Card */}
              <JourneyCardExpandable
                icon="📚"
                title="Writing Journey"
                content={[
                  "Anna Lea's writing journey began with a simple desire to share stories that strengthen faith and bring hope to families. Drawing inspiration from biblical narratives and historical events, she crafts tales that resonate with readers across generations.",
                  "Her unique approach combines meticulous historical research with heartfelt storytelling, creating books that are both educational and deeply moving.",
                  "Each story is carefully crafted to not only entertain but to provide spiritual insight and historical context that enriches the reader's understanding of faith and community."
                ]}
                initiallyExpanded={false}
              />

              {/* Enhanced Faith & Ministry Card */}
              <JourneyCardExpandable
                icon="✨"
                title="Faith & Ministry"
                content={[
                  "Rooted in deep Christian faith, Anna Lea's work extends beyond writing. She actively participates in church ministry and community outreach, believing that stories have the power to transform lives and strengthen communities.",
                  "Her books have been embraced by churches, schools, and families worldwide, serving as tools for faith education and inspiration.",
                  "Through speaking engagements and book discussions, Anna Lea continues to build bridges between hearts, connecting readers to their faith, their community, and their purpose."
                ]}
                initiallyExpanded={false}
              />
            </div>

            {/* Enhanced Mission Statement */}
            <MissionVisionQuote
              title="Mission & Vision"
              quote="To weave together faith, history, and hope in stories that inspire readers to discover God's presence in their own lives."
              description="Anna Lea believes that every story has the potential to be a bridge between hearts, connecting readers to their faith, their community, and their purpose."
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-section" className="py-24 lg:py-40 bg-gray-50">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 lg:mb-24">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8">
                Connect with Anna Lea
              </h2>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Have a question about her books or want to share your story? Send a message below.
              </p>
            </div>

            <ContactFormEnhanced onSubmit={handleFormSubmit} />
          </div>
        </div>
      </section>
    </main>
  );
}