// Application configuration
export const config = {
  app: {
    name: 'Anna Lea Books',
    description: 'Christian inspirational books by Anna Lea Cannon',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Database configuration
  database: {
    url: process.env.DATABASE_URL || '',
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    },
  },
  
  // Payment configuration
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  
  // Email configuration
  email: {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'noreply@annaleabooks.com',
  },
  
  // Feature flags
  features: {
    reviews: true,
    bulkOrders: true,
    newsletter: true,
    animations: true,
  },
  
  // UI configuration
  ui: {
    maxCartItems: 10,
    itemsPerPage: 12,
    animationDuration: 300,
  },
  
  // SEO configuration
  seo: {
    title: 'Anna Lea Books - Christian Inspirational Stories',
    description: 'Discover faith-filled stories by Anna Lea Cannon. Christian romance, historical fiction, and inspirational books for families.',
    keywords: ['Christian books', 'inspirational stories', 'faith-based fiction', 'Anna Lea Cannon'],
  },
} as const;

// Environment validation
export function validateEnv() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];
  
  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}