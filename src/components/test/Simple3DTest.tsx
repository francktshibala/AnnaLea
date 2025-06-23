'use client';

import React, { useState } from 'react';

// Ultra-simple 3D test component - no frameworks, no complex styling
export function Simple3DTest() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      margin: '20px 0'
    }}>
      <h3>🧪 Simple 3D Transform Test</h3>
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: isHovered ? '#ff6b6b' : '#4ecdc4',
          margin: '20px auto',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          transform: isHovered 
            ? 'rotateX(25deg) rotateY(25deg) translateZ(50px) scale(1.1)' 
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? '🎯 HOVER!' : '🎪 HOVER ME'}
      </div>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Status: {isHovered ? '✅ Hovered' : '⏸️ Not Hovered'}
      </p>
    </div>
  );
}