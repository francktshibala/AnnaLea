# Anna Lea's Book Website

A modern, high-performance website for Anna Lea Cannon's Christian inspirational books, built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ **Cinematic UI**: Floating animations and morphing gradients
- 📚 **3D Book Gallery**: Interactive book displays with glassmorphism effects
- 🛒 **Secure E-commerce**: Stripe payment integration with cart management
- 📧 **Email Marketing**: Newsletter signup and automated sequences
- 📱 **Mobile-First**: Responsive design optimized for all devices
- 🔒 **Security**: Input validation, XSS protection, and secure payments
- ⚡ **Performance**: Optimized for speed with Next.js 14 and Turbopack

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Email**: Resend
- **Deployment**: Vercel
- **Testing**: Jest + React Testing Library

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/              # Basic UI primitives
│   ├── book/            # Book-related components
│   ├── cart/            # Shopping cart components
│   └── animations/      # Animation components
├── lib/                 # Configuration and utilities
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Helper functions
└── __tests__/           # Test files
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

The site is optimized for deployment on Vercel. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.
