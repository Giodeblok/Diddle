import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative bg-ivory border transition-all duration-500 group hover:shadow-luxury-lg flex flex-col ${
        product.popular
          ? 'border-gold/60 shadow-gold'
          : 'border-beige hover:border-gold/40'
      }`}
    >
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-gold-gradient text-anthracite text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans">
            {product.badge}
          </span>
        </div>
      )}

      {/* Productafbeelding */}
      <div className="overflow-hidden bg-ivory aspect-[4/3] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Inhoud */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-lg text-anthracite mb-1 leading-snug">{product.name}</h3>
        <p className="font-sans text-xs text-taupe italic mb-3">{product.subtitle}</p>
        <p className="font-sans text-sm text-brown/80 leading-relaxed mb-5">
          {product.description}
        </p>

        <ul className="space-y-1.5 mb-5">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-gold-deep flex-shrink-0" />
              <span className="font-sans text-xs text-brown/70">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-5 mt-auto">
          <span className="font-serif text-2xl text-anthracite">{product.priceDisplay}</span>
        </div>

        <Link
          to={`/collectie/${product.id}`}
          className="block w-full text-center bg-anthracite text-ivory text-[11px] tracking-[0.2em] uppercase font-sans py-3 px-4 hover:bg-gold-deep transition-colors duration-300"
        >
          Bekijk artikel →
        </Link>
      </div>
    </motion.div>
  );
}
