import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from './SectionHeading';
import LuxuryButton from './LuxuryButton';
import { products } from '../data/products';

type UrnFilter = 'met-urn' | 'zonder-urn';

const filterOptions: { id: UrnFilter; label: string; subtitle: string }[] = [
  { id: 'met-urn', label: 'Met urn', subtitle: 'Inclusief mini urn voor as' },
  { id: 'zonder-urn', label: 'Zonder urn', subtitle: 'Glazen hart met gedicht' },
];

export default function LivePreview() {
  const [urnFilter, setUrnFilter] = useState<UrnFilter>('met-urn');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = products.filter((p) =>
    urnFilter === 'met-urn'
      ? p.category === 'Glazen Hart met Mini Urn'
      : p.category === 'Glazen Hart zonder Mini Urn'
  );

  const selectedProduct =
    filteredProducts.find((p) => p.id === selectedProductId) ?? filteredProducts[0];

  const handleFilterChange = (filter: UrnFilter) => {
    setUrnFilter(filter);
    setSelectedProductId(null);
    setUploadedPhoto(null);
  };

  const handlePhotoUpload = (file: File) => {
    setUploadedPhoto(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setUploadedPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section id="ontwerp" className="bg-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Personaliseer"
          title="Ontwerp jouw herinnering"
          subtitle="Kies jouw glazen hart stap voor stap en zie direct het live voorbeeld."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Controls */}
          <div className="flex flex-col gap-8">
            {/* Stap 1: Kies formaat */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-gold/40 p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  1
                </span>
                <h3 className="font-serif text-lg text-anthracite">Kies formaat</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFilterChange(option.id)}
                    className={`p-4 border text-left transition-all duration-300 ${
                      urnFilter === option.id
                        ? 'border-gold bg-gold/5'
                        : 'border-beige hover:border-gold/40'
                    }`}
                  >
                    <p className="font-serif text-base text-anthracite">{option.label}</p>
                    <p className="font-sans text-xs text-taupe mt-0.5">{option.subtitle}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stap 2: Kies een artikel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-beige p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  2
                </span>
                <h3 className="font-serif text-lg text-anthracite">Kies een artikel</h3>
              </div>
              <div className="flex flex-col gap-3 h-[408px] overflow-y-scroll pr-1">
                {filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className={`border text-left transition-all duration-300 overflow-hidden flex gap-4 items-center h-32 shrink-0 ${
                      selectedProduct?.id === product.id
                        ? 'border-gold bg-gold/5'
                        : 'border-beige hover:border-gold/40'
                    }`}
                  >
                    <div className="shrink-0 w-32 h-32 bg-cream flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="py-3 pr-4">
                      <p className="font-serif text-sm text-anthracite leading-snug">
                        {product.name}
                      </p>
                      <p className="font-sans text-xs text-taupe mt-1">{product.subtitle}</p>
                      <p className="font-sans text-sm text-gold-deep mt-2">{product.priceDisplay}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Stap 3: Upload uw foto */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-beige p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-7 bg-anthracite text-ivory flex items-center justify-center font-sans text-xs">
                  3
                </span>
                <h3 className="font-serif text-lg text-anthracite">Upload uw foto</h3>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhotoUpload(file);
                }}
              />

              {uploadedPhoto ? (
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-20 h-28 border border-beige overflow-hidden">
                    <img
                      src={uploadedPhoto}
                      alt="Geüploade foto"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-xs text-taupe leading-relaxed">
                      Uw foto is zichtbaar in het live voorbeeld.
                    </p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="font-sans text-xs text-gold-deep underline underline-offset-2 text-left hover:text-anthracite transition-colors"
                    >
                      Andere foto kiezen
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      className="font-sans text-xs text-taupe underline underline-offset-2 text-left hover:text-anthracite transition-colors"
                    >
                      Foto verwijderen
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) handlePhotoUpload(file);
                  }}
                  className="w-full border border-dashed border-gold/40 p-8 flex flex-col items-center gap-3 hover:border-gold transition-colors duration-300 group"
                >
                  <svg
                    className="w-8 h-8 text-gold/50 group-hover:text-gold transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="font-serif text-sm text-anthracite">Klik om een foto te uploaden</p>
                    <p className="font-sans text-xs text-taupe mt-1">of sleep uw foto hierheen</p>
                  </div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-taupe/70">
                    5 × 7 cm formaat aanbevolen
                  </p>
                </button>
              )}
            </motion.div>

            {selectedProduct && (
              <LuxuryButton
                href={selectedProduct.externalUrl}
                variant="primary"
                size="lg"
                fullWidth
              >
                Bekijk product — {selectedProduct.priceDisplay}
              </LuxuryButton>
            )}
          </div>

          {/* Live voorbeeld */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="sticky top-28 h-full"
          >
            <div className="bg-cream-gradient border border-beige p-10 flex flex-col items-center h-full">
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe mb-8">
                Live voorbeeld
              </p>

              {selectedProduct ? (
                <motion.div
                  key={selectedProduct.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-full overflow-hidden border border-beige relative" style={{ aspectRatio: '1/1' }}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover block"
                      style={{ objectPosition: selectedProduct.imageObjectPosition ?? 'center center' }}
                    />
                    {selectedProduct.photoFrame && (
                      <div
                        style={{
                          position: 'absolute',
                          top: selectedProduct.photoFrame.top,
                          left: selectedProduct.photoFrame.left,
                          width: selectedProduct.photoFrame.width,
                          aspectRatio: '5/8.2',
                          transform: `rotate(${selectedProduct.photoFrame.rotation ?? '-1.9deg'})`,
                          border: '2px dashed rgba(214,185,140,0.7)',
                          pointerEvents: 'none',
                        }}
                      />
                    )}
                    <AnimatePresence>
                      {uploadedPhoto && selectedProduct.photoFrame && (
                        <motion.img
                          key={uploadedPhoto}
                          src={uploadedPhoto}
                          alt="Uw foto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{
                            position: 'absolute',
                            top: selectedProduct.photoFrame.top,
                            left: selectedProduct.photoFrame.left,
                            width: selectedProduct.photoFrame.width,
                            aspectRatio: '5/8.2',
                            objectFit: 'cover',
                            transform: `rotate(${selectedProduct.photoFrame.rotation ?? '-1.9deg'})`,
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-6 text-center space-y-1">
                    <p className="font-serif text-base text-anthracite">{selectedProduct.name}</p>
                    <p className="font-sans text-xs text-taupe">{selectedProduct.subtitle}</p>
                    <p className="font-serif text-xl text-gold-deep mt-3">
                      {selectedProduct.priceDisplay}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="font-sans text-sm text-taupe">
                  Selecteer een artikel om een voorbeeld te zien
                </p>
              )}

              <div className="mt-6 w-full border-t border-gold/20 pt-5">
                {!uploadedPhoto && (
                  <p className="font-sans text-xs text-taupe text-center leading-relaxed">
                    De teksten op het glazen hart zijn <span className="text-anthracite font-medium">vooraf bepaald</span> en staan vast.
                    <br />
                    De foto plaatst u <span className="text-gold-deep">zelf thuis</span> in de fotolijst.
                  </p>
                )}
                {uploadedPhoto && (
                  <p className="font-sans text-xs text-taupe text-center leading-relaxed">
                    Zo ziet uw foto eruit in de fotolijst van het glazen hart.
                    <br />
                    De exacte positie kan iets afwijken van het werkelijke product.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
