# Requirements: Sport Darom Website

## Overview

A promotional website for Paralympic sports in southern Israel (Beersheba region), showcasing 8 sports disciplines and inspiring people with disabilities to participate in athletic activities.

## Target Audience

- People with disabilities (physical and visual impairments)
- Families of potential athletes
- Age 6+ (children, teenagers, adults)
- Hebrew, Arabic, and Russian speakers

## Functional Requirements

### FR1: Multi-Language Support
- Primary language: Hebrew (RTL)
- Secondary languages: Arabic (RTL), Russian (LTR)
- Language switcher accessible from all pages
- All content translated to all 3 languages

### FR2: Sports Information
Display information for 8 Paralympic sports:
1. Athletics (אתלטיקה)
2. Wheelchair Basketball (כדורסל כיסאות גלגלים)
3. Goalball (גולבול)
4. Swimming (שחייה)
5. Bocce (בוצ'ה)
6. Hand Cycling (אופניים ידניים)
7. Judo (ג'ודו)
8. Archery (קשתות)

Each sport page includes:
- Sport description
- Coach information with contact
- Schedule/training times
- Image gallery

### FR3: Team & Staff Section
- Project managers: Vered Avneim, Gadi Slovik
- All coaches with contact information
- Photos and bios

### FR4: Contact & Registration
- Contact form (accessible)
- Registration information (Jordan Simon: 054-6638378)
- Location: Beersheba area

### FR5: Achievements Showcase
- 2019 European Championship Silver Medal (Goalball)
- Paris 2024 Paralympics participation
- Other achievements

## Non-Functional Requirements

### NFR1: Accessibility (WCAG 2.1 AAA)
- Minimum 7:1 contrast ratio for all text
- Full keyboard navigation
- Screen reader compatibility (ARIA)
- Skip links on all pages
- Focus indicators (3px minimum)
- Support for `prefers-reduced-motion`
- Font size adjustment: 100%, 125%, 150%, 200%
- High contrast mode toggle
- Reduced motion toggle
- All images with descriptive alt text

### NFR2: Performance
- Lighthouse accessibility score: 100
- Images optimized as WebP
- Lazy loading for images
- Core Web Vitals compliant

### NFR3: Design
- Modern, inspiring aesthetic
- Subtle animations (respecting reduced motion)
- Mobile-first responsive design
- Consistent design system

### NFR4: Technical
- Next.js 16.1+ with App Router
- React 19.2 with View Transitions
- TypeScript
- Tailwind CSS with RTL support

## Acceptance Criteria

1. [ ] All 8 sports have dedicated pages with content in 3 languages
2. [ ] Accessibility widget functional with font size, contrast, and motion controls
3. [ ] Lighthouse accessibility score = 100
4. [ ] Full keyboard navigation works on all pages
5. [ ] RTL layout correct for Hebrew and Arabic
6. [ ] LTR layout correct for Russian
7. [ ] Contact form submits successfully
8. [ ] All images are WebP format and optimized
9. [ ] Screen reader testing passes (VoiceOver/NVDA)
10. [ ] High contrast mode toggles correctly

## Related Resources

### Source Websites (Content Reference)
- https://iscd.com (ISCD - ילדים ונוער, ספורט פראלימפי)
- https://isad.org.il/clubs/ספורט-דרום/ (Sport Darom page)

### Contacts
- Vered Avneim (Project Manager): 050-8651200
- Gadi Slovik (Head Coach): 050-551-3199
- Jordan Simon (Registration): 054-6638378
