import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const articles = [
  {
    title: 'Artikel 1 – Bedrijfsgegevens',
    content: [
      'Handelsnaam: Mijn Diddl',
      'E-mailadres: info@mijndiddl.nl',
      'Telefoon: +31 (0)85 000 0000',
      'Bereikbaar: maandag t/m vrijdag 09:00 – 17:00',
      'KVK-nummer: [in te vullen]',
      'BTW-nummer: [in te vullen]',
      'Vestigingsadres: [in te vullen]',
    ],
  },
  {
    title: 'Artikel 2 – Toepasselijkheid',
    content: [
      'Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, bestellingen en overeenkomsten die via mijndiddl.nl tot stand komen.',
      'Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien schriftelijk overeengekomen.',
      'Mijn Diddl behoudt zich het recht voor deze voorwaarden te wijzigen. De versie die geldt op het moment van bestelling is van toepassing.',
    ],
  },
  {
    title: 'Artikel 3 – Het Aanbod',
    content: [
      'Alle aanbiedingen zijn vrijblijvend en gelden zolang de voorraad strekt, tenzij uitdrukkelijk anders vermeld.',
      'Productafbeeldingen op de website zijn zo accuraat mogelijk. Kleine afwijkingen in kleur zijn mogelijk door schermverschillen.',
      'Alle prijzen zijn in euro\'s en inclusief BTW, exclusief eventuele verzendkosten. Kennelijke fouten in de prijsopgave binden Mijn Diddl niet.',
    ],
  },
  {
    title: 'Artikel 4 – De Overeenkomst & Digitale Preview',
    content: [
      'Een overeenkomst komt tot stand op het moment dat de klant een bestelling plaatst én een orderbevestiging per e-mail heeft ontvangen.',
      'Na betaling ontvangt de klant een digitale preview van het gepersonaliseerde product ter goedkeuring. De productie start uitsluitend na expliciete schriftelijke goedkeuring door de klant.',
      'De klant dient binnen 3 werkdagen te reageren op de preview. Bij het uitblijven van een reactie wordt goedkeuring geacht te zijn verleend en start de productie.',
      'Wijzigingen aan het product zijn na goedkeuring van de preview niet meer mogelijk.',
    ],
  },
  {
    title: 'Artikel 5 – Herroepingsrecht',
    content: [
      'Consumenten hebben in beginsel het recht een overeenkomst op afstand binnen 14 dagen na ontvangst te ontbinden, zonder opgave van reden.',
      'Diddl producten hebben standaard 30 dagen retourrecht na ontvangst, mits ongebruikt en in originele verpakking.',
      'Deze uitzondering wordt tevens vóór de afronding van de bestelling expliciet aan de klant medegedeeld.',
      'Eventuele niet-gepersonaliseerde producten vallen wel onder het standaard herroepingsrecht van 14 dagen.',
    ],
  },
  {
    title: 'Artikel 6 – Prijs',
    content: [
      'De geldende prijs is de prijs die op het moment van bestelling op de website is vermeld.',
      'Verzendkosten: standaard bezorging (5–7 werkdagen) is gratis; express bezorging (2–3 werkdagen) bedraagt €12,95. Luxe cadeauverpakking is een optionele toevoeging van €5,00.',
      'Mijn Diddl is niet gebonden aan een aanbod bij een klaarblijkelijke fout in de prijsvermelding.',
    ],
  },
  {
    title: 'Artikel 7 – Levering',
    content: [
      'Levertijden zijn indicatief en beginnen te lopen na goedkeuring van de digitale preview. Standaard bezorging duurt 5–7 werkdagen; express bezorging 2–3 werkdagen.',
      'Mijn Diddl levert uitsluitend binnen Nederland en België.',
      'Het risico gaat over op de klant op het moment van aflevering op het opgegeven bezorgadres.',
      'Voor verzending maakt Mijn Diddl gebruik van MyParcel. Na verzending ontvangt de klant een track & trace code per e-mail.',
      'Bij overschrijding van de levertijd met meer dan 30 dagen heeft de klant het recht de overeenkomst kosteloos te ontbinden, tenzij overmacht van toepassing is.',
    ],
  },
  {
    title: 'Artikel 8 – Betaling',
    content: [
      'Betaling vindt direct bij bestelling plaats via iDEAL, creditcard, Bancontact of PayPal.',
      'Alle betalingstransacties zijn beveiligd met SSL-encryptie.',
      'Bij niet-tijdige betaling is de klant van rechtswege in verzuim en is de wettelijke rente verschuldigd. Gerechtelijke en buitengerechtelijke incassokosten komen voor rekening van de klant.',
    ],
  },
  {
    title: 'Artikel 9 – Conformiteit & Garantie',
    content: [
      'Mijn Diddl staat ervoor in dat haar producten voldoen aan de overeenkomst en aan de redelijkerwijs te stellen eisen van deugdelijkheid.',
      'Glas is een ambachtelijk materiaal; kleine variaties in structuur, kleur of luchtigheid zijn inherent aan het productieproces en worden niet als gebrek beschouwd.',
      'Bij een aantoonbaar fabricagegebrek heeft de klant recht op kosteloos herstel of vervanging, mits het gebrek binnen 14 dagen na ontvangst per e-mail is gemeld met fotobewijs.',
      'De garantie vervalt bij onjuist gebruik, opzettelijke beschadiging of schade door derden.',
    ],
  },
  {
    title: 'Artikel 10 – Klachtenregeling',
    content: [
      'Klachten dienen zo spoedig mogelijk, uiterlijk binnen 14 dagen na ontdekking, per e-mail te worden gemeld via info@mijndiddl.nl.',
      'Mijn Diddl streeft ernaar klachten binnen 5 werkdagen in behandeling te nemen.',
      'Indien een klacht niet in onderling overleg kan worden opgelost, kan de consument het geschil voorleggen aan de Geschillencommissie Webshop (SGC) of via het Europees ODR-platform (ec.europa.eu/consumers/odr).',
    ],
  },
  {
    title: 'Artikel 11 – Privacy & Gegevensbescherming',
    content: [
      'Persoonsgegevens worden verwerkt in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en het Privacybeleid van Mijn Diddl.',
      'Gegevens worden uitsluitend gebruikt voor de uitvoering van de overeenkomst en klantenservice. Uw gegevens worden nooit gedeeld met derden voor marketingdoeleinden.',
    ],
  },
  {
    title: 'Artikel 12 – Aansprakelijkheid',
    content: [
      'De aansprakelijkheid van Mijn Diddl is beperkt tot het aankoopbedrag van de betreffende bestelling.',
      'Mijn Diddl is niet aansprakelijk voor indirecte schade, gederfde winst of immateriële schade.',
      'In geval van overmacht — waaronder brand, stakingen, natuurrampen of leveringsproblemen bij toeleveranciers — worden de verplichtingen opgeschort voor de duur van de overmacht.',
    ],
  },
  {
    title: 'Artikel 13 – Toepasselijk Recht & Bevoegde Rechter',
    content: [
      'Op alle overeenkomsten met Mijn Diddl is uitsluitend Nederlands recht van toepassing.',
      'Geschillen worden bij uitsluiting voorgelegd aan de bevoegde rechter in de vestigingsplaats van Mijn Diddl, tenzij dwingende wettelijke bepalingen anders voorschrijven.',
    ],
  },
];

