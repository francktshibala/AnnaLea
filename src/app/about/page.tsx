'use client';

import React from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Debug indicator */}
      <div style={{ fontSize: '12px', color: 'orange', padding: '10px', textAlign: 'center', backgroundColor: 'var(--color-warm-beige)' }}>
        🔍 DEBUG: About page row-based layout redesign in progress
      </div>

      {/* Hero Row - Centered Introduction */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-cream)',
        paddingTop: 'var(--space-30)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h1 className="font-bold" 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-hero)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-8)' 
                }}>
              Meet Anna Lea Cannon
            </h1>
            <p className="max-w-3xl mx-auto"
               style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: 'var(--text-author-body)',
                 lineHeight: 'var(--leading-relaxed)',
                 color: 'var(--color-neutral-600)',
                 marginBottom: 'var(--space-12)' 
               }}>
              Christian inspirational storyteller weaving faith, family, and history into heartwarming tales 
              that touch hearts and strengthen faith communities worldwide.
            </p>
            <Button 
              variant="primary" 
              size="large" 
              onClick={handleContactClick}
            >
              Connect with Anna Lea
            </Button>
          </div>
        </div>
      </section>

      {/* Row 1: Writing Journey (Text Left, Image Right) */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-beige)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="font-bold" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-author-section)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-warm-navy)',
                    marginBottom: 'var(--space-8)' 
                  }}>
                Her Writing Journey
              </h2>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-6)' 
                 }}>
                Anna Lea's writing journey began with a simple desire to share stories that strengthen faith 
                and bring hope to families. Drawing inspiration from biblical narratives and historical events, 
                she crafts tales that resonate with readers across generations.
              </p>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-8)' 
                 }}>
                Her unique approach combines meticulous historical research with heartfelt storytelling, 
                creating books that are both educational and deeply moving.
              </p>
            </div>
            
            {/* Image Content */}
            <div className="lg:text-right">
              <div className="inline-block p-8 rounded-2xl" 
                   style={{ backgroundColor: 'var(--color-warm-cream)' }}>
                <div className="w-72 h-72 rounded-xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', 
                       border: '3px solid var(--color-warm-beige)' 
                     }}>
                  {/* Writing journey image placeholder */}
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-warm-sage)', color: 'white' }}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">📝</div>
                      <div className="text-sm font-medium">Writing Journey</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: Faith & Ministry (Image Left, Text Right) */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-cream)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Content */}
            <div className="lg:text-left">
              <div className="inline-block p-8 rounded-2xl" 
                   style={{ backgroundColor: 'var(--color-warm-beige)' }}>
                <div className="w-72 h-72 rounded-xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', 
                       border: '3px solid var(--color-warm-cream)' 
                     }}>
                  {/* Faith & ministry image placeholder */}
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-warm-gold)', color: 'white' }}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">✨</div>
                      <div className="text-sm font-medium">Faith & Ministry</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text Content */}
            <div>
              <h2 className="font-bold" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-author-section)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-warm-navy)',
                    marginBottom: 'var(--space-8)' 
                  }}>
                Faith & Ministry
              </h2>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-6)' 
                 }}>
                Rooted in deep Christian faith, Anna Lea's work extends beyond writing. She actively 
                participates in church ministry and community outreach, believing that stories have 
                the power to transform lives and strengthen communities.
              </p>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-8)' 
                 }}>
                Through speaking engagements and book discussions, Anna Lea continues to build bridges 
                between hearts, connecting readers to their faith, their community, and their purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Row 3: Mission & Vision (Text Left, Image Right) */}
      <section style={{ 
        backgroundColor: 'var(--color-warm-beige)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="font-bold" 
                  style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontSize: 'var(--text-author-section)',
                    lineHeight: 'var(--leading-tight)',
                    color: 'var(--color-warm-navy)',
                    marginBottom: 'var(--space-8)' 
                  }}>
                Mission & Vision
              </h2>
              <blockquote style={{ 
                   fontFamily: 'var(--font-display)', 
                   fontSize: '22px',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-warm-navy)',
                   fontStyle: 'italic',
                   marginBottom: 'var(--space-6)',
                   paddingLeft: 'var(--space-6)',
                   borderLeft: `4px solid var(--color-warm-gold)`
                 }}>
                "To weave together faith, history, and hope in stories that inspire readers 
                to discover God's presence in their own lives."
              </blockquote>
              <p style={{ 
                   fontFamily: 'var(--font-body-refined)', 
                   fontSize: 'var(--text-author-body)',
                   lineHeight: 'var(--leading-relaxed)',
                   color: 'var(--color-neutral-700)',
                   marginBottom: 'var(--space-8)' 
                 }}>
                Anna Lea believes that every story has the potential to be a bridge between hearts, 
                connecting readers to their faith, their community, and their purpose.
              </p>
            </div>
            
            {/* Image Content */}
            <div className="lg:text-right">
              <div className="inline-block p-8 rounded-2xl" 
                   style={{ backgroundColor: 'var(--color-warm-cream)' }}>
                <div className="w-72 h-72 rounded-xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)', 
                       border: '3px solid var(--color-warm-beige)' 
                     }}>
                  {/* Mission & vision image placeholder */}
                  <div className="w-full h-full flex items-center justify-center"
                       style={{ backgroundColor: 'var(--color-warm-navy)', color: 'white' }}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">🙏</div>
                      <div className="text-sm font-medium">Mission & Vision</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Row */}
      <section id="contact-section" style={{ 
        backgroundColor: 'var(--color-neutral-50)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h2 className="font-bold" 
                style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'var(--text-author-section)',
                  lineHeight: 'var(--leading-tight)',
                  color: 'var(--color-warm-navy)',
                  marginBottom: 'var(--space-8)' 
                }}>
              Connect with Anna Lea
            </h2>
            <p className="max-w-2xl mx-auto"
               style={{ 
                 fontFamily: 'var(--font-body-refined)', 
                 fontSize: 'var(--text-author-body)',
                 lineHeight: 'var(--leading-relaxed)',
                 color: 'var(--color-neutral-600)',
                 marginBottom: 'var(--space-12)' 
               }}>
              Have a question about her books or want to share your story? Get in touch below.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button variant="primary" as="a" href="/contact">
                Send a Message
              </Button>
              <Button variant="outline" as="a" href="/">
                View Books
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}