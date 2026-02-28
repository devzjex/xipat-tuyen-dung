import type { Metadata } from 'next';
import { ContactOverviewSection } from '@/components/contact/contact-overview-section';
import { ContactFormMapSection } from '@/components/contact/contact-form-map-section';
import { getTranslations } from 'next-intl/server';
import { createSeo } from '@/lib/seo';

const contactSeo = createSeo({
  siteName: 'Xipat',
  path: '/contact',
  image: {
    url: '/images/logo.png',
    alt: 'Contact Xipat',
  },
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contactPage.seo' });

  return contactSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/logo.png',
      alt: t('imageAlt'),
    },
  });
}

export default async function ContactPage() {
  const t = await getTranslations('contactPage');
  const items = t.raw('items') as Array<{ label: string; value: string }>;
  const formSection = t.raw('formSection') as {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submitLoadingLabel: string;
    mapTitle: string;
    validation: {
      nameRequired: string;
      nameMin: string;
      emailRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageRequired: string;
      messageMin: string;
    };
    feedback: {
      successMessage: string;
      errorMessage: string;
    };
  };

  return (
    <main className="bg-[#F3F5F8]">
      <ContactOverviewSection
        title={t('title')}
        description={t('description')}
        items={items}
      />
      <ContactFormMapSection copy={formSection} />
    </main>
  );
}
