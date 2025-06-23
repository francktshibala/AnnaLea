'use client';

import React, { useEffect } from 'react';

// Simple Web Component test
class SimpleTestElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .test-box {
          width: 200px;
          height: 100px;
          background: red;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 20px auto;
          border-radius: 8px;
        }
      </style>
      <div class="test-box">
        WEB COMPONENT WORKS!
      </div>
    `;
  }
}

// Register the simple test component
if (typeof window !== 'undefined' && !customElements.get('simple-test')) {
  customElements.define('simple-test', SimpleTestElement);
}

export function WebComponentTest() {
  useEffect(() => {
    console.log('WebComponentTest mounted');
    console.log('Custom elements supported:', 'customElements' in window);
    console.log('Simple test registered:', customElements.get('simple-test'));
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff3cd' }}>
      <h3>🧪 Web Component Support Test</h3>
      <simple-test></simple-test>
      <p>If you see a red box above saying "WEB COMPONENT WORKS!", then Web Components are supported.</p>
    </div>
  );
}

// TypeScript declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'simple-test': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}