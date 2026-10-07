/**
 * ============================================================================
 *  SITE CONFIG — de enige file die je hoeft aan te passen per prospect.
 * ============================================================================
 *
 *  MODUS demo 01 — hovenier / landscaper (NL).
 *
 *  ⚠️  DEMO-CONTENT WAARSCHUWING
 *  "Groenveld Hoveniers" is een VERZONNEN bedrijf. Alle reviews, projecten,
 *  cijfers, prijsindicaties, adres- en contactgegevens hieronder zijn
 *  voorbeelddata. Alles wat verzonnen is, is gemarkeerd met `DEMO:` in een
 *  comment. Vervang deze velden voordat de site live gaat voor een echte klant.
 *
 *  Snelle personalisatie voor een prospect (±5 minuten):
 *    1. `business`      — naam, telefoon, WhatsApp, e-mail, adres
 *    2. `theme`         — primaire kleur + accentkleur
 *    3. `serviceArea`   — regio + plaatsen
 *    4. `hero`          — kop, subkop, foto
 *    5. `services`      — diensten die dit bedrijf écht levert
 *    6. `reviews`       — echte reviews, of `show: false`
 *    7. `seo`           — title, description, canonical URL
 *    8. Zet `demoMode: false` zodra het geen demo meer is.
 * ============================================================================
 */

export type Service = {
  /** slug — gebruikt als anchor en als waarde in het offerteformulier */
  id: string;
  title: string;
  /** Eén zin: wat je concreet krijgt. Geen marketingtaal. */
  description: string;
  /** 3 bullets. Scanbaar, concreet. */
  points: string[];
  image: string;
  imageAlt: string;
  /** DEMO: richtprijzen zijn voorbeelden. Altijd verifiëren bij de echte klant. */
  priceIndication?: string;
  /** Toont deze dienst als keuze in stap 1 van de offerteflow */
  inQuoteFlow: boolean;
};

export type Project = {
  title: string;
  place: string;
  summary: string;
  scope: string[];
  image: string;
  imageAlt: string;
  /** Optioneel: "voor"-foto activeert de voor/na-slider */
  beforeImage?: string;
  beforeImageAlt?: string;
};

export type Review = {
  name: string;
  place: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Welke klus het betrof — maakt de review geloofwaardig en relevant */
  job: string;
  date: string;
};

/**
 * ============================================================================
 *  CLAIMS — alles wat dit bedrijf aan de klant BELOOFT.
 * ============================================================================
 *  Dit zijn de enige harde, bedrijfsspecifieke toezeggingen op de site. Ze
 *  staan hier los, zodat je ze bij het personaliseren voor een prospect in
 *  één oogopslag kunt nalopen: pas de waarde aan, of zet 'm op `null` /
 *  `false` en de claim verdwijnt overal waar hij voorkomt — badges, trust
 *  strip, garantielijst, USP's, werkwijze, formulier en FAQ.
 *
 *  Beloof niets wat de klant niet waarmaakt: dit is precies het soort tekst
 *  waar iemand je later op afrekent.
 * ============================================================================
 */
const claims = {
  /** Reactietermijn op een aanvraag. null = termijn wordt nergens genoemd. */
  responseTime: "2 werkdagen" as string | null,
  /** Hoe snel er langsgekomen wordt voor een tuinbezoek. null = niet noemen. */
  visitLeadTime: "een week" as string | null,
  /** Gratis en vrijblijvend tuinbezoek. */
  freeVisit: true,
  /** Vaste prijs vooraf, offerte per onderdeel. */
  fixedPrice: true,
  /** Garantietermijn in jaren op uitvoering. null = geen garantieclaim. */
  warrantyYears: 2 as number | null,
  /** Werkt met eigen mensen in plaats van onderaannemers. */
  ownStaff: true,
};

/** Houdt alleen de ingeschakelde items over, met behoud van het type. */
function enabled<T>(
  items: (T | null | false | undefined | "" | 0)[],
): T[] {
  return items.filter((item): item is T => Boolean(item));
}

/** "2 werkdagen" -> "binnen 2 werkdagen", of een nette terugvaltekst. */
const within = (value: string | null, fallback: string) =>
  value ? `binnen ${value}` : fallback;

