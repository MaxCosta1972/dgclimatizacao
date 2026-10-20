import React from 'react';
import { Shield, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const About: React.FC = () => {
  const { config } = useSiteConfig();

  return (
    <section id="sobre" className="py-24 bg-[#101820] relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Coluna Visual: Foto técnica real de manutenção em unidade externa */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <div className="aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={config.about.imageSrc}
                    alt={config.about.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-5 bg-slate-900/90 border-t border-slate-800">
                  <span className="text-xs font-bold text-white block mb-1">
                    Rigor nos procedimentos técnicos
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Testes de estanqueidade, leitura de pressões e revisão elétrica conduzidos com ferramentas adequadas ao padrão do seu ar-condicionado.
                  </p>
                </div>
              </div>

              {/* Moldura de detalhe em amarelo */}
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#FFC928]/40 rounded-bl-xl pointer-events-none -z-10" />
            </div>
          </div>

          {/* Coluna de Conteúdo Institucional */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
              <span>Sobre a DG Climatização</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Nossa Filosofia de Trabalho</span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {config.about.title}
            </h2>

            <p className="text-sm sm:text-base font-medium text-[#FFC928]/90 mb-6 leading-relaxed">
              {config.about.subtitle}
            </p>

            {/* Parágrafos da História Institucional */}
            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              {config.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Grade de Compromissos Técnicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              {config.about.commitments.map((commitment, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC928] shrink-0" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      {commitment.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    {commitment.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
