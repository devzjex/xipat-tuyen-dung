import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { AppsEcosystemSection, type EcosystemApp } from '@/components/ecosystem/apps-ecosystem-section';
import { PartnerGrowthSection, type PartnerLogo } from '@/components/ecosystem/partner-growth-section';
import { SolutionShowcase, type SolutionItem } from '@/components/ecosystem/solution-showcase';
import { Button } from '@/components/ui/button';
import { createSeo } from '@/lib/seo';

const heroBg = '/images/ecosystem/bg-image.png';

const ecosystemSeo = createSeo({
  siteName: 'Xipat',
  path: '/ecosystem',
  image: {
    url: '/images/ecosystem/bg-image.png',
    width: 1369,
    height: 800,
    alt: 'Xipat ecosystem',
  },
});

type OperationStat = {
  value: string;
  label: string;
  index: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ecosystemPage.seo' });

  return ecosystemSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/ecosystem/bg-image.png',
      width: 1369,
      height: 800,
      alt: t('imageAlt'),
    },
  });
}

export default async function EcosystemPage() {
  const t = await getTranslations('ecosystemPage');

  const operationStats = t.raw('operation.stats') as OperationStat[];
  const solutionHeadingLines = t.raw('solution.headingLines') as string[];
  const solutionItems = t.raw('solution.items') as SolutionItem[];
  const apps = t.raw('apps.items') as EcosystemApp[];
  const partnerLogos = t.raw('partner.logos') as PartnerLogo[];

  return (
    <>
      <section className="relative h-200 overflow-hidden bg-[#041E56]">
        <Image
          src={heroBg}
          alt=""
          width={1369}
          height={800}
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="relative mx-auto flex w-full items-center px-6 pt-50 pb-12 sm:px-10 sm:pt-44 lg:px-20 xl:px-40">
          <div className="w-full max-w-120 sm:ml-6 lg:ml-12 xl:ml-20">
            <h1 className="text-[38px] leading-tight font-semibold tracking-[-0.03em] text-white sm:text-[44px] md:text-[54px] lg:text-[64px]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-160 text-base leading-[1.6] text-white/90 sm:text-lg">{t('hero.description')}</p>

            <Button
              asChild
              className="group mt-10 h-auto rounded-full bg-white py-1.5 pr-1.5 pl-7 text-base font-semibold text-[#113C8D] shadow-[0_16px_36px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_22px_44px_rgba(0,0,0,0.28)] active:translate-y-0"
            >
              <Link href="https://www.omegatheme.com/" target="_blank" rel="noreferrer">
                {t('hero.cta')}
                <span className="ml-4 inline-flex rounded-full bg-[#1A4BB8] p-3 text-white transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:bg-[#153E96]">
                  <ArrowUpRight className="h-6 w-6" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <Image
          src="/images/ecosystem/bg-1.png"
          alt=""
          width={1369}
          height={927}
          sizes="100vw"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-14 sm:gap-10 sm:px-8 sm:py-16 md:gap-12 md:px-10 md:py-20 lg:flex-row lg:gap-12 lg:px-12 lg:py-24 xl:gap-20 xl:px-10 xl:py-28">
          <div className="flex w-full shrink-0 justify-center lg:w-[46%] xl:w-[48%]">
            <Image
              src="/images/ecosystem/image-1.png"
              alt={t('operation.imageAlt')}
              width={645}
              height={607}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 46vw"
              className="h-auto w-full max-w-[320px] object-contain sm:max-w-105 md:max-w-125 lg:max-w-none"
            />
          </div>

          <div className="flex w-full flex-col items-center text-center lg:w-[54%] lg:items-start lg:text-left xl:w-[52%]">
            <h2 className="text-4xl leading-[1.3] font-semibold tracking-[-0.02em] text-[#113C8D] md:text-5xl">
              {t('operation.titlePrefix')} <span className="text-[#E53935]">{t('operation.titleAccent')}</span>{' '}
              {t('operation.titleSuffix')}
            </h2>

            <p className="mt-4 max-w-130 text-[15px] leading-[1.75] text-[#113C8D] sm:mt-5 sm:text-base md:mt-6 md:text-[17px] lg:text-lg">
              <span className="font-semibold text-[#E53935]">{t('operation.brand')}</span>{' '}
              {t('operation.descriptionBefore')}{' '}
              <span className="font-semibold text-[#113C8D]">{t('operation.strongTeam')}</span>,{' '}
              {t('operation.descriptionMiddle')}{' '}
              <span className="font-semibold text-[#113C8D]">{t('operation.strongApps')}</span>{' '}
              {t('operation.descriptionAfter')}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-6 sm:mt-9 sm:gap-8 md:mt-10 md:gap-10 lg:justify-start lg:gap-12">
              {operationStats.map((stat) => (
                <div key={`${stat.value}-${stat.index}`} className="flex flex-col items-center lg:items-start">
                  <span className="text-[28px] leading-tight font-bold text-[#113C8D] sm:text-[32px] md:text-4xl lg:text-[38px] xl:text-[42px]">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 text-xs text-[#113C8D] sm:mt-2 sm:text-sm">{stat.label}</span>
                  <span className="text-xs text-[#113C8D] sm:text-sm">{stat.index}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SolutionShowcase headingLines={solutionHeadingLines} items={solutionItems} />
      <AppsEcosystemSection
        badge={t('apps.badge')}
        titleLine1={t('apps.titleLine1')}
        titleAccent={t('apps.titleAccent')}
        apps={apps}
      />
      <PartnerGrowthSection
        title={t('partner.title')}
        descriptionLine1={t('partner.descriptionLine1')}
        descriptionLine2={t('partner.descriptionLine2')}
        logos={partnerLogos}
        discoverButton={t('partner.discoverButton')}
        ctaLine1={t('partner.ctaLine1')}
        ctaLine2Before={t('partner.ctaLine2Before')}
        ctaLine2Accent={t('partner.ctaLine2Accent')}
        ctaLine2After={t('partner.ctaLine2After')}
        ctaDescriptionLine1={t('partner.ctaDescriptionLine1')}
        ctaDescriptionLine2={t('partner.ctaDescriptionLine2')}
        ctaButton={t('partner.ctaButton')}
      />
    </>
  );
}
