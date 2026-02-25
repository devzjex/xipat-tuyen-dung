import { getRequestConfig } from 'next-intl/server';
import { routing, type AppLocale } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) ?? routing.defaultLocale;

  if (!routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale;
  }

  const normalizedLocale = locale as AppLocale;
  const messages = (await import(`../messages/${normalizedLocale}.json`)).default;

  return {
    locale: normalizedLocale,
    messages,
  };
});
