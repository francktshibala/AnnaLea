# Hero Image Development Plans for Anna Lea's Website

## Project Context
Creating a hero image similar to Cathy Carr's website (https://cathycarrwrites.com/) that appears consistently across all pages as part of Anna Lea's author branding.

## Hero Image Requirements
- **Consistent placement** across all navigation destinations
- **Responsive design** with multiple image sizes for different screen sizes
- **Matches established design system** (sage green #6B7C59, burgundy #8B4A6B, cream #F8F6F0)
- **Professional author branding** that reflects Anna Lea's Christian inspirational storytelling

## Option 1: Custom Illustration Commission
- **Professional illustrator** creates custom hero image matching Anna Lea's brand
- **Hand-drawn style** with biblical/literary elements (trees, books, crosses, etc.)
- **Sage green, burgundy, cream color palette** from established design system
- **Author silhouette or portrait** integrated into the illustration
- **Pros**: Unique, professional, perfectly tailored
- **Cons**: Cost, time, requires external artist

## Option 2: AI-Generated Illustration
- Use **AI art tools** (Midjourney, DALL-E, Stable Diffusion) to create custom illustrations
- **Prompt examples**: 
  - "Professional author hero illustration, sage green and burgundy colors, biblical trees, books, warm literary atmosphere, hand-drawn style"
  - "Christian inspirational author website header, Isaiah tree, sweet fruit, missionary themes, elegant typography space"
  - "Book author branding illustration, sage green background, burgundy accents, cream highlights, biblical symbols, professional"
- **Multiple variations** to choose from
- **Pros**: Fast, cost-effective, multiple options
- **Cons**: May need refinement, less unique

## Option 3: Combine Photography + Design Elements
- **Professional author photo** as the base
- **Add illustrated elements** around it (decorative borders, biblical symbols, book elements)
- **Overlay design elements** using established color palette
- **SVG illustrations** to complement the photo
- **Pros**: Personal touch, flexible, matches existing design
- **Cons**: Need professional photo, complex composition

## Option 4: Code-Based SVG Illustrations
- Build **custom SVG illustrations** using code
- **Biblical elements** (trees, crosses, books) in Anna Lea's color palette
- **Fully customizable** and scalable
- **Examples of elements to include**:
  - Isaiah trees with leaves in sage green
  - Open books with burgundy covers
  - Decorative crosses and spiritual symbols
  - Author name typography integration
  - Flowing banner/ribbon elements
- **Pros**: Immediate results, full control, matches design system perfectly
- **Cons**: Requires design skills, may look less artistic

## Testing Strategy

### Phase 1: Quick Testing Setup
1. **Create Hero Image Test Page** (`/hero-test`)
   - Compare different options side by side
   - Quick switching between different hero images
   - See how each looks with Anna Lea's existing design system

### Phase 2: Implementation Options
1. **Start with SVG Illustrations** (immediate results)
2. **Generate AI options** (multiple variations)
3. **Test photo combinations** (if professional photo available)
4. **Commission custom art** (final professional option)

### Phase 3: Technical Implementation
1. **Create responsive hero component** that appears on all pages
2. **Multiple image sizes** for different screen sizes
3. **Consistent placement** across all navigation destinations
4. **Integrate with existing design system**

## Design Elements to Include
Based on Anna Lea's established brand:

### Visual Elements
- **Biblical Trees** (Isaiah tree theme)
- **Books and Pages** (open books, flowing pages)
- **Spiritual Symbols** (crosses, light rays, doves)
- **Natural Elements** (leaves, fruit, branches)
- **Typography Space** (area for author name/tagline)

### Color Implementation
- **Primary**: Sage green (#6B7C59) for trees, natural elements
- **Secondary**: Burgundy (#8B4A6B) for books, accent elements
- **Background**: Cream (#F8F6F0) for clean, professional base
- **Accent**: Golden honey (#D4A574) for warmth, highlights

### Layout Considerations
- **Author name prominence** (Playfair Display font)
- **Tagline space** ("Inspirational Christian Storyteller")
- **Social media integration** area
- **Navigation compatibility** (works with header overlay)

## Technical Files to Create
1. **Hero component** (`/src/components/sections/HeroImage.tsx`)
2. **Test page** (`/src/app/hero-test/page.tsx`)
3. **SVG assets** (`/public/images/hero/`)
4. **Responsive styling** (CSS custom properties)

## Next Steps (Post-Navigation)
1. Set up hero image test environment
2. Create initial SVG illustrations
3. Test AI-generated options
4. Implement responsive hero component
5. Deploy across all pages

## Reference Files
- **Design System**: `/src/styles/colors.css`
- **Typography**: `/src/app/globals.css`
- **Current Hero**: `/src/components/sections/HeroSection.tsx`
- **Target Reference**: https://cathycarrwrites.com/

---

*This document serves as a comprehensive plan for hero image development and can be referenced in future development sessions.*