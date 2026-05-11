import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/inspiration")({
  head: () => ({
    meta: [
      { title: "Inspiration & Memorial Poems — Eternal Light" },
      { name: "description", content: "Memorial poems, remembrance quotes, and comforting words to engrave on your crystal heart. Find the right phrase to honor your loved one." },
      { property: "og:title", content: "Inspiration & Memorial Poems — Eternal Light" },
      { property: "og:description", content: "Tender words for engraving — poems, quotes, and inscriptions to honor a beloved life." },
    ],
  }),
  component: InspirationPage,
});

const inscriptions = [
  "Forever in our hearts.",
  "Always with us.",
  "Loved beyond words.",
  "Until we meet again.",
  "Your light, our compass.",
  "Held, always.",
];

const poems = [
  {
    title: "A Quiet Light",
    body: `You did not leave —\nyou simply moved\ninto the part of us\nthat no winter can reach.`,
  },
  {
    title: "Beside the Window",
    body: `In the morning light\nI find you again,\nin the warmth of the cup,\nin the slow turn of pages.`,
  },
  {
    title: "Held",
    body: `Love does not end —\nit changes shape.\nIt becomes the room,\nthe air, the listening.`,
  },
];

const messages = [
  "With love that does not fade.",
  "In gentle remembrance of a life beautifully lived.",
  "For every story you began in us — thank you.",
  "We carry you, softly, into every tomorrow.",
];

function InspirationPage() {
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">Inspiration</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-[1.05]">
          Tender words <br /><i>for tender keepsakes.</i>
        </h1>
        <p className="text-foreground/65 mt-6 font-light leading-relaxed">
          A small library of inscriptions, poems and messages — gathered to help you find
          the words that feel like home.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl mb-8">Short inscriptions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {inscriptions.map((q) => (
              <div key={q} className="p-6 bg-card border border-border rounded-sm">
                <p className="font-serif italic text-lg text-foreground/85">"{q}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige py-20 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl mb-10">Memorial poems</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {poems.map((p) => (
              <article key={p.title} className="space-y-4">
                <h3 className="font-serif text-xl italic">{p.title}</h3>
                <pre className="font-serif text-base italic whitespace-pre-line leading-relaxed text-foreground/80">
                  {p.body}
                </pre>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl mb-8 text-center">Comforting messages</h2>
          <ul className="space-y-5">
            {messages.map((m) => (
              <li key={m} className="border-l-2 border-accent pl-5 font-serif italic text-lg text-foreground/85">
                "{m}"
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}
