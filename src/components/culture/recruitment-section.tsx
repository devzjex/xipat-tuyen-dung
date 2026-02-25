import { Clock3, MapPin, Star } from 'lucide-react';

export type RecruitmentCard = {
  title: string;
  salary: string;
  description: string;
  employment: string;
  location: string;
  experience: string;
};

type RecruitmentSectionProps = {
  badge: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  description: string;
  contactButton: string;
  viewAllButton: string;
  cards: RecruitmentCard[];
};

export function RecruitmentSection({
  badge,
  titlePrefix,
  titleAccent,
  titleSuffix,
  description,
  contactButton,
  viewAllButton,
  cards,
}: RecruitmentSectionProps) {
  return (
    <section id="recruitment" className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="pt-1 lg:pt-4">
            <span className="inline-flex rounded-full border border-[#113C8D] px-8 py-2 text-base font-semibold text-[#113C8D]">
              {badge}
            </span>

            <h2 className="mt-5 text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
              {titlePrefix} <span className="text-[#DB1721]">{titleAccent}</span> {titleSuffix}
            </h2>

            <p className="mt-5 max-w-125 text-base leading-[1.6] text-[#666E7D] sm:text-lg">{description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex min-w-55 cursor-pointer items-center justify-center rounded-full bg-[#113C8D] py-1 text-base font-semibold text-white transition-colors hover:bg-[#0F3478]"
              >
                {contactButton}
              </button>
              <button
                type="button"
                className="inline-flex min-w-55 cursor-pointer items-center justify-center rounded-full border-2 border-[#113C8D] py-1 text-base font-semibold text-[#113C8D] transition-colors hover:bg-[#EAF0FB]"
              >
                {viewAllButton}
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {cards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className="rounded-md bg-white px-7 py-7 shadow-[0_10px_30px_rgba(17,60,141,0.12)] sm:px-8"
              >
                <h3 className="text-xl leading-[1.2] font-bold tracking-[-0.02em] text-[#113C8D]">{card.title}</h3>
                <p className="mt-2 text-sm font-medium text-[#113C8D]">{card.salary}</p>
                <p className="mt-4 text-base leading-[1.6] text-[#113C8D]">{card.description}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#E4ECFC] px-4 py-2 text-sm font-semibold text-[#113C8D]">
                    <Clock3 className="h-4 w-4" />
                    {card.employment}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#E4ECFC] px-4 py-2 text-sm font-semibold text-[#113C8D]">
                    <MapPin className="h-4 w-4" />
                    {card.location}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[#E4ECFC] px-4 py-2 text-sm font-semibold text-[#113C8D]">
                    <Star className="h-4 w-4" />
                    {card.experience}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
