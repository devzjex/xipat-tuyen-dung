import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { CultureGuidedShowcase, type CultureGuidedItem } from '@/components/culture/culture-guided-showcase';
import { RecruitmentSection, type RecruitmentCard } from '@/components/culture/recruitment-section';
import { ImageLibrarySection, type LibraryImageItem } from '@/components/culture/image-library-section';
import { CultureAccordion, type CultureAccordionItem } from '@/components/home/culture-accordion';
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
    src: '/images/culture/image-1.png',
    width: 174,
    height: 104,
    widthClass: 'w-[174px]',
    mobileClass: 'sm:justify-self-start',
    desktopClass: 'left-0 top-35',
  },
  {
    id: 'image2',
    src: '/images/culture/image-2.png',
    width: 190,
    height: 114,
    widthClass: 'w-[190px]',
    mobileClass: 'sm:justify-self-end',
    desktopClass: 'left-[10%] -bottom-20',
  },
  {
    id: 'image3',
    src: '/images/culture/image-3.png',
    width: 263,
    height: 158,
    widthClass: 'w-[263px]',
    mobileClass: 'sm:col-span-2 sm:justify-self-center',
    desktopClass: 'left-1/2 -bottom-40 -translate-x-1/2',
  },
  {
    id: 'image4',
    src: '/images/culture/image-4.png',
    width: 255,
    height: 153,
    widthClass: 'w-[255px]',
    mobileClass: 'sm:col-span-2 sm:justify-self-end',
    desktopClass: '-right-20 top-40',
  },
];

const blog1 = '/images/culture/blog-1.png';
const blog2 = '/images/culture/blog-2.png';
const blog3 = '/images/culture/blog-3.png';

const cultureSeo = createSeo({
  siteName: 'Xipat',
  path: '/culture',
  image: {
    url: '/images/culture/bg.png',
    width: 883,
    height: 454,
    alt: 'Culture at Xipat',
  },
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'culturePage.seo' });

  return cultureSeo({
    locale,
    title: t('title'),
    description: t('description'),
    image: {
      url: '/images/culture/bg.png',
      width: 883,
      height: 454,
      alt: t('imageAlt'),
    },
  });
}

