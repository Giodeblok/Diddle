export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  // ── Personalisatie ───────────────────────────────────────────────
  {
    id: 'faq1',
    category: 'Personalisatie',
    question: 'Welke foto kan ik in het hart plaatsen?',
    answer:
      'Elk glazen hart heeft een fotoruimte van 5×7 cm. Je kunt hier een afgedrukte foto in plaatsen van iemand die je dierbaar is. Wij adviseren een duidelijke, scherpe foto voor het mooiste resultaat.',
  },
  {
    id: 'faq2',
    category: 'Personalisatie',
    question: 'Kan ik zelf een gedicht of tekst kiezen?',
    answer:
      'Elk hart heeft een vast gedicht in spiegelletter, passend bij de betekenis van het hart, zoals "Mam", "Pa", "In mijn hart" of "Lieve Oma". Je kiest het hart dat het beste past bij jouw dierbare. Zo is elk aandenken persoonlijk en betekenisvol.',
  },
  {
    id: 'faq3',
    category: 'Personalisatie',
    question: 'Hoe werkt de mini urn in het glazen hart?',
    answer:
      'Sommige harten zijn voorzien van een ingebouwde mini urn met een inhoud van circa 15 gram as. Dit biedt nabestaanden de mogelijkheid om een kleine hoeveelheid as dicht bij zich te houden als intiem aandenken. Heb je vragen over de mini urn? Neem gerust contact met ons op.',
  },

  // ── Bestelling & Levering ────────────────────────────────────────
  {
    id: 'faq4',
    category: 'Bestelling & Levering',
    question: 'Hoe lang duurt de levering?',
    answer:
      'We streven ernaar jouw bestelling binnen 5 tot 7 werkdagen te bezorgen. Heb je haast? Expressbezorging in 2 tot 3 werkdagen is beschikbaar voor €12,95. We begrijpen dat elke dag telt.',
  },
  {
    id: 'faq5',
    category: 'Bestelling & Levering',
    question: 'Hoe wordt het hart verpakt voor verzending?',
    answer:
      'Elk glazen hart wordt zorgvuldig verpakt in een geschenkverpakking, zodat jouw bestelling in goede staat aankomt, klaar om te geven of te koesteren.',
  },
  {
    id: 'faq6',
    category: 'Bestelling & Levering',
    question: 'Leveren jullie ook buiten Nederland?',
    answer:
      'Ja, we leveren door heel Nederland en België. Voor andere Europese landen is levering op aanvraag mogelijk. Neem contact met ons op voor de opties en kosten.',
  },

  // ── Betaling ─────────────────────────────────────────────────────
  {
    id: 'faq7',
    category: 'Betaling',
    question: 'Welke betaalmethoden accepteren jullie?',
    answer:
      'Wij accepteren iDEAL en creditcard (Visa en Mastercard). Alle betalingen verlopen via een beveiligde betaalomgeving.',
  },
  {
    id: 'faq8',
    category: 'Betaling',
    question: 'Is mijn betaling veilig?',
    answer:
      'Absoluut. We werken met gecertificeerde betaalproviders en SSL-encryptie. Je betaalgegevens worden nooit door ons opgeslagen of gedeeld.',
  },

  // ── Cadeau ───────────────────────────────────────────────────────
  {
    id: 'faq9',
    category: 'Cadeau',
    question: 'Is het hart ook geschikt als rouwcadeau voor anderen?',
    answer:
      'Zeker. Veel klanten bestellen een glazen hart als steunbetuiging voor iemand die rouwt. Het is een warm, tastbaar en blijvend gebaar dat meer zegt dan woorden.',
  },
  {
    id: 'faq10',
    category: 'Cadeau',
    question: 'Kan ik het hart rechtstreeks naar de ontvanger laten sturen?',
    answer:
      'Ja, dat is zeker mogelijk. Geef tijdens het bestellen het afleveradres van de ontvanger op. We zorgen dat het hart netjes verpakt aankomt, zodat het direct cadeau gegeven kan worden.',
  },

  // ── Product ──────────────────────────────────────────────────────
  {
    id: 'faq11',
    category: 'Product',
    question: 'Van welk materiaal zijn de glazen harten gemaakt?',
    answer:
      'Onze harten zijn gemaakt van kristalhelder, hoogwaardig glas. Het materiaal geeft het hart een mooie glans en diepte, waardoor het gedicht en de fotoruimte mooi tot hun recht komen. De harten zijn duurzaam en tijdloos.',
  },
  {
    id: 'faq12',
    category: 'Product',
    question: 'Hoe verzorg ik mijn glazen hart?',
    answer:
      'Reinig het hart voorzichtig met een zachte, droge doek. Vermijd schurende middelen of water. Bewaar het hart op een stabiele ondergrond, uit direct zonlicht. Met de juiste zorg gaat een glazen hart een leven lang mee.',
  },
  {
    id: 'faq13',
    category: 'Product',
    question: 'Kan ik mijn bestelling retourneren?',
    answer:
      'Ja, je kunt jouw bestelling binnen 14 dagen na ontvangst retourneren, mits het hart onbeschadigd is en er geen as in de urn is geplaatst. Neem contact met ons op en we regelen het verder. Is er sprake van een defect of beschadiging bij levering? Meld dit dan binnen 14 dagen met een foto, zodat we het samen kunnen oplossen.',
  },
  {
    id: 'faq14',
    category: 'Product',
    question: 'Wat als het hart beschadigd aankomt?',
    answer:
      'Dat spijt ons oprecht. Neem binnen 14 dagen contact met ons op en stuur een foto van de beschadiging mee. We zorgen dan voor een passende oplossing, of dat nu een vervangend hart of een andere regeling is.',
  },
];
