'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { ErrorPageShell } from '@/components/errors/error-page-shell';
import { Button } from '@/components/ui/button';
import type { AppLocale } from '@/i18n/routing';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('errors.serverError');
  const isEnglish = locale === 'en';
  const homeHref = isEnglish ? '/en' : '/';

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageShell
      code={t('code')}
      title={t('title')}
      description={t('description')}
      primaryAction={
        <Button onClick={reset} className="h-11 cursor-pointer rounded-full bg-[#DB1721] px-6 text-white hover:bg-[#C8141D]">
          {t('tryAgain')}
        </Button>
      }
      secondaryAction={
        <Button asChild variant="outline" className="h-11 rounded-full px-6">
          <Link href={homeHref}>{t('goHome')}</Link>
        </Button>
      }
    />
  );
}
