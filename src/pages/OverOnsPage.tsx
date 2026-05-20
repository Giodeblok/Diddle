import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import LuxuryButton from '../components/LuxuryButton';
import CTASection from '../components/CTASection';

const values = [
  {
    number: '01',
    title: 'Officieel gelicentieerd',
    description: 'Alle producten zijn authentieke, officieel gelicentieerde Diddl merchandise.',
  },
  {
    number: '02',
    title: 'Nostalgie voorop',
    description: 'We begrijpen wat Diddl betekent voor mensen. Die emotionele verbinding is onze drijfveer.',
  },
  {
    number: '03',
    title: 'Snel & betrouwbaar',
    description: 'Binnen 1-3 werkdagen bij jou thuis, zorgvuldig ingepakt en op tijd geleverd.',
  },
  {
    number: '04',
    title: 'Voor iedereen',
    description: 'Of je 8 of 48 bent, Diddl brengt een glimlach. We zijn er voor jong én oud.',
  },
];

export default function OverOnsPage() {
  return (
    <>
      <Helmet>
        <title>Over Ons | Mijn Diddl</title>
        <meta
          name="description"
          content="Ontdek het verhaal achter Mijn Diddl. We brengen het geluk van vroeger terug, officieel gelicentieerde Diddl producten voor heel Nederland en België."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-hero-gradient py-24 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4"
          >
            Ons verhaal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite leading-tight mb-6 font-bold"
          >
            Het geluk van vroeger,{' '}
            <span className="lilac-text">nu in jouw handen.</span>
          </motion.h1>
          <div className="diddl-divider mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-violet max-w-xl mx-auto leading-relaxed"
          >
            Mijn Diddl is dé officiële webshop voor Diddl-producten in Nederland en België. We brengen de nostalgie van het iconische muisje terug, met liefde voor het merk en voor jou.
          </motion.p>
        </div>

        {/* Ons Verhaal */}
        <section className="bg-off-white py-24 lg:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-xs tracking-[0.25em] uppercase text-violet/70 block mb-5"
            >
              Het begin
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-anthracite leading-tight mb-6 font-bold"
            >
              Opgericht door Diddl-fans,{' '}
              <span className="lilac-text">voor Diddl-fans.</span>
            </motion.h2>
            <div className="diddl-divider ml-0 mb-8" />
            <div className="space-y-6">
              {[
                'Mijn Diddl is opgericht door mensen die opgroeiden met het iconische muisje op het schoolplein. We weten hoe het voelt als je een Diddl-blokje in handen krijgt na jaren van gemis, die directe glimlach, die onmiddellijke herinnering aan vroeger.',
                'Toen Diddl in 2026 zijn grote comeback aankondigde, waren wij er klaar voor. We hebben Mijn Diddl opgericht om ervoor te zorgen dat iedereen in Nederland en België makkelijk toegang heeft tot authentieke, officieel gelicentieerde Diddl-producten.',
                'Wij geloven dat nostalgie een superkracht is. Het verbindt generaties, wekt vreugde op en herinnert ons aan wie we waren. Diddl is daarin uniek, het merk raakt zowel de kinderen van nu als de volwassenen die het vroeger zo goed kenden.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="font-sans text-base text-anthracite/70 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* Missie citaat */}
        <section className="bg-anthracite py-24 lg:py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="diddl-divider mb-10" />
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-off-white leading-snug font-bold">
                "Diddl is niet zomaar een muisje.
                Het is een gevoel van onbekommerd geluk.
                <span className="lilac-text italic"> Dat gevoel verdient een thuis.</span>"
              </blockquote>
              <div className="diddl-divider mt-10" />
              <p className="font-sans text-sm text-off-white/50 mt-6">— Het Mijn Diddl team</p>
            </motion.div>
          </div>
        </section>

        {/* Onze Waarden */}
        <section className="bg-lavender py-24 lg:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs tracking-[0.25em] uppercase text-violet/70 block mb-5"
              >
                Waar wij voor staan
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif text-3xl md:text-4xl text-anthracite leading-tight font-bold"
              >
                Onze{' '}
                <span className="lilac-text">waarden.</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((value, i) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-off-white rounded-xl border border-lilac/10 p-6 hover:border-lilac/40 transition-colors duration-500"
                >
                  <span className="font-serif text-3xl text-lilac/40 font-bold">{value.number}</span>
                  <h3 className="font-serif text-base text-anthracite mt-3 mb-2 font-semibold">{value.title}</h3>
                  <p className="font-sans text-sm text-anthracite/60 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-center mt-14"
            >
              <LuxuryButton to="/collectie" size="lg">
                Bekijk de collectie
              </LuxuryButton>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
