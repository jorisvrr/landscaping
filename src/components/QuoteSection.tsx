import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import { QuoteForm } from "./QuoteForm";
import {
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

export function QuoteSection() {
  const { quote, business, demoMode, demoLabels, guarantees } = siteConfig;

  return (
    <section id="offerte" className="section bg-brand text-cream scroll-mt-20">
      <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="lg:pt-4">
          <p className="eyebrow !text-cream/60">{quote.eyebrow}</p>
          <h2 className="mt-2 text-3xl text-white md:text-[2.6rem] md:leading-tight">
            {quote.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/80">
            {quote.subtitle}
          </p>

          <ul className="mt-7 space-y-3">
            {guarantees.map((item) => (
              <li key={item} className="flex gap-2.5 text-cream/85">
                <CheckIcon className="mt-0.5 h-[1.15rem] w-[1.15rem] shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

          {/* Wie liever belt of appt, hoeft het formulier niet in */}
          <div className="mt-8 border-t border-white/15 pt-7">
            <p className="text-sm font-semibold tracking-wide text-cream/60 uppercase">
              {quote.directContactTitle}
            </p>
            <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
              <a href={telHref} className="btn btn-light flex-1">
                <PhoneIcon />
                {business.phone.display}
              </a>
              <a
                href={whatsappHref("photos")}
                target="_blank"
                rel="noopener"
                className="btn btn-whatsapp flex-1"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-cream/70">
              <ClockIcon className="h-4 w-4" />
              {business.hoursSummary}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              {business.whatsapp.photoPrompt}
            </p>
          </div>
        </div>

        <div>
          <QuoteForm />
          {demoMode && (
            <p className="mt-3 text-sm text-cream/60">
              {demoLabels.quoteNotice}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
