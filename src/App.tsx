/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollProgress } from "./components/ScrollProgress";
import { PageTransitionOverlay } from "./components/PageTransitionOverlay";
import { Home } from "./pages/Home";
import { Sobre } from "./pages/Sobre";
import { Representacao } from "./pages/Representacao";
import { Barbearia } from "./pages/Barbearia";
import { Loja } from "./pages/Loja";
import { Studio } from "./pages/Studio";
import { Gestao } from "./pages/Gestao";
import { Contato } from "./pages/Contato";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-brand-white text-brand-black font-sans selection:bg-black selection:text-white relative">
      <ScrollProgress />
      <div className="grain-overlay" />
      <CustomCursor />
      
      <Sidebar />
      <Navbar />
      
      <main className="md:pl-64 flex flex-col min-h-screen">
        <PageTransitionOverlay>
          {(displayLocation) => (
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
