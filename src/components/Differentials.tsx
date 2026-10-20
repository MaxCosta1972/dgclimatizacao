import React from 'react';
import {
  CheckCircle2,
  Shield,
  UserCheck,
  MessageSquareQuote,
  Award,
  Gauge
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Differentials: React.FC = () => {
  const { config } = useSiteConfig();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[#FFC928]" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-[#FFC928]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#FFC928]" />;
      case 'MessageSquareQuote':
        return <MessageSquareQuote className="w-5 h-5 text-[#FFC928]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#FFC928]" />;
      case 'Gauge':
      default:
        return <Gauge className="w-5 h-5 text-[#FFC928]" />;
    }
  };

  return (
    <section className="py-24 bg-[#080D12] relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <span>Pilares de Atuação</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Compromisso Real</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            POR QUE CONTAR COM A DG CLIMATIZAÇÃO?
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Uma abordagem fundamentada em transparência, técnica e respeito com seu espaço,
            sem promessas mirabolantes, entregando exatamente o que o seu equipamento precisa.
          </p>
        </div>

        {/* Grid dos 6 Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.differentials.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="bg-[#101820] border border-slate-800/90 hover:border-slate-700 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#FFC928]/40 transition-colors">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-white mb-2 group-hover:text-[#FFC928] transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFC928]" />
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                  Padrão DG
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
