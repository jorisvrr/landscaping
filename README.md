# MODUS demo 01 — Hovenier (NL)

Herbruikbare demowebsite voor koude acquisitie bij hoveniersbedrijven in
Nederland. Niet gebouwd voor één prospect: dit is één sterk uitgewerkte site die
je naar meerdere hoveniers kunt sturen met de boodschap *"dit is het type
website dat wij voor uw bedrijf kunnen bouwen"*.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · geen
database, geen CMS, geen auth. Klaar voor Vercel.

---

## ⚠️ Dit is demo-content

`Groenveld Hoveniers` is een **fictief bedrijf**. Verzonnen zijn onder andere:

| Wat | Waar het staat |
| --- | --- |
| Bedrijfsnaam, adres, KvK, BTW | `siteConfig.business` |
| Telefoonnummer en WhatsApp (`+31 6 1234 5678`) | `siteConfig.business.phone` / `.whatsapp` |
| Alle reviews, het cijfer 4,9 en "127 reviews" | `siteConfig.reviews` / `siteConfig.trust` |
| Alle projecten (stockfoto's, verzonnen omschrijvingen) | `siteConfig.projects` |
| Alle richtprijzen | `siteConfig.services[].priceIndication` |
| Demo-labels en -teksten | `siteConfig.demoLabels` |
| Privacyverklaring en voorwaarden | `src/app/privacy`, `src/app/voorwaarden` |

Zolang `demoMode: true` staat, is dat ook op de site zichtbaar: een balk
bovenaan, een "voorbeeld"-label bij de reviewscore, een "voorbeeldprojecten"-label
bij het werk en een expliciete disclaimer boven de reviews. Zet `demoMode: false`
in `src/config/site.ts` en al die labels verdwijnen in één keer.

Verder staat `seo.includeAggregateRating` bewust op `false`: Google accepteert
alleen echte, verifieerbare reviews in rich results. Pas aanzetten als er echte
reviews staan.

---

## Draaien

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productiebuild
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

---

## Personaliseren voor een prospect (±5 minuten)

**Je hoeft maar één bestand te openen: [`src/config/site.ts`](src/config/site.ts).**
Alle teksten, diensten, reviews, kleuren, plaatsnamen en contactgegevens staan
daar. Er zit geen businesscontent in de componenten.

Volgorde die het snelst werkt:

1. **`business`** — naam, tagline, telefoon (`e164` + `display`), WhatsApp,
   e-mail, adres, KvK, openingstijden.
   Het telefoonnummer staat op precies twee plekken; `tel:` en `wa.me`-links
   worden daaruit afgeleid in `src/lib/contact.ts`.
2. **`theme`** — twee kleuren (`brand` donkergroen, `accent` voor élke primaire
   CTA). Ze worden als CSS-variabelen op `<html>` gezet, dus de hele site
   verandert mee.
3. **`serviceArea`** — regio, straal en plaatsnamen. Deze lijst voedt de
   regiosectie, de footer, de plaats-autocomplete in het formulier en de
   `areaServed` in de schema.org-data.
4. **`hero`** — eyebrow, kop, subkop, foto, drie badges.
5. **`services`** — de diensten die dit bedrijf écht levert, met richtprijzen.
   `inQuoteFlow: true` zet een dienst ook als keuze in stap 1 van het
   offerteformulier.
   Zie ook **`guarantees`** (de harde toezeggingen), **`conversionBridge`**
   (het blokje halverwege de pagina) en **`quote`** (alle vraagteksten, keuzes
   en knoplabels van het formulier).
6. **`projects`** — vervang door eigen projectfoto's van de klant. Een project
   met `beforeImage` krijgt automatisch de voor/na-schuifbalk.
7. **`reviews`** + **`trust`** — echte reviews, of `reviewsSection.show: false`.
8. **`seo`** — title, description, `url` (canonical, OG en sitemap).
9. **`demoMode: false`**.

**Logo:** zet een bestand in `public/` en vul `business.logoSrc` (bijv.
`"/logo.svg"`). Blijft dat `null`, dan gebruikt de site het blad-beeldmerk plus
de bedrijfsnaam in de huisstijlkleur.

**Foto's:** vervang de bestanden in `public/img/` (zelfde namen = nul code
wijzigen), of wijs nieuwe paden aan in `site.ts`. Zie
[`public/img/CREDITS.md`](public/img/CREDITS.md) voor de herkomst van de
huidige foto's.

