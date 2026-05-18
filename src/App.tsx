import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import DesignPage from './pages/DesignPage';
import InspirationPage from './pages/InspirationPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import AlgemeneVoorwaardenPage from './pages/AlgemeneVoorwaardenPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import OverOnsPage from './pages/OverOnsPage';
import RetourbeleidPage from './pages/RetourbeleidPage';
import BetalingResultaatPage from './pages/BetalingResultaatPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collectie" element={<ProductPage />} />
          <Route path="/collectie/:id" element={<ProductDetailPage />} />
          <Route path="/ontwerp" element={<DesignPage />} />
          <Route path="/inspiratie" element={<InspirationPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/afrekenen" element={<CheckoutPage />} />
          <Route path="/over-ons" element={<OverOnsPage />} />
          <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaardenPage />} />
          <Route path="/privacybeleid" element={<PrivacyPolicyPage />} />
          <Route path="/retourbeleid" element={<RetourbeleidPage />} />
          <Route path="/betaling/resultaat" element={<BetalingResultaatPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}
