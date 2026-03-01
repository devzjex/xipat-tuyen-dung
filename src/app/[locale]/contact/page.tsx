import type { Metadata } from 'next';
import { ContactOverviewSection } from '@/components/contact/contact-overview-section';
import { CareersContactSection } from '@/components/careers/careers-contact-section';
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
  const [t, careersT] = await Promise.all([
    getTranslations('contactPage'),
    getTranslations('careersPage'),
  ]);

  const items = t.raw('items') as Array<{ label: string; value: string }>;
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
      <ContactOverviewSection
        title={t('title')}
        description={t('description')}
        items={items}
      />
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
    </main>
  );
}
