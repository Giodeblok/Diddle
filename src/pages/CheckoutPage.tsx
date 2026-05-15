import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Package, ChevronRight, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import LuxuryButton from '../components/LuxuryButton';
import { products } from '../data/products';

type Step = 1 | 2 | 3 | 4;

const steps = [
  { id: 1, label: 'Overzicht' },
  { id: 2, label: 'Verzending' },
  { id: 3, label: 'Betaling' },
  { id: 4, label: 'Bevestiging' },
];

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const product = products.find((p) => p.id === productId) ?? products[0];

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', postalCode: '', city: '',
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    giftMessage: '',
  });

  const rawPrice = parseFloat(product.priceDisplay.replace('€', '').replace(',', '.').trim());
  const productPrice = isNaN(rawPrice) ? 0 : rawPrice;
  const giftWrapPrice = 5;
  const shippingPrice = shippingOption === 'express' ? 12.95 : 0;
  const total = productPrice + (giftWrap ? giftWrapPrice : 0) + shippingPrice;

  if (currentStep === 4) {
    return (
      <>
        <Helmet><title>Bestelling bevestigd | Eeuwig Hart</title></Helmet>
        <div className="pt-20 min-h-screen bg-hero-gradient flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full text-center"
          >
            <div className="flex justify-center mb-8 overflow-hidden w-40 h-32 mx-auto">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>

            <div className="w-14 h-14 bg-gold-gradient flex items-center justify-center mx-auto mb-7">
              <Check className="w-6 h-6 text-anthracite" />
            </div>

            <h1 className="font-serif text-3xl text-anthracite mb-4">
              Dank je voor je bestelling.
            </h1>
            <div className="luxury-divider mb-5" />
            <p className="font-sans text-sm text-taupe leading-relaxed mb-8">
              We behandelen jouw herinnering met de grootste zorg.
              Je ontvangt binnenkort een digitaal voorbeeld ter goedkeuring.
              Pas daarna beginnen wij met de productie.
            </p>

            <div className="border border-beige bg-ivory p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between">
                <span className="font-sans text-xs text-taupe">Bestelnummer</span>
                <span className="font-sans text-xs text-anthracite font-medium">#EDB-2025-0847</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs text-taupe">Product</span>
                <span className="font-sans text-xs text-anthracite">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs text-taupe">Totaal betaald</span>
                <span className="font-serif text-base text-anthracite">€ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Link to="/" className="font-sans text-xs tracking-[0.15em] uppercase text-taupe hover:text-gold-deep transition-colors duration-300">
              Terug naar de homepage
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Afrekenen | Eeuwig Hart</title>
        <meta name="description" content="Plaats uw bestelling voor een persoonlijk glazen hart." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-cream">
        {/* Progress bar */}
        <div className="bg-ivory border-b border-beige">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-center gap-0">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-anthracite border-anthracite text-ivory'
                        : 'border-beige text-taupe'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-sans text-xs">{step.id}</span>
                      )}
                    </div>
                    <span className={`font-sans text-[10px] tracking-[0.1em] uppercase mt-1.5 hidden sm:block ${
                      currentStep >= step.id ? 'text-anthracite' : 'text-taupe/50'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 md:w-24 h-px mx-2 mb-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-gold' : 'bg-beige'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main form area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-anthracite">Uw bestelling</h2>

                    {/* Product summary */}
                    <div className="border border-beige bg-ivory p-6">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-beige">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-anthracite">{product.name}</h3>
                          <p className="font-sans text-xs text-taupe mt-1">{product.subtitle}</p>
                        </div>
                        <span className="font-serif text-lg text-anthracite">{product.priceDisplay}</span>
                      </div>
                    </div>

                    {/* Gift wrap */}
                    <div
                      onClick={() => setGiftWrap(!giftWrap)}
                      className={`flex items-center gap-4 p-5 border cursor-pointer transition-all duration-300 ${
                        giftWrap ? 'border-gold/40 bg-gold/5' : 'border-beige bg-ivory hover:border-gold/30'
                      }`}
                    >
                      <div className={`w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-colors ${
                        giftWrap ? 'border-gold bg-gold' : 'border-beige'
                      }`}>
                        {giftWrap && <Check className="w-3 h-3 text-anthracite" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-sm text-anthracite font-medium">Luxe geschenkverpakking</p>
                        <p className="font-sans text-xs text-taupe">Fluwelen doos met lint en handgeschreven kaart</p>
                      </div>
                      <span className="font-sans text-sm text-taupe">+ € 5,00</span>
                    </div>

                    {/* Gift message */}
                    {giftWrap && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                          Persoonlijke boodschap (optioneel)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.giftMessage}
                          onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                          placeholder="Een persoonlijk woord bij het cadeau..."
                          className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                        />
                      </motion.div>
                    )}

                    <LuxuryButton
                      onClick={() => setCurrentStep(2)}
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Verder naar verzending
                      <ChevronRight className="w-4 h-4" />
                    </LuxuryButton>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-anthracite">Verzendgegevens</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: 'firstName', label: 'Voornaam', placeholder: 'Uw voornaam' },
                        { key: 'lastName', label: 'Achternaam', placeholder: 'Uw achternaam' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">{field.label}</label>
                          <input
                            type="text"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    {[
                      { key: 'email', label: 'E-mailadres', placeholder: 'uw@email.nl', type: 'email' },
                      { key: 'address', label: 'Adres', placeholder: 'Straatnaam en huisnummer', type: 'text' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    ))}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: 'postalCode', label: 'Postcode', placeholder: '1234 AB' },
                        { key: 'city', label: 'Stad', placeholder: 'Uw woonplaats' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">{field.label}</label>
                          <input
                            type="text"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Shipping options */}
                    <div className="space-y-3 pt-2">
                      <p className="font-sans text-xs tracking-[0.1em] uppercase text-taupe">Verzendmethode</p>
                      {[
                        { id: 'standard', label: 'Standaard bezorging', time: '5–7 werkdagen', price: 'Gratis' },
                        { id: 'express', label: 'Express bezorging', time: '2–3 werkdagen', price: '€ 12,95' },
                      ].map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setShippingOption(option.id as 'standard' | 'express')}
                          className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 ${
                            shippingOption === option.id ? 'border-gold/40 bg-gold/5' : 'border-beige bg-ivory hover:border-gold/30'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            shippingOption === option.id ? 'border-gold' : 'border-beige'
                          }`}>
                            {shippingOption === option.id && <div className="w-2 h-2 rounded-full bg-gold" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-sans text-sm text-anthracite">{option.label}</p>
                            <p className="font-sans text-xs text-taupe">{option.time}</p>
                          </div>
                          <span className="font-sans text-sm text-anthracite">{option.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 font-sans text-xs tracking-[0.12em] uppercase text-taupe border border-beige py-3.5 hover:border-gold/40 transition-colors duration-300"
                      >
                        Terug
                      </button>
                      <LuxuryButton onClick={() => setCurrentStep(3)} variant="primary" size="md" className="flex-1">
                        Verder naar betaling
                      </LuxuryButton>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-2xl text-anthracite">Betaling</h2>

                    {/* Payment method */}
                    <div className="grid grid-cols-2 gap-3">
                      {['iDEAL', 'Creditcard', 'Bancontact', 'PayPal'].map((method) => (
                        <div
                          key={method}
                          className="border border-beige bg-ivory p-4 text-center cursor-pointer hover:border-gold/40 transition-colors duration-300 first:border-gold/40 first:bg-gold/5"
                        >
                          <p className="font-sans text-sm text-anthracite">{method}</p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'cardName', label: 'Naam op kaart', placeholder: 'Zoals op uw kaart staat' },
                        { key: 'cardNumber', label: 'Kaartnummer', placeholder: '1234 5678 9012 3456' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">{field.label}</label>
                          <input
                            type="text"
                            placeholder={field.placeholder}
                            className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                          />
                        </div>
                      ))}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">Vervaldatum</label>
                          <input type="text" placeholder="MM / JJ" className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors" />
                        </div>
                        <div>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">CVV</label>
                          <input type="text" placeholder="123" className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border border-beige bg-ivory">
                      <Shield className="w-4 h-4 text-gold-deep flex-shrink-0" />
                      <p className="font-sans text-xs text-taupe">
                        Alle betalingen zijn beveiligd met SSL-encryptie. Uw gegevens worden nooit opgeslagen.
                      </p>
                    </div>

                    <p className="font-sans text-xs text-taupe/70 leading-relaxed border border-beige bg-ivory/50 px-4 py-3">
                      Door te bestellen gaat u akkoord met onze{' '}
                      <Link to="/algemene-voorwaarden" className="underline hover:text-anthracite transition-colors duration-300">
                        Algemene Voorwaarden
                      </Link>
                      . Gepersonaliseerde producten zijn niet retourneerbaar na goedkeuring van de digitale preview (art. 6:230p sub b BW).
                    </p>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 font-sans text-xs tracking-[0.12em] uppercase text-taupe border border-beige py-3.5 hover:border-gold/40 transition-colors duration-300"
                      >
                        Terug
                      </button>
                      <LuxuryButton
                        onClick={() => setCurrentStep(4)}
                        variant="primary"
                        size="md"
                        className="flex-1"
                      >
                        Bevestig bestelling
                      </LuxuryButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-beige bg-ivory">
                <div className="p-6 border-b border-beige">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-taupe mb-4">
                    Overzicht
                  </p>
                  <div className="overflow-hidden mb-4 aspect-[4/3]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="font-serif text-base text-anthracite">{product.name}</p>
                  <p className="font-sans text-xs text-taupe mt-1">{product.subtitle}</p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-taupe">Product</span>
                    <span className="font-sans text-sm text-anthracite">€ {productPrice},-</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="font-sans text-sm text-taupe">Geschenkverpakking</span>
                      <span className="font-sans text-sm text-anthracite">€ {giftWrapPrice},-</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-taupe">Verzending</span>
                    <span className="font-sans text-sm text-anthracite">
                      {shippingOption === 'express' ? '€ 12,95' : 'Gratis'}
                    </span>
                  </div>
                  <div className="border-t border-beige pt-3 flex justify-between">
                    <span className="font-sans text-sm font-medium text-anthracite">Totaal</span>
                    <span className="font-serif text-xl text-anthracite">
                      € {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-2">
                  {[
                    { icon: Shield, text: 'Veilig betalen' },
                    { icon: Package, text: 'Luxe geschenkverpakking' },
                    { icon: Heart, text: 'Voorbeeld voor productie' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <item.icon className="w-3.5 h-3.5 text-gold-deep flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-xs text-taupe">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
