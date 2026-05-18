import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LivePreview } from "@/components/site/LivePreview";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Collectie — Glazen Hart" },
      {
        name: "description",
        content:
          "Bekijk onze collectie gedenkartikelen: glazen harten met mini urn, fotolijst en gedicht. Een waardig aandenken aan uw dierbare.",
      },
    ],
  }),
  component: ShopPage,
});

type Product = {
  id: string;
  title: string;
  detail: string;
  price: string;
  image: string;
  url: string;
};

type Category = {
  id: string;
  name: string;
  description: string;
  badge?: string;
  products: Product[];
};

const categories: Category[] = [
  {
    id: "hart-mini-urn",
    name: "Glazen Hart met Mini Urn",
    description:
      "Kristalhelder glazen hart met mini urn (15 g as), kaarshouder, fotoruimte (5×7 cm) en gedicht in spiegelletter.",
    badge: "Meest compleet",
    products: [
      {
        id: "hart-mini-urn-te-snel",
        title: "Glazen Hart 'Je bent zo snel'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/9/7/977x1200_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-hart-met-mini-urn-en-gedicht-je-bent-zo-snel-8717904040118-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-in-mijn-hart",
        title: "Glazen Hart 'In mijn hart'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1134_2_2.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-in-mijn-hart-8717904040101-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-mam",
        title: "Glazen Hart 'Mam'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_mini_urn_gedicht_mam..._8717904023944_blokshop.nl_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-mam-8717904040095-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-pa",
        title: "Glazen Hart 'Pa'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1116_2.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-pa-8717904023920-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-mijn-herinnering",
        title: "Glazen Hart 'Mijn Herinnering'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1099_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-mijn-herinnering-8717904040064-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-lieve-oma",
        title: "Glazen Hart 'Lieve Oma'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/m/oma_urn.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-lieve-oma-overlijden-overleden-herdenken-8717904012283-blokshop-krel-nl.html",
      },
      {
        id: "hart-mini-urn-lieve-opa",
        title: "Glazen Hart 'Lieve Opa'",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/i/lieve_opa_urn_met_kaarsje.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-lieve-opa.html",
      },
    ],
  },
  {
    id: "hart-urn",
    name: "Glazen Hart met Urn",
    description:
      "Glazen hart gecombineerd met urn voor as, kaarshouder, fotoruimte (5×7 cm) en een ontroerend gedicht in spiegelletter.",
    products: [
      {
        id: "hart-urn-mijn-liefste",
        title: "Glazen Hart 'Mijn Liefste'",
        detail: "Urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_mijn_liefste_..._blokshop.nl_2.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-gedicht-mijn-liefste.html",
      },
      {
        id: "hart-urn-jouw-lach",
        title: "Glazen Hart 'Jouw Lach'",
        detail: "Urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€77,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_jouw_lach..._blokshop.nl_2.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-en-gedicht-jouw-lach.html",
      },
      {
        id: "hart-urn-waarom",
        title: "Glazen Hart 'Waarom'",
        detail: "Urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1042_2_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-hart-met-urn-en-gedicht-waarom-2290010952842-blokshop-krel-nl.html",
      },
      {
        id: "hart-urn-ouders",
        title: "Glazen Hart 'Ouders'",
        detail: "Urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_ouders_..._blokshop.nl_1_1_urn_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-en-gedicht-ouders-2290011900026-blokshop-krel-nl.html",
      },
    ],
  },
  {
    id: "hart-gedicht",
    name: "Glazen Hart met Gedicht",
    description:
      "Kristalhelder glazen hart met uniek gedicht in spiegelletter, fotoruimte (5×7 cm) en kaarshouder op houten voet. Inclusief waxinelicht en geschenkverpakking.",
    products: [
      {
        id: "hart-gedicht-mam",
        title: "Glazen Hart 'Mam'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1051.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-mam-8717904040026-blokshop-krel-nl.html",
      },
      {
        id: "hart-gedicht-pa",
        title: "Glazen Hart 'Pa'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_pa_..._blokshop.nl_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-pa-8717904040033-blokshop-krel-nl.html",
      },
      {
        id: "hart-gedicht-ouders",
        title: "Glazen Hart 'Ouders'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_ouders_..._blokshop.nl_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-ouders-8717904040040-blokshop-krel-nl.html",
      },
      {
        id: "hart-gedicht-lieve-opa",
        title: "Glazen Hart 'Lieve Opa'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1078.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-lieve-opa-8717904040057-blokshop-krel-nl.html",
      },
    ],
  },
  {
    id: "fotolijst",
    name: "Fotolijst Hart met Gedicht",
    description:
      "Glazen hart als fotolijst met uniek gedicht in spiegelletter en waxinelicht op houten voet. Sommige modellen ook verkrijgbaar met mini urn. Inclusief geschenkverpakking.",
    products: [
      {
        id: "fotolijst-mini-urn-te-snel",
        title: "Fotolijst Hart 'Te snel' + Mini Urn",
        detail: "Mini urn · kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€76,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/r/urn1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-mini-urn-en-gedicht-te-snel-je-bent-zo-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-008717904039983-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-mijn-liefste",
        title: "Fotolijst Hart 'Mijn Liefste'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€55,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/i/mijn_liefste_4.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-mijn-liefste-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904040019-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-jouw-lach",
        title: "Fotolijst Hart 'Jouw Lach'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/o/jou_lach_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-jouw-lach-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904040002-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-lieve-oma",
        title: "Fotolijst Hart 'Lieve Oma'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/m/oma_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-lieve-oma-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039990-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-te-snel",
        title: "Fotolijst Hart 'Te snel'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1025.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-te-snel-je-bent-zo-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039983-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-in-mijn-hart",
        title: "Fotolijst Hart 'In mijn hart'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/_/6_7.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-in-mijn-hart-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039976-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-mijn-herinnering",
        title: "Fotolijst Hart 'Mijn Herinnering'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1_74.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-mijn-herinnering-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039969-blokshop-krel-nl.html",
      },
      {
        id: "fotolijst-waarom",
        title: "Fotolijst Hart 'Waarom'",
        detail: "Kaarsje · foto 5×7 cm · 7,5×19×15 cm",
        price: "€54,95",
        image:
          "https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1042_1_1.jpg",
        url: "https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-waarom-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039952-blokshop-krel-nl.html",
      },
    ],
  },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-beige">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
        <div className="mt-4">
          <h3 className="font-serif text-xl leading-snug">{product.title}</h3>
          <p className="text-xs text-foreground/50 font-light mt-1">
            {product.detail}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.2em] text-accent">
              {product.price}
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 group-hover:text-accent transition-colors">
              Bekijken →
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}

