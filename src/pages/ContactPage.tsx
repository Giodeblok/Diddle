import { Helmet } from 'react-helmet-async';
import ContactSection from '../components/ContactSection';
import CTASection from '../components/CTASection';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact | Mijn Diddl</title>
        <meta
          name="description"
          content="Neem contact op met Mijn Diddl. We helpen je graag bij het vinden van jouw favoriete Diddl producten."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4">
            Contact
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight font-bold">
            We helpen je graag verder.
          </h1>
          <div className="diddl-divider mb-5" />
          <p className="font-sans text-base text-violet max-w-lg mx-auto px-6">
            Heb je vragen over een product, je bestelling of de Diddl collectie? Neem gerust contact op.
          </p>
        </div>

        <ContactSection />
        <CTASection />
      </div>
    </>
  );
}
