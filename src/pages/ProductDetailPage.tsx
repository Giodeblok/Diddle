import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check, ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-32 text-center px-6">
        <p className="font-serif text-2xl text-anthracite mb-6">Artikel niet gevonden.</p>
        <Link to="/collectie" className="font-sans text-xs tracking-[0.2em] uppercase text-taupe hover:text-anthracite transition-colors">
          ← Terug naar collectie
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Glazen Hart</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-24 pb-24 bg-ivory">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">

          {/* Terugknop */}
          <Link
            to="/collectie"
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-taupe hover:text-anthracite transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Terug naar collectie
          </Link>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Afbeelding */}
            <div className="bg-ivory aspect-[4/3] overflow-hidden flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Informatie */}
            <div>
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-taupe block mb-3">
                {product.category}
              </span>

              {product.badge && (
                <span className="inline-block bg-gold-gradient text-anthracite text-[10px] tracking-[0.15em] uppercase px-3 py-1 font-sans mb-4">
                  {product.badge}
                </span>
              )}

              <h1 className="font-serif text-3xl lg:text-4xl text-anthracite mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-sm text-taupe italic mb-6">{product.subtitle}</p>

              <div className="luxury-divider mb-6" />

              <p className="font-sans text-sm text-brown/80 leading-relaxed mb-8">
                {product.description}
              </p>

              <ul className="space-y-2 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-3.5 h-3.5 text-gold-deep flex-shrink-0" />
                    <span className="font-sans text-sm text-brown/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 mb-8">
                <span className="font-serif text-3xl text-anthracite">{product.priceDisplay}</span>
                <span className="font-sans text-xs text-taupe">incl. BTW</span>
              </div>

              <button
                onClick={() => navigate(`/afrekenen?product=${product.id}`)}
                className="w-full text-center bg-anthracite text-ivory text-[11px] tracking-[0.2em] uppercase font-sans py-4 px-6 hover:bg-gold-deep transition-colors duration-300"
              >
                Bestel dit artikel →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
