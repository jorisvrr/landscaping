import { siteConfig } from "@/config/site";
import { telHref } from "@/lib/contact";
import { ChevronDownIcon, PhoneIcon } from "./ui/Icons";

/**
 * Antwoorden op de bezwaren die mensen tegenhouden om contact op te nemen.
 * Native <details>: openklappen kost geen regel JavaScript.
 */
export function Faq() {
  const { faq, business } = siteConfig;

  return (
    <section id="faq" className="section bg-cream">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
            {faq.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{faq.aside}</p>
          <a href={telHref} className="btn btn-outline mt-5 w-full sm:w-fit">
            <PhoneIcon />
            {business.phone.display}
          </a>
        </div>

        <div className="divide-y divide-sand-dark border-y border-sand-dark">
          {faq.items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-serif text-lg text-ink marker:hidden md:text-xl">
                {item.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <p className="pr-8 pb-4 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
