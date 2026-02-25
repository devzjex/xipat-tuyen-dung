import Image from 'next/image';

export type EcosystemApp = {
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type AppsEcosystemSectionProps = {
  badge: string;
  titleLine1: string;
  titleAccent: string;
  apps: EcosystemApp[];
};

function AppCard({ name, description, imageSrc, imageAlt }: EcosystemApp) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_rgba(21,56,130,0.07)] ring-1 ring-[#D9E3FF] transition-transform duration-300 hover:-translate-y-1 sm:p-5">
      <div className="flex items-start gap-4">
        <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-[#D1D1D1] sm:h-20 sm:w-20">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 640px) 72px, 80px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="text-2xl leading-tight font-semibold tracking-[-0.01em] text-[#0E357E]">{name}</h3>
          <p className="mt-2 text-base leading-[1.45] font-medium text-[#173B85]">{description}</p>
        </div>
      </div>
    </article>
  );
}

export function AppsEcosystemSection({ badge, titleLine1, titleAccent, apps }: AppsEcosystemSectionProps) {
  const topRowApps = apps.slice(0, 3);
  const bottomRowApps = apps.slice(3);

  return (
    <section className="relative overflow-hidden bg-[#EEF3FF] py-14 sm:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-[#8090AB] px-6 py-2 text-sm font-semibold text-[#6A768D]">
            {badge}
          </span>
          <h2 className="mt-8 text-4xl leading-[1.14] font-semibold tracking-[-0.02em] text-[#0F3C93] sm:text-5xl">
            {titleLine1}
            <br />
            <span className="text-[#E0182D]">{titleAccent}</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-295 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {topRowApps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>

        <div className="mx-auto mt-4 grid max-w-350 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
          {bottomRowApps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
