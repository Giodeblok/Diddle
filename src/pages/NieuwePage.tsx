import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';

export default function NieuwePage() {
  const newProducts = products.filter((p) => p.badge === 'Nieuw' || p.popular);
  const displayProducts = newProducts.length > 0 ? newProducts : products.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Nieuw Binnen | Mijn Diddl</title>
        <meta
          name="description"
          content="Ontdek de nieuwste Diddl-producten van de 2026 comeback collectie. Van notitieboekjes tot pluche — vers in de webshop!"
        />
      </Helmet>

      <div className="pt-20 bg-off-white min-h-screen">
        {/* Page header */}
        <div className="bg-hero-gradient py-20 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4"
          >
            Vers gearriveerd
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite leading-tight mb-6 font-bold"
          >
            Nieuw{' '}
            <span className="lilac-text">binnen</span>
          </motion.h1>
          <div className="diddl-divider mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-violet max-w-xl mx-auto leading-relaxed"
          >
            De allernieuwste producten uit de Diddl comeback collectie. Wees er snel bij — populaire items raken snel uitverkocht!
          </motion.p>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <SectionHeading
            eyebrow="Nieuwe arrivals"
            title="De nieuwste Diddl items"
            subtitle="Van klassieke notitieboekjes tot schattige knuffels — alles vers uit de 2026 comeback collectie."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
