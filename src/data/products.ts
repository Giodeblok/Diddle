export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  priceDisplay: string;
  size: string;
  dimensions: string;
  image: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export const products: Product[] = [
  {
    id: 'small-heart',
    name: 'Klein Glazen Hart',
    subtitle: 'Een intiem aandenken',
    description:
      'Een delicaat glazen hart waarin een dierbare foto subtiel wordt gegraveerd. Perfect voor op een nachtkastje, een herdenkingshoekje of als liefdevol gebaar aan iemand die rouwt.',
    price: 59,
    priceDisplay: '€ 59',
    size: 'small',
    dimensions: '8 × 8 cm',
    image: '/images/heart-small.jpg',
    features: [
      'Handgegraveerde foto',
      'Naam en datum naar keuze',
      'Luxe geschenkverpakking',
      'Persoonlijk voorbeeld vooraf',
    ],
  },
  {
    id: 'medium-heart',
    name: 'Medium Glazen Hart',
    subtitle: 'Het populairste formaat',
    description:
      'Het klassieke formaat voor een tijdloos aandenken. De foto en persoonlijke tekst worden nauwkeurig gegraveerd in helder optisch glas. Een stijlvol eerbetoon voor thuis.',
    price: 89,
    priceDisplay: '€ 89',
    size: 'medium',
    dimensions: '12 × 12 cm',
    image: '/images/heart-medium.jpg',
    features: [
      'Handgegraveerde foto',
      'Naam, datum & persoonlijk citaat',
      'Luxe geschenkverpakking',
      'Persoonlijk voorbeeld vooraf',
      'Optionele LED-basis',
    ],
    badge: 'Meest gekozen',
    popular: true,
  },
  {
    id: 'large-heart',
    name: 'Groot Luxe Glazen Hart',
    subtitle: 'Een monument van liefde',
    description:
      'Een imposant glazen hart met uitzonderlijke gravure-details. Gemaakt van premium optisch kristalglas. Een blijvend monument voor iemand die altijd in je hart zal leven.',
    price: 129,
    priceDisplay: '€ 129',
    size: 'large',
    dimensions: '16 × 16 cm',
    image: '/images/heart-large.jpg',
    features: [
      'Premium kristalglas',
      'Uitgebreide fotodetails',
      'Naam, datum & meerdere teksten',
      'Exclusieve luxe geschenkkist',
      'Persoonlijk voorbeeld vooraf',
      'Prioriteitsbehandeling',
    ],
    badge: 'Premium',
  },
  {
    id: 'memorial-set',
    name: 'Gedenkset met LED-basis',
    subtitle: 'Complete herdenkingservaring',
    description:
      'De complete memorial set: een groot glazen hart op een warmwit LED-verlichtingssokkel. Het zachte licht laat de gravure oplichten als een eeuwige kaars — een indrukwekkend eerbetoon voor thuis.',
    price: 169,
    priceDisplay: '€ 169',
    size: 'large',
    dimensions: '16 × 16 cm + LED-basis',
    image: '/images/heart-set.jpg',
    features: [
      'Premium kristalglas hart',
      'Warmwit LED-verlichtingssokkel',
      'Uitgebreide fotodetails',
      'Naam, datum & persoonlijk citaat',
      'Exclusieve luxe geschenkkist',
      'Persoonlijk voorbeeld vooraf',
      'Gratis expressverzending',
    ],
    badge: 'Complete set',
  },
];
