import Image from 'next/image';
import type { ReactNode } from 'react';

type AboutHeroCopy = {
  title: ReactNode;
  description: string;
  imageAlt: string;
};

export function AboutHeroSection({ copy }: { copy: AboutHeroCopy }) {
  return (
    <section className="relative overflow-hidden bg-[#041E56] text-white">
      <Image
        src="/images/about/bg-1.png"
        alt=""
        width={1244}
        height={600}
        priority
        className="pointer-events-none absolute top-0 right-0 h-auto w-[150vw] max-w-none object-contain object-right opacity-90 sm:w-[130vw] md:w-[118vw] lg:w-[104vw] xl:w-[98vw] 2xl:max-w-[1244px]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#0B2F86]/70 via-[#09286F]/45 to-[#041E56]/78" />

      <div className="relative z-10 mx-auto max-w-[1560px] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16">
        <div className="grid items-start gap-8 pt-24 pb-10 sm:gap-10 sm:pt-28 sm:pb-12 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-30 lg:pb-0 xl:min-h-[700px] xl:gap-10">
          <div className="mx-auto w-full max-w-[680px] space-y-5 sm:space-y-6 md:space-y-7 lg:col-span-6 lg:mx-0 lg:space-y-8 lg:pb-10 xl:col-span-5 xl:pb-14">
            <Image
              src="/images/about/bg-2.png"
              alt=""
              width={83}
              height={50}
              className="h-auto w-[70px] object-contain sm:w-[78px] lg:w-[83px]"
            />

            <h1 className="max-w-[18ch] text-4xl leading-[1.22] font-semibold tracking-[-0.02em] text-white sm:text-[44px] md:text-5xl xl:text-[64px]">
              {copy.title}
            </h1>

            <p className="max-w-[600px] text-base leading-[1.6] text-white/92 sm:text-lg sm:leading-[1.55] md:text-xl lg:text-[22px] lg:leading-[1.5]">
              {copy.description}
            </p>
          </div>

          <div className="flex justify-center lg:col-span-6 lg:justify-end xl:col-span-7 xl:self-end">
            <Image
              src="/images/about/image.png"
              alt={copy.imageAlt}
              width={668}
              height={456}
              priority
              className="h-auto w-[92vw] max-w-[540px] object-contain sm:max-w-[620px] lg:max-w-[640px] xl:max-w-[668px]"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, (max-width: 1440px) 46vw, 668px"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
