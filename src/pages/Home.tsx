import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import TrustSection from '../components/TrustSection';
import ProductShowcase from '../components/ProductShowcase';
import LivePreview from '../components/LivePreview';
import QuoteSelector from '../components/QuoteSelector';
import Reviews from '../components/Reviews';
import AboutSection from '../components/AboutSection';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Mijn Diddl | Officiële Diddl Webshop Nederland & België</title>
        <meta
          name="description"
          content="Mijn Diddl, dé officiële webshop voor Diddl-producten in Nederland en België. Notitieboekjes, ansichtkaarten, pluche en accessoires. Snel geleverd, officieel gelicentieerd."
        />
        <meta name="keywords" content="Diddl kopen Nederland, Diddl notitieboekje, Diddl knuffel, Diddl comeback 2026, Diddl muisje, Diddl webshop, Diddlina, Diddl stationery" />
      </Helmet>

      <Hero />
      <TrustSection />
      <ProductShowcase />
      <LivePreview />
      <QuoteSelector />
      <Reviews />
      <AboutSection />
      <FAQ />
      <CTASection />
    </>
  );
}
