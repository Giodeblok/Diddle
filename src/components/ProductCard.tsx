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
      className={`relative bg-off-white rounded-2xl border transition-all duration-500 group hover:shadow-luxury-lg flex flex-col overflow-hidden ${
        product.popular
          ? 'border-lilac/50 shadow-lilac'
          : 'border-lilac/10 hover:border-lilac/40'
      }`}
    >
      {product.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-lilac text-white text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 font-sans rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* Productafbeelding */}
      <div className="overflow-hidden bg-lavender aspect-square flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513201099705-a9746072f579?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>

      {/* Inhoud */}
      <div className="p-6 flex flex-col flex-1">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-violet mb-1">{product.category}</p>
        <h3 className="font-serif text-lg text-anthracite mb-1 leading-snug font-bold line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        <p className="font-sans text-xs text-violet/70 italic mb-3">{product.subtitle}</p>
        <p className="font-sans text-sm text-anthracite/70 leading-relaxed mb-5 line-clamp-3">
          {product.description}
        </p>

        <ul className="space-y-1.5 mb-5 min-h-[4.5rem]">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-lilac-deep flex-shrink-0" />
              <span className="font-sans text-xs text-anthracite/70">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-5 mt-auto">
          <span className="font-serif text-2xl text-lilac-deep font-bold">{product.priceDisplay}</span>
        </div>

        <Link
          to={`/collectie/${product.id}`}
          className="block w-full text-center bg-lilac-gradient text-white text-[11px] tracking-[0.2em] uppercase font-sans font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity duration-300"
        >
          Bekijk artikel →
        </Link>
      </div>
    </motion.div>
  );
}
