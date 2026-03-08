import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui/toaster';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const [{ locale }, messages] = await Promise.all([params, getMessages()]);
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      ) : null}
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </>
  );
}
