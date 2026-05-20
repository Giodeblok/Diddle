import { motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';
import LuxuryButton from './LuxuryButton';

function DiddlHeroIllustration() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex items-center justify-center"
    >
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-64 h-72 md:w-80 md:h-96 drop-shadow-2xl"
        aria-label="Diddl muisje illustratie"
      >
        {/* Glow effect */}
        <ellipse cx="100" cy="210" rx="55" ry="12" fill="#C084FC" opacity="0.2" />

        {/* Left foot */}
        <ellipse cx="70" cy="198" rx="30" ry="14" fill="#F9A8D4" stroke="#C084FC" strokeWidth="2.5" />
        {/* Right foot */}
        <ellipse cx="130" cy="198" rx="30" ry="14" fill="#F9A8D4" stroke="#C084FC" strokeWidth="2.5" />

        {/* Body */}
        <ellipse cx="100" cy="138" rx="52" ry="62" fill="white" stroke="#C084FC" strokeWidth="2.5" />

        {/* Left ear */}
        <ellipse cx="60" cy="72" rx="26" ry="34" fill="white" stroke="#C084FC" strokeWidth="2.5" />
        <ellipse cx="60" cy="72" rx="15" ry="21" fill="#F9A8D4" />

        {/* Right ear */}
        <ellipse cx="140" cy="72" rx="26" ry="34" fill="white" stroke="#C084FC" strokeWidth="2.5" />
        <ellipse cx="140" cy="72" rx="15" ry="21" fill="#F9A8D4" />

        {/* Eyes */}
        <circle cx="85" cy="125" r="8" fill="#232323" />
        <circle cx="115" cy="125" r="8" fill="#232323" />
        <circle cx="88" cy="122" r="2.5" fill="white" />
        <circle cx="118" cy="122" r="2.5" fill="white" />

        {/* Nose */}
        <ellipse cx="100" cy="142" rx="6" ry="4.5" fill="#F9A8D4" />

        {/* Smile */}
        <path d="M88 152 Q100 162 112 152" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Tummy dot / blush */}
        <circle cx="78" cy="150" r="7" fill="#F9A8D4" opacity="0.5" />
        <circle cx="122" cy="150" r="7" fill="#F9A8D4" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-lilac/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pink-light/60 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lavender/40 blur-[100px]" />
        {/* Floating stars */}
        {[
          { top: '20%', left: '15%', size: 16, delay: 0 },
          { top: '60%', left: '8%', size: 12, delay: 0.5 },
          { top: '30%', right: '12%', size: 14, delay: 1 },
          { top: '70%', right: '18%', size: 10, delay: 1.5 },
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: star.top, left: 'left' in star ? star.left : undefined, right: 'right' in star ? star.right : undefined }}
            animate={{ y: [0, -8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: star.delay }}
          >
            <Star className="text-lilac fill-lilac" style={{ width: star.size, height: star.size }} />
          </motion.div>
        ))}
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
              <span className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-violet mb-6 bg-lavender px-4 py-2 rounded-full font-semibold">
                🐭 Officieel terug in Nederland — mei 2026
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-anthracite leading-[1.1] mb-7 font-bold"
            >
              Het geluk van vroeger,{' '}
              <span className="lilac-text">nu in jouw handen.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-sans text-base md:text-lg text-anthracite/70 leading-relaxed mb-10 max-w-lg"
            >
              Diddl is terug! Shop de officiële comeback collectie — notitieboekjes, ansichtkaarten, pluche en accessoires. Snel geleverd, zorgvuldig verpakt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <LuxuryButton to="/collectie" variant="primary" size="lg">
                Bekijk de collectie
              </LuxuryButton>
              <LuxuryButton to="/over-ons" variant="ghost" size="lg">
                Over Diddl
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
                {['EV', 'TJ', 'SB', 'LV'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-lilac-gradient border-2 border-off-white flex items-center justify-center"
                    style={{ borderRadius: '50%' }}
                  >
                    <span className="font-sans text-[9px] text-white font-semibold">
                      {initials}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-sans text-xs text-anthracite font-medium">
                  1.000+ tevreden Diddl fans
                </p>
                <p className="font-sans text-xs text-violet">
                  ★★★★★ 4.9/5 gemiddelde beoordeling
                </p>
              </div>
            </motion.div>
          </div>

          {/* Diddl illustration side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-center justify-center"
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[420px] h-[420px] rounded-full border border-lilac/20 absolute" />
              <div className="w-[340px] h-[340px] rounded-full border border-lilac/15 absolute" />
            </div>

            {/* Background glow */}
            <div className="absolute w-72 h-72 rounded-full bg-lilac/15 blur-[60px]" />

            <DiddlHeroIllustration />
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
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-violet/60">
          Ontdek meer
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-violet/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
