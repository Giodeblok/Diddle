import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import LuxuryButton from './LuxuryButton';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-ivory py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="font-sans text-sm text-brown/70 leading-relaxed">
              Wij begrijpen dat het kiezen van een herinnering een emotioneel moment is. Onze medewerkers helpen je graag met warmte en geduld.
            </p>

            <div className="space-y-5 pt-2">
              {[
                {
                  icon: Mail,
                  title: 'E-mail',
                  value: 'info@eeuwighart.nl',
                  sub: 'We reageren binnen 1 werkdag',
                },
                {
                  icon: MessageCircle,
                  title: 'WhatsApp',
                  value: '+31 (0)85 000 0000',
                  sub: 'Ma – Vr 09:00 – 17:00',
                },
                {
                  icon: Clock,
                  title: 'Reactietijd',
                  value: 'Binnen 1 werkdag',
                  sub: 'Altijd persoonlijk antwoord',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 border border-beige">
                  <div className="w-9 h-9 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-gold-deep" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-xs tracking-[0.1em] uppercase text-taupe mb-0.5">
                      {item.title}
                    </p>
                    <p className="font-sans text-sm text-anthracite">{item.value}</p>
                    <p className="font-sans text-xs text-taupe/70 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-gold/30 bg-gold/5">
                <div className="w-12 h-12 border border-gold flex items-center justify-center mb-6">
                  <Mail className="w-5 h-5 text-gold-deep" />
                </div>
                <h3 className="font-serif text-2xl text-anthracite mb-3">
                  Bericht ontvangen
                </h3>
                <p className="font-sans text-sm text-taupe leading-relaxed max-w-xs">
                  Dank je voor je bericht. We reageren altijd persoonlijk, met zorg en aandacht, binnen één werkdag.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 border border-beige p-8 bg-cream/30">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                      Naam
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="Uw naam"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                      E-mailadres
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors"
                      placeholder="uw@email.nl"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs tracking-[0.1em] uppercase text-taupe block mb-2">
                    Bericht
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-beige bg-ivory px-4 py-3 font-sans text-sm text-anthracite placeholder-taupe/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    placeholder="Hoe kunnen wij u helpen?"
                  />
                </div>

                <LuxuryButton type="submit" variant="primary" fullWidth size="md">
                  Stuur bericht
                </LuxuryButton>

                <p className="font-sans text-xs text-taupe/60 text-center">
                  Uw gegevens worden nooit gedeeld of gebruikt voor reclame.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
