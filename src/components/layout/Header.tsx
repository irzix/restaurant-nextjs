"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

function CrestLogo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-header-accent"
      aria-hidden
    >
      <path
        d="M5 25C10 20 15 30 20 25C25 20 30 30 35 25"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M5 20C10 15 15 25 20 20C25 15 30 25 35 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-60"
      />
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1" className="opacity-20" />
    </svg>
  );
}

function MenuCloseIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-6 w-6" aria-hidden>
      <span
        className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out origin-center ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1.5"
          }`}
      />
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-in-out origin-center ${open ? "opacity-0" : "opacity-100"
          }`}
      />
      <span
        className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out origin-center ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1.5"
          }`}
      />
    </span>
  );
}

const LOCALES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const MENU_LINKS = [
    { href: "/", label: t('home') },
    { href: "/#our-story-heading", label: t('about') },
    { href: "/menu", label: t('menu') },
    { href: "/events", label: t('events') },
    { href: "/blog", label: t('blog') },
    { href: "/contact", label: t('contact') },
  ] as const;

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const requestClose = (href?: string) => {
    if (href) setPendingHref(href);
    setIsClosing(true);
  };

  const handleMenuEnd = () => {
    if (!isClosing) return;
    setOpen(false);
    setIsClosing(false);
    if (pendingHref) {
      router.push(pendingHref as any);
      setPendingHref(null);
    }
  };

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setShowLangMenu(false);
  };

  const currentLocale = LOCALES.find(l => l.code === locale);

  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-50 px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-header-accent transition-opacity hover:opacity-80" aria-label="Kyma Cyprus home">
            <CrestLogo />
          </Link>

          <Link
            href="/"
            className="font-allura text-4xl tracking-wide text-header-accent text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Kyma
          </Link>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="text-header-accent transition-opacity hover:opacity-80 text-2xl"
                aria-label="Change language"
              >
                {currentLocale?.flag}
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 bg-[#1a1a1a] rounded-lg shadow-xl border border-header-accent/20 py-2 min-w-[150px] z-50">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.code}
                      onClick={() => changeLocale(loc.code)}
                      className={`w-full px-4 py-2 text-left hover:bg-header-accent/10 transition-colors flex items-center gap-2 ${locale === loc.code ? 'text-header-accent' : 'text-white'
                        }`}
                    >
                      <span>{loc.flag}</span>
                      <span className="text-sm">{loc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => (open ? requestClose() : setOpen(true))}
              className="text-header-accent transition-opacity hover:opacity-80"
              aria-expanded={open}
              aria-label={open ? t('closeMenu') : t('openMenu')}
            >
              <MenuCloseIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <nav
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-14 bg-header-bg ${isClosing ? "animate-menu-out" : "animate-menu-in"}`}
          aria-label="Mobile menu"
          onAnimationEnd={handleMenuEnd}
        >
          {MENU_LINKS.map(({ href, label }) => {
            const [path, anchor] = href.split("#");
            const isActive =
              pathname === (path || "/") &&
              (!anchor || hash === `#${anchor}`);
            return (
              <Link
                key={href + label}
                href={href as any}
                className={`font-barlow text-5xl font-extralight uppercase tracking-widest transition-colors hover:text-header-accent ${isActive ? "text-header-accent" : "text-white"}`}
                onClick={(e) => {
                  e.preventDefault();
                  requestClose(href);
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </>
  );
}
