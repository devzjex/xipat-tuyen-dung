import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import type { AppLocale } from '@/i18n/routing';
import { HeroNavbar } from '@/components/home/hero-navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: AppLocale }>;
}>) {
  const [{ locale }, messages] = await Promise.all([params, getMessages()]);

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white text-[#002A6A] antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <HeroNavbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

