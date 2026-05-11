import SectionHeading from './SectionHeading';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function ProductShowcase() {
  return (
    <section id="collectie" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="De collectie"
          title="Een tastbaar aandenken aan wie altijd bij je blijft."
          subtitle="Elk glazen hart wordt met aandacht op maat gemaakt. Kies het formaat dat past bij de herinnering die je wilt bewaren."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
