import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Algemene voorwaarden — ${siteConfig.business.name}`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage title="Algemene voorwaarden">
      <h2>Offertes</h2>
      <p>
        Offertes zijn vrijblijvend en dertig dagen geldig. De genoemde prijzen
        zijn inclusief btw, tenzij anders vermeld. Meerwerk voeren we alleen uit
        na schriftelijk akkoord.
      </p>
      <h2>Uitvoering</h2>
      <p>
        We plannen de werkzaamheden in overleg. Bij weersomstandigheden die het
        werk onmogelijk maken, schuift de planning in overleg door.
      </p>
      <h2>Garantie</h2>
      <p>
        Op aanleg, bestrating en constructies geldt twee jaar garantie op de
        uitvoering. Op beplanting geldt aanslaggarantie van één groeiseizoen,
        mits het onderhoudsadvies is opgevolgd.
      </p>
      <h2>Betaling</h2>
      <p>
        Betaling binnen veertien dagen na factuurdatum. Bij grotere projecten
        werken we met termijnen die in de offerte staan vermeld.
      </p>
      <h2>Contact</h2>
      <p>
        {siteConfig.business.legalName}, KvK {siteConfig.business.kvk}.
      </p>
    </LegalPage>
  );
}
