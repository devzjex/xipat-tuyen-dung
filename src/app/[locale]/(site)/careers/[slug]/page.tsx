import type { Metadata } from 'next';
import { Clock3, MapPin, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CareerApplicationForm } from '@/components/careers/career-application-form';
import { createSeo } from '@/lib/seo';
import { getXipatJobDetail } from '@/lib/strapi/strapi';
import Link from 'next/link';

type CareerApplicationFormCopy = {
  title: string;
  fullNameLabel: string;
  fullNamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  cvLabel: string;
  cvButtonLabel: string;
  cvNoFileText: string;
  portfolioLabel: string;
  portfolioPlaceholder: string;
  coverLetterLabel: string;
  coverLetterPlaceholder: string;
  submitLabel: string;
  submitErrorMessage: string;
  submitSuccessTitle: string;
  submitSuccessDescription: string;
  validation: {
    fullNameRequired: string;
    fullNameMin: string;
    emailRequired: string;
    emailInvalid: string;
    phoneRequired: string;
    phoneInvalid: string;
    cvRequired: string;
    cvInvalidType: string;
    cvMaxSize: string;
    portfolioInvalid: string;
    coverLetterRequired: string;
    coverLetterMin: string;
  };
};

type CareerDetailCopy = {
  careerLabel: string;
  applyNowLabel: string;
  contactTitle: string;
  contactHint: string;
  phone: string;
  email: string;
};

const careersSeo = createSeo({
  siteName: 'Xipat',
  path: '/careers',
  image: {
    url: '/images/about/image-6.png',
    alt: 'Xipat careers',
  },
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const [t, job] = await Promise.all([
    getTranslations({ locale, namespace: 'aboutPage.careerDetails' }),
    getXipatJobDetail(locale, slug),
  ]);

  if (!job) {
    return careersSeo({
      locale,
      title: t('fallbackSeoTitle'),
      description: t('fallbackSeoDescription'),
    });
  }

  return careersSeo({
    locale,
    title: `${job.title} | ${t('seoSuffix')}`,
    description: `${job.title} - ${job.salary}`,
    image: {
      url: '/images/about/image-6.png',
      alt: job.title,
    },
  });
}

export default async function CareerDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const [t, career] = await Promise.all([
    getTranslations({ locale, namespace: 'aboutPage.careerDetails' }),
    getXipatJobDetail(locale, slug),
  ]);
  const formCopy = t.raw('applicationForm') as CareerApplicationFormCopy;

  if (!career) {
    notFound();
  }

  const detailCopy: CareerDetailCopy = {
    careerLabel: t('careerLabel'),
    applyNowLabel: t('applyNowLabel'),
    contactTitle: t('contactTitle'),
    contactHint: t('contactHint'),
    phone: t('contactPhone'),
    email: t('contactEmail'),
  };

  return (
    <main className="bg-[#F5F7FC] text-[#113C8D]">
      <section className="mx-auto max-w-[1500px] px-6 pt-28 pb-16 sm:px-8 lg:px-12 lg:pt-34 lg:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xl leading-tight font-medium">{detailCopy.careerLabel}</p>
            <h1 className="mt-2 text-4xl leading-[1.12] font-semibold tracking-[-0.02em] lg:text-5xl">{career.title}</h1>
            <p className="mt-4 text-xl leading-tight">{career.salary}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-[#DCE8FF] px-4 py-2 text-sm font-semibold">
                <Clock3 className="h-4 w-4" />
                {career.time}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-[#DCE8FF] px-4 py-2 text-sm font-semibold">
                <MapPin className="h-4 w-4" />
                {career.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg bg-[#DCE8FF] px-4 py-2 text-sm font-semibold">
                <Star className="h-4 w-4" />
                {career.experience}
              </span>
            </div>
          </div>

          <Link
            href="#career-application-form"
            className="inline-flex h-14 min-w-62 items-center justify-center rounded-full bg-[#113C8D] px-8 text-xl font-semibold text-white transition-colors hover:bg-[#0E3278]"
          >
            {detailCopy.applyNowLabel}
          </Link>
        </div>

        <div className="mt-12 border-t border-[#113C8D]/30 pt-10 sm:pt-12">
          <div className="mx-auto max-w-[1500px] space-y-10 text-base leading-[1.65]">
            <section
              className="[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-[#113C8D] [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#113C8D] [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2"
              dangerouslySetInnerHTML={{ __html: career.description }}
            />

            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">
                {detailCopy.contactTitle}{' '}
                <span className="text-base font-normal text-[#113C8D]/85 italic">{detailCopy.contactHint}</span>
              </h2>
              <p className="mt-4 text-xl">{detailCopy.phone}</p>
              <p className="mt-2 text-xl font-semibold">{detailCopy.email}</p>
            </section>
          </div>
        </div>

        <CareerApplicationForm copy={formCopy} careerTitle={career.title} />
      </section>
    </main>
  );
}
