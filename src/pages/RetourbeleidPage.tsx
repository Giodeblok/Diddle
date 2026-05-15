import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-l-2 border-accent pl-6 mb-12">
      <h2 className="font-serif text-2xl mb-4">{title}</h2>
      <div className="text-foreground/70 font-light leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );
}

export default function RetourbeleidPage() {
  return (
    <>
      <Helmet>
        <title>Retourbeleid — Eeuwig Hart</title>
        <meta name="description" content="Alles over ons retour- en klachtenbeleid. Lees hoe u een product kunt retourneren en hoe wij u helpen bij gebreken of beschadiging." />
        <meta property="og:title" content="Retourbeleid — Eeuwig Hart" />
        <meta property="og:description" content="Retourneren binnen 14 dagen, uitzonderingen voor urnproducten, en hoe wij gebreken oplossen." />
      </Helmet>

      <section className="px-6 lg:px-10 pt-20 pb-16 text-center max-w-3xl mx-auto fade-up">
        <span className="eyebrow">Retour & Klachten</span>
        <h1 className="font-serif text-5xl lg:text-6xl mt-5 leading-[1.05]">
          Uw vertrouwen, <br /><i>onze verantwoordelijkheid.</i>
        </h1>
        <p className="mt-8 text-foreground/70 font-light leading-relaxed">
          Wij begrijpen dat een glazen hart meer is dan een product — het is een stille aanwezigheid van iemand die u dierbaar is. Wij nemen elk order uiterst serieus en staan voor de kwaliteit van ons werk. Hieronder leest u eerlijk wat u van ons kunt verwachten.
        </p>
      </section>

      <section className="px-6 lg:px-10 pb-32">
        <div className="max-w-2xl mx-auto">

          <PolicySection title="Herroepingsrecht — 14 dagen">
            <p>
              U heeft het recht om uw bestelling binnen <strong className="font-medium text-foreground/85">14 dagen na ontvangst</strong> te retourneren, zonder opgave van reden. Het product dient zich in de originele, ongebruikte staat te bevinden en in de originele verpakking te worden teruggestuurd.
            </p>
            <p>
              De retourkosten zijn voor uw rekening. Na ontvangst van het retour vergoeden wij het aankoopbedrag binnen 14 dagen via de oorspronkelijke betaalmethode.
            </p>
          </PolicySection>

          <PolicySection title="Uitzondering: urnproducten na gebruik">
            <p>
              Glazen harten met mini-urn waarbij de verzegeling is verbroken — d.w.z. de urn is gevuld met as of een ander persoonlijk aandenken — kunnen op grond van artikel 6:230p sub e van het Burgerlijk Wetboek <strong className="font-medium text-foreground/85">niet</strong> worden geretourneerd vanwege de hygiënische en intieme aard van het product.
            </p>
            <p>
              Twijfelt u? Neem vóór gebruik contact met ons op. Wij helpen u graag.
            </p>
          </PolicySection>

          <PolicySection title="Gebreken en fouten van onze kant">
            <p>
              Ongeacht de retourregels lossen wij de volgende situaties altijd kosteloos op:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Het product is beschadigd aangekomen</li>
              <li>U heeft een verkeerd product ontvangen</li>
              <li>Het product vertoont een fabricagefout</li>
            </ul>
            <p>
              Op grond van artikel 7:17 van het Burgerlijk Wetboek heeft u recht op een deugdelijk product. Wij bieden herstel of vervanging aan, naar uw keuze.
            </p>
          </PolicySection>

          <PolicySection title="Hoe meldt u een klacht?">
            <p>
              Neem zo snel mogelijk — maar uiterlijk binnen <strong className="font-medium text-foreground/85">14 dagen na ontvangst</strong> — contact met ons op:
            </p>
            <div className="space-y-1">
              <p>
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent block mb-1">E-mail</span>
                info@eeuwighart.nl
              </p>
              <p>
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent block mb-1 mt-3">Telefoon</span>
                Ma–vr 09:00–17:00
              </p>
            </div>
            <p>
              Stuur ons in uw bericht: uw bestelnummer, een omschrijving van het probleem en één of meer foto's van het gebrek of de schade.
            </p>
            <p>
              Wij bevestigen uw melding binnen <strong className="font-medium text-foreground/85">1 werkdag</strong> en streven ernaar uw klacht binnen <strong className="font-medium text-foreground/85">5 werkdagen</strong> volledig op te lossen.
            </p>
          </PolicySection>

          <PolicySection title="Schade tijdens verzending">
            <p>
              Onze producten worden verzonden in speciaal beschermde verpakking. Komt het pakket beschadigd aan? Noteer dit dan bij de bezorger en maak direct foto's van de buitenverpakking.
            </p>
            <p>
              Dit helpt ons bij het indienen van een claim bij de vervoerder en het spoedig regelen van vervanging.
            </p>
          </PolicySection>

          <PolicySection title="Wettelijke garantie">
            <p>
              Op al onze producten is de wettelijke garantie van toepassing conform het Burgerlijk Wetboek. Vertoont uw glazen hart binnen <strong className="font-medium text-foreground/85">twee jaar</strong> na aankoop een gebrek dat niet het gevolg is van normaal gebruik of eigen handelen, dan kunt u bij ons terecht voor herstel of vervanging.
            </p>
          </PolicySection>
        </div>
      </section>

      <section className="bg-beige py-24 px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-2xl italic leading-snug text-foreground/85">
            Mocht er iets zijn — groot of klein — aarzel dan nooit om ons te schrijven. Wij lezen elk bericht persoonlijk.
          </p>
          <Link to="/contact" className="btn-ghost mt-10 inline-block">
            Neem contact op
          </Link>
        </div>
      </section>
    </>
  );
}
