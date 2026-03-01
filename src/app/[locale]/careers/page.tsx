import type { Metadata } from 'next';
import { CareersBenefitsSection } from '@/components/careers/careers-benefits-section';
import { CareersContactSection } from '@/components/careers/careers-contact-section';
import { getTranslations } from 'next-intl/server';
import { CareersHeroSection } from '@/components/careers/careers-hero-section';
import { CareersOpenPositionsSection, type CareerCard } from '@/components/careers/careers-open-positions-section';
import { CareersWhyChooseSection } from '@/components/careers/careers-why-choose-section';
import { createSeo } from '@/lib/seo';

const careersPageSeo = createSeo({
  siteName: 'Xipat',
  path: '/careers',
  image: {
    url: '/images/carreer/bg.png',
    alt: 'Xipat recruitment',
  },
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'careersPage.seo' });

  return careersPageSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/carreer/bg.png',
      alt: t('imageAlt'),
    },
  });
}

export default async function CareersPage() {
  const [careersT, recruitmentT] = await Promise.all([
    getTranslations('careersPage'),
    getTranslations('aboutPage.recruitment'),
  ]);
  const cards = recruitmentT.raw('cards') as CareerCard[];
  const whyChooseItems = careersT.raw('whyChoose.items') as Array<{ title: string; description: string }>;
  const benefitItems = careersT.raw('benefits.items') as Array<{
    prefix: string;
    highlight: string;
    suffix: string;
    body: string;
  }>;
  const contactSocials = careersT.raw('contact.socials') as Array<{
    platform: 'facebook' | 'linkedin';
    href: string;
    ariaLabel: string;
  }>;
  const contactValidation = careersT.raw('contact.validation') as {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    phoneInvalid: string;
    messageRequired: string;
    messageMin: string;
  };
  const contactFeedback = careersT.raw('contact.feedback') as {
    successTitle: string;
    successDescription: string;
    errorMessage: string;
  };

  return (
    <main className="bg-[#F3F5F8]">
      <CareersHeroSection
        title={careersT('hero.title')}
        description={careersT('hero.description')}
        imageAlt={careersT('hero.imageAlt')}
      />

      <CareersOpenPositionsSection
        titlePrefix={careersT('positions.titlePrefix')}
        titleAccent={careersT('positions.titleAccent')}
        searchPlaceholder={careersT('positions.searchPlaceholder')}
        searchButtonLabel={careersT('positions.searchButton')}
        noResultLabel={careersT('positions.noResult')}
        cards={cards}
      />

      <CareersWhyChooseSection title={careersT('whyChoose.title')} items={whyChooseItems} />

      <CareersContactSection
        badge={careersT('contact.badge')}
        title={careersT('contact.title')}
        nameLabel={careersT('contact.nameLabel')}
        emailLabel={careersT('contact.emailLabel')}
        phoneLabel={careersT('contact.phoneLabel')}
        messageLabel={careersT('contact.messageLabel')}
        submitLabel={careersT('contact.submitLabel')}
        submitSuccessTitle={contactFeedback.successTitle}
        submitSuccessDescription={contactFeedback.successDescription}
        submitErrorMessage={contactFeedback.errorMessage}
        socials={contactSocials}
        validation={contactValidation}
      />
      <CareersBenefitsSection
        title={careersT('benefits.title')}
        imageAlt={careersT('benefits.imageAlt')}
        items={benefitItems}
      />
    </main>
  );
}

