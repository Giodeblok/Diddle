import { useState } from 'react';
import FAQAccordion from './FAQAccordion';
import { faqs } from '../data/faqs';
import LuxuryButton from './LuxuryButton';

const categories = ['Alle', 'Personalisatie', 'Bestelling & Levering', 'Betaling', 'Cadeau', 'Product'];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('Alle');

  const filtered =
    activeCategory === 'Alle'
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="bg-cream py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-[11px] tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-anthracite text-ivory border-anthracite'
                  : 'bg-transparent text-taupe border-beige hover:border-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <FAQAccordion faqs={filtered} />

        {/* CTA */}
        <div className="mt-14 text-center border border-beige p-10 bg-ivory">
          <p className="font-serif text-xl text-anthracite mb-2">
            Staat uw vraag er niet bij?
          </p>
          <p className="font-sans text-sm text-taupe mb-7">
            Wij helpen u graag persoonlijk verder. Stuur ons een bericht en we reageren altijd binnen één werkdag.
          </p>
          <LuxuryButton to="/contact" variant="primary">
            Neem contact op
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}
