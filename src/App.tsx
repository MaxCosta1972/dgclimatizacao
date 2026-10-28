import React from 'react';
import { SiteConfigProvider } from './context/SiteConfigContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Differentials } from './components/Differentials';
import { Gallery } from './components/Gallery';
import { CtaBanner } from './components/CtaBanner';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export function App() {
  return (
    <SiteConfigProvider>
      <div className="min-h-screen bg-[#101820] text-slate-100 flex flex-col font-sans selection:bg-[#FFC928] selection:text-[#101820]">
        {/* Barra de Navegação Superior */}
        <Navbar />

        {/* Conteúdo Principal */}
        <main className="flex-grow">
          {/* Primeira Dobra: Hero de Alto Impacto */}
          <Hero />

          {/* Serviços Especializados */}
          <Services />

          {/* Sobre a DG Climatização */}
          <About />

          {/* Diferenciais e Pilares de Atuação */}
          <Differentials />

          {/* Galeria Visual de Procedimentos e Slider Antes/Depois */}
          <Gallery />

          {/* Chamada para Ação */}
          <CtaBanner />

          {/* Perguntas Frequentes (FAQ) */}
          <Faq />

          {/* Solicitação de Orçamento e Contato */}
          <Contact />
        </main>

        {/* Rodapé Institucional */}
        <Footer />

        {/* Botão Flutuante de WhatsApp Oficial */}
        <FloatingWhatsApp />
      </div>
    </SiteConfigProvider>
  );
}

export default App;
