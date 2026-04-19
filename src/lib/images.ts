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
 * Gallery images for sports pages.
 *
 * Auto-generated from `scripts/gallery-manifest.json` by
 * `scripts/generate-gallery-config.mjs`. To refresh:
 *   1. Drop new source images into `public/images/תמונות לאתר/<hebrew-sport>/`
 *   2. `node scripts/import-gallery-images.mjs`
 *   3. `node scripts/generate-gallery-config.mjs`
 */
export const galleryImages: Record<string, ImageConfig[]> = {
  athletics: [
    {
      src: "sports/athletics/01.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #1",
        ar: "تدريب ألعاب القوى في سبورت داروم #1",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #1",
      },
    },
    {
      src: "sports/athletics/02.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #2",
        ar: "تدريب ألعاب القوى في سبورت داروم #2",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #2",
      },
    },
    {
      src: "sports/athletics/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #3",
        ar: "تدريب ألعاب القوى في سبورت داروم #3",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #3",
      },
    },
    {
      src: "sports/athletics/04.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #4",
        ar: "تدريب ألعاب القوى في سبورت داروم #4",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #4",
      },
    },
    {
      src: "sports/athletics/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #5",
        ar: "تدريب ألعاب القوى في سبورت داروم #5",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #5",
      },
    },
    {
      src: "sports/athletics/06.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #6",
        ar: "تدريب ألعاب القوى في سبورت داروم #6",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #6",
      },
    },
    {
      src: "sports/athletics/07.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #7",
        ar: "تدريب ألعاب القوى في سبورت داروم #7",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #7",
      },
    },
    {
      src: "sports/athletics/08.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #8",
        ar: "تدريب ألعاب القوى في سبورت داروم #8",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #8",
      },
    },
    {
      src: "sports/athletics/09.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #9",
        ar: "تدريب ألعاب القوى في سبورت داروم #9",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #9",
      },
    },
    {
      src: "sports/athletics/10.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #10",
        ar: "تدريب ألعاب القوى في سبورت داروم #10",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #10",
      },
    },
    {
      src: "sports/athletics/11.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #11",
        ar: "تدريب ألعاب القوى في سبورت داروم #11",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #11",
      },
    },
    {
      src: "sports/athletics/12.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #12",
        ar: "تدريب ألعاب القوى في سبورت داروم #12",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #12",
      },
    },
    {
      src: "sports/athletics/13.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #13",
        ar: "تدريب ألعاب القوى في سبورت داروم #13",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #13",
      },
    },
    {
      src: "sports/athletics/14.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #14",
        ar: "تدريب ألعاب القوى في سبورت داروم #14",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #14",
      },
    },
    {
      src: "sports/athletics/15.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #15",
        ar: "تدريب ألعاب القوى في سبورت داروم #15",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #15",
      },
    },
    {
      src: "sports/athletics/16.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #16",
        ar: "تدريب ألعاب القوى في سبورت داروم #16",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #16",
      },
    },
    {
      src: "sports/athletics/17.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #17",
        ar: "تدريب ألعاب القوى في سبورت داروم #17",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #17",
      },
    },
    {
      src: "sports/athletics/18.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #18",
        ar: "تدريب ألعاب القوى في سبورت داروم #18",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #18",
      },
    },
    {
      src: "sports/athletics/19.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #19",
        ar: "تدريب ألعاب القوى في سبورت داروم #19",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #19",
      },
    },
    {
      src: "sports/athletics/20.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #20",
        ar: "تدريب ألعاب القوى في سبورت داروم #20",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #20",
      },
    },
    {
      src: "sports/athletics/21.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #21",
        ar: "تدريب ألعاب القوى في سبورت داروم #21",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #21",
      },
    },
    {
      src: "sports/athletics/22.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #22",
        ar: "تدريب ألعاب القوى في سبورت داروم #22",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #22",
      },
    },
    {
      src: "sports/athletics/23.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אתלטיקה בספורט דרום #23",
        ar: "تدريب ألعاب القوى في سبورت داروم #23",
        ru: "Тренировка по лёгкой атлетике в Спорт Даром #23",
      },
    },
  ],
  'wheelchair-basketball': [
    {
      src: "sports/wheelchair-basketball/01.webp",
      orientation: "vertical",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #1",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #1",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #1",
      },
    },
    {
      src: "sports/wheelchair-basketball/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #2",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #2",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #2",
      },
    },
    {
      src: "sports/wheelchair-basketball/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #3",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #3",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #3",
      },
    },
    {
      src: "sports/wheelchair-basketball/04.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #4",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #4",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #4",
      },
    },
    {
      src: "sports/wheelchair-basketball/05.webp",
      orientation: "vertical",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #5",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #5",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #5",
      },
    },
    {
      src: "sports/wheelchair-basketball/06.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #6",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #6",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #6",
      },
    },
    {
      src: "sports/wheelchair-basketball/07.webp",
      orientation: "vertical",
      alt: {
        he: "אימון כדורסל כיסאות גלגלים בספורט דרום #7",
        ar: "تدريب كرة السلة على الكراسي المتحركة في سبورت داروم #7",
        ru: "Тренировка по баскетболу на колясках в Спорт Даром #7",
      },
    },
  ],
  goalball: [
    {
      src: "sports/goalball/01.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #1",
        ar: "تدريب كرة الهدف في سبورت داروم #1",
        ru: "Тренировка по голболу в Спорт Даром #1",
      },
    },
    {
      src: "sports/goalball/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #2",
        ar: "تدريب كرة الهدف في سبورت داروم #2",
        ru: "Тренировка по голболу в Спорт Даром #2",
      },
    },
    {
      src: "sports/goalball/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #3",
        ar: "تدريب كرة الهدف في سبورت داروم #3",
        ru: "Тренировка по голболу в Спорт Даром #3",
      },
    },
    {
      src: "sports/goalball/04.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #4",
        ar: "تدريب كرة الهدف في سبورت داروم #4",
        ru: "Тренировка по голболу в Спорт Даром #4",
      },
    },
    {
      src: "sports/goalball/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #5",
        ar: "تدريب كرة الهدف في سبورت داروم #5",
        ru: "Тренировка по голболу в Спорт Даром #5",
      },
    },
    {
      src: "sports/goalball/06.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #6",
        ar: "تدريب كرة الهدف في سبورت داروم #6",
        ru: "Тренировка по голболу в Спорт Даром #6",
      },
    },
    {
      src: "sports/goalball/07.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #7",
        ar: "تدريب كرة الهدف في سبورت داروم #7",
        ru: "Тренировка по голболу в Спорт Даром #7",
      },
    },
    {
      src: "sports/goalball/08.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #8",
        ar: "تدريب كرة الهدف في سبورت داروم #8",
        ru: "Тренировка по голболу в Спорт Даром #8",
      },
    },
    {
      src: "sports/goalball/09.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #9",
        ar: "تدريب كرة الهدف في سبورت داروم #9",
        ru: "Тренировка по голболу в Спорт Даром #9",
      },
    },
    {
      src: "sports/goalball/10.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #10",
        ar: "تدريب كرة الهدف في سبورت داروم #10",
        ru: "Тренировка по голболу в Спорт Даром #10",
      },
    },
    {
      src: "sports/goalball/11.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #11",
        ar: "تدريب كرة الهدف في سبورت داروم #11",
        ru: "Тренировка по голболу в Спорт Даром #11",
      },
    },
    {
      src: "sports/goalball/12.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון כדור שער בספורט דרום #12",
        ar: "تدريب كرة الهدف في سبورت داروم #12",
        ru: "Тренировка по голболу в Спорт Даром #12",
      },
    },
  ],
  swimming: [
    {
      src: "sports/swimming/01.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #1",
        ar: "تدريب السباحة في سبورت داروم #1",
        ru: "Тренировка по плаванию в Спорт Даром #1",
      },
    },
    {
      src: "sports/swimming/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #2",
        ar: "تدريب السباحة في سبورت داروم #2",
        ru: "Тренировка по плаванию в Спорт Даром #2",
      },
    },
    {
      src: "sports/swimming/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #3",
        ar: "تدريب السباحة في سبورت داروم #3",
        ru: "Тренировка по плаванию в Спорт Даром #3",
      },
    },
    {
      src: "sports/swimming/04.webp",
      orientation: "vertical",
      alt: {
        he: "אימון שחייה בספורט דרום #4",
        ar: "تدريب السباحة في سبورت داروم #4",
        ru: "Тренировка по плаванию в Спорт Даром #4",
      },
    },
    {
      src: "sports/swimming/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #5",
        ar: "تدريب السباحة في سبورت داروم #5",
        ru: "Тренировка по плаванию в Спорт Даром #5",
      },
    },
    {
      src: "sports/swimming/06.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #6",
        ar: "تدريب السباحة في سبورت داروم #6",
        ru: "Тренировка по плаванию в Спорт Даром #6",
      },
    },
    {
      src: "sports/swimming/07.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #7",
        ar: "تدريب السباحة في سبورت داروم #7",
        ru: "Тренировка по плаванию в Спорт Даром #7",
      },
    },
    {
      src: "sports/swimming/08.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #8",
        ar: "تدريب السباحة في سبورت داروم #8",
        ru: "Тренировка по плаванию в Спорт Даром #8",
      },
    },
    {
      src: "sports/swimming/09.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #9",
        ar: "تدريب السباحة في سبورت داروم #9",
        ru: "Тренировка по плаванию в Спорт Даром #9",
      },
    },
    {
      src: "sports/swimming/10.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #10",
        ar: "تدريب السباحة في سبورت داروم #10",
        ru: "Тренировка по плаванию в Спорт Даром #10",
      },
    },
    {
      src: "sports/swimming/11.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #11",
        ar: "تدريب السباحة في سبورت داروم #11",
        ru: "Тренировка по плаванию в Спорт Даром #11",
      },
    },
    {
      src: "sports/swimming/12.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #12",
        ar: "تدريب السباحة في سبورت داروم #12",
        ru: "Тренировка по плаванию в Спорт Даром #12",
      },
    },
    {
      src: "sports/swimming/13.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #13",
        ar: "تدريب السباحة في سبورت داروم #13",
        ru: "Тренировка по плаванию в Спорт Даром #13",
      },
    },
    {
      src: "sports/swimming/14.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #14",
        ar: "تدريب السباحة في سبورت داروم #14",
        ru: "Тренировка по плаванию в Спорт Даром #14",
      },
    },
    {
      src: "sports/swimming/15.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #15",
        ar: "تدريب السباحة في سبورت داروم #15",
        ru: "Тренировка по плаванию в Спорт Даром #15",
      },
    },
    {
      src: "sports/swimming/16.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #16",
        ar: "تدريب السباحة في سبورت داروم #16",
        ru: "Тренировка по плаванию в Спорт Даром #16",
      },
    },
    {
      src: "sports/swimming/17.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון שחייה בספורט דרום #17",
        ar: "تدريب السباحة في سبورت داروم #17",
        ru: "Тренировка по плаванию в Спорт Даром #17",
      },
    },
  ],
  bocce: [
    {
      src: "sports/bocce/01.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון בוצ'ה בספורט דרום #1",
        ar: "تدريب البوتشي في سبورت داروم #1",
        ru: "Тренировка по бочче в Спорт Даром #1",
      },
    },
    {
      src: "sports/bocce/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון בוצ'ה בספורט דרום #2",
        ar: "تدريب البوتشي في سبورت داروم #2",
        ru: "Тренировка по бочче в Спорт Даром #2",
      },
    },
    {
      src: "sports/bocce/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון בוצ'ה בספורט דרום #3",
        ar: "تدريب البوتشي في سبورت داروم #3",
        ru: "Тренировка по бочче в Спорт Даром #3",
      },
    },
    {
      src: "sports/bocce/04.webp",
      orientation: "vertical",
      alt: {
        he: "אימון בוצ'ה בספורט דרום #4",
        ar: "تدريب البوتشي في سبورت داروم #4",
        ru: "Тренировка по бочче в Спорт Даром #4",
      },
    },
    {
      src: "sports/bocce/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון בוצ'ה בספורט דרום #5",
        ar: "تدريب البوتشي في سبورت داروم #5",
        ru: "Тренировка по бочче в Спорт Даром #5",
      },
    },
  ],
  'hand-cycling': [
    {
      src: "sports/hand-cycling/01.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אופני יד בספורט דרום #1",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #1",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #1",
      },
    },
    {
      src: "sports/hand-cycling/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אופני יד בספורט דרום #2",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #2",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #2",
      },
    },
    {
      src: "sports/hand-cycling/03.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אופני יד בספורט דרום #3",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #3",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #3",
      },
    },
    {
      src: "sports/hand-cycling/04.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אופני יד בספורט דרום #4",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #4",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #4",
      },
    },
    {
      src: "sports/hand-cycling/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון אופני יד בספורט דרום #5",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #5",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #5",
      },
    },
    {
      src: "sports/hand-cycling/06.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אופני יד בספורט דרום #6",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #6",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #6",
      },
    },
    {
      src: "sports/hand-cycling/07.webp",
      orientation: "vertical",
      alt: {
        he: "אימון אופני יד בספורט דרום #7",
        ar: "تدريب الدراجات اليدوية في سبورت داروم #7",
        ru: "Тренировка по ручному велоспорту в Спорт Даром #7",
      },
    },
  ],
  judo: [
    {
      src: "sports/judo/01.webp",
      orientation: "vertical",
      alt: {
        he: "אימון ג'ודו בספורט דרום #1",
        ar: "تدريب الجودو في سبورت داروم #1",
        ru: "Тренировка по дзюдо в Спорт Даром #1",
      },
    },
    {
      src: "sports/judo/02.webp",
      orientation: "vertical",
      alt: {
        he: "אימון ג'ודו בספורט דרום #2",
        ar: "تدريب الجودو في سبورت داروم #2",
        ru: "Тренировка по дзюдо в Спорт Даром #2",
      },
    },
    {
      src: "sports/judo/03.webp",
      orientation: "vertical",
      alt: {
        he: "אימון ג'ודו בספורט דרום #3",
        ar: "تدريب الجودو في سبورت داروم #3",
        ru: "Тренировка по дзюдо в Спорт Даром #3",
      },
    },
    {
      src: "sports/judo/04.webp",
      orientation: "vertical",
      alt: {
        he: "אימון ג'ודו בספורט דרום #4",
        ar: "تدريب الجودو في سبورت داروم #4",
        ru: "Тренировка по дзюдо в Спорт Даром #4",
      },
    },
    {
      src: "sports/judo/05.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #5",
        ar: "تدريب الجودو في سبورت داروم #5",
        ru: "Тренировка по дзюдо в Спорт Даром #5",
      },
    },
    {
      src: "sports/judo/06.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #6",
        ar: "تدريب الجودو في سبورت داروم #6",
        ru: "Тренировка по дзюдо в Спорт Даром #6",
      },
    },
    {
      src: "sports/judo/07.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #7",
        ar: "تدريب الجودو في سبورت داروم #7",
        ru: "Тренировка по дзюдо в Спорт Даром #7",
      },
    },
    {
      src: "sports/judo/08.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #8",
        ar: "تدريب الجودو في سبورت داروم #8",
        ru: "Тренировка по дзюдо в Спорт Даром #8",
      },
    },
    {
      src: "sports/judo/09.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #9",
        ar: "تدريب الجودو في سبورت داروم #9",
        ru: "Тренировка по дзюдо в Спорт Даром #9",
      },
    },
    {
      src: "sports/judo/10.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #10",
        ar: "تدريب الجودو في سبورت داروم #10",
        ru: "Тренировка по дзюдо в Спорт Даром #10",
      },
    },
    {
      src: "sports/judo/11.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #11",
        ar: "تدريب الجودو في سبورت داروم #11",
        ru: "Тренировка по дзюдо в Спорт Даром #11",
      },
    },
    {
      src: "sports/judo/12.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #12",
        ar: "تدريب الجودو في سبورت داروم #12",
        ru: "Тренировка по дзюдо в Спорт Даром #12",
      },
    },
    {
      src: "sports/judo/13.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #13",
        ar: "تدريب الجودو في سبورت داروم #13",
        ru: "Тренировка по дзюдо в Спорт Даром #13",
      },
    },
    {
      src: "sports/judo/14.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #14",
        ar: "تدريب الجودو في سبورت داروم #14",
        ru: "Тренировка по дзюдо в Спорт Даром #14",
      },
    },
    {
      src: "sports/judo/15.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #15",
        ar: "تدريب الجودو في سبورت داروم #15",
        ru: "Тренировка по дзюдо в Спорт Даром #15",
      },
    },
    {
      src: "sports/judo/16.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #16",
        ar: "تدريب الجودو في سبورت داروم #16",
        ru: "Тренировка по дзюдо в Спорт Даром #16",
      },
    },
    {
      src: "sports/judo/17.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #17",
        ar: "تدريب الجودو في سبورت داروم #17",
        ru: "Тренировка по дзюдо в Спорт Даром #17",
      },
    },
    {
      src: "sports/judo/18.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #18",
        ar: "تدريب الجودو في سبورت داروم #18",
        ru: "Тренировка по дзюдо в Спорт Даром #18",
      },
    },
    {
      src: "sports/judo/19.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #19",
        ar: "تدريب الجودو في سبورت داروم #19",
        ru: "Тренировка по дзюдо в Спорт Даром #19",
      },
    },
    {
      src: "sports/judo/20.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #20",
        ar: "تدريب الجودو في سبورت داروم #20",
        ru: "Тренировка по дзюдо в Спорт Даром #20",
      },
    },
    {
      src: "sports/judo/21.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #21",
        ar: "تدريب الجودو في سبورت داروم #21",
        ru: "Тренировка по дзюдо в Спорт Даром #21",
      },
    },
    {
      src: "sports/judo/22.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #22",
        ar: "تدريب الجودو في سبورت داروم #22",
        ru: "Тренировка по дзюдо в Спорт Даром #22",
      },
    },
    {
      src: "sports/judo/23.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #23",
        ar: "تدريب الجودو في سبورت داروم #23",
        ru: "Тренировка по дзюдо в Спорт Даром #23",
      },
    },
    {
      src: "sports/judo/24.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #24",
        ar: "تدريب الجودو في سبورت داروم #24",
        ru: "Тренировка по дзюдо в Спорт Даром #24",
      },
    },
    {
      src: "sports/judo/25.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #25",
        ar: "تدريب الجودو في سبورت داروم #25",
        ru: "Тренировка по дзюдо в Спорт Даром #25",
      },
    },
    {
      src: "sports/judo/26.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #26",
        ar: "تدريب الجودو في سبورت داروم #26",
        ru: "Тренировка по дзюдо в Спорт Даром #26",
      },
    },
    {
      src: "sports/judo/27.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #27",
        ar: "تدريب الجودو في سبورت داروم #27",
        ru: "Тренировка по дзюдо в Спорт Даром #27",
      },
    },
    {
      src: "sports/judo/28.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #28",
        ar: "تدريب الجودو في سبورت داروم #28",
        ru: "Тренировка по дзюдо в Спорт Даром #28",
      },
    },
    {
      src: "sports/judo/29.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #29",
        ar: "تدريب الجودو في سبورت داروم #29",
        ru: "Тренировка по дзюдо в Спорт Даром #29",
      },
    },
    {
      src: "sports/judo/30.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #30",
        ar: "تدريب الجودو في سبورت داروم #30",
        ru: "Тренировка по дзюдо в Спорт Даром #30",
      },
    },
    {
      src: "sports/judo/31.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #31",
        ar: "تدريب الجودو في سبورت داروم #31",
        ru: "Тренировка по дзюдо в Спорт Даром #31",
      },
    },
    {
      src: "sports/judo/32.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #32",
        ar: "تدريب الجودو في سبورت داروم #32",
        ru: "Тренировка по дзюдо в Спорт Даром #32",
      },
    },
    {
      src: "sports/judo/33.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון ג'ודו בספורט דרום #33",
        ar: "تدريب الجودو في سبورت داروم #33",
        ru: "Тренировка по дзюдо в Спорт Даром #33",
      },
    },
  ],
  archery: [
    {
      src: "sports/archery/01.webp",
      orientation: "vertical",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #1",
        ar: "تدريب الرماية بالقوس في سبورت داروم #1",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #1",
      },
    },
    {
      src: "sports/archery/02.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #2",
        ar: "تدريب الرماية بالقوس في سبورت داروم #2",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #2",
      },
    },
    {
      src: "sports/archery/03.webp",
      orientation: "vertical",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #3",
        ar: "تدريب الرماية بالقوس في سبورت داروم #3",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #3",
      },
    },
    {
      src: "sports/archery/04.webp",
      orientation: "vertical",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #4",
        ar: "تدريب الرماية بالقوس في سبورت داروم #4",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #4",
      },
    },
    {
      src: "sports/archery/05.webp",
      orientation: "vertical",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #5",
        ar: "تدريب الرماية بالقوس في سبورت داروم #5",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #5",
      },
    },
    {
      src: "sports/archery/06.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #6",
        ar: "تدريب الرماية بالقوس في سبورت داروم #6",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #6",
      },
    },
    {
      src: "sports/archery/07.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #7",
        ar: "تدريب الرماية بالقوس في سبورت داروم #7",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #7",
      },
    },
    {
      src: "sports/archery/08.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #8",
        ar: "تدريب الرماية بالقوس في سبورت داروم #8",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #8",
      },
    },
    {
      src: "sports/archery/09.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #9",
        ar: "تدريب الرماية بالقوس في سبورت داروم #9",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #9",
      },
    },
    {
      src: "sports/archery/10.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #10",
        ar: "تدريب الرماية بالقوس في سبورت داروم #10",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #10",
      },
    },
    {
      src: "sports/archery/11.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #11",
        ar: "تدريب الرماية بالقوس في سبورت داروم #11",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #11",
      },
    },
    {
      src: "sports/archery/12.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #12",
        ar: "تدريب الرماية بالقوس في سبورت داروم #12",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #12",
      },
    },
    {
      src: "sports/archery/13.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #13",
        ar: "تدريب الرماية بالقوس في سبورت داروم #13",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #13",
      },
    },
    {
      src: "sports/archery/14.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #14",
        ar: "تدريب الرماية بالقوس في سبورت داروم #14",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #14",
      },
    },
    {
      src: "sports/archery/15.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #15",
        ar: "تدريب الرماية بالقوس في سبورت داروم #15",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #15",
      },
    },
    {
      src: "sports/archery/16.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #16",
        ar: "تدريب الرماية بالقوس في سبورت داروم #16",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #16",
      },
    },
    {
      src: "sports/archery/17.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #17",
        ar: "تدريب الرماية بالقوس في سبورت داروم #17",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #17",
      },
    },
    {
      src: "sports/archery/18.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #18",
        ar: "تدريب الرماية بالقوس في سبورت داروم #18",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #18",
      },
    },
    {
      src: "sports/archery/19.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #19",
        ar: "تدريب الرماية بالقوس في سبورت داروم #19",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #19",
      },
    },
    {
      src: "sports/archery/20.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #20",
        ar: "تدريب الرماية بالقوس في سبورت داروم #20",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #20",
      },
    },
    {
      src: "sports/archery/21.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #21",
        ar: "تدريب الرماية بالقوس في سبورت داروم #21",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #21",
      },
    },
    {
      src: "sports/archery/22.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #22",
        ar: "تدريب الرماية بالقوس في سبورت داروم #22",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #22",
      },
    },
    {
      src: "sports/archery/23.webp",
      orientation: "horizontal",
      alt: {
        he: "אימון חץ וקשת בספורט דרום #23",
        ar: "تدريب الرماية بالقوس في سبورت داروم #23",
        ru: "Тренировка по стрельбе из лука в Спорт Даром #23",
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
