import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export type AppLocale = (typeof routing)['locales'][number];

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
