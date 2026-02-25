'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter, type AppLocale } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const LOCALE_ITEMS: Array<{ code: AppLocale; label: string }> = [
  { code: 'vi', label: 'VI' },
  { code: 'en', label: 'EN' },
];

function HeroNavLink({ href, label, scrolled }: { href: string; label: string; scrolled: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'relative text-[14px] font-medium tracking-[-0.03em] transition-all duration-300 ease-out after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:transition-all after:duration-300 after:ease-out hover:-translate-y-0.5 hover:after:w-full focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none',
        scrolled
          ? 'text-[#002A6A]/90 after:bg-[#3260EB] hover:text-[#002A6A] focus-visible:ring-[#002A6A]/35'
          : 'text-white/90 after:bg-[#7FB0FF] hover:text-white focus-visible:ring-white/70',
      )}
    >
      {label}
    </Link>
  );
}

function LanguageSwitcher({
  scrolled,
  onSelect,
  mobile = false,
}: {
  scrolled: boolean;
  onSelect?: () => void;
  mobile?: boolean;
}) {
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', onPointerDown);
    return () => window.removeEventListener('mousedown', onPointerDown);
  }, []);

  const activeItem = LOCALE_ITEMS.find((item) => item.code === activeLocale) ?? LOCALE_ITEMS[0];

  return (
    <div ref={rootRef} className="relative inline-block w-fit">
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          'cursor-pointer rounded-full font-semibold tracking-[-0.03em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0',
          mobile ? 'h-11 min-w-[108px] px-5 text-[15px]' : 'px-6 py-2 text-[14px]',
          mobile
            ? scrolled
              ? 'border-[#002A6A]/25 bg-[#002A6A] text-white hover:bg-[#002A6A]'
              : 'border-[#002A6A]/20 bg-white text-[#002A6A] hover:bg-[#002A6A] hover:text-white'
            : scrolled
              ? 'border-[#002A6A]/25 bg-[#002A6A] text-white hover:bg-[#002A6A] hover:text-white hover:shadow-[0_0_0_4px_rgba(0,42,106,0.14)]'
              : 'border-white/90 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#002A6A] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.14)]',
        )}
      >
        {activeItem.label}
        <ChevronDown
          className={cn('ml-1 transition-transform', mobile ? 'h-4 w-4' : 'h-3.5 w-3.5', open ? 'rotate-180' : '')}
        />
      </Button>

      <div
        className={cn(
          'absolute top-[calc(100%+8px)] z-50 origin-top rounded-2xl border p-1 shadow-xl transition-all duration-150',
          mobile ? 'left-0' : 'right-0',
          mobile ? 'w-[108px]' : 'w-21.5',
          scrolled ? 'border-[#d6dfef] bg-white' : 'border-[#d6dfef] bg-white',
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        {LOCALE_ITEMS.map((item) => {
          const isActive = activeLocale === item.code;
          return (
            <button
              key={item.code}
              type="button"
              className={cn(
                'flex w-full cursor-pointer items-center justify-between rounded-xl text-left font-semibold transition-colors',
                mobile ? 'px-3 py-2.5 text-sm' : 'px-3 py-2 text-xs',
                isActive
                  ? 'bg-[#002A6A] text-white'
                  : scrolled
                    ? 'text-[#002A6A] hover:bg-[#edf3ff]'
                    : 'text-[#002A6A] hover:bg-[#002A6A]/10',
              )}
              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: item.code });
                onSelect?.();
              }}
            >
              <span>{item.label}</span>
              {isActive ? <Check className="h-3.5 w-3.5" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DesktopNav({ scrolled }: { scrolled: boolean }) {
  const t = useTranslations('home.nav');
  const locale = useLocale() as AppLocale;
  const homeHref = locale === 'en' ? '/en' : '/';
  const aboutHref = locale === 'en' ? '/en/about' : '/about';
  const navItems = [
    { key: 'ecosystem', href: locale === 'en' ? '/en/ecosystem' : '/ecosystem' },
    { key: 'about', href: aboutHref },
    { key: 'culture', href: locale === 'en' ? '/en/culture' : '/culture' },
    { key: 'careers', href: `${homeHref}#careers` },
    { key: 'news', href: `${homeHref}#news` },
  ] as const;

  return (
    <nav className="hidden items-center gap-8 xl:flex">
      {navItems.map((item) => (
        <HeroNavLink key={item.key} href={item.href} label={t(item.key)} scrolled={scrolled} />
      ))}

      <Button
        variant="outline"
        className={cn(
          'cursor-pointer rounded-full px-6 py-2 text-[14px] font-semibold tracking-[-0.03em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0',
          scrolled
            ? 'border-[#002A6A]/25 bg-[#002A6A] text-white hover:bg-[#002A6A] hover:text-white hover:shadow-[0_0_0_4px_rgba(0,42,106,0.14)]'
            : 'border-white/90 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#002A6A] hover:shadow-[0_0_0_4px_rgba(255,255,255,0.14)]',
        )}
      >
        {t('contact')}
      </Button>
      <LanguageSwitcher scrolled={scrolled} />
    </nav>
  );
}

function MobileTabletMenu({
  open,
  scrolled,
  onOpenChange,
}: {
  open: boolean;
  scrolled: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const t = useTranslations('home.nav');
  const locale = useLocale() as AppLocale;
  const homeHref = locale === 'en' ? '/en' : '/';
  const aboutHref = locale === 'en' ? '/en/about' : '/about';
  const navItems = [
    { key: 'ecosystem', href: locale === 'en' ? '/en/ecosystem' : '/ecosystem' },
    { key: 'about', href: aboutHref },
    { key: 'culture', href: `${homeHref}#culture` },
    { key: 'careers', href: `${homeHref}#careers` },
    { key: 'news', href: `${homeHref}#news` },
  ] as const;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#00112b]/45 transition-opacity duration-300 xl:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-dvh w-[min(86vw,360px)] border-l border-[#d8e0ee] bg-white p-6 shadow-2xl transition-transform duration-300 ease-out xl:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#002A6A]/65 uppercase">{t('menu')}</p>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5 text-[#002A6A]" aria-hidden="true" />
          </Button>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="rounded-xl px-4 py-3 text-[15px] font-medium text-[#002A6A] transition-colors duration-200 hover:bg-[#edf3ff]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <Button
          variant="outline"
          className={cn(
            'mt-8 w-full rounded-full px-6 py-2 text-[14px] font-semibold tracking-[-0.03em]',
            scrolled
              ? 'border-[#002A6A]/25 bg-[#002A6A] text-white hover:bg-[#002A6A]'
              : 'border-[#002A6A]/20 bg-white text-[#002A6A] hover:bg-[#002A6A] hover:text-white',
          )}
          onClick={() => onOpenChange(false)}
        >
          {t('contact')}
        </Button>
        <div className="mt-6">
          <LanguageSwitcher scrolled={scrolled} onSelect={() => onOpenChange(false)} mobile />
        </div>
      </div>
    </>
  );
}

export function HeroNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = useLocale() as AppLocale;
  const homeHref = locale === 'en' ? '/en' : '/';
  const activeLogo = scrolled ? '/images/logo-1.png' : '/images/logo.png';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-all duration-300 sm:px-8 lg:px-12 xl:px-45',
        scrolled
          ? 'border-b border-[#e7ebf3] bg-white/95 shadow-[0_8px_30px_rgba(0,42,106,0.08)] backdrop-blur-sm'
          : 'border-b border-transparent bg-transparent shadow-none',
      )}
    >
      <Link href={homeHref}>
        <Image src={activeLogo} alt="Xipat" width={98} height={32} className="h-8 w-auto transition duration-300" />
      </Link>

      <DesktopNav scrolled={scrolled} />

      <Button
        variant="outline"
        size="icon"
        className={cn(
          'h-10 w-10 rounded-full xl:hidden',
          scrolled
            ? 'border-[#002A6A]/20 bg-white text-[#002A6A] hover:bg-[#f2f6ff]'
            : 'border-white/80 bg-transparent text-white hover:bg-white hover:text-[#002A6A]',
        )}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      <MobileTabletMenu open={menuOpen} scrolled={scrolled} onOpenChange={setMenuOpen} />
    </div>
  );
}
