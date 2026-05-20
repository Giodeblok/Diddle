import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { useProducts } from '../hooks/useProducts';

export default function ProductShowcase() {
  const products = useProducts();

  return (
    <section id="collectie" className="bg-lavender/20 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="De collectie"
          title="Jouw favoriete Diddl artikelen, nu bestelbaar."
          subtitle="Van klassieke notitieboekjes tot schattige pluche — alles officieel gelicentieerd."
        />

        {categories.map((category) => {
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
