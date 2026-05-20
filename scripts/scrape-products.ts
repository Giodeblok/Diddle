import * as cheerio from 'cheerio';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URLS_FILE = join(__dirname, '..', 'product-urls.txt');
const OUTPUT_FILE = join(__dirname, '..', 'src', 'data', 'blokshop-products.ts');
const DELAY_MS = 600;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getCategory(slug: string): string {
  if (/notitieboek|notitie-boek|dagboek|brievenset|briefpapier|notitieblok/.test(slug))
    return 'Notitieboekjes';
  if (/pen|potlood|gumstift|liniaal|kleurpotlod|markeerstift|etui|pennenzak|schrijfwarenset|inktpen/.test(slug))
    return 'Schrijfwaren';
  if (/knuffel|pluchen-sleutelhanger/.test(slug))
    return 'Pluche';
  if (/rugzak|drinkfles|mok|haarborstel|sieradendoos/.test(slug))
    return 'Accessoires';
  if (/wenskaart/.test(slug))
    return 'Ansichtkaarten';
  return 'Overig';
}

function cleanId(slug: string): string {
  return slug
    .replace(/-\d{10,13}-blokshop-krel-nl$/, '')
    .replace(/-blokshop-krel-nl$/, '');
}

interface ScrapedProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  priceDisplay: string;
  image: string;
  externalUrl: string;
  features: string[];
  category: string;
}

function parseProductData(html: string, url: string): ScrapedProduct {
  const $ = cheerio.load(html);
  const slug = url.split('/').pop()!.replace(/\.html$/, '');

  // Titel splitsen in naam en subtitle
  const fullTitle = $('h1').first().text().trim();
  const parts = fullTitle.split(' - ');
  let name = fullTitle;
  let subtitle = '';
  if (parts.length >= 3) {
    subtitle = parts[parts.length - 1].trim();
    name = parts.slice(0, -1).join(' - ').trim();
  } else if (parts.length === 2) {
    subtitle = parts[1].trim();
    name = parts[0].trim();
  }

  // Afbeelding — hoogste resolutie van media.blokshop.nl
  let image = '';
  $('img').each((_, el) => {
    const src = $(el).attr('src') ?? '';
    if (src.includes('media.blokshop.nl') && src.includes('/image/') && !image) {
      image = src;
    }
  });

  // Prijs — probeer sale-prijs, dan reguliere prijs, dan eerste .price
  const specialPrice = $('.special-price .price').first().text().trim();
  const regularPrice = $('.regular-price .price').first().text().trim();
  const anyPrice = $('.price').first().text().trim();
  const rawPrice = specialPrice || regularPrice || anyPrice;
  // Voeg € toe als het ontbreekt (blokshop toont soms alleen het getal)
  const priceDisplay = rawPrice && !rawPrice.startsWith('€') ? `€${rawPrice}` : rawPrice;

  // Beschrijving — eerste paragraaf binnen productbeschrijving
  let description = '';
  $('.product-description p, .std p, .description p').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 30 && !description) {
      description = text;
    }
  });
  if (!description) {
    const rawText = $('.product-description, .std').first().text().trim();
    description = rawText.split('\n').find(l => l.trim().length > 30)?.trim() ?? '';
  }

  // Kenmerken — eerste 4 <li> items uit de beschrijving
  const features: string[] = [];
  $('.product-description ul li, .std ul li').each((i, el) => {
    if (i < 4) {
      const text = $(el).text().trim();
      if (text) features.push(text);
    }
  });

  return {
    id: cleanId(slug),
    name,
    subtitle,
    description: description.slice(0, 350),
    priceDisplay,
    image,
    externalUrl: url,
    features,
    category: getCategory(slug),
  };
}

async function main(): Promise<void> {
  const urls = readFileSync(URLS_FILE, 'utf-8')
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  console.log(`${urls.length} URLs gevonden in product-urls.txt`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'nl-NL',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();
  const products: ScrapedProduct[] = [];
  let failed = 0;

  try {
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const slug = url.split('/').pop()!.replace(/\.html$/, '');
      console.log(`(${i + 1}/${urls.length}) ${cleanId(slug)}`);

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        const html = await page.content();
        const product = parseProductData(html, url);
        products.push(product);

        const hasImage = product.image ? '✓ img' : '✗ img';
        const hasPrice = product.priceDisplay ? `✓ ${product.priceDisplay}` : '✗ prijs';
        const hasDesc = product.description ? `✓ desc` : '✗ desc';
        console.log(`  ${hasImage} | ${hasPrice} | ${hasDesc} | ${product.category}`);
      } catch (err) {
        failed++;
        console.error(`  FOUT: ${err instanceof Error ? err.message : err}`);
      }

      if (i < urls.length - 1) await sleep(DELAY_MS);
    }
  } finally {
    await browser.close();
  }

  // Schrijf TypeScript-bestand
  const tsContent = `import type { Product } from './products';

export const blokshopProducts: Product[] = ${JSON.stringify(products, null, 2)};
`;

  writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');

  // Statistieken
  const categories = [...new Set(products.map(p => p.category))];
  console.log(`\nGegenereerd: ${OUTPUT_FILE}`);
  console.log(`Producten: ${products.length} (${failed} mislukt)`);
  categories.forEach(cat => {
    const count = products.filter(p => p.category === cat).length;
    console.log(`  ${cat}: ${count}`);
  });

  const missing = {
    image: products.filter(p => !p.image).length,
    price: products.filter(p => !p.priceDisplay).length,
    description: products.filter(p => !p.description).length,
    features: products.filter(p => p.features.length === 0).length,
  };
  console.log(`\nOntbrekende data: afbeelding=${missing.image}, prijs=${missing.price}, beschrijving=${missing.description}, kenmerken=${missing.features}`);
}

main().catch((err) => { console.error('Fatale fout:', err); process.exit(1); });
