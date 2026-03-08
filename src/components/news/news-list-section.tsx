'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { usePathname, useRouter } from '@/i18n/routing';
import { NewsCard } from '@/components/news/news-card';
import type { NewsCardItem } from '@/components/news/news-card.utils';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

type NewsListSectionProps = {
  badge: string;
  title: string;
  description: string;
  noResultLabel: string;
  currentPage: number;
  pageCount: number;
  cards: NewsCardItem[];
};

export function NewsListSection({
  badge,
  title,
  description,
  noResultLabel,
  currentPage,
  pageCount,
  cards,
}: NewsListSectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();

    if (nextPage > 1) {
      params.set('page', String(nextPage));
    }

    const search = params.toString();
    return search ? `${pathname}?${search}` : pathname;
  };

  const navigate = (nextPage: number) => {
    router.push(buildHref(nextPage));
  };

  const paginationItems = (() => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 'ellipsis', pageCount] as const;
    }

    if (currentPage >= pageCount - 2) {
      return [1, 'ellipsis', pageCount - 2, pageCount - 1, pageCount] as const;
    }

    return [1, 'ellipsis', currentPage, currentPage + 1, 'ellipsis', pageCount] as const;
  })();

  return (
    <section className="bg-[#F5F8FF]">
      <div className="mx-auto max-w-[1320px] px-6 py-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#CAD8F2] bg-white px-5 py-2 text-xs font-semibold tracking-[0.24em] text-[#5676B7] uppercase">
            {badge}
          </span>
          <h1 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-[#103B8B] sm:text-5xl lg:text-[64px]">
            {title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#58709A] sm:text-lg">{description}</p>
        </div>

        {cards.length > 0 ? (
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <NewsCard
                key={card.href}
                image={card.image}
                title={card.title}
                date={card.date}
                href={card.href}
                className="rounded-lg border border-[#E3EAF7] bg-white p-4 shadow-[0_18px_48px_rgba(16,59,139,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C8D8F4] hover:shadow-[0_24px_54px_rgba(16,59,139,0.12)]"
              />
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center text-base text-[#6C7790] sm:text-lg">{noResultLabel}</p>
        )}

        {pageCount > 1 ? (
          <Pagination className="mt-10 sm:mt-12">
            <PaginationContent className="gap-1 sm:gap-1.5">
              <PaginationItem>
                <PaginationLink
                  href={buildHref(currentPage - 1)}
                  aria-label="Go to previous page"
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage <= 1) {
                      return;
                    }
                    navigate(currentPage - 1);
                  }}
                  className={
                    currentPage <= 1
                      ? 'pointer-events-none h-10 w-10 rounded-xl border border-[#D7DCE6] bg-white text-[#A3ADC2] shadow-none'
                      : 'h-10 w-10 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>

              {paginationItems.map((item, index) => {
                if (item === 'ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis className="h-10 w-8 text-[#113C8D]" />
                    </PaginationItem>
                  );
                }

                const isActive = item === currentPage;

                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href={buildHref(item)}
                      isActive={isActive}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(item);
                      }}
                      className={
                        isActive
                          ? 'h-10 w-10 rounded-xl border border-[#3B63E6] bg-[#3B63E6] text-white shadow-none hover:bg-[#3158D9]'
                          : 'h-10 w-10 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
                      }
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationLink
                  href={buildHref(currentPage + 1)}
                  aria-label="Go to next page"
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage >= pageCount) {
                      return;
                    }
                    navigate(currentPage + 1);
                  }}
                  className={
                    currentPage >= pageCount
                      ? 'pointer-events-none h-10 w-10 rounded-xl border border-[#D7DCE6] bg-white text-[#A3ADC2] shadow-none'
                      : 'h-10 w-10 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </div>
    </section>
  );
}
