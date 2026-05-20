import * as cheerio from 'cheerio';
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = 'https://www.blokshop.nl';
const CATEGORY_URL = `${BASE_URL}/luxe-kado-artikelen/diddl?limit=100`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_FILE = join(__dirname, '..', 'product-urls.txt');

async function main(): Promise<void> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'nl-NL',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });

  try {
    const page = await context.newPage();

    console.log(`Ophalen: ${CATEGORY_URL}`);
    await page.goto(CATEGORY_URL, { waitUntil: 'networkidle' });

    const html = await page.content();
    const $ = cheerio.load(html);
    const productUrls = new Set<string>();
    const pattern = /^https:\/\/www\.blokshop\.nl\/luxe-kado-artikelen\/diddl\/[^/]+\.html$/;

    $('a[href]').each((_i, el) => {
      const href = $(el).attr('href') ?? '';
      if (pattern.test(href)) productUrls.add(href);
    });

    const urls = Array.from(productUrls);
    console.log(`Gevonden: ${urls.length} product-URLs`);

    urls.forEach(url => console.log(url));

    writeFileSync(OUTPUT_FILE, urls.join('\n'), 'utf-8');
    console.log(`\nOpgeslagen in: ${OUTPUT_FILE}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => { console.error('Fatale fout:', err); process.exit(1); });
