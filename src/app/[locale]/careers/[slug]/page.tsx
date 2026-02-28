import type { Metadata } from 'next';
import { Clock3, MapPin, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { CareerApplicationForm } from '@/components/careers/career-application-form';
import { createSeo } from '@/lib/seo';
import Link from 'next/link';

type CareerDetail = {
  careerLabel: string;
  title: string;
  salary: string;
  employment: string;
  location: string;
  experience: string;
  applyNowLabel: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  responsibilitiesTitle: string;
  responsibilities: string[];
  requirementsTitle: string;
  requirements: string[];
  benefitsTitle: string;
  benefits: string[];
  contactTitle: string;
  contactHint: string;
  phone: string;
  email: string;
};

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
  const t = await getTranslations({ locale, namespace: 'aboutPage.careerDetails' });
  const careers = t.raw('careers') as Record<string, CareerDetail>;
  const career = careers[slug];
  if (!career) {
    return careersSeo({
      locale,
      title: t('fallbackSeoTitle'),
      description: t('fallbackSeoDescription'),
    });
  }

  return careersSeo({
    locale,
    title: `${career.title} | ${t('seoSuffix')}`,
    description: `${career.title} - ${career.salary}`,
    image: {
      url: '/images/about/image-6.png',
      alt: career.title,
    },
  });
}

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('aboutPage.careerDetails');
  const careers = t.raw('careers') as Record<string, CareerDetail>;
  const formCopy = t.raw('applicationForm') as CareerApplicationFormCopy;
  const career = careers[slug];

  if (!career) {
    notFound();
  }

  return (
    <main className="bg-[#F5F7FC] text-[#113C8D]">
      <section className="mx-auto max-w-[1500px] px-6 pt-28 pb-16 sm:px-8 lg:px-12 lg:pt-34 lg:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xl leading-tight font-medium">{career.careerLabel}</p>
            <h1 className="mt-2 text-4xl leading-[1.12] font-semibold tracking-[-0.02em] lg:text-5xl">{career.title}</h1>
            <p className="mt-4 text-xl leading-tight">{career.salary}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-lg bg-[#DCE8FF] px-4 py-2 text-sm font-semibold">
                <Clock3 className="h-4 w-4" />
                {career.employment}
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
            {career.applyNowLabel}
          </Link>
        </div>

        <div className="mt-12 border-t border-[#113C8D]/30 pt-10 sm:pt-12">
          <div className="mx-auto max-w-[1500px] space-y-10 text-base leading-[1.65]">
            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">{career.overviewTitle}</h2>
              <div className="mt-4 space-y-4">
                {career.overviewParagraphs.map((paragraph, index) => (
                  <p key={`overview-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">{career.responsibilitiesTitle}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {career.responsibilities.map((item, index) => (
                  <li key={`res-${index}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">{career.requirementsTitle}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {career.requirements.map((item, index) => (
                  <li key={`req-${index}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">{career.benefitsTitle}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {career.benefits.map((item, index) => (
                  <li key={`benefit-${index}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl leading-tight font-semibold sm:text-2xl">
                {career.contactTitle}{' '}
                <span className="text-base font-normal text-[#113C8D]/85 italic">{career.contactHint}</span>
              </h2>
              <p className="mt-4 text-xl">{career.phone}</p>
              <p className="mt-2 text-xl font-semibold">{career.email}</p>
            </section>
          </div>
        </div>

        <CareerApplicationForm copy={formCopy} careerTitle={career.title} careerEmail={career.email} />
      </section>
    </main>
  );
}
