import { motion } from 'framer-motion';
import LuxuryButton from './LuxuryButton';
import GlassHeartPreview from './GlassHeartPreview';

export default function CTASection() {
  return (
    <section className="bg-hero-gradient py-24 lg:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <GlassHeartPreview
            size="medium"
            name="Voor EEUWIG in het HART"
            dateRange=""
            quote=""
            animated={true}
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-taupe mb-5"
        >
          Begin nu
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-anthracite leading-tight mb-5"
        >
          Jouw dierbare verdient een eerbetoon
          <br />
          <span className="italic gold-text">dat even bijzonder is als de herinnering zelf.</span>
        </motion.h2>

        <div className="luxury-divider mb-7" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-base text-taupe leading-relaxed max-w-xl mx-auto mb-10"
        >
          Een herinnering die zacht aanwezig blijft. Voor wie je mist, maar altijd met je meedraagt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <LuxuryButton to="/ontwerp" variant="primary" size="lg">
            Ontwerp jouw herinnering
          </LuxuryButton>
          <LuxuryButton to="/collectie" variant="ghost" size="lg">
            Bekijk de collectie
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}
