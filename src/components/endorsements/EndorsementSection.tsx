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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Portrait Section */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6B7C59] to-[#8B4A6B] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#6B7C59]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/endorsements/church-leader-portrait.jpg"
                  alt="Keenan and Madeline Anderson"
                  width={300}
                  height={225}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[4/3]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Endorsement Letter Section */}
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574] to-[#8B4A6B] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#D4A574]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/endorsements/endorsement-letter.png"
                  alt="Handwritten Endorsement Letter from Keenan and Madeline Anderson"
                  width={300}
                  height={400}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[3/4]"
                />
              </div>
            </div>
          </div>

          {/* Attribution Section */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-xl lg:text-2xl font-semibold text-[#2C3E50] font-serif">
                Keenan and Madeline Anderson
              </p>
              <p className="text-base text-[#6B7C59] font-medium">
                Church Members & Book Reviewers
              </p>
              <p className="text-sm text-[#2C3E50]/70">
                The Church of Jesus Christ of Latter-day Saints
              </p>
            </div>

            {/* Trust Badge */}
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center px-4 py-2 bg-[#D4A574]/10 border border-[#D4A574]/30 rounded-full">
                <div className="w-2 h-2 bg-[#D4A574] rounded-full mr-3"></div>
                <span className="text-sm font-medium text-[#2C3E50]">
                  Authentic Reader Testimonial
                </span>
              </div>
            </div>

            {/* Summary Quote */}
            <div className="mt-8 p-6 bg-white/50 rounded-xl border border-[#6B7C59]/20">
              <blockquote className="text-base lg:text-lg leading-relaxed text-[#2C3E50] font-serif italic text-center">
                "We read it in detail and were so encouraged by the strengths and study and knowledge found in your first book. We found it enjoyable and interesting, enlightening..."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};