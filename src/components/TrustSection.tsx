import { motion } from 'framer-motion';
import { Shield, Package, Eye, HeartHandshake, Truck } from 'lucide-react';

const trustItems = [
  {
    icon: HeartHandshake,
    title: 'Met de hand afgewerkt',
    description: 'Elk hart met persoonlijke zorg gemaakt',
  },
  {
    icon: Package,
    title: 'Luxe geschenkverpakking',
    description: 'Klaar om te geven of te koesteren',
  },
  {
    icon: Shield,
    title: 'Veilig betalen',
    description: 'iDEAL, creditcard & meer',
  },
  {
    icon: Eye,
    title: 'Voorbeeld vooraf',
    description: 'Goedkeuring vóór productie',
  },
  {
    icon: Truck,
    title: 'Zorgvuldige verzending',
    description: 'Veilig verpakt door heel Nederland',
  },
];

export default function TrustSection() {
  return (
    <section className="bg-anthracite py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center">
                <item.icon className="w-4.5 h-4.5 text-gold" strokeWidth={1.5} style={{ width: '18px', height: '18px' }} />
              </div>
              <div>
                <p className="font-sans text-xs font-medium text-ivory tracking-wide mb-0.5">
                  {item.title}
                </p>
                <p className="font-sans text-[11px] text-ivory/40">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
