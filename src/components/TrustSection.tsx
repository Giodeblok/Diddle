import { motion } from 'framer-motion';
import { Shield, Award, Truck, RotateCcw } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: 'Officieel gelicentieerd',
    description: 'Authentieke Diddl producten',
  },
  {
    icon: Truck,
    title: 'Snel geleverd',
    description: '1-3 werkdagen bezorging',
  },
  {
    icon: Shield,
    title: 'Veilig betalen',
    description: 'iDEAL, creditcard & meer',
  },
  {
    icon: RotateCcw,
    title: '30 dagen retour',
    description: 'Geen gedoe, gewoon terug',
  },
];

export default function TrustSection() {
  return (
    <section className="bg-anthracite py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 border border-lilac/30 rounded-full flex items-center justify-center">
                <item.icon className="text-lilac" strokeWidth={1.5} style={{ width: '18px', height: '18px' }} />
              </div>
              <div>
                <p className="font-sans text-xs font-medium text-off-white tracking-wide mb-0.5">
                  {item.title}
                </p>
                <p className="font-sans text-[11px] text-off-white/40">
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
