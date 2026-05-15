import { Link } from 'react-router-dom';
import { Heart, Mail, Share2, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-anthracite text-ivory/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <Heart className="w-5 h-5 fill-gold stroke-gold" strokeWidth={1.5} />
              <span className="font-serif text-xl text-ivory">Eeuwig Dichtbij</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-ivory/60 max-w-sm mb-6">
              Persoonlijke glazen harten met foto, naam en woorden die liefde tastbaar houden.
              Gemaakt met aandacht, bewaard voor altijd.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@eeuwigdichtbij.nl"
                className="w-9 h-9 border border-ivory/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/40 mb-5">
              Navigatie
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Collectie', to: '/collectie' },
                { label: 'Ontwerp jouw hart', to: '/ontwerp' },
                // { label: 'Inspiratie & gedichten', to: '/inspiratie' }, // tijdelijk verborgen
                { label: 'Veelgestelde vragen', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-ivory/60 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-ivory/60">
                info@eeuwigdichtbij.nl
              </li>
              <li className="font-sans text-sm text-ivory/60">
                +31 (0)85 000 0000
              </li>
              <li className="font-sans text-sm text-ivory/60">
                Ma – Vr: 09:00 – 17:00
              </li>
            </ul>
            <div className="mt-6 p-4 border border-ivory/10 bg-ivory/5">
              <p className="font-sans text-xs text-ivory/50 leading-relaxed">
                Wij begrijpen dat elk moment telt.
                <br />
                We reageren binnen 1 werkdag.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ivory/30">
            © 2025 Eeuwig Dichtbij. Met liefde gemaakt in Nederland.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacybeleid" className="font-sans text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300">
              Privacybeleid
            </Link>
            <Link to="/algemene-voorwaarden" className="font-sans text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300">
              Algemene voorwaarden
            </Link>
            <Link to="/retourbeleid" className="font-sans text-xs text-ivory/30 hover:text-ivory/60 transition-colors duration-300">
              Retourbeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
