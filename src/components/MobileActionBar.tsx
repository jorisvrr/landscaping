"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contact";
import { ArrowRightIcon, WhatsAppIcon } from "./ui/Icons";

/**
 * Vaste actiebalk onderaan op mobiel.
 *
 * Bewust twee acties in plaats van drie: één duidelijk primaire knop
 * (Offerte aanvragen) en één secundaire. WhatsApp staat hier en niet Bellen,
 * omdat bellen al permanent in de sticky header zit als telefoonknop — en
 * omdat foto's sturen bij een hovenier de laagste drempel is.
 *
 * - De body heeft padding-bottom (globals.css), dus de balk dekt nooit content af.
 * - Zodra het offerteformulier zelf in beeld is, verdwijnt de balk: anders zit
 *   hij in de weg bij het invullen op een klein scherm.
 */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);
  const { cta } = siteConfig;

  useEffect(() => {
    const target = document.querySelector("#offerte");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "-20% 0px -35% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-cream/97 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={whatsappHref("photos")}
          target="_blank"
          rel="noopener"
          className="btn btn-outline flex-1 !gap-1.5 !px-2 !text-[0.9rem]"
          aria-label={cta.whatsapp.label}
        >
          <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] text-[#1faa53]" />
          {cta.whatsapp.labelShort}
        </a>
        {/* Primaire actie: duidelijk breder en de enige gevulde knop */}
        <a
          href={cta.primary.href}
          className="btn btn-primary flex-[1.6] !gap-1.5 !px-2 !text-[0.9rem]"
        >
          {cta.primary.label}
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
