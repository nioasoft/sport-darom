/**
 * Image configuration for Sport Darom
 * Maps images to sports and team members with proper alt texts
 *
 * INSTRUCTIONS FOR ADDING IMAGES:
 * 1. Place your images in public/images/user/ (horizontal or vertical subfolder)
 * 2. Run the optimization script to convert to WebP
 * 3. Update the mappings below with the actual filenames
 * 4. Alt texts are already provided in Hebrew - update if needed
 */

export type ImageOrientation = 'horizontal' | 'vertical';
export type Locale = 'he' | 'ar' | 'ru';

export interface ImageConfig {
  /** Path relative to public/images/ */
  src: string;
  /** Image orientation */
  orientation: ImageOrientation;
  /** Alt text in all supported languages */
  alt: {
    he: string;
    ar: string;
    ru: string;
  };
}

/**
 * Sport images configuration
 * Maps each sport to its representative image
 */
export const sportImages: Record<string, ImageConfig> = {
  athletics: {
    src: 'sports/athletics.webp',
    orientation: 'horizontal',
    alt: {
      he: 'ספורטאים עם מוגבלויות מתאמנים באתלטיקה במסלול הריצה בבאר שבע',
      ar: 'رياضيون من ذوي الإعاقة يتدربون على ألعاب القوى في مضمار الجري في بئر السبع',
      ru: 'Спортсмены с инвалидностью тренируются по лёгкой атлетике на беговой дорожке в Беэр-Шеве',
    },
  },
  'wheelchair-basketball': {
    src: 'sports/wheelchair-basketball.webp',
    orientation: 'horizontal',
    alt: {
      he: 'שחקני כדורסל כיסאות גלגלים במשחק מרגש באולם הספורט',
      ar: 'لاعبو كرة السلة على الكراسي المتحركة في مباراة مثيرة في صالة الرياضة',
      ru: 'Игроки в баскетбол на колясках на захватывающем матче в спортивном зале',
    },
  },
  goalball: {
    src: 'sports/goalball.webp',
    orientation: 'horizontal',
    alt: {
      he: 'שחקני גולבול עם כיסוי עיניים מתאמנים בהגנה על השער',
      ar: 'لاعبو كرة الهدف بغطاء العينين يتدربون على الدفاع عن المرمى',
      ru: 'Игроки в голбол с повязками на глазах тренируются защищать ворота',
    },
  },
  swimming: {
    src: 'sports/swimming.webp',
    orientation: 'horizontal',
    alt: {
      he: 'שחיינים פראלימפיים מתאמנים בבריכת השחייה',
      ar: 'سباحون بارالمبيون يتدربون في حوض السباحة',
      ru: 'Паралимпийские пловцы тренируются в бассейне',
    },
  },
  bocce: {
    src: 'sports/bocce.webp',
    orientation: 'horizontal',
    alt: {
      he: "ספורטאי בוצ'ה מתרכז בזריקת הכדור אל המטרה",
      ar: 'رياضي البوتشي يركز على رمي الكرة نحو الهدف',
      ru: 'Спортсмен по бочче сосредоточен на броске мяча к цели',
    },
  },
  'hand-cycling': {
    src: 'sports/hand-cycling.webp',
    orientation: 'horizontal',
    alt: {
      he: 'רוכב אופניים ידניים מתאמן בשביל האופניים בדרום הארץ',
      ar: 'راكب الدراجة اليدوية يتدرب على مسار الدراجات في جنوب البلاد',
      ru: 'Велосипедист на ручном велосипеде тренируется на велосипедной дорожке на юге страны',
    },
  },
  judo: {
    src: 'sports/judo.webp',
    orientation: 'horizontal',
    alt: {
      he: "ג'ודוקאים פראלימפיים מתאמנים על המזרן",
      ar: 'لاعبو جودو بارالمبيون يتدربون على الحصيرة',
      ru: 'Паралимпийские дзюдоисты тренируются на татами',
    },
  },
  archery: {
    src: 'sports/archery.webp',
    orientation: 'horizontal',
    alt: {
      he: 'קשת פראלימפי מכוון לעבר המטרה במגרש הקשתות',
      ar: 'رامي سهام بارالمبي يصوب نحو الهدف في ميدان الرماية',
      ru: 'Паралимпийский лучник прицеливается в мишень на стрельбище',
    },
  },
};

/**
 * Team member images configuration
 * Maps each team member to their photo
 */
