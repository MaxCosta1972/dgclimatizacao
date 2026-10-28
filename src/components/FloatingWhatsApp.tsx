import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config, getWhatsAppUrl } = useSiteConfig();
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = getWhatsAppUrl() || `https://wa.me/5521979056031?text=${encodeURIComponent(config.contact.whatsappDefaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end group">
      
      {/* Tooltip de Boas-Vindas */}
      {showTooltip && (
        <div className="mb-3 p-3 bg-[#101820] border border-slate-700 text-white rounded-xl shadow-xl max-w-xs text-xs relative animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute top-2 right-2 text-slate-400 hover:text-white"
            aria-label="Fechar balão"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <span className="font-bold text-[#FFC928] block mb-1">
            DG Climatização no WhatsApp
          </span>
          <p className="text-slate-300 pr-3">
            Tire suas dúvidas ou envie fotos do seu ar-condicionado agora mesmo.
          </p>
        </div>
      )}

      {/* Botão Flutuante */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820] focus-visible:ring-[#25D366]"
        aria-label="Abrir conversa no WhatsApp da DG Climatização"
      >
        <MessageCircle className="w-7 h-7" />
        {/* Indicador de status online discreto */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25D366]" />
      </a>

    </div>
  );
};
