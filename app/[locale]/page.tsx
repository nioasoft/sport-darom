import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/src/components/sections/Hero';
import { AboutSection } from '@/src/components/sections/AboutSection';
import { SportsGrid } from '@/src/components/sections/SportsGrid';
import { TeamPreview } from '@/src/components/sections/TeamPreview';
import { AchievementsSection } from '@/src/components/sections/AchievementsSection';
import { ContactPreview } from '@/src/components/sections/ContactPreview';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

/**
 * Homepage for Sport Darom
 *
 * A fully accessible, multi-language homepage showcasing:
 * - Hero section with dynamic background and CTA
 * - Sports grid with all 8 Paralympic sports
 * - Team preview with featured coaches
 * - Achievements showcase
 * - Contact preview with quick-access contact info
 */
export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      {/* Hero Section - Inspiring entry with video/image background */}
      <Hero
        backgroundImage="/images/hero/hero-bg.webp"
        backgroundAlt="Paralympic athletes training at Sport Darom facilities in Beersheba"
      />

      {/* About Section - Why Sport Darom? Value proposition for parents */}
      <AboutSection showTitle />

      {/* Sports Grid - Showcase of all 8 Paralympic sports */}
      <SportsGrid showTitle />

      {/* Achievements Section - Highlight accomplishments */}
      <AchievementsSection showTitle />

      {/* Team Preview - Featured coaches and staff */}
      <TeamPreview showTitle limit={4} />

      {/* Contact Preview - Quick access to contact info */}
      <ContactPreview showTitle />
    </>
  );
}
