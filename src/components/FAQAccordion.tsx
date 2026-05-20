import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import type { FAQ } from '../data/faqs';

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={faq.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className={`border rounded-xl transition-colors duration-300 ${
            openId === faq.id ? 'border-lilac/40 bg-lilac/5' : 'border-lavender bg-off-white hover:border-lilac/30'
          }`}
        >
          <button
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between gap-4 p-6 text-left"
          >
            <span className="font-serif text-base md:text-lg text-anthracite">
              {faq.question}
            </span>
            <span className="flex-shrink-0 w-8 h-8 border border-lilac/40 rounded-full flex items-center justify-center text-lilac-deep">
              {openId === faq.id ? (
                <Minus className="w-3.5 h-3.5" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
            </span>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-6 font-sans text-sm text-anthracite/70 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
