import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { NewsListSection } from '@/components/news/news-list-section';
import { mapBlogsToNewsCards } from '@/components/news/news-card.utils';
import { MotionReveal } from '@/components/ui/viewport-motion';
import { createSeo } from '@/lib/seo';
import { getXipatBlogs } from '@/lib/strapi/strapi';

const newsPageSeo = createSeo({
  siteName: 'Xipat',
  path: '/news',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'newsPage.seo' });

  return newsPageSeo({
    locale,
    title: t('title'),
    description: t('description'),
  });
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const locale = await getLocale();
  const { page: rawPage } = await searchParams;
  const currentPage = Number.parseInt(rawPage ?? '1', 10);
  const safeCurrentPage = Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;
  const pageSize = 9;
  const [t, blogsResponse] = await Promise.all([
    getTranslations({ locale, namespace: 'newsPage' }),
    getXipatBlogs(locale, {
      page: safeCurrentPage,
      pageSize,
    }),
  ]);

  const cards = mapBlogsToNewsCards({
    blogs: blogsResponse.blogs,
    locale,
  });

  return (
    <main className="bg-[#F5F8FF]">
      <MotionReveal as="section">
        <NewsListSection
          badge={t('badge')}
          title={t('title')}
          description={t('description')}
          noResultLabel={t('noResultLabel')}
          currentPage={blogsResponse.pagination.page}
          pageCount={blogsResponse.pagination.pageCount}
          cards={cards}
        />
      </MotionReveal>
    </main>
  );
}
