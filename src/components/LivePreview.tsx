import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import LuxuryButton from './LuxuryButton';
import { products } from '../data/products';

export default function LivePreview() {
  const newProducts = products.filter((p) => p.badge === 'Nieuw').slice(0, 3);
  const displayProducts = newProducts.length >= 3 ? newProducts : products.slice(0, 3);

  return (
    <section id="nieuw" className="bg-off-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Nieuw binnen"
          title="Vers uit de comeback collectie"
          subtitle="De nieuwste Diddl-items zijn gearriveerd. Wees er snel bij, sommige zijn al bijna uitverkocht."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-lavender rounded-2xl overflow-hidden border border-lilac/10 hover:border-lilac/30 hover:shadow-luxury transition-all duration-300"
            >
              {/* Product image */}
              <div className="relative overflow-hidden aspect-square bg-off-white flex items-center justify-center p-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513201099705-a9746072f579?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-lilac text-white font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-violet mb-1">
                  {product.category}
                </p>
                <h3 className="font-serif text-lg font-bold text-anthracite leading-snug mb-1">
                  {product.name}
                </h3>
                <p className="font-sans text-sm text-anthracite/60 mb-4">
                  {product.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-lilac-deep">
                    {product.priceDisplay}
                  </span>
                  <Link
                    to={`/collectie/${product.id}`}
                    className="font-sans text-xs text-violet font-semibold tracking-wide uppercase hover:text-lilac-deep transition-colors duration-300"
                  >
                    Bekijk →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <LuxuryButton to="/nieuw" variant="ghost" size="lg">
            Bekijk alles wat nieuw is
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}
