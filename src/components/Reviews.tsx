import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TestimonialCard from './TestimonialCard';
import { reviews as staticReviews } from '../data/reviews';
import type { Review } from '../data/reviews';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

interface ReviewsData {
  reviews: Review[];
  aggregateRating: number;
  totalReviews: number;
}

export default function Reviews() {
  const [data, setData] = useState<ReviewsData>({
    reviews: staticReviews,
    aggregateRating: 4.9,
    totalReviews: 500,
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ReviewsData>;
      })
      .then((json) => {
        if (json.reviews && json.reviews.length > 0) {
          setData(json);
        }
      })
      .catch(() => {
        // Stil falen — statische fallback blijft zichtbaar
      });
  }, []);

  const displayRating = data.aggregateRating.toFixed(1);
  const filledStars = Math.round(data.aggregateRating);

  return (
    <section className="bg-off-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Ervaringen"
          title="Wat Diddl fans over ons zeggen."
          subtitle="Duizenden tevreden klanten gingen je voor. Lees wat zij vinden van hun Diddl bestelling."
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 p-8 border border-lavender bg-lavender/30 rounded-2xl max-w-xl mx-auto"
        >
          <div className="text-center">
            <p className="font-serif text-6xl text-anthracite">{displayRating}</p>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < filledStars ? 'fill-lilac stroke-lilac' : 'stroke-violet fill-none'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-px h-12 bg-lavender hidden sm:block" />
          <div className="text-center sm:text-left">
            <p className="font-sans text-sm font-medium text-anthracite">Uitstekend</p>
            <p className="font-sans text-xs text-violet mt-1">
              Gebaseerd op {data.totalReviews >= 500 ? '500+' : data.totalReviews} bestellingen
            </p>
            <p className="font-sans text-xs text-violet mt-0.5">Officieel gelicentieerd</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review, i) => (
            <TestimonialCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
