import { siteConfig } from "@/config/site";
import { CheckIcon, StarIcon } from "./ui/Icons";

export function TrustStrip() {
  const { trust, demoMode, demoLabels } = siteConfig;

  return (
    <section
      aria-label="Waarom klanten ons vertrouwen"
      className="border-b border-sand-dark bg-sand"
    >
      <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:py-4">
        <a
          href={trust.reviewsUrl}
          className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm"
        >
          <span className="flex gap-0.5 text-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-[1.05rem] w-[1.05rem]" />
            ))}
          </span>
          <span className="font-semibold text-ink">
            {trust.rating.toString().replace(".", ",")}
          </span>
          <span className="whitespace-nowrap text-muted">
            uit {trust.reviewCount} {trust.reviewSource}-reviews
            {demoMode && (
              <span className="ml-1.5 rounded-sm bg-ink/8 px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-wide text-muted">
                {demoLabels.badge}
              </span>
            )}
          </span>
        </a>

        <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-7">
          {trust.items.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-ink/85"
            >
              <CheckIcon className="h-[1.1rem] w-[1.1rem] text-brand" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
