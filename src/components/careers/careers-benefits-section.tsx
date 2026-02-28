import Image from 'next/image';

type BenefitItem = {
  prefix: string;
  highlight: string;
  suffix: string;
  body: string;
};

type CareersBenefitsSectionProps = {
  title: string;
  imageAlt: string;
  items: BenefitItem[];
};

export function CareersBenefitsSection({ title, imageAlt, items }: CareersBenefitsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#012458] text-white">
      <Image
        src="/images/home/bg-solution.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover object-center opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041937]/90 via-[#012458]/72 to-[#012458]/50" />

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-6 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_450px] lg:items-center lg:gap-12 lg:px-12 lg:py-20 xl:grid-cols-[1fr_520px] xl:px-16">
        <div>
          <h2 className="max-w-[640px] text-4xl leading-[1.2] font-semibold tracking-[-0.03em] md:text-[48px]">
            {title}
          </h2>

          <div className="mt-9 grid gap-8 md:grid-cols-3 md:gap-6 lg:mt-12 lg:gap-7">
            {items.map((item, index) => (
              <article
                key={`${item.prefix}-${item.highlight}-${index}`}
                className={`${index < 2 ? 'border-white/14 pb-1 md:border-r md:pr-6' : 'md:pl-1'} md:pt-0 ${index === 1 ? 'md:pt-20' : ''} ${index === 2 ? 'md:pt-30' : ''}`}
              >
                <h3 className="text-xl leading-[1.25] font-semibold tracking-[-0.03em]">
                  {item.prefix} <span className="text-[#4B86FF]">{item.highlight}</span> {item.suffix}
                </h3>
                <p className="mt-5 text-base leading-[1.7] text-white/78">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-[540px]">
          <Image src="/images/home/group-user.png" alt={imageAlt} width={540} height={640} className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
