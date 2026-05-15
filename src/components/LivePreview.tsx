import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import LuxuryButton from './LuxuryButton';
import { products } from '../data/products';

type UrnFilter = 'met-urn' | 'zonder-urn';

const filterOptions: { id: UrnFilter; label: string; subtitle: string }[] = [
  { id: 'met-urn', label: 'Met urn', subtitle: 'Inclusief mini urn voor as' },
  { id: 'zonder-urn', label: 'Zonder urn', subtitle: 'Glazen hart met gedicht' },
];

export default function LivePreview() {
  const [urnFilter, setUrnFilter] = useState<UrnFilter>('met-urn');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) =>
    urnFilter === 'met-urn'
      ? p.category === 'Glazen Hart met Mini Urn'
      : p.category === 'Glazen Hart zonder Mini Urn'
  );

  const selectedProduct =
    filteredProducts.find((p) => p.id === selectedProductId) ?? filteredProducts[0];

  const handleFilterChange = (filter: UrnFilter) => {
    setUrnFilter(filter);
    setSelectedProductId(null);
  };

  return (
    <section id="ontwerp" className="bg-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Personaliseer"
          title="Ontwerp jouw herinnering"
          subtitle="Kies jouw glazen hart stap voor stap en zie direct het live voorbeeld."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Controls */}
          <div className="flex flex-col gap-8">
            {/* Stap 1: Kies formaat */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-gold/40 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  1
                </span>
                <h3 className="font-serif text-lg text-anthracite">Kies formaat</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange(option.id)}
                    className={`p-4 border text-left transition-all duration-300 ${
                      urnFilter === option.id
                        ? 'border-gold bg-gold/5'
                        : 'border-beige hover:border-gold/40'
                    }`}
                  >
                    <p className="font-serif text-base text-anthracite">{option.label}</p>
                    <p className="font-sans text-xs text-taupe mt-0.5">{option.subtitle}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stap 2: Kies een artikel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-beige p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  2
                </span>
                <h3 className="font-serif text-lg text-anthracite">Kies een artikel</h3>
              </div>
              <div className="flex flex-col gap-3 h-[548px] overflow-y-scroll pr-1">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className={`border text-left transition-all duration-300 overflow-hidden flex gap-4 items-center h-32 shrink-0 ${
                      selectedProduct?.id === product.id
                        ? 'border-gold bg-gold/5'
                        : 'border-beige hover:border-gold/40'
                    }`}
                  >
                    <div className="shrink-0 w-32 h-32 bg-cream flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="py-3 pr-4">
                      <p className="font-serif text-sm text-anthracite leading-snug">
                        {product.name}
                      </p>
                      <p className="font-sans text-xs text-taupe mt-1">{product.subtitle}</p>
                      <p className="font-sans text-sm text-gold-deep mt-2">{product.priceDisplay}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {selectedProduct && (
              <LuxuryButton
                href={selectedProduct.externalUrl}
                variant="primary"
                size="lg"
                fullWidth
              >
                Bekijk product — {selectedProduct.priceDisplay}
              </LuxuryButton>
            )}
          </div>

          {/* Live voorbeeld */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sticky top-28 h-full"
          >
            <div className="bg-cream-gradient border border-beige p-10 flex flex-col items-center h-full">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe mb-8">
                Live voorbeeld
              </p>

              {selectedProduct ? (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-full overflow-hidden border border-beige">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="mt-6 text-center space-y-1">
                    <p className="font-serif text-base text-anthracite">{selectedProduct.name}</p>
                    <p className="font-sans text-xs text-taupe">{selectedProduct.subtitle}</p>
                    <p className="font-serif text-xl text-gold-deep mt-3">
                      {selectedProduct.priceDisplay}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="font-sans text-sm text-taupe">
                  Selecteer een artikel om een voorbeeld te zien
                </p>
              )}

              <div className="mt-6 w-full border-t border-gold/20 pt-5">
                <p className="font-sans text-xs text-taupe text-center leading-relaxed">
                  De teksten op het glazen hart zijn <span className="text-anthracite font-medium">vooraf bepaald</span> en staan vast.
                  <br />
                  De foto plaatst u <span className="text-gold-deep">zelf thuis</span> in de fotolijst.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
