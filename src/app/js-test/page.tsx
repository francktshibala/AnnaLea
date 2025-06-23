'use client';

import { useRef, useState } from 'react';

export default function JSTestPage() {
  const [method, setMethod] = useState('css');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (method === 'js' && cardRef.current) {
      // Direct DOM manipulation
      cardRef.current.style.transform = 'perspective(1000px) rotateX(20deg) rotateY(20deg) translateZ(50px)';
      cardRef.current.style.boxShadow = '0 50px 100px rgba(0,0,0,0.3)';
      cardRef.current.style.backgroundColor = '#3b82f6';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (method === 'js' && cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      cardRef.current.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      cardRef.current.style.backgroundColor = '#ef4444';
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px' }}>JavaScript 3D Transform Test</h1>
      
      {/* Method Selector */}
      <div style={{ marginBottom: '30px' }}>
        <label>
          <input 
            type="radio" 
            value="css" 
            checked={method === 'css'} 
            onChange={(e) => setMethod(e.target.value)} 
          />
          CSS Method
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input 
            type="radio" 
            value="js" 
            checked={method === 'js'} 
            onChange={(e) => setMethod(e.target.value)} 
          />
          JavaScript Method
        </label>
      </div>

      {/* Test Card */}
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '250px',
          height: '250px',
          backgroundColor: method === 'css' && isHovered ? '#3b82f6' : '#ef4444',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          transition: method === 'css' ? 'all 0.5s ease' : 'none',
          transform: method === 'css' && isHovered 
            ? 'perspective(1000px) rotateX(20deg) rotateY(20deg) translateZ(50px)' 
            : method === 'css' 
              ? 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' 
              : undefined,
          boxShadow: method === 'css' && isHovered 
            ? '0 50px 100px rgba(0,0,0,0.3)' 
            : '0 10px 30px rgba(0,0,0,0.1)',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        <div>Method: {method.toUpperCase()}</div>
        <div style={{ fontSize: '14px', marginTop: '10px' }}>
          {isHovered ? 'HOVERED' : 'Hover Me'}
        </div>
        <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.8 }}>
          State: {isHovered ? 'True' : 'False'}
        </div>
      </div>

      {/* Debug Info */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
        <h3>Debug Information:</h3>
        <p>Current Method: {method}</p>
        <p>Hover State: {isHovered ? 'Active' : 'Inactive'}</p>
        <p>Transform Support: {typeof window !== 'undefined' ? 'Available' : 'Loading...'}</p>
        
        {typeof window !== 'undefined' && (
          <>
            <p>User Agent: {navigator.userAgent}</p>
            <p>CSS.supports 3D: {
              'CSS' in window && 'supports' in (window as any).CSS 
                ? String((window as any).CSS.supports('transform-style', 'preserve-3d'))
                : 'Unknown'
            }</p>
          </>
        )}
      </div>

      {/* Manual Test Buttons */}
      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Manual Tests:</h3>
        <button 
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.style.transform = 'rotateX(45deg) rotateY(45deg) scale(1.5)';
              cardRef.current.style.backgroundColor = '#10b981';
            }
          }}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Force 3D Transform
        </button>
        <button 
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.style.transform = 'scale(2) rotate(45deg)';
              cardRef.current.style.backgroundColor = '#f59e0b';
            }
          }}
          style={{ marginRight: '10px', padding: '10px 20px' }}
        >
          Force 2D Transform
        </button>
        <button 
          onClick={() => {
            if (cardRef.current) {
              cardRef.current.style.transform = 'none';
              cardRef.current.style.backgroundColor = '#ef4444';
            }
          }}
          style={{ padding: '10px 20px' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}