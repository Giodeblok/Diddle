import { motion } from 'framer-motion';
import LuxuryButton from './LuxuryButton';

function DiddlSmallIcon() {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-28">
      <ellipse cx="40" cy="82" rx="22" ry="9" fill="#C084FC" opacity="0.2" />
      <ellipse cx="27" cy="78" rx="12" ry="6" fill="#F9A8D4" stroke="#C084FC" strokeWidth="1.5" />
      <ellipse cx="53" cy="78" rx="12" ry="6" fill="#F9A8D4" stroke="#C084FC" strokeWidth="1.5" />
      <ellipse cx="40" cy="52" rx="22" ry="26" fill="white" stroke="#C084FC" strokeWidth="2" />
      <ellipse cx="22" cy="26" rx="11" ry="15" fill="white" stroke="#C084FC" strokeWidth="2" />
      <ellipse cx="22" cy="26" rx="6" ry="9" fill="#F9A8D4" />
      <ellipse cx="58" cy="26" rx="11" ry="15" fill="white" stroke="#C084FC" strokeWidth="2" />
      <ellipse cx="58" cy="26" rx="6" ry="9" fill="#F9A8D4" />
      <circle cx="33" cy="48" r="4" fill="#232323" />
      <circle cx="47" cy="48" r="4" fill="#232323" />
      <circle cx="34.5" cy="46.5" r="1.2" fill="white" />
      <circle cx="48.5" cy="46.5" r="1.2" fill="white" />
      <ellipse cx="40" cy="57" rx="3" ry="2" fill="#F9A8D4" />
      <path d="M34 63 Q40 69 46 63" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function CTASection() {
  return (
    <section className="bg-hero-gradient py-24 lg:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DiddlSmallIcon />
          </motion.div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-violet mb-5"
        >
          Herbeleef de magie
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-anthracite leading-tight mb-5 font-bold"
        >
          Diddl is terug.
          <br />
          <span className="lilac-text">En dit keer gaat hij nergens heen.</span>
        </motion.h2>

        <div className="diddl-divider mb-7" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-base text-violet leading-relaxed max-w-xl mx-auto mb-10"
        >
          Shop de officiële comeback collectie en laat het geluk van vroeger terugkomen. Voor jezelf, voor je kind, of voor die vriend die ook groot fan was.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <LuxuryButton to="/collectie" variant="primary" size="lg">
            Bekijk de collectie
          </LuxuryButton>
          <LuxuryButton to="/blog/diddl-is-terug" variant="ghost" size="lg">
            Lees meer over de comeback
          </LuxuryButton>
        </motion.div>
      </div>
    </section>
  );
}
