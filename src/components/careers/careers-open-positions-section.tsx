'use client';

import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import { Clock3, MapPin, Star } from 'lucide-react';
import { Link } from '@/i18n/routing';

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
  cards: CareerCard[];
};

export function CareersOpenPositionsSection({
  titlePrefix,
  titleAccent,
  searchPlaceholder,
  searchButtonLabel,
  noResultLabel,
  cards,
}: CareersOpenPositionsSectionProps) {
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return cards;
    }
    return cards.filter((card) => card.title.toLowerCase().includes(normalized));
  }, [cards, query]);

  const onSearch = () => {
    setQuery(keyword);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <section className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
        <div className="space-y-6 sm:space-y-7 lg:space-y-8">
          <div className="text-center">
            <h2 className="text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl lg:text-[64px]">
              {titlePrefix} <span className="text-[#DB1721]">{titleAccent}</span>
            </h2>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto flex w-full flex-col items-center justify-end gap-3 sm:flex-row lg:mr-0 lg:ml-auto"
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-13 w-full rounded-2xl border border-[#D7DCE6] bg-white px-5 text-base text-[#113C8D] transition-colors outline-none placeholder:text-[#8D95A5] focus:border-[#3B63E6] sm:w-[330px]"
            />
            <button
              type="submit"
              className="h-13 min-w-[155px] cursor-pointer rounded-2xl bg-[#3B63E6] px-6 text-xl font-semibold text-white transition-colors hover:bg-[#2F57DB]"
            >
              {searchButtonLabel}
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2">
          {filteredCards.map((card, index) => (
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

        {filteredCards.length === 0 ? (
          <p className="mt-8 text-center text-base text-[#6C7790] sm:mt-10 sm:text-lg">{noResultLabel}</p>
        ) : null}
      </div>
    </section>
  );
}
