import type { ReactNode } from 'react';

import { HeroNavbar } from '@/components/home/hero-navbar';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeroNavbar />
      {children}
    </>
  );
}
