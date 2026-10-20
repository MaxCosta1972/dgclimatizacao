import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, initialSiteConfig } from '../config/siteData';

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (updater: (prev: SiteConfig) => SiteConfig) => void;
  resetConfig: () => void;
  getWhatsAppUrl: (customMessage?: string) => string | null;
  isConfigDrawerOpen: boolean;
  setIsConfigDrawerOpen: (open: boolean) => void;
  selectedServiceForQuote: string;
  setSelectedServiceForQuote: (serviceTitle: string) => void;
}

const STORAGE_KEY = 'dg_climatizacao_site_config_v2';

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteConfig,
          ...parsed,
          company: { ...initialSiteConfig.company, ...(parsed.company || {}) },
          contact: { ...initialSiteConfig.contact, ...(parsed.contact || {}) },
          hero: { ...initialSiteConfig.hero, ...(parsed.hero || {}) },
          beforeAfter: { ...initialSiteConfig.beforeAfter, ...(parsed.beforeAfter || {}) }
        };
      }
    } catch {
      // Local storage disabled or error
    }
    return initialSiteConfig;
  });

  const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');

  const updateConfig = (updater: (prev: SiteConfig) => SiteConfig) => {
    setConfig(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const resetConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConfig(initialSiteConfig);
  };

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
        updateConfig,
        resetConfig,
        getWhatsAppUrl,
        isConfigDrawerOpen,
        setIsConfigDrawerOpen,
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
