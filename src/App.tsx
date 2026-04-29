import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Cursor from './components/Cursor';
import Layout from './components/Layout';

// Lazy-load every page so only the current route's JS is downloaded
const Home     = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About    = lazy(() => import('./pages/About'));
const Pricing  = lazy(() => import('./pages/Pricing'));
const Contact  = lazy(() => import('./pages/Contact'));
const Admin    = lazy(() => import('./pages/Admin'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin — isolated, no nav/footer */}
        <Route path="/src" element={
          <Suspense fallback={null}>
            <Admin />
          </Suspense>
        } />

        {/* Public site */}
        <Route path="*" element={
          <>
            <div className="grain-overlay" aria-hidden="true" />
            <div className="scanline" aria-hidden="true" />
            <Cursor />
            <Layout>
              <Suspense fallback={<div className="bg-void min-h-screen" />}>
                <Routes>
                  <Route path="/"        element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about"   element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Suspense>
            </Layout>
          </>
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
