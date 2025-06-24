# Anna Lea's Book Website Project

## Project Overview
This project is a website for Anna Lea's new book, featuring premium 3D hover effects and modern design approaches combined with software development best practices.

## ✅ Current Technology Stack
- **Framework**: Next.js 15.3.4 with React 19.0.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + CSS-in-JS
- **Deployment**: Vercel (production)
- **Version Control**: Git + GitHub

## 🏗️ Architecture & Design Principles
- **Component-based architecture** with clear separation of concerns
- **Client-side rendering** for interactive elements ('use client' directive)
- **Progressive enhancement** - start simple, add complexity gradually
- **Performance optimization** with deployment-safe techniques
- **Accessibility compliance** with semantic HTML
- **SEO optimization** with proper meta tags and structure

## 📁 Directory Structure
```
anna-lea-book-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Main homepage
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── book/           # Book-related components
│   │   │   ├── BookCardFresh.tsx      # Main 3D BookCard component
│   │   │   └── BookCardClient.tsx     # Client wrapper with dynamic imports
│   │   ├── sections/       # Page sections (HeroSection, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── styles/            # CSS design system
│   └── utils/             # Utility functions
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
└── CLAUDE.md             # This file
```

## 🎯 Key Features (Implemented)
- ✅ **3D Book Card Hover Effects** - Dramatic animations with lift, scale, and shadows
- ✅ **Responsive Hero Section** - Premium landing experience
- ✅ **Dynamic Book Catalog** - Featured books with interactive cards
- ✅ **Add to Cart Functionality** - Shopping cart integration ready
- ✅ **Loading States** - Smooth loading animations
- ✅ **Debug Indicators** - Development visibility tools

## 🛠️ Development Best Practices

### **Animation & Effects Guidelines**
```javascript
// ✅ SAFE: Use basic transforms that survive build optimization
transform: 'translateY(-15px) scale(1.08)'
boxShadow: '0 40px 80px rgba(0, 0, 0, 0.35)'

// ❌ AVOID: 3D transforms may be stripped by build optimization
transform: 'rotateX(15deg) rotateY(-15deg) translateZ(30px)'
```

### **Component Development Pattern**
1. **Start with static version**
2. **Add TypeScript interfaces**
3. **Implement client-side interactivity**
4. **Add smooth animations**
5. **Test on actual deployment platform**

### **Deployment Safety Checklist**
```markdown
Before every deploy:
□ Test with `npm run build` locally
□ Remove debug/test pages from src/app/
□ Verify only one next.config file exists
□ Add visible change to verify deployment
□ Check Vercel dashboard for successful build
□ Test on live URL immediately
```

## 🚀 Commands & Scripts
```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

## 🎨 3D Animation Implementation

### **Current Approach: JavaScript-Based Transforms**
```typescript
// BookCardFresh.tsx - Production-safe 3D effects
const [isHovered, setIsHovered] = useState(false);

// Dramatic hover effects using supported CSS properties
transform: isHovered ? 'translateY(-15px) scale(1.08)' : 'translateY(0px) scale(1)'
transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
```

### **Why This Works**
- **Deployment-safe**: Uses only basic transforms that survive build optimization
- **Client-side**: Dynamic imports with SSR disabled
- **Hardware accelerated**: Will-change and backface-visibility optimizations
- **Progressive**: Graceful fallbacks if advanced features aren't supported

## 📋 Lessons Learned & Anti-Patterns

### **❌ Common Mistakes to Avoid**
- **Multiple config files**: Keep only one next.config.ts
- **Test pages in production**: Remove src/app/test-* before deploy
- **Complex 3D CSS**: Vercel strips rotateX/rotateY/translateZ
- **Assuming local = production**: Always test on actual deployment platform
- **Ignoring build logs**: Monitor Vercel dashboard for failures

### **✅ Best Practices Proven to Work**
- **Verify deployments immediately**: Add debug text to confirm changes reach production
- **Start with basic effects**: Progressive enhancement over complex implementations
- **Use platform-safe techniques**: JavaScript animations over pure CSS for complex effects
- **Test the full pipeline**: Don't just test code, test the entire deployment workflow

## 🎯 Development Workflow

### **Feature Development Process**
1. **Plan**: Break down complex features into simple steps
2. **Implement**: Start with basic version, enhance progressively  
3. **Test Locally**: `npm run build && npm run start`
4. **Deploy**: Commit with visible debug indicator
5. **Verify**: Check live site immediately after deploy
6. **Polish**: Remove debug code, optimize performance

### **Animation Development Pattern**
```typescript
// 1. Static component first
export const Component = () => <div>Static content</div>

