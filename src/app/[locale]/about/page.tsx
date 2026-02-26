import type { Metadata } from 'next';
import { AboutHeroSection } from '@/components/about/about-hero-section';
import { getTranslations } from 'next-intl/server';
import { createSeo } from '@/lib/seo';

const aboutSeo = createSeo({
  siteName: 'Xipat',
  path: '/about',
  image: {
    url: '/images/about/image-hero.png',
    alt: 'About Xipat',
  },
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage.seo' });

  return aboutSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/about/image-hero.png',
      alt: t('imageAlt'),
    },
  });
}

export default async function AboutPage() {
  const t = await getTranslations('aboutPage.hero');
  return (
    <main className="overflow-x-clip bg-white">
      <AboutHeroSection
        copy={{
          title: t('title'),
          description: t('description'),
          imageAlt: t('imageAlt'),
        }}
      />
    </main>
  );
}
