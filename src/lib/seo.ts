import type { Metadata } from 'next';
import { routing, type AppLocale } from '@/i18n/routing';

type SeoImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type SeoInput = {
  title: string;
  description: string;
  locale?: string;
  path?: string;
  siteName?: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: SeoImage;
};

type SeoDefaults = Omit<SeoInput, 'title' | 'description'> & {
  siteName: string;
};

const DEFAULT_BASE_URL = 'https://xipat.com';

function isAppLocale(locale: string): locale is AppLocale {
  return routing.locales.includes(locale as AppLocale);
}

function normalizePath(path: string): string {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function localizePath(path: string, locale: AppLocale): string {
  const normalizedPath = normalizePath(path);
  if (locale === routing.defaultLocale) {
    return normalizedPath;
  }
  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`;
}

function getBaseUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_BASE_URL;
  return new URL(raw.startsWith('http') ? raw : `https://${raw}`);
}

export function buildSeoMetadata(input: SeoInput): Metadata {
  const baseUrl = getBaseUrl();
  const localeCandidate = input.locale ?? routing.defaultLocale;
  const locale: AppLocale = isAppLocale(localeCandidate) ? localeCandidate : routing.defaultLocale;
  const path = input.path ?? '/';
  const localizedPath = localizePath(path, locale);

  const languages = Object.fromEntries(
    routing.locales.map((supportedLocale) => [supportedLocale, localizePath(path, supportedLocale)]),
  );

  const image = input.image
    ? {
        ...input.image,
        url: input.image.url.startsWith('http')
          ? input.image.url
          : new URL(normalizePath(input.image.url), baseUrl).toString(),
      }
    : undefined;

  return {
    metadataBase: baseUrl,
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: localizedPath,
      languages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      siteName: input.siteName ?? 'Xipat',
      title: input.title,
      description: input.description,
      url: localizedPath,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: input.title,
      description: input.description,
      images: image ? [image.url] : undefined,
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export function createSeo(defaults: SeoDefaults) {
  return (overrides: Pick<SeoInput, 'title' | 'description'> & Partial<SeoInput>): Metadata =>
    buildSeoMetadata({
      ...defaults,
      ...overrides,
      image: overrides.image ?? defaults.image,
    });
}
