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
    <article className="rounded-md bg-white p-4 shadow-[0_14px_30px_rgba(21,56,130,0.07)] ring-1 ring-[#D9E3FF] transition-transform duration-300 hover:-translate-y-1 sm:p-5">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 64px, 80px"
            className="rounded-xl object-contain p-2"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-xl leading-tight font-semibold tracking-[-0.01em] text-[#0E357E] sm:text-2xl">{name}</h3>
          <p className="mt-2 text-sm leading-[1.55] text-[#173B85] sm:text-base sm:leading-[1.45]">{description}</p>
        </div>
      </div>
    </article>
  );
}

export function AppsEcosystemSection({ badge, titleLine1, titleAccent, apps }: AppsEcosystemSectionProps) {
  const topRowApps = apps.slice(0, 3);
  const bottomRowApps = apps.slice(3);

  return (
    <section className="relative overflow-hidden bg-[#EEF3FF] py-12 sm:py-14 lg:py-20 xl:py-24">
      <div className="mx-auto w-full px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-[#8090AB] px-6 py-2 text-sm font-semibold text-[#6A768D]">
            {badge}
          </span>
          <h2 className="mt-6 text-3xl leading-[1.18] font-semibold tracking-[-0.02em] text-[#0F3C93] sm:mt-8 sm:text-5xl">
            {titleLine1}
            <br />
            <span className="text-[#E0182D]">{titleAccent}</span>
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-350 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:hidden">
          {apps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>

        <div className="mx-auto mt-14 hidden max-w-295 gap-4 xl:grid xl:grid-cols-3 xl:gap-5">
          {topRowApps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>

        <div className="mx-auto mt-4 hidden max-w-350 gap-4 xl:grid xl:grid-cols-4 xl:gap-5">
          {bottomRowApps.map((app) => (
            <AppCard key={app.name} {...app} />
          ))}
        </div>
      </div>
    </section>
  );
}
