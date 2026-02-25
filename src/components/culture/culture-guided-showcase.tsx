'use client';

import { useState } from 'react';
import Image from 'next/image';

export type CultureGuidedItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type CultureGuidedShowcaseProps = {
  heading: string;
  items: CultureGuidedItem[];
};

export function CultureGuidedShowcase({ heading, items }: CultureGuidedShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(67.13deg,#2F5DE5_0%,#131A25_99.99%)] text-white">
      <Image
        src="/images/culture/bg-2.png"
        alt=""
        width={828}
        height={951}
        sizes="100vw"
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-full max-w-190 object-contain object-bottom-right opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_56%_at_8%_10%,rgba(99,145,255,0.52)_0%,rgba(99,145,255,0)_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(3,18,54,0.08)_0%,rgba(3,18,54,0.35)_55%,rgba(3,18,54,0.58)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-10 xl:py-28">
        <h2 className="mx-auto max-w-4xl text-center text-4xl leading-[1.3] font-semibold tracking-[-0.02em] text-white md:text-5xl xl:text-[64px]">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="w-full max-w-155">
            <div className="flex w-full flex-col gap-6 sm:gap-7">
              {items.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.title}
                    className={`border-l-[5px] pl-5 transition-colors sm:pl-6 ${isActive ? 'border-white' : 'border-[#7A9BE3]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full cursor-pointer text-left text-base leading-none font-semibold transition-colors sm:text-2xl ${isActive ? 'text-white' : 'text-[#7A9BE3]'}`}
                    >
                      {item.title}
                    </button>

                    {isActive ? (
                      <p className="mt-4 max-w-140 text-sm leading-[1.55] text-white/95 sm:text-base sm:leading-[1.45]">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex w-full justify-center lg:justify-end">
            <Image
              src={activeItem.imageSrc}
              alt={activeItem.imageAlt}
              width={500}
              height={500}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 42vw"
              className="h-auto w-full max-w-85 rounded-2xl object-cover shadow-[0_20px_56px_rgba(0,0,0,0.32)] sm:max-w-130 lg:max-w-125 lg:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
