import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: '1. Wie zijn wij?',
    content: [
      'Eeuwig Dichtbij is verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in dit privacybeleid.',
      'Handelsnaam: Eeuwig Dichtbij',
      'E-mailadres: info@eeuwigdichtbij.nl',
      'Telefoon: +31 (0)85 000 0000',
      'KVK-nummer: [in te vullen]',
      'Vestigingsadres: [in te vullen]',
    ],
  },
  {
    title: '2. Welke gegevens verwerken wij?',
    content: [
      'Wij verwerken de volgende categorieën persoonsgegevens:',
      'Bestelgegevens: voornaam, achternaam, e-mailadres, bezorgadres (straat, huisnummer, postcode, woonplaats) en telefoonnummer (voor bezorging via MyParcel).',
      'Contactformuliergegevens: naam, e-mailadres en de inhoud van uw bericht.',
      'Beheerdersgegevens (intern): gebruikersnaam en een versleuteld wachtwoord (bcrypt-hashing), uitsluitend zichtbaar voor bevoegd personeel.',
      'Betaalkaartgegevens worden nooit opgeslagen door Eeuwig Dichtbij. Alle betalingen worden volledig afgehandeld door iCEPAY (PCI-DSS gecertificeerd). Wij ontvangen uitsluitend een bevestiging van de geslaagde betaling.',
      'Personalisatiegegevens (foto, naam overledene, data, citaat) worden uitsluitend lokaal in uw browser verwerkt voor de live preview. Deze gegevens worden nooit opgeslagen op onze servers of doorgegeven aan derden. U deelt ze vervolgens met ons via e-mail om uw bestelling te personaliseren.',
    ],
  },
  {
    title: '3. Grondslag en doel',
    content: [
      'Wij verwerken uw persoonsgegevens uitsluitend voor de volgende doeleinden en op basis van de bijbehorende wettelijke grondslagen (AVG):',
      'Uitvoering van uw bestelling (orderbevestiging, productie, bezorging) — grondslag: uitvoering van een overeenkomst (art. 6(1)(b) AVG).',
      'Verzending via MyParcel (PostNL, bpost of DPD) — grondslag: uitvoering van een overeenkomst (art. 6(1)(b) AVG).',
      'Verwerking van betaling via iCEPAY — grondslag: uitvoering van een overeenkomst (art. 6(1)(b) AVG).',
      'Beantwoording van contactberichten — grondslag: gerechtvaardigd belang (klantenservice, art. 6(1)(f) AVG).',
      'Transactionele e-mails via Resend (orderbevestiging, digitale preview) — grondslag: uitvoering van een overeenkomst (art. 6(1)(b) AVG).',
      'Opslag van bestelgegevens in Supabase — grondslag: gerechtvaardigd belang (technische bedrijfsvoering, art. 6(1)(f) AVG).',
      'Eeuwig Dichtbij verstuurt geen nieuwsbrieven en verwerkt geen persoonsgegevens voor marketingdoeleinden.',
    ],
  },
  {
    title: '4. Bewaarbeleid',
    content: [
      'Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld, en in elk geval niet langer dan wettelijk vereist:',
      'Bestelgegevens: 7 jaar na bestellingsdatum, conform de wettelijke administratieplicht (art. 2:10 BW en vereisten Belastingdienst).',
      'Contactformulierberichten: maximaal 12 maanden, of zodra de kwestie volledig is afgehandeld.',
      'Beheerdersgegevens: zolang de betreffende medewerker actief is.',
    ],
  },
  {
    title: '5. Derden en verwerkers',
    content: [
      'Om onze diensten te kunnen verlenen, maken wij gebruik van de volgende externe verwerkers. Met elk van deze partijen is een verwerkersovereenkomst gesloten of zijn zij gebonden aan passende juridische waarborgen. Uw gegevens worden nooit verkocht of voor andere doeleinden gedeeld.',
      'iCEPAY (betaalverwerker, Nederland) — ontvangt: e-mailadres en transactiebedrag. PCI-DSS gecertificeerd. Betaalkaartgegevens komen nooit bij Eeuwig Dichtbij.',
      'bol.com (verkoopplatform, Nederland) — ontvangt: volledige klantgegevens bij via bol.com geplaatste bestellingen. Eigen privacybeleid van bol.com is van toepassing.',
      'MyParcel (verzendlogistiek via PostNL, bpost of DPD, Nederland) — ontvangt: naam, adres, postcode, woonplaats, telefoonnummer en e-mailadres.',
      'Resend (transactionele e-maildienst, VS) — ontvangt: e-mailadres, naam en orderinhoud. Doorgifte buiten de EU op basis van Standard Contractual Clauses (SCCs).',
      'Supabase (databasehosting, serverlocatie EU — Frankfurt) — bevat: bestel- en klantgegevens. Supabase is gevestigd in de VS; passende waarborgen (SCCs) zijn van toepassing.',
    ],
  },
  {
    title: '6. Beveiliging',
    content: [
      'Eeuwig Dichtbij neemt passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen verlies, onbevoegde toegang of misbruik:',
      'HTTPS/TLS-encryptie voor alle dataoverdracht.',
      'Bcrypt-hashing voor beheerderwachtwoorden.',
      'JWT-authenticatie voor intern beheerpaneel.',
      'Row-level security in Supabase.',
      'Betaalkaartgegevens volledig gedelegeerd aan iCEPAY (PCI-DSS gecertificeerd).',
      'Mocht er ondanks onze maatregelen een datalek optreden, dan informeren wij betrokkenen en de Autoriteit Persoonsgegevens binnen de wettelijke termijn van 72 uur, conform de AVG.',
    ],
  },
  {
    title: '7. Uw rechten',
    content: [
      'Op grond van de AVG heeft u de volgende rechten met betrekking tot uw persoonsgegevens:',
      'Recht op inzage (art. 15 AVG): u kunt opvragen welke persoonsgegevens wij van u verwerken en een kopie daarvan ontvangen.',
      'Recht op rectificatie (art. 16 AVG): u kunt verzoeken onjuiste of onvolledige gegevens te laten corrigeren.',
      'Recht op verwijdering (art. 17 AVG): u kunt verzoeken uw gegevens te laten verwijderen. Let op: bestelgegevens bewaren wij wettelijk verplicht 7 jaar voor onze administratie.',
      'Recht op beperking van de verwerking (art. 18 AVG): u kunt in bepaalde situaties vragen de verwerking tijdelijk te stoppen.',
      'Recht op bezwaar (art. 21 AVG): u kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang. Wij stoppen dan met de verwerking, tenzij wij dwingende gerechtvaardigde gronden hebben.',
      'Recht op gegevensoverdraagbaarheid (art. 20 AVG): u kunt uw gegevens opvragen in een gestructureerd, gangbaar en machineleesbaar formaat.',
      'U kunt uw verzoek indienen via info@eeuwigdichtbij.nl. Wij reageren binnen 30 dagen. Wij kunnen om een identiteitsbevestiging vragen om uw verzoek te verifiëren.',
    ],
  },
  {
    title: '8. Cookies',
    content: [
      'Wij maken geen gebruik van analytische cookies, trackingcookies of advertentiecookies.',
      'De enige opslag in uw browser is een technisch noodzakelijk authenticatietoken voor ons interne beheerpaneel (localStorage). Dit token is uitsluitend zichtbaar voor bevoegde medewerkers en wordt niet gebruikt voor profilering of het volgen van bezoekers.',
      'Er worden geen cookies geplaatst voor analyses, advertenties of andere niet-noodzakelijke doeleinden.',
    ],
  },
  {
    title: '9. Klachten',
    content: [
      'Bent u niet tevreden over de wijze waarop wij met uw persoonsgegevens omgaan? Neem dan eerst contact met ons op via info@eeuwigdichtbij.nl. Wij lossen het graag persoonlijk met u op.',
      'U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, de Nederlandse toezichthouder voor gegevensbescherming:',
      'Autoriteit Persoonsgegevens — Postbus 93374, 2509 AJ Den Haag — autoriteitpersoonsgegevens.nl',
    ],
  },
  {
    title: '10. Wijzigingen',
    content: [
      'Dit privacybeleid kan worden gewijzigd. De meest actuele versie is altijd te vinden op deze pagina. Bij ingrijpende wijzigingen informeren wij u per e-mail als u recent een bestelling heeft geplaatst.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacybeleid | Eeuwig Dichtbij</title>
        <meta
          name="description"
          content="Lees hoe Eeuwig Dichtbij omgaat met uw persoonsgegevens, welke gegevens wij verwerken en wat uw rechten zijn onder de AVG."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="pt-20">
        <div className="bg-hero-gradient py-20 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-taupe block mb-4">
            Juridisch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-anthracite mb-5 leading-tight">
            Privacybeleid
          </h1>
          <div className="luxury-divider mb-5" />
          <p className="font-sans text-base text-taupe max-w-lg mx-auto px-6">
            Versie mei 2025 — van toepassing op alle verwerkingen via eeuwigdichtbij.nl
          </p>
        </div>

        <section className="max-w-3xl mx-auto px-6 py-20">
          <p className="font-sans text-sm text-taupe leading-relaxed mb-12">
            Wij begrijpen dat u ons vertrouwt met iets kostbaars. Uw privacy behandelen wij
            met dezelfde zorg en discretie als de herinneringen die wij helpen bewaren.
            Dit beleid legt uit welke gegevens wij verzamelen, waarom, en wat uw rechten zijn.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-xl text-anthracite mb-4">{section.title}</h2>
                <ul className="space-y-3">
                  {section.content.map((line, i) => (
                    <li key={i} className="font-sans text-sm text-taupe leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-beige text-center">
            <p className="font-sans text-xs text-taupe/70 mb-4">
              Vragen over dit privacybeleid?
            </p>
            <Link
              to="/contact"
              className="font-sans text-xs tracking-[0.15em] uppercase text-gold-deep hover:text-anthracite transition-colors duration-300"
            >
              Neem contact op
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
