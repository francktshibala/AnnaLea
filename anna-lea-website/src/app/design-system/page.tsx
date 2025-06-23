'use client';

import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input } from '@/components/ui';

// Design System Showcase Page
export default function DesignSystemPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Simple validation
    if (value && !value.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      padding: '2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '3rem',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          Anna Lea Design System
        </h1>

        {/* Buttons Section */}
        <Card variant="medium" className="mb-8">
          <CardHeader>
            <h2>Buttons</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="large">Large</Button>
              <Button variant="primary" loading>Loading...</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </CardBody>
        </Card>

        {/* Cards Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <Card variant="light">
            <CardHeader>
              <h3>Light Card</h3>
            </CardHeader>
            <CardBody>
              <p>This is a light variant card with subtle glassmorphism effects.</p>
            </CardBody>
            <CardFooter align="right">
              <Button variant="outline" size="small">Learn More</Button>
            </CardFooter>
          </Card>

          <Card variant="medium" interactive>
            <CardHeader variant="highlighted">
              <h3>Interactive Card</h3>
            </CardHeader>
            <CardBody>
              <p>This card has hover effects and can be clicked. Try hovering over it!</p>
            </CardBody>
            <CardFooter align="between">
              <span style={{ fontSize: '0.875rem', color: '#666' }}>Featured</span>
              <Button variant="primary" size="small">Add to Cart</Button>
            </CardFooter>
          </Card>

          <Card variant="strong" size="large">
            <CardHeader>
              <h3>Strong Variant</h3>
            </CardHeader>
            <CardBody>
              <p>This card has the strongest glassmorphism effect with more opacity and blur.</p>
            </CardBody>
            <CardFooter align="center">
              <Button variant="secondary">Centered Action</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Forms Section */}
        <Card variant="medium">
          <CardHeader>
            <h2>Form Components</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '500px' }}>
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                required
                leftIcon={<span>📧</span>}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helpText="Password must be at least 8 characters long"
                required
                rightIcon={<span>👁️</span>}
              />

              <Input
                label="Search Books"
                placeholder="Search for Christian books..."
                leftIcon={<span>🔍</span>}
                size="large"
              />

              <Input
                placeholder="Small input example"
                size="small"
                success
              />

              <Input
                placeholder="Disabled input"
                disabled
              />
            </div>
          </CardBody>
          <CardFooter>
            <Button variant="primary" fullWidth>
              Submit Form
            </Button>
          </CardFooter>
        </Card>

        {/* Typography Section */}
        <Card variant="light" className="mt-8">
          <CardHeader>
            <h2>Typography</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <h1>Heading 1 - Primary Title</h1>
              <h2>Heading 2 - Section Title</h2>
              <h3>Heading 3 - Subsection</h3>
              <h4>Heading 4 - Component Title</h4>
              <p>
                This is a paragraph with regular body text. It demonstrates the default 
                typography styles including line height, font weight, and color. 
                <a href="#" style={{ color: 'var(--color-primary-600)' }}>
                  This is a link
                </a> within the paragraph.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                This is smaller helper text that might be used for captions or secondary information.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Color Palette */}
        <Card variant="medium" className="mt-8">
          <CardHeader>
            <h2>Color Palette</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {/* Primary Colors */}
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Primary (Christian Blue)</h4>
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  {[300, 400, 500, 600, 700].map(shade => (
                    <div 
                      key={shade}
                      style={{ 
                        height: '2rem',
                        background: `var(--color-primary-${shade})`,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: shade > 500 ? 'white' : 'black',
                        fontSize: '0.75rem'
                      }}
                    >
                      {shade}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Colors */}
              <div>
                <h4 style={{ marginBottom: '0.5rem' }}>Secondary (Divine Gold)</h4>
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  {[300, 400, 500, 600, 700].map(shade => (
                    <div 
                      key={shade}
                      style={{ 
                        height: '2rem',
                        background: `var(--color-secondary-${shade})`,
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: shade > 500 ? 'white' : 'black',
                        fontSize: '0.75rem'
                      }}
                    >
                      {shade}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Usage Instructions */}
        <Card variant="strong" className="mt-8">
          <CardHeader>
            <h2>Usage Instructions</h2>
          </CardHeader>
          <CardBody>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <h4>Importing Components</h4>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.1)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  overflow: 'auto'
                }}>
{`import { Button, Card, CardHeader, CardBody, CardFooter, Input } from '@/components/ui';`}
                </pre>
              </div>
              
              <div>
                <h4>Design Tokens</h4>
                <p>All components use CSS custom properties for consistent theming:</p>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.1)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  overflow: 'auto'
                }}>
{`/* Colors */
var(--color-primary-500)
var(--color-secondary-500)

/* Glassmorphism */
var(--glass-white-15)
var(--glass-blur-md)

/* Spacing */
var(--space-4)
var(--radius-lg)`}
                </pre>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}