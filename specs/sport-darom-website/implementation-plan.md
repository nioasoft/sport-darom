# Implementation Plan: Sport Darom Website

## Overview

Build a fully accessible, multi-language promotional website for Paralympic sports in southern Israel using Next.js 16, React 19.2, and Tailwind CSS with strict WCAG 2.1 AAA compliance.

## Design Requirement

**IMPORTANT:** All visual components must be designed using the `/frontend-design` skill to ensure high-quality, distinctive design that avoids generic AI aesthetics.

---

## Phase 1: Project Setup & Infrastructure

Set up the Next.js 16 project with TypeScript, Tailwind CSS, and core dependencies.

### Tasks

- [ ] Initialize Next.js 16 project with TypeScript and Tailwind CSS
- [ ] Install and configure dependencies (next-intl, framer-motion, tailwindcss-rtl)
- [ ] Configure Tailwind with RTL support and AAA-compliant color palette
- [ ] Set up Noto Sans font family (Hebrew, Arabic, Cyrillic)
- [ ] Create folder structure (docs/, public/images/, messages/, src/)
- [ ] Configure next-intl for Hebrew, Arabic, Russian routing
- [ ] Create proxy.ts for locale-based routing (Next.js 16)

### Technical Details

**CLI Commands:**
```bash
# Initialize project (if not using existing)
npx create-next-app@latest sport-darom --typescript --tailwind --app --src-dir

# Install dependencies
npm install next-intl framer-motion
npm install -D tailwindcss-rtl

# Install fonts
npm install @fontsource/noto-sans @fontsource/noto-sans-hebrew @fontsource/noto-sans-arabic
```

**Folder Structure:**
```
sport-darom/
├── docs/
│   └── sports/
│       ├── he/
│       ├── ar/
│       └── ru/
├── public/
│   └── images/
│       ├── sports/
│       ├── team/
│       ├── hero/
│       └── user/
├── messages/
│   ├── he.json
│   ├── ar.json
│   └── ru.json
├── src/
│   ├── app/[locale]/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── styles/
├── proxy.ts
└── i18n/
    ├── routing.ts
    └── request.ts
```

**AAA Color Palette (tailwind.config.ts):**
```typescript
colors: {
  primary: {
    900: '#0A2540',  // 15.1:1 contrast
    700: '#0052A3',  // 9.1:1 contrast
    500: '#2563EB',
    300: '#93C5FD',
    100: '#DBEAFE',
  },
  accent: {
    700: '#8B6914',  // 7.2:1 contrast (gold)
    500: '#B8860B',
    300: '#DAA520',
  },
  success: '#1A5D1A',  // 7.5:1 contrast
  error: '#A31515',    // 8.9:1 contrast
}
```

**next-intl Configuration (i18n/routing.ts):**
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['he', 'ar', 'ru'],
  defaultLocale: 'he',
  localePrefix: 'always'
});
```

**proxy.ts (Next.js 16):**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(he|ar|ru)/:path*']
};
```

---

## Phase 2: Core Components & Accessibility Widget

Build the foundational UI components with full accessibility support. **Use /frontend-design skill for all visual components.**

### Tasks

- [ ] Create CSS custom properties (globals.css) with color system, typography, spacing
- [ ] Create SkipLinks component
- [ ] Create accessible Button component (44x44px touch target) - use /frontend-design
- [ ] Create accessible Input/Textarea/Select components - use /frontend-design
- [ ] Create Card component with focus management - use /frontend-design
- [ ] Create AccessibilityPanel component [complex] - use /frontend-design
  - [ ] Font size controls (100%, 125%, 150%, 200%)
  - [ ] High contrast mode toggle
  - [ ] Reduced motion toggle
  - [ ] Language selector
  - [ ] localStorage persistence
- [ ] Create useReducedMotion hook
- [ ] Create useAccessibility hook (manages all preferences)

### Technical Details

**CSS Custom Properties (globals.css):**
```css
:root {
  /* Font scale multiplier */
  --font-scale: 1;

  /* Typography */
  --text-base: calc(1rem * var(--font-scale));
  --text-lg: calc(1.125rem * var(--font-scale));
  --text-xl: calc(1.25rem * var(--font-scale));
  --text-2xl: calc(1.5rem * var(--font-scale));

  /* Spacing */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --animation-enabled: 1;
}

[data-font-size="125"] { --font-scale: 1.25; }
[data-font-size="150"] { --font-scale: 1.5; }
[data-font-size="200"] { --font-scale: 2; }

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --animation-enabled: 0;
  }
}

[data-reduced-motion="true"] {
  --duration-fast: 0ms;
  --duration-normal: 0ms;
  --animation-enabled: 0;
}

[data-contrast="high"] {
  --color-text-primary: #000000;
  --color-background: #FFFFFF;
  --border-width: 2px;
}
```

**SkipLinks Component:**
```tsx
// src/components/accessibility/SkipLinks.tsx
export function SkipLinks() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      דלג לתוכן הראשי
    </a>
  );
}
```

**useAccessibility Hook:**
```typescript
// src/hooks/useAccessibility.ts
const A11Y_STORAGE_KEY = 'sport-darom-a11y';

interface A11yPreferences {
  fontSize: '100' | '125' | '150' | '200';
  contrast: 'normal' | 'high';
  reducedMotion: boolean;
  language: 'he' | 'ar' | 'ru';
}
```

---

## Phase 3: Layout Components

Build the site layout with navigation and footer. **Use /frontend-design skill for all visual components.**

### Tasks

- [ ] Create Header component with keyboard navigation - use /frontend-design
- [ ] Create Navigation component with dropdown menus - use /frontend-design
- [ ] Create LanguageSwitcher component - use /frontend-design
- [ ] Create Footer component with accessibility controls - use /frontend-design
- [ ] Create root layout ([locale]/layout.tsx) with RTL/LTR handling
- [ ] Implement aria-current for active navigation items
- [ ] Add mobile hamburger menu (accessible) - use /frontend-design

### Technical Details

**Root Layout Structure:**
```tsx
// src/app/[locale]/layout.tsx
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const isRtl = ['he', 'ar'].includes(locale);

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body>
        <SkipLinks />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AccessibilityPanel />
      </body>
    </html>
  );
}
```

**Navigation Structure:**
```tsx
const navItems = [
  { href: '/', label: 'home' },
  { href: '/sports', label: 'sports', hasDropdown: true },
  { href: '/team', label: 'team' },
  { href: '/stories', label: 'stories' },
  { href: '/contact', label: 'contact' },
];
```

---

## Phase 4: Content Pages - Home & Sports

Build the main content pages with all sections. **Use /frontend-design skill for all visual components.**

### Tasks

- [ ] Create Hero section component with video/image background - use /frontend-design
- [ ] Create SportsGrid component (8 sport cards) - use /frontend-design
- [ ] Create SportCard component with hover effects - use /frontend-design
- [ ] Create TeamPreview section for homepage - use /frontend-design
- [ ] Create AchievementsSection component - use /frontend-design
- [ ] Create ContactPreview section (mini form) - use /frontend-design
- [ ] Build homepage (/[locale]/page.tsx)
- [ ] Build sports listing page (/[locale]/sports/page.tsx)
- [ ] Build individual sport pages (/[locale]/sports/[sport]/page.tsx) [complex]
  - [ ] Create dynamic routing for 8 sports
  - [ ] Add sport-specific content loading
  - [ ] Add coach information section
  - [ ] Add image gallery component (handle horizontal & vertical images)

### Technical Details

**8 Sports Configuration:**
```typescript
// src/lib/sports.ts
export const sports = [
  { slug: 'athletics', he: 'אתלטיקה', ar: 'ألعاب القوى', ru: 'Лёгкая атлетика', coach: 'טימור', phone: '052-666-0602' },
  { slug: 'wheelchair-basketball', he: 'כדורסל כיסאות גלגלים', ar: 'كرة السلة على الكراسي المتحركة', ru: 'Баскетбол на колясках', coach: 'גדי סלוביק', phone: '050-551-3199' },
  { slug: 'goalball', he: 'גולבול', ar: 'كرة الهدف', ru: 'Голбол', coach: 'ליחיא', phone: '050-998-8392' },
  { slug: 'swimming', he: 'שחייה', ar: 'السباحة', ru: 'Плавание', coach: 'עופר, בן', phone: '052-336-5333' },
  { slug: 'bocce', he: 'בוצ\'ה', ar: 'البوتشي', ru: 'Бочче', coach: '', phone: '' },
  { slug: 'hand-cycling', he: 'אופניים ידניים', ar: 'الدراجات اليدوية', ru: 'Ручной велосипед', coach: 'כרמית', phone: '053-700-4732' },
  { slug: 'judo', he: 'ג\'ודו', ar: 'الجودو', ru: 'Дзюдо', coach: 'אבי', phone: '054-984-0498' },
  { slug: 'archery', he: 'קשתות', ar: 'الرماية بالقوس', ru: 'Стрельба из лука', coach: 'רותי, בן', phone: '054-766-1184' },
] as const;
```

