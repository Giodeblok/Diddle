import { motion } from 'framer-motion';
import LuxuryButton from './LuxuryButton';

const values = [
  {
    number: '01',
    title: 'Officieel gelicentieerd',
    description: 'Alle Mijn Diddl producten zijn authentiek en officieel gelicentieerd door de rechthebbenden.',
  },
  {
    number: '02',
    title: 'Nostalgie bewaard',
    description: 'Van 1990 tot 2026 — wij brengen het geluk van vroeger terug in jouw handen.',
  },
  {
    number: '03',
    title: 'Snel & zorgvuldig',
    description: 'Jouw bestelling is binnen 1-3 werkdagen bij je thuis, zorgvuldig ingepakt.',
  },
  {
    number: '04',
    title: 'Voor iedereen',
    description: 'Of je 8 of 38 bent — Diddl brengt een glimlach op elk gezicht. Altijd.',
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
              className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-lilac/70 mb-5"
            >
              Ons verhaal
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-off-white leading-tight mb-6 font-bold"
            >
              Nostalgie is meer dan een gevoel —{' '}
              <span className="lilac-text">het is een superkracht.</span>
            </motion.h2>

            <div className="diddl-divider ml-0 mb-7" />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans text-base text-off-white/60 leading-relaxed mb-6"
            >
              Mijn Diddl is opgericht door mensen die opgroeiden met het iconische muisje op het schoolplein. We weten hoe het voelt als je een Diddl-blokje in handen krijgt — die directe glimlach, die warme herinnering.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-base text-off-white/60 leading-relaxed mb-10"
            >
              We verkopen officieel gelicentieerde Diddl-producten — van de klassieke notitieboekjes tot de nieuwste comeback items. Snel, zorgvuldig en met de liefde die Diddl verdient.
            </motion.p>

            <LuxuryButton to="/over-ons" variant="outline" size="lg">
              Meer over Mijn Diddl
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
                className="border border-off-white/10 rounded-xl p-6 hover:border-lilac/30 transition-colors duration-500"
              >
                <span className="font-serif text-3xl text-lilac/30 font-bold">{value.number}</span>
                <h3 className="font-serif text-base text-off-white mt-3 mb-2 font-semibold">{value.title}</h3>
                <p className="font-sans text-sm text-off-white/50 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
