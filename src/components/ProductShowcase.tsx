import { useState } from 'react';
import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { useProducts } from '../hooks/useProducts';

export default function ProductShowcase() {
  const products = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = activeCategory ? [activeCategory] : categories;

  return (
    <section id="collectie" className="bg-lavender/20 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="De collectie"
          title="Jouw favoriete Diddl artikelen, nu bestelbaar."
          subtitle="Van klassieke notitieboekjes tot schattige pluche, alles officieel gelicentieerd."
        />

        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-colors ${
              activeCategory === null
                ? 'bg-violet text-white border-violet'
                : 'border-lavender text-violet hover:border-violet'
            }`}
          >
            Alles
          </button>
          {categories.map((category) => {
            const count = products.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 rounded-full border transition-colors ${
                  activeCategory === category
                    ? 'bg-violet text-white border-violet'
                    : 'border-lavender text-violet hover:border-violet'
                }`}
              >
                {category}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {visibleCategories.map((category) => {
          const categoryProducts = products.filter((p) => p.category === category);
          return (
            <div key={category} className="mb-16">
              <div className="flex items-center gap-4 mb-8 border-b border-lavender pb-4">
                <h2 className="font-serif text-2xl text-anthracite">{category}</h2>
                <span className="font-sans text-xs text-violet tracking-[0.15em] uppercase">
                  {categoryProducts.length} artikelen
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
