import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LuxuryButton from './LuxuryButton';

const navLinks = [
  { label: 'Collectie', to: '/collectie' },
  { label: 'Nieuw', to: '/nieuw' },
  { label: 'Blog', to: '/blog' },
  { label: 'Over ons', to: '/over-ons' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

function DiddlMouseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="16" cy="18" rx="8" ry="9" fill="white" stroke="#C084FC" strokeWidth="1.5" />
      {/* Left ear */}
      <ellipse cx="9" cy="10" rx="4" ry="5" fill="white" stroke="#C084FC" strokeWidth="1.5" />
      <ellipse cx="9" cy="10" rx="2.2" ry="3" fill="#F9A8D4" />
      {/* Right ear */}
      <ellipse cx="23" cy="10" rx="4" ry="5" fill="white" stroke="#C084FC" strokeWidth="1.5" />
      <ellipse cx="23" cy="10" rx="2.2" ry="3" fill="#F9A8D4" />
      {/* Eyes */}
      <circle cx="13" cy="17" r="1.2" fill="#232323" />
      <circle cx="19" cy="17" r="1.2" fill="#232323" />
      {/* Nose */}
      <ellipse cx="16" cy="20" rx="1" ry="0.7" fill="#F9A8D4" />
      {/* Left foot */}
      <ellipse cx="10" cy="28" rx="4.5" ry="2.2" fill="#F9A8D4" stroke="#C084FC" strokeWidth="1.2" />
      {/* Right foot */}
      <ellipse cx="22" cy="28" rx="4.5" ry="2.2" fill="#F9A8D4" stroke="#C084FC" strokeWidth="1.2" />
    </svg>
  );
}

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
            ? 'bg-off-white/95 backdrop-blur-md shadow-soft border-b border-lilac/20'
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
                <DiddlMouseIcon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-serif text-xl font-bold text-anthracite tracking-wide">
                  Mijn Diddl
                </span>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-sans text-xs tracking-[0.12em] uppercase transition-colors duration-300 hover:text-lilac-deep ${
                    location.pathname === link.to
                      ? 'text-lilac-deep font-semibold'
                      : 'text-anthracite'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <LuxuryButton to="/collectie" size="sm">
                Shop nu
              </LuxuryButton>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-anthracite hover:text-lilac-deep transition-colors duration-300"
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
            className="fixed inset-0 z-40 bg-off-white flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-lilac/20">
              <Link to="/" className="flex items-center gap-2.5">
                <DiddlMouseIcon className="w-8 h-8" />
                <span className="font-serif text-xl font-bold text-anthracite">Mijn Diddl</span>
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
                    className="font-serif text-2xl font-bold text-anthracite hover:text-lilac-deep transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-8 pb-12">
              <LuxuryButton to="/collectie" fullWidth size="lg">
                Shop de collectie
              </LuxuryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
