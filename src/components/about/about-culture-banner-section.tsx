import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type AboutCultureBannerCopy = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  imageAlt: string;
};

export function AboutCultureBannerSection({ copy }: { copy: AboutCultureBannerCopy }) {
  return (
    <div className="relative overflow-hidden text-white">
      <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-22">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
          <div className="relative">
            <Image
              src="/images/about/bg-3.png"
              alt=""
              width={658}
              height={410}
              className="pointer-events-none absolute bottom-8 left-1/2 h-auto w-[76%] max-w-[658px] -translate-x-1/2 object-contain opacity-80 sm:bottom-10 sm:w-[72%] lg:bottom-8 lg:left-0 lg:w-[658px] lg:translate-x-0"
            />
            <Image
              src="/images/about/image-7.png"
              alt={copy.imageAlt}
              width={650}
              height={500}
              className="relative z-10 h-auto w-full max-w-[650px] object-contain"
              sizes="(max-width: 1024px) 100vw, 650px"
            />
          </div>

          <div className="relative z-10 max-w-[560px] space-y-6 sm:space-y-7 lg:space-y-8">
            <h2 className="text-4xl leading-[1.2] font-semibold tracking-[-0.02em] sm:text-5xl">{copy.title}</h2>

            <p className="text-base leading-[1.6] text-white lg:leading-normal">{copy.description}</p>

            <Link
              href={copy.ctaHref}
              className="group inline-flex items-center rounded-full bg-white py-1.5 pr-1.5 pl-8 text-xl font-semibold text-[#113C8D] transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{copy.ctaLabel}</span>
              <span className="ml-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3A93] text-white transition-all duration-300 group-hover:translate-x-0.5">
                <ArrowUpRight className="h-8 w-8" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

