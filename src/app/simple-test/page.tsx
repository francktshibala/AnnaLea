'use client';

import { useState } from 'react';

export default function SimpleTestPage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">3D Transform Test</h1>
        
        {/* Simple 3D Test Card */}
        <div 
          className="mb-8"
          style={{ perspective: '1000px' }}
        >
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '300px',
              height: '400px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.6s ease',
              transformStyle: 'preserve-3d',
              transform: isHovered 
                ? 'rotateX(15deg) rotateY(15deg) translateZ(50px)' 
                : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
              boxShadow: isHovered 
                ? '0 50px 100px rgba(0,0,0,0.3)' 
                : '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <div className="p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Test Card</h2>
              <p>Hover over me to see 3D rotation!</p>
              <p className="mt-4">State: {isHovered ? 'HOVERED' : 'NORMAL'}</p>
            </div>
          </div>
        </div>

        {/* BookCard Test */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">BookCard Component Test</h2>
          <div style={{ perspective: '1000px' }}>
            <TestBookCard />
          </div>
        </div>
      </div>
    </div>
  );
}

function TestBookCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '280px',
        height: '420px',
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? 'rotateX(10deg) rotateY(-10deg) translateZ(30px) translateY(-10px)' 
          : 'rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        boxShadow: isHovered 
          ? '0 25px 50px rgba(0,0,0,0.3)' 
          : '0 5px 15px rgba(0,0,0,0.1)',
      }}
    >
      {/* Book Image */}
      <div 
        style={{
          width: '100%',
          height: '60%',
          backgroundColor: '#f3f4f6',
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.4s ease',
          transform: isHovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0px) scale(1)',
        }}
      />
      
      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Isaiah Tree</h3>
        <p className="text-gray-600 text-sm mb-2">by Anna Lea Cannon</p>
        <p className="text-blue-600 font-bold">$12.99</p>
        <p className="text-xs text-gray-500 mt-2">
          Hover State: {isHovered ? 'ACTIVE' : 'INACTIVE'}
        </p>
      </div>
    </div>
  );
}