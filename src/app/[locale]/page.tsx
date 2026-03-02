import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { CultureAccordion, type CultureAccordionItem } from '@/components/home/culture-accordion';
import { Button } from '@/components/ui/button';
import { createSeo } from '@/lib/seo';

const heroImage = '/images/home/banner-hero.png';
const people = '/images/home/people.png';
const introPattern = '/images/home/pattern.png';
const blog1 = '/images/home/blog-1.png';
const blog2 = '/images/home/blog-2.png';
const blog3 = '/images/home/blog-3.png';

const homeSeo = createSeo({
  siteName: 'Xipat',
  path: '/',
  image: {
    url: '/images/home/banner-hero.png',
    width: 1440,
    height: 983,
    alt: 'Xipat homepage',
  },
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.seo' });

  return homeSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/home/banner-hero.png',
      width: 1440,
      height: 983,
      alt: t('imageAlt'),
    },
  });
}

const brandLogos = [
  '/images/partner/partner-1.png',
  '/images/partner/partner-2.png',
  '/images/partner/partner-3.png',
  '/images/partner/partner-4.png',
  '/images/partner/partner-5.png',
  '/images/partner/partner-6.png',
  '/images/partner/partner-7.png',
  '/images/partner/partner-8.png',
  '/images/partner/partner-9.svg',
  '/images/partner/partner-10.avif',
];

export default async function LandingPage() {
  const locale = await getLocale();
  const contactHref = locale === 'en' ? '/en/contact' : '/contact';
  const t = await getTranslations('home');
  const cultures = t.raw('culture.values') as Array<{ title: string; body: string }>;
  const ecosystemCards = t.raw('ecosystem.cards') as Array<{ title: string; body: string }>;
  const solutionItems = t.raw('solutions.items') as Array<{ highlight: string; rest: string; body: string }>;
  const cultureAccordionItems = t.raw('culture.accordion') as CultureAccordionItem[];
  const newsCards = t.raw('news.cards') as Array<{ title: string; date: string }>;
  const heroDescription = t('hero.descriptionLines');
  const blogs = [
    { image: blog1, title: newsCards[0]?.title ?? '', date: newsCards[0]?.date ?? '' },
    { image: blog2, title: newsCards[1]?.title ?? '', date: newsCards[1]?.date ?? '' },
    { image: blog3, title: newsCards[2]?.title ?? '', date: newsCards[2]?.date ?? '' },
  ];

  return (
    <>
      <section className="relative overflow-hidden text-white">
        <div className="relative h-245.75 w-full">
          <Image
            src={heroImage}
            alt=""
            width={1440}
            height={983}
            priority
            sizes="100vw"
            className="h-full w-full"
            fetchPriority="high"
          />
          <div className="absolute top-30 left-5 w-[min(92vw,560px)] space-y-10 sm:left-8 sm:space-y-12 lg:top-49.25 lg:left-24 lg:w-[min(46vw,640px)] lg:space-y-16 xl:left-45 xl:w-[min(42vw,700px)]">
            <div className="space-y-4">
              <h1 className="max-w-[13ch] text-[38px] leading-[1.08] font-semibold tracking-[-0.01em] text-white sm:max-w-[14ch] sm:text-[44px] md:max-w-[15ch] md:text-[54px] lg:max-w-[16ch] lg:text-[64px]">
                {t.rich('hero.title', {
                  accent: (chunks) => <span className="inline-block text-[#528FFE]">{chunks}</span>,
                  keep: (chunks) => <span className="inline-block whitespace-nowrap">{chunks}</span>,
                })}
              </h1>
              <p className="max-w-[50ch] text-[16px] leading-normal font-normal tracking-[-0.02em] text-white sm:text-[18px]">
                {heroDescription}
              </p>
            </div>

            <Button
              asChild
              className="group h-auto cursor-pointer rounded-full border-[6px] border-white/5 bg-white py-1.5 pr-1.5 pl-7 text-[15px] font-semibold tracking-[-0.03em] text-[#002A6A] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_32px_rgba(0,42,106,0.22)] active:translate-y-0 sm:pl-8 sm:text-[16px]"
            >
              <Link href={contactHref}>
                {t('hero.cta')}
                <span className="ml-4 inline-flex rounded-full bg-[#DB1721] p-3.5 text-white transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-[#C8141D]">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Button>
          </div>

          <div className="absolute right-8 bottom-28 left-8 hidden overflow-hidden lg:right-24 lg:left-24 lg:flex xl:right-45 xl:left-45">
            <div className="hero-logo-marquee-track flex min-w-max items-center gap-14">
              {[...brandLogos, ...brandLogos].map((src, idx) => (
                <Image
                  key={`${src}-${idx}`}
                  src={src}
                  alt={`partner-${(idx % brandLogos.length) + 1}`}
                  width={170}
                  height={75}
                  className="h-auto max-h-18.75 w-auto object-contain"
                  fetchPriority="high"
                  priority
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-white px-6 py-20 text-center md:px-10 lg:px-20 lg:py-36 xl:px-40 xl:py-[200px]">
        <div className="pointer-events-none absolute inset-0 top-20 bottom-20" aria-hidden="true">
          <Image src={introPattern} alt="" fill sizes="100vw" className="object-contain object-center opacity-90" />
        </div>

        <div className="relative mx-auto flex w-full max-w-280 flex-col items-center gap-8">
          <h2 className="max-w-280 whitespace-pre-line text-4xl leading-[1.3] font-semibold text-[#002A6A] md:text-5xl xl:text-[64px]">
            {t('intro.title')}
          </h2>
          <p className="max-w-181.75 text-lg leading-normal text-[#002A6A] md:text-xl xl:text-2xl">
            {t.rich('intro.description', {
              brand: (chunks) => <span className="font-medium text-[#DB1721]">{chunks}</span>,
            })}
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#012458] text-white">
        <div className="pointer-events-none absolute -top-28 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(83,129,255,0.42)_0%,_rgba(83,129,255,0.08)_45%,_rgba(1,36,88,0)_75%)] blur-2xl" />
        {/* <div className="pointer-events-none absolute -right-28 -bottom-36 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,_rgba(83,129,255,0.35)_0%,_rgba(83,129,255,0.06)_50%,_rgba(1,36,88,0)_78%)] blur-3xl" /> */}
        <div className="relative mx-auto grid max-w-[1640px] items-center gap-12 px-6 py-20 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16 lg:px-20 xl:px-28 xl:py-28">
          <div className="order-2 lg:order-1">
            <div className="relative mx-auto w-full max-w-[660px] overflow-hidden p-0">
              <Image src={people} alt="" width={680} height={740} className="h-full w-full object-cover object-top" />
            </div>
          </div>

          <div className="order-1 min-w-0 space-y-6 lg:order-2 lg:max-w-[560px]">
            <h3 className="text-4xl leading-[1.2] font-semibold tracking-[-0.03em] text-pretty md:text-5xl">
              {t.rich('about.title', {
                accent: (chunks) => <span className="text-white">{chunks}</span>,
              })}
            </h3>
            <p className="text-lg leading-relaxed tracking-[-0.03em] text-white/90">
              {t.rich('about.description1', {
                brand: (chunks) => <span className="font-medium">{chunks}</span>,
              })}
            </p>
            <p className="text-lg leading-relaxed tracking-[-0.03em] text-white/90">{t('about.description2')}</p>

            <div className="grid grid-cols-3 gap-6 pt-2 md:gap-8">
              <div>
                <p className="text-3xl leading-[1.2] font-semibold tracking-[-0.03em]">{t('about.stats.0.value')}</p>
                <p className="mt-1 text-base text-white/80 md:text-lg">{t('about.stats.0.label')}</p>
              </div>
              <div>
                <p className="text-3xl leading-[1.2] font-semibold tracking-[-0.03em]">{t('about.stats.1.value')}</p>
                <p className="mt-1 text-base text-white/80 md:text-lg">{t('about.stats.1.label')}</p>
              </div>
              <div>
                <p className="text-3xl leading-[1.2] font-semibold tracking-[-0.03em]">{t('about.stats.2.value')}</p>
                <p className="mt-1 text-base text-white/80 md:text-lg">{t('about.stats.2.label')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#012458]">
        <div className="mx-auto flex w-full max-w-360 flex-col justify-center md:flex-row xl:flex-nowrap">
          <article className="relative h-[500px] w-full overflow-hidden sm:h-[550px] md:h-[600px] md:w-[360px]">
            <Image
              src="/images/home/image-ome-theme.png"
              alt="Xipat team collaboration"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 360px, 100vw"
            />
          </article>

          <article className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#2F61E5] via-[#1846B8] to-[#032F83] px-6 py-10 text-white sm:h-[550px] sm:px-10 md:h-[600px] md:w-[360px]">
            <Image
              src="/images/home/bg-omegatheme.png"
              alt=""
              width={334}
              height={317}
              className="pointer-events-none absolute top-9 left-[54%] hidden -translate-x-1/2 md:block"
            />

            <div className="relative flex h-full max-w-70 flex-col items-center justify-end text-center sm:max-w-[320px]">
              <h3 className="absolute top-25 left-7.5 mb-4 text-5xl leading-[1.02] font-semibold tracking-tight whitespace-pre-line sm:mb-5">
                {ecosystemCards[0].title}
              </h3>
              <p className="text-base leading-relaxed text-white/90 sm:text-lg">{ecosystemCards[0].body}</p>
            </div>
          </article>

          <article className="relative h-[500px] w-full overflow-hidden sm:h-[550px] md:h-[600px] md:w-[360px]">
            <Image
              src="/images/home/image-gamezoka.png"
              alt="Xipat team at work"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 360px, 100vw"
            />
          </article>

          <article className="relative flex h-[500px] w-full flex-col justify-center overflow-hidden bg-[#052A73] px-6 py-10 text-white sm:h-[550px] sm:px-10 md:h-[600px] md:w-[360px] md:px-12">
            <Image
              src="/images/home/bg-gamezoka.png"
              alt=""
              fill
              className="pointer-events-none hidden object-cover md:block"
              sizes="(min-width: 768px) 360px, 100vw"
            />
            <div className="relative z-10 flex flex-col justify-center">
              <h3 className="mb-5 text-3xl font-semibold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
                {ecosystemCards[1].title}
              </h3>
              <p className="max-w-[320px] text-base leading-relaxed text-white/90 sm:max-w-[380px] sm:text-lg">
                {ecosystemCards[1].body}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#012458] text-white">
        <Image
          src="/images/home/bg-solution.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041937]/90 via-[#012458]/72 to-[#012458]/50" />

        <div className="relative mx-auto grid max-w-360 gap-16 px-6 py-20 lg:grid-cols-[1fr_540px] lg:items-center lg:px-16 xl:px-24 xl:py-28">
          <div>
            <h2 className="max-w-[640px] text-4xl leading-[1.2] font-semibold tracking-[-0.03em] md:text-[48px]">
              {t('solutions.title')}
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-7">
              {solutionItems.map((item, index) => (
                <article
                  key={`${item.highlight}-${item.rest}`}
                  className={`${index < 2 ? 'border-white/14 pb-1 md:border-r md:pr-6' : 'md:pl-1'} md:pt-0 ${index === 1 ? 'md:pt-20' : ''} ${index === 2 ? 'md:pt-30' : ''}`}
                >
                  <h3 className="text-xl leading-[1.25] font-semibold tracking-[-0.03em]">
                    <span className="text-[#4B86FF]">{item.highlight}</span> {item.rest}
                  </h3>
                  <p className="mt-5 text-base leading-[1.7] text-white/78">{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[506px]">
            <Image
              src="/images/home/group-user.png"
              alt="Xipat team"
              width={506}
              height={593}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section
        id="culture"
        className="relative mx-auto max-w-360 overflow-hidden px-6 py-20 lg:px-20 xl:px-40 xl:py-[130px]"
      >
        <h2 className="text-center text-4xl leading-[1.3] font-semibold text-[#002A6A] md:text-6xl">
          {t.rich('culture.title', {
            accent: (chunks) => <span className="text-[#DB1721]">{chunks}</span>,
          })}
        </h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-10">
          {cultures.map((item) => (
            <div key={item.title}>
              <div className="mb-4 h-8 w-8 rounded-full bg-[#D9D9D9]" />
              <p className="text-2xl font-semibold">{item.title}</p>
              <p className="mt-4 text-base leading-relaxed text-[#002A6A]/80">{item.body}</p>
            </div>
          ))}
        </div>
        <CultureAccordion items={cultureAccordionItems} />
      </section>

      <section id="news" className="bg-[#F8F8F8]">
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-20 xl:px-40 xl:py-28">
          <div className="mx-auto max-w-[662px] text-center">
            <span className="inline-flex rounded-full border border-[#777E90] px-6 py-3 text-sm font-semibold text-[#777E90]">
              {t('news.badge')}
            </span>
            <h2 className="mt-4 text-4xl leading-[1.3] font-semibold md:text-6xl">
              {t.rich('news.title', {
                accent: (chunks) => <span className="text-[#DB1721]">{chunks}</span>,
              })}
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {blogs.map((blog, idx) => (
              <article key={`${blog.title}-${idx}`} className="space-y-3">
                <Image
                  src={blog.image}
                  alt=""
                  width={360}
                  height={280}
                  className="h-70 w-full rounded-[9px] object-cover"
                />
                <div className="flex items-center text-sm font-semibold text-[#686868]">
                  <p>{blog.title}</p>
                  <p className="ml-auto">{blog.date}</p>
                </div>
                <h3 className="text-lg font-bold text-[#686868]">{t('news.cardFallback')}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
