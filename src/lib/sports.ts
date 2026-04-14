/**
 * Sports configuration for Sport Darom
 * 8 Paralympic sports with multilingual support
 */

export interface Sport {
  slug: string;
  names: {
    he: string;
    ar: string;
    ru: string;
  };
  coach: string;
  phone: string;
  /** Sport-specific accent color for visual distinction */
  accentHue: number;
  /** Emoji icon for the sport */
  icon: string;
}

export const sports: Sport[] = [
  {
    slug: 'athletics',
    names: {
      he: 'אתלטיקה',
      ar: 'ألعاب القوى',
      ru: 'Лёгкая атлетика',
    },
    coach: 'טימור',
    phone: '052-666-0602',
    accentHue: 0, // Red - speed, power
    icon: '🏃',
  },
  {
    slug: 'wheelchair-basketball',
    names: {
      he: 'כדורסל כיסאות גלגלים',
      ar: 'كرة السلة على الكراسي المتحركة',
      ru: 'Баскетбол на колясках',
    },
    coach: 'גדי סלוביק',
    phone: '050-551-3199',
    accentHue: 25, // Orange - energy, teamwork
    icon: '🏀',
  },
  {
    slug: 'goalball',
    names: {
      he: 'כדור שער',
      ar: 'كرة الهدف',
      ru: 'Голбол',
    },
    coach: 'ליחיא',
    phone: '050-998-8392',
    accentHue: 210, // Blue - focus, precision
    icon: '⚽',
  },
  {
    slug: 'swimming',
    names: {
      he: 'שחייה',
      ar: 'السباحة',
      ru: 'Плавание',
    },
    coach: 'עופר, בן',
    phone: '052-336-5333',
    accentHue: 190, // Cyan - water, fluidity
    icon: '🏊',
  },
  {
    slug: 'bocce',
    names: {
      he: "בוצ'ה",
      ar: 'البوتشي',
      ru: 'Бочче',
    },
    coach: '',
    phone: '',
    accentHue: 120, // Green - precision, calm
    icon: '🎯',
  },
  {
    slug: 'hand-cycling',
    names: {
      he: 'אופני יד',
      ar: 'الدراجات اليدوية',
      ru: 'Ручной велосипед',
    },
    coach: 'כרמית',
    phone: '053-700-4732',
    accentHue: 45, // Gold - endurance, triumph
    icon: '🚴',
  },
  {
    slug: 'judo',
    names: {
      he: "ג'ודו",
      ar: 'الجودو',
      ru: 'Дзюдо',
    },
    coach: 'אבי',
    phone: '054-984-0498',
    accentHue: 350, // Crimson - strength, discipline
    icon: '🥋',
  },
  {
    slug: 'archery',
    names: {
      he: 'חץ וקשת',
      ar: 'الرماية بالقوس',
      ru: 'Стрельба из лука',
    },
    coach: 'רותי, בן',
    phone: '054-766-1184',
    accentHue: 280, // Purple - precision, focus
    icon: '🏹',
  },
] as const;

export type SportSlug = (typeof sports)[number]['slug'];

/**
 * Get sport by slug
 */
export function getSportBySlug(slug: string): Sport | undefined {
  return sports.find((sport) => sport.slug === slug);
}

/**
 * Get sport name by locale
 */
export function getSportName(sport: Sport, locale: 'he' | 'ar' | 'ru'): string {
  return sport.names[locale] || sport.names.he;
}
