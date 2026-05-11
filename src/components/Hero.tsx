import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LuxuryButton from './LuxuryButton';
import GlassHeartPreview from './GlassHeartPreview';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-beige/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cream/50 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full py-32 pt-40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-taupe mb-6">
                Persoonlijk gegraveerde glazen harten
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-anthracite leading-[1.1] mb-7"
            >
              Een liefdevolle herinnering,{' '}
              <span className="italic gold-text">voor altijd gevangen in glas.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-brown/70 leading-relaxed mb-10 max-w-lg"
            >
              Bewaar het gezicht, de glimlach en de liefde van iemand die je mist in een persoonlijk gegraveerd glazen hart. Handgemaakt met aandacht, voor altijd bewaard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <LuxuryButton to="/ontwerp" variant="primary" size="lg">
                Ontwerp jouw herinnering
              </LuxuryButton>
              <LuxuryButton to="/collectie" variant="ghost" size="lg">
                Bekijk de collectie
              </LuxuryButton>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['AV', 'TJ', 'SB', 'LV'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gold-gradient border-2 border-ivory flex items-center justify-center"
                    style={{ borderRadius: '50%' }}
                  >
                    <span className="font-sans text-[9px] text-anthracite font-semibold">
                      {initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-sans text-xs text-anthracite font-medium">
                  500+ families geholpen
                </p>
                <p className="font-sans text-xs text-taupe">
                  ★★★★★ 4.9/5 gemiddelde beoordeling
                </p>
              </div>
            </motion.div>
          </div>

          {/* Heart visual side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] rounded-full border border-gold/15 absolute" />
              <div className="w-[340px] h-[340px] rounded-full border border-gold/10 absolute" />
            </div>

            {/* Candle glow background */}
            <div className="absolute w-64 h-64 rounded-full bg-gold/20 blur-[60px]" />

            <GlassHeartPreview
              size="large"
              name="Moeder"
              dateRange="1948 – 2023"
              quote="Jouw liefde blijft ons licht."
              animated={true}
            />

            {/* Floating quote badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="absolute -right-4 top-16 bg-ivory border border-gold/30 shadow-luxury px-5 py-3.5 max-w-[180px]"
            >
              <p className="font-serif text-xs italic text-anthracite/80 leading-relaxed">
                "Jouw liefde blijft ons licht."
              </p>
            </motion.div>

            {/* Size badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="absolute -left-4 bottom-20 bg-anthracite shadow-luxury px-4 py-3"
            >
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-gold">
                Premium Kristalglas
              </p>
              <p className="font-sans text-xs text-ivory/70 mt-0.5">
                Handgegraveerd in Nederland
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-taupe/60">
          Ontdek meer
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-taupe/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
