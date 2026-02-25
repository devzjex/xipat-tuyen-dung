import Image from 'next/image';

type AboutHeroCopy = {
  title: string;
  description: string;
  imageAlt: string;
};

export function AboutHeroSection({ copy }: { copy: AboutHeroCopy }) {
  return (
    <section className="relative overflow-hidden bg-[#041E56] pt-24 text-white sm:pt-28 xl:h-[700px] xl:pt-0">
      <Image
        src="/images/about/bg-1.png"
        alt=""
        width={1244}
        height={600}
        priority
        className="pointer-events-none absolute -top-8 -right-48 h-auto w-[130vw] max-w-[1244px] object-contain object-right opacity-90 sm:-top-6 sm:-right-36 sm:w-[118vw] md:-right-28 md:w-[100vw] xl:top-0 xl:-right-40 xl:h-[800px] xl:w-auto"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#0B2F86]/55 via-[#09286F]/35 to-[#041E56]/72" />

      <div className="relative px-5 pb-10 sm:px-8 sm:pb-12 md:px-10 md:pb-14 lg:px-12 lg:pb-0 xl:h-[700px] xl:px-22">
        <div className="relative z-10 mx-auto max-w-[620px] space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 xl:absolute xl:top-1/2 xl:left-52 xl:mx-0 xl:-translate-y-1/2">
          <Image
            src="/images/about/bg-2.png"
            alt=""
            width={83}
            height={50}
            className="h-auto w-[70px] object-contain sm:w-[78px] lg:w-[83px]"
          />

          <h1 className="text-4xl leading-[1.22] font-semibold tracking-[-0.02em] whitespace-pre-line text-white sm:text-[44px] md:text-5xl xl:text-[64px]">
            {copy.title}
          </h1>

          <p className="max-w-[600px] text-base leading-[1.6] text-white/92 sm:text-lg sm:leading-[1.55] md:text-xl lg:text-2xl lg:leading-[1.45]">
            {copy.description}
          </p>
        </div>

        <div className="relative z-10 mt-8 flex justify-center sm:mt-10 md:mt-12 xl:absolute xl:right-48 xl:bottom-0 xl:mt-0 xl:h-[456px] xl:w-[668px] xl:items-end xl:justify-end">
          <Image
            src="/images/about/image.png"
            alt={copy.imageAlt}
            width={668}
            height={456}
            priority
            className="h-auto w-[92vw] max-w-[540px] object-contain sm:max-w-[620px] xl:h-[456px] xl:w-[668px] xl:max-w-[668px]"
            sizes="(max-width: 640px) 92vw, (max-width: 1279px) 76vw, 668px"
          />
        </div>
      </div>
    </section>
  );
}
