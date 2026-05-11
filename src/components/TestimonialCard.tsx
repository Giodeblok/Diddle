import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Review } from '../data/reviews';

interface TestimonialCardProps {
  review: Review;
  index?: number;
}

export default function TestimonialCard({ review, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="bg-ivory border border-beige p-8 hover:shadow-luxury transition-shadow duration-500"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-gold stroke-gold" />
        ))}
      </div>

      {/* Review text */}
      <p className="font-serif text-base text-anthracite/80 leading-relaxed italic mb-7">
        "{review.text}"
      </p>

      {/* Divider */}
      <div className="luxury-divider ml-0 mb-5 w-8" />

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gold-gradient flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-xs text-anthracite font-medium">
            {review.initials}
          </span>
        </div>
        <div>
          <p className="font-sans text-sm text-anthracite font-medium">{review.name}</p>
          <p className="font-sans text-xs text-taupe">
            {review.location} · {review.date}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-taupe/60">
          {review.product}
        </span>
      </div>
    </motion.div>
  );
}
