import { useState } from "react";
import productHeart from "@/assets/product-heart.jpg";

const sizes = [
  { id: "small", label: "Petite", mm: "80mm", price: "€185" },
  { id: "medium", label: "Classic", mm: "120mm", price: "€245" },
  { id: "grand", label: "Grand", mm: "160mm", price: "€325" },
] as const;

export function LivePreview() {
  const [size, setSize] = useState<string>("medium");
  const [inscription, setInscription] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {/* Preview canvas */}
      <div className="relative">
        <div className="relative aspect-[4/5] bg-beige overflow-hidden rounded-sm shimmer">
          <img
            src={photo ?? productHeart}
            alt="Engraving preview of memorial heart"
            loading="lazy"
            width={1024}
            height={1280}
            className="w-full h-full object-cover"
          />
          {inscription && (
            <div className="absolute inset-x-0 bottom-12 text-center px-6">
              <p className="font-serif italic text-2xl text-anthracite/80 drop-shadow-sm">
                {inscription}
              </p>
            </div>
          )}
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-foreground/40 text-center">
          Live engraving simulation
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-10">
        <div>
          <span className="eyebrow">Compose Your Heart</span>
          <h3 className="font-serif text-3xl lg:text-4xl mt-3 leading-tight">
            A vessel made <i>for them.</i>
          </h3>
          <p className="text-foreground/60 font-light mt-4 leading-relaxed">
            Three quiet steps. Our atelier hand-finishes every piece within twelve days.
          </p>
        </div>

        <div className="space-y-7 bg-card/60 p-8 border border-border rounded-sm">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              Step 1 — Upload a photograph
            </label>
            <label className="flex items-center justify-center h-28 border border-dashed border-foreground/15 rounded-sm cursor-pointer hover:border-accent/60 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPhoto(URL.createObjectURL(file));
                }}
              />
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {photo ? "Photograph received — change" : "Drop your memory here"}
              </span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              Step 2 — Custom inscription
            </label>
            <input
              type="text"
              value={inscription}
              onChange={(e) => setInscription(e.target.value)}
              placeholder="A name, a date, a quiet phrase…"
              className="w-full bg-transparent border-b border-border py-3 focus:outline-none focus:border-accent text-base font-serif italic placeholder:text-foreground/30"
            />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              Step 3 — Choose a size
            </span>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s.id)}
                  className={`p-4 text-center border rounded-sm transition-colors ${
                    size === s.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                  }`}
                >
                  <span className="block text-xs font-medium">{s.label}</span>
                  <span className="block text-[10px] text-foreground/50 mt-1">{s.mm}</span>
                  <span className="block text-[10px] text-foreground/70 mt-2">{s.price}</span>
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary w-full">Add to Atelier Cart</button>
        </div>
      </div>
    </div>
  );
}
