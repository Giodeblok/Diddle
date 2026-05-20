import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { categories } from '../data/products';

const categoryEmojis: Record<string, string> = {
  'Notitieboekjes': '📓',
  'Ansichtkaarten': '💌',
  'Schrijfwaren': '✏️',
  'Accessoires': '🎒',
  'Pluche': '🐭',
};

const categoryDescriptions: Record<string, string> = {
  'Notitieboekjes': 'Het iconische Diddl blokje, de basis van elke collectie.',
  'Ansichtkaarten': '3D-kaarten, seizoenskaarten en verjaardagskaarten.',
  'Schrijfwaren': 'Pennen, gummen en pennenzakken met Diddl print.',
  'Accessoires': 'Rugzakken, sleutelhangers en portemonnees.',
  'Pluche': 'Zachte Diddl en Diddlina knuffels in alle maten.',
};

export default function QuoteSelector() {
  return (
    <section className="bg-lavender py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Ontdek de collectie"
          title="Wat ben jij op zoek naar?"
          subtitle="Van klassieke notitieboekjes tot schattige knuffels, browse per categorie en vind jouw favoriete Diddl."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                to={`/collectie?categorie=${encodeURIComponent(category)}`}
                className="group block bg-off-white rounded-2xl p-8 border border-lilac/10 hover:border-lilac/40 hover:shadow-lilac transition-all duration-300"
              >
                <div className="text-4xl mb-4">
                  {categoryEmojis[category] ?? '🐭'}
                </div>
                <h3 className="font-serif text-xl font-bold text-anthracite mb-2 group-hover:text-lilac-deep transition-colors duration-300">
                  {category}
                </h3>
                <p className="font-sans text-sm text-anthracite/60 leading-relaxed">
                  {categoryDescriptions[category] ?? 'Bekijk alle producten in deze categorie.'}
                </p>
                <div className="mt-5 flex items-center gap-2 text-lilac-deep font-sans text-xs font-semibold tracking-wide uppercase">
                  <span>Bekijk categorie</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* All products tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categories.length * 0.08 }}
          >
            <Link
              to="/collectie"
              className="group block bg-lilac-gradient rounded-2xl p-8 hover:shadow-luxury transition-all duration-300"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Alles bekijken
              </h3>
              <p className="font-sans text-sm text-white/80 leading-relaxed">
                Browse de volledige Diddl comeback collectie, alles op één plek.
              </p>
              <div className="mt-5 flex items-center gap-2 text-white font-sans text-xs font-semibold tracking-wide uppercase">
                <span>Volledige collectie</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
