import React from 'react';
import { useSiteConfig } from '../context/SiteConfigContext';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md'
}) => {
  const { config } = useSiteConfig();

  // Se houver um arquivo de logo isolado especificado
  if (config.company.logoSrc) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={config.company.logoSrc}
          alt={config.company.name}
          className={`object-contain ${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10'
          }`}
        />
      </div>
    );
  }

  // Reprodução vetorial fiel do logotipo oficial da DG Climatização
  // Baseado nas fotos reais enviadas (círculo amarelo, plug/aletas em velocidade e tipografia DG)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo Oficial DG Climatização */}
      <div
        className={`relative shrink-0 flex items-center justify-center ${
          size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Círculo com abertura para as linhas de conexão elétrica / velocidade */}
          <path
            d="M 30,22 A 40,40 0 1 1 24,65"
            stroke="#FFC928"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* 3 Linhas horizontais do plugue / velocidade que conectam no D */}
          <line x1="8" y1="36" x2="32" y2="36" stroke="#FFC928" strokeWidth="5" strokeLinecap="round" />
          <line x1="2" y1="48" x2="34" y2="48" stroke="#FFC928" strokeWidth="6" strokeLinecap="round" />
          <line x1="8" y1="60" x2="32" y2="60" stroke="#FFC928" strokeWidth="5" strokeLinecap="round" />

          {/* Letra D estilizada com terminal de tomada */}
          <path
            d="M 32,32 H 44 C 53,32 58,38 58,48 C 58,58 53,64 44,64 H 32 Z"
            fill="#FFC928"
          />
          {/* Vazado interno do D */}
          <path
            d="M 39,40 H 43 C 47,40 49,43 49,48 C 49,53 47,56 43,56 H 39 Z"
            fill="#101820"
          />

          {/* Letra G em amarelo sólido */}
          <path
            d="M 76,38 C 73,34 68,32 62,32 C 52,32 46,39 46,48 C 46,57 52,64 63,64 C 71,64 76,60 78,54 H 64 V 47 H 84 V 60 C 79,68 71,71 62,71 C 48,71 39,61 39,48 C 39,35 48,25 63,25 C 71,25 78,28 82,34 Z"
            fill="#FFC928"
          />
        </svg>
      </div>

      {/* Tipografia da Marca com alinhamento oficial */}
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none ${
            variant === 'light' ? 'text-[#101820]' : 'text-white'
          } ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg'}`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          DG <span className="text-[#FFC928]">CLIMATIZAÇÃO</span>
        </span>
        <span
          className={`text-[9px] uppercase tracking-wider font-semibold mt-1 leading-none ${
            variant === 'light' ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          Residencial & Predial
        </span>
      </div>
    </div>
  );
};
