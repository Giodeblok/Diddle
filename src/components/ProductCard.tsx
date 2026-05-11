import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import type { Product } from '../data/products';
import LuxuryButton from './LuxuryButton';
import GlassHeartPreview from './GlassHeartPreview';

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
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative bg-ivory border transition-all duration-500 group hover:shadow-luxury-lg ${
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

      {/* Product visual */}
      <div className="relative bg-cream-gradient pt-10 pb-6 flex items-center justify-center overflow-hidden min-h-[280px]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_50%_60%,_rgba(201,168,106,0.3)_0%,_transparent_70%)]" />
        <GlassHeartPreview
          size={product.size as 'small' | 'medium' | 'large'}
          name="Naam"
          dateRange="1940 – 2024"
          quote="Voor altijd in ons hart."
          animated={false}
        />
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="mb-1">
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-taupe">
            {product.dimensions}
          </span>
        </div>
        <h3 className="font-serif text-xl text-anthracite mb-1">{product.name}</h3>
        <p className="font-sans text-xs text-taupe italic mb-4">{product.subtitle}</p>
        <p className="font-sans text-sm text-brown/80 leading-relaxed mb-6">
          {product.description}
        </p>

        <ul className="space-y-2 mb-7">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <Check className="w-3.5 h-3.5 text-gold-deep flex-shrink-0" />
              <span className="font-sans text-xs text-brown/70">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mb-5">
          <span className="font-serif text-2xl text-anthracite">{product.priceDisplay}</span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-gold stroke-gold" />
            ))}
          </div>
        </div>

        <LuxuryButton
          to={`/ontwerp?product=${product.id}`}
          variant="primary"
          fullWidth
        >
          Personaliseer dit hart
        </LuxuryButton>
      </div>
    </motion.div>
  );
}
