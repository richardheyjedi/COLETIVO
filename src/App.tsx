/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollProgress } from "./components/ScrollProgress";
import { PageTransitionOverlay } from "./components/PageTransitionOverlay";
import { WhatsAppWidget } from "./components/WhatsAppWidget";

// Lazy-loaded pages — each becomes a separate JS chunk (code splitting).
// Pages are only downloaded when the user navigates to them, improving
// initial load performance (LCP / TTI) significantly.
const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Sobre = lazy(() => import("./pages/Sobre").then(m => ({ default: m.Sobre })));
const Representacao = lazy(() => import("./pages/Representacao").then(m => ({ default: m.Representacao })));
const Barbearia = lazy(() => import("./pages/Barbearia").then(m => ({ default: m.Barbearia })));
const Loja = lazy(() => import("./pages/Loja").then(m => ({ default: m.Loja })));
const Studio = lazy(() => import("./pages/Studio").then(m => ({ default: m.Studio })));
const Gestao = lazy(() => import("./pages/Gestao").then(m => ({ default: m.Gestao })));
const Contato = lazy(() => import("./pages/Contato").then(m => ({ default: m.Contato })));

// Minimal fallback shown while a page chunk is being downloaded
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-white">
    <div className="w-6 h-6 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
      <Analytics />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black font-sans selection:bg-black selection:text-white relative">
      <ScrollProgress />
      <div className="grain-overlay" />
      
      <Sidebar />
      <Navbar />
      <WhatsAppWidget />
      
      <main className="md:pl-64 flex flex-col min-h-screen">
        <PageTransitionOverlay>
          {(displayLocation) => (
            <Suspense fallback={<PageFallback />}>
              <Routes location={displayLocation}>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/representacao" element={<Representacao />} />
                <Route path="/barbearia" element={<Barbearia />} />
                <Route path="/loja" element={<Loja />} />
                <Route path="/studio" element={<Studio />} />
                <Route path="/gestao" element={<Gestao />} />
                <Route path="/contato" element={<Contato />} />
              </Routes>
            </Suspense>
          )}
        </PageTransitionOverlay>
        <Footer />
        
        {/* Visual background elements - High-end Minimal */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] bg-brand-pink/5 blur-[150px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-brand-black/5 blur-[120px]" />
        </div>
        
        {/* Corporate/System Accents */}
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden mix-blend-difference opacity-20">
          <div className="absolute top-4 left-6 md:left-72 font-mono text-white text-[8px] tracking-[0.5em] uppercase">Archive_Status: Operational</div>
        </div>
      </main>
    </div>
  );
}
