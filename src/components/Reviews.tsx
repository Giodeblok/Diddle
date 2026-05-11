import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from './SectionHeading';
import TestimonialCard from './TestimonialCard';
import { reviews } from '../data/reviews';

export default function Reviews() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Ervaringen"
          title="Wat families over ons zeggen."
          subtitle="Wij zijn diep dankbaar voor het vertrouwen dat families ons schenken in hun mooiste én moeilijkste momenten."
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 p-8 border border-beige bg-cream max-w-xl mx-auto"
        >
          <div className="text-center">
            <p className="font-serif text-6xl text-anthracite">4.9</p>
            <div className="flex justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold stroke-gold" />
              ))}
            </div>
          </div>
          <div className="w-px h-12 bg-beige hidden sm:block" />
          <div className="text-center sm:text-left">
            <p className="font-sans text-sm font-medium text-anthracite">Uitstekend</p>
            <p className="font-sans text-xs text-taupe mt-1">Gebaseerd op 500+ bestellingen</p>
            <p className="font-sans text-xs text-taupe mt-0.5">100% persoonlijk voorbeeld vooraf</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <TestimonialCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
