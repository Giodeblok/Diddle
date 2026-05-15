import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import LuxuryButton from './LuxuryButton';

const navLinks = [
  { label: 'Collectie', to: '/collectie' },
  { label: 'Ontwerp', to: '/ontwerp' },
  // { label: 'Inspiratie', to: '/inspiratie' }, // tijdelijk verborgen
  { label: 'Over ons', to: '/over-ons' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-soft border-b border-gold/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <Heart
                  className="w-5 h-5 fill-gold stroke-gold transition-all duration-300 group-hover:fill-gold-deep group-hover:stroke-gold-deep"
                  strokeWidth={1.5}
                />
                <span className="font-serif text-xl text-anthracite tracking-wide">
                  Eeuwig Dichtbij
                </span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-sans text-xs tracking-[0.12em] uppercase transition-colors duration-300 hover:text-gold-deep ${
                    location.pathname === link.to
                      ? 'text-gold-deep'
                      : scrolled
                      ? 'text-anthracite'
                      : 'text-anthracite'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LuxuryButton to="/ontwerp" size="sm">
                Ontwerp jouw hart
              </LuxuryButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-anthracite hover:text-gold-deep transition-colors duration-300"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-ivory flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-gold/20">
              <Link to="/" className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 fill-gold stroke-gold" strokeWidth={1.5} />
                <span className="font-serif text-xl text-anthracite">Eeuwig Dichtbij</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-anthracite"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col flex-1 px-8 pt-12 gap-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to={link.to}
                    className="font-serif text-2xl text-anthracite hover:text-gold-deep transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <LuxuryButton to="/ontwerp" fullWidth size="lg">
                Ontwerp jouw hart
              </LuxuryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
