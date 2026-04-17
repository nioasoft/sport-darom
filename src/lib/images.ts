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
 * Each sport has 4 images: 1=horizontal, 2=vertical, 3=horizontal, 4=horizontal
 */
export const galleryImages: Record<string, ImageConfig[]> = {
  athletics: [
    {
      src: 'sports/athletics/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'ספורטאי אתלטיקה מתאמן במגרש באר שבע',
        ar: 'رياضي ألعاب قوى يتدرب في ملعب بئر السبع',
        ru: 'Спортсмен по лёгкой атлетике тренируется на стадионе в Беэр-Шеве',
      },
    },
    {
      src: 'sports/athletics/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'לאון באימון אתלטיקה',
        ar: 'ليون في تدريب ألعاب القوى',
        ru: 'Леон на тренировке по лёгкой атлетике',
      },
    },
    {
      src: 'sports/athletics/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'אימון ריצה עם מאמן בספורט דרום',
        ar: 'تدريب الجري مع المدرب في سبورت داروم',
        ru: 'Беговая тренировка с тренером в Спорт Даром',
      },
    },
    {
      src: 'sports/athletics/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'מתן ספורטאי אתלטיקה בתחרות',
        ar: 'ماتان رياضي ألعاب القوى في منافسة',
        ru: 'Матан, спортсмен по лёгкой атлетике, на соревновании',
      },
    },
  ],
  'wheelchair-basketball': [
    {
      src: 'sports/wheelchair-basketball/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'משחק כדורסל כיסאות גלגלים מקצועי',
        ar: 'مباراة كرة سلة على الكراسي المتحركة احترافية',
        ru: 'Профессиональный матч баскетбола на колясках',
      },
    },
    {
      src: 'sports/wheelchair-basketball/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'אלירז וגדי בכדורסל כיסאות גלגלים',
        ar: 'إلياز وجادي في كرة السلة على الكراسي المتحركة',
        ru: 'Элираз и Гади в баскетболе на колясках',
      },
    },
    {
      src: 'sports/wheelchair-basketball/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'שחקן צעיר בכדורסל כיסאות גלגלים',
        ar: 'لاعب شاب في كرة السلة على الكراسي المتحركة',
        ru: 'Молодой игрок в баскетбол на колясках',
      },
    },
    {
      src: 'sports/wheelchair-basketball/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'אימון כדורסל כיסאות גלגלים באולם',
        ar: 'تدريب كرة السلة على الكراسي المتحركة في الصالة',
        ru: 'Тренировка по баскетболу на колясках в зале',
      },
    },
  ],
  goalball: [
    {
      src: 'sports/goalball/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'משחק כדור שער ביום ספורט',
        ar: 'مباراة كرة الهدف في يوم رياضي',
        ru: 'Матч голбола в спортивный день',
      },
    },
    {
      src: 'sports/goalball/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'בנים במשחק כדור שער',
        ar: 'أولاد في مباراة كرة الهدف',
        ru: 'Мальчики играют в голбол',
      },
    },
    {
      src: 'sports/goalball/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'ליהיא מאמנת כדור שער בספורט דרום',
        ar: 'ليحيا مدربة كرة الهدف في سبورت داروم',
        ru: 'Лихия, тренер по голболу в Спорт Даром',
      },
    },
    {
      src: 'sports/goalball/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'ליאב משחק כדור שער',
        ar: 'لياف يلعب كرة الهدف',
        ru: 'Лиав играет в голбол',
      },
    },
  ],
  swimming: [
    {
      src: 'sports/swimming/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'שחיינים בבריכה בספורט דרום',
        ar: 'سباحون في المسبح في سبورت داروم',
        ru: 'Пловцы в бассейне Спорт Даром',
      },
    },
    {
      src: 'sports/swimming/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'עלמה בתחרות שחייה',
        ar: 'علمة في منافسة السباحة',
        ru: 'Алма на соревновании по плаванию',
      },
    },
    {
      src: 'sports/swimming/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'אימון שחייה בבריכה',
        ar: 'تدريب السباحة في المسبح',
        ru: 'Тренировка по плаванию в бассейне',
      },
    },
    {
      src: 'sports/swimming/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'שחיינים מתאמנים בספורט דרום',
        ar: 'سباحون يتدربون في سبورت داروم',
        ru: 'Пловцы тренируются в Спорт Даром',
      },
    },
  ],
  bocce: [
    {
      src: 'sports/bocce/1.webp',
      orientation: 'horizontal',
      alt: {
        he: "משחק בוצ'ה ביום ספורט",
        ar: 'مباراة بوتشي في يوم رياضي',
        ru: 'Игра в бочче в спортивный день',
      },
    },
    {
      src: 'sports/bocce/2.webp',
      orientation: 'vertical',
      alt: {
        he: "צביקה בתחרות בוצ'ה",
        ar: 'تسفيكا في منافسة البوتشي',
        ru: 'Цвика на соревновании по бочче',
      },
    },
    {
      src: 'sports/bocce/3.webp',
      orientation: 'horizontal',
      alt: {
        he: "ספורטאי בוצ'ה מתרכז בזריקה",
        ar: 'رياضي بوتشي يركز على الرمي',
        ru: 'Спортсмен по бочче сосредоточен на броске',
      },
    },
    {
      src: 'sports/bocce/4.webp',
      orientation: 'horizontal',
      alt: {
        he: "אימון בוצ'ה בספורט דרום",
        ar: 'تدريب البوتشي في سبورت داروم',
        ru: 'Тренировка по бочче в Спорт Даром',
      },
    },
  ],
  'hand-cycling': [
    {
      src: 'sports/hand-cycling/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'רוכבי אופני יד בדרום הארץ',
        ar: 'راكبو الدراجات اليدوية في جنوب البلاد',
        ru: 'Велосипедисты на ручных велосипедах на юге страны',
      },
    },
    {
      src: 'sports/hand-cycling/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'רוכב אופני יד ליד מגרש הטניס',
        ar: 'راكب دراجة يدوية بجانب ملعب التنس',
        ru: 'Велосипедист на ручном велосипеде рядом с теннисным кортом',
      },
    },
    {
      src: 'sports/hand-cycling/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'לאון באימון אופני יד',
        ar: 'ليون في تدريب الدراجة اليدوية',
        ru: 'Леон на тренировке по ручному велоспорту',
      },
    },
    {
      src: 'sports/hand-cycling/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'רכיבה על אופני יד בשביל',
        ar: 'ركوب الدراجة اليدوية على المسار',
        ru: 'Поездка на ручном велосипеде по дорожке',
      },
    },
  ],
  judo: [
    {
      src: 'sports/judo/1.webp',
      orientation: 'horizontal',
      alt: {
        he: "אימון ג'ודו על המזרן",
        ar: 'تدريب الجودو على الحصيرة',
        ru: 'Тренировка по дзюдо на татами',
      },
    },
    {
      src: 'sports/judo/2.webp',
      orientation: 'vertical',
      alt: {
        he: "ספורטאי צעיר עם אבי מאמן הג'ודו",
        ar: 'رياضي شاب مع آفي مدرب الجودو',
        ru: 'Молодой спортсмен с Ави, тренером по дзюдо',
      },
    },
    {
      src: 'sports/judo/3.webp',
      orientation: 'horizontal',
      alt: {
        he: "קרב ג'ודו באימון בספורט דרום",
        ar: 'قتال جودو في تدريب سبورت داروم',
        ru: 'Поединок по дзюдо на тренировке Спорт Даром',
      },
    },
    {
      src: 'sports/judo/4.webp',
      orientation: 'horizontal',
      alt: {
        he: "ג'ודוקאים מתאמנים יחד",
        ar: 'لاعبو الجودو يتدربون معًا',
        ru: 'Дзюдоисты тренируются вместе',
      },
    },
  ],
  archery: [
    {
      src: 'sports/archery/1.webp',
      orientation: 'horizontal',
      alt: {
        he: 'אימון קשתות במגרש',
        ar: 'تدريب الرماية بالقوس في الميدان',
        ru: 'Тренировка по стрельбе из лука на стрельбище',
      },
    },
    {
      src: 'sports/archery/2.webp',
      orientation: 'vertical',
      alt: {
        he: 'לאון עם החיצים בחץ וקשת',
        ar: 'ليون مع السهام في الرماية بالقوس',
        ru: 'Леон со стрелами в стрельбе из лука',
      },
    },
    {
      src: 'sports/archery/3.webp',
      orientation: 'horizontal',
      alt: {
        he: 'קשת מכוון למטרה',
        ar: 'رامي قوس يصوب نحو الهدف',
        ru: 'Лучник прицеливается в мишень',
      },
    },
    {
      src: 'sports/archery/4.webp',
      orientation: 'horizontal',
      alt: {
        he: 'ליאור באימון חץ וקשת',
        ar: 'ليؤر في تدريب الرماية بالقوس',
        ru: 'Лиор на тренировке по стрельбе из лука',
      },
    },
  ],
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
