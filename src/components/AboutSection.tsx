import { motion } from 'framer-motion';
import LuxuryButton from './LuxuryButton';

const values = [
  {
    number: '01',
    title: 'Persoonlijk ontwerp',
    description: 'Elk hart wordt individueel ontworpen. Geen twee harten zijn hetzelfde.',
  },
  {
    number: '02',
    title: 'Ontwerp online',
    description: 'Via de website voeg je een foto toe en maak je eenvoudig een eigen ontwerp ter inspiratie.',
  },
  {
    number: '03',
    title: 'Premium materialen',
    description: 'Uitsluitend hoogwaardig optisch kristalglas voor een tijdloze gravure.',
  },
  {
    number: '04',
    title: 'Liefdevolle afwerking',
    description: 'Zorgvuldig verpakt en met respect voor de waarde van de herinnering.',
  },
];

export default function AboutSection() {
  return (
    <section id="over-ons" className="bg-anthracite py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-gold/70 mb-5"
            >
              Ons verhaal
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight mb-6"
            >
              Gemaakt om liefde{' '}
              <span className="italic gold-text">tastbaar te houden.</span>
            </motion.h2>

            <div className="luxury-divider ml-0 mb-7" />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans text-base text-ivory/60 leading-relaxed mb-6"
            >
              Wanneer iemand die je liefhebt er niet meer is, blijven herinneringen het kostbaarste wat je hebt. Wij maken persoonlijke glazen harten waarin foto's, namen, datums en woorden worden vereeuwigd.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-base text-ivory/60 leading-relaxed mb-10"
            >
              Elk hart wordt met aandacht ontworpen, gecontroleerd en afgewerkt, zodat het niet zomaar een product is, maar een liefdevol eerbetoon aan iemand die voor altijd in je hart zal leven.
            </motion.p>

            <LuxuryButton to="/ontwerp" variant="outline" size="lg">
              Maak jouw herinnering
            </LuxuryButton>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-2 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-ivory/10 p-6 hover:border-gold/30 transition-colors duration-500"
              >
                <span className="font-serif text-3xl text-gold/30">{value.number}</span>
                <h3 className="font-serif text-base text-ivory mt-3 mb-2">{value.title}</h3>
                <p className="font-sans text-sm text-ivory/50 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
