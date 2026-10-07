import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serifDisplay = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.url),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.url,
    siteName: siteConfig.business.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.brand,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * De merkkleuren uit siteConfig worden hier als CSS-variabelen gezet.
   * Eén wijziging in site.ts verandert daarmee de hele site.
   */
  const themeVars = {
    "--color-brand": siteConfig.theme.brand,
    "--color-brand-dark": siteConfig.theme.brandDark,
    "--color-accent": siteConfig.theme.accent,
    "--color-accent-dark": siteConfig.theme.accentDark,
  } as React.CSSProperties;

  return (
    <html lang="nl" className={`${inter.variable} ${serifDisplay.variable}`} style={themeVars}>
      <body>{children}</body>
    </html>
  );
}
