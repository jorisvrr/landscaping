import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from "./ui/Icons";

/**
 * Werkgebied. Eén sectie met alle plaatsnamen — geen tientallen losse
 * locatiepagina's. Goed voor de bezoeker ("werken ze bij mij?") en voldoende
 * lokale context voor zoekmachines.
 */
export function ServiceArea() {
  const { serviceArea, business, cta } = siteConfig;

  return (
    <section id="regio" className="section bg-sand">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
        <div>
          <p className="eyebrow">{serviceArea.eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
            Actief in {serviceArea.regionLong}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {serviceArea.intro}
          </p>

          {business.address.showOnSite && (
            <address className="mt-6 flex items-start gap-2.5 text-[0.95rem] not-italic text-ink/85">
              <MapPinIcon className="mt-0.5 h-5 w-5 text-brand" />
              <span>
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
              </span>
            </address>
          )}

          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <a href={cta.primary.href} className="btn btn-primary">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <a href={telHref} className="btn btn-outline">
              <PhoneIcon />
              {business.phone.display}
            </a>
          </div>
        </div>

        <div>
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {serviceArea.places.map((place) => (
              <li
                key={place}
                className="flex items-center gap-2 border-b border-sand-dark py-3 text-[0.95rem] font-medium text-ink/90"
              >
                <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                {place}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.95rem] text-muted">{serviceArea.note}</p>
        </div>
      </div>
    </section>
  );
}
