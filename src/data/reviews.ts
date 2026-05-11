export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  initials: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Annemarie van den Berg',
    location: 'Amsterdam',
    rating: 5,
    text: 'Toen ik het glazen hart met de foto van mijn moeder ontving, was ik diep geraakt. Het voelde alsof haar warmte weer even dichtbij was. De afwerking is prachtig en de verpakking was met zoveel zorg gedaan. Ik kan dit aan iedereen aanraden die iets bijzonders zoekt.',
    product: 'Medium Glazen Hart',
    date: 'maart 2025',
    initials: 'AV',
  },
  {
    id: 'r2',
    name: 'Thomas Janssen',
    location: 'Rotterdam',
    rating: 5,
    text: 'Wij zochten iets bijzonders na het overlijden van onze vader. Het gegraveerde hart heeft nu een mooie plek in huis. Het is stijlvol, ingetogen en precies wat we hoopten. De manier waarop de foto is gegraveerd is echt bijzonder mooi.',
    product: 'Groot Luxe Glazen Hart',
    date: 'februari 2025',
    initials: 'TJ',
  },
  {
    id: 'r3',
    name: 'Sofie de Bruin',
    location: 'Utrecht',
    rating: 5,
    text: 'De klantenservice dacht heel liefdevol mee over de foto en tekst. Dat maakte het bestellen in een moeilijke periode heel prettig. Het eindresultaat heeft me stil gemaakt. Een prachtig aandenken aan mijn oma.',
    product: 'Medium Glazen Hart',
    date: 'april 2025',
    initials: 'SB',
  },
  {
    id: 'r4',
    name: 'Linda Verhagen',
    location: 'Den Haag',
    rating: 5,
    text: 'Ik heb de complete set met LED-basis besteld als herinnering aan mijn man. Het licht dat door het hart schijnt en de gravure oplicht — het is betoverend. Elke avond als ik het aandoe, voel ik hem even dichtbij.',
    product: 'Gedenkset met LED-basis',
    date: 'januari 2025',
    initials: 'LV',
  },
  {
    id: 'r5',
    name: 'Pieter Konings',
    location: 'Eindhoven',
    rating: 5,
    text: 'Als cadeau gegeven aan mijn schoonmoeder na het verlies van haar man. Ze was ontroerd. De verpakking, de kwaliteit van het glas, de nauwkeurigheid van de gravure — alles was perfect. Dank jullie wel voor dit prachtige product.',
    product: 'Klein Glazen Hart',
    date: 'maart 2025',
    initials: 'PK',
  },
  {
    id: 'r6',
    name: 'Marieke Smits',
    location: 'Groningen',
    rating: 5,
    text: 'Jullie hebben iets magisch gemaakt. Het gezicht van mijn dochtertje, voor altijd bewaard in glas. Ik vind er geen woorden voor. Alleen maar dankbaar.',
    product: 'Groot Luxe Glazen Hart',
    date: 'april 2025',
    initials: 'MS',
  },
];
