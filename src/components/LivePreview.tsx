import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import GlassHeartPreview from './GlassHeartPreview';
import LuxuryButton from './LuxuryButton';
import { quotes } from '../data/quotes';

const sizeOptions = [
  { id: 'small', label: 'Klein', dimensions: '8 × 8 cm', price: '€ 59' },
  { id: 'medium', label: 'Medium', dimensions: '12 × 12 cm', price: '€ 89' },
  { id: 'large', label: 'Groot', dimensions: '16 × 16 cm', price: '€ 129' },
  { id: 'set', label: 'Complete Set', dimensions: '16 cm + LED', price: '€ 169' },
];

export default function LivePreview() {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [quote, setQuote] = useState('');
  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setStep(2);
    }
  };

  const selectedSizeOption = sizeOptions.find((s) => s.id === selectedSize);

  return (
    <section id="ontwerp" className="bg-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Personaliseer"
          title="Ontwerp jouw herinnering"
          subtitle="Maak stap voor stap jouw unieke glazen hart. Zie direct hoe het eruitziet."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Controls */}
          <div className="space-y-8">
            {/* Step 1: Size */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`border p-6 transition-all duration-300 ${step >= 1 ? 'border-gold/40' : 'border-beige'}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  1
                </span>
                <h3 className="font-serif text-lg text-anthracite">Kies formaat</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {sizeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedSize(option.id)}
                    className={`p-4 border text-left transition-all duration-300 ${
                      selectedSize === option.id
                        ? 'border-gold bg-gold/5'
                        : 'border-beige hover:border-gold/40'
                    }`}
                  >
                    <p className="font-serif text-base text-anthracite">{option.label}</p>
                    <p className="font-sans text-xs text-taupe">{option.dimensions}</p>
                    <p className="font-sans text-sm font-medium text-gold-deep mt-1">{option.price}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Step 2: Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-beige p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={`w-7 h-7 flex items-center justify-center font-sans text-xs ${step >= 2 ? 'bg-anthracite text-ivory' : 'bg-beige text-taupe'}`}>
                  2
                </span>
                <h3 className="font-serif text-lg text-anthracite">Upload foto</h3>
              </div>

              {photoUrl ? (
                <div className="relative">
                  <img src={photoUrl} alt="Geüpload" className="w-full h-40 object-cover grayscale opacity-80" />
                  <button
                    onClick={() => { setPhotoUrl(undefined); setStep(1); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-anthracite text-ivory flex items-center justify-center hover:bg-brown transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <p className="mt-2 font-sans text-xs text-taupe text-center">Foto geselecteerd ✓</p>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gold/30 hover:border-gold/60 p-8 flex flex-col items-center gap-3 transition-colors duration-300 group"
                >
                  <Upload className="w-6 h-6 text-gold/50 group-hover:text-gold transition-colors" />
                  <p className="font-sans text-sm text-taupe">Klik om een foto te uploaden</p>
                  <p className="font-sans text-xs text-taupe/60">JPG, PNG – max 20 MB</p>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </motion.div>

            {/* Step 3: Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-beige p-6 space-y-4"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={`w-7 h-7 flex items-center justify-center font-sans text-xs ${step >= 3 ? 'bg-anthracite text-ivory' : 'bg-beige text-taupe'}`}>
                  3
                </span>
                <h3 className="font-serif text-lg text-anthracite">Voeg tekst toe</h3>
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (e.target.value) setStep(Math.max(step, 3)); }}
                  placeholder="Naam van uw dierbare"
                  className="w-full border border-beige bg-cream px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                  Datums
                </label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  placeholder="bijv. 1942 – 2024"
                  className="w-full border border-beige bg-cream px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                  Persoonlijk citaat
                </label>
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Kies of schrijf een citaat..."
                  className="w-full border border-beige bg-cream px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/50 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {quotes.slice(0, 4).map((q) => (
                    <button
                      key={q.id}
                      onClick={() => setQuote(q.text)}
                      className="font-sans text-[10px] border border-gold/30 px-2 py-1 text-taupe hover:border-gold hover:text-gold-deep transition-colors duration-200"
                    >
                      {q.text.length > 22 ? q.text.substring(0, 22) + '…' : q.text}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <LuxuryButton
              to="/afrekenen"
              variant="primary"
              size="lg"
              fullWidth
            >
              Voeg toe aan bestelling — {selectedSizeOption?.price}
            </LuxuryButton>
          </div>

          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sticky top-28"
          >
            <div className="bg-cream-gradient border border-beige p-10 flex flex-col items-center">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe mb-8">
                Live voorbeeld
              </p>

              <GlassHeartPreview
                size={selectedSize === 'small' ? 'small' : selectedSize === 'medium' ? 'medium' : 'large'}
                photoUrl={photoUrl}
                name={name || 'Naam'}
                dateRange={dateRange || '1940 – 2024'}
                quote={quote || 'Voor altijd in ons hart.'}
                animated={true}
              />

              <div className="mt-8 text-center space-y-1">
                <p className="font-serif text-base text-anthracite">
                  {selectedSizeOption?.label} Glazen Hart
                </p>
                <p className="font-sans text-xs text-taupe">{selectedSizeOption?.dimensions}</p>
                <p className="font-serif text-xl text-gold-deep mt-3">
                  {selectedSizeOption?.price}
                </p>
              </div>

              <div className="mt-6 w-full border-t border-gold/20 pt-5">
                <p className="font-sans text-xs text-taupe text-center leading-relaxed">
                  Je ontvangt altijd een digitaal voorbeeld ter goedkeuring
                  <br />
                  <span className="text-gold-deep">vóór</span> de productie begint.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
