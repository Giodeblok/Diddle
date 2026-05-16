import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  ShoppingBag,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Trash2,
  Plus,
  LogOut,
  Edit2,
  RotateCcw,
  Save,
} from 'lucide-react';
import LuxuryButton from '../components/LuxuryButton';
import { getToken, clearToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function authFetch(url: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (res.status === 401) {
    clearToken();
    window.location.href = '/admin/login';
    throw new Error('Sessie verlopen, opnieuw inloggen.');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  return res.json();
}

const apiFetch = (path: string, options: RequestInit = {}) =>
  authFetch(`${API_BASE}/api/bol${path}`, options);

const productsFetch = (path: string, options: RequestInit = {}) =>
  authFetch(`${API_BASE}/api/products${path}`, options);

interface StatusBadgeProps {
  status: string;
}
function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<string, string> = {
    SUCCESS: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    FAILURE: 'bg-red-100 text-red-800',
    OPEN: 'bg-blue-100 text-blue-800',
    SHIPPED: 'bg-green-100 text-green-800',
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-sans tracking-wide uppercase rounded ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

interface ProductRow {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  priceDisplay: string;
  description: string;
  defaultPrice: string;
  defaultDescription: string;
  hasOverride: boolean;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'health' | 'offers' | 'orders' | 'producten'>('health');
  const [health, setHealth] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [catalog, setCatalog] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [siteProducts, setSiteProducts] = useState<ProductRow[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const notify = (msg: string) => { setMessage(msg); setTimeout(() => setMessage(''), 4000); };
  const fail = (msg: string) => { setError(msg); setTimeout(() => setError(''), 5000); };

  async function checkHealth() {
    setLoading(true);
    try {
      const data = await apiFetch('/health');
      setHealth(data);
    } catch (e: any) {
      fail(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadCatalog() {
    try {
      const data = await apiFetch('/catalog');
      setCatalog(data.products ?? []);
    } catch (e: any) {
      fail(e.message);
    }
  }

  async function loadOffers() {
    setLoading(true);
    try {
      const data = await apiFetch('/offers');
      setOffers(data.offers ?? []);
    } catch (e: any) {
      fail(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadOrders() {
    setLoading(true);
    try {
      const data = await apiFetch('/orders/open');
      setOrders(data.orders ?? []);
    } catch (e: any) {
      fail(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadSiteProducts() {
    try {
      const data = await productsFetch('/');
      setSiteProducts(data.products ?? []);
    } catch (e: any) {
      fail(e.message);
    }
  }

  function startEdit(product: ProductRow) {
    setEditingId(product.id);
    setEditPrice(product.priceDisplay);
    setEditDesc(product.description);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditPrice('');
    setEditDesc('');
  }

  async function saveProduct(id: string) {
    setSavingId(id);
    try {
      await productsFetch(`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ priceDisplay: editPrice, description: editDesc }),
      });
      notify('Product opgeslagen!');
      setEditingId(null);
      loadSiteProducts();
    } catch (e: any) {
      fail(e.message);
    } finally {
      setSavingId(null);
    }
  }

  async function resetProduct(id: string) {
    if (!confirm('Terugzetten naar standaard prijs en omschrijving?')) return;
    try {
      await productsFetch(`/${id}`, { method: 'DELETE' });
      notify('Product teruggezet naar standaard.');
      loadSiteProducts();
    } catch (e: any) {
      fail(e.message);
    }
  }

  async function publishProduct(productId: string) {
    try {
      const data = await apiFetch('/offers', {
        method: 'POST',
        body: JSON.stringify({ productId }),
      });
      notify(`Aangeboden op bol.com! Process ID: ${data.processStatusId}`);
    } catch (e: any) {
      fail(e.message);
    }
  }

  async function publishAll() {
    try {
      await apiFetch('/offers/publish-all', { method: 'POST' });
      notify('Alle producten aangeboden op bol.com!');
    } catch (e: any) {
      fail(e.message);
    }
  }

  async function removeOffer(offerId: string) {
    if (!confirm('Weet je zeker dat je dit aanbod wilt verwijderen?')) return;
    try {
      await apiFetch(`/offers/${offerId}`, { method: 'DELETE' });
      notify('Aanbod verwijderd.');
      loadOffers();
    } catch (e: any) {
      fail(e.message);
    }
  }

  async function shipOrder(orderItemId: string) {
    const trackAndTrace = prompt('Voer track & trace nummer in (bijv. PostNL):');
    if (!trackAndTrace) return;
    try {
      await apiFetch('/orders/ship', {
        method: 'POST',
        body: JSON.stringify({ orderItemId, trackAndTrace }),
      });
      notify('Verzending geregistreerd bij bol.com!');
      loadOrders();
    } catch (e: any) {
      fail(e.message);
    }
  }

  useEffect(() => {
    checkHealth();
    loadCatalog();
  }, []);

  useEffect(() => {
    if (tab === 'offers') loadOffers();
    if (tab === 'orders') loadOrders();
    if (tab === 'producten') loadSiteProducts();
  }, [tab]);

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="font-sans text-xs tracking-[0.2em] uppercase text-taupe block mb-2">
              Beheerpaneel
            </span>
            <h1 className="font-serif text-3xl text-anthracite">bol.com Integratie</h1>
            <p className="font-sans text-sm text-taupe mt-2">
              Beheer je producten, aanbiedingen en bestellingen op bol.com.
            </p>
          </div>
          <button
            onClick={() => { clearToken(); navigate('/admin/login'); }}
            className="flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] uppercase text-taupe hover:text-anthracite transition-colors mt-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            Uitloggen
          </button>
        </div>

        {/* Notifications */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 mb-6"
          >
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="font-sans text-sm text-green-800">{message}</p>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 mb-6"
          >
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            <p className="font-sans text-sm text-red-800">{error}</p>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-beige">
          {(['health', 'producten', 'offers', 'orders'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-sans text-xs tracking-[0.12em] uppercase px-6 py-3.5 border-b-2 transition-colors duration-200 ${
                tab === t
                  ? 'border-gold-deep text-anthracite'
                  : 'border-transparent text-taupe hover:text-anthracite'
              }`}
            >
              {t === 'health' ? 'Status' : t === 'producten' ? 'Producten' : t === 'offers' ? 'Aanbiedingen' : 'Bestellingen'}
            </button>
          ))}
        </div>

        {/* === STATUS TAB === */}
        {tab === 'health' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="font-serif text-xl text-anthracite">Verbindingsstatus</h2>
              <button onClick={checkHealth} className="text-taupe hover:text-gold-deep transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {health && (
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    label: 'Server',
                    value: health.status === 'ok' ? 'Online' : 'Offline',
                    ok: health.status === 'ok',
                  },
                  {
                    label: 'bol.com Credentials',
                    value: health.configured ? 'Geconfigureerd' : 'Ontbreekt',
                    ok: health.configured,
                  },
                  {
                    label: 'Modus',
                    value: health.demo ? 'Demo (test)' : 'Productie',
                    ok: true,
                  },
                ].map((item) => (
                  <div key={item.label} className="border border-beige bg-ivory p-5">
                    <p className="font-sans text-xs text-taupe tracking-wide uppercase mb-2">{item.label}</p>
                    <div className="flex items-center gap-2">
                      {item.ok ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-sans text-sm text-anthracite">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Setup checklist */}
            <div className="border border-beige bg-ivory p-7">
              <h3 className="font-serif text-lg text-anthracite mb-5">Aanmeldchecklist bol.com</h3>
              <div className="space-y-3">
                {[
                  'Maak een verkopersaccount aan op partnerplatform.bol.com',
                  'Zorg voor een geldig KvK-nummer en BTW-nummer',
                  'Wacht op verificatie door bol.com (kan enkele weken duren)',
                  'Voer de verificatiecode in uit de brief van bol.com',
                  'Ga naar Instellingen → API-instellingen in het Verkopers Dashboard',
                  'Genereer een Client ID en Client Secret',
                  'Voeg de credentials toe aan het .env bestand',
                  'Zet BOL_DEMO_MODE=false in productie',
                  'Vraag EAN-codes aan voor je producten (NTIN/GS1)',
                  'Pas de EAN-codes aan in server/services/bolcom-offers.ts',
                  'Publiceer je aanbiedingen via het tabblad Aanbiedingen hieronder',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 border border-gold/40 flex items-center justify-center text-[10px] text-taupe flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-sans text-sm text-brown/80">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === OFFERS TAB === */}
        {tab === 'offers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-anthracite">Jouw aanbiedingen op bol.com</h2>
              <div className="flex gap-3">
                <button onClick={loadOffers} className="text-taupe hover:text-gold-deep transition-colors">
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <LuxuryButton onClick={publishAll} variant="primary" size="sm">
                  <Plus className="w-3.5 h-3.5" />
                  Publiceer alle producten
                </LuxuryButton>
              </div>
            </div>

            {/* Catalog to publish */}
            <div className="border border-beige bg-ivory p-6">
              <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-taupe mb-4">
                Productcatalogus
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {catalog.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border border-beige hover:border-gold/40 transition-colors">
                    <div>
                      <p className="font-sans text-sm text-anthracite">{product.name}</p>
                      <p className="font-sans text-xs text-taupe mt-0.5">
                        EAN: {product.ean} · € {product.priceEur} · {product.stock} stuks
                      </p>
                    </div>
                    <button
                      onClick={() => publishProduct(product.id)}
                      className="text-xs font-sans text-gold-deep hover:text-brown transition-colors flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                      Publiceer
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live offers */}
            {offers.length > 0 ? (
              <div className="border border-beige bg-ivory p-6">
                <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-taupe mb-4">
                  Actieve aanbiedingen ({offers.length})
                </h3>
                <div className="space-y-3">
                  {offers.map((offer) => (
                    <div key={offer.offerId} className="flex items-center justify-between p-4 border border-beige">
                      <div>
                        <p className="font-sans text-sm text-anthracite font-medium">{offer.reference ?? offer.offerId}</p>
                        <p className="font-sans text-xs text-taupe mt-0.5">
                          EAN: {offer.ean} · Voorraad: {offer.stock?.amount} · {offer.fulfilment?.method}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-sm text-anthracite">
                          € {((offer.pricing?.bundlePrices?.[0]?.unitPrice ?? 0) / 100).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeOffer(offer.offerId)}
                          className="text-taupe/50 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              !loading && (
                <div className="text-center py-12 border border-dashed border-beige">
                  <Package className="w-8 h-8 text-taupe/30 mx-auto mb-3" />
                  <p className="font-sans text-sm text-taupe">Nog geen aanbiedingen gevonden.</p>
                  <p className="font-sans text-xs text-taupe/60 mt-1">
                    Publiceer een product via de catalogus hierboven.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* === PRODUCTEN TAB === */}
        {tab === 'producten' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl text-anthracite">Productprijzen &amp; omschrijvingen</h2>
                <p className="font-sans text-xs text-taupe mt-1">
                  Wijzigingen worden direct opgeslagen en zijn zichtbaar op de website.
                </p>
              </div>
              <button onClick={loadSiteProducts} className="text-taupe hover:text-gold-deep transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {siteProducts.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-beige">
                <Package className="w-8 h-8 text-taupe/30 mx-auto mb-3" />
                <p className="font-sans text-sm text-taupe">Producten laden…</p>
              </div>
            ) : (
              <div className="space-y-3">
                {siteProducts.map((product) => (
                  <div key={product.id} className="border border-beige bg-ivory">
                    {editingId === product.id ? (
                      /* Bewerkformulier */
                      <div className="p-5">
                        <div className="flex items-start gap-4 mb-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 object-cover flex-shrink-0 border border-beige"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-xs text-taupe tracking-wide uppercase mb-0.5">{product.category}</p>
                            <p className="font-serif text-base text-anthracite leading-snug">{product.name}</p>
                            <p className="font-sans text-xs text-taupe">{product.subtitle}</p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block font-sans text-xs tracking-[0.1em] uppercase text-taupe mb-1.5">
                              Prijs
                            </label>
                            <input
                              type="text"
                              value={editPrice}
                              onChange={(e) => setEditPrice(e.target.value)}
                              placeholder="bijv. €79,95"
                              className="w-full border border-beige bg-cream px-3 py-2 font-sans text-sm text-anthracite focus:outline-none focus:border-gold/60"
                            />
                            <p className="font-sans text-[11px] text-taupe/60 mt-1">
                              Standaard: {product.defaultPrice}
                            </p>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block font-sans text-xs tracking-[0.1em] uppercase text-taupe mb-1.5">
                            Omschrijving
                          </label>
                          <textarea
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            rows={4}
                            className="w-full border border-beige bg-cream px-3 py-2 font-sans text-sm text-anthracite focus:outline-none focus:border-gold/60 resize-none"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => saveProduct(product.id)}
                            disabled={savingId === product.id}
                            className="flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] uppercase px-4 py-2 bg-anthracite text-ivory hover:bg-brown transition-colors disabled:opacity-50"
                          >
                            <Save className="w-3.5 h-3.5" />
                            {savingId === product.id ? 'Opslaan…' : 'Opslaan'}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="font-sans text-xs text-taupe hover:text-anthracite transition-colors"
                          >
                            Annuleren
                          </button>
                          {product.hasOverride && (
                            <button
                              onClick={() => resetProduct(product.id)}
                              className="ml-auto flex items-center gap-1 font-sans text-xs text-taupe/60 hover:text-red-500 transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Standaard herstellen
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Weergave */
                      <div className="flex items-center gap-4 p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover flex-shrink-0 border border-beige"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-sans text-sm text-anthracite truncate">{product.name}</p>
                            {product.hasOverride && (
                              <span className="flex-shrink-0 text-[10px] font-sans uppercase tracking-wide bg-amber-100 text-amber-700 px-1.5 py-0.5">
                                Aangepast
                              </span>
                            )}
                          </div>
                          <p className="font-sans text-xs text-taupe truncate">{product.description}</p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="font-serif text-sm text-anthracite">{product.priceDisplay}</span>
                          <button
                            onClick={() => startEdit(product)}
                            className="text-taupe hover:text-gold-deep transition-colors"
                            title="Bewerken"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === ORDERS TAB === */}
        {tab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-anthracite">
                Openstaande bestellingen ({orders.length})
              </h2>
              <button onClick={loadOrders} className="text-taupe hover:text-gold-deep transition-colors">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.orderId} className="border border-beige bg-ivory p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-sans text-sm font-medium text-anthracite">
                          Bestelling #{order.orderId}
                        </p>
                        <p className="font-sans text-xs text-taupe mt-0.5">
                          {new Date(order.orderPlacedDateTime).toLocaleDateString('nl-NL', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <StatusBadge status="OPEN" />
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.orderItems?.map((item: any) => (
                        <div key={item.orderItemId} className="flex items-center justify-between py-2 border-t border-beige">
                          <div>
                            <p className="font-sans text-sm text-anthracite">{item.title}</p>
                            <p className="font-sans text-xs text-taupe">
                              EAN: {item.ean} · Aantal: {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-serif text-sm text-anthracite">
                              € {item.unitPrice}
                            </span>
                            <button
                              onClick={() => shipOrder(item.orderItemId)}
                              className="flex items-center gap-1.5 font-sans text-xs text-gold-deep hover:text-brown transition-colors border border-gold/30 px-3 py-1.5"
                            >
                              <Send className="w-3 h-3" />
                              Verzend
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {order.customerDetails?.shipmentDetails && (
                      <div className="bg-cream p-3 text-xs font-sans text-taupe">
                        <strong className="text-anthracite">Verzendadres: </strong>
                        {order.customerDetails.shipmentDetails.streetName}{' '}
                        {order.customerDetails.shipmentDetails.houseNumber},{' '}
                        {order.customerDetails.shipmentDetails.zipCode}{' '}
                        {order.customerDetails.shipmentDetails.city}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="text-center py-12 border border-dashed border-beige">
                  <ShoppingBag className="w-8 h-8 text-taupe/30 mx-auto mb-3" />
                  <p className="font-sans text-sm text-taupe">Geen openstaande bestellingen.</p>
                  <p className="font-sans text-xs text-taupe/60 mt-1">
                    Nieuwe bestellingen verschijnen hier zodra klanten via bol.com bestellen.
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
