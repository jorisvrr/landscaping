"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import {
  ArrowRightIcon,
  CloseIcon,
  LeafMark,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const { business, nav, cta } = siteConfig;

  // Achtergrond niet laten meescrollen zolang het menu openstaat
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sand-dark/70 bg-cream/95 backdrop-blur-sm">
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label={`${business.name} — naar boven`}
        >
          {business.logoSrc ? (
            <Image
              src={business.logoSrc}
              alt={business.name}
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          ) : (
            <>
              <LeafMark className="h-9 w-9 text-brand" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-tight text-brand">
                  {business.name}
                </span>
                <span className="mt-0.5 hidden text-[0.7rem] font-medium tracking-wide text-muted sm:block">
                  {business.tagline}
                </span>
              </span>
            </>
          )}
        </a>

        {/* ── Desktop ─────────────────────────────────────────────────── */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Hoofdnavigatie"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={telHref}
            className="flex items-center gap-2 rounded px-2 py-1 text-[0.95rem] font-semibold whitespace-nowrap text-brand transition-colors hover:text-accent"
          >
            <PhoneIcon className="h-4 w-4" />
            {business.phone.display}
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
            className="btn btn-outline !min-h-11 !px-3.5 !text-[0.95rem]"
            aria-label={cta.whatsapp.label}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
          <a
            href={cta.primary.href}
            className="btn btn-primary !min-h-11 whitespace-nowrap !text-[0.95rem]"
          >
            {cta.primary.label}
            <ArrowRightIcon />
          </a>
        </div>

        {/* ── Mobiel ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href={telHref}
            className="flex h-11 w-11 items-center justify-center rounded text-brand"
            aria-label={`Bel ${business.name} op ${business.phone.display}`}
          >
            <PhoneIcon className="h-[1.3rem] w-[1.3rem]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded text-brand"
            aria-label="Menu openen"
            aria-expanded={open}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      </header>

      {/* ── Mobiel menu ─────────────────────────────────────────────────
          Bewust buiten <header>: die heeft backdrop-blur, en dat maakt van
          de header een containing block voor position: fixed. */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden">
          <div className="container-x flex h-16 items-center justify-between">
            <span className="flex items-center gap-2.5">
              <LeafMark className="h-8 w-8 text-brand" />
              <span className="font-serif text-lg font-semibold text-brand">
                {business.name}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded text-brand"
              aria-label="Menu sluiten"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            className="container-x flex-1 overflow-y-auto pt-4"
            aria-label="Mobiele navigatie"
          >
            <ul className="divide-y divide-sand-dark/70 border-y border-sand-dark/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 font-serif text-xl text-ink"
                  >
                    {item.label}
                    <ArrowRightIcon className="h-4 w-4 text-muted" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-2.5">
              <a
                href={siteConfig.cta.primary.href}
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                {cta.primary.label}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                className="btn btn-whatsapp w-full"
              >
                <WhatsAppIcon />
                {cta.whatsapp.label}
              </a>
              <a href={telHref} className="btn btn-outline w-full">
                <PhoneIcon />
                {business.phone.display}
              </a>
            </div>

            <p className="mt-5 pb-8 text-center text-sm text-muted">
              {business.hoursSummary}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
