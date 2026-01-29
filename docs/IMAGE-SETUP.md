# Image Setup Guide - Sport Darom

This guide explains how to set up images for the Sport Darom website.

## Image Structure

```
public/images/
├── sports/           # Sport images (8 required)
│   ├── athletics.webp
│   ├── wheelchair-basketball.webp
│   ├── goalball.webp
│   ├── swimming.webp
│   ├── bocce.webp
│   ├── hand-cycling.webp
│   ├── judo.webp
│   └── archery.webp
├── team/             # Team member photos (9 required)
│   ├── vered.webp
│   ├── gadi.webp
│   ├── jordan.webp
│   ├── timor.webp
│   ├── lihia.webp
│   ├── ofer.webp
│   ├── karmit.webp
│   ├── avi.webp
│   └── ruti.webp
├── hero/             # Hero background images (3 required)
│   ├── main.webp     # Homepage hero
│   ├── about.webp    # About page
│   └── contact.webp  # Contact page
├── icons/            # Sport SVG icons (✅ already created)
├── optimized/        # WebP optimized versions of user images
│   ├── horizontal/
│   └── vertical/
└── user/             # Your original uploaded images
    ├── horizontal/
    └── vertical/
```

## Step-by-Step Setup

### 1. Review Your Images

Your images are in `public/images/user/` organized by orientation:
- **horizontal/** - Landscape images (wider than tall) - for sports and hero
- **vertical/** - Portrait images (taller than wide) - for team members

Optimized WebP versions are in `public/images/optimized/`.

### 2. Select Images for Each Category

#### Sports Images (horizontal)
Choose 1 representative image per sport. Look for images showing:
- Athletes actively training or competing
- Clear view of the sport activity
- Inspirational action shots

| Sport | Filename | Notes |
|-------|----------|-------|
| Athletics | | Running, jumping, throwing |
| Wheelchair Basketball | | Team game, shooting |
| Goalball | | Players with blindfolds |
| Swimming | | Pool training |
| Bocce | | Ball throwing |
| Hand Cycling | | Outdoor cycling |
| Judo | | Mat practice |
| Archery | | Target shooting |

#### Team Photos (vertical)
Choose 1 portrait photo per team member:

| Member | Filename | Notes |
|--------|----------|-------|
| Vered | | Project manager |
| Gadi | | Head coach |
| Jordan | | Registration coordinator |
| Timor | | Athletics coach |
| Lihia | | Goalball coach |
| Ofer | | Swimming coach |
| Karmit | | Hand cycling coach |
| Avi | | Judo coach |
| Ruti | | Archery coach |

#### Hero Images (horizontal)
Choose 3 wide, impactful images:

| Page | Filename | Notes |
|------|----------|-------|
| main | | Homepage - most inspiring |
| about | | Team/group photo |
| contact | | Facility or welcoming |

### 3. Copy Images to Correct Locations

After selecting your images, copy them to the target folders:

```bash
# Example: Copy an optimized image to sports folder
cp public/images/optimized/horizontal/YOUR-IMAGE.webp public/images/sports/athletics.webp

# For team photos
cp public/images/optimized/vertical/YOUR-IMAGE.webp public/images/team/vered.webp
```

Or use the setup script:

```bash
# Edit the script first with your image choices
nano scripts/setup-images.ts

# Then run it
npx ts-node scripts/setup-images.ts
```

### 4. Verify Images

After copying, verify all images are in place:

```bash
ls -la public/images/sports/
ls -la public/images/team/
ls -la public/images/hero/
```

## Alt Text

All images have Hebrew, Arabic, and Russian alt texts configured in:
`src/lib/images.ts`

Update the alt texts if needed to accurately describe your specific images.

## Image Requirements

### Technical Specs
- **Format**: WebP (already optimized)
- **Sports/Hero**: Horizontal (16:9 or 4:3 aspect ratio)
- **Team**: Vertical (3:4 or 2:3 aspect ratio)

### Quality Guidelines
- Clear, well-lit photos
- Show activity and engagement
- Professional but warm appearance
- Avoid cluttered backgrounds

## Fallback Behavior

If an image is missing:
- **Sports cards**: Show sport icon with gradient background
- **Team cards**: Show placeholder with person icon
- **Hero**: Show gradient background

This ensures the website always looks good even before all images are set up.

## Quick Commands

```bash
# List available horizontal images
ls public/images/optimized/horizontal/

# List available vertical images
ls public/images/optimized/vertical/

# Check what's missing
ls public/images/sports/
ls public/images/team/
ls public/images/hero/
```
