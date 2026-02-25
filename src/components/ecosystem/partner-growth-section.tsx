import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export type PartnerLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PartnerGrowthSectionProps = {
  title: string;
  descriptionLine1: string;
  descriptionLine2: string;
  logos: PartnerLogo[];
  discoverButton: string;
  ctaLine1: string;
  ctaLine2Before: string;
  ctaLine2Accent: string;
  ctaLine2After: string;
  ctaDescriptionLine1: string;
  ctaDescriptionLine2: string;
  ctaButton: string;
};

function PartnerLogoCard({ logo }: { logo: PartnerLogo }) {
  return (
    <article className="flex h-21 w-45 shrink-0 items-center justify-center rounded-2xl border border-[#2D5AB8] bg-linear-to-br from-[#0E3A86] via-[#0B3273] to-[#082B62] px-4 py-4 sm:h-23 sm:w-52.5">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        sizes="(max-width: 640px) 180px, 210px"
        className="h-8 w-auto object-contain brightness-0 invert sm:h-9"
      />
    </article>
  );
}

function PartnerLogoMarquee({ logos }: { logos: PartnerLogo[] }) {
  return (
    <div className="mt-12 w-full overflow-hidden sm:mt-14" aria-label="Partner logos">
      <div className="partner-logo-marquee-track flex min-w-max items-center gap-4 sm:gap-5 lg:gap-6">
        {[...logos, ...logos].map((logo, index) => (
          <PartnerLogoCard key={`${logo.src}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function PartnerGrowthSection({
  title,
  descriptionLine1,
  descriptionLine2,
  logos,
  discoverButton,
  ctaLine1,
  ctaLine2Before,
  ctaLine2Accent,
  ctaLine2After,
  ctaDescriptionLine1,
  ctaDescriptionLine2,
  ctaButton,
}: PartnerGrowthSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FC] py-16 text-[#0F3C93] sm:py-20 lg:py-24">
      <Image
        src="/images/ecosystem/bg-image-1.png"
        alt=""
        aria-hidden
        width={425}
        height={361}
        sizes="(max-width: 1024px) 65vw, 48vw"
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-[70vw] max-w-190 object-contain opacity-85"
      />

      <div className="relative mx-auto flex max-w-330 flex-col items-center px-5 text-center sm:px-8 lg:px-12 xl:px-16">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-[#0D387F] sm:text-5xl lg:leading-[1.08]">{title}</h2>
        <p className="mt-4 max-w-190 text-base leading-[1.55] text-[#123B82] sm:text-xl lg:leading-[1.35]">
          {descriptionLine1}
          <br className="hidden sm:block" /> {descriptionLine2}
        </p>

        <PartnerLogoMarquee logos={logos} />

        <div className="mt-16 flex w-full max-w-215 flex-col items-center lg:mt-22">
          <Button
            variant="outline"
            className="h-auto rounded-full border-[#7F8FAE] bg-transparent px-10 py-2.5 text-base font-semibold text-[#0F3C93] focus-visible:ring-2 focus-visible:ring-[#0F3C93] focus-visible:ring-offset-2"
          >
            {discoverButton}
          </Button>

          <h3 className="mt-8 text-4xl leading-[1.2] font-semibold tracking-[-0.02em] text-balance text-[#0D387F] sm:text-5xl lg:leading-[1.12]">
            {ctaLine1}
            <br />
            {ctaLine2Before} <span className="text-[#E0182D]">{ctaLine2Accent}</span> {ctaLine2After}
          </h3>

          <p className="mt-6 max-w-[920px] text-base leading-[1.55] text-[#123B82] sm:text-xl lg:leading-[1.35]">
            {ctaDescriptionLine1}
            <br className="hidden sm:block" /> {ctaDescriptionLine2}
          </p>

          <Button
            asChild
            className="mt-9 h-auto rounded-full bg-[#0B3A89] px-10 py-2 text-xl font-semibold text-white hover:bg-[#0A3277] focus-visible:ring-2 focus-visible:ring-[#0F3C93] focus-visible:ring-offset-2 lg:mt-11"
          >
            <Link href="https://www.omegatheme.com/" target="_blank" rel="noreferrer">
              {ctaButton}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
