'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type AboutMilestoneItem = {
  year: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

type AboutMilestonesCopy = {
  heading: string;
  activeIndex?: number;
  items: AboutMilestoneItem[];
};

export function AboutMilestonesSection({ copy }: { copy: AboutMilestonesCopy }) {
  const initialIndex = useMemo(() => {
    if (copy.items.length === 0) {
      return 0;
    }
    const fallback = copy.activeIndex ?? 0;
    return Math.max(0, Math.min(fallback, copy.items.length - 1));
  }, [copy.activeIndex, copy.items.length]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const activeItem = copy.items[activeIndex];

  return (
    <div className="text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-18 lg:px-12 lg:py-22">
        <div className="grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div>
            <h2 className="text-4xl max-w-[400px] leading-[1.2] font-semibold tracking-[-0.02em] sm:text-[44px]">{copy.heading}</h2>

            <div className="mt-10 space-y-7 sm:mt-12 sm:space-y-8 lg:space-y-9">
              {copy.items.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={`${item.year}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    className={`block w-full cursor-pointer text-left ${isActive ? 'mb-4 sm:mb-5' : 'mb-0'}`}
                  >
                    <article className="flex items-center">
                      <div className="relative flex min-h-25 w-30 shrink-0 items-center gap-5">
                        <span
                          aria-hidden="true"
                          className={`block ${isActive ? 'h-28' : 'h-7'} w-1 rounded-full ${isActive ? 'bg-white' : 'bg-white/35'}`}
                        />
                        <p
                          className={`text-center text-2xl leading-none font-semibold ${isActive ? 'text-white' : 'text-white/45'}`}
                        >
                          {item.year}
                        </p>
                      </div>

                      <div className={`${isActive ? 'pt-1' : 'pt-0'}`}>
                        <h3
                          className={`text-2xl leading-tight font-semibold ${isActive ? 'text-white' : 'text-white/45'}`}
                        >
                          {item.title}
                        </h3>
                        {isActive ? (
                          <p className="mt-3 max-w-[560px] text-base leading-[1.55] text-white/90">{item.body}</p>
                        ) : null}
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl bg-white/10 lg:min-h-[600px]">
            {activeItem ? (
              <Image
                src={activeItem.imageSrc}
                alt={activeItem.imageAlt}
                width={860}
                height={860}
                className="h-auto w-full object-cover lg:min-h-[600px]"
                sizes="(max-width: 1024px) 100vw, 56vw"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
