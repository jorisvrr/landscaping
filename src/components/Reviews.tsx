import { siteConfig } from "@/config/site";
import { ArrowRightIcon, StarIcon } from "./ui/Icons";

const MONTHS = [
  "januari", "februari", "maart", "april", "mei", "juni",
  "juli", "augustus", "september", "oktober", "november", "december",
];

function formatMonth(value: string) {
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  return MONTHS[index] ? `${MONTHS[index]} ${year}` : value;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="flex gap-0.5 text-accent"
      role="img"
      aria-label={`${rating} van de 5 sterren`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`h-[1.05rem] w-[1.05rem] ${i < rating ? "" : "text-ink/15"}`}
        />
      ))}
    </span>
  );
}

/**
 * DEMO: de reviews in site.ts zijn verzonnen voorbeelden. Zolang
 * demoMode: true staat, is dat ook zichtbaar op de pagina — zodat niemand ze
 * per ongeluk voor echte klantreviews aanziet.
 */
export function Reviews() {
  const { reviews, reviewsSection, trust, demoMode, demoLabels } = siteConfig;
  if (!reviewsSection.show) return null;

  return (
    <section id="reviews" className="section bg-white">
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{reviewsSection.eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
              {reviewsSection.title}
            </h2>
          </div>

          {/* Plek voor de echte Google-score en een link naar het bedrijfsprofiel.
              In demomodus draagt dit blok zelf het "voorbeeld"-label, zodat het
              cijfer nooit los van die context gelezen kan worden. */}
          <div
            className={`relative flex items-center gap-4 border bg-cream px-5 py-4 ${
              demoMode
                ? "border-dashed border-ink/30"
                : "border-solid border-sand-dark"
            }`}
          >
            {demoMode && (
              <span className="absolute -top-2.5 left-4 bg-ink px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.1em] text-cream uppercase">
                {demoLabels.badge}
              </span>
            )}
            <div>
              <p className="font-serif text-3xl leading-none font-semibold text-brand">
                {trust.rating.toString().replace(".", ",")}
              </p>
              <Stars rating={Math.round(trust.rating)} />
            </div>
            <div className="text-sm leading-snug text-muted">
              <p className="font-semibold text-ink">
                {trust.reviewSource}-beoordeling
              </p>
              <p>{trust.reviewCount} reviews</p>
              <a
                href={reviewsSection.googleProfileUrl}
                target="_blank"
                rel="noopener"
                className="mt-0.5 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Bekijk op Google
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {demoMode && (
          <p className="mt-6 border-l-[3px] border-accent bg-cream px-4 py-3 text-sm text-muted">
            <strong className="font-semibold text-ink">
              {demoLabels.reviewsNoticeTitle}
            </strong>{" "}
            {demoLabels.reviewsNoticeBody}
          </p>
        )}

        <ul className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.date}`}
              className="reveal flex flex-col border border-sand-dark bg-cream p-5"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-3 leading-relaxed text-ink/90">
                “{review.text}”
              </blockquote>
              <div className="mt-auto pt-5 text-sm">
                <p className="font-semibold text-ink">
                  {review.name} — {review.place}
                </p>
                <p className="text-muted">
                  {review.job} · {formatMonth(review.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
