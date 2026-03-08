'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import enMessages from '@/messages/en.json';
import viMessages from '@/messages/vi.json';
import { ErrorPageShell } from '@/components/errors/error-page-shell';
import { Button } from '@/components/ui/button';

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const homeHref = isEnglish ? '/en' : '/';
  const copy = (isEnglish ? enMessages : viMessages).errors.serverError;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageShell
      code={copy.code}
      title={copy.title}
      description={copy.description}
      primaryAction={
        <Button onClick={reset} className="h-11 cursor-pointer rounded-full bg-[#DB1721] px-6 text-white hover:bg-[#C8141D]">
          {copy.tryAgain}
        </Button>
      }
      secondaryAction={
        <Button asChild variant="outline" className="h-11 rounded-full px-6">
          <Link href={homeHref}>{copy.goHome}</Link>
        </Button>
      }
    />
  );
}
