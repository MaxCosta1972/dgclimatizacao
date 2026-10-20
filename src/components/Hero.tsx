import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Wrench, Clock, CheckCircle } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Hero: React.FC = () => {
  const { config, getWhatsAppUrl } = useSiteConfig();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 lg:py-0 flex flex-col justify-center bg-gradient-to-b from-[#080D12] via-[#101820] to-[#0d141b] overflow-hidden"
    >
      {/* Elementos gráficos de fluxo de ar sutis e luz ambiente */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FFC928]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[32rem] h-[32rem] bg-[#EAF7FB]/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Linhas decorativas sutis de circulação de ar */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100,200 C 300,160 500,260 1100,180 S 1600,220 2000,190"
          fill="none"
          stroke="#EAF7FB"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          className="animate-airflow"
        />
        <path
          d="M -50,340 C 400,300 700,380 1200,310 S 1700,350 2100,320"
          fill="none"
          stroke="#FFC928"
          strokeWidth="1"
          strokeDasharray="6 14"
          className="animate-airflow"
          style={{ animationDuration: '12s' }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Coluna de Texto Principal (7 colunas) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tagline / Metadados limpos sem pill artificial */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-4">
              <span>Manutenção Especializada</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Conforto Térmico</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Residencial & Comercial</span>
            </div>

            {/* Título Principal Conforme Requisito Exato */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[1.15] mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="block text-white">{config.hero.titleHighlight}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFC928] via-[#ffd868] to-white">
                {config.hero.titleRest}
              </span>
            </h1>

            {/* Subtítulo Conforme Requisito Exato */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {config.hero.subtitle}
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                type="button"
                onClick={() => handleScroll('#contato')}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] active:scale-[0.98] rounded-xl shadow-lg shadow-[#FFC928]/20 transition-all duration-150 flex items-center justify-center gap-2.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928]"
              >
                <span>{config.hero.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 text-[#101820] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('#servicos')}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all duration-150 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                {config.hero.secondaryCtaText}
              </button>
            </div>

            {/* Destaque WhatsApp oficial quando configurado ou aviso sutil */}
            {whatsappUrl ? (
              <div className="inline-flex items-center gap-3 p-3 bg-slate-900/80 border border-emerald-500/30 rounded-xl max-w-fit">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-emerald-400">Atendimento Rápido via WhatsApp</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-300 hover:text-white underline underline-offset-2"
                  >
                    Clique para iniciar uma conversa com nossa equipe
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <CheckCircle className="w-4 h-4 text-[#FFC928] shrink-0" />
                <span>Atendimento transparente e diagnóstico sem custos ocultos</span>
              </div>
            )}
          </div>

          {/* Coluna Visual Principal: Fotografia Cinematográfica do Técnico (5 colunas) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Moldura estrutural de alta fidelidade */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900/60 shadow-2xl shadow-black/60 group">
                
                {/* Imagem Principal */}
                <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={config.hero.imageSrc}
                    alt={config.hero.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Gradiente sutil para reforço visual de contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/90 via-transparent to-transparent opacity-70" />
                </div>

                {/* Card de Legenda Técnica Sobreposta de Alta Elegância */}
                <div className="absolute bottom-4 inset-x-4 p-3.5 bg-[#101820]/90 backdrop-blur-md rounded-xl border border-slate-700/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFC928]/15 border border-[#FFC928]/30 flex items-center justify-center text-[#FFC928] shrink-0">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white">Equipe Técnica Capacitada</span>
                      <span className="text-[11px] text-slate-300">Inspeção minuciosa e precisão operacional</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] uppercase font-semibold text-[#FFC928] tracking-wider block">Padrão DG</span>
                    <span className="text-[11px] text-slate-400">100% Cuidado</span>
                  </div>
                </div>
              </div>

              {/* Detalhe de acabamento geométrico em amarelo */}
              <div className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 border-[#FFC928]/40 rounded-br-2xl pointer-events-none -z-10" />
              <div className="absolute -top-2 -left-2 w-20 h-20 border-l-2 border-t-2 border-[#FFC928]/40 rounded-tl-2xl pointer-events-none -z-10" />
            </div>
          </div>
        </div>

        {/* Faixa de Garantias e Rigor Técnico (KPI / Trust Strip) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-white block">Proteção do Local</span>
              <span className="text-xs text-slate-400">Higiene sem sujeira ou respingos</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-white block">Ferramental Preciso</span>
              <span className="text-xs text-slate-400">Medição calibrada de circuitos</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-white block">Pontualidade</span>
              <span className="text-xs text-slate-400">Atendimento no horário agendado</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#FFC928] shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-white block">Ar Puro & Saudável</span>
              <span className="text-xs text-slate-400">Eliminação de mofo e impurezas</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
