import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const CtaBanner: React.FC = () => {
  const { config, getWhatsAppUrl } = useSiteConfig();

  const handleCtaClick = () => {
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <section className="py-20 bg-[#101820] relative overflow-hidden border-t border-b border-slate-800">
      {/* Luz ambiente de fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101820] via-[#16212b] to-[#101820]" />
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#FFC928]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Tagline de chamada */}
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FFC928] mb-4">
          <span>Atendimento & Orçamento Rápido</span>
        </div>

        {/* Título Conforme Requisito Exato */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {config.ctaBanner.title}
        </h2>

        {/* Texto Conforme Requisito Exato */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {config.ctaBanner.text}
        </p>

        {/* Botão em Destaque */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full sm:w-auto px-8 py-4 text-sm sm:text-base font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] active:scale-[0.98] rounded-xl shadow-xl shadow-[#FFC928]/20 transition-all duration-150 flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928]"
          >
            <span>{config.ctaBanner.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-[#101820] group-hover:translate-x-1 transition-transform" />
          </button>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chamar no WhatsApp</span>
            </a>
          )}
        </div>

      </div>
    </section>
  );
};
