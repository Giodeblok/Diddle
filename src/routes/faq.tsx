import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Veelgestelde vragen — Eeuwig Dichtbij" },
      { name: "description", content: "Antwoorden over bezorgtijd, verpakking, betaling, verzending en ons retourbeleid voor glazen harten." },
      { property: "og:title", content: "Veelgestelde vragen — Eeuwig Dichtbij" },
      { property: "og:description", content: "Alles wat u wilt weten over bestellen en zorgen voor uw glazen hart." },
    ],
  }),
  component: FaqPage,
});

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "How long does delivery take?",
    a: "Each heart is made to order and ships within 12–14 working days via insured concierge delivery. Express creation is available on request — please write to us.",
  },
  {
    q: "How do I personalize my heart?",
    a: "After choosing your size and base, you'll upload a photograph and add an optional inscription. Our atelier will send you a digital proof for approval before engraving begins.",
  },
  {
    q: "What kind of photo works best?",
    a: "Clear, well-lit portraits with soft contrast translate most beautifully. Older or faded photographs can be gently restored by our team at no additional cost.",
  },
  {
    q: "How is the engraving made?",
    a: "We use sub-surface laser engraving inside optical-grade crystal — the image lives within the glass, not on its surface, and will not fade or scratch.",
  },
  {
    q: "How is it packaged?",
    a: "Every heart arrives in a silk-lined keepsake box with a hand-written card and a soft polishing cloth. It is suitable for gifting without further wrapping.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "We accept all major cards, PayPal, Apple Pay, Google Pay, Klarna and SEPA bank transfer. All transactions are encrypted.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. We ship worldwide with full insurance. Customs and duties for non-EU destinations are calculated at checkout where possible.",
  },
  {
    q: "Kan ik mijn bestelling retourneren?",
    a: "Ja, u kunt uw bestelling binnen 14 dagen na ontvangst retourneren, op voorwaarde dat het product ongebruikt en in originele staat is. De retourkosten zijn voor uw rekening. Uitzondering: glazen harten met mini-urn waarbij de urn al is gevuld, kunnen niet worden geretourneerd vanwege de intieme en hygiënische aard van het product.",
  },
  {
    q: "Wat als mijn hart beschadigd aankomt of een fout bevat?",
    a: (
      <>
        Dat spijt ons zeer. Stuur ons binnen 14 dagen na ontvangst een e-mail naar info@eeuwigdichtbij.nl met uw bestelnummer, een omschrijving en foto's van het probleem. Wij reageren binnen 1 werkdag en zorgen voor een passende oplossing. Lees ons volledige{" "}
        <Link to="/retourbeleid" className="underline underline-offset-2 hover:text-foreground/90 transition-colors">
          retourbeleid
        </Link>{" "}
        voor meer informatie.
      </>
    ),
  },
  {
    q: "How do I care for the heart?",
    a: "Wipe gently with the included microfiber cloth. Avoid harsh cleaners. The crystal is durable, but treat it as you would a fine glass keepsake.",
  },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">Care & Guidance</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-[1.05]">
          Gentle answers, <br /><i>at your own pace.</i>
        </h1>
      </section>
      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-serif text-lg py-5 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-light leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </SiteLayout>
  );
}
