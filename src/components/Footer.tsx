import Link from "next/link";
import { siteConfig } from "@/config/site";
import { mailHref, telHref, whatsappHref } from "@/lib/contact";
import {
  ClockIcon,
  LeafMark,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

export function Footer() {
  const { business, services, serviceArea, footer, nav } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-cream/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <LeafMark className="h-9 w-9 text-accent" />
            <span className="font-serif text-lg font-semibold text-white">
              {business.name}
            </span>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed">{footer.about}</p>
          <ul className="mt-5 flex gap-4 text-sm">
            {business.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="hover:text-white hover:underline"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wider text-white uppercase">
            Diensten
          </h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {services.map((service) => (
              <li key={service.id}>
                <a
                  href={`#${service.id}`}
                  className="hover:text-white hover:underline"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wider text-white uppercase">
            Werkgebied
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[0.95rem] lg:grid-cols-1 lg:gap-y-2">
            {serviceArea.places.slice(0, 8).map((place) => (
              <li key={place}>Hovenier {place}</li>
            ))}
          </ul>
          <nav className="mt-5" aria-label="Footernavigatie">
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem]">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wider text-white uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            <li>
              <a
                href={telHref}
                className="flex items-center gap-2.5 font-semibold text-white hover:underline"
              >
                <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
                {business.phone.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2.5 hover:text-white hover:underline"
              >
                <WhatsAppIcon className="h-[1.1rem] w-[1.1rem]" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailHref}
                className="flex items-center gap-2.5 break-all hover:text-white hover:underline"
              >
                <MailIcon className="h-[1.1rem] w-[1.1rem]" />
                {business.email}
              </a>
            </li>
            {business.address.showOnSite && (
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-[1.1rem] w-[1.1rem]" />
                <address className="not-italic">
                  {business.address.street}
                  <br />
                  {business.address.postalCode} {business.address.city}
                </address>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 h-[1.1rem] w-[1.1rem]" />
              <span>
                {business.hours.map((entry) => (
                  <span key={entry.days} className="block">
                    {entry.days}: {entry.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName} · KvK {business.kvk} · BTW{" "}
            {business.btw}
          </p>
          <ul className="flex gap-4">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
