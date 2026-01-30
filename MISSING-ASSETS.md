# Missing Assets - Sport Darom

This document lists all missing or incorrect assets that need to be provided or replaced.

## 1. Sport Images (Incorrect)

The following sport images show the **wrong sport** and need to be replaced:

| File | Current Content | Should Show |
|------|----------------|-------------|
| `public/images/sports/wheelchair-basketball.webp` | Swimming lesson (adult teaching child) | Wheelchair basketball game/players |
| `public/images/sports/bocce.webp` | Goalball game (players with blindfolds) | Bocce/Boccia game with balls |
| `public/images/sports/judo.webp` | Child swimming with goggles | Paralympic judo (athletes with visual impairments) |

### Recommended Sources for Replacement Images:
- [Unsplash](https://unsplash.com/s/photos/wheelchair-basketball) - Free, no attribution required
- [Pexels](https://www.pexels.com) - Free, no attribution required
- [Israel ParaSport Center](https://israelparasport.org/) - Contact for official images
- [ISCD (Israel Sport Center for the Disabled)](https://iscd.co.il/) - Contact for local images

---

## 2. Team Member Photos (Generic)

All team member images currently show **generic activity photos** instead of actual portraits of the staff members. These should be replaced with actual headshots or professional photos of each team member.

| Team Member | Role | Current Image | Needed |
|-------------|------|--------------|--------|
| `vered.webp` | Project Manager | Archery activity | Portrait photo of Vered Avneim |
| `gadi.webp` | Head Coach | Child with trophy | Portrait photo of Gadi Slovik |
| `jordan.webp` | Registration Coordinator | Archery activity | Portrait photo of Jordan Simon |
| `timor.webp` | Athletics Coach | - | Portrait photo of Timor |
| `lihia.webp` | Goalball Coach | - | Portrait photo of Lihia |
| `ofer.webp` | Swimming Coach | - | Portrait photo of Ofer |
| `karmit.webp` | Hand Cycling Coach | - | Portrait photo of Karmit |
| `avi.webp` | Judo Coach | - | Portrait photo of Avi |
| `ruti.webp` | Archery Coach | - | Portrait photo of Ruti |

### Image Requirements:
- **Format**: WebP preferred (or JPG/PNG)
- **Aspect Ratio**: Vertical/Portrait (3:4 or similar)
- **Minimum Size**: 600x800 pixels
- **Background**: Neutral or sports-related

---

## 3. Social Media Links (Placeholders)

The following social media links in the Footer are currently set to `href="#"` and need actual URLs:

| Platform | Current Status | Needed |
|----------|---------------|--------|
| Facebook | Placeholder (`#`) | Actual Facebook page URL |
| Instagram | Placeholder (`#`) | Actual Instagram profile URL |
| WhatsApp | Placeholder (`#`) | WhatsApp contact link |

**Location in code**: `src/components/layout/Footer.tsx`

---

## 4. Gallery Images (Available but Uncatalogued)

There are **77 existing images** in the `public/images/gallery/` folder that could be categorized and used in sport-specific galleries. Current status: images exist but `galleryImages` in `src/lib/images.ts` is empty.

### Suggested Action:
1. Review all images in `public/images/gallery/`
2. Categorize by sport
3. Update `src/lib/images.ts` with the gallery configuration

---

## Priority List

1. **HIGH**: Replace incorrect sport images (wheelchair-basketball, bocce, judo)
2. **HIGH**: Add actual team member portraits
3. **MEDIUM**: Update social media links
4. **LOW**: Catalogue gallery images

---

## How to Replace Images

1. **Sport Images**:
   ```bash
   # Replace the file directly
   cp new-wheelchair-basketball.webp public/images/sports/wheelchair-basketball.webp
   ```

2. **Team Images**:
   ```bash
   # Add portrait photos
   cp vered-portrait.webp public/images/team/vered.webp
   ```

3. **Social Media**: Update links in `src/components/layout/Footer.tsx`

---

*Last updated: January 2026*
