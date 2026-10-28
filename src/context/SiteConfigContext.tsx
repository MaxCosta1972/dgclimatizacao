import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, initialSiteConfig } from '../config/siteData';

interface SiteConfigContextType {
  config: SiteConfig;
  getWhatsAppUrl: (customMessage?: string) => string | null;
  selectedServiceForQuote: string;
  setSelectedServiceForQuote: (serviceTitle: string) => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Limpar qualquer cache antigo de configurações dos navegadores de testes
  useEffect(() => {
    try {
      localStorage.removeItem('dg_climatizacao_site_config');
      localStorage.removeItem('dg_climatizacao_site_config_v2');
      localStorage.removeItem('dg_climatizacao_site_config_v3');
      localStorage.removeItem('dg_climatizacao_site_config_v4');
    } catch {
      // ignore
    }
  }, []);

  const [config] = useState<SiteConfig>(initialSiteConfig);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');

  const getWhatsAppUrl = (customMessage?: string) => {
    if (!config.contact.isWhatsappConfigured || !config.contact.whatsappNumber) {
      return null;
    }
    const cleanNumber = config.contact.whatsappNumber.replace(/\D/g, '');
    const message = customMessage || config.contact.whatsappDefaultMessage;
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <SiteConfigContext.Provider
      value={{
        config,
        getWhatsAppUrl,
        selectedServiceForQuote,
        setSelectedServiceForQuote
      }}
    >
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};
