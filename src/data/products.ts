export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceDisplay: string;
  image: string;
  externalUrl: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  category: string;
  photoFrame?: {
    top: string;
    left: string;
    width: string;
    rotation?: string;
    aspectRatio?: string;
  };
  imageObjectPosition?: string;
}

export const products: Product[] = [
  // ── Glazen Hart met Mini Urn ──────────────────────────────────────
  {
    id: 'hart-mini-urn-te-snel',
    name: "Glazen Hart 'Je bent zo snel'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Je bent zo snel — te snel" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/9/7/977x1200_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-hart-met-mini-urn-en-gedicht-je-bent-zo-snel-8717904040118-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '11.5%', left: '53.5%', width: '22.5%', rotation: '-1deg' },
  },
  {
    id: 'hart-mini-urn-in-mijn-hart',
    name: "Glazen Hart 'In mijn hart'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "In mijn hart" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1134_2_2.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-in-mijn-hart-8717904040101-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '57%', width: '26%', rotation: '-2deg' },
  },
  {
    id: 'hart-mini-urn-mam',
    name: "Glazen Hart 'Mam'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Mam" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_mini_urn_gedicht_mam..._8717904023944_blokshop.nl_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-mam-8717904040095-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-mini-urn-pa',
    name: "Glazen Hart 'Pa'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Pa" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1116_2.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-pa-8717904023920-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-mini-urn-mijn-herinnering',
    name: "Glazen Hart 'Mijn Herinnering'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Mijn Herinnering" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1099_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-mijn-herinnering-8717904040064-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '25%', left: '56%', width: '26%', rotation: '-0.8deg' },
  },
  {
    id: 'hart-mini-urn-lieve-oma',
    name: "Glazen Hart 'Lieve Oma'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Lieve Oma" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/m/oma_urn.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-lieve-oma-overlijden-overleden-herdenken-8717904012283-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-mini-urn-lieve-opa',
    name: "Glazen Hart 'Lieve Opa'",
    subtitle: 'Met mini urn voor as',
    description:
      'Kristalhelder glazen hart met mini urn (15 g), kaarshouder, fotoruimte (5×7 cm) en gedicht "Lieve Opa" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/l/i/lieve_opa_urn_met_kaarsje.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-mini-urn-gedicht-lieve-opa.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '27%', left: '55.5%', width: '24%', rotation: '-1.6deg' },
  },

  // ── Glazen Hart met Urn ───────────────────────────────────────────
  {
    id: 'hart-urn-mijn-liefste',
    name: "Glazen Hart 'Mijn Liefste'",
    subtitle: 'Met urn voor as',
    description:
      'Glazen hart met urn voor as, kaarshouder, fotoruimte (5×7 cm) en gedicht "Mijn Liefste" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_mijn_liefste_..._blokshop.nl_2.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-gedicht-mijn-liefste.html',
    features: ['Urn voor as', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '54.2%', width: '25.5%' },
  },
  {
    id: 'hart-urn-jouw-lach',
    name: "Glazen Hart 'Jouw Lach'",
    subtitle: 'Met urn voor as',
    description:
      'Glazen hart met urn voor as, kaarshouder, fotoruimte (5×7 cm) en gedicht "Jouw Lach" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€77,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_jouw_lach..._blokshop.nl_2.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-en-gedicht-jouw-lach.html',
    features: ['Urn voor as', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26.4%' },
  },
  {
    id: 'hart-urn-waarom',
    name: "Glazen Hart 'Waarom'",
    subtitle: 'Met urn voor as',
    description:
      'Glazen hart met urn voor as, kaarshouder, fotoruimte (5×7 cm) en gedicht "Waarom" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1042_2_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-hart-met-urn-en-gedicht-waarom-2290010952842-blokshop-krel-nl.html',
    features: ['Urn voor as', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '27.1%', left: '51%', width: '24%', rotation: '-0.1deg' },
  },
  {
    id: 'hart-urn-ouders',
    name: "Glazen Hart 'Ouders'",
    subtitle: 'Met urn voor as',
    description:
      'Glazen hart met urn voor as, kaarshouder, fotoruimte (5×7 cm) en gedicht "Ouders" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_ouders_..._blokshop.nl_1_1_urn_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-urn-en-gedicht-ouders-2290011900026-blokshop-krel-nl.html',
    features: ['Urn voor as', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '22%', left: '53%', width: '25%', rotation: '-2deg' },
  },

  // ── Glazen Hart zonder Mini Urn ───────────────────────────────────────
  {
    id: 'hart-gedicht-mam',
    name: "Glazen Hart 'Mam'",
    subtitle: 'Met gedicht, zonder urn',
    description:
      'Kristalhelder glazen hart met gedicht "Mam" in spiegelletter, fotoruimte (5×7 cm) en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1051.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-mam-8717904040026-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-gedicht-pa',
    name: "Glazen Hart 'Pa'",
    subtitle: 'Met gedicht, zonder urn',
    description:
      'Kristalhelder glazen hart met gedicht "Pa" in spiegelletter, fotoruimte (5×7 cm) en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_pa_..._blokshop.nl_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-pa-8717904040033-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-gedicht-ouders',
    name: "Glazen Hart 'Ouders'",
    subtitle: 'Met gedicht, zonder urn',
    description:
      'Kristalhelder glazen hart met gedicht "Ouders" in spiegelletter, fotoruimte (5×7 cm) en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/a/waxinehouder_in_memoriam_overleden_glas_hart_met_gedicht_ouders_..._blokshop.nl_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-ouders-8717904040040-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'hart-gedicht-lieve-opa',
    name: "Glazen Hart 'Lieve Opa'",
    subtitle: 'Met gedicht, zonder urn',
    description:
      'Kristalhelder glazen hart met gedicht "Lieve Opa" in spiegelletter, fotoruimte (5×7 cm) en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1078.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-overleden-glas-hart-met-gedicht-lieve-opa-8717904040057-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },

  // ── Fotolijst Hart met Gedicht ────────────────────────────────────
  {
    id: 'fotolijst-mini-urn-te-snel',
    name: "Fotolijst Hart 'Te snel' + Mini Urn",
    subtitle: 'Fotolijst met mini urn voor as',
    description:
      'Glazen hart als fotolijst met mini urn (15 g as), kaarshouder, fotoruimte (5×7 cm) en gedicht "Te snel" in spiegelletter. Op houten voet, inclusief geschenkverpakking.',
    priceDisplay: '€76,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/u/r/urn1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-mini-urn-en-gedicht-te-snel-je-bent-zo-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-008717904039983-blokshop-krel-nl.html',
    features: ['Mini urn (15 g as)', 'Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter'],
    badge: 'Met urn',
    category: 'Glazen Hart met Mini Urn',
    photoFrame: { top: '26%', left: '51%', width: '25.5%', rotation: '1deg', aspectRatio: '5.1/7.8' },
  },
  {
    id: 'fotolijst-mijn-liefste',
    name: "Fotolijst Hart 'Mijn Liefste'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Mijn Liefste" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€55,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/i/mijn_liefste_4.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-mijn-liefste-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904040019-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-jouw-lach',
    name: "Fotolijst Hart 'Jouw Lach'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Jouw Lach" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/j/o/jou_lach_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-jouw-lach-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904040002-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-lieve-oma',
    name: "Fotolijst Hart 'Lieve Oma'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Lieve Oma" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/m/oma_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-lieve-oma-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039990-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-te-snel',
    name: "Fotolijst Hart 'Te snel'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Te snel — Je bent zo" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1025.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-te-snel-je-bent-zo-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039983-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-in-mijn-hart',
    name: "Fotolijst Hart 'In mijn hart'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "In mijn hart" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/_/6_7.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-in-mijn-hart-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039976-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-mijn-herinnering',
    name: "Fotolijst Hart 'Mijn Herinnering'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Mijn Herinnering" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/_/1_74.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-mijn-herinnering-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039969-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
  {
    id: 'fotolijst-waarom',
    name: "Fotolijst Hart 'Waarom'",
    subtitle: 'Fotolijst met gedicht',
    description:
      'Kristalhelder glazen hart als fotolijst met gedicht "Waarom" in spiegelletter en kaarshouder. Op houten voet, inclusief waxinelicht en geschenkverpakking.',
    priceDisplay: '€54,95',
    image: 'https://media.blokshop.nl/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/2/1200x1042_1_1.jpg',
    externalUrl: 'https://www.blokshop.nl/waxinehouder-in-memoriam-met-gedicht-waarom-fotolijst-in-memoriam-in-memoriam-overlijden-overleden-herdenken-8717904039952-blokshop-krel-nl.html',
    features: ['Kaarshouder', 'Foto 5×7 cm', 'Gedicht in spiegelletter', 'Inclusief waxinelicht'],
    category: 'Glazen Hart zonder Mini Urn',
    photoFrame: { top: '24%', left: '56%', width: '26%' },
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