function ShopPage() {
  return (
    <SiteLayout>
      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">De Collectie</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-tight">
          Een blijvend aandenken, <i>met liefde gekozen.</i>
        </h1>
        <p className="text-foreground/65 mt-6 font-light leading-relaxed">
          Onze collectie bestaat uit glazen gedenkartikelen met een uniek gedicht,
          fotoruimte en — voor wie dat wenst — een mini urn. Elk stuk een
          tastbare herinnering aan wie u dierbaar is.
        </p>
      </section>

      {categories.map((category) => (
        <section key={category.id} className="px-6 lg:px-10 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-3xl lg:text-4xl">
                    {category.name}
                  </h2>
                  {category.badge && (
                    <span className="text-[10px] uppercase tracking-[0.2em] border border-accent text-accent px-2 py-0.5 rounded-sm">
                      {category.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground/55 font-light max-w-xl leading-relaxed">
                  {category.description}
                </p>
              </div>
              <span className="text-xs text-foreground/40 shrink-0">
                {category.products.length}{" "}
                {category.products.length === 1 ? "artikel" : "artikelen"}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="preview" className="bg-card py-24 lg:py-32 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="eyebrow">Live Voorbeeld</span>
            <h2 className="font-serif text-4xl lg:text-5xl mt-4">
              Stel uw aandenken samen.
            </h2>
          </div>
          <LivePreview />
        </div>
      </section>
    </SiteLayout>
  );
}
