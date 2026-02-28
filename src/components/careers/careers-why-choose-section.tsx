type WhyChooseItem = {
  title: string;
  description: string;
};

type CareersWhyChooseSectionProps = {
  title: string;
  items: WhyChooseItem[];
};

export function CareersWhyChooseSection({ title, items }: CareersWhyChooseSectionProps) {
  return (
    <section className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-12 md:grid-cols-2 md:gap-9 lg:mt-14 lg:grid-cols-3 lg:gap-10">
          {items.map((item, index) => (
            <article key={`${item.title}-${index}`} className="space-y-5">
              <span aria-hidden="true" className="block h-14 w-14 rounded-full bg-[#D0D2D8]" />
              <h3 className="text-2xl leading-[1.25] font-semibold tracking-[-0.01em] text-[#113C8D] sm:text-3xl">
                {item.title}
              </h3>
              <p className="text-base leading-[1.55] text-[#143D87]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
