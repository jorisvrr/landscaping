import Image from "next/image";
import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contact";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon } from "./ui/Icons";

/**
 * Geschreven rond de vragen die mensen écht hebben voordat ze een hovenier
 * bellen: komen ze opdagen, krijg ik iemand aan de lijn, klopt de prijs.
 */
export function WhyUs() {
  const { whyUs, cta } = siteConfig;

  return (
    <section id="waarom" className="section bg-brand text-cream">
      <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="eyebrow !text-cream/60">{whyUs.eyebrow}</p>
          <h2 className="mt-2 text-3xl text-white md:text-[2.6rem] md:leading-tight">
            {whyUs.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            {whyUs.intro}
          </p>

          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden lg:block">
            <Image
              src={whyUs.image}
              alt={whyUs.imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:mt-8">
            <a href={cta.primary.href} className="btn btn-primary">
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              className="btn border border-white/35 bg-transparent text-white hover:bg-white/10"
            >
              <WhatsAppIcon />
              {cta.whatsapp.label}
            </a>
          </div>
        </div>

        <ul className="grid auto-rows-min content-start gap-x-10 gap-y-8 sm:grid-cols-2">
          {whyUs.reasons.map((reason) => (
            <li key={reason.title} className="reveal">
              <h3 className="flex items-start gap-2.5 text-lg text-white">
                <CheckIcon className="mt-1 h-[1.15rem] w-[1.15rem] shrink-0 text-accent" />
                {reason.title}
              </h3>
              <p className="mt-1.5 pl-[1.8rem] leading-relaxed text-cream/75">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
