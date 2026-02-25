import Image from 'next/image';

export type LibraryImageItem = {
  src: string;
  alt: string;
};

type ImageLibrarySectionProps = {
  title: string;
  images: LibraryImageItem[];
};

const desktopCardClasses = [
  'w-70 sm:w-90 lg:w-105',
  'w-80 sm:w-105 lg:w-125',
  'w-80 sm:w-105 lg:w-125',
  'w-60 sm:w-80 lg:w-95',
];

export function ImageLibrarySection({ title, images }: ImageLibrarySectionProps) {
  if (!images.length) {
    return null;
  }

  const midpoint = Math.ceil(images.length / 2);
  const firstRow = images.slice(0, midpoint);
  const secondRow = images.slice(midpoint);

  if (!firstRow.length || !secondRow.length) {
    return null;
  }

  const topRowHeight = 'h-55 sm:h-70 lg:h-95';
  const bottomRowHeight = 'h-60 sm:h-78 lg:h-100';

  return (
    <section className="bg-[#F3F5F8] py-20 lg:py-24 xl:py-28">
      <div className="mx-auto max-w-360 px-6 lg:px-20 xl:px-40">
        <h2 className="text-center text-4xl leading-[1.3] font-semibold text-[#002A6A] md:text-5xl xl:text-[64px]">
          {title}
        </h2>
      </div>

      <div className="mt-12 space-y-4 overflow-hidden sm:mt-14 lg:mt-16">
        <div className="library-marquee-track flex w-max gap-4">
          {[firstRow, firstRow].map((group, groupIndex) => (
            <div key={`top-group-${groupIndex}`} className="flex shrink-0 gap-4">
              {group.map((item, index) => (
                <article
                  key={`top-${groupIndex}-${item.src}-${index}`}
                  className={`relative shrink-0 overflow-hidden bg-[#E9EEF8] ${desktopCardClasses[index] ?? 'w-70 lg:w-105'} ${topRowHeight}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className="library-marquee-track-reverse flex w-max gap-4">
          {[secondRow, secondRow].map((group, groupIndex) => (
            <div key={`bottom-group-${groupIndex}`} className="flex shrink-0 gap-4">
              {group.map((item, index) => (
                <article
                  key={`bottom-${groupIndex}-${item.src}-${index}`}
                  className={`relative shrink-0 overflow-hidden bg-[#E9EEF8] ${desktopCardClasses[index] ?? 'w-70 lg:w-105'} ${bottomRowHeight}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />

                  {groupIndex === 1 && index === group.length - 1 ? (
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(243,245,248,0)_0%,rgba(243,245,248,0.72)_55%,rgba(243,245,248,0.96)_100%)]" />
                  ) : null}
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
