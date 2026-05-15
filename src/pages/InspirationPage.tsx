import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import QuoteSelector from '../components/QuoteSelector';
import SectionHeading from '../components/SectionHeading';
import LuxuryButton from '../components/LuxuryButton';
import GlassHeartPreview from '../components/GlassHeartPreview';

const poems = [
  {
    id: 'p1',
    title: 'Het zachte licht',
    text: `Zacht brandt het licht,
waar jouw naam blijft bestaan.
In elke herinnering,
raak je ons opnieuw aan.`,
  },
  {
    id: 'p2',
    title: 'Dichtbij',
    text: `Je bent niet weg,
je bent alleen ergens anders.
In elke stille ochtend,
in elk zacht gevoel dat blijft.`,
  },
  {
    id: 'p3',
    title: 'Wat liefde laat',
    text: `Wat liefde achterlaat
is nooit verloren.
Het leeft in elk klein moment
dat jij ooit hebt geboren.`,
  },
  {
    id: 'p4',
    title: 'Voor altijd bij ons',
    text: `Wij dragen je mee
in alles wat wij doen.
Jouw lach, jouw stem, jouw warmte —
niets kan dat ooit verdoen.`,
  },
];

const comfortingTexts = [
  'Een herinnering die zacht aanwezig blijft.',
  'Voor wie je mist, maar altijd met je meedraagt.',
  'Met zorg gemaakt, met liefde bewaard.',
  'Jouw dierbare verdient een eerbetoon dat even bijzonder voelt als de herinnering zelf.',
  'Liefde die niet sterft, maar van vorm verandert.',
  'In glas gevangen wat nooit verloren mag gaan.',
];

export default function InspirationPage() {
  return (
    <>
      <Helmet>
        <title>Inspiratie & Herdenkingsgedichten | Eeuwig Hart</title>
        <meta
          name="description"
          content="Gedichten, herdenkingsteksten en citaten voor een persoonlijk glazen hart. Laat u inspireren voor de mooiste woorden bij een bijzonder aandenken."
        />
      </Helmet>

      <div className="pt-20">
        {/* Header */}
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Inspiratie
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite mb-5 leading-tight">
            Woorden die iets
            <br />
            <span className="italic gold-text">blijvend zeggen.</span>
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            Laat u inspireren door gedichten, herdenkingsteksten en persoonlijke citaten voor op een glazen hart.
          </p>
        </div>

        {/* Poems */}
        <section className="bg-ivory py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <SectionHeading
              eyebrow="Gedichten"
              title="Herdenkingsgedichten"
              subtitle="Woorden die iets voelen wat moeilijk te zeggen is."
            />

            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              {poems.map((poem, i) => (
                <motion.div
                  key={poem.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-cream border border-beige p-10 hover:shadow-luxury transition-shadow duration-500"
                >
                  <div className="luxury-divider ml-0 mb-6 w-8" />
                  <h3 className="font-serif text-lg text-anthracite mb-4">{poem.title}</h3>
                  <p className="font-serif text-base text-brown/80 leading-loose italic whitespace-pre-line">
                    {poem.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Preview examples */}
            <SectionHeading
              eyebrow="Voorbeelden"
              title="Zo ziet het eruit op glas."
            />

            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              {[
                { name: 'Moeder', dateRange: '1948 – 2023', quote: 'Jouw liefde blijft ons licht.' },
                { name: 'Vader', dateRange: '1945 – 2022', quote: 'Altijd in ons hart.' },
                { name: 'Opa', dateRange: '1938 – 2024', quote: 'Voor altijd geliefd.' },
              ].map((example, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="bg-cream-gradient border border-beige p-8 flex flex-col items-center"
                >
                  <GlassHeartPreview
                    size="medium"
                    name={example.name}
                    dateRange={example.dateRange}
                    quote={example.quote}
                    animated={false}
                  />
                  <p className="mt-5 font-sans text-xs text-taupe text-center">
                    {example.name} · {example.dateRange}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Comforting texts */}
            <SectionHeading
              eyebrow="Troostende teksten"
              title="Woorden om te bewaren."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
              {comfortingTexts.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="border border-beige bg-ivory p-6 hover:border-gold/40 hover:shadow-soft transition-all duration-300"
                >
                  <div className="luxury-divider ml-0 w-6 mb-4" />
                  <p className="font-serif text-base italic text-anthracite/80 leading-relaxed">
                    "{text}"
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <LuxuryButton to="/ontwerp" variant="primary" size="lg">
                Ontwerp jouw herinnering
              </LuxuryButton>
            </div>
          </div>
        </section>

        {/* Quote selector */}
        <QuoteSelector />
      </div>
    </>
  );
}
