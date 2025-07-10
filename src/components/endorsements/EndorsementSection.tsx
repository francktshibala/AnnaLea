'use client';

import React from 'react';
import Image from 'next/image';

export const EndorsementSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 mt-16 lg:mt-20" style={{ backgroundColor: 'var(--cream)' }}>
      <div style={{ 
        maxWidth: '64rem', 
        margin: '0 auto', 
        paddingLeft: '2rem', 
        paddingRight: '2rem' 
      }}>
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display mb-6 tracking-tight leading-tight"
              style={{ color: 'var(--charcoal-navy)' }}>
            Reader Endorsement
          </h2>
          <div className="w-20 h-1 rounded-full mx-auto"
               style={{ backgroundColor: 'var(--burgundy)' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {/* Portrait Section */}
          <div className="flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6B7C59] to-[#8B4A6B] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-[#6B7C59]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/endorsements/church-leader-portrait.jpg"
                  alt="Keenan and Madeline Anderson"
                  width={280}
                  height={210}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[4/3]"
                  priority
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-[#2C3E50] font-serif">
                Keenan & Madeline Anderson
              </p>
              <p className="text-sm text-[#6B7C59] font-medium mt-1">
                Church Leaders & Book Reviewers
              </p>
            </div>
          </div>

          {/* Endorsement Letter Section */}
          <div className="flex flex-col items-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574] to-[#8B4A6B] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-[#D4A574]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/endorsements/endorsement-letter.png"
                  alt="Handwritten Endorsement Letter from Keenan and Madeline Anderson"
                  width={280}
                  height={360}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[3/4]"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-[#2C3E50] font-serif">
                Handwritten Letter
              </p>
              <p className="text-sm text-[#6B7C59] font-medium mt-1">
                Personal Endorsement
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Summary Quote - Aligned at top */}
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8B4A6B] to-[#6B7C59] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#8B4A6B]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <blockquote className="text-base lg:text-lg leading-relaxed text-[#2C3E50] font-serif italic text-center">
                  "We read it in detail and were so encouraged by the strengths and study and knowledge found in your first book. We found it enjoyable and interesting, enlightening..."
                </blockquote>
              </div>
            </div>

            {/* Labels and badge below */}
            <div className="mt-4 text-center space-y-2">
              <p className="text-lg font-semibold text-[#2C3E50] font-serif">
                Reader Review
              </p>
              <p className="text-sm text-[#6B7C59] font-medium">
                Detailed Feedback
              </p>
              
              {/* Trust Badge */}
              <div className="flex justify-center mt-3">
                <div className="inline-flex items-center px-3 py-1 bg-[#D4A574]/10 border border-[#D4A574]/30 rounded-full">
                  <div className="w-2 h-2 bg-[#D4A574] rounded-full mr-2"></div>
                  <span className="text-xs font-medium text-[#2C3E50]">
                    Authentic Testimonial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};