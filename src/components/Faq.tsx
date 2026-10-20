import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Faq: React.FC = () => {
  const { config } = useSiteConfig();
  const [openId, setOpenId] = useState<string | null>('freq-manutencao');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="duvidas" className="py-24 bg-[#080D12] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire suas Dúvidas</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Orientações Técnicas</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            PERGUNTAS FREQUENTES
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Respostas transparentes sobre cuidados, periodicidade e procedimentos de manutenção do seu ar-condicionado.
          </p>
        </div>

        {/* Acordeão */}
        <div className="space-y-4">
          {config.faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-[#101820] border-[#FFC928]/40 shadow-lg shadow-black/40'
                    : 'bg-[#101820]/70 hover:bg-[#101820] border-slate-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928] rounded-2xl"
                >
                  <span
                    className={`text-base font-semibold transition-colors ${
                      isOpen ? 'text-[#FFC928]' : 'text-white'
                    }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-[#FFC928]/20 text-[#FFC928] rotate-180'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bloco de Ajuda Adicional */}
        <div className="mt-12 p-6 rounded-2xl bg-[#101820] border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-[#FFC928] shrink-0" />
            <p className="text-xs sm:text-sm text-slate-300 text-left">
              Ficou com alguma dúvida específica sobre seu modelo de aparelho?
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('#contato');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-xs font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Falar com a DG Climatização
          </button>
        </div>

      </div>
    </section>
  );
};
