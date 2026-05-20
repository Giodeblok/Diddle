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

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const product = products.find((p) => p.id === productId) ?? products[0];

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [shippingOption, setShippingOption] = useState<'standard' | 'express'>('standard');
  const [selectedMethod, setSelectedMethod] = useState<'ideal' | 'creditcard'>('ideal');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', postalCode: '', city: '',
  });

  const rawPrice = parseFloat(product.priceDisplay.replace('€', '').replace(',', '.').trim());
  const productPrice = isNaN(rawPrice) ? 0 : rawPrice;
  const shippingPrice = shippingOption === 'express' ? 12.95 : 0;
  const total = productPrice + shippingPrice;

  const handlePlaceOrder = async () => {
    const { firstName, lastName, email, address, postalCode, city } = formData;
    if (!firstName || !lastName || !email || !address || !postalCode || !city) {
      setOrderError('Vul alle verzendgegevens in (stap 2) voordat u de bestelling plaatst.');
      return;
    }
    setOrderLoading(true);
    setOrderError(null);
    try {
      const orderRes = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: formData.phone,
          address,
          postalCode,
          city,
          productId: product.id,
          productName: product.name,
          productSubtitle: product.subtitle,
          productPrice,
          shippingOption,
          shippingPrice,
          totalPrice: total,
        }),
      });
      const orderData = await orderRes.json().catch(() => ({}));
      if (!orderRes.ok) {
        throw new Error(orderData.error ?? 'Er is iets misgegaan. Probeer het opnieuw.');
      }
      const createdOrderNumber: string = orderData.orderNumber;
      setOrderNumber(createdOrderNumber);

      const paymentRes = await fetch(`${API_BASE}/api/icepay/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          amountEuros: total,
          email,
          paymentMethod: selectedMethod === 'ideal' ? 'IDEAL' : 'CREDITCARD',
          reference: createdOrderNumber,
        }),
      });
      const paymentData = await paymentRes.json().catch(() => ({}));
      if (!paymentRes.ok) {
        throw new Error(paymentData.error ?? 'Betaling kon niet worden gestart. Probeer het opnieuw.');
      }
      window.location.href = paymentData.checkoutUrl;
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : 'Er is iets misgegaan. Probeer het opnieuw.');
      setOrderLoading(false);
    }
  };

  if (currentStep === 4) {
    return (
      <>
        <Helmet><title>Bestelling bevestigd | Mijn Diddl</title></Helmet>
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

            <div className="w-14 h-14 bg-lilac-gradient rounded-full flex items-center justify-center mx-auto mb-7">
              <Check className="w-6 h-6 text-anthracite" />
            </div>

            <h1 className="font-serif text-3xl text-anthracite mb-4">
              Dank je voor je bestelling.
            </h1>
            <div className="diddl-divider mb-5" />
            <p className="font-sans text-sm text-violet leading-relaxed mb-8">
              Je Diddl bestelling is ontvangen en wordt zo snel mogelijk verwerkt.
              Je ontvangt een bevestigingsmail met je bestelgegevens.
            </p>

            <div className="border border-lavender bg-off-white p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between">
                <span className="font-sans text-xs text-violet">Bestelnummer</span>
                <span className="font-sans text-xs text-anthracite font-medium">#{orderNumber ?? 'EDB-0000'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs text-violet">Product</span>
                <span className="font-sans text-xs text-anthracite">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-sans text-xs text-violet">Totaal betaald</span>
                <span className="font-serif text-base text-anthracite">€ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <Link to="/" className="font-sans text-xs tracking-[0.15em] uppercase text-violet hover:text-lilac-deep transition-colors duration-300">
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
        <title>Afrekenen | Mijn Diddl</title>
        <meta name="description" content="Bestel je favoriete Diddl producten bij Mijn Diddl." />
      </Helmet>

      <div className="pt-20 min-h-screen bg-lavender/20">
        {/* Progress bar */}
        <div className="bg-off-white border-b border-lavender">
          <div className="max-w-5xl mx-auto px-6 py-5">
            <div className="flex items-center justify-center gap-0">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-anthracite border-anthracite text-off-white'
                        : 'border-lavender text-violet'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-sans text-xs">{step.id}</span>
                      )}
                    </div>
                    <span className={`font-sans text-[10px] tracking-[0.1em] uppercase mt-1.5 hidden sm:block ${
                      currentStep >= step.id ? 'text-anthracite' : 'text-violet/50'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 md:w-24 h-px mx-2 mb-4 transition-colors duration-300 ${
                      currentStep > step.id ? 'bg-lilac' : 'bg-beige'
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
                    <div className="border border-lavender bg-off-white p-6">
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-lavender">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-anthracite">{product.name}</h3>
                          <p className="font-sans text-xs text-violet mt-1">{product.subtitle}</p>
                        </div>
                        <span className="font-serif text-lg text-anthracite">{product.priceDisplay}</span>
                      </div>
                    </div>

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
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-violet block mb-2">{field.label}</label>
                          <input
                            type="text"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full border border-lavender bg-off-white px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-lilac/50 transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    {[
                      { key: 'email', label: 'E-mailadres', placeholder: 'uw@email.nl', type: 'email' },
                      { key: 'address', label: 'Adres', placeholder: 'Straatnaam en huisnummer', type: 'text' },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="font-sans text-xs tracking-[0.1em] uppercase text-violet block mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          value={formData[field.key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full border border-lavender bg-off-white px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-lilac/50 transition-colors"
                        />
                      </div>
                    ))}

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { key: 'postalCode', label: 'Postcode', placeholder: '1234 AB' },
                        { key: 'city', label: 'Stad', placeholder: 'Uw woonplaats' },
                      ].map((field) => (
                        <div key={field.key}>
                          <label className="font-sans text-xs tracking-[0.1em] uppercase text-violet block mb-2">{field.label}</label>
                          <input
                            type="text"
                            value={formData[field.key as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                            placeholder={field.placeholder}
                            className="w-full border border-lavender bg-off-white px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-lilac/50 transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Shipping options */}
                    <div className="space-y-3 pt-2">
                      <p className="font-sans text-xs tracking-[0.1em] uppercase text-violet">Verzendmethode</p>
                      {[
                        { id: 'standard', label: 'Standaard bezorging', time: '5–7 werkdagen', price: 'Gratis' },
                        { id: 'express', label: 'Express bezorging', time: '2–3 werkdagen', price: '€ 12,95' },
                      ].map((option) => (
                        <div
                          key={option.id}
                          onClick={() => setShippingOption(option.id as 'standard' | 'express')}
                          className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-300 ${
                            shippingOption === option.id ? 'border-lilac/40 bg-lilac/5' : 'border-lavender bg-off-white hover:border-lilac/30'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            shippingOption === option.id ? 'border-lilac' : 'border-lavender'
                          }`}>
                            {shippingOption === option.id && <div className="w-2 h-2 rounded-full bg-lilac" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-sans text-sm text-anthracite">{option.label}</p>
                            <p className="font-sans text-xs text-violet">{option.time}</p>
                          </div>
                          <span className="font-sans text-sm text-anthracite">{option.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 font-sans text-xs tracking-[0.12em] uppercase text-violet border border-lavender py-3.5 hover:border-lilac/40 transition-colors duration-300"
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
                      {(['iDEAL', 'Creditcard'] as const).map((method) => {
                        const key = method === 'iDEAL' ? 'ideal' : 'creditcard';
                        const selected = selectedMethod === key;
                        return (
                          <div
                            key={method}
                            onClick={() => setSelectedMethod(key)}
                            className={`border p-4 text-center cursor-pointer transition-colors duration-300 ${selected ? 'border-lilac/40 bg-lilac/5' : 'border-lavender bg-off-white hover:border-lilac/40'}`}
                          >
                            <p className="font-sans text-sm text-anthracite">{method}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="px-4 py-3 border border-lavender bg-off-white/50">
                      <p className="font-sans text-sm text-violet">
                        {selectedMethod === 'ideal'
                          ? 'U kiest uw bank op de beveiligde iCEPAY betaalpagina.'
                          : 'U voert uw kaartgegevens in op de beveiligde iCEPAY betaalpagina.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 p-4 border border-lavender bg-off-white">
                      <Shield className="w-4 h-4 text-lilac-deep flex-shrink-0" />
                      <p className="font-sans text-xs text-violet">
                        Alle betalingen zijn beveiligd met SSL-encryptie. Uw gegevens worden nooit opgeslagen.
                      </p>
                    </div>

                    <p className="font-sans text-xs text-violet/70 leading-relaxed border border-lavender bg-off-white/50 px-4 py-3">
                      Door te bestellen gaat u akkoord met onze{' '}
                      <Link to="/algemene-voorwaarden" className="underline hover:text-anthracite transition-colors duration-300">
                        Algemene Voorwaarden
                      </Link>
                      {' '}en ons{' '}
                      <Link to="/retourbeleid" className="underline hover:text-anthracite transition-colors duration-300">
                        Retourbeleid
                      </Link>
                      . Diddl producten hebben een 30-dagen retourrecht.
                    </p>

                    {orderError && (
                      <p className="font-sans text-xs text-red-600 bg-red-50 border border-red-200 px-4 py-3">
                        {orderError}
                      </p>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 font-sans text-xs tracking-[0.12em] uppercase text-violet border border-lavender py-3.5 hover:border-lilac/40 transition-colors duration-300"
                        disabled={orderLoading}
                      >
                        Terug
                      </button>
                      <LuxuryButton
                        onClick={handlePlaceOrder}
                        variant="primary"
                        size="md"
                        className="flex-1"
                        disabled={orderLoading}
                      >
                        {orderLoading ? 'Bestelling plaatsen…' : 'Bevestig bestelling'}
                      </LuxuryButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 border border-lavender bg-off-white">
                <div className="p-6 border-b border-lavender">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-violet mb-4">
                    Overzicht
                  </p>
                  <div className="overflow-hidden mb-4 aspect-[4/3]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="font-serif text-base text-anthracite">{product.name}</p>
                  <p className="font-sans text-xs text-violet mt-1">{product.subtitle}</p>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-violet">Product</span>
                    <span className="font-sans text-sm text-anthracite">€ {productPrice},-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-violet">Verzending</span>
                    <span className="font-sans text-sm text-anthracite">
                      {shippingOption === 'express' ? '€ 12,95' : 'Gratis'}
                    </span>
                  </div>
                  <div className="border-t border-lavender pt-3 flex justify-between">
                    <span className="font-sans text-sm font-medium text-anthracite">Totaal</span>
                    <span className="font-serif text-xl text-anthracite">
                      € {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="px-6 pb-6 space-y-2">
                  {[
                    { icon: Shield, text: 'Veilig betalen' },
                    { icon: Package, text: 'Zorgvuldig verpakt' },
                    { icon: Heart, text: '30 dagen retour' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <item.icon className="w-3.5 h-3.5 text-lilac-deep flex-shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-xs text-violet">{item.text}</span>
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