// 2. Add hover state
const [isHovered, setIsHovered] = useState(false)

// 3. Add basic animations
style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}

// 4. Enhance with dramatic effects
style={{ 
  transform: isHovered ? 'translateY(-15px) scale(1.08)' : 'translateY(0px) scale(1)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
}}
```

## 🔍 Debugging & Troubleshooting

### **Deployment Issues**
```bash
# Check if code reaches production
git log --oneline -5
# Look for recent commits in Vercel dashboard

# Force new deployment
echo "<!-- $(date) -->" >> src/app/page.tsx
git add . && git commit -m "Force deploy $(date)" && git push
```

### **Animation Issues**
```javascript
// Add debug indicators
<div style={{ color: 'red', fontSize: '12px' }}>
  🔍 Debug: {isHovered ? 'HOVERING' : 'READY'}
</div>
```

## 🎉 Success Metrics
- ✅ **3D hover effects work consistently** across all deployment platforms
- ✅ **Smooth animations** with 60fps performance
- ✅ **Deployment pipeline reliability** - all commits reach production
- ✅ **Code maintainability** - clear component structure and documentation
- ✅ **User experience** - engaging, professional feel

## 📞 Quick Reference

### **Key Files to Remember**
- `src/components/book/BookCardFresh.tsx` - Main 3D component
- `src/app/page.tsx` - Homepage with Featured Books section
- `next.config.ts` - Next.js configuration (keep only this one!)

### **Emergency Commands**
```bash
# If deployment fails
rm -rf node_modules package-lock.json
npm install
npm run build

# If animations break
git checkout HEAD~1 src/components/book/BookCardFresh.tsx
```

## 🚨 Debugging Deployment Failures - Lessons Learned

### **ALWAYS Check Build Logs First**
When deployments fail, follow this exact order:

1. **Check Vercel Dashboard Build Logs** - Go to vercel.com → your project → failed deployment → "View Function Logs"
2. **Look for the actual error message** - Don't assume what's wrong
3. **Fix the root cause** - Often unrelated to what you're trying to deploy

### **Common Deployment Failure Patterns**
```markdown
❌ WRONG APPROACH: "Images aren't deploying, must be image issue"
✅ RIGHT APPROACH: "Build failed, check logs for compilation errors"

❌ WRONG: Spend hours debugging image formats, Git LFS, etc.
✅ RIGHT: Read the error message that says "JSX syntax error in cart/page.tsx"
```

### **Prevention Strategy**
```bash
# ALWAYS run these before committing:
npm run build        # Test build locally
npm run type-check   # Catch TypeScript errors
npm run lint         # Catch syntax/style issues

# Only commit if all pass without errors
git add .
git commit -m "Feature: description"
git push
```

### **Root Cause vs Symptoms**
- **One syntax error anywhere blocks ALL deployments**
- **Missing closing tags, incorrect JSX, TypeScript errors prevent entire builds**
- **The error location might be completely unrelated to what you're deploying**

### **Time-Saving Debug Process**
1. **5 minutes**: Read actual error logs
2. **Don't guess**: Fix the exact error shown
3. **Don't assume**: The problem might be in a different file entirely

### **Real Example That Took Hours to Solve**
```
Problem: "Book images not deploying"
Hours spent: Checking image formats, Git tracking, file sizes
Actual cause: Missing </div> tag in cart/page.tsx
Time to fix: 30 seconds once we read the logs
```

This document serves as the single source of truth for development practices and project guidelines for Anna Lea's book website.