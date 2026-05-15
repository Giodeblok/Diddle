import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import LuxuryButton from '../components/LuxuryButton';
import CTASection from '../components/CTASection';

const values = [
  {
    number: '01',
    title: 'Voor iedereen een geschenk',
    description:
      'Of het nu een troostvolle herinnering is voor iemand die rouwt, of een bijzonder cadeau voor een geliefde, een glazen hart raakt iedereen.',
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

export default function OverOnsPage() {
  return (
    <>
      <Helmet>
        <title>Over Ons | Eeuwig Dichtbij</title>
        <meta
          name="description"
          content="Ontdek het verhaal achter Eeuwig Dichtbij. Wij maken persoonlijke glazen harten waarin herinneringen aan dierbaren voor altijd worden bewaard."
        />
      </Helmet>

      <div className="pt-20">
        {/* Hero */}
        <div className="bg-hero-gradient py-24 text-center px-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4"
          >
            Ons verhaal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-anthracite leading-tight mb-6"
          >
            Omdat liefde{' '}
            <span className="italic gold-text">nooit verdwijnt.</span>
          </motion.h1>
          <div className="luxury-divider mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-base text-taupe max-w-xl mx-auto leading-relaxed"
          >
            Eeuwig Dichtbij ontstond vanuit één overtuiging: elke herinnering verdient een thuis,
            iets tastbaars, moois en persoonlijks om te koesteren.
          </motion.p>
        </div>

        {/* Ons Verhaal */}
        <section className="bg-ivory py-24 lg:py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-xs tracking-[0.25em] uppercase text-taupe/70 block mb-5"
            >
              Het begin
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl md:text-4xl text-anthracite leading-tight mb-6"
            >
              Gemaakt om liefde{' '}
              <span className="italic gold-text">tastbaar te houden.</span>
            </motion.h2>
            <div className="luxury-divider ml-0 mb-8" />
            <div className="space-y-6">
              {[
                'De dood neemt mensen mee, maar niet de liefde die ze achterlieten. Toch is het moeilijk om die liefde ergens in vast te houden. Bloemen verwelken. Kaarten vergelen. Maar glas behoudt zijn glans, voor altijd.',
                'Eeuwig Dichtbij werd geboren uit een eenvoudig maar diep verlangen: mensen helpen om de herinneringen aan hun geliefden levend te houden op een manier die even waardig en mooi is als de persoon zelf. Elk hart dat wij maken is een uniek kunstwerk. Een foto gegraveerd in kristalglas verliest haar vergankelijkheid. Woorden vastgelegd in glas blijven voor altijd leesbaar.',
                'Wij werken uitsluitend met hoogwaardig optisch kristalglas. Dat is geen toevallige keuze: dit type glas heeft een uitzonderlijke helderheid en glans die gewoon glas niet kan evenaren. Een gravure in optisch kristal blijft scherp, helder en prachtig, na tien jaar net zo mooi als op de eerste dag. Want een herinnering verdient geen compromis.',
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="font-sans text-base text-taupe leading-relaxed"
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
              <div className="luxury-divider mb-10" />
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-ivory leading-snug italic">
                "Elke herinnering verdient een thuis. Wij geven die herinnering een vorm,
                persoonlijk, tijdloos en voor altijd dichtbij."
              </blockquote>
              <div className="luxury-divider mt-10" />
            </motion.div>
          </div>
        </section>

        {/* Waarom Glazen Harten */}
        <section className="bg-ivory py-24 lg:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-xs tracking-[0.25em] uppercase text-taupe/70 block mb-5"
                >
                  De keuze voor glas
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-3xl md:text-4xl text-anthracite leading-tight mb-6"
                >
                  Waarom{' '}
                  <span className="italic gold-text">glazen harten?</span>
                </motion.h2>
                <div className="luxury-divider ml-0 mb-7" />
                <div className="space-y-5">
                  {[
                    'Glas heeft iets bijzonders. Het is transparant en toch robuust. Het vangt het licht en weerkaatst het op een manier die andere materialen niet kunnen. Wanneer de zon door een glazen hart schijnt en het licht door de kamer danst, voelt dat als aanwezigheid. Als een herinnering die zichtbaar wordt.',
                    'Dat is waarom we voor glas kozen, en niet voor hout, steen of metaal. Glas is kwetsbaar én sterk tegelijk. Net zoals rouw. Net zoals liefde.',
                  ].map((text, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                      className="font-sans text-base text-taupe leading-relaxed"
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="border border-gold/20 p-12 text-center"
              >
                <div className="luxury-divider mb-8" />
                <p className="font-serif text-xl md:text-2xl text-anthracite italic leading-relaxed">
                  "In glas gevangen wat nooit verloren mag gaan."
                </p>
                <div className="luxury-divider mt-8" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Onze Waarden */}
        <section className="bg-anthracite py-24 lg:py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs tracking-[0.25em] uppercase text-gold/70 block mb-5"
              >
                Waar wij voor staan
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif text-3xl md:text-4xl text-ivory leading-tight"
              >
                Onze{' '}
                <span className="italic gold-text">waarden.</span>
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
                  className="border border-ivory/10 p-6 hover:border-gold/30 transition-colors duration-500"
                >
                  <span className="font-serif text-3xl text-gold/30">{value.number}</span>
                  <h3 className="font-serif text-base text-ivory mt-3 mb-2">{value.title}</h3>
                  <p className="font-sans text-sm text-ivory/50 leading-relaxed">
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
              <LuxuryButton to="/ontwerp" size="lg">
                Maak jouw herinnering
              </LuxuryButton>
            </motion.div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
