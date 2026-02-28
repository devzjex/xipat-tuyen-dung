import Image from 'next/image';

type AboutProductJourneyCopy = {
  titlePrefix: string;
  titleAccent: string;
  description: string;
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  imageAlt: string;
};

export function AboutProductJourneySection({ copy }: { copy: AboutProductJourneyCopy }) {
  const infoCards = [
    { title: copy.missionTitle, body: copy.missionBody },
    { title: copy.visionTitle, body: copy.visionBody },
  ];

  return (
    <section className="bg-[#F5F7FC]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-26 xl:px-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-14">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/about/image-5.png"
              alt={copy.imageAlt}
              width={459}
              height={476}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
          </div>

          <div className="space-y-7 sm:space-y-8 lg:space-y-10">
            <h2 className="text-4xl leading-[1.22] font-semibold tracking-[-0.02em] text-[#0A3A88] lg:text-5xl">
              {copy.titlePrefix} <span className="text-[#DB1721]">{copy.titleAccent}</span>
            </h2>

            <p className="text-base leading-[1.6] text-[#123C86] lg:leading-[1.55]">{copy.description}</p>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
              {infoCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-md bg-white px-5 py-6 shadow-[0_10px_28px_rgba(17,51,115,0.06)] sm:px-6 sm:py-7"
                >
                  <h3 className="text-xl leading-[1.2] font-semibold text-[#0A3A88] sm:text-2xl">{card.title}</h3>
                  <p className="mt-3 text-base leading-[1.6] text-[#123C86]">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
