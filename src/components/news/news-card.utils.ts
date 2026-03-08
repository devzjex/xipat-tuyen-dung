import { getStrapiMediaUrl, type StrapiBlog } from '@/lib/strapi/strapi';

export type NewsCardItem = {
  image: string;
  title: string;
  date: string;
  href: string;
};

export function formatNewsDate(dateString: string | null, locale: string) {
  if (!dateString) {
    return '';
  }

  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateString));
}

export function getNewsHref(locale: string, slug?: string) {
  const prefix = locale === 'en' ? '/en/news' : '/news';
  return slug ? `${prefix}/${slug}` : prefix;
}

export function getNewsImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return '';
  }

  return getStrapiMediaUrl(imageUrl);
}

export function mapBlogsToNewsCards({
  blogs,
  locale,
}: {
  blogs: StrapiBlog[];
  locale: string;
}): NewsCardItem[] {
  return blogs.map((blog) => ({
    image: getNewsImageUrl(
      blog.thumbnail?.formats?.small?.url ??
        blog.thumbnail?.formats?.medium?.url ??
        blog.thumbnail?.url,
    ),
    title: blog.title,
    date: formatNewsDate(blog.published_date ?? blog.publishedAt, locale),
    href: getNewsHref(locale, blog.slug),
  }));
}
