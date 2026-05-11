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
        <title>Gepersonaliseerd Glazen Hart met Foto | Luxe Herdenkingscadeau | Eeuwig Dichtbij</title>
        <meta
          name="description"
          content="Laat een liefdevolle herinnering vereeuwigen in een gepersonaliseerd glazen hart met foto, naam en tekst. Een elegant en troostend herdenkingscadeau voor wie altijd dichtbij blijft."
        />
        <meta name="keywords" content="gepersonaliseerd glazen hart, herdenkingscadeau met foto, gegraveerd glas met foto, luxe herinneringscadeau, glazen hart met gravure, troost cadeau overlijden" />
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
