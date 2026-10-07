import { siteConfig } from "@/config/site";
import { whatsappHref } from "@/lib/contact";
import { ArrowRightIcon, WhatsAppIcon } from "./ui/Icons";

/**
 * Compacte conversiebrug halverwege de pagina. Wie na het werk overtuigd is,
 * hoeft niet eerst langs de rest van de pagina te scrollen. Bewust één
 * primaire knop; WhatsApp staat er als tekstlink naast zodat de hiërarchie
 * ongemoeid blijft.
 */
export function ConversionBridge() {
  const { conversionBridge, cta, business } = siteConfig;

  return (
    <section aria-label={conversionBridge.title} className="bg-cream">
      <div className="container-x">
        <div className="flex flex-col gap-5 border-y border-sand-dark py-8 md:flex-row md:items-center md:justify-between md:gap-10 md:py-9">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-[1.75rem]">
              {conversionBridge.title}
            </h2>
            <p className="mt-1.5 leading-relaxed text-muted">
              {conversionBridge.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={cta.primary.href}
              className="btn btn-primary w-full whitespace-nowrap sm:w-auto sm:!px-7"
            >
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
            <a
              href={whatsappHref("photos")}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-[0.95rem] font-semibold text-brand hover:text-accent hover:underline"
            >
              <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] text-[#1faa53]" />
              {business.whatsapp.photoPromptShort}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
