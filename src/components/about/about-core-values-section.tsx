type AboutCoreValueItem = {
  title: string;
  body: string;
};

type AboutCoreValuesCopy = {
  titlePrefix: string;
  titleAccent: string;
  items: AboutCoreValueItem[];
};

export function AboutCoreValuesSection({ copy }: { copy: AboutCoreValuesCopy }) {
  return (
    <section className="bg-[#F5F7FC]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-20">
        <h2 className="text-center text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-[#0A3A88] sm:text-5xl lg:text-[64px]">
          {copy.titlePrefix} <span className="text-[#DB1721]">{copy.titleAccent}</span>
        </h2>

        <div className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-2 sm:gap-10 lg:mt-18 lg:grid-cols-4 lg:gap-10">
          {copy.items.map((item) => (
            <article key={item.title} className="space-y-5">
              <div className="h-12 w-12 rounded-full bg-[#D9D9D9]" />
              <h3 className="text-2xl leading-[1.2] font-semibold text-[#0A3A88] sm:text-3xl">{item.title}</h3>
              <p className="text-base leading-[1.58] text-[#123C86]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
