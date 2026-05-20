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
}

export const products: Product[] = [
  // ── Notitieboekjes ───────────────────────────────────────────────
  {
    id: 'diddl-classic-notepad',
    name: 'Diddl Klassiek Notitieboekje',
    subtitle: 'Het originele Diddl blokje',
    description:
      'Het iconische Diddl notitieboekje met de beroemde witte muis. Geperforeerde blaadjes op een kartonnen blok, perfect om uit te scheuren en te ruilen. Nostalgisch én functioneel.',
    priceDisplay: '€7,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-block.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Geperforeerde blaadjes', 'Kartonnen blok', 'Klassiek Diddl design', 'Uitwisselbaar formaat'],
    badge: 'Bestseller',
    popular: true,
    category: 'Notitieboekjes',
  },
  {
    id: 'diddl-jumbo-notepad',
    name: 'Diddl Jumbo Notitieboekje',
    subtitle: 'Extra groot formaat',
    description:
      'Het populaire Diddl jumbo notitieboekje — extra groot, met hetzelfde geliefde muisje en de karakteristieke grote roze voeten. Ideaal voor uitgebreide berichten en illustraties.',
    priceDisplay: '€9,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-jumbo.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Extra groot formaat', 'Geperforeerde blaadjes', 'Jumbo Diddl design', '50 vellen'],
    category: 'Notitieboekjes',
  },
  {
    id: 'diddl-schetsboek',
    name: 'Diddl Schetsboek',
    subtitle: 'Teken- en schrijfboekje',
    description:
      'Laat je creativiteit de vrije loop in dit Diddl schetsboek. Met ongestreepte witte pagina\'s en een vrolijke Diddl cover — perfect voor tekeningen, dagboek of doodles.',
    priceDisplay: '€11,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-sketchbook.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Ongestreepte pagina\'s', 'Zachte kaft', 'A5 formaat', '80 pagina\'s'],
    category: 'Notitieboekjes',
  },
  {
    id: 'diddlina-notepad',
    name: 'Diddlina Notitieboekje',
    subtitle: 'Met Diddl\'s beste vriendin',
    description:
      'Het schattige Diddlina notitieboekje — de roze versie van het iconische blokje, met Diddl\'s lieftallige vriendinnetje als hoofdpersoon.',
    priceDisplay: '€7,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddlina-block.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Diddlina design', 'Roze thema', 'Geperforeerde blaadjes', 'Uitwisselbaar formaat'],
    badge: 'Nieuw',
    category: 'Notitieboekjes',
  },

  // ── Ansichtkaarten ───────────────────────────────────────────────
  {
    id: 'diddl-3d-kaart-verjaardag',
    name: 'Diddl 3D Verjaardagskaart',
    subtitle: 'Spectaculaire pop-up kaart',
    description:
      'Verras iemand met een prachtige Diddl 3D verjaardagskaart. Als je de kaart opent, springt Diddl eruit — letterlijk! Een onvergetelijk cadeau voor elk jubileum.',
    priceDisplay: '€4,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-3d-card.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['3D pop-up effect', 'Envelop inbegrepen', 'Handgeschreven ruimte', 'Officieel gelicentieerd'],
    badge: 'Populair',
    popular: true,
    category: 'Ansichtkaarten',
  },
  {
    id: 'diddl-kaart-set-seizoenen',
    name: 'Diddl Seizoenenkaarten Set',
    subtitle: '12 kaarten voor het hele jaar',
    description:
      'Een complete set van 12 Diddl ansichtkaarten — voor elke gelegenheid door het jaar heen. Van zomer tot kerst, altijd de perfecte kaart bij de hand.',
    priceDisplay: '€12,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-cards-set.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['12 kaarten', 'Alle seizoenen', 'Enveloppen inbegrepen', 'Cadeauverpakking'],
    category: 'Ansichtkaarten',
  },
  {
    id: 'diddl-kaart-vriendschap',
    name: 'Diddl Vriendschapskaart',
    subtitle: 'Voor je allerbeste vriend(in)',
    description:
      'Een lieve Diddl ansichtkaart speciaal voor vriendschap. Stuur hem naar je BFF en herbeleef de nostalgische Diddl-magie van vroeger.',
    priceDisplay: '€2,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-friendship-card.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Envelop inbegrepen', 'Handgeschreven ruimte', 'Vriendschapsthema', 'Officieel design'],
    category: 'Ansichtkaarten',
  },

  // ── Schrijfwaren ─────────────────────────────────────────────────
  {
    id: 'diddl-pennenzak',
    name: 'Diddl Pennenzak',
    subtitle: 'Vrolijke opbergtas voor schrijfwaren',
    description:
      'De Diddl pennenzak — een must-have voor elke Diddl fan. Ruim genoeg voor al je pennen, potloden en gummen, met een speels Diddl design dat meteen opvalt.',
    priceDisplay: '€8,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-pencilcase.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Ruime opbergruimte', 'Ritssluiting', 'Zacht materiaal', 'Diddl print'],
    badge: 'Nieuw',
    category: 'Schrijfwaren',
  },
  {
    id: 'diddl-pennenset',
    name: 'Diddl Pennenset',
    subtitle: '6 kleurrijke pennen',
    description:
      'Schrijf in stijl met de Diddl pennenset. Zes kleurrijke balpennen met het Diddl muisje op de clip — perfect voor school, werk of als cadeau.',
    priceDisplay: '€6,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-pens.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['6 pennen', 'Kleurrijke inkten', 'Diddl design', 'Smooth schrijfgevoel'],
    category: 'Schrijfwaren',
  },
  {
    id: 'diddl-gummenset',
    name: 'Diddl Gummenset',
    subtitle: '4 schattige gummen',
    description:
      'Vier vrolijke Diddl gummen in verschillende designs. Niet alleen functioneel maar ook super verzamelbaar — net als vroeger!',
    priceDisplay: '€4,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-erasers.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['4 gummen', 'Verschillende designs', 'Goed uitgumt', 'Verzamelbaar'],
    category: 'Schrijfwaren',
  },

  // ── Accessoires ──────────────────────────────────────────────────
  {
    id: 'diddl-sleutelhanger',
    name: 'Diddl Pluche Sleutelhanger',
    subtitle: 'Altijd Diddl bij je',
    description:
      'De schattige Diddl pluche sleutelhanger — je trouwste metgezel voor onderweg. De iconische witte muis met grote roze voeten, zacht en speels.',
    priceDisplay: '€6,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-keyring.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Pluche materiaal', 'Metalen ring', 'Diddl muis design', 'Ca. 8 cm'],
    popular: true,
    category: 'Accessoires',
  },
  {
    id: 'diddl-rugzak',
    name: 'Diddl Mini Rugzak',
    subtitle: 'Schattig en praktisch',
    description:
      'De Diddl mini rugzak — perfect voor dagjes uit, school of als stijlvolle tas voor je spullen. Met groot Diddl-borduursel op de voorzijde.',
    priceDisplay: '€24,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-backpack.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Borduursel design', 'Verstelbare banden', 'Binnenritsvak', 'Ca. 30×22 cm'],
    badge: 'Bestseller',
    popular: true,
    category: 'Accessoires',
  },
  {
    id: 'diddl-portemonnee',
    name: 'Diddl Portemonnee',
    subtitle: 'Stijlvol met Diddl print',
    description:
      'Een praktische Diddl portemonnee met meerdere vakjes voor je pasjes en muntgeld. Compact en kleurrijk — met het onmiskenbare Diddl design.',
    priceDisplay: '€14,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-wallet.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['Meerdere kaarthouders', 'Muntvak met rits', 'Compact design', 'Diddl print'],
    category: 'Accessoires',
  },

  // ── Pluche ───────────────────────────────────────────────────────
  {
    id: 'diddl-knuffel-groot',
    name: 'Diddl Knuffel Groot',
    subtitle: '30 cm pluche muisje',
    description:
      'De grote Diddl pluche knuffel — het iconische witte muisje van 30 cm, met de kenmerkende grote roze voeten. Superzacht en perfect om te knuffelen. Ideaal cadeau voor jong en oud.',
    priceDisplay: '€19,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-plush-large.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['30 cm hoog', 'Superzacht pluche', 'Grote roze voeten', 'Veilig voor alle leeftijden'],
    badge: 'Populair',
    popular: true,
    category: 'Pluche',
  },
  {
    id: 'diddl-knuffel-klein',
    name: 'Diddl Knuffel Klein',
    subtitle: '15 cm pocket-size muisje',
    description:
      'Het kleine Diddl knuffeltje van 15 cm — perfect formaat voor in je tas of als decoratie. Het bekende muisje in handig pocket-formaat.',
    priceDisplay: '€11,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddl-plush-small.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['15 cm hoog', 'Zacht pluche', 'Pocket formaat', 'Verzamelbaar'],
    category: 'Pluche',
  },
  {
    id: 'diddlina-knuffel',
    name: 'Diddlina Knuffel',
    subtitle: 'Diddl\'s lieftallige vriendinnetje',
    description:
      'De Diddlina pluche knuffel — het roze muisje dat Diddl altijd vergezelt. 25 cm zacht pluche, met haar kenmerkende roze outfit en grote oren.',
    priceDisplay: '€17,95',
    image: 'https://www.diddl.de/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/i/diddlina-plush.jpg',
    externalUrl: 'https://www.bol.com/nl/nl/b/diddl/14789062/',
    features: ['25 cm hoog', 'Superzacht pluche', 'Roze design', 'Diddlina karakter'],
    badge: 'Nieuw',
    category: 'Pluche',
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
