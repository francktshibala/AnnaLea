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
      
      {/* Row 3: Things Anna Lea Likes to Do - Carousel Style */}
      <section className="py-24 lg:py-32 mt-24 lg:mt-32" style={{ backgroundColor: 'var(--cream)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', paddingLeft: '2rem', paddingRight: '2rem' }}>
          
          {/* Section Title */}
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
                style={{ color: 'var(--charcoal-navy)' }}>
              Things Anna Lea Likes to Do
            </h2>
            <div className="w-20 h-1 rounded-full mx-auto"
                 style={{ backgroundColor: 'var(--burgundy)' }}></div>
          </div>

          {/* Horizontal Carousel Container */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-8 lg:gap-10" style={{ minWidth: 'fit-content' }}>
              
              {/* Card 1: Reading & Book Collecting */}
              <div className="flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                   style={{ 
                     width: '320px',
                     height: '480px',
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                   }}>
                {/* Image Section */}
                <div className="relative"
                     style={{ height: '240px' }}>
                  <img 
                    src="/images/anna-hobbies/reading.jpg" 
                    alt="Anna Lea reading books"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between"
                     style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-4 text-center"
                        style={{ color: 'var(--burgundy)' }}>
                      Reading & Book Collecting
                    </h3>
                    <p className="text-sm font-body leading-relaxed text-center"
                       style={{ color: 'var(--charcoal-navy)' }}>
                      Anna Lea has always been passionate about books. She loves discovering new authors, 
                      collecting vintage children's books, and spending quiet afternoons immersed in stories 
                      that inspire her own writing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Gardening & Nature */}
              <div className="flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                   style={{ 
                     width: '320px',
                     height: '480px',
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                   }}>
                {/* Image Section */}
                <div className="relative"
                     style={{ height: '240px' }}>
                  <img 
                    src="/images/anna-hobbies/gardening.jpg" 
                    alt="Anna Lea in her garden"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between"
                     style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-4 text-center"
                        style={{ color: 'var(--burgundy)' }}>
                      Gardening & Nature
                    </h3>
                    <p className="text-sm font-body leading-relaxed text-center"
                       style={{ color: 'var(--charcoal-navy)' }}>
                      Finding peace in God's creation, Anna Lea tends to her garden with the same care 
                      she brings to her writing. She grows herbs, flowers, and vegetables, drawing 
                      spiritual parallels that inspire her biblical stories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Writing & Storytelling */}
              <div className="flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                   style={{ 
                     width: '320px',
                     height: '480px',
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                   }}>
                {/* Image Section */}
                <div className="relative"
                     style={{ height: '240px' }}>
                  <img 
                    src="/images/anna-hobbies/writing.jpg" 
                    alt="Anna Lea writing at her desk"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between"
                     style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-4 text-center"
                        style={{ color: 'var(--burgundy)' }}>
                      Writing & Storytelling
                    </h3>
                    <p className="text-sm font-body leading-relaxed text-center"
                       style={{ color: 'var(--charcoal-navy)' }}>
                      Beyond her published works, Anna Lea enjoys crafting new stories and sharing them 
                      with children at local events. She believes every story has the power to teach, 
                      heal, and inspire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Cooking & Family Meals */}
              <div className="flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                   style={{ 
                     width: '320px',
                     height: '480px',
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                   }}>
                {/* Image Section */}
                <div className="relative"
                     style={{ height: '240px' }}>
                  <img 
                    src="/images/anna-hobbies/cooking.jpg" 
                    alt="Anna Lea cooking with family"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between"
                     style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-4 text-center"
                        style={{ color: 'var(--burgundy)' }}>
                      Cooking & Family Meals
                    </h3>
                    <p className="text-sm font-body leading-relaxed text-center"
                       style={{ color: 'var(--charcoal-navy)' }}>
                      Anna Lea treasures time in the kitchen, preparing meals that bring family together. 
                      She loves trying new recipes from different cultures and believes that sharing food 
                      is a beautiful way to show love.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5: Faith & Community Service */}
              <div className="flex-shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden"
                   style={{ 
                     width: '320px',
                     height: '480px',
                     border: '3px solid var(--sage-green)',
                     boxShadow: '0 20px 40px rgba(107, 124, 89, 0.15)'
                   }}>
                {/* Image Section */}
                <div className="relative"
                     style={{ height: '240px' }}>
                  <img 
                    src="/images/anna-hobbies/community.jpg" 
                    alt="Anna Lea serving in community"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.05)' }}
                  />
                </div>
                {/* Text Section */}
                <div className="p-6 flex flex-col justify-between"
                     style={{ height: '240px' }}>
                  <div>
                    <h3 className="text-xl font-bold font-display mb-4 text-center"
                        style={{ color: 'var(--burgundy)' }}>
                      Faith & Community Service
                    </h3>
                    <p className="text-sm font-body leading-relaxed text-center"
                       style={{ color: 'var(--charcoal-navy)' }}>
                      Active in her local church and community, Anna Lea volunteers with children's 
                      programs and literacy initiatives. Her faith guides everything she does, 
                      always seeking ways to share God's love.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Scroll Hint */}
          <div className="text-center mt-8">
            <p className="text-sm font-sans italic" style={{ color: 'var(--sage-green)' }}>
              ← Scroll horizontally to see all activities →
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