---

## Wat moet je aansluiten voor een echte klant

| Onderdeel | Status nu | Wat er moet gebeuren |
| --- | --- | --- |
| Offerteformulier | Frontend werkt volledig; `POST /api/quote` valideert, logt en geeft `ok` terug | Zet `QUOTE_WEBHOOK_URL` in de Vercel-omgevingsvariabelen (Make/Zapier/n8n/eigen endpoint). Of vervang het blok in `src/app/api/quote/route.ts` door Resend, Formspree, Supabase of een CRM — de plekken staan uitgeschreven in de comments. |
| Spam | Geen bescherming | Honeypot-veld of Cloudflare Turnstile toevoegen vóór livegang |
| Gratis tuinbezoek | Het formulier stuurt alleen `wantsVisit: true/false` mee; er zit géén agenda achter en de site belooft alleen dat er gebeld wordt | Wil de klant echt laten boeken: koppel Calendly/Cal.com of een eigen agenda op dat veld in `src/app/api/quote/route.ts` |
| Telefoon / WhatsApp | Placeholdernummer | Echt nummer in `business.phone` + `business.whatsapp` |
| Reviews | Demo-content | Echte Google-reviews overnemen (met toestemming) of een widget plaatsen; daarna `seo.includeAggregateRating` aanzetten |
| Juridisch | Placeholderteksten | Privacyverklaring en algemene voorwaarden laten opstellen/controleren |
| Analytics | Niet aanwezig | Vercel Analytics of Plausible toevoegen (bewust weggelaten: scheelt gewicht en cookiebanner in de demo) |
| Google Business Profile | — | `reviewsSection.googleProfileUrl` naar het echte profiel laten wijzen |
| Domein | — | `seo.url` aanpassen; die waarde voedt canonical, OG-tags en `sitemap.xml` |

---

## Hoe het is opgebouwd

```
src/
  config/site.ts          ← ALLE bedrijfs- en contentdata (de enige file voor personalisatie)
  lib/contact.ts          ← leidt tel:- en wa.me-links af uit site.ts
  app/
    layout.tsx            ← fonts, metadata, merkkleuren als CSS-variabelen
    page.tsx              ← sectievolgorde van de homepage
    globals.css           ← design tokens, knopstijlen, scroll-reveal
    api/quote/route.ts    ← integratiepunt voor offerteaanvragen
    sitemap.ts, robots.ts
    privacy/, voorwaarden/
  components/
    Header, Hero, TrustStrip, Services, WhyUs, Projects, Process,
    Reviews, ServiceArea, QuoteSection, Faq, FinalCta, Footer
    ConversionBridge      ← compacte CTA halverwege de pagina
    QuoteForm             ← offerteflow in 4 stappen  (client)
    BeforeAfter           ← voor/na-schuifbalk         (client)
    MobileActionBar       ← vaste balk onderaan, 2 acties (client)
    Schema                ← LocalBusiness + FAQPage JSON-LD
    ui/Icons.tsx          ← inline SVG's (geen icon-library)
```

Alleen `Header`, `QuoteForm`, `BeforeAfter` en `MobileActionBar` zijn client
components. De rest rendert op de server.

### Prestatie-uitgangspunten

- Geen animatie-, icon- of formulierbibliotheek; nul runtime-dependencies naast
  React en Next.
- Scroll-reveal via CSS `animation-timeline: view()` — nul JavaScript, en
  bewust alleen `transform` en géén `opacity`, zodat content nooit onzichtbaar
  kan blijven hangen in een browser die de property half ondersteunt.
- FAQ gebruikt native `<details>`.
- Alle foto's via `next/image` (AVIF/WebP, responsive sizes); alleen de
  hero laadt met `priority`.
- Fonts via `next/font` (self-hosted, geen externe request, geen layout shift).
