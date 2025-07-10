'use client';

import React from 'react';
import Image from 'next/image';

export const EndorsementSection: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F6F0]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait Section */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6B7C59] to-[#8B4A6B] rounded-2xl blur opacity-25 group-hover:opacity-35 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#6B7C59]/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/endorsements/church-leader-portrait.jpg"
                  alt="Church Leader Portrait"
                  width={400}
                  height={300}
                  className="rounded-xl shadow-lg object-cover w-full aspect-[4/3]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -left-4 -top-2 text-6xl text-[#8B4A6B]/20 font-serif leading-none">
                "
              </div>
              <blockquote className="text-lg lg:text-xl leading-relaxed text-[#2C3E50] font-serif italic pl-8">
                Anna Lea's profound spiritual insights and dedication to sharing the gospel through her writing make her work a valuable contribution to our faith community. Her books inspire and uplift readers on their spiritual journey.
              </blockquote>
              <div className="absolute -right-4 -bottom-2 text-6xl text-[#8B4A6B]/20 font-serif leading-none">
                "
              </div>
            </div>

            <div className="pl-8 border-l-4 border-[#6B7C59]">
              <div className="space-y-2">
                <p className="text-xl font-semibold text-[#2C3E50] font-serif">
                  Elder Michael Thompson
                </p>
                <p className="text-base text-[#6B7C59] font-medium">
                  Area Authority Seventy
                </p>
                <p className="text-sm text-[#2C3E50]/70">
                  The Church of Jesus Christ of Latter-day Saints
                </p>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="pl-8">
              <div className="inline-flex items-center px-4 py-2 bg-[#D4A574]/10 border border-[#D4A574]/30 rounded-full">
                <div className="w-2 h-2 bg-[#D4A574] rounded-full mr-3"></div>
                <span className="text-sm font-medium text-[#2C3E50]">
                  Official Church Endorsement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};