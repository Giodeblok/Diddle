import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LivePreview } from "@/components/site/LivePreview";
import heroHeart from "@/assets/hero-heart.jpg";
import craftImg from "@/assets/craft.jpg";
import candleImg from "@/assets/candle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eternal Light — Hand-Engraved Memorial Glass Hearts" },
      { name: "description", content: "A luminous, lasting tribute. Personalized crystal memorial hearts with your photograph and chosen inscription, hand-finished in our atelier." },
      { property: "og:title", content: "Eternal Light — Memorial Glass Hearts" },
      { property: "og:description", content: "Hand-engraved crystal hearts that hold your most cherished memory in light." },
    ],
  }),
  component: HomePage,
});

const quotes = [
  "Those we love don't go away — they walk beside us every day.",
  "Your light remains in every heart you touched.",
  "Not gone. Simply quiet, simply close.",
  "Love leaves a memory no one can steal.",
];

const reviews = [
  {
    quote: "It arrived on what would have been my mother's birthday. I cried — and then I smiled. She is sitting on the windowsill now, catching the morning light.",
    name: "Eleanor V.",
    place: "Bruges",
  },
  {
    quote: "The engraving is so delicate it feels almost like breath. We placed it beside my father's chair. It belongs there.",
    name: "Marc & Sophie L.",
    place: "Lyon",
  },
  {
    quote: "I was nervous about the photograph — it was old, faded. Their team retouched it with such care. The result is beyond anything I imagined.",
    name: "Anneliese R.",
    place: "Vienna",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-16 lg:pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto fade-up">
          <span className="eyebrow">A Tangible Legacy of Love</span>
          <h1 className="font-serif text-5xl lg:text-7xl mt-6 leading-[1.05]">
            Hold their light <br />
            <i className="font-normal">forever in glass.</i>
          </h1>
          <p className="text-foreground/70 text-lg mt-8 font-light italic leading-relaxed max-w-xl mx-auto">
            Hand-engraved memorial hearts that transform your most cherished memory
            into a timeless, luminous sanctuary.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="btn-primary">Create Your Memorial</Link>
            <Link to="/inspiration" className="btn-ghost">Find the Right Words</Link>
          </div>
        </div>
        <div className="mt-20 max-w-5xl mx-auto">
          <img
            src={heroHeart}
            alt="A crystal memorial heart glowing softly with a candle inside, on warm linen"
            width={1920}
            height={1088}
            className="w-full aspect-[16/9] object-cover rounded-sm shadow-soft"
          />
        </div>
      </section>

      {/* QUOTE BREAK */}
      <section className="py-24 bg-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-serif text-3xl lg:text-4xl italic leading-snug text-foreground/85">
            "Love is not measured by the time we have, but by the light we
            leave behind in the hearts of others."
          </p>
        </div>
      </section>

      {/* PRODUCT + LIVE PREVIEW */}
      <section id="preview" className="bg-card py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="eyebrow">The Atelier Heart</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4">Compose your tribute, gently.</h2>
            <p className="text-foreground/60 font-light mt-4">
              Upload a photograph, choose an inscription, see it come to life.
            </p>
          </div>
          <LivePreview />
        </div>
      </section>

      {/* MEMORIAL QUOTES */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow">Words to Engrave</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4">Inspiration for your heart.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {quotes.map((q, i) => (
              <figure key={i} className="border-l-2 border-accent pl-6 py-2">
                <blockquote className="font-serif text-xl italic leading-relaxed text-foreground/85">
                  "{q}"
                </blockquote>
                <figcaption className="mt-4 text-[10px] uppercase tracking-[0.25em] text-accent">
                  Inscription {String.fromCharCode(65 + i)}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/inspiration" className="btn-ghost">Read All Inscriptions</Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-beige px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="eyebrow">Held in Trust</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4">Letters from families.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <article key={r.name} className="bg-card p-8 border border-border rounded-sm">
                <p className="font-serif italic text-lg leading-relaxed text-foreground/80">
                  "{r.quote}"
                </p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mt-1">{r.place}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={craftImg}
            alt="Artisan polishing a crystal heart in a sunlit atelier"
            loading="lazy"
            width={1280}
            height={832}
            className="w-full aspect-[5/4] object-cover rounded-sm shadow-soft"
          />
          <div>
            <span className="eyebrow">Our Atelier</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4 leading-tight">
              Honoring the invisible bonds.
            </h2>
            <p className="text-foreground/70 font-light mt-6 leading-loose">
              Eternal Light was founded on a quiet realization: memories are precious,
              but they are also fragile. Our work is to anchor your most beloved moments
              in something as enduring as the love itself. Every heart is hand-polished
              and inspected with the reverence your loved one deserves.
            </p>
            <div className="mt-8">
              <Link to="/about" className="btn-ghost">Read Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <img
          src={candleImg}
          alt="A lit candle beside white peonies"
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight">
            Begin a quiet tribute.
          </h2>
          <p className="text-foreground/70 mt-5 font-light">
            We are here, gently, whenever you are ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link to="/shop" className="btn-primary">Create Your Memorial</Link>
            <Link to="/contact" className="btn-ghost">Speak With Us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
