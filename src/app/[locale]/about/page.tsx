import { AboutHeroSection } from '@/components/about/about-hero-section';
import { getTranslations } from 'next-intl/server';

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
