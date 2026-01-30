'use client';

import { useTranslations } from 'next-intl';

interface SkipLink {
  href: string;
  labelKey: string;
}

const skipLinks: SkipLink[] = [
  { href: '#main-content', labelKey: 'skipToMain' },
  { href: '#navigation', labelKey: 'skipToNav' },
  { href: '#footer', labelKey: 'skipToFooter' },
];

export function SkipLinks() {
  const t = useTranslations('accessibility');

  return (
    <nav aria-label={t('skipLinksLabel')} className="skip-links-container">
      {skipLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="skip-link"
        >
          {t(link.labelKey)}
        </a>
      ))}
    </nav>
  );
}
