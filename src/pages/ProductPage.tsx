import { Helmet } from 'react-helmet-async';
import ProductShowcase from '../components/ProductShowcase';
import Reviews from '../components/Reviews';
import CTASection from '../components/CTASection';
import TrustSection from '../components/TrustSection';

export default function ProductPage() {
  return (
    <>
      <Helmet>
        <title>De Collectie | Mijn Diddl</title>
        <meta
          name="description"
          content="Ontdek de volledige Diddl comeback collectie bij Mijn Diddl. Notitieboekjes, ansichtkaarten, pluche, schrijfwaren en accessoires, allemaal officieel gelicentieerd."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4">
            Collectie
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite mb-5 leading-tight font-bold">
            De volledige Diddl collectie,
            <br />
            <span className="lilac-text">voor iedereen.</span>
          </h1>
          <div className="diddl-divider mb-5" />
          <p className="font-sans text-base text-violet max-w-lg mx-auto px-6">
            Van klassieke notitieboekjes tot schattige knuffels, vind jouw favoriete Diddl artikel.
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