export const teamImages: Record<string, ImageConfig> = {
  'vered-avneim': {
    src: 'team/vered.webp',
    orientation: 'vertical',
    alt: {
      he: 'ורד אבנעים, מנהלת פרויקט ספורט דרום',
      ar: 'فردة أبنعيم، مديرة مشروع سبورت داروم',
      ru: 'Веред Авнейм, руководитель проекта Спорт Даром',
    },
  },
  'gadi-slovik': {
    src: 'team/gadi.webp',
    orientation: 'vertical',
    alt: {
      he: 'גדי סלוביק, מאמן ראשי ומאמן נבחרת ישראל בכדורסל כיסאות גלגלים',
      ar: 'غادي سلوفيك، المدرب الرئيسي ومدرب المنتخب الإسرائيلي لكرة السلة على الكراسي المتحركة',
      ru: 'Гади Словик, главный тренер и тренер сборной Израиля по баскетболу на колясках',
    },
  },
  'jordan-simon': {
    src: 'team/jordan.webp',
    orientation: 'vertical',
    alt: {
      he: 'ירדן סימון, רכז הרשמות בספורט דרום',
      ar: 'يوردان سيمون، منسق التسجيل في سبورت داروم',
      ru: 'Йордан Симон, координатор регистрации в Спорт Даром',
    },
  },
  timor: {
    src: 'team/timor.webp',
    orientation: 'vertical',
    alt: {
      he: 'טימור, מאמן אתלטיקה בספורט דרום',
      ar: 'تيمور، مدرب ألعاب القوى في سبورت داروم',
      ru: 'Тимор, тренер по лёгкой атлетике в Спорт Даром',
    },
  },
  lihia: {
    src: 'team/lihia.webp',
    orientation: 'vertical',
    alt: {
      he: 'ליחיא, מאמנת גולבול בספורט דרום ומאמנת נבחרת ישראל',
      ar: 'ليحيا، مدربة كرة الهدف في سبورت داروم ومدربة المنتخب الإسرائيلي',
      ru: 'Лихия, тренер по голболу в Спорт Даром и тренер сборной Израиля',
    },
  },
  ofer: {
    src: 'team/ofer.webp',
    orientation: 'vertical',
    alt: {
      he: 'עופר, מאמן שחייה בספורט דרום',
      ar: 'عوفر، مدرب السباحة في سبورت داروم',
      ru: 'Офер, тренер по плаванию в Спорт Даром',
    },
  },
  karmit: {
    src: 'team/karmit.webp',
    orientation: 'vertical',
    alt: {
      he: 'כרמית, מאמנת אופניים ידניים בספורט דרום',
      ar: 'كارميت، مدربة الدراجات اليدوية في سبورت داروم',
      ru: 'Кармит, тренер по ручному велосипеду в Спорт Даром',
    },
  },
  avi: {
    src: 'team/avi.webp',
    orientation: 'vertical',
    alt: {
      he: "אבי, מאמן ג'ודו בספורט דרום",
      ar: 'آفي، مدرب الجودو في سبورت داروم',
      ru: 'Ави, тренер по дзюдо в Спорт Даром',
    },
  },
  ruti: {
    src: 'team/ruti.webp',
    orientation: 'vertical',
    alt: {
      he: 'רותי, מאמנת קשתות בספורט דרום',
      ar: 'روتي، مدربة الرماية بالقوس في سبورت داروم',
      ru: 'Рути, тренер по стрельбе из лука в Спорт Даром',
    },
  },
};

/**
 * Hero images configuration
 */
export const heroImages: Record<string, ImageConfig> = {
  main: {
    src: 'hero/main.webp',
    orientation: 'horizontal',
    alt: {
      he: 'ספורטאים פראלימפיים מספורט דרום מתאמנים יחד בשמחה ובנחישות',
      ar: 'رياضيون بارالمبيون من سبورت داروم يتدربون معًا بفرح وإصرار',
      ru: 'Паралимпийские спортсмены Спорт Даром тренируются вместе с радостью и решимостью',
    },
  },
  about: {
    src: 'hero/about.webp',
    orientation: 'horizontal',
    alt: {
      he: 'קבוצת ספורטאים ומאמנים מספורט דרום בתמונה קבוצתית',
      ar: 'مجموعة من الرياضيين والمدربين من سبورت داروم في صورة جماعية',
      ru: 'Группа спортсменов и тренеров Спорт Даром на групповом фото',
    },
  },
  contact: {
    src: 'hero/contact.webp',
    orientation: 'horizontal',
    alt: {
      he: 'מתקני האימון והספורט של ספורט דרום בבאר שבע',
      ar: 'مرافق التدريب والرياضة في سبورت داروم في بئر السبع',
      ru: 'Тренировочные и спортивные объекты Спорт Даром в Беэр-Шеве',
    },
  },
};

/**
 * Gallery images for sports pages
 * Each sport can have multiple images
 */
export const galleryImages: Record<string, ImageConfig[]> = {
  athletics: [],
  'wheelchair-basketball': [],
  goalball: [],
  swimming: [],
  bocce: [],
  'hand-cycling': [],
  judo: [],
  archery: [],
};

/**
 * Get image alt text for a locale
 */
export function getImageAlt(config: ImageConfig, locale: Locale): string {
  return config.alt[locale] || config.alt.he;
}

/**
 * Get full image path
 */
export function getImagePath(config: ImageConfig): string {
  return `/images/${config.src}`;
}

/**
 * Get sport image configuration
 */
export function getSportImage(sportSlug: string): ImageConfig | undefined {
  return sportImages[sportSlug];
}

/**
 * Get team member image configuration
 */
export function getTeamImage(memberId: string): ImageConfig | undefined {
  return teamImages[memberId];
}

/**
 * Get hero image configuration
 */
export function getHeroImage(page: string): ImageConfig | undefined {
  return heroImages[page];
}
