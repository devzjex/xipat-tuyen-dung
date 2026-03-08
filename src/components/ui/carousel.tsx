'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CarouselContextValue = {
  scrollPrev: () => void;
  scrollNext: () => void;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('Carousel components must be used within <Carousel />');
  }

  return context;
}

type CarouselProps = {
  children: ReactNode;
  className?: string;
  autoPlayInterval?: number;
};

export function Carousel({ children, className, autoPlayInterval }: CarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollByViewport = (direction: 1 | -1) => {
    const element = viewportRef.current;

    if (!element) {
      return;
    }

    const amount = Math.max(element.clientWidth * 0.92, 280) * direction;
    element.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!autoPlayInterval) {
      return;
    }

    const element = viewportRef.current;

    if (!element) {
      return;
    }

    const timer = window.setInterval(() => {
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      const nextLeft = element.scrollLeft + Math.max(element.clientWidth * 0.92, 280);

      if (nextLeft >= maxScrollLeft - 4) {
        element.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      element.scrollTo({ left: nextLeft, behavior: 'smooth' });
    }, autoPlayInterval);

    return () => {
      window.clearInterval(timer);
    };
  }, [autoPlayInterval]);

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        scrollPrev: () => scrollByViewport(-1),
        scrollNext: () => scrollByViewport(1),
      }}
    >
      <div className={cn('relative', className)}>{children}</div>
    </CarouselContext.Provider>
  );
}

type CarouselContentProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselContent({ children, className }: CarouselContentProps) {
  const { viewportRef } = useCarousel();

  return (
    <div
      ref={viewportRef}
      className={cn(
        'flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}

type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={cn('min-w-0 shrink-0 snap-start', className)}>{children}</div>;
}

type CarouselButtonProps = {
  className?: string;
};

export function CarouselPrevious({ className }: CarouselButtonProps) {
  const { scrollPrev } = useCarousel();

  return (
    <button
      type="button"
      onClick={scrollPrev}
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D6E0F4] bg-white text-[#103B8B] shadow-[0_14px_34px_rgba(16,59,139,0.12)] transition-colors hover:bg-[#EDF3FF]',
        className,
      )}
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
  );
}

export function CarouselNext({ className }: CarouselButtonProps) {
  const { scrollNext } = useCarousel();

  return (
    <button
      type="button"
      onClick={scrollNext}
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#D6E0F4] bg-white text-[#103B8B] shadow-[0_14px_34px_rgba(16,59,139,0.12)] transition-colors hover:bg-[#EDF3FF]',
        className,
      )}
      aria-label="Next slide"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}
