import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import CTASection from '../components/CTASection';

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>Veelgestelde Vragen | Eeuwig Dichtbij</title>
        <meta
          name="description"
          content="Antwoorden op veelgestelde vragen over persoonlijke glazen harten, levering, betaling en personalisatie."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Vragen
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight">
            Veelgestelde vragen
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            We begrijpen dat elk detail telt. Hier vindt u antwoorden.
          </p>
        </div>

        <FAQ />
        <CTASection />
      </div>
    </>
  );
}
