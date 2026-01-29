import { getTranslations, setRequestLocale } from 'next-intl/server';

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      <main className="flex flex-col items-center gap-8 p-8 text-center">
        <h1 className="text-5xl font-bold text-[var(--color-primary-900)]">
          {t('hero.title')}
        </h1>
        <p className="max-w-2xl text-xl text-[var(--color-primary-700)]">
          {t('hero.subtitle')}
        </p>
        <a
          href="#contact"
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[var(--color-primary-700)] px-8 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-800)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]"
        >
          {t('hero.cta')}
        </a>
      </main>
    </div>
  );
}
