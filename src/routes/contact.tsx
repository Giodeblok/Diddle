import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Speak With Us — Eternal Light" },
      { name: "description", content: "We are here, gently, whenever you are ready. Reach our atelier with any question, photo, or memory you'd like to share." },
      { property: "og:title", content: "Contact — Eternal Light" },
      { property: "og:description", content: "Reach our atelier with care. We respond within one working day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">Speak With Us</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-[1.05]">
          We are here, <br /><i>gently, when you are ready.</i>
        </h1>
        <p className="text-foreground/65 mt-6 font-light leading-relaxed">
          Whether you have a question about a photograph, an inscription, or simply
          wish to share a memory — we read every message personally and reply within
          one working day.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-xl mx-auto bg-card border border-border rounded-sm p-8 lg:p-10">
          {sent ? (
            <div className="text-center py-10">
              <p className="font-serif text-2xl italic">Thank you.</p>
              <p className="text-foreground/65 mt-3 font-light">
                Your message is in our hands. We will write back soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-6"
            >
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Your name</label>
                <input required className="mt-2 w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent text-base" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Email</label>
                <input required type="email" className="mt-2 w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent text-base" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Your message</label>
                <textarea required rows={5} className="mt-2 w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent text-base resize-none" />
              </div>
              <button type="submit" className="btn-primary w-full">Send With Care</button>
            </form>
          )}
        </div>

        <div className="max-w-xl mx-auto mt-12 text-center text-sm text-foreground/60 font-light space-y-2">
          <p><span className="text-[10px] uppercase tracking-[0.25em] text-accent block mb-1">Email</span>support@eternallight.com</p>
          <p><span className="text-[10px] uppercase tracking-[0.25em] text-accent block mb-1 mt-4">Atelier hours</span>Mon–Fri · 9:00 — 17:00 CET</p>
        </div>
      </section>
    </SiteLayout>
  );
}
