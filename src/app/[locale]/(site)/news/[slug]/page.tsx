import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { NewsArticleBody } from '@/components/news/news-article-body';
import { NewsArticleHero } from '@/components/news/news-article-hero';
import { getBlogExcerpt } from '@/components/news/news-detail.utils';
import { formatNewsDate, getNewsImageUrl } from '@/components/news/news-card.utils';
import { createSeo } from '@/lib/seo';
import { getXipatBlogDetail } from '@/lib/strapi/strapi';

const newsSeo = createSeo({
  siteName: 'Xipat',
  path: '/news',
});

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = await getXipatBlogDetail(locale, slug);

  if (!blog) {
    return newsSeo({
      locale,
      title: locale === 'en' ? 'Xipat Journal' : 'Nhật ký Xipat',
      description: locale === 'en' ? 'Xipat Journal' : 'Nhật ký Xipat',
    });
  }

  return newsSeo({
    locale,
    path: `/news/${slug}`,
    title: blog.title,
    description: getBlogExcerpt(blog),
    image: blog.thumbnail?.url
      ? {
          url: getNewsImageUrl(blog.thumbnail.url),
          alt: blog.thumbnail.alternativeText || blog.title,
        }
      : undefined,
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { locale, slug } = await params;
  const blog = await getXipatBlogDetail(locale, slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = formatNewsDate(blog.published_date ?? blog.publishedAt, locale);

  return (
    <main className="bg-[#F5F8FF] text-[#103B8B]">
      <NewsArticleHero title={blog.title} publishedDate={publishedDate} />

      <NewsArticleBody content={blog.content} />
    </main>
  );
}