export const siteConfig = {
  /**
   * demoMode = true toont overal subtiele "voorbeeld"-labels en een
   * demo-balk bovenaan. Zet op false voor een echte klant.
   */
  demoMode: true,

  /**
   * Weergave-opties die per prospect verschillen.
   */
  display: {
    /**
     * Richtprijzen bij de diensten tonen.
     *
     * Staat BEWUST uit in het herbruikbare master-template: de bedragen in
     * `services[].priceIndication` zijn voorbeelden, en een hovenier die
     * andere tarieven hanteert haakt af zodra hij prijzen ziet die niet de
     * zijne zijn. Zet 'm aan zodra de echte tarieven ingevuld zijn.
     */
    showPriceIndications: false,
  },

  /** Teksten die alleen zichtbaar zijn zolang demoMode aan staat. */
  demoLabels: {
    bannerTitle: "Voorbeeldwebsite",
    bannerBody:
      "is een fictief bedrijf. Teksten, reviews, projecten en contactgegevens zijn demo-content.",
    badge: "Voorbeeld",
    projectsBadge: "Voorbeeldprojecten",
    reviewsNoticeTitle: "Voorbeeldreviews.",
    reviewsNoticeBody:
      "Deze teksten en cijfers zijn demo-content en horen niet bij echte klanten. In de live versie staan hier de echte Google-reviews.",
    quoteNotice:
      "Demo: het formulier verstuurt nog niets. In productie gaat de aanvraag naar e-mail, CRM, een webhook of een afsprakentool.",
    quoteSuccessNotice: "Demo: deze aanvraag is niet echt verstuurd.",
  },

  // ───────────────────────────────────────────────────────────── BEDRIJF ────
  business: {
    /** DEMO: verzonnen bedrijfsnaam */
    name: "Groenveld Hoveniers",
    /** Korte naam voor nav/footer wanneer de volledige naam te lang is */
    shortName: "Groenveld",
    legalName: "Groenveld Hoveniers B.V.",
    tagline: "Hoveniersbedrijf in Leiden en omgeving",
    /** Tekstlogo wordt gebruikt als er geen logoSrc is ingesteld. */
    logoSrc: null as string | null,
    foundedYear: 2009,

    /** DEMO: placeholder-nummer. Overal afgeleid uit deze twee velden. */
    phone: {
      /** Internationaal, zonder spaties — voor tel: en wa.me */
      e164: "+31612345678",
      /** Zoals getoond aan de bezoeker */
      display: "06 1234 5678",
    },
    /** DEMO: zelfde nummer als placeholder. Mag een apart zakelijk WA-nummer zijn. */
    whatsapp: {
      e164: "+31612345678",
      /**
       * Voorgevulde eerste WhatsApp-regel, per context. Houd ze kort en
       * menselijk. Elke WhatsApp-knop op de site kiest hier een van.
       */
      messages: {
        /** Algemene knoppen (header, footer, mobiele balk) */
        default: "Hallo Groenveld Hoveniers, ik heb een vraag over mijn tuin.",
        /** Knoppen die expliciet om foto's vragen */
        photos:
          "Hallo, ik stuur een paar foto's van mijn tuin. Kunnen jullie een indicatie geven?",
        /** Vanuit het offerteformulier */
        quote:
          "Hallo, ik wil graag een offerte. Hierbij een paar foto's van mijn tuin.",
      },
      /** Ondersteunende regel bij WhatsApp-knoppen — de niche-specifieke haak. */
      photoPrompt:
        "Weet u niet precies wat nodig is? Stuur een paar foto's van uw tuin via WhatsApp.",
      /** Korte variant voor naast een knop */
      photoPromptShort: "Of stuur foto's via WhatsApp",
    },
    /** DEMO: placeholder e-mail */
    email: "info@groenveldhoveniers.nl",

    /** DEMO: verzonnen vestigingsadres */
    address: {
      street: "Vlietweg 12",
      postalCode: "2323 LA",
      city: "Leiden",
      country: "NL",
      /** Laat op false staan als het bedrijf geen bezoekadres/showtuin heeft */
      showOnSite: true,
      /** DEMO: coördinaten bij benadering (Leiden) — alleen voor schema.org */
      lat: 52.1601,
      lng: 4.497,
    },

    /** DEMO: verzonnen registratienummers */
    kvk: "00000000",
    btw: "NL000000000B01",

    /** Toont wanneer je bereikbaar bent — belangrijk vóór een belactie */
    hours: [
      { days: "Maandag t/m vrijdag", time: "07:30 – 17:30" },
      { days: "Zaterdag", time: "Op afspraak" },
      { days: "Zondag", time: "Gesloten" },
    ],
    /** Eén regel naast de telefoonknop */
    hoursSummary: "Ma t/m vr 07:30 – 17:30",

    socials: [
      { label: "Instagram", href: "https://instagram.com/" },
      { label: "Facebook", href: "https://facebook.com/" },
    ],
  },

  // ─────────────────────────────────────────────────────────────── THEMA ────
  /**
   * Twee kleuren bepalen de hele site. Ze worden als CSS-variabelen op <html>
   * gezet (zie app/layout.tsx), dus hier wijzigen is genoeg.
   *   brand  = donkergroen: headers, donkere secties, tekstaccenten
   *   accent = terracotta:  élke primaire CTA-knop
   */
  theme: {
    brand: "#1D3A2C",
    brandDark: "#14291F",
    accent: "#A1462A",
    accentDark: "#88391F",
  },

  // ────────────────────────────────────────────────────────────────── CTA ────
  /**
   * Eén primaire conversie op de hele site. Overal exact dezelfde tekst,
   * zodat de bezoeker 'm herkent.
   */
  cta: {
    primary: {
      label: "Offerte aanvragen",
      /** Kortere variant voor de mobiele actiebalk */
      labelShort: "Offerte",
      href: "#offerte",
    },
    call: { label: "Bellen", labelShort: "Bellen" },
    whatsapp: { label: "Stuur een WhatsApp", labelShort: "WhatsApp" },
  },

  // ─────────────────────────────────────────────────────────── GARANTIES ────
  /**
   * De harde toezeggingen. Worden gebruikt in de offertesectie en zijn
   * bewust één lijst, zodat ze overal hetzelfde zijn. Alleen opnemen wat het
   * bedrijf ook daadwerkelijk waarmaakt.
   */
  guarantees: enabled([
    claims.freeVisit && "Gratis tuinbezoek en advies op locatie",
    claims.fixedPrice && "Offerte gespecificeerd per onderdeel",
    "Geen verplichtingen, geen verkooppraatje",
  ]),

  // ─────────────────────────────────────────────────────────────── REGIO ────
  serviceArea: {
    /** Gebruikt in koppen en SEO-teksten: "in {region} en omgeving" */
    region: "Leiden",
    regionLong: "Leiden en omgeving",
    /** Straal die je noemt in de regiosectie */
    radiusKm: 25,
    places: [
      "Leiden",
      "Leiderdorp",
      "Oegstgeest",
      "Voorschoten",
      "Wassenaar",
      "Katwijk",
      "Rijnsburg",
      "Valkenburg",
      "Zoeterwoude",
      "Warmond",
      "Sassenheim",
      "Alphen aan den Rijn",
    ],
    note: "Staat uw plaats er niet bij? Bel gerust — net buiten de regio rijden we vaak ook.",
    eyebrow: "Werkgebied",
    intro:
      "We werken binnen een straal van ongeveer 25 km rond Leiden. Daardoor zijn we snel ter plaatse voor een tuinbezoek, en kunnen we tijdens het werk makkelijk even langsrijden.",
  },

  // ──────────────────────────────────────────────────────────────── HERO ────
  hero: {
    /** Eerste regel boven de kop — plaatst het bedrijf direct in de regio */
    eyebrow: "Hovenier in Leiden en omgeving",
    /** Zeg WAT je doet en WAAR. Geen "vakmanschap waarop u kunt vertrouwen". */
    title: "Complete tuinaanleg en bestrating in Leiden en omgeving",
    subtitle:
      "Van ontwerp tot oplevering, uitgevoerd door onze eigen vakmensen. U krijgt vooraf een vaste prijs en één vast aanspreekpunt.",
    image: "/img/hero-tuinaanleg.jpg",
    imageAlt:
      "Aangelegde tuin met natuurstenen trap, strakke hagen en bestrating",
    /** Max 3. Afgeleid van `claims` bovenaan dit bestand. */
    badges: enabled([
      claims.freeVisit && "Gratis tuinbezoek",
      claims.fixedPrice && "Vaste prijs vooraf",
      claims.warrantyYears && `${claims.warrantyYears} jaar werkgarantie`,
    ]),
  },

  // ───────────────────────────────────────────────────────── TRUST STRIP ────
  /**
   * DEMO: beoordeling en aantallen zijn voorbeeldwaarden.
   * Vervang door echte Google-cijfers of verwijder het item.
   */
  trust: {
    rating: 4.9,
    reviewCount: 127,
    reviewSource: "Google",
    reviewsUrl: "#reviews",
    items: enabled([
      claims.freeVisit && { label: "Gratis en vrijblijvend advies aan huis" },
      claims.responseTime && {
        label: `Binnen ${claims.responseTime} een reactie`,
      },
      claims.ownStaff && { label: "Eigen vakmensen, geen onderaannemers" },
    ]),
  },

  // ─────────────────────────────────────────────────────────────── USP'S ────
  /** Geschreven rond de vragen die een klant écht heeft. Geen kernwaarden. */
  whyUs: {
    eyebrow: "Waarom wij",
    title: "Waarom mensen ons bellen",
    intro:
      "De meeste mensen die ons bellen hebben al een keer een offerte gemist of een aannemer niet meer teruggezien. Daarom hebben we het zo geregeld:",
    image: "/img/team-aan-het-werk.jpg",
    imageAlt: "Hovenier van Groenveld aan het werk in een tuin",
    reasons: enabled([
      {
        title: "U krijgt altijd antwoord",
        body: `${claims.responseTime ? `Binnen ${claims.responseTime} een reactie op uw aanvraag, en tijdens` : "Tijdens"} het werk heeft u het nummer van uw vaste contactpersoon.`,
      },
      claims.fixedPrice && {
        title: "Vaste prijs vooraf",
        body: "De offerte is gespecificeerd per onderdeel. Meerwerk gebeurt alleen na uw akkoord, dus u weet wat u betaalt.",
      },
      claims.ownStaff && {
        title: "Eigen vakmensen",
        body: "Onze eigen ploegen leggen aan en bestraten. Geen wisselende onderaannemers in uw tuin.",
      },
      {
        title: "Wij denken mee over onderhoud",
        body: "Een tuin die te veel werk kost wordt niet gebruikt. We kiezen beplanting die bij uw situatie past.",
      },
      claims.warrantyYears && {
        title: `${claims.warrantyYears} jaar werkgarantie`,
        body: "Op aanleg, bestrating en constructies. Zakt er iets? Dan komen we terug.",
      },
      {
        title: "Netjes opgeleverd",
        body: "Afvoer van puin en groenafval zit in de prijs. De straat voor uw deur laten we schoon achter.",
      },
    ]),
  },

  // ───────────────────────────────────────────────────────────── DIENSTEN ────
  servicesIntro: {
    eyebrow: "Diensten",
    title: "Wat wij voor uw tuin doen",
    subtitle:
      "Van een losse terrasvernieuwing tot een complete tuin. Alles in eigen beheer, dus u heeft maar één partij nodig.",
    /** Kaart die de laatste cel van het dienstenraster vult */
    ctaCard: {
      title: "Staat uw klus er niet bij?",
      body: "We doen vrijwel al het tuinwerk — van een enkele boom rooien tot beregening en verlichting. Vraag het gerust.",
    },
  },

  services: [
    {
      id: "tuinontwerp",
      title: "Tuinontwerp",
      description:
        "Een schaalgetekend ontwerp met beplantingsplan, zodat u uw tuin ziet vóórdat de eerste steen ligt.",
      points: [
        "Ontwerpgesprek bij u in de tuin",
        "Plattegrond, materiaalkeuze en beplantingsplan",
        "Ontwerpkosten gaan eraf bij uitvoering",
      ],
      image: "/img/dienst-ontwerp.jpg",
      imageAlt: "Schaaltekening van een tuinontwerp met beplantingsplan",
      priceIndication: "Richtprijs vanaf € 450",
      inQuoteFlow: true,
    },
    {
      id: "tuinaanleg",
      title: "Complete tuinaanleg",
      description:
        "De hele tuin in één keer: grondwerk, bestrating, beplanting, verlichting en beregening.",
      points: [
        "Eén aanspreekpunt en één planning",
        "Grondwerk, drainage en afwatering geregeld",
        "Inclusief afvoer van grond en puin",
      ],
      image: "/img/dienst-aanleg.jpg",
      imageAlt: "Nieuw aangelegde tuin met gazon en stapstenen naar het huis",
      priceIndication: "Projecten vanaf € 7.500",
      inQuoteFlow: true,
    },
    {
      id: "bestrating",
      title: "Bestrating & terrassen",
      description:
        "Terrassen, opritten en paden in keramiek, natuursteen of gebakken klinkers — strak gelegd en waterpas.",
      points: [
        "Goede fundering, dus geen verzakkingen",
        "Advies over waterafvoer en infiltratie",
        "Ook alleen herstraten van een bestaand terras",
      ],
      image: "/img/dienst-bestrating.jpg",
      imageAlt: "Rond terras van natuursteen met een lage keermuur",
      priceIndication: "Richtprijs vanaf € 85 per m²",
      inQuoteFlow: true,
    },
    {
      id: "schuttingen",
      title: "Schuttingen & erfafscheiding",
      description:
        "Hardhouten schuttingen, gaas met hedera of een groene haag — geplaatst op betonpoeren of in beton.",
      points: [
        "Hardhout, douglas of composiet",
        "Poortjes en dubbele deuren op maat",
        "Advies over erfgrens en vergunningvrije hoogte",
      ],
      image: "/img/dienst-schutting.jpg",
      imageAlt: "Houten schutting langs een tuinpad met beplanting",
      priceIndication: "Richtprijs vanaf € 125 per strekkende meter",
      inQuoteFlow: true,
    },
    {
      id: "overkappingen",
      title: "Overkappingen & veranda's",
      description:
        "Een overkapping, veranda of pergola waardoor u ook in oktober nog buiten zit.",
      points: [
        "Hout, aluminium of een combinatie",
        "Inclusief verlichting en stroomvoorziening",
        "Fundering en afwatering meegenomen",
      ],
      image: "/img/dienst-overkapping.jpg",
      imageAlt: "Houten overkapping boven een terras aan een woning",
      priceIndication: "Richtprijs vanaf € 3.200",
      inQuoteFlow: true,
    },
    {
      id: "onderhoud",
      title: "Tuinonderhoud",
      description:
        "Vaste onderhoudsbeurten per jaar, of eenmalig een tuin die weer bij is.",
      points: [
        "Vast schema: u hoeft nergens aan te denken",
        "Snoeien, bemesten, onkruid en gazonverzorging",
        "Ook voor VvE's en bedrijfspanden",
      ],
      image: "/img/dienst-onderhoud.jpg",
      imageAlt: "Hovenier die een buxusbol in model snoeit",
      priceIndication: "Onderhoudsabonnement vanaf € 65 per beurt",
      inQuoteFlow: true,
    },
    {
      id: "renovatie",
      title: "Tuinrenovatie",
      description:
        "Een verwaarloosde of gedateerde tuin terugbrengen naar iets dat u weer gebruikt.",
      points: [
        "Verwijderen van oude bestrating en beplanting",
        "Behouden wat goed is, vernieuwen wat moet",
        "Vaak in 1 tot 2 weken klaar",
      ],
      image: "/img/dienst-renovatie.jpg",
      imageAlt: "Overwoekerde tuin die toe is aan een renovatie",
      priceIndication: "Richtprijs vanaf € 2.900",
      inQuoteFlow: true,
    },
  ] satisfies Service[],

  // ───────────────────────────────────────────────────────────── PROJECTEN ────
  /**
   * DEMO: dit zijn géén echte klantprojecten. Stockfoto's + verzonnen
   * omschrijvingen. Vervang door eigen projectfoto's van de klant.
   */
  projectsIntro: {
    eyebrow: "Projecten",
    title: "Recent werk",
    subtitle:
      "Een paar tuinen die we onlangs hebben opgeleverd. Verschillende budgetten, dezelfde manier van werken.",
  },

  projects: [
    {
      title: "Achtertuin compleet vernieuwd",
      place: "Oegstgeest",
      summary:
        "Een dichtgegroeide achtertuin met verzakte tegels is één ruime, onderhoudsarme tuin geworden met een zitmuur en ruimte om te eten.",
      scope: ["Tuinontwerp", "Bestrating", "Zitmuur", "Beplanting"],
      image: "/img/project-terras-na.jpg",
      imageAlt:
        "Vernieuwde achtertuin met ruim terras, gemetselde zitmuur en strakke hagen",
      beforeImage: "/img/project-terras-voor.jpg",
      beforeImageAlt:
        "Dezelfde tuin vóór de renovatie: overwoekerd en vol oud bouwmateriaal",
    },
    {
      title: "Daktuin op een appartementencomplex",
      place: "Leiden",
      summary:
        "Lichtgewicht substraat, winddoorlatende beplanting en een vlonderpad. Bewoners hebben er nu een gezamenlijke buitenruimte.",
      scope: ["Daktuin", "Vlonder", "Beplanting", "VvE-onderhoud"],
      image: "/img/project-daktuin.jpg",
      imageAlt: "Daktuin met plantbakken, vlonderpad en een houten pergola",
    },
    {
      title: "Loungetuin met spa en gazon",
      place: "Wassenaar",
      summary:
        "Een hoogteverschil van 60 cm opgelost met een verhoogd vlonderterras, met daaronder de techniek voor de spa weggewerkt.",
      scope: ["Tuinaanleg", "Vlonderterras", "Verlichting", "Gazon"],
      image: "/img/project-loungetuin.jpg",
      imageAlt:
        "Loungetuin met verhoogd vlonderterras, spa, strak gazon en borders",
    },
    {
      title: "Strakke stadstuin bij nieuwbouw",
      place: "Leiderdorp",
      summary:
        "Keramische tegels van 100 × 100 cm, een onderhoudsarme border en een overkapping tegen de achtergevel.",
      scope: ["Bestrating", "Overkapping", "Beplanting"],
      image: "/img/project-moderne-tuin.jpg",
      imageAlt:
        "Moderne stadstuin met grote keramische tegels, gazon en overkapping",
    },
  ] satisfies Project[],

  // ──────────────────────────────────────────────────────── HOE HET WERKT ────
  process: {
    eyebrow: "Werkwijze",
    title: "Zo gaat het bij ons",
    subtitle: "Van eerste bericht tot opgeleverde tuin, in vier stappen.",
    /** Label van de secundaire WhatsApp-knop onder de stappen */
    whatsappLabel: "Foto's sturen via WhatsApp",
    steps: [
      {
        title: "U vertelt wat u wilt",
        body: "Via het formulier of een paar foto's op WhatsApp. Een globaal idee is genoeg — details komen later.",
      },
      {
        title: "Gratis tuinbezoek",
        body: `We komen ${within(claims.visitLeadTime, "op een moment dat u uitkomt")} langs, meten op en denken mee over wat haalbaar is binnen uw budget.`,
      },
      {
        title: "Offerte met vaste prijs",
        body: "Gespecificeerd per onderdeel, zodat u kunt kiezen wat wel en niet doorgaat. Geen verrassingen achteraf.",
      },
      {
        title: "Wij voeren uit",
        body: "U krijgt een startdatum en een planning. Na oplevering ruimen we op en lopen we de tuin met u door.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── REVIEWS ────
  /**
   * ⚠️ DEMO-REVIEWS — dit zijn VERZONNEN voorbeelden, geen echte klanten.
   * Ze staan er om het ontwerp te laten zien. Vervang ze door:
   *   - echte, met toestemming overgenomen Google-reviews, of
   *   - een Google-reviews-widget, of
   *   - zet `reviewsSection.show: false` tot er echte reviews zijn.
   * Zolang `demoMode: true` staat, toont de site hierbij een zichtbaar
   * "voorbeeld"-label, zodat niemand ze per ongeluk voor echt aanziet.
   */
  reviewsSection: {
    show: true,
    eyebrow: "Reviews",
    title: "Wat klanten over ons zeggen",
    /**
     * Link naar het échte Google-bedrijfsprofiel van de klant.
     *
     * Blijft `null` in het master-template: de reviews hiernaast zijn
     * voorbeelden, en dan hoort er geen knop te staan die naar Google wijst
     * alsof het om echte beoordelingen gaat. Zodra een klant een geldig
     * Google Bedrijfsprofiel heeft, zet je de URL hier neer en wordt het
     * vanzelf een werkende link.
     */
    googleProfileUrl: null as string | null,
    /** Wordt getoond zolang er nog geen echt profiel gekoppeld is */
    googlePlaceholderLabel: "Hier komen echte Google-reviews",
    googleLinkLabel: "Bekijk op Google",
  },

  reviews: [
    {
      name: "Marieke",
      place: "Leiderdorp",
      rating: 5,
      text: "Vooraf precies uitgelegd wat er zou gebeuren en wat het zou kosten. De planning klopte, en toen er een regenweek tussen zat werden we gewoon gebeld. Terras ligt strak.",
      job: "Bestrating en beplanting",
      date: "2025-08",
    },
    {
      name: "Peter en Anja",
      place: "Oegstgeest",
      rating: 5,
      text: "We hadden drie offertes. Deze was niet de goedkoopste, maar wel de enige waarin per onderdeel stond wat we kregen. Achteraf precies betaald wat er stond.",
      job: "Complete tuinaanleg",
      date: "2025-06",
    },
    {
      name: "Sander",
      place: "Leiden",
      rating: 5,
      text: "Foto's via WhatsApp gestuurd, dezelfde dag reactie en twee dagen later stonden ze in de tuin. Schutting rechtgezet en nieuwe poort geplaatst.",
      job: "Schutting en poort",
      date: "2025-09",
    },
    {
      name: "VvE Rijnstaete",
      place: "Leiden",
      rating: 5,
      text: "Al twee jaar het onderhoud van onze binnentuin. Komen op de afgesproken momenten en melden het netjes als er iets vervangen moet worden.",
      job: "Onderhoudscontract VvE",
      date: "2025-04",
    },
    {
      name: "Jolanda",
      place: "Voorschoten",
      rating: 4,
      text: "Mooie tuin geworden en prettige mensen over de vloer. De levering van de tegels liep een week uit, dat was wel jammer, maar daar is netjes over gecommuniceerd.",
      job: "Terras en overkapping",
      date: "2025-07",
    },
    {
      name: "Familie De Wit",
      place: "Wassenaar",
      rating: 5,
      text: "Ze hebben goed meegedacht over beplanting die weinig onderhoud vraagt. Een jaar later staat alles er nog prima bij.",
      job: "Tuinontwerp en aanleg",
      date: "2024-10",
    },
  ] satisfies Review[],

  // ──────────────────────────────────────────────────── CONVERSIEBRUG ────
  /**
   * Compact blokje halverwege de pagina (na het werk), zodat iemand die
   * overtuigd is niet door hoeft te scrollen naar de offertesectie.
   */
  conversionBridge: {
    title: "Heeft u al een idee voor uw tuin?",
    body: "Vertel ons kort wat u wilt en ontvang vrijblijvend een voorstel.",
  },

  // ───────────────────────────────────────────────────────── OFFERTEFLOW ────
  /**
   * Alle teksten en keuzes van het offerteformulier. De flow zelf staat in
   * src/components/QuoteForm.tsx; hier staat wat er gevraagd wordt.
   */
  quote: {
    eyebrow: "Offerte",
    title: "Vraag een vrijblijvende offerte aan",
    subtitle:
      `Vier korte vragen, ongeveer een minuut werk. U krijgt ${within(claims.responseTime, "zo snel mogelijk")} een reactie van ons.`,
    /** Labels in de voortgangsbalk — bepalen ook het aantal stappen niet, dat is vast op 4 */
    stepLabels: ["Werkzaamheden", "Locatie", "Planning", "Contactgegevens"],
    estimatedTime: "± 1 minuut",

    steps: {
      work: {
        question: "Waar kunnen we u mee helpen?",
        help: "Meerdere opties mogen. Weet u het nog niet precies? Kies wat er het dichtst bij komt.",
      },
      location: {
        question: "Waar staat de tuin?",
        help: "Zo weten we meteen of u binnen ons werkgebied valt en wie er bij u in de buurt werkt.",
      },
      timing: {
        question: "Wanneer zou u dit willen laten doen?",
        help: "Ook \u201cik oriënteer mij nog\u201d is een prima antwoord.",
      },
      contact: {
        question: "Hoe kunnen we u bereiken?",
        help: `U krijgt ${within(claims.responseTime, "zo snel mogelijk")} een reactie. We bellen alleen over uw aanvraag.`,
      },
    },

    /** Optionele kwalificatievraag op stap 2 */
    sizeLabel: "Hoe groot is de tuin ongeveer?",
    sizeOptions: [
      "Kleiner dan 50 m²",
      "50 – 150 m²",
      "150 – 400 m²",
      "Groter dan 400 m²",
      "Weet ik niet precies",
    ],

    timingOptions: [
      "Zo snel mogelijk",
      "Binnen 1 maand",
      "Binnen 3 maanden",
      "Ik oriënteer mij nog",
    ],

    /**
     * Gratis tuinbezoek als keuze. Dit is bewust een voorkeur, géén
     * agendaboeking: er zit geen planningssysteem achter. In productie kan dit
     * veld een scheduling-tool (Calendly, Cal.com, eigen agenda) triggeren.
     */
    visit: {
      label: "Ja, plan een gratis tuinbezoek in",
      help: "We bellen u om samen een moment te kiezen. U zit nergens aan vast.",
    },

    /** Knop- en hulpteksten */
    nextLabel: "Volgende",
    backLabel: "Terug",
    submitLabel: "Verstuur mijn aanvraag",
    sendingLabel: "Versturen…",
    photoHint: "Liever eerst foto's sturen?",
    photoHintLink: "App ze naar ons",
    privacyNote:
      "Gratis en vrijblijvend. Uw gegevens gebruiken we alleen om op uw aanvraag te reageren.",
    directContactTitle: "Liever direct contact?",

    /** Wordt getoond na succesvol versturen */
    successTitle: "Bedankt, uw aanvraag staat bij ons binnen",
    successBody:
      `We nemen ${within(claims.responseTime, "zo snel mogelijk")} contact op om een tuinbezoek in te plannen. Haast? Bel of app ons gerust.`,
  },

  // ─────────────────────────────────────────────────────────────────── FAQ ────
  faq: {
    eyebrow: "Vragen",
    title: "Veelgestelde vragen",
    aside:
      "Staat uw vraag er niet bij? Bel gerust, dan hebben we het zo uitgelegd.",
    items: [
      {
        q: "Is een offerte echt gratis?",
        a: "Ja. Het tuinbezoek, het advies en de offerte kosten niets en verplichten u tot niets. Pas als u akkoord geeft, plannen we het werk in.",
      },
      {
        q: "In welke plaatsen werken jullie?",
        a: "In Leiden en omgeving, binnen ongeveer 25 kilometer: onder andere Leiderdorp, Oegstgeest, Voorschoten, Wassenaar, Katwijk, Zoeterwoude en Alphen aan den Rijn. Staat uw plaats er niet bij, bel dan even — vaak kan het alsnog.",
      },
      {
        q: "Hoe snel kunnen jullie beginnen?",
        a: "Voor onderhoud en kleinere klussen meestal binnen 1 tot 2 weken. Voor een complete tuinaanleg is de wachttijd afhankelijk van het seizoen: reken in het voorjaar op een aantal weken. We zeggen altijd eerlijk wanneer we kunnen.",
      },
      {
        q: "Kan ik foto's van mijn tuin via WhatsApp sturen?",
        a: "Graag zelfs. Met een paar foto's en de globale maten kunnen we vaak al een eerste indicatie geven, nog voordat we langskomen.",
      },
      {
        q: "Wat kost een nieuwe tuin ongeveer?",
        /**
         * Bewust zonder bedragen in het master-template: tarieven verschillen
         * per bedrijf. Vul hier de echte richtprijzen van de klant in zodra je
         * de site personaliseert (en zet dan ook display.showPriceIndications
         * aan).
         */
        a: "Dat hangt af van de oppervlakte, de materialen en de bereikbaarheid van de tuin. We maken daarom altijd eerst een opname ter plaatse. In de offerte staat vervolgens alles per onderdeel uitgesplitst, zodat u zelf kunt schuiven met wat wel en niet doorgaat.",
      },
      {
        q: "Doen jullie ook alleen onderhoud?",
        a: "Ja. Dat kan met een vast aantal beurten per jaar, of eenmalig als de tuin flink is uitgelopen. Ook als wij de tuin niet hebben aangelegd.",
      },
      {
        q: "Moet ik zelf iets voorbereiden?",
        a: "Nee. Wij regelen materialen, afvoer en eventuele vergunningcheck. Handig is wel als we weten hoe we de tuin bereiken, bijvoorbeeld via een achterom of door het huis.",
      },
      {
        q: "Werken jullie ook voor bedrijven en VvE's?",
        a: "Ja, voor VvE's, bedrijfspanden en vastgoedbeheerders. Meestal met een onderhoudscontract en een vaste jaarplanning.",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────── FINAL CTA ────
  finalCta: {
    title: "Benieuwd wat uw tuin gaat kosten?",
    body: "Vertel kort wat u van plan bent. We komen vrijblijvend langs, denken mee en sturen daarna een offerte met een vaste prijs.",
  },

  // ─────────────────────────────────────────────────────────────────── SEO ────
  seo: {
    /** Zonder trailing slash. Nodig voor canonical, OG en sitemap. */
    url: "https://demo-hovenier.vercel.app",
    title:
      "Hovenier in Leiden e.o. | Tuinaanleg, bestrating en onderhoud — Groenveld Hoveniers",
    description:
      "Hoveniersbedrijf voor complete tuinaanleg, bestrating, schuttingen en tuinonderhoud in Leiden, Leiderdorp, Oegstgeest en omgeving. Gratis tuinbezoek en een vaste prijs vooraf.",
    locale: "nl_NL",
    ogImage: "/img/hero-tuinaanleg.jpg",
    /**
     * Google staat alleen échte, verifieerbare reviews toe in rich results.
     * Laat dit op false staan zolang de reviews hierboven demo-content zijn.
     */
    includeAggregateRating: false,
  },

  // ──────────────────────────────────────────────────────────────── FOOTER ────
  footer: {
    about:
      "Hoveniersbedrijf voor tuinontwerp, aanleg, bestrating en onderhoud in Leiden en omgeving. Particulier, zakelijk en VvE.",
    legalLinks: [
      { label: "Privacyverklaring", href: "/privacy" },
      { label: "Algemene voorwaarden", href: "/voorwaarden" },
    ],
  },

  // ─────────────────────────────────────────────────────────────── NAVIGATIE ────
  nav: [
    { label: "Diensten", href: "#diensten" },
    { label: "Werk", href: "#projecten" },
    { label: "Werkwijze", href: "#werkwijze" },
    { label: "Reviews", href: "#reviews" },
    { label: "Regio", href: "#regio" },
  ],
};

export type SiteConfig = typeof siteConfig;
