'use client';

import { useLocale } from 'next-intl';

import { Link, usePathname, routing, type AppLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const LABELS: Record<AppLocale, string> = {
  en: 'English',
  vi: 'Tiếng Việt',
};

export function LocaleSwitcher() {
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const href = pathname ?? '/';

  return (
    <div className="inline-flex items-center rounded-full border border-border/60 bg-card/80 p-1 shadow-sm">
      {routing.locales.map((locale) => (
        <Link
          key={locale}
          href={href}
          locale={locale as AppLocale}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeLocale === locale
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {LABELS[locale as AppLocale]}
        </Link>
      ))}
    </div>
  );
}
