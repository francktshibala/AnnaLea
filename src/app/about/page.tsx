'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { HeroSectionEnhanced } from '@/components/sections/HeroSectionEnhanced';
import { JourneyCardExpandable } from '@/components/sections/JourneyCardExpandable';
import { MissionVisionQuote } from '@/components/sections/MissionVisionQuote';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! Anna Lea will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
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
      <section id="contact-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Connect with Anna Lea
              </h2>
              <p className="text-xl text-gray-600">
                Have a question about her books or want to share your story? Send a message below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">📧</span>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">hello@annaleacannon.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">📱</span>
                    <div>
                      <p className="font-medium text-gray-900">Speaking Engagements</p>
                      <p className="text-gray-600">Available for church events and book clubs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">📖</span>
                    <div>
                      <p className="font-medium text-gray-900">Book Discussions</p>
                      <p className="text-gray-600">Join our monthly reader's circle</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-2">📬 Newsletter</h4>
                  <p className="text-sm text-gray-700">
                    Subscribe to receive updates about new books, upcoming events, 
                    and inspirational stories directly from Anna Lea.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Share your thoughts, questions, or feedback..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="large"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}