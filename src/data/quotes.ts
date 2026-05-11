export interface Quote {
  id: string;
  text: string;
  category: QuoteCategory;
}

export type QuoteCategory =
  | 'Kort & Klassiek'
  | 'Voor Moeder'
  | 'Voor Vader'
  | 'Voor Partner'
  | 'Religieus'
  | 'Modern Minimaal'
  | 'Liefdevol & Warm';

export const quoteCategories: QuoteCategory[] = [
  'Kort & Klassiek',
  'Voor Moeder',
  'Voor Vader',
  'Voor Partner',
  'Religieus',
  'Modern Minimaal',
  'Liefdevol & Warm',
];

export const quotes: Quote[] = [
  // Kort & Klassiek
  { id: 'q1', text: 'Voor altijd in ons hart.', category: 'Kort & Klassiek' },
  { id: 'q2', text: 'Nooit vergeten, altijd geliefd.', category: 'Kort & Klassiek' },
  { id: 'q3', text: 'Voor altijd geliefd, nooit vergeten.', category: 'Kort & Klassiek' },
  { id: 'q4', text: 'Liefde eindigt niet waar het leven stopt.', category: 'Kort & Klassiek' },
  { id: 'q5', text: 'Dichtbij, ook al ben je niet meer hier.', category: 'Kort & Klassiek' },

  // Voor Moeder
  { id: 'q6', text: 'Mama, jouw liefde is ons eeuwige licht.', category: 'Voor Moeder' },
  { id: 'q7', text: 'Een moeder is nooit weg, ze leeft voort in elk kind.', category: 'Voor Moeder' },
  { id: 'q8', text: 'Jouw warmte voelen wij elke dag opnieuw.', category: 'Voor Moeder' },
  { id: 'q9', text: 'In alles wat ik doe, draag ik jou mee.', category: 'Voor Moeder' },

  // Voor Vader
  { id: 'q10', text: 'Papa, jouw kracht leeft voort in ons.', category: 'Voor Vader' },
  { id: 'q11', text: 'Een vader die geleefd heeft zoals jij, wordt nooit vergeten.', category: 'Voor Vader' },
  { id: 'q12', text: 'Dank je voor elke stap die je naast mij zette.', category: 'Voor Vader' },
  { id: 'q13', text: 'Jij was mijn rots. Dat blijf je altijd.', category: 'Voor Vader' },

  // Voor Partner
  { id: 'q14', text: 'Wat liefde was, blijft liefde.', category: 'Voor Partner' },
  { id: 'q15', text: 'Jij was mijn thuis. Voor altijd.', category: 'Voor Partner' },
  { id: 'q16', text: 'Geen dag voorbij zonder jou.', category: 'Voor Partner' },
  { id: 'q17', text: 'Jouw liefde blijft ons licht.', category: 'Voor Partner' },

  // Religieus
  { id: 'q18', text: 'Veilig bij God, voor altijd in ons hart.', category: 'Religieus' },
  { id: 'q19', text: 'Tot wij elkaar weerzien.', category: 'Religieus' },
  { id: 'q20', text: 'Rust in vrede, geliefd en onvergeten.', category: 'Religieus' },
  { id: 'q21', text: 'In Gods handen geborgen, in onze harten gebleven.', category: 'Religieus' },

  // Modern Minimaal
  { id: 'q22', text: 'Altijd.', category: 'Modern Minimaal' },
  { id: 'q23', text: 'Nooit weg.', category: 'Modern Minimaal' },
  { id: 'q24', text: 'Geliefd. Gemist. Herinnerd.', category: 'Modern Minimaal' },
  { id: 'q25', text: 'Jij. Altijd.', category: 'Modern Minimaal' },

  // Liefdevol & Warm
  { id: 'q26', text: 'Een herinnering vol liefde, voor altijd bewaard.', category: 'Liefdevol & Warm' },
  { id: 'q27', text: 'Jouw glimlach leeft voort in alles wat mooi is.', category: 'Liefdevol & Warm' },
  { id: 'q28', text: 'Met zoveel liefde gedragen, elke dag opnieuw.', category: 'Liefdevol & Warm' },
  { id: 'q29', text: 'Dichtbij in elk zacht moment van de dag.', category: 'Liefdevol & Warm' },
  { id: 'q30', text: 'Jouw liefde is het mooiste wat ik ooit heb mogen ontvangen.', category: 'Liefdevol & Warm' },
];
