import { Helmet } from 'react-helmet-async';
import ProductShowcase from '../components/ProductShowcase';
import Reviews from '../components/Reviews';
import CTASection from '../components/CTASection';
import TrustSection from '../components/TrustSection';

export default function ProductPage() {
  return (
    <>
      <Helmet>
        <title>De Collectie | Glazen Harten met Gravure | Eeuwig Hart</title>
        <meta
          name="description"
          content="Ontdek onze collectie persoonlijk gegraveerde glazen harten. Van intiem klein tot groot luxe formaat met LED-basis. Elk hart handgemaakt met zorg."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Collectie
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite mb-5 leading-tight">
            Elk hart is uniek,
            <br />
            <span className="italic gold-text">net als de herinnering.</span>
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            Kies het formaat dat past bij de liefde die je wilt bewaren.
          </p>
        </div>
        <TrustSection />
        <ProductShowcase />
        <Reviews />
        <CTASection />
      </div>
    </>
  );
}
