'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { NewsCard } from '@/components/news/news-card';
import type { NewsCardItem } from '@/components/news/news-card.utils';
import { cn } from '@/lib/utils';

const CAROUSEL_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

type NewsRelatedSectionProps = {
  title: string;
  cards: NewsCardItem[];
};

export function NewsRelatedSection({ title, cards }: NewsRelatedSectionProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const nextIndex = ((index % cards.length) + cards.length) % cards.length;
    const viewport = viewportRef.current;
    const element = itemRefs.current[nextIndex];

    if (!viewport || !element) {
      return;
    }

    viewport.scrollTo({
      left: element.offsetLeft,
      behavior: 'smooth',
    });

    setActiveIndex(nextIndex);
  };

  const handleAutoAdvance = useEffectEvent(() => {
    scrollToIndex(activeIndex + 1);
  });

  useEffect(() => {
    if (cards.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      handleAutoAdvance();
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, [cards.length]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || cards.length === 0) {
      return;
    }

    const updateActiveIndex = () => {
      const viewportLeft = viewport.getBoundingClientRect().left;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) {
          return;
        }

        const distance = Math.abs(item.getBoundingClientRect().left - viewportLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((previous) => (previous === closestIndex ? previous : closestIndex));
    };

    updateActiveIndex();
    viewport.addEventListener('scroll', updateActiveIndex, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      viewport.removeEventListener('scroll', updateActiveIndex);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [cards.length]);

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-[1.08] font-semibold tracking-[-0.03em] text-[#103B8B] sm:text-4xl">
              {title}
            </h2>
          </div>

          {cards.length > 1 ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D6E0F4] bg-white text-[#103B8B] shadow-[0_14px_34px_rgba(16,59,139,0.12)] transition-colors hover:bg-[#EDF3FF]"
                aria-label="Previous article"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D6E0F4] bg-white text-[#103B8B] shadow-[0_14px_34px_rgba(16,59,139,0.12)] transition-colors hover:bg-[#EDF3FF]"
                aria-label="Next article"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>

        <div
          ref={viewportRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: 'smooth' }}
        >
          {cards.map((card, index) => (
            <div
              key={card.href}
              ref={(element) => {
                itemRefs.current[index] = element;
              }}
              className={cn(
                'min-w-0 shrink-0 snap-start basis-[86%] sm:basis-[47%] lg:basis-[31%] xl:basis-[28%]',
                'transition-[transform,opacity,filter] duration-500',
                activeIndex === index
                  ? 'z-10 translate-y-0 scale-100 opacity-100 blur-0'
                  : 'translate-y-2 scale-[0.985] opacity-70',
              )}
              style={{ transitionTimingFunction: CAROUSEL_EASE }}
            >
              <NewsCard
                image={card.image}
                title={card.title}
                date={card.date}
                href={card.href}
                className={cn(
                  'transition-[transform,box-shadow,border-color,background-color] duration-500',
                  activeIndex === index
                    ? 'rounded-[24px] bg-white shadow-[0_28px_70px_rgba(16,59,139,0.16)]'
                    : 'rounded-[24px] bg-white/92 shadow-[0_12px_30px_rgba(16,59,139,0.08)]',
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
