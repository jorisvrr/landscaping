import Image from "next/image";
import { siteConfig } from "@/config/site";
import { BeforeAfter } from "./BeforeAfter";
import { ArrowRightIcon, MapPinIcon } from "./ui/Icons";

/**
 * Projecten. Voor een hovenier is dít het bewijsmateriaal: grote foto's,
 * waar het stond, en wat er precies is gedaan.
 *
 * DEMO: de projecten in site.ts zijn voorbeelden met stockfoto's. Met
 * demoMode: true staat er een zichtbaar "voorbeeld"-label bij.
 */
export function Projects() {
  const { projects, projectsIntro, cta, demoMode, demoLabels } = siteConfig;
  const [featured, ...others] = projects;

  return (
    <section id="projecten" className="section bg-sand">
      <div className="container-x">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{projectsIntro.eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-[2.6rem] md:leading-tight">
              {projectsIntro.title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              {projectsIntro.subtitle}
            </p>
          </div>
          {demoMode && (
            <p className="shrink-0 border border-ink/15 bg-cream px-3 py-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
              {demoLabels.projectsBadge}
            </p>
          )}
        </div>

        {/* Uitgelicht project met voor/na-vergelijking */}
        <div className="reveal mt-9 grid gap-0 overflow-hidden border border-sand-dark bg-cream lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {featured.beforeImage ? (
            <BeforeAfter
              beforeImage={featured.beforeImage}
              beforeAlt={featured.beforeImageAlt ?? ""}
              afterImage={featured.image}
              afterAlt={featured.imageAlt}
            />
          ) : (
            <div className="relative aspect-[16/10]">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col justify-center p-6 md:p-9">
            <p className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <MapPinIcon className="h-4 w-4" />
              {featured.place}
            </p>
            <h3 className="mt-2 text-2xl text-brand md:text-[1.75rem]">
              {featured.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted">
              {featured.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {featured.scope.map((item) => (
                <li
                  key={item}
                  className="border border-brand/20 bg-white px-2.5 py-1 text-[0.8rem] font-medium text-brand"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={cta.primary.href}
              className="btn btn-primary mt-7 w-full sm:w-fit"
            >
              {cta.primary.label}
              <ArrowRightIcon />
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {others.map((project) => (
            <article
              key={project.title}
              className="reveal flex flex-col overflow-hidden border border-sand-dark bg-cream"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPinIcon className="h-4 w-4" />
                  {project.place}
                </p>
                <h3 className="mt-1.5 text-xl text-brand">{project.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  {project.summary}
                </p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {project.scope.map((item) => (
                    <li
                      key={item}
                      className="border border-brand/15 px-2 py-0.5 text-[0.75rem] font-medium text-brand/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
