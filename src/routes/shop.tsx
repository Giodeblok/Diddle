import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LivePreview } from "@/components/site/LivePreview";
import productHeart from "@/assets/product-heart.jpg";
import heroHeart from "@/assets/hero-heart.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "The Collection — Eternal Light" },
      { name: "description", content: "Browse our hand-engraved crystal memorial hearts. Three sizes, optical-grade glass, custom photo and inscription. Crafted in our atelier." },
      { property: "og:title", content: "Memorial Heart Collection — Eternal Light" },
      { property: "og:description", content: "Personalized crystal memorial hearts, hand-engraved with your photograph." },
    ],
  }),
  component: ShopPage,
});

const products = [
  {
    name: "The Classic Heart",
    detail: "Optical crystal · 120mm · smoked oak base",
    price: "From €245",
    img: productHeart,
  },
  {
    name: "The Petite Heart",
    detail: "Optical crystal · 80mm · brushed brass base",
    price: "From €185",
    img: heroHeart,
  },
  {
    name: "The Grand Heart",
    detail: "Optical crystal · 160mm · oak base with soft LED",
    price: "From €325",
    img: productHeart,
  },
];

function ShopPage() {
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">The Collection</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-tight">
          Three quiet vessels, <i>one shared light.</i>
        </h1>
        <p className="text-foreground/65 mt-6 font-light leading-relaxed">
          Each piece is hand-blown, laser-engraved with your photograph, and finished by a
          single artisan. Ships in a silk-lined keepsake box within twelve days.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {products.map((p) => (
            <article key={p.name} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-beige">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <p className="text-sm text-foreground/55 font-light mt-1">{p.detail}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-accent">{p.price}</span>
                  <a href="#preview" className="text-[10px] uppercase tracking-[0.25em] text-foreground/60 hover:text-accent transition-colors">Personalize →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="preview" className="bg-card py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="eyebrow">Live Preview</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4">Compose your tribute.</h2>
          </div>
          <LivePreview />
        </div>
      </section>
    </SiteLayout>
  );
}
