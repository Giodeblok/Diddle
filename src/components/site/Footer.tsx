import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-anthracite text-cream/85 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-12 border-b border-cream/10">
        <div className="md:col-span-2 space-y-6">
          <div className="font-serif text-xl tracking-[0.3em] uppercase">Eternal Light</div>
          <p className="text-sm font-light text-cream/55 max-w-sm leading-relaxed">
            A boutique memorial atelier dedicated to preserving life's most beautiful chapters
            through hand-engraved crystal and quiet light.
          </p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-cream/60">
            support@eternallight.com
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Information</h4>
          <ul className="text-sm font-light space-y-3 text-cream/60">
            <li><Link to="/shop">Collections</Link></li>
            <li><Link to="/faq">Shipping & Care</Link></li>
            <li><Link to="/faq">Photo Quality Guide</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Our Spirit</h4>
          <ul className="text-sm font-light space-y-3 text-cream/60">
            <li><Link to="/inspiration">Memorial Poems</Link></li>
            <li><Link to="/about">The Atelier Story</Link></li>
            <li><Link to="/contact">Speak With Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-cream/35">
        <span>© {new Date().getFullYear()} Eeuwig Hart</span>
        <div className="flex flex-wrap items-center gap-6">
          <Link to="/retourbeleid" className="hover:text-cream/60 transition-colors duration-300">Retourbeleid</Link>
          <a href="#" className="hover:text-cream/60 transition-colors duration-300">Algemene voorwaarden</a>
          <a href="#" className="hover:text-cream/60 transition-colors duration-300">Privacybeleid</a>
        </div>
      </div>
    </footer>
  );
}
