import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import {
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

export function Hero() {
  const { hero, cta, business } = siteConfig;

  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrim: onderaan op mobiel, vanaf links op desktop — tekst blijft leesbaar */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/70 to-brand-dark/25 md:bg-gradient-to-r md:from-brand-dark/92 md:via-brand-dark/60 md:to-transparent"
      />

      {/* Volledige viewporthoogte minus de sticky header. Op mobiel houdt de
          onderste padding de vaste actiebalk vrij van de CTA's. */}
      <div className="container-x relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pt-8 pb-[calc(var(--mobile-bar-h)+1.25rem)] lg:min-h-[calc(100svh-5rem)] lg:justify-center lg:py-20">
        <div className="max-w-xl md:max-w-2xl">
          <p className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white/90">
            <MapPinIcon className="h-4 w-4" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-2.5 text-[1.95rem] leading-[1.12] text-white min-[400px]:text-[2.1rem] sm:text-5xl sm:leading-[1.08] md:text-[3.4rem] md:leading-[1.05]">
            {hero.title}
          </h1>

          <p className="mt-3.5 max-w-lg text-[0.98rem] leading-relaxed text-white/85 min-[400px]:text-[1.05rem] md:text-lg">
            {hero.subtitle}
          </p>

          {/* CTA-hiërarchie: één primaire actie, daaronder de directe kanalen */}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <a
              href={cta.primary.href}
              className="btn btn-primary w-full sm:w-auto sm:!px-7"
            >
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-2.5">
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                className="btn btn-light"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#1faa53]" />
                WhatsApp
              </a>
              <a
                href={telHref}
                className="btn border border-white/45 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                aria-label={`Bel ${business.phone.display}`}
              >
                <PhoneIcon className="h-5 w-5" />
                Bellen
              </a>
            </div>
          </div>

          <p className="mt-3.5 max-w-md text-[0.85rem] leading-relaxed text-white/70 sm:text-[0.9rem]">
            {business.whatsapp.photoPrompt}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {hero.badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-1.5 text-[0.82rem] font-medium text-white/90 sm:text-sm"
              >
                <CheckIcon className="h-4 w-4 text-white/70" />
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
