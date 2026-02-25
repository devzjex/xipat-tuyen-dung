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
    <div className={cn('mt-16 space-y-5', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `culture-panel-${item.id}`;
        const panelImage = item.imageSrc ?? imageSrc ?? '';

        return (
          <div key={item.id} className="space-y-5">
            <div className="border-b border-[#efefef] pb-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="h-auto w-full justify-between rounded-none px-0 py-0 hover:bg-transparent"
              >
                <span className="text-left text-2xl font-semibold text-[#002A6A] md:text-[33px]">
                  {item.id}. {item.title}
                </span>
                <ChevronDown
                  className={cn('h-8 w-8 text-[#002A6A] transition-transform duration-300', isOpen ? 'rotate-180' : '')}
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
                <div className="relative h-[532px] overflow-hidden bg-[#eee]">
                  {panelImage ? <Image src={panelImage} alt="" fill sizes="100vw" className="object-cover" /> : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02265e]/70 via-[#02265e]/15 to-transparent" />
                  <p className="absolute bottom-12 left-10 max-w-[602px] text-lg text-white">{item.body}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