export default function AlgemeneVoorwaardenPage() {
  return (
    <>
      <Helmet>
        <title>Algemene Voorwaarden | Mijn Diddl</title>
        <meta
          name="description"
          content="Lees de algemene voorwaarden van Mijn Diddl voor informatie over bestellingen, herroepingsrecht, levering en garantie."
        />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-violet block mb-4">
            Juridisch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight">
            Algemene Voorwaarden
          </h1>
          <div className="diddl-divider mb-5" />
          <p className="font-sans text-base text-violet max-w-lg mx-auto px-6">
            Versie januari 2025 — van toepassing op alle bestellingen via mijndiddl.nl
          </p>
        </div>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="space-y-12">
            {articles.map((article) => (
              <div key={article.title}>
                <h2 className="font-serif text-xl text-anthracite mb-4">{article.title}</h2>
                <ul className="space-y-3">
                  {article.content.map((line, i) => (
                    <li key={i} className="font-sans text-sm text-violet leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-lavender text-center">
            <p className="font-sans text-xs text-violet/70 mb-4">
              Vragen over deze voorwaarden?
            </p>
            <Link
              to="/contact"
              className="font-sans text-xs tracking-[0.15em] uppercase text-lilac-deep hover:text-anthracite transition-colors duration-300"
            >
              Neem contact op
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

