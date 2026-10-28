import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useSiteConfig } from '../context/SiteConfigContext';

export const Navbar: React.FC = () => {
  const { config, getWhatsAppUrl } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre nós', href: '#sobre' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Dúvidas frequentes', href: '#duvidas' },
    { label: 'Contato', href: '#contato' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappUrl = getWhatsAppUrl();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101820]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
            : 'bg-transparent border-b border-white/5 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#inicio');
              }}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928] rounded-lg"
              aria-label="DG Climatização - Início"
            >
              <BrandLogo size="md" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav
              aria-label="Navegação Principal"
              className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="whitespace-nowrap hover:text-[#FFC928] transition-colors duration-150 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FFC928] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Action & Direct Contact */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-xs font-semibold text-emerald-400 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 rounded-lg border border-emerald-500/30 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
                  title="Conversar pelo WhatsApp"
                  aria-label="WhatsApp Oficial"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span className="hidden xl:inline">WhatsApp</span>
                </a>
              ) : null}

              <button
                type="button"
                onClick={() => handleNavClick('#contato')}
                className="px-4 py-2 text-xs font-semibold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] active:scale-[0.98] rounded-lg transition-all duration-150 shadow-sm shadow-[#FFC928]/20 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101820] focus-visible:ring-[#FFC928]"
              >
                Solicitar orçamento
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928]"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Content */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#080D12] border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-50 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <BrandLogo size="sm" />
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mt-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-[#FFC928] hover:bg-slate-900 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleNavClick('#contato')}
                className="w-full py-3 px-4 text-center text-sm font-semibold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] rounded-lg shadow-sm transition-colors"
              >
                Solicitar orçamento
              </button>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-center text-xs font-medium text-white bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Atendimento WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
