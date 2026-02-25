'use client';

import { useState } from 'react';
import Image from 'next/image';

export type SolutionItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type SolutionShowcaseProps = {
  headingLines: string[];
  items: SolutionItem[];
};

export function SolutionShowcase({ headingLines, items }: SolutionShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section className="relative overflow-hidden bg-[#082154]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_50%_at_6%_8%,rgba(97,143,255,0.58)_0%,rgba(97,143,255,0)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(46%_42%_at_92%_90%,rgba(74,126,255,0.52)_0%,rgba(74,126,255,0)_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(3,18,54,0.12)_0%,rgba(3,18,54,0.5)_55%,rgba(3,18,54,0.66)_100%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-14 sm:gap-10 sm:px-8 sm:py-16 md:gap-12 md:px-10 md:py-20 lg:flex-row lg:items-start lg:gap-12 lg:px-12 lg:py-24 xl:gap-20 xl:px-10 xl:py-28">
        <div className="flex w-full flex-col items-center text-center lg:w-[54%] lg:items-start lg:text-left xl:w-[52%]">
          <h2 className="text-[28px] leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-[34px] md:text-4xl lg:text-[40px] xl:text-[44px]">
            {headingLines[0]}
            <br />
            {headingLines[1]}
            <br />
            {headingLines[2]}
          </h2>

          <div className="mt-8 flex w-full flex-col gap-5 text-left sm:mt-9 sm:gap-8 md:mt-10">
            {items.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.title}
                  className={`border-l-[3px] pl-5 transition-colors ${isActive ? 'border-white' : 'border-white/30'}`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`flex w-full cursor-pointer items-center gap-4 text-left text-2xl font-semibold ${isActive ? 'text-white' : 'text-white/70'}`}
                  >
                    {item.title}
                  </button>

                  {isActive ? (
                    <p className="mt-3 max-w-120 text-base leading-[1.7] text-white">{item.description}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex w-full shrink-0 justify-center lg:w-[46%] xl:w-[48%]">
          <Image
            src={activeItem.imageSrc}
            alt={activeItem.imageAlt}
            width={540}
            height={540}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 46vw"
            className="h-auto w-full max-w-[320px] rounded-2xl object-contain sm:max-w-105 md:max-w-120 lg:max-w-none lg:rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}
