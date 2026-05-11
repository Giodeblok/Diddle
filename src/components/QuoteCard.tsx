import { motion } from 'framer-motion';
import type { Quote } from '../data/quotes';

interface QuoteCardProps {
  quote: Quote;
  index?: number;
  onSelect?: (quote: Quote) => void;
  selected?: boolean;
}

export default function QuoteCard({ quote, index = 0, onSelect, selected = false }: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      onClick={() => onSelect?.(quote)}
      className={`p-6 border transition-all duration-400 cursor-pointer ${
        selected
          ? 'border-gold bg-gold/5 shadow-gold'
          : 'border-beige bg-ivory hover:border-gold/50 hover:shadow-luxury'
      } ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div className="luxury-divider mb-5 ml-0 mr-auto w-8" />
      <p className="font-serif text-base md:text-lg text-anthracite leading-relaxed italic">
        "{quote.text}"
      </p>
      <span className="mt-4 inline-block font-sans text-[10px] tracking-[0.18em] uppercase text-taupe">
        {quote.category}
      </span>
    </motion.div>
  );
}
