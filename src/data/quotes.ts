export interface Quote {
  id: string;
  text: string;
  category: QuoteCategory;
}

export type QuoteCategory =
  | 'Nostalgie'
  | 'Vriendschap'
  | 'Verzamelen'
  | 'Kindertijd'
  | 'Diddl Classics'
  | 'Comeback';

export const quoteCategories: QuoteCategory[] = [
  'Nostalgie',
  'Vriendschap',
  'Verzamelen',
  'Kindertijd',
  'Diddl Classics',
  'Comeback',
];

export const quotes: Quote[] = [
  // Nostalgie
  { id: 'q1', text: 'Het geluk van vroeger, nu in jouw handen.', category: 'Nostalgie' },
  { id: 'q2', text: 'Sommige dingen worden beter met de tijd, nostalgie is er één van.', category: 'Nostalgie' },
  { id: 'q3', text: 'Herinneringen zijn de mooiste dingen die je kunt verzamelen.', category: 'Nostalgie' },
  { id: 'q4', text: 'Een geur, een kleur, een muisje, en je bent weer kind.', category: 'Nostalgie' },
  { id: 'q5', text: 'De mooiste jaren zijn die waaraan je terugdenkt met een glimlach.', category: 'Nostalgie' },

  // Vriendschap
  { id: 'q6', text: 'Een Diddl-blokje voor mijn BFF, de beste valuta ooit.', category: 'Vriendschap' },
  { id: 'q7', text: 'Echte vrienden herinneren zich nog welk Diddl-blokje jij het liefst had.', category: 'Vriendschap' },
  { id: 'q8', text: 'Vriendschap begint bij het ruilen van Diddl-blokjes op het schoolplein.', category: 'Vriendschap' },
  { id: 'q9', text: 'Met de juiste vriend(in) is een Diddl-middag nooit saai.', category: 'Vriendschap' },

  // Verzamelen
  { id: 'q10', text: 'Je kunt nooit te veel Diddl hebben. Dat is gewoon een feit.', category: 'Verzamelen' },
  { id: 'q11', text: 'Elke nieuwe Diddl is een nieuw stukje geluk.', category: 'Verzamelen' },
  { id: 'q12', text: 'De beste collectie is degene die je zelf bouwt, blokje voor blokje.', category: 'Verzamelen' },
  { id: 'q13', text: 'Verzamelen is niet hamsteren, het is liefde bewaren.', category: 'Verzamelen' },

  // Kindertijd
  { id: 'q14', text: 'Elke Diddl-blokje ruikt naar vrijdag na school.', category: 'Kindertijd' },
  { id: 'q15', text: 'De beste schooltas was die met het meeste Diddl erin.', category: 'Kindertijd' },
  { id: 'q16', text: 'Kindertijd is een Diddl-blokje dat je nooit helemaal opgebruikt.', category: 'Kindertijd' },
  { id: 'q17', text: 'Groot worden is optioneel. Diddl liefhebben niet.', category: 'Kindertijd' },

  // Diddl Classics
  { id: 'q18', text: 'Diddl: de witte muis met de grote voeten en een nog groter hart.', category: 'Diddl Classics' },
  { id: 'q19', text: 'Cheesecakeland, waar dromen en Diddl wonen.', category: 'Diddl Classics' },
  { id: 'q20', text: 'Diddl is geen merk. Diddl is een gevoel.', category: 'Diddl Classics' },
  { id: 'q21', text: 'Een blokje Diddl bevat meer geluk per gram dan wat dan ook.', category: 'Diddl Classics' },

  // Comeback
  { id: 'q22', text: 'Diddl is terug. En dit keer blijft hij.', category: 'Comeback' },
  { id: 'q23', text: 'Soms keert het mooiste terug precies wanneer je het nodig hebt.', category: 'Comeback' },
  { id: 'q24', text: 'Welkom terug, klein muisje. We hebben je gemist.', category: 'Comeback' },
  { id: 'q25', text: '2026: het jaar dat nostalgie weer hip werd.', category: 'Comeback' },
];
