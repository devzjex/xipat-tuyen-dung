type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

type ContactOverviewSectionProps = {
  title: string;
  description: string;
  items: ContactItem[];
};

export function ContactOverviewSection({ title, description, items }: ContactOverviewSectionProps) {
  return (
    <section className="bg-[#F3F5F8]">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-18 lg:px-12 lg:pt-36 lg:pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.25fr] lg:gap-16">
          <div>
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.02em] text-[#113C8D] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-8 max-w-[500px] text-xl leading-[1.45] text-[#113C8D]">{description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
            {items.map((item, index) => (
              <article key={`${item.label}-${index}`}>
                <h2 className="text-xl leading-[1.2] font-medium text-[#113C8D]">{item.label}</h2>
                <p className="mt-3 text-xl leading-[1.25] font-semibold text-[#3260EB]">{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-none border border-[#D3D7DF] bg-[#D6D6D8] sm:mt-14 lg:mt-16">
          <iframe
            title="Xipat Office"
            src="https://www.google.com/maps?q=XIPAT%20Flexible%20Solutions%20Company%20Limited%2C%2018%20Ng.%2011%20P.%20Th%C3%A1i%20H%C3%A0%2C%20Trung%20Li%E1%BB%87t%2C%20%C4%90%E1%BB%91ng%20%C4%90a%2C%20H%C3%A0%20N%E1%BB%99i%2C%20Vietnam&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-[380px] lg:h-[430px]"
          />
        </div>
      </div>
    </section>
  );
}
