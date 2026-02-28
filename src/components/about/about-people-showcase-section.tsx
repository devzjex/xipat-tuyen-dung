import Image from 'next/image';

type AboutPeopleShowcaseItem = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  widthClass: string;
  mobileClass: string;
  desktopClass: string;
};

type AboutPeopleShowcaseCopy = {
  title: string;
  descriptionLead: string;
  descriptionFollowUp: string;
  descriptionEmphasis: string;
  items: AboutPeopleShowcaseItem[];
};

export function AboutPeopleShowcaseSection({ copy }: { copy: AboutPeopleShowcaseCopy }) {
  return (
    <section className="relative h-[1100px] max-h-[1300px] overflow-hidden bg-[#F5F7FC]">
      <Image
        src="/images/culture/bg-1.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto mt-3 max-w-4xl text-center sm:mt-6 lg:absolute lg:top-2 lg:left-1/2 lg:z-10 lg:mt-0 lg:w-full lg:max-w-4xl lg:-translate-x-1/2">
          <h2 className="text-4xl leading-[1.3] font-semibold tracking-[-0.02em] whitespace-pre-line text-[#0D3D94] md:text-5xl xl:text-[64px]">
            {copy.title}
          </h2>
          <div className="mx-auto mt-6 max-w-[720px] space-y-5 text-[#123C86] sm:space-y-6">
            <p className="text-base leading-[1.55] sm:text-lg lg:text-2xl">{copy.descriptionLead}</p>
            <p className="text-base leading-[1.55] sm:text-lg lg:text-2xl">
              {copy.descriptionFollowUp} <span className="font-semibold italic">{copy.descriptionEmphasis}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
          {copy.items.map((item) => (
            <article
              key={item.id}
              className={`justify-self-center overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(29,64,140,0.12)] ${item.mobileClass}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={`${item.width}px`}
                className={`block h-auto ${item.widthClass} object-contain`}
              />
            </article>
          ))}
        </div>

        <div className="relative mt-10 hidden h-86.25 lg:mt-36 lg:block xl:h-90">
          {copy.items.map((item) => (
            <article
              key={item.id}
              className={`absolute overflow-hidden rounded-xl shadow-[0_12px_30px_rgba(29,64,140,0.12)] ${item.desktopClass}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes={`${item.width}px`}
                className={`block h-auto ${item.widthClass} object-contain`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
