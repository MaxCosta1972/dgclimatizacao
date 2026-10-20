import React, { useState } from 'react';
import { ShieldCheck, Wrench, Sparkles, SearchCheck, ArrowRight, Check, AlertCircle, X } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { ServiceItem } from '../config/siteData';

export const Services: React.FC = () => {
  const { config, setSelectedServiceForQuote } = useSiteConfig();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#FFC928]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#FFC928]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FFC928]" />;
      case 'SearchCheck':
      default:
        return <SearchCheck className="w-6 h-6 text-[#FFC928]" />;
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceForQuote(service.title);
    setActiveModalService(null);
    const contactSection = document.querySelector('#contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="py-24 bg-[#080D12] relative overflow-hidden">
      {/* Background glow sutil */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#FFC928]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#EAF7FB]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção Conforme Requisito */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <span>Nossos Serviços</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Padrão Técnico Superior</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            CLIMATIZAÇÃO CUIDADA EM CADA DETALHE.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Atendimento sob medida para preservar a vida útil do seu ar-condicionado,
            garantir ar puro no ambiente e manter o conforto térmico sem surpresas.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {config.services.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-[#101820] hover:bg-[#141e28] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-7 transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/40 hover:-translate-y-1"
            >
              <div>
                {/* Linha superior: Ícone moderno e numeração editorial limpa */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#FFC928]/40 transition-colors">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 tracking-wider">
                    0{index + 1}
                  </span>
                </div>

                {/* Título do Serviço */}
                <h3
                  className="text-xl font-bold text-white mb-3 group-hover:text-[#FFC928] transition-colors"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {service.title}
                </h3>

                {/* Descrição Curta */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Lista de Benefícios Chave */}
                <div className="space-y-2 mb-6">
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-[#FFC928] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ações do Card */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalService(service)}
                  className="text-xs font-medium text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:underline cursor-pointer"
                >
                  Mais informações
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFC928] hover:text-[#ffd868] transition-colors group/btn cursor-pointer"
                >
                  <span>Solicitar atendimento</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da seção de serviços */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFC928] shrink-0" />
            <p className="text-xs text-slate-300">
              Não tem certeza de qual serviço seu aparelho necessita? Nossa equipe realiza a triagem preliminar com você.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#contato');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-white hover:text-[#FFC928] underline underline-offset-4 whitespace-nowrap cursor-pointer"
          >
            Fazer uma consulta técnica
          </button>
        </div>

      </div>

      {/* Modal Informativo Detalhado do Serviço */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveModalService(null)}
          />
          <div className="relative bg-[#101820] border border-slate-700 max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {getServiceIcon(activeModalService.iconName)}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {activeModalService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-5 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFC928] block mb-1">
                  Visão Geral do Procedimento
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeModalService.fullDesc}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFC928] block mb-2">
                  Periodicidade Recomendada
                </span>
                <p className="text-slate-300 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
                  {activeModalService.recommendedFrequency}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFC928] block mb-2">
                  Benefícios Diretos
                </span>
                <ul className="space-y-2">
                  {activeModalService.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#FFC928] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeModalService.indicativeSymptoms && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#FFC928]" />
                    Sinais de que você precisa deste serviço
                  </span>
                  <div className="space-y-1.5">
                    {activeModalService.indicativeSymptoms.map((s, i) => (
                      <div key={i} className="text-xs text-slate-400 pl-4 border-l border-slate-700">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => handleSelectService(activeModalService)}
                className="px-5 py-2.5 text-xs font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] rounded-xl shadow-md transition-colors"
              >
                Solicitar este serviço
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
