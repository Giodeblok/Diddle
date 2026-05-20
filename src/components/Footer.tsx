import { Link } from 'react-router-dom';
import { Mail, Share2, Globe } from 'lucide-react';

function DiddlFooterIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" aria-hidden="true">
      <ellipse cx="16" cy="18" rx="8" ry="9" fill="white" opacity="0.9" />
      <ellipse cx="9" cy="10" rx="4" ry="5" fill="white" opacity="0.9" />
      <ellipse cx="9" cy="10" rx="2.2" ry="3" fill="#F9A8D4" />
      <ellipse cx="23" cy="10" rx="4" ry="5" fill="white" opacity="0.9" />
      <ellipse cx="23" cy="10" rx="2.2" ry="3" fill="#F9A8D4" />
      <circle cx="13" cy="17" r="1.2" fill="#232323" />
      <circle cx="19" cy="17" r="1.2" fill="#232323" />
      <ellipse cx="16" cy="20" rx="1" ry="0.7" fill="#F9A8D4" />
      <ellipse cx="10" cy="28" rx="4.5" ry="2.2" fill="#F9A8D4" />
      <ellipse cx="22" cy="28" rx="4.5" ry="2.2" fill="#F9A8D4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-anthracite text-off-white/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <DiddlFooterIcon />
              <span className="font-serif text-xl text-off-white font-bold">Mijn Diddl</span>
            </div>
            <p className="font-sans text-sm leading-relaxed text-off-white/60 max-w-sm mb-4">
              De officiële Diddl webshop voor Nederland en België. Authentieke, gelicentieerde producten, snel geleverd, zorgvuldig verpakt.
            </p>
            <p className="font-sans text-xs text-off-white/40 mb-6">
              Officieel gelicentieerde Diddl merchandise. Diddl is een geregistreerd merk van Thomas Goletz / Kiddinx GmbH.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-9 h-9 border border-off-white/20 rounded-full flex items-center justify-center hover:border-lilac hover:text-lilac transition-all duration-300"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-off-white/20 rounded-full flex items-center justify-center hover:border-lilac hover:text-lilac transition-all duration-300"
                aria-label="Facebook"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:info@mijndiddl.nl"
                className="w-9 h-9 border border-off-white/20 rounded-full flex items-center justify-center hover:border-lilac hover:text-lilac transition-all duration-300"
                aria-label="E-mail"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-off-white/40 mb-5">
              Navigatie
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Collectie', to: '/collectie' },
                { label: 'Nieuw binnen', to: '/nieuw' },
                { label: 'Blog', to: '/blog' },
                { label: 'Over ons', to: '/over-ons' },
                { label: 'Veelgestelde vragen', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-off-white/60 hover:text-lilac transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-off-white/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-off-white/60">
                info@mijndiddl.nl
              </li>
              <li className="font-sans text-sm text-off-white/60">
                Ma – Vr: 09:00 – 17:00
              </li>
            </ul>
            <div className="mt-6 p-4 border border-off-white/10 rounded-xl bg-off-white/5">
              <p className="font-sans text-xs text-off-white/50 leading-relaxed">
                We reageren binnen 1 werkdag.
                <br />
                Gratis verzending vanaf €25!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-off-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-off-white/30">
            © 2026 Mijn Diddl. Met liefde gemaakt in Nederland. 🐭
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacybeleid" className="font-sans text-xs text-off-white/30 hover:text-off-white/60 transition-colors duration-300">
              Privacybeleid
            </Link>
            <Link to="/algemene-voorwaarden" className="font-sans text-xs text-off-white/30 hover:text-off-white/60 transition-colors duration-300">
              Algemene voorwaarden
            </Link>
            <Link to="/retourbeleid" className="font-sans text-xs text-off-white/30 hover:text-off-white/60 transition-colors duration-300">
              Retourbeleid
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
