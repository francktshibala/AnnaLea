import React from 'react';
import { HeroImage } from '@/components/hero/HeroImage';
import { headers } from 'next/headers';

// Force dynamic rendering to prevent static caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AboutPage() {
  // Force dynamic rendering by using headers
  const headersList = headers();
  return (
    <main className="min-h-screen">
      {/* Row 1: Hero Section (exactly same as homepage) */}
      <HeroImage variant="biblical-pattern" />
      
      {/* Row 2: About Anna Lea - Photo + Text Card */}
      <section className="pt-20 pb-20 lg:pt-24 lg:pb-32 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch justify-center">
            
            {/* Photo Container - Left Side */}
            <div className="flex justify-center lg:justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg" style={{ margin: '1rem' }}>
                <div className="rounded-2xl overflow-hidden relative mx-auto"
                     style={{ 
                       boxShadow: '0 20px 40px rgba(107, 124, 89, 0.3)',
                       border: '4px solid var(--sage-green)',
                       height: '500px',
                       minHeight: '500px'
                     }}>
                  <img 
                    src="/images/anna-lea-bio.jpg" 
                    alt="Anna Lea Cannon - Author Photo"
                    className="w-full h-full object-cover"
                    style={{ 
                      filter: 'brightness(1.05) contrast(1.1)'
                    }}
                  />
                  {/* Photo overlay label */}
                  <div className="absolute bottom-0 left-0 right-0 text-center py-3"
                       style={{ 
                         backgroundColor: 'var(--sage-green)', 
                         backgroundImage: 'linear-gradient(135deg, var(--sage-green) 0%, var(--burgundy) 100%)'
                       }}>
                    <div className="text-sm font-semibold text-white font-sans tracking-wide">
                      Anna Lea Cannon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Card Container - Right Side */}
            <div className="flex items-stretch justify-center">
              <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl flex flex-col justify-center mx-auto" 
                   style={{ 
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.25), 0 8px 24px rgba(139, 74, 107, 0.15)',
                     height: '500px',
                     minHeight: '500px',
                     padding: '2rem',
                     margin: '1rem'
                   }}>
                
                {/* Card Header */}
                <div className="mb-4 text-center lg:text-left">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-display mb-3 tracking-tight leading-tight"
                      style={{ color: 'var(--charcoal-navy)' }}>
                    About Anna Lea
                  </h1>
                  <div className="w-12 h-1 rounded-full mx-auto lg:mx-0"
                       style={{ backgroundColor: 'var(--burgundy)' }}></div>
                </div>
                
                {/* Card Content */}
                <div className="space-y-3 text-sm lg:text-sm xl:text-base font-body leading-relaxed flex-grow text-center lg:text-left overflow-y-auto">
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    Anna Lea Cannon is an American author and educator with a gift for making spiritual truths easy for children to understand.
                  </p>
                  
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    Her teaching background gives her books a warm, natural style—more like sitting with a caring storyteller than reading a sermon.
                  </p>
                  
                  <p style={{ color: 'var(--charcoal-navy)' }}>
                    She's also the author of:
                  </p>
                  
                  {/* Highlighted Books */}
                  <div className="lg:ml-4 space-y-2 py-1">
                    <div className="flex items-start gap-2 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-sm lg:text-base" style={{ color: 'var(--burgundy)' }}>
                          Sweet Fruit: The Palm Tree That Was Touched by Jesus
                        </span>
                        <span className="block text-xs mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A biblical allegory about renewal and forgiveness
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2 justify-center lg:justify-start">
                      <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                           style={{ backgroundColor: 'var(--burgundy)' }}></div>
                      <div className="text-center lg:text-left">
                        <span className="font-bold text-sm lg:text-base" style={{ color: 'var(--burgundy)' }}>
                          A Missionary Widow: The Enduring Power of Faith and Love
                        </span>
                        <span className="block text-xs mt-1" style={{ color: 'var(--charcoal-navy)', opacity: '0.8' }}>
                          A heartfelt adult memoir about faith, grief, and resilience
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mission Statement */}
                  <div className="mt-3 p-2 rounded-lg"
                       style={{ backgroundColor: 'var(--sage-green)', opacity: '0.1' }}>
                    <p className="font-semibold text-xs lg:text-sm text-center" style={{ color: 'var(--sage-green)' }}>
                      Her mission: help families share faith-based stories that make sense to kids.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Row 3: Things Anna Lea Likes to Do */}
      <section className="pt-20 pb-20 lg:pt-24 lg:pb-32 mt-16 lg:mt-20" style={{ backgroundColor: 'white' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          
          {/* Section Title */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-4 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Things Anna Lea Likes to Do
            </h2>
            <div className="w-16 h-1 rounded-full mx-auto"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            
            {/* Activity 1: Reading & Book Collecting */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 32px rgba(107, 124, 89, 0.2)',
                       border: '3px solid var(--sage-green)',
                       height: '300px',
                       minHeight: '300px'
                     }}>
                  <img 
                    src="/images/anna-hobbies/reading.jpg" 
                    alt="Anna Lea reading books"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg flex flex-col justify-center"
                   style={{ 
                     border: '2px solid var(--sage-green)',
                     height: '300px',
                     minHeight: '300px',
                     padding: '1.5rem'
                   }}>
                <h3 className="text-lg lg:text-xl font-bold font-display mb-3"
                    style={{ color: 'var(--burgundy)' }}>
                  Reading & Book Collecting
                </h3>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Anna Lea has always been passionate about books. She loves discovering new authors, 
                  collecting vintage children's books, and spending quiet afternoons immersed in stories 
                  that inspire her own writing. Her personal library is filled with treasures from 
                  around the world.
                </p>
              </div>
            </div>

            {/* Activity 2: Gardening & Nature */}
            <div className="flex flex-col lg:flex-row-reverse gap-6 items-center">
              <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 32px rgba(107, 124, 89, 0.2)',
                       border: '3px solid var(--sage-green)',
                       height: '300px',
                       minHeight: '300px'
                     }}>
                  <img 
                    src="/images/anna-hobbies/gardening.jpg" 
                    alt="Anna Lea in her garden"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg flex flex-col justify-center"
                   style={{ 
                     border: '2px solid var(--sage-green)',
                     height: '300px',
                     minHeight: '300px',
                     padding: '1.5rem'
                   }}>
                <h3 className="text-lg lg:text-xl font-bold font-display mb-3"
                    style={{ color: 'var(--burgundy)' }}>
                  Gardening & Nature
                </h3>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Finding peace in God's creation, Anna Lea tends to her garden with the same care 
                  she brings to her writing. She grows herbs, flowers, and vegetables, often drawing 
                  spiritual parallels between gardening and faith that inspire her biblical stories.
                </p>
              </div>
            </div>

            {/* Activity 3: Writing & Storytelling */}
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 32px rgba(107, 124, 89, 0.2)',
                       border: '3px solid var(--sage-green)',
                       height: '300px',
                       minHeight: '300px'
                     }}>
                  <img 
                    src="/images/anna-hobbies/writing.jpg" 
                    alt="Anna Lea writing at her desk"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg flex flex-col justify-center"
                   style={{ 
                     border: '2px solid var(--sage-green)',
                     height: '300px',
                     minHeight: '300px',
                     padding: '1.5rem'
                   }}>
                <h3 className="text-lg lg:text-xl font-bold font-display mb-3"
                    style={{ color: 'var(--burgundy)' }}>
                  Writing & Storytelling
                </h3>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Beyond her published works, Anna Lea enjoys crafting new stories and sharing them 
                  with children at local events. She believes every story has the power to teach, 
                  heal, and inspire, making storytelling both her passion and her ministry.
                </p>
              </div>
            </div>

            {/* Activity 4: Cooking & Family Meals */}
            <div className="flex flex-col lg:flex-row-reverse gap-6 items-center">
              <div className="w-full lg:w-1/2">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 32px rgba(107, 124, 89, 0.2)',
                       border: '3px solid var(--sage-green)',
                       height: '300px',
                       minHeight: '300px'
                     }}>
                  <img 
                    src="/images/anna-hobbies/cooking.jpg" 
                    alt="Anna Lea cooking with family"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg flex flex-col justify-center"
                   style={{ 
                     border: '2px solid var(--sage-green)',
                     height: '300px',
                     minHeight: '300px',
                     padding: '1.5rem'
                   }}>
                <h3 className="text-lg lg:text-xl font-bold font-display mb-3"
                    style={{ color: 'var(--burgundy)' }}>
                  Cooking & Family Meals
                </h3>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Anna Lea treasures time in the kitchen, preparing meals that bring family together. 
                  She loves trying new recipes from different cultures and believes that sharing food 
                  is one of the most beautiful ways to show love and build community.
                </p>
              </div>
            </div>

            {/* Activity 5: Faith & Community Service */}
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:col-span-2 justify-center">
              <div className="w-full lg:w-1/4">
                <div className="rounded-2xl overflow-hidden relative"
                     style={{ 
                       boxShadow: '0 16px 32px rgba(107, 124, 89, 0.2)',
                       border: '3px solid var(--sage-green)',
                       height: '300px',
                       minHeight: '300px'
                     }}>
                  <img 
                    src="/images/anna-hobbies/community.jpg" 
                    alt="Anna Lea serving in community"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg flex flex-col justify-center"
                   style={{ 
                     border: '2px solid var(--sage-green)',
                     height: '300px',
                     minHeight: '300px',
                     padding: '1.5rem'
                   }}>
                <h3 className="text-lg lg:text-xl font-bold font-display mb-3"
                    style={{ color: 'var(--burgundy)' }}>
                  Faith & Community Service
                </h3>
                <p className="text-sm lg:text-base font-body leading-relaxed"
                   style={{ color: 'var(--charcoal-navy)' }}>
                  Active in her local church and community, Anna Lea volunteers with children's 
                  programs and literacy initiatives. Her faith guides everything she does, 
                  from her writing to her service, always seeking ways to share God's love.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
