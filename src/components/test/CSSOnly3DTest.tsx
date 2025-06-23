'use client';

import React from 'react';

// Pure CSS approach - no JavaScript state
export function CSSOnly3DTest() {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#e8f4f8',
      margin: '20px 0'
    }}>
      <h3>🎨 Pure CSS 3D Transform Test</h3>
      <style jsx>{`
        .css-3d-test {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 20px auto;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: white;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d !important;
          perspective: 1000px;
        }
        
        .css-3d-test:hover {
          transform: perspective(1000px) rotateX(25deg) rotateY(-25deg) translateZ(50px) scale(1.1) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
        }
      `}</style>
      <div className="css-3d-test">
        🌟 CSS ONLY
      </div>
      <p style={{ fontSize: '14px', color: '#666' }}>
        Pure CSS hover effects with !important rules
      </p>
    </div>
  );
}