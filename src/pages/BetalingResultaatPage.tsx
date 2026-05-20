import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

type PaymentStatus = 'loading' | 'paid' | 'failed' | 'unknown';

export default function BetalingResultaatPage() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key') ?? '';
  const [status, setStatus] = useState<PaymentStatus>('loading');

  useEffect(() => {
    if (!key) {
      setStatus('unknown');
      return;
    }
    fetch(`${API_BASE}/api/icepay/payment/${key}`)
      .then((res) => res.json())
      .then((data) => {
        const s = (data.status as string | undefined)?.toUpperCase();
        if (s === 'COMPLETED' || s === 'PAID') setStatus('paid');
        else if (s === 'FAILED' || s === 'CANCELLED') setStatus('failed');
        else setStatus('unknown');
      })
      .catch(() => setStatus('unknown'));
  }, [key]);

  return (
    <>
      <Helmet><title>Betaalresultaat | Mijn Diddl</title></Helmet>
      <div className="pt-20 min-h-screen bg-hero-gradient flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">

          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 text-lilac animate-spin mx-auto" />
              <p className="font-serif text-xl text-anthracite">Betaalstatus ophalen…</p>
            </>
          )}

          {status === 'paid' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              <h1 className="font-serif text-3xl text-anthracite font-bold">Betaling geslaagd!</h1>
              <p className="font-sans text-sm text-violet leading-relaxed">
                Je betaling is succesvol ontvangen. Je Diddl bestelling wordt zo snel mogelijk verwerkt en verzonden. Houd je inbox in de gaten voor een bevestigingsmail.
              </p>
              <Link
                to="/"
                className="inline-block font-sans text-xs tracking-[0.12em] uppercase text-white bg-lilac-gradient px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity duration-300"
              >
                Terug naar home
              </Link>
            </>
          )}

          {(status === 'failed' || status === 'unknown') && (
            <>
              <XCircle className="w-16 h-16 text-red-500 mx-auto" />
              <h1 className="font-serif text-3xl text-anthracite font-bold">
                {status === 'failed' ? 'Betaling mislukt' : 'Status onbekend'}
              </h1>
              <p className="font-sans text-sm text-violet leading-relaxed">
                {status === 'failed'
                  ? 'Je betaling is niet geslaagd. Er is geen bedrag afgeschreven. Probeer het opnieuw of kies een andere betaalmethode.'
                  : 'We konden de betaalstatus niet ophalen. Controleer je e-mail voor een bevestiging of neem contact met ons op.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/afrekenen"
                  className="inline-block font-sans text-xs tracking-[0.12em] uppercase text-white bg-lilac-gradient px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity duration-300"
                >
                  Opnieuw proberen
                </Link>
                <Link
                  to="/contact"
                  className="inline-block font-sans text-xs tracking-[0.12em] uppercase text-anthracite border border-lavender px-6 py-3.5 rounded-full hover:border-lilac/40 transition-colors duration-300"
                >
                  Contact
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
