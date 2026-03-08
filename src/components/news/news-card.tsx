import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

export type NewsCardProps = {
  image: string;
  title: string;
  date: string;
  href: string;
  className?: string;
  titleClassName?: string;
};

export function NewsCard({ image, title, date, href, className, titleClassName }: NewsCardProps) {
  return (
    <article className={cn(className)}>
      <Link href={href} className="group block space-y-4">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={360}
            height={280}
            className="h-70 w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-70 w-full rounded-md bg-linear-to-br from-[#E9EEF8] via-[#DCE6F6] to-[#CCD9F0]"
          />
        )}
        <div className="space-y-2.5">
          <p className="text-sm font-medium tracking-[-0.01em] text-[#7A8397]">{date}</p>
          <h3
            className={cn(
              'text-xl leading-[1.35] font-semibold tracking-[-0.02em] text-[#23406F] transition-colors duration-300 group-hover:text-[#0D3D94]',
              titleClassName,
            )}
          >
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
