export interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  product?: string;
  date: string;
  initials: string;
  photoUrl?: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Emma van den Berg',
    location: 'Amsterdam',
    rating: 5,
    text: 'Ik was zo blij toen ik hoorde dat Diddl terug is! Direct een notitieboekje besteld en het voelde meteen als vroeger. De kwaliteit is geweldig en het is zo snel bezorgd. Mijn dochter is er nu ook al gek op!',
    product: 'Diddl Klassiek Notitieboekje',
    date: 'mei 2026',
    initials: 'EV',
  },
  {
    id: 'r2',
    name: 'Tim Janssen',
    location: 'Rotterdam',
    rating: 5,
    text: 'Als kind al fan, en nu mijn eigen kinderen laten kennismaken met Diddl. Ze zijn er net zo gek op als ik vroeger was! De 3D verjaardagskaart die ik voor mijn neefje bestelde was een groot succes.',
    product: 'Diddl 3D Verjaardagskaart',
    date: 'mei 2026',
    initials: 'TJ',
  },
  {
    id: 'r3',
    name: 'Sophie de Bruin',
    location: 'Utrecht',
    rating: 5,
    text: 'Wat een heerlijke nostalgie! De Diddl rugzak is zo schattig, precies zoals ik me herinner. Supersnelle levering en zorgvuldig verpakt. Mijn BFF heeft exact hetzelfde besteld — we zijn officieel terug in de jaren \'90.',
    product: 'Diddl Mini Rugzak',
    date: 'mei 2026',
    initials: 'SB',
  },
  {
    id: 'r4',
    name: 'Lisa Verhagen',
    location: 'Den Haag',
    rating: 5,
    text: 'De Diddlina knuffel is werkelijk schattig! Precies zoals ik me hem herinner van vroeger. Mijn dochtertje van 8 is er meteen verliefd op. Top kwaliteit en razendsnel geleverd. Absoluut een aanrader!',
    product: 'Diddlina Knuffel',
    date: 'mei 2026',
    initials: 'LV',
  },
  {
    id: 'r5',
    name: 'Peter Konings',
    location: 'Eindhoven',
    rating: 5,
    text: 'Heerlijk cadeau voor mijn vrouw — ze was fan van Diddl als kind. Haar gezicht toen ze het zag was geweldig. De seizoenenkaarten set is prachtig vormgegeven en de verpakking was perfect. Heel blij mee!',
    product: 'Diddl Seizoenenkaarten Set',
    date: 'mei 2026',
    initials: 'PK',
  },
  {
    id: 'r6',
    name: 'Marie Smits',
    location: 'Groningen',
    rating: 5,
    text: 'De jumbo notitieboekjes zijn precies waarnaar ik op zoek was. Ik heb er meteen drie besteld — één voor mezelf en twee als cadeau. Zulke kwaliteit en zo snel geleverd. Diddl is echt terug en ik ben er zo blij mee!',
    product: 'Diddl Jumbo Notitieboekje',
    date: 'mei 2026',
    initials: 'MS',
  },
];
