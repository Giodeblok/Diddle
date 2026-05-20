import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Veelgestelde Vragen | Mijn Diddl</title>
        <meta
          name="description"
          content="Antwoorden op veelgestelde vragen over Diddl producten, levering, betaling en de officiële licentie."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4">
            Vragen
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight font-bold">
            Veelgestelde vragen
          </h1>
          <div className="diddl-divider mb-5" />
          <p className="font-sans text-base text-violet max-w-lg mx-auto px-6">
            Alles wat je wilt weten over Diddl, onze producten en je bestelling.
          </p>
        </div>

        <FAQ />
        <CTASection />
      </div>
    </>
  );
}
