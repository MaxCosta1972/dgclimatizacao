import React, { useState } from 'react';
import {
  X,
  SlidersHorizontal,
  Upload,
  Image as ImageIcon,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Check,
  RotateCcw,
  Copy,
  Info,
  CheckCircle2,
  Download
} from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';

export const PhotoConfigDrawer: React.FC = () => {
  const { config, updateConfig, resetConfig, isConfigDrawerOpen, setIsConfigDrawerOpen } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'fotos' | 'contatos' | 'exportar'>('fotos');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isConfigDrawerOpen) return null;

  // Handler para carregar imagem local do computador diretamente no preview
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyConfigJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsConfigDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-[#0d141b] border-l border-slate-800 text-white shadow-2xl flex flex-col h-full z-10 overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-[#101820]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFC928]/20 flex items-center justify-center text-[#FFC928]">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Gerenciador da DG Climatização
              </h3>
              <p className="text-[11px] text-slate-400">
                Substitua fotos reais, WhatsApp e dados da empresa
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsConfigDrawerOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas */}
        <div className="flex border-b border-slate-800 bg-[#080D12]">
          <button
            type="button"
            onClick={() => setActiveTab('fotos')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'fotos'
                ? 'border-[#FFC928] text-[#FFC928] bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Substituir Fotos Reais
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contatos')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'contatos'
                ? 'border-[#FFC928] text-[#FFC928] bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            WhatsApp & Contatos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('exportar')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'exportar'
                ? 'border-[#FFC928] text-[#FFC928] bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Exportar / Código
          </button>
        </div>

        {/* Conteúdo com rolagem */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ABA FOTOS */}
          {activeTab === 'fotos' && (
            <div className="space-y-6">
              
              {/* Alerta Informativo */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
                <Info className="w-4 h-4 text-[#FFC928] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Como usar suas fotos reais:</strong>
                  Você pode fazer upload direto de qualquer foto do seu computador para testar no site imediatamente ou colar o link/caminho da imagem.
                </div>
              </div>

              {/* 1. Logotipo Oficial */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Logotipo Oficial da DG Climatização
                  </span>
                  {config.company.logoSrc && (
                    <button
                      type="button"
                      onClick={() =>
                        updateConfig(prev => ({
                          ...prev,
                          company: { ...prev.company, logoSrc: null }
                        }))
                      }
                      className="text-[11px] text-red-400 hover:underline"
                    >
                      Remover e usar emblema
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={config.company.logoSrc || ''}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        company: { ...prev.company, logoSrc: e.target.value.trim() || null }
                      }))
                    }
                    placeholder="Cole o caminho ou URL da logo oficial"
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                  <label className="px-3 py-2 text-xs font-semibold bg-[#FFC928] text-[#101820] rounded-lg hover:bg-[#e5b21d] cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          updateConfig(prev => ({
                            ...prev,
                            company: { ...prev.company, logoSrc: dataUrl }
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* 2. Foto Principal do Hero (Técnico / Equipamento) */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Foto Principal da Primeira Dobra (Hero)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg bg-black overflow-hidden shrink-0 border border-slate-700">
                    <img
                      src={config.hero.imageSrc}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={config.hero.imageSrc}
                      onChange={(e) =>
                        updateConfig(prev => ({
                          ...prev,
                          hero: { ...prev.hero, imageSrc: e.target.value }
                        }))
                      }
                      placeholder="Caminho da foto do Hero"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <label className="px-3 py-2 text-xs font-semibold bg-[#FFC928] text-[#101820] rounded-lg hover:bg-[#e5b21d] cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          updateConfig(prev => ({
                            ...prev,
                            hero: { ...prev.hero, imageSrc: dataUrl }
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* 3. Foto da Seção Sobre Nós */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Foto da Seção Sobre Nós
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg bg-black overflow-hidden shrink-0 border border-slate-700">
                    <img
                      src={config.about.imageSrc}
                      alt="Sobre preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={config.about.imageSrc}
                      onChange={(e) =>
                        updateConfig(prev => ({
                          ...prev,
                          about: { ...prev.about, imageSrc: e.target.value }
                        }))
                      }
                      placeholder="Caminho da foto da seção Sobre"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <label className="px-3 py-2 text-xs font-semibold bg-[#FFC928] text-[#101820] rounded-lg hover:bg-[#e5b21d] cursor-pointer shrink-0 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          updateConfig(prev => ({
                            ...prev,
                            about: { ...prev.about, imageSrc: dataUrl }
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* 4. Fotos do Antes e Depois */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Comparativo Antes e Depois (Slider)
                </span>
                
                {/* Antes */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-amber-400 font-bold w-12 shrink-0">Antes:</span>
                  <input
                    type="text"
                    value={config.beforeAfter.beforeImage}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        beforeAfter: { ...prev.beforeAfter, beforeImage: e.target.value }
                      }))
                    }
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                  <label className="p-2 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#FFC928]" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          updateConfig(prev => ({
                            ...prev,
                            beforeAfter: { ...prev.beforeAfter, beforeImage: dataUrl }
                          }))
                        )
                      }
                    />
                  </label>
                </div>

                {/* Depois */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-emerald-400 font-bold w-12 shrink-0">Depois:</span>
                  <input
                    type="text"
                    value={config.beforeAfter.afterImage}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        beforeAfter: { ...prev.beforeAfter, afterImage: e.target.value }
                      }))
                    }
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                  <label className="p-2 text-xs bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-[#FFC928]" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          updateConfig(prev => ({
                            ...prev,
                            beforeAfter: { ...prev.beforeAfter, afterImage: dataUrl }
                          }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* 5. Fotos da Galeria */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Fotos da Galeria ({config.gallery.length} fotos)
                </span>
                <div className="space-y-3">
                  {config.gallery.map((item, idx) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      <div className="w-12 h-10 rounded bg-black overflow-hidden shrink-0 border border-slate-700">
                        <img src={item.imageSrc} alt="" className="w-full h-full object-cover" />
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateConfig(prev => ({
                            ...prev,
                            gallery: prev.gallery.map(g => g.id === item.id ? { ...g, title: val } : g)
                          }));
                        }}
                        className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                      />
                      <label className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded cursor-pointer">
                        <Upload className="w-3.5 h-3.5 text-[#FFC928]" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (dataUrl) =>
                              updateConfig(prev => ({
                                ...prev,
                                gallery: prev.gallery.map(g => g.id === item.id ? { ...g, imageSrc: dataUrl } : g)
                              }))
                            )
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ABA CONTATOS */}
          {activeTab === 'contatos' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <p>
                  Conforme solicitado, não inventamos números fictícios. Preencha seu WhatsApp e canais oficiais abaixo para ativá-los em todos os botões do site.
                </p>
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span className="text-xs font-bold text-white uppercase">WhatsApp Oficial</span>
                  </div>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.contact.isWhatsappConfigured}
                      onChange={(e) =>
                        updateConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, isWhatsappConfigured: e.target.checked }
                        }))
                      }
                      className="rounded bg-slate-800 text-[#25D366] focus:ring-[#25D366]"
                    />
                    <span className="text-slate-300">Ativar no site</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Número com código do país e DDD (somente dígitos):
                  </label>
                  <input
                    type="text"
                    value={config.contact.whatsappNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      updateConfig(prev => ({
                        ...prev,
                        contact: {
                          ...prev.contact,
                          whatsappNumber: val,
                          isWhatsappConfigured: val.length >= 10
                        }
                      }));
                    }}
                    placeholder="Ex: 5511999998888"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Formato de exibição visual:
                  </label>
                  <input
                    type="text"
                    value={config.contact.whatsappFormatted}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, whatsappFormatted: e.target.value }
                      }))
                    }
                    placeholder="Ex: (11) 99999-8888"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

              {/* Telefone Fixo */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#FFC928]" />
                    <span className="text-xs font-bold text-white uppercase">Telefone</span>
                  </div>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.contact.isPhoneConfigured}
                      onChange={(e) =>
                        updateConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, isPhoneConfigured: e.target.checked }
                        }))
                      }
                      className="rounded bg-slate-800 text-[#FFC928]"
                    />
                    <span className="text-slate-300">Exibir</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={config.contact.phoneFormatted}
                  onChange={(e) =>
                    updateConfig(prev => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        phoneFormatted: e.target.value,
                        phoneNumber: e.target.value.replace(/\D/g, '')
                      }
                    }))
                  }
                  placeholder="(DDD) 0000-0000"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              {/* E-mail */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#FFC928]" />
                    <span className="text-xs font-bold text-white uppercase">E-mail Comercial</span>
                  </div>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.contact.isEmailConfigured}
                      onChange={(e) =>
                        updateConfig(prev => ({
                          ...prev,
                          contact: { ...prev.contact, isEmailConfigured: e.target.checked }
                        }))
                      }
                      className="rounded bg-slate-800 text-[#FFC928]"
                    />
                    <span className="text-slate-300">Exibir</span>
                  </label>
                </div>
                <input
                  type="email"
                  value={config.contact.email}
                  onChange={(e) =>
                    updateConfig(prev => ({
                      ...prev,
                      contact: {
                        ...prev.contact,
                        email: e.target.value
                      }
                    }))
                  }
                  placeholder="contato@dgclimatizacao.com.br"
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              {/* Cidade / Região */}
              <div className="p-4 rounded-xl bg-[#101820] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FFC928]" />
                  <span className="text-xs font-bold text-white uppercase">Cidade e Estado</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={config.contact.addressCity}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, addressCity: e.target.value }
                      }))
                    }
                    placeholder="Cidade"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                  <input
                    type="text"
                    value={config.contact.addressState}
                    onChange={(e) =>
                      updateConfig(prev => ({
                        ...prev,
                        contact: { ...prev.contact, addressState: e.target.value }
                      }))
                    }
                    placeholder="UF"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* ABA EXPORTAR */}
          {activeTab === 'exportar' && (
            <div className="space-y-5">
              {/* Card de Download Direto do ZIP do Projeto para o GitHub */}
              <div className="p-5 rounded-2xl bg-[#101820] border-2 border-[#FFC928]/40 shadow-xl space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFC928]/20 flex items-center justify-center text-[#FFC928]">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Baixar Projeto Pronto (.ZIP)</h4>
                    <span className="text-xs text-slate-400">Pacote limpo sem node_modules, ideal para o GitHub</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Baixe todos os arquivos do site da DG Climatização já com as fotos reais, configurações, componentes e manual README.
                </p>

                <a
                  href="/dg-climatizacao.zip"
                  download="dg-climatizacao.zip"
                  className="w-full py-3 px-4 text-xs font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FFC928]/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar dg-climatizacao.zip (5.1 MB)</span>
                </a>
              </div>

              <p className="text-xs text-slate-400">
                Ou copie a configuração atual em formato JSON para salvar no arquivo <code>src/config/siteData.ts</code>:
              </p>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyConfigJson}
                  className="absolute top-2 right-2 px-3 py-1.5 text-xs font-semibold bg-[#FFC928] text-[#101820] rounded-md hover:bg-[#e5b21d] flex items-center gap-1.5 z-10"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? 'Copiado!' : 'Copiar JSON'}</span>
                </button>
                <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[10px] text-slate-300 overflow-x-auto max-h-96">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={resetConfig}
                  className="px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-800/40 rounded-lg flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar Padrões Iniciais</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Rodapé do Drawer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-[#101820] flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Alterações salvas automaticamente no navegador
          </span>
          <button
            type="button"
            onClick={() => setIsConfigDrawerOpen(false)}
            className="px-5 py-2 text-xs font-bold text-[#101820] bg-[#FFC928] hover:bg-[#e5b21d] rounded-xl"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  );
};
