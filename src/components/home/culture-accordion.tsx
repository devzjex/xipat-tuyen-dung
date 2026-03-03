'use client';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CultureAccordionItem = {
  id: string;
  title: string;
  body: string;
  imageSrc?: string;
};

type CultureAccordionProps = {
  items: CultureAccordionItem[];
  imageSrc?: string;
  defaultOpenId?: string | null;
  className?: string;
};

export function CultureAccordion({ items, imageSrc, defaultOpenId, className }: CultureAccordionProps) {
  const initialOpenId = defaultOpenId ?? items[0]?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(initialOpenId);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cn('mt-10 space-y-4 md:mt-12 md:space-y-5 lg:mt-16', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `culture-panel-${item.id}`;
        const panelImage = item.imageSrc ?? imageSrc ?? '';

        return (
          <div key={item.id} className="space-y-4 md:space-y-5">
            <div className="border-b border-[#efefef] pb-4 md:pb-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="h-auto w-full items-start justify-between gap-4 rounded-none px-0 py-0 text-left hover:bg-transparent"
              >
                <span className="pr-2 text-xl leading-[1.3] font-semibold text-[#002A6A] sm:text-2xl md:text-[30px] md:leading-[1.25] lg:text-[33px]">
                  {item.id}. {item.title}
                </span>
                <ChevronDown
                  className={cn(
                    'mt-0.5 h-6 w-6 shrink-0 text-[#002A6A] transition-transform duration-300 md:h-7 md:w-7 lg:h-8 lg:w-8',
                    isOpen ? 'rotate-180' : '',
                  )}
                  aria-hidden="true"
                />
              </Button>
            </div>

            <div
              id={panelId}
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="relative min-h-[300px] overflow-hidden bg-[#eee] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[532px]">
                  {panelImage ? (
                    <Image
                      src={panelImage}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 1280px, (min-width: 1024px) 100vw, (min-width: 768px) 100vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02265e]/85 via-[#02265e]/28 to-transparent md:from-[#02265e]/72 md:via-[#02265e]/16" />
                  <p className="absolute right-4 bottom-5 left-4 text-sm leading-relaxed text-white sm:right-8 sm:bottom-8 sm:left-8 sm:text-base md:right-10 md:bottom-10 md:left-10 md:max-w-[620px] md:text-lg">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
