import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Eeuwig Dichtbij</title>
        <meta
          name="description"
          content="Neem contact op met Eeuwig Dichtbij. We helpen je graag bij het ontwerpen van een persoonlijk glazen hart."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Contact
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight">
            We denken graag liefdevol met u mee.
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            Heeft u vragen over onze producten of wilt u hulp bij het maken van een keuze? We helpen u graag.
          </p>
        </div>

        <ContactSection />
        <CTASection />
      </div>
    </>
  );
}