export default async function CulturePage() {
  const t = await getTranslations('culturePage');
  const getPeopleImageAlt = (id: PeopleShowcaseImageId) => t(`peopleShowcase.images.${id}Alt`);
  const cultureGuidedHeading = t('cultureGuidedShowcase.heading');
  const cultureGuidedItems = t.raw('cultureGuidedShowcase.items') as CultureGuidedItem[];
  const recruitmentCards = t.raw('recruitment.cards') as RecruitmentCard[];
  const newsCards = t.raw('news.cards') as Array<{ meta: string; headline: string; date: string }>;
  const blogs = [
    {
      image: blog1,
      meta: newsCards[0]?.meta ?? '',
      headline: newsCards[0]?.headline ?? '',
      date: newsCards[0]?.date ?? '',
    },
    {
      image: blog2,
      meta: newsCards[1]?.meta ?? '',
      headline: newsCards[1]?.headline ?? '',
      date: newsCards[1]?.date ?? '',
    },
    {
      image: blog3,
      meta: newsCards[2]?.meta ?? '',
      headline: newsCards[2]?.headline ?? '',
      date: newsCards[2]?.date ?? '',
    },
  ];
  const cultureHighlights = t.raw('programs.highlights') as Array<{ title: string; body: string }>;
  const cultureAccordionItems = t.raw('programs.accordion') as CultureAccordionItem[];
  const getLibraryImageAlt = (id: number) => t(`library.images.image${id}Alt`);
  const libraryImages: LibraryImageItem[] = [
    { src: '/images/culture/library-1.png', alt: getLibraryImageAlt(1) },
    { src: '/images/culture/library-2.png', alt: getLibraryImageAlt(2) },
    { src: '/images/culture/library-3.png', alt: getLibraryImageAlt(3) },
    { src: '/images/culture/library-4.png', alt: getLibraryImageAlt(4) },
    { src: '/images/culture/library-5.png', alt: getLibraryImageAlt(5) },
    { src: '/images/culture/library-6.png', alt: getLibraryImageAlt(6) },
    { src: '/images/culture/library-7.png', alt: getLibraryImageAlt(7) },
    { src: '/images/culture/library-8.png', alt: getLibraryImageAlt(8) },
  ];

  return (
    <div className="overflow-x-clip">
      <section className="relative min-h-140 overflow-hidden bg-[#041E56] text-white sm:min-h-155">
        <Image
          src="/images/culture/bg.png"
          alt=""
          width={883}
          height={454}
          sizes="(max-width: 640px) 94vw, (max-width: 1024px) 76vw, 48vw"
          className="pointer-events-none absolute top-0 left-0 h-auto w-[94vw] max-w-135 object-contain opacity-90 sm:w-[82vw] sm:max-w-160 lg:w-[72vw] lg:max-w-190"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-linear-to-br from-[#1F4FC6]/25 via-[#0A2F84]/35 to-[#03183F]/70" />

        <div className="relative mr-auto ml-0 grid min-h-140 max-w-7xl grid-cols-1 items-end gap-8 px-4 pt-22 pb-0 sm:min-h-155 sm:px-8 sm:pt-24 md:px-10 md:pt-28 lg:ml-32 lg:min-h-170 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-16 lg:pt-30 lg:pb-0 xl:ml-48">
          <div className="order-2 -mb-1 flex items-end justify-start self-end md:justify-center lg:order-1 lg:-mb-2 lg:-ml-14 lg:justify-start xl:-ml-22">
            <Image
              src="/images/culture/image-hero.png"
              alt={t('heroShowcase.imageAlt')}
              width={784}
              height={551}
              sizes="(max-width: 1024px) 90vw, 50vw"
              className="block h-auto w-full max-w-115 object-contain sm:max-w-140 md:max-w-160 lg:max-w-175"
              priority
              fetchPriority="high"
            />
          </div>

          <div className="order-1 pb-2 text-left sm:pb-4 lg:order-2 lg:mb-14 lg:pb-36">
            <h1 className="bg-[linear-gradient(180deg,#FFFFFF_20%,#DCE9FF_58%,#86A5DE_100%)] bg-clip-text text-4xl leading-[1.3] font-bold tracking-[-0.02em] text-balance text-transparent md:text-5xl xl:text-[64px]">
              {t('heroShowcase.titleLine1')}
            </h1>
            <p className="mt-5 max-w-130 text-base leading-[1.45] text-white/92 sm:mt-6 sm:max-w-170 sm:text-2xl sm:text-[24px] lg:mt-8 lg:max-w-140 lg:leading-[1.36]">
              {t('heroShowcase.descriptionLine1')}
              <br />
              {t('heroShowcase.descriptionLine2')}
            </p>
          </div>
        </div>
      </section>

      <section className="relative h-214.75 overflow-hidden bg-[#F5F7FC]">
        <Image
          src="/images/culture/bg-1.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto mt-3 max-w-4xl text-center sm:mt-6 lg:absolute lg:top-2 lg:left-1/2 lg:z-10 lg:mt-0 lg:w-full lg:max-w-4xl lg:-translate-x-1/2">
            <h2 className="text-4xl leading-[1.3] font-semibold tracking-[-0.02em] text-[#0D3D94] md:text-5xl xl:text-[64px]">
              {t('peopleShowcase.titleLine1')}
              <br />
              <span className="text-[#4D83E9]">{t('peopleShowcase.titleLine2')}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-[1.55] text-[#123C86] sm:text-xl lg:text-2xl">
              {t('peopleShowcase.descriptionLine1')}
              <br className="hidden sm:block" />
              {t('peopleShowcase.descriptionLine2')}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
            {peopleShowcaseImages.map((item) => (
              <article
                key={item.id}
                className={`justify-self-center overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(29,64,140,0.12)] ${item.mobileClass}`}
              >
                <Image
                  src={item.src}
                  alt={getPeopleImageAlt(item.id)}
                  width={item.width}
                  height={item.height}
                  sizes={`${item.width}px`}
                  className={`block h-auto ${item.widthClass} object-contain`}
                />
              </article>
            ))}
          </div>

          <div className="relative mt-10 hidden h-86.25 lg:mt-36 lg:block xl:h-90">
            {peopleShowcaseImages.map((item) => (
              <article
                key={item.id}
                className={`absolute overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(29,64,140,0.12)] ${item.desktopClass}`}
              >
                <Image
                  src={item.src}
                  alt={getPeopleImageAlt(item.id)}
                  width={item.width}
                  height={item.height}
                  sizes={`${item.width}px`}
                  className={`block h-auto ${item.widthClass} object-contain`}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <CultureGuidedShowcase heading={cultureGuidedHeading} items={cultureGuidedItems} />

      <section id="news" className="bg-[#F8F8F8]">
        <div className="mx-auto max-w-360 px-6 py-20 lg:px-20 xl:px-40 xl:py-28">
          <div className="mx-auto max-w-165.5 text-center">
            <span className="inline-flex rounded-full border border-[#777E90] px-6 py-3 text-sm font-semibold text-[#777E90]">
              {t('news.badge')}
            </span>
            <h2 className="mt-4 text-4xl leading-[1.3] font-semibold text-[#4D7DE9] md:text-5xl xl:text-[64px]">
              {t('news.title')}
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {blogs.map((blog, idx) => (
              <article key={`${blog.headline}-${idx}`} className="space-y-3">
                <Image
                  src={blog.image}
                  alt=""
                  width={360}
                  height={280}
                  className="h-70 w-full rounded-[9px] object-cover"
                />
                <div className="flex items-center text-sm font-semibold text-[#686868]">
                  <p>{blog.meta}</p>
                  <p className="ml-auto">{blog.date}</p>
                </div>
                <h3 className="text-base leading-[1.3] font-bold text-[#686868]">{blog.headline}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <RecruitmentSection
        badge={t('recruitment.badge')}
        titlePrefix={t('recruitment.titlePrefix')}
        titleAccent={t('recruitment.titleAccent')}
        titleSuffix={t('recruitment.titleSuffix')}
        description={t('recruitment.description')}
        contactButton={t('recruitment.contactButton')}
        viewAllButton={t('recruitment.viewAllButton')}
        cards={recruitmentCards}
      />

      <section
        id="culture"
        className="relative mx-auto max-w-360 overflow-visible px-6 py-20 lg:px-20 xl:px-40 xl:py-[130px]"
      >
        <Image
          src="/images/culture/bg-3.png"
          alt=""
          width={370}
          height={370}
          sizes="(max-width: 768px) 40vw, 22vw"
          className="pointer-events-none absolute top-0 right-[calc((100vw-100%)/-2)] h-auto w-[36vw] max-w-92 object-contain object-top-right opacity-90"
        />

        <h2 className="text-center text-4xl leading-[1.3] font-semibold text-[#002A6A] md:text-6xl">
          {t.rich('programs.title', {
            accent: (chunks) => <span className="text-[#DB1721]">{chunks}</span>,
          })}
        </h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-4 lg:gap-10">
          {cultureHighlights.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <div className="mb-4 h-8 w-8 rounded-full bg-[#D9D9D9]" />
              <p className="text-2xl font-semibold">{item.title}</p>
              <p className="mt-4 text-base leading-relaxed text-[#002A6A]/80">{item.body}</p>
            </div>
          ))}
        </div>
        <CultureAccordion items={cultureAccordionItems} defaultOpenId="02" />
      </section>

      <ImageLibrarySection title={t('library.title')} images={libraryImages} />
    </div>
  );
}
