import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

import { ErrorPageShell } from '@/components/errors/error-page-shell';
import { Button } from '@/components/ui/button';

export default async function GlobalNotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations('errors.notFound');
  const isEnglish = locale === 'en';
  const homeHref = isEnglish ? '/en' : '/';
  const careersHref = isEnglish ? '/en/careers' : '/careers';

  return (
    <ErrorPageShell
      code={t('code')}
      title={t('title')}
      description={t('description')}
      primaryAction={
        <Button asChild className="h-11 rounded-full bg-[#002A6A] px-6 text-white hover:bg-[#01357F]">
          <Link href={homeHref}>{t('backHome')}</Link>
        </Button>
      }
      secondaryAction={
        <Button asChild variant="outline" className="h-11 rounded-full px-6">
          <Link href={careersHref}>{t('viewCareers')}</Link>
        </Button>
      }
    />
  );
}
