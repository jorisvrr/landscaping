import { ConversionBridge } from "@/components/ConversionBridge";
import { DemoBanner } from "@/components/DemoBanner";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { QuoteSection } from "@/components/QuoteSection";
import { Reviews } from "@/components/Reviews";
import { Schema } from "@/components/Schema";
import { ServiceArea } from "@/components/ServiceArea";
import { Services } from "@/components/Services";
import { TrustStrip } from "@/components/TrustStrip";
import { WhyUs } from "@/components/WhyUs";

export default function HomePage() {
  return (
    <>
      <DemoBanner />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <WhyUs />
        <Projects />
        <ConversionBridge />
        <Process />
        <Reviews />
        <ServiceArea />
        <QuoteSection />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileActionBar />
      <Schema />
    </>
  );
}
