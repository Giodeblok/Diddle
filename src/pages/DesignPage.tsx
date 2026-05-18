import { Helmet } from 'react-helmet-async';
import LivePreview from '../components/LivePreview';
import TrustSection from '../components/TrustSection';
import Reviews from '../components/Reviews';

export default function DesignPage() {
  return (
    <>
      <Helmet>
        <title>Ontwerp Jouw Glazen Hart | Eeuwig Hart</title>
        <meta
          name="description"
          content="Personaliseer jouw glazen hart met een foto, naam, datum en persoonlijk citaat. Zie direct het resultaat in ons live voorbeeldscherm."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Personaliseer
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight">
            Ontwerp jouw
            <br />
            <span className="italic gold-text">persoonlijke herinnering.</span>
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            Kies een hart, upload een foto en zie live hoe jouw glazen hart eruitziet.
          </p>
        </div>

        <TrustSection />
        <LivePreview />
        <Reviews />
      </div>
    </>
  );
}
