import { NextResponse } from "next/server";

/**
 * ============================================================================
 *  OFFERTE-AANVRAGEN — integratiepunt voor productie
 * ============================================================================
 *
 *  In de demo gebeurt er bewust niets met de aanvraag: hij wordt gevalideerd,
 *  gelogd en met een OK beantwoord. Zo kan de flow volledig getest worden
 *  zonder database, account of externe dienst.
 *
 *  Voor een echte klant hoef je alleen hieronder één blok aan te zetten:
 *
 *   1. WEBHOOK (makkelijkst — Make, Zapier, n8n, eigen endpoint)
 *      Zet QUOTE_WEBHOOK_URL in de Vercel environment variables.
 *      Werkt dan meteen; onderstaande code doet de rest.
 *
 *   2. E-MAIL via Resend
 *      npm i resend
 *      const resend = new Resend(process.env.RESEND_API_KEY);
 *      await resend.emails.send({ from, to, subject, text });
 *
 *   3. FORMSPREE / Formcarry
 *      Vervang de fetch hieronder door een POST naar de formulier-endpoint.
 *
 *   4. CRM of Supabase
 *      Insert in een `leads`-tabel vanuit deze route.
 *
 *  Let op bij livegang: voeg spam-bescherming toe (honeypot-veld of Turnstile)
 *  en stel een AVG-conforme bewaartermijn in voor de aanvragen.
 * ============================================================================
 */

type QuotePayload = {
  services: string[];
  postcode: string;
  place: string;
  /** Optioneel: grove omvang van de tuin */
  size: string;
  timing: string;
  /**
   * Of de aanvrager een gratis tuinbezoek wil. In de demo is dit puur een
   * voorkeur die meegaat in de aanvraag. In productie is dit het haakje om
   * een afsprakentool (Calendly, Cal.com, eigen agenda) aan te roepen.
   */
  wantsVisit: boolean;
  name: string;
  phone: string;
  email: string;
  message: string;
};

function isValid(body: unknown): body is QuotePayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    Array.isArray(b.services) &&
    typeof b.name === "string" &&
    b.name.trim().length > 1 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 5 &&
    typeof b.email === "string" &&
    b.email.includes("@")
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige aanvraag" }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Vul naam, telefoonnummer en e-mailadres in." },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          receivedAt: new Date().toISOString(),
          source: "website-offerteformulier",
        }),
      });
      if (!res.ok) throw new Error(`Webhook antwoordde met ${res.status}`);
    } catch (error) {
      console.error("[offerte] doorsturen mislukt:", error);
      return NextResponse.json(
        { error: "Versturen mislukt" },
        { status: 502 },
      );
    }
  } else {
    // DEMO-modus: geen webhook ingesteld, dus alleen loggen.
    console.info("[offerte] demo-aanvraag ontvangen:", body);
  }

  return NextResponse.json({ ok: true });
}
