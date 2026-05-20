import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`mb-14 ${centered ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs tracking-[0.25em] uppercase font-sans mb-4 ${
            light ? 'text-lilac/80' : 'text-violet'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-5 font-bold ${
          light ? 'text-off-white' : 'text-anthracite'
        }`}
      >
        {title}
      </h2>
      <div className={`diddl-divider mb-5 ${centered ? '' : 'ml-0 mr-auto'}`} />
      {subtitle && (
        <p
          className={`font-sans text-base md:text-lg leading-relaxed max-w-2xl ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-lavender/80' : 'text-anthracite/60'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
