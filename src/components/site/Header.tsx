import { Link } from "@tanstack/react-router";

const links = [
  { to: "/shop", label: "Collections" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/about", label: "Our Story" },
  { to: "/faq", label: "Care & FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-5">
        <Link to="/" className="font-serif text-xl tracking-[0.3em] uppercase">
          Eternal Light
        </Link>
        <div className="hidden md:flex gap-9 text-[10px] uppercase tracking-[0.22em] font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-foreground/70 hover:text-accent transition-colors"
              activeProps={{ className: "text-accent" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/shop" className="text-[10px] uppercase tracking-[0.22em] font-medium text-foreground/70 hover:text-accent transition-colors">
          Cart (0)
        </Link>
      </nav>
    </header>
  );
}
