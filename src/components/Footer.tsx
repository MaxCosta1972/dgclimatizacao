import React, { useState } from 'react';
import { ShieldCheck, MessageCircle, Phone, Mail, MapPin, X, ArrowUp } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Footer: React.FC = () => {
  const { config, getWhatsAppUrl, setIsConfigDrawerOpen } = useSiteConfig();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Dúvidas frequentes', href: '#duvidas' },
    { label: 'Contato', href: '#contato' }
  ];

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-[#080D12] text-slate-400 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Coluna da Marca (4 colunas) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" />
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              A DG Climatização cuida do seu ar-condicionado com atenção aos detalhes,
              manutenção profissional e compromisso com o seu conforto térmico e a qualidade do ar.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsConfigDrawerOpen(true)}
                className="text-xs text-slate-400 hover:text-[#FFC928] underline underline-offset-4"
              >
                Personalizar contatos & fotos
              </button>
            </div>
          </div>

          {/* Coluna de Links Rápidos (3 colunas) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="hover:text-[#FFC928] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de Serviços (3 colunas) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Especialidades
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {config.services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#servicos"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#servicos');
                    }}
                    className="hover:text-[#FFC928] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna de Atendimento (2 colunas) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Atendimento
            </h4>
            
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Oficial</span>
              </a>
            )}

            <div className="text-xs text-slate-400 space-y-1 pt-1">
              <span className="text-slate-300 block font-medium">Horário</span>
              <p>Segunda a Sexta: 08h às 18h</p>
              <p>Sábados: 08h às 13h</p>
            </div>
          </div>

        </div>

        {/* Linha Inferior com Copyright e Políticas */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} DG Climatização. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(true)}
              className="hover:text-slate-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              Política de Privacidade
            </button>

            <button
              type="button"
              onClick={handleScrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Topo</span>
            </button>
          </div>
        </div>

      </div>

      {/* Modal de Política de Privacidade (LGPD) */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#101820] border border-slate-700 max-w-xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#FFC928]" />
              Política de Privacidade & Proteção de Dados
            </h3>

            <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
              <p>
                A <strong>DG Climatização</strong> respeita a sua privacidade e cumpre as normas da Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
              </p>
              <div>
                <strong className="text-white block mb-1">1. Coleta de Informações</strong>
                <p className="text-slate-400">
                  Coletamos apenas as informações estritamente necessárias enviadas voluntariamente por você através dos nossos canais de contato ou formulário de orçamento (nome, telefone, e-mail e descrição do equipamento).
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">2. Finalidade do Tratamento</strong>
                <p className="text-slate-400">
                  Os dados informados destinam-se exclusivamente para responder às suas dúvidas, emitir propostas técnicas de manutenção de ar-condicionado e agendar visitas da equipe da DG Climatização.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">3. Não Compartilhamento</strong>
                <p className="text-slate-400">
                  A DG Climatização não vende, aluga ou compartilha seus dados pessoais com terceiros ou redes de publicidade.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">4. Seus Direitos</strong>
                <p className="text-slate-400">
                  Você pode a qualquer momento solicitar a confirmação, correção ou exclusão de seus dados dos nossos registros mediante solicitação através dos nossos canais oficiais.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="px-5 py-2.5 text-xs font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] rounded-xl transition-colors cursor-pointer"
              >
                Entendi e Concordo
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
