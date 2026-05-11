import { useState } from 'react';
import { motion } from 'framer-motion';
import { quotes, quoteCategories } from '../data/quotes';
import type { QuoteCategory } from '../data/quotes';
import SectionHeading from './SectionHeading';
import QuoteCard from './QuoteCard';

export default function QuoteSelector() {
  const [activeCategory, setActiveCategory] = useState<QuoteCategory | 'Alle'>('Alle');

  const filtered =
    activeCategory === 'Alle'
      ? quotes
      : quotes.filter((q) => q.category === activeCategory);

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Herdenkingsteksten"
          title="Kies woorden die alles zeggen."
          subtitle="Inspiratie voor een persoonlijk citaat op jouw glazen hart. Of schrijf zelf iets dat alleen voor jou is."
        />

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['Alle', ...quoteCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as QuoteCategory | 'Alle')}
              className={`font-sans text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-anthracite text-ivory border-anthracite'
                  : 'bg-transparent text-taupe border-beige hover:border-gold/50 hover:text-gold-deep'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((quote, i) => (
            <QuoteCard key={quote.id} quote={quote} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
