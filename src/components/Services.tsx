import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowRightIcon, CheckIcon } from "./ui/Icons";

/**
 * Diensten zoals een hovenier ze daadwerkelijk verkoopt. Elke kaart beantwoordt
 * in één zin "wat doen jullie precies", met drie concrete punten en een
 * richtprijs — de informatie waar klanten in deze branche op zoeken.
 */
export function Services() {
  const { services, servicesIntro, cta, display, demoMode } = siteConfig;
  /**
   * Richtprijzen staan standaard uit in het master-template (zie
   * site.ts → display.showPriceIndications). Staan ze aan terwijl de site nog
   * in demomodus draait, dan worden ze expliciet als voorbeeld gelabeld.
   */
  const showPrices = display.showPriceIndications;
  const priceSuffix = demoMode ? " (voorbeeldprijs)" : "";
  const [lead, ...rest] = services;

  return (
    <section id="diensten" className="section bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">{servicesIntro.eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
            {servicesIntro.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {servicesIntro.subtitle}
          </p>
        </div>

        {/* Eerste dienst groter: geeft de sectie hiërarchie en toont het beeld beter */}
        <div className="mt-9 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          <article
            id={lead.id}
            className="reveal group flex flex-col overflow-hidden border border-sand-dark bg-white md:col-span-2 md:flex-row"
          >
            <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-[45%]">
              <Image
                src={lead.image}
                alt={lead.imageAlt}
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <h3 className="text-2xl text-brand">{lead.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">
                {lead.description}
              </p>
              <ul className="mt-4 space-y-2">
                {lead.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[0.95rem]">
                    <CheckIcon className="mt-0.5 h-[1.1rem] w-[1.1rem] text-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                {showPrices && lead.priceIndication && (
                  <span className="text-sm font-semibold text-brand">
                    {lead.priceIndication}
                    {priceSuffix}
                  </span>
                )}
                <a
                  href={cta.primary.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                >
                  {cta.primary.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {rest.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="reveal flex flex-col overflow-hidden border border-sand-dark bg-white"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="text-xl text-brand">{service.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-3.5 space-y-1.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2 text-[0.9rem]">
                      <CheckIcon className="mt-0.5 h-4 w-4 text-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {showPrices && service.priceIndication && (
                  <p className="mt-auto pt-5 text-sm font-semibold text-brand">
                    {service.priceIndication}
                    {priceSuffix}
                  </p>
                )}
              </div>
            </article>
          ))}

          {/* Vult de laatste cel van het raster en herhaalt de primaire actie
              precies daar waar iemand klaar is met vergelijken. */}
          <div className="flex flex-col justify-center bg-brand p-6 text-cream md:p-7">
            <h3 className="text-xl text-white">
              {servicesIntro.ctaCard.title}
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-cream/80">
              {servicesIntro.ctaCard.body}
            </p>
            <a href={cta.primary.href} className="btn btn-primary mt-5 w-full">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
