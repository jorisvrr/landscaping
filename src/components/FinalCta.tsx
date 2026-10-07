import Image from "next/image";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "./ui/Icons";

export function FinalCta() {
  const { finalCta, cta, business, projects } = siteConfig;

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={projects[2].image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand-dark/80"
      />
      <div className="container-x relative py-16 text-center md:py-24">
        <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-[2.75rem] md:leading-tight">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/85">
          {finalCta.body}
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-2.5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center">
          <a
            href={cta.primary.href}
            className="btn btn-primary whitespace-nowrap sm:!px-8"
          >
            {cta.primary.label}
            <ArrowRightIcon />
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
            className="btn btn-whatsapp whitespace-nowrap"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
          <a
            href={telHref}
            className="btn border border-white/40 bg-white/10 whitespace-nowrap text-white hover:bg-white/20"
          >
            <PhoneIcon />
            {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
