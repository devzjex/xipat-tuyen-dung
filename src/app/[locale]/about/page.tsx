import type { Metadata } from 'next';
import { AboutCultureBannerSection } from '@/components/about/about-culture-banner-section';
import { AboutHeroSection } from '@/components/about/about-hero-section';
import { AboutCoreValuesSection } from '@/components/about/about-core-values-section';
import { AboutMilestonesSection } from '@/components/about/about-milestones-section';
import { AboutPeopleShowcaseSection } from '@/components/about/about-people-showcase-section';
import { AboutProductJourneySection } from '@/components/about/about-product-journey-section';
import { RecruitmentSection, type RecruitmentCard } from '@/components/culture/recruitment-section';
import { getTranslations } from 'next-intl/server';
import { createSeo } from '@/lib/seo';

type PeopleShowcaseImageId = 'image1' | 'image2' | 'image3' | 'image4';

type PeopleShowcaseImage = {
  id: PeopleShowcaseImageId;
  src: string;
  width: number;
  height: number;
  widthClass: string;
  mobileClass: string;
  desktopClass: string;
};

const peopleShowcaseImages: PeopleShowcaseImage[] = [
  {
    id: 'image1',
    src: '/images/about/image-1.png',
    width: 174,
    height: 104,
    widthClass: 'w-[174px]',
    mobileClass: 'sm:justify-self-start',
    desktopClass: 'left-0 top-35',
  },
  {
    id: 'image2',
    src: '/images/about/image-2.png',
    width: 190,
    height: 114,
    widthClass: 'w-[190px]',
    mobileClass: 'sm:justify-self-end',
    desktopClass: 'left-[10%] -bottom-60',
  },
  {
    id: 'image3',
    src: '/images/about/image-3.png',
    width: 263,
    height: 158,
    widthClass: 'w-[263px]',
    mobileClass: 'sm:col-span-2 sm:justify-self-center',
    desktopClass: 'left-1/2 -bottom-80 -translate-x-1/2',
  },
  {
    id: 'image4',
    src: '/images/about/image-4.png',
    width: 255,
    height: 153,
    widthClass: 'w-[255px]',
    mobileClass: 'sm:col-span-2 sm:justify-self-end',
    desktopClass: '-right-20 top-40',
  },
];

const aboutSeo = createSeo({
  siteName: 'Xipat',
  path: '/about',
  image: {
    url: '/images/about/image-hero.png',
    alt: 'About Xipat',
  },
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
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
  const [heroT, peopleT, productT, coreValuesT, milestonesT, cultureBannerT, recruitmentT] = await Promise.all([
    getTranslations('aboutPage.hero'),
    getTranslations('aboutPage.peopleShowcase'),
    getTranslations('aboutPage.productJourney'),
    getTranslations('aboutPage.coreValues'),
    getTranslations('aboutPage.milestones'),
    getTranslations('aboutPage.cultureBanner'),
    getTranslations('aboutPage.recruitment'),
  ]);
  const getPeopleImageAlt = (id: PeopleShowcaseImageId) => peopleT(`images.${id}Alt`);
  const peopleShowcaseItems = peopleShowcaseImages.map((item) => ({
    ...item,
    alt: getPeopleImageAlt(item.id),
  }));
  const coreValueItems = coreValuesT.raw('items') as Array<{ title: string; body: string }>;
  const recruitmentCards = recruitmentT.raw('cards') as RecruitmentCard[];
  const milestoneItems = milestonesT.raw('items') as Array<{
    year: string;
    title: string;
    body: string;
    imageSrc: string;
    imageAlt: string;
  }>;

  return (
    <main className="overflow-x-clip bg-white">
      <AboutHeroSection
        copy={{
          title: heroT('title'),
          description: heroT('description'),
          imageAlt: heroT('imageAlt'),
        }}
      />

      <AboutPeopleShowcaseSection
        copy={{
          title: peopleT('title'),
          descriptionLead: peopleT('descriptionLead'),
          descriptionFollowUp: peopleT('descriptionFollowUp'),
          descriptionEmphasis: peopleT('descriptionEmphasis'),
          items: peopleShowcaseItems,
        }}
      />

      <AboutProductJourneySection
        copy={{
          titlePrefix: productT('titlePrefix'),
          titleAccent: productT('titleAccent'),
          description: productT('description'),
          missionTitle: productT('mission.title'),
          missionBody: productT('mission.body'),
          visionTitle: productT('vision.title'),
          visionBody: productT('vision.body'),
          imageAlt: productT('imageAlt'),
        }}
      />

      <AboutCoreValuesSection
        copy={{
          titlePrefix: coreValuesT('titlePrefix'),
          titleAccent: coreValuesT('titleAccent'),
          items: coreValueItems,
        }}
      />

      <section className="bg-[#1F49B8]">
        <AboutMilestonesSection
          copy={{
            heading: milestonesT('heading'),
            activeIndex: Number(milestonesT('activeIndex')),
            items: milestoneItems,
          }}
        />

        <AboutCultureBannerSection
          copy={{
            title: cultureBannerT('title'),
            description: cultureBannerT('description'),
            ctaLabel: cultureBannerT('ctaLabel'),
            ctaHref: cultureBannerT('ctaHref'),
            imageAlt: cultureBannerT('imageAlt'),
          }}
        />
      </section>

      <RecruitmentSection
        badge={recruitmentT('badge')}
        titlePrefix={recruitmentT('titlePrefix')}
        titleAccent={recruitmentT('titleAccent')}
        titleSuffix={recruitmentT('titleSuffix')}
        description={recruitmentT('description')}
        contactButton={recruitmentT('contactButton')}
        viewAllButton={recruitmentT('viewAllButton')}
        cards={recruitmentCards}
      />
    </main>
  );
}

