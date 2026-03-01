'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock3, MapPin, Search, Star } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

export type CareerCard = {
  slug: string;
  title: string;
  salary: string;
  description: string;
  employment: string;
  location: string;
  experience: string;
};

type CareersOpenPositionsSectionProps = {
  titlePrefix: string;
  titleAccent: string;
  searchPlaceholder: string;
  searchButtonLabel: string;
  noResultLabel: string;
  initialQuery: string;
  currentPage: number;
  pageCount: number;
  cards: CareerCard[];
};

export function CareersOpenPositionsSection({
  titlePrefix,
  titleAccent,
  searchPlaceholder,
  searchButtonLabel,
  noResultLabel,
  initialQuery,
  currentPage,
  pageCount,
  cards,
}: CareersOpenPositionsSectionProps) {
  const sectionId = 'careers-open-positions';
  const router = useRouter();
  const pathname = usePathname();
  const [keyword, setKeyword] = useState(initialQuery);

  const buildHref = (nextPage: number, nextQuery: string) => {
    const params = new URLSearchParams();
    const normalizedQuery = nextQuery.trim();

    if (normalizedQuery) {
      params.set('q', normalizedQuery);
    }

    if (nextPage > 1) {
      params.set('page', String(nextPage));
    }

    const search = params.toString();
    return search ? `${pathname}?${search}#${sectionId}` : `${pathname}#${sectionId}`;
  };

  const navigate = (nextPage: number, nextQuery: string) => {
    router.push(buildHref(nextPage, nextQuery));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(1, keyword);
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
    <section id={sectionId} className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
        <div className="space-y-6 sm:space-y-7 lg:space-y-8">
          <div className="text-center">
            <h2 className="text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl lg:text-[64px]">
              {titlePrefix} <span className="text-[#DB1721]">{titleAccent}</span>
            </h2>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl border border-[#D8E1F3] bg-white/90 p-2 shadow-[0_12px_30px_rgba(17,60,141,0.08)] backdrop-blur-sm sm:flex-row sm:items-center"
          >
            <div className="group relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-[#8D95A5] transition-colors group-focus-within:text-[#3B63E6]" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-13 w-full rounded-xl border border-transparent bg-[#F5F8FF] pr-4 pl-11 text-base text-[#113C8D] outline-none transition-all placeholder:text-[#8D95A5] focus:border-[#3B63E6] focus:bg-white focus:ring-4 focus:ring-[#3B63E6]/10"
              />
            </div>
            <button
              type="submit"
              className="h-13 min-w-[155px] cursor-pointer rounded-xl bg-[#3B63E6] px-6 text-base font-semibold text-white transition-all hover:bg-[#2F57DB] hover:shadow-[0_8px_20px_rgba(59,99,230,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3B63E6]/25"
            >
              {searchButtonLabel}
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {cards.map((card, index) => (
            <Link
              key={`${card.slug}-${index}`}
              href={`/careers/${card.slug}`}
              className="group block rounded-sm bg-white px-5 py-5 shadow-[0_8px_20px_rgba(17,60,141,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9D7F6] hover:shadow-[0_12px_26px_rgba(17,60,141,0.12)] sm:px-7 sm:py-6"
            >
              <div>
                <h3 className="text-xl leading-[1.25] font-bold tracking-[-0.01em] text-[#113C8D]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#1E4A98]">{card.salary}</p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-2 rounded-md bg-[#DCE8FF] px-3 py-1.5 text-sm font-semibold text-[#113C8D]">
                    <Clock3 className="h-3.5 w-3.5" />
                    {card.employment}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md bg-[#DCE8FF] px-3 py-1.5 text-sm font-semibold text-[#113C8D]">
                    <MapPin className="h-3.5 w-3.5" />
                    {card.location}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-md bg-[#DCE8FF] px-3 py-1.5 text-sm font-semibold text-[#113C8D]">
                    <Star className="h-3.5 w-3.5" />
                    {card.experience}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {cards.length === 0 ? (
          <p className="mt-8 text-center text-base text-[#6C7790] sm:mt-10 sm:text-lg">{noResultLabel}</p>
        ) : null}

        {pageCount > 1 ? (
          <Pagination className="mt-8 sm:mt-10">
            <PaginationContent className="gap-1 sm:gap-1.5">
              <PaginationItem>
                <PaginationLink
                  href={buildHref(currentPage - 1, keyword)}
                  aria-label="Go to previous page"
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage <= 1) {
                      return;
                    }
                    navigate(currentPage - 1, keyword);
                  }}
                  className={
                    currentPage <= 1
                      ? 'pointer-events-none h-9 w-9 rounded-xl border border-[#D7DCE6] bg-white text-[#A3ADC2] shadow-none'
                      : 'h-9 w-9 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </PaginationLink>
              </PaginationItem>

              {paginationItems.map((item, index) => {
                if (item === 'ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis className="h-9 w-8 text-[#113C8D]" />
                    </PaginationItem>
                  );
                }

                const isActive = item === currentPage;
                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href={buildHref(item, keyword)}
                      isActive={isActive}
                      onClick={(event) => {
                        event.preventDefault();
                        navigate(item, keyword);
                      }}
                      className={
                        isActive
                          ? 'h-9 w-9 rounded-xl border border-[#3B63E6] bg-[#3B63E6] text-white shadow-none hover:bg-[#3158D9]'
                          : 'h-9 w-9 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
                      }
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationLink
                  href={buildHref(currentPage + 1, keyword)}
                  aria-label="Go to next page"
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage >= pageCount) {
                      return;
                    }
                    navigate(currentPage + 1, keyword);
                  }}
                  className={
                    currentPage >= pageCount
                      ? 'pointer-events-none h-9 w-9 rounded-xl border border-[#D7DCE6] bg-white text-[#A3ADC2] shadow-none'
                      : 'h-9 w-9 rounded-xl border border-[#D7DCE6] bg-white text-[#113C8D] shadow-none hover:border-[#3B63E6] hover:bg-[#EDF2FF]'
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
