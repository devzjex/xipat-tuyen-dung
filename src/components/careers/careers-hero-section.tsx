import Image from 'next/image';

type CareersHeroSectionProps = {
  title: string;
  description: string;
  imageAlt: string;
};

export function CareersHeroSection({ title, description, imageAlt }: CareersHeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[420px] sm:h-[500px] lg:h-[600px]">
        <Image
          src="/images/carreer/bg.png"
          alt={imageAlt}
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
          fetchPriority="high"
        />
      </div>

      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%] w-full sm:h-[45%] lg:h-[48%]"
        preserveAspectRatio="none"
      >
        <path
          fill="#3C63E6"
          fillOpacity="1"
          d="M0,192L120,170.7C240,149,480,107,720,106.7C960,107,1200,149,1320,170.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>

      <div className="absolute inset-x-0 bottom-0 z-20 h-[40%] sm:h-[45%] lg:h-[48%]">
        <div className="mx-auto flex h-full max-w-5xl items-end justify-center px-5 pb-6 text-center text-white sm:px-8 sm:pb-8 lg:pb-10">
          <div>
            <h1 className="text-3xl leading-[1.15] font-semibold tracking-[-0.02em] sm:text-5xl">{title}</h1>
            <p className="mx-auto mt-3 max-w-lg text-base leading-[1.55] text-white/92 sm:mt-4 sm:text-lg lg:leading-[1.4]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
