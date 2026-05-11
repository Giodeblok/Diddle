import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import craftImg from "@/assets/craft.jpg";
import candleImg from "@/assets/candle.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Eternal Light Atelier" },
      { name: "description", content: "An atelier dedicated to preserving life's quiet chapters. Read the story behind Eternal Light memorial glass hearts." },
      { property: "og:title", content: "Our Story — Eternal Light" },
      { property: "og:description", content: "A boutique memorial atelier honoring memory through hand-engraved crystal." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">Our Atelier</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-[1.05]">
          A quiet workshop, <br /><i>a lifelong promise.</i>
        </h1>
      </section>

      <section className="px-6 lg:px-10 pb-24">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <img src={craftImg} alt="Hands polishing a crystal heart" loading="lazy" width={1280} height={832}
            className="w-full aspect-[5/4] object-cover rounded-sm shadow-soft" />
          <div className="space-y-6 text-foreground/75 font-light leading-loose">
            <p>
              Eternal Light began on a winter afternoon, with a single photograph and the
              ache of wanting to hold it in something real. A grandmother had passed; the
              family wanted more than a frame on a shelf — they wanted light, weight,
              presence.
            </p>
            <p>
              Years later, our atelier still works the same way. One artisan. One heart.
              One photograph at a time. We retouch faded portraits with care, etch them
              into optical crystal, and hand-polish each piece until the light moves
              through it like breath.
            </p>
            <p>
              We believe a tribute should sit naturally in the home — not as a reminder of
              loss, but as a vessel for the warmth that remains.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-beige py-24 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-3xl italic leading-snug text-foreground/85">
            "Memory is the truest form of presence. We simply give it a vessel."
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-accent">— The Atelier</p>
        </div>
      </section>

      <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <img src={candleImg} alt="" aria-hidden loading="lazy" width={1024} height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl">Crafted, not produced.</h2>
          <p className="mt-5 text-foreground/70 font-light">
            We accept a small number of orders each month, so every heart receives the
            attention it deserves.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
