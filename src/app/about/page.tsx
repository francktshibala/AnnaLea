'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';

export default function AboutPage() {
  const [bioVersion, setBioVersion] = useState<'short' | 'long'>('short');

  return (
    <main className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-30)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1200px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h1 className="text-hero text-primary mb-8">
              About Anna Lea Cannon
            </h1>
            <p className="text-body-elegant max-w-3xl mx-auto text-secondary mb-12">
              Christian inspirational storyteller weaving faith, family, and history into heartwarming tales 
              that touch hearts and strengthen faith communities worldwide.
            </p>
            
            {/* Bio Version Toggle */}
            <div className="flex justify-center gap-4 mb-12">
              <Button 
                variant={bioVersion === 'short' ? 'primary' : 'ghost'}
                onClick={() => setBioVersion('short')}
                className="font-sans"
              >
                Short Version
              </Button>
              <Button 
                variant={bioVersion === 'long' ? 'primary' : 'ghost'}
                onClick={() => setBioVersion('long')}
                className="font-sans"
              >
                Long Version
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section style={{ 
        backgroundColor: 'var(--cream-dark)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1000px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Author Photo */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="inline-block p-6 rounded-2xl" 
                     style={{ backgroundColor: 'var(--sage-green-light)', opacity: '0.15' }}>
                  <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative"
                       style={{ 
                         boxShadow: 'var(--shadow-medium)', 
                         border: '3px solid var(--cream)',
                         maxWidth: '300px'
                       }}>
                    <img 
                      src="/images/author-placeholder.svg" 
                      alt="Anna Lea Cannon - Professional Author Photo"
                      className="w-full h-full object-cover"
                      style={{ 
                        transition: 'transform 0.3s ease',
                        filter: 'brightness(1.05) contrast(1.1)' 
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 text-center py-2"
                         style={{ backgroundColor: 'var(--burgundy)', opacity: '0.9' }}>
                      <div className="text-xs font-medium text-white font-sans">Anna Lea Cannon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography Content */}
            <div className="lg:col-span-2">
              {bioVersion === 'short' ? (
                <div className="space-y-6">
                  <h2 className="text-section-heading text-primary mb-6">
                    Short Biography
                  </h2>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Anna Lea Cannon is a Christian inspirational storyteller who weaves together faith, family, and history in her captivating books. Her stories touch hearts and strengthen faith communities worldwide.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    With over 500 books distributed and a growing community of readers, Anna Lea continues to inspire through her unique blend of historical context and spiritual insight. Her most beloved works include the biblical tree series featuring "Isaiah Tree" and "Sweet Fruit," along with moving missionary stories.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Anna Lea believes that every story has the potential to be a bridge between hearts, connecting readers to their faith, their community, and their purpose. Through her writing, she creates windows into God's love and grace.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-section-heading text-primary mb-6">
                    Long Biography
                  </h2>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Anna Lea Cannon's journey as a Christian inspirational storyteller began with a simple desire to share stories that strengthen faith and bring hope to families. Drawing inspiration from biblical narratives and historical events, she crafts tales that resonate with readers across generations, weaving together faith, family, and history in her captivating books.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Her writing journey is deeply rooted in her Christian faith and commitment to ministry. Anna Lea actively participates in church ministry and community outreach, believing that stories have the power to transform lives and strengthen communities. Her unique approach combines meticulous historical research with heartfelt storytelling, creating books that are both educational and deeply moving.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    With over 500 books distributed and a growing community of readers worldwide, Anna Lea has established herself as a trusted voice in Christian inspirational literature. Her most beloved works include the biblical tree series, featuring "Isaiah Tree: The Olive Tree That Jesus Touched" and "Sweet Fruit: The Palm Tree That Was Touched by Jesus," which bring ancient biblical stories to life through the perspectives of the trees that witnessed Christ's ministry.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Anna Lea's missionary stories, including "A Missionary Widow: The Enduring Power of Faith and Love," showcase real-life testimonies of faith, sacrifice, and divine love. These powerful narratives demonstrate how God works through ordinary people to accomplish extraordinary things, inspiring readers to trust in His plan for their own lives.
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    Through speaking engagements and book discussions, Anna Lea continues to build bridges between hearts, connecting readers to their faith, their community, and their purpose. Her mission is clear: "To weave together faith, history, and hope in stories that inspire readers to discover God's presence in their own lives."
                  </p>
                  <p className="text-body-elegant text-secondary leading-relaxed">
                    When she's not writing, Anna Lea enjoys spending time with her family, studying biblical history, and participating in community service projects. She believes that every story has the potential to be a bridge between hearts, and through her writing, she creates windows into God's love and grace that continue to touch lives around the world.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Favorite Things Section */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '1000px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <h2 className="text-section-heading text-primary text-center mb-12">
            Favorite Things
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Favorite Books</h3>
                  <p className="text-body-elegant text-secondary">
                    The Bible (especially the Gospels), C.S. Lewis's Chronicles of Narnia, and historical fiction by Francine Rivers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌿</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Nature Inspiration</h3>
                  <p className="text-body-elegant text-secondary">
                    Olive trees, palm trees, and garden walks where she finds inspiration for her biblical tree stories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✝️</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Faith Practices</h3>
                  <p className="text-body-elegant text-secondary">
                    Morning devotions, prayer walks, and studying biblical history and archaeology
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Family Time</h3>
                  <p className="text-body-elegant text-secondary">
                    Storytelling with grandchildren, family game nights, and sharing meals together
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎵</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Music</h3>
                  <p className="text-body-elegant text-secondary">
                    Hymns, contemporary Christian music, and worship songs that inspire her writing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <h3 className="font-sans font-semibold text-accent mb-1">Ministry</h3>
                  <p className="text-body-elegant text-secondary">
                    Church outreach, community service, and mentoring aspiring Christian writers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ 
        backgroundColor: 'var(--cream-dark)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '800px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h2 className="text-section-heading text-primary mb-8">
              Mission & Vision
            </h2>
            <blockquote className="text-quote mb-8 px-8 py-6 rounded-lg"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}>
              "To weave together faith, history, and hope in stories that inspire readers 
              to discover God's presence in their own lives."
            </blockquote>
            <p className="text-body-elegant text-secondary leading-relaxed mb-8">
              Anna Lea believes that every story has the potential to be a bridge between hearts, 
              connecting readers to their faith, their community, and their purpose. Through her writing, 
              she creates windows into God's love and grace.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ 
        backgroundColor: 'var(--bg-secondary)',
        paddingTop: 'var(--space-25)',
        paddingBottom: 'var(--space-25)'
      }}>
        <div className="mx-auto" style={{ 
          maxWidth: '800px',
          paddingLeft: 'clamp(24px, 7.5vw, 120px)',
          paddingRight: 'clamp(24px, 7.5vw, 120px)'
        }}>
          <div className="text-center">
            <h2 className="text-section-heading text-primary mb-6">
              Connect with Anna Lea
            </h2>
            <p className="text-body-elegant text-secondary max-w-2xl mx-auto mb-8">
              Have a question about her books or want to share your story? Get in touch below.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button variant="primary" as="a" href="/contact" className="font-sans">
                Send a Message
              </Button>
              <Button variant="outline" as="a" href="/" className="font-sans">
                View Books
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}