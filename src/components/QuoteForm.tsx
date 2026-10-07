"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import {
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

/**
 * Offerteflow in vier stappen:
 *   1. Werkzaamheden  2. Locatie  3. Planning  4. Contactgegevens
 *
 * Opzet:
 *  - Stap 1 vraagt alleen een tik: geen formulier in beeld bij binnenkomst.
 *  - Locatie komt vroeg: de bezoeker ziet meteen dat hij in het werkgebied
 *    valt, en de aanvraag kwalificeert zichzelf.
 *  - Contactgegevens komen pas in stap 4, als iemand al geïnvesteerd heeft.
 *  - Alles blijft in één scherm; geen routing, geen formulierbibliotheek.
 *
 * Alle vraagteksten en keuzes staan in siteConfig.quote.
 *
 * PRODUCTIE: de inzending gaat naar /api/quote. Zie src/app/api/quote/route.ts
 * voor de plek waar je e-mail, een webhook, een CRM of een afsprakentool
 * koppelt. Het veld `wantsVisit` is het haakje voor scheduling-software.
 */

type FormState = {
  services: string[];
  postcode: string;
  place: string;
  size: string;
  timing: string;
  wantsVisit: boolean;
  name: string;
  phone: string;
  email: string;
  message: string;
};

const EMPTY: FormState = {
  services: [],
  postcode: "",
  place: "",
  size: "",
  timing: "",
  wantsVisit: true,
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function QuoteForm() {
  const { quote, services, serviceArea, business, demoMode, demoLabels } =
    siteConfig;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const stepCount = quote.stepLabels.length;
  const choices = services.filter((s) => s.inQuoteFlow);
  const canContinue =
    (step === 0 && form.services.length > 0) ||
    (step === 1 && form.postcode.trim() !== "" && form.place.trim() !== "") ||
    (step === 2 && form.timing !== "");

  /**
   * Bij een stapwissel verandert de hoogte van het formulier. Zonder dit staat
   * iemand op mobiel ineens halverwege de volgende vraag te kijken.
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  function toggleService(title: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(title)
        ? f.services.filter((s) => s !== title)
        : [...f.services, title],
    }));
  }

  /** De planningsstap springt automatisch door: scheelt een tik. */
  function pickTiming(value: string) {
    setForm((f) => ({ ...f, timing: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, stepCount - 1)), 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={panelRef}
        className="scroll-mt-24 bg-white p-6 text-center text-ink sm:p-7 md:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl text-brand">{quote.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          {quote.successBody}
        </p>
        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <a href={telHref} className="btn btn-outline flex-1">
            <PhoneIcon />
            {business.phone.display}
          </a>
          <a
            href={whatsappHref("quote")}
            target="_blank"
            rel="noopener"
            className="btn btn-whatsapp flex-1"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
        {demoMode && (
          <p className="mt-6 text-sm text-muted">
            {demoLabels.quoteSuccessNotice}
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={panelRef} className="scroll-mt-24 bg-white text-ink">
      {/* Voortgang: laat zien dat het kort is */}
      <div className="border-b border-sand-dark px-5 pt-5 pb-4 md:px-8">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="font-semibold text-brand">
            Stap {step + 1} van {stepCount}
            <span className="ml-2 font-normal text-muted">
              {quote.stepLabels[step]}
            </span>
          </p>
          <p className="shrink-0 text-muted">{quote.estimatedTime}</p>
        </div>
        <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
          {quote.stepLabels.map((label, i) => (
            <span
              key={label}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-sand-dark"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 md:p-8">
        {/* ── Stap 1: werkzaamheden ──────────────────────────────────── */}
        {step === 0 && (
          <fieldset>
            <legend className="font-serif text-xl text-brand md:text-2xl">
              {quote.steps.work.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.work.help}
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {choices.map((service) => {
                const active = form.services.includes(service.title);
                return (
                  <label
                    key={service.id}
                    className={`flex cursor-pointer items-center gap-3 border p-4 text-[0.95rem] font-medium transition-colors ${
                      active
                        ? "border-brand bg-brand/5 text-brand"
                        : "border-sand-dark hover:border-brand/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleService(service.title)}
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border ${
                        active
                          ? "border-brand bg-brand text-white"
                          : "border-ink/25"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <CheckIcon className="h-3.5 w-3.5" />}
                    </span>
                    {service.title}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {/* ── Stap 2: locatie ────────────────────────────────────────── */}
        {step === 1 && (
          <fieldset>
            <legend className="font-serif text-xl text-brand md:text-2xl">
              {quote.steps.location.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.location.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Postcode"
                name="postcode"
                autoComplete="postal-code"
                placeholder="2311 AB"
                required
                value={form.postcode}
                onChange={(v) => setForm((f) => ({ ...f, postcode: v }))}
              />
              <div className="flex min-w-0 flex-col">
                <label
                  htmlFor="place"
                  className="text-sm font-semibold text-ink"
                >
                  Plaats
                </label>
                <input
                  id="place"
                  name="place"
                  list="service-area-places"
                  required
                  autoComplete="address-level2"
                  value={form.place}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, place: e.target.value }))
                  }
                  className="mt-1.5 min-h-12 w-full border border-sand-dark bg-cream px-3.5 text-base outline-none focus:border-brand"
                />
                <datalist id="service-area-places">
                  {serviceArea.places.map((place) => (
                    <option key={place} value={place} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Optionele kwalificatie — mag leeg blijven */}
            <div className="mt-5 flex min-w-0 flex-col">
              <label htmlFor="size" className="text-sm font-semibold text-ink">
                {quote.sizeLabel}{" "}
                <span className="font-normal text-muted">(optioneel)</span>
              </label>
              <select
                id="size"
                name="size"
                value={form.size}
                onChange={(e) =>
                  setForm((f) => ({ ...f, size: e.target.value }))
                }
                className="mt-1.5 min-h-12 w-full border border-sand-dark bg-cream px-3 text-base outline-none focus:border-brand"
              >
                <option value="">Weet ik niet / maakt niet uit</option>
                {quote.sizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-4 text-sm text-muted">
              We werken in {serviceArea.regionLong}, binnen ongeveer{" "}
              {serviceArea.radiusKm} km.
            </p>
          </fieldset>
        )}

        {/* ── Stap 3: planning ───────────────────────────────────────── */}
        {step === 2 && (
          <fieldset>
            <legend className="font-serif text-xl text-brand md:text-2xl">
              {quote.steps.timing.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.timing.help}
            </p>
            <div className="mt-5 grid gap-2.5">
              {quote.timingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => pickTiming(option)}
                  className={`flex items-center justify-between gap-3 border p-4 text-left text-[0.95rem] font-medium transition-colors ${
                    form.timing === option
                      ? "border-brand bg-brand/5 text-brand"
                      : "border-sand-dark hover:border-brand/40"
                  }`}
                >
                  {option}
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* ── Stap 4: contactgegevens ────────────────────────────────── */}
        {step === 3 && (
          <fieldset>
            <legend className="font-serif text-xl text-brand md:text-2xl">
              {quote.steps.contact.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.contact.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Naam"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Telefoonnummer"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <Field
                label="E-mailadres"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="sm:col-span-2"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />

              <div className="flex min-w-0 flex-col sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-ink"
                >
                  Toelichting{" "}
                  <span className="font-normal text-muted">(optioneel)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Bijvoorbeeld: achtertuin van ongeveer 8 bij 10 meter, bereikbaar via een achterom."
                  className="mt-1.5 w-full resize-y border border-sand-dark bg-cream p-3.5 text-base outline-none focus:border-brand"
                />
              </div>
            </div>

            {/* Gratis tuinbezoek: een voorkeur, géén agendaboeking —
                er zit in deze demo geen planningssysteem achter. */}
            <label className="mt-5 flex cursor-pointer gap-3 border border-sand-dark bg-cream p-4">
              <input
                type="checkbox"
                className="sr-only"
                checked={form.wantsVisit}
                onChange={(e) =>
                  setForm((f) => ({ ...f, wantsVisit: e.target.checked }))
                }
              />
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border ${
                  form.wantsVisit
                    ? "border-brand bg-brand text-white"
                    : "border-ink/25 bg-white"
                }`}
                aria-hidden="true"
              >
                {form.wantsVisit && <CheckIcon className="h-3.5 w-3.5" />}
              </span>
              <span className="text-[0.95rem]">
                <span className="font-semibold text-ink">
                  {quote.visit.label}
                </span>
                <span className="mt-0.5 block text-muted">
                  {quote.visit.help}
                </span>
              </span>
            </label>

            <p className="mt-4 text-sm text-muted">
              {quote.photoHint}{" "}
              <a
                href={whatsappHref("quote")}
                target="_blank"
                rel="noopener"
                className="font-semibold text-accent hover:underline"
              >
                {quote.photoHintLink}
              </a>
              .
            </p>

            {status === "error" && (
              <p className="mt-4 border-l-[3px] border-accent bg-accent/5 px-4 py-3 text-sm text-ink">
                Het versturen lukte niet. Probeer het opnieuw, of bel ons op{" "}
                <a href={telHref} className="font-semibold underline">
                  {business.phone.display}
                </a>
                .
              </p>
            )}
          </fieldset>
        )}

        {/* ── Navigatie ──────────────────────────────────────────────── */}
        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline sm:w-auto"
            >
              {quote.backLabel}
            </button>
          )}

          {step < stepCount - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {quote.nextLabel}
              <ArrowRightIcon />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary flex-1 disabled:opacity-60"
            >
              {status === "sending" ? quote.sendingLabel : quote.submitLabel}
              <ArrowRightIcon />
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-muted">
          {quote.privacyNote}
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "type" | "onChange" | "className"
>) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* text-base (16px) voorkomt dat iOS automatisch inzoomt op het veld */
        className="mt-1.5 min-h-12 w-full border border-sand-dark bg-cream px-3.5 text-base outline-none focus:border-brand"
        {...rest}
      />
    </div>
  );
}
