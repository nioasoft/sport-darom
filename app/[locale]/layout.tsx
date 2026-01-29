import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Noto_Sans, Noto_Sans_Hebrew, Noto_Sans_Arabic } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SkipLinks } from '@/src/components/accessibility/SkipLinks';
import { Header, Footer } from '@/src/components/layout';
import { AccessibilityPanel } from '@/src/components/accessibility/AccessibilityPanel';
import '../globals.css';

// Configure Noto Sans with all required subsets
const notoSans = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-noto-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  variable: '--font-noto-sans-hebrew',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    he: 'ספורט דרום - ספורט פראלימפי בדרום הארץ',
    ar: 'سبورت داروم - الرياضة البارالمبية في جنوب البلاد',
    ru: 'Спорт Даром - Паралимпийский спорт на юге страны',
  };

  const descriptions: Record<string, string> = {
    he: 'הצטרפו אלינו לפעילות ספורטיבית פראלימפית באזור באר שבע - 8 ענפי ספורט לאנשים עם מוגבלויות',
    ar: 'انضموا إلينا للنشاط الرياضي البارالمبي في منطقة بئر السبع - 8 فروع رياضية لذوي الإعاقات',
    ru: 'Присоединяйтесь к нам для паралимпийской спортивной деятельности в районе Беэр-Шевы - 8 видов спорта для людей с ограниченными возможностями',
  };

  return {
    title: titles[locale] || titles.he,
    description: descriptions[locale] || descriptions.he,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Determine text direction
  const isRtl = ['he', 'ar'].includes(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body
        className={`${notoSans.variable} ${notoSansHebrew.variable} ${notoSansArabic.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SkipLinks />
          <Header />
          <main id="main-content" tabIndex={-1} className="min-h-screen">
            {children}
          </main>
          <Footer />
          <AccessibilityPanel />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