**Hero Section with Motion Safety:**
```tsx
// src/components/sections/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="hero min-h-[60vh]">
      <motion.h1
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      >
        {/* Content */}
      </motion.h1>
    </section>
  );
}
```

---

## Phase 5: Content Pages - Team & Contact

Build team directory and contact functionality. **Use /frontend-design skill for all visual components.**

### Tasks

- [ ] Create TeamCard component with photo and bio - use /frontend-design
  - [ ] Handle both horizontal and vertical team photos
- [ ] Build team page (/[locale]/team/page.tsx)
- [ ] Create accessible ContactForm component [complex] - use /frontend-design
  - [ ] Form validation with aria-describedby
  - [ ] Error messages linked to inputs
  - [ ] Loading state with aria-busy
  - [ ] Success/error feedback
- [ ] Build contact page (/[locale]/contact/page.tsx)
- [ ] Create API route for form submission (/api/contact/route.ts)
- [ ] Build stories/achievements page (/[locale]/stories/page.tsx) - use /frontend-design

### Technical Details

**Team Data Structure:**
```typescript
// src/lib/team.ts
export const team = [
  {
    name: 'ורד אבנעים',
    role: 'מנהלת פרויקט',
    phone: '050-8651200',
    image: '/images/team/vered.webp',
    bio: { he: '...', ar: '...', ru: '...' }
  },
  {
    name: 'גדי סלוביק',
    role: 'מאמן ראשי',
    phone: '050-551-3199',
    image: '/images/team/gadi.webp',
    bio: { he: '...', ar: '...', ru: '...' }
  },
];
```

**Accessible Form Pattern:**
```tsx
<div className="form-group">
  <label htmlFor="name" className="form-label form-label--required">
    {t('form.name')}
  </label>
  <input
    id="name"
    type="text"
    aria-required="true"
    aria-invalid={errors.name ? 'true' : 'false'}
    aria-describedby={errors.name ? 'name-error' : undefined}
    className="form-input"
  />
  {errors.name && (
    <p id="name-error" className="form-error" role="alert">
      {errors.name}
    </p>
  )}
</div>
```

**Contact API Route:**
```typescript
// src/app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  // Validate and process form
  // Send email notification
  return Response.json({ success: true });
}
```

---

## Phase 6: Translations & Content

Create all translation files and markdown content.

### Tasks

- [ ] Create Hebrew translation file (messages/he.json)
- [ ] Create Arabic translation file (messages/ar.json)
- [ ] Create Russian translation file (messages/ru.json)
- [ ] Write sport descriptions for all 8 sports (Hebrew)
- [ ] Translate sport descriptions to Arabic
- [ ] Translate sport descriptions to Russian
- [ ] Create accessibility statement page (/[locale]/accessibility/page.tsx)

### Technical Details

**Translation File Structure (messages/he.json):**
```json
{
  "navigation": {
    "home": "בית",
    "sports": "ענפי ספורט",
    "team": "הצוות שלנו",
    "stories": "סיפורי הצלחה",
    "contact": "צור קשר"
  },
  "hero": {
    "title": "ספורט דרום",
    "subtitle": "ספורט פראלימפי בדרום הארץ",
    "cta": "הצטרפו אלינו"
  },
  "sports": {
    "athletics": {
      "name": "אתלטיקה",
      "description": "..."
    }
  },
  "accessibility": {
    "panel": {
      "title": "הגדרות נגישות",
      "fontSize": "גודל גופן",
      "contrast": "ניגודיות",
      "motion": "הפחתת תנועה",
      "language": "שפה"
    }
  },
  "form": {
    "name": "שם מלא",
    "email": "דוא\"ל",
    "phone": "טלפון",
    "message": "הודעה",
    "submit": "שלח",
    "success": "ההודעה נשלחה בהצלחה",
    "error": "אירעה שגיאה, אנא נסו שוב"
  }
}
```

---

## Phase 7: Content, Images & Media

Gather content from source websites, write all texts, and optimize images.

### Tasks

#### Content Gathering & Writing

- [ ] Scrape content from source websites [complex]
  - [ ] https://iscd.com/תוכנית-ילדים-ונוער/
  - [ ] https://iscd.com/ספורט-פראלימפי-פאראלימפי/
  - [ ] https://isad.org.il/clubs/ספורט-דרום/
  - [ ] https://iscd.com/ספורט-נכים-בדרום/
  - [ ] Save raw content to docs/raw/ folder
- [ ] Write homepage texts (hero, about section, CTA)
- [ ] Write about page content
- [ ] Write sport descriptions for all 8 sports
- [ ] Write team/coaches bios
- [ ] Write contact page content
- [ ] Write stories/achievements content
- [ ] Create accessibility statement content

