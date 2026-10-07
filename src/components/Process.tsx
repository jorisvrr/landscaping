import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contact";
import { ArrowRightIcon, WhatsAppIcon } from "./ui/Icons";

/** Haalt de drempel weg: laat zien dat "offerte aanvragen" niets kost en nergens toe verplicht. */
export function Process() {
  const { process, cta } = siteConfig;

  return (
    <section id="werkwijze" className="section bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
            {process.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {process.subtitle}
          </p>
        </div>

        <ol className="mt-9 grid gap-x-8 gap-y-8 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className="reveal border-t-2 border-brand/15 pt-5">
              <span className="font-serif text-[2.6rem] leading-none font-semibold text-accent/85">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl text-brand">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col gap-2.5 sm:flex-row">
          <a href={cta.primary.href} className="btn btn-primary">
            {cta.primary.label}
            <ArrowRightIcon />
          </a>
          <a
            href={whatsappHref("photos")}
            target="_blank"
            rel="noopener"
            className="btn btn-outline"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#1faa53]" />
            {process.whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