#### Images & Media

- [ ] Organize images by orientation (horizontal/vertical) [important]
- [ ] Create placeholder images for 8 sports (or source from websites)
- [ ] Create placeholder team photos
- [ ] Create hero background image/video
- [ ] Convert all images to WebP format
- [ ] Add descriptive alt text to all images (Hebrew)
- [ ] Create sport icons (SVG)
- [ ] Optimize images for performance (next/image)

### Technical Details

**Content Guidelines - Emphasize:**
- יחס אישי וחם לכל ספורטאי
- סביבה תומכת ומקבלת
- התאמה אישית לצרכים של כל ילד
- הישגים והתפתחות אישית
- קהילה וחברות
- מקצועיות המאמנים
- בטיחות והשגחה

**Target Audience - Parents Care About:**
- האם הילד שלי יקבל תשומת לב אישית?
- האם המקום בטוח ומותאם?
- האם המאמנים מנוסים עם ילדים עם מוגבלויות?
- מה הילד שלי ירוויח מזה?
- איך זה ישפיע על הביטחון העצמי שלו?
- האם יש קהילה תומכת?

**Content Folder Structure:**
```
docs/
├── raw/                    # Raw scraped content
│   ├── iscd-children.md
│   ├── iscd-paralympic.md
│   ├── isad-sport-darom.md
│   └── iscd-sport-south.md
├── sports/
│   └── he/
│       ├── athletics.md
│       ├── wheelchair-basketball.md
│       └── ...
├── team/
│   └── he/
│       └── coaches.md
└── pages/
    └── he/
        ├── about.md
        ├── contact.md
        └── accessibility.md
```

**Image Folder Structure (with orientation):**
```
public/images/
├── sports/
│   ├── horizontal/    # תמונות אופקיות (landscape)
│   └── vertical/      # תמונות אנכיות (portrait)
├── team/
│   ├── horizontal/
│   └── vertical/
├── hero/
└── user/              # <-- תמונות שלך כאן
    ├── horizontal/
    └── vertical/
```

**IMPORTANT:** Images come in both horizontal (landscape) and vertical (portrait) orientations. All components must handle both properly.

**Image Optimization with next/image:**
```tsx
import Image from 'next/image';

<Image
  src="/images/sports/athletics.webp"
  alt="ספורטאי עם מוגבלות מתאמן באתלטיקה בבאר שבע"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority={false}
/>
```

**Alt Text Guidelines:**
- Describe the action and context
- Include location when relevant
- Mention disability type if visible and relevant
- Hebrew alt text for Hebrew pages

---

## Phase 8: Testing & Optimization

Comprehensive accessibility and performance testing.

### Tasks

- [ ] Run Lighthouse accessibility audit (target: 100)
- [ ] Test keyboard navigation on all pages
- [ ] Test screen reader compatibility (VoiceOver)
- [ ] Test high contrast mode
- [ ] Test font size scaling (200%)
- [ ] Test RTL layout (Hebrew, Arabic)
- [ ] Test LTR layout (Russian)
- [ ] Test reduced motion preference
- [ ] Fix any accessibility issues found
- [ ] Optimize Core Web Vitals (LCP, CLS, INP)

### Technical Details

**Accessibility Testing Checklist:**
```markdown
[ ] Tab through entire page - all interactive elements reachable
[ ] Focus indicators visible (3px outline minimum)
[ ] Skip link works and is visible on focus
[ ] All images have alt text
[ ] Form inputs have labels
[ ] Error messages linked via aria-describedby
[ ] Contrast ratio >= 7:1 for all text
[ ] No keyboard traps
[ ] Headings in logical order (h1 > h2 > h3)
[ ] Language set correctly on html element
[ ] dir attribute set correctly (rtl/ltr)
```

**Lighthouse CLI:**
```bash
npx lighthouse http://localhost:3000/he --only-categories=accessibility --output=html --output-path=./lighthouse-report.html
```

---

## Summary

| Phase | Description | Est. Tasks |
|-------|-------------|------------|
| 1 | Project Setup & Infrastructure | 7 |
| 2 | Core Components & Accessibility Widget | 8 |
| 3 | Layout Components | 7 |
| 4 | Content Pages - Home & Sports | 8 |
| 5 | Content Pages - Team & Contact | 6 |
| 6 | Translations & Content | 7 |
| 7 | Content, Images & Media | 15 |
| 8 | Testing & Optimization | 10 |

**Total Tasks:** ~68 tasks across 8 phases
