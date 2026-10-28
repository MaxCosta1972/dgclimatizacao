import React, { useState, useEffect } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { GalleryItem } from '../config/siteData';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { resolveAssetUrl } from '../utils/assetUrl';

export const Gallery: React.FC = () => {
  const { config } = useSiteConfig();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os registros' },
    { id: 'higienizacao', label: 'Higienização profunda' },
    { id: 'preventiva', label: 'Manutenção preventiva' }
  ];

  const filteredItems = selectedCategory === 'todos'
    ? config.gallery
    : config.gallery.filter(item => item.category === selectedCategory);

  // Navegação por teclado no lightbox
  useEffect(() => {
    if (!activeLightboxItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxItem(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxItem, filteredItems]);

  const handleNextImage = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!activeLightboxItem) return;
    const currentIndex = filteredItems.findIndex(i => i.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <section id="galeria" className="py-24 bg-[#0d141b] relative overflow-hidden border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção Conforme Requisito Exato */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <span>Galeria de Procedimentos</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Transparência Técnica</span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            NOSSO TRABALHO NA PRÁTICA.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            Fotografias reais dos nossos procedimentos de atendimento, demonstrando o zelo,
            o ferramental e o cuidado que dedicamos a cada equipamento.
          </p>
        </div>

        {/* Comparativo Antes e Depois com Controle Deslizante */}
        <BeforeAfterSlider />

        {/* Filtros da Galeria em Segmented Control Discreto */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#FFC928] text-[#101820] shadow-md shadow-[#FFC928]/10'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Editorial da Galeria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative bg-[#101820] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 cursor-pointer shadow-lg transition-all duration-200 hover:-translate-y-1 flex flex-col"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-950 relative">
                <img
                  src={resolveAssetUrl(item.imageSrc)}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />

                {/* Overlay de hover com ícone de expansão */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#101820]/90 border border-[#FFC928] flex items-center justify-center text-[#FFC928] shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#FFC928] transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Ampliar foto</span>
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal de Alta Resolução */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          {/* Botão de Fechar */}
          <button
            type="button"
            onClick={() => setActiveLightboxItem(null)}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-900/80 text-white hover:text-[#FFC928] border border-slate-700 transition-colors"
            aria-label="Fechar visualização"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botões de Navegação Anterior/Próximo */}
          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:text-[#FFC928] border border-slate-700 transition-colors hidden sm:flex"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 text-white hover:text-[#FFC928] border border-slate-700 transition-colors hidden sm:flex"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Conteúdo Central */}
          <div
            className="relative max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] w-full rounded-2xl overflow-hidden border border-slate-800 bg-black flex items-center justify-center shadow-2xl">
              <img
                src={resolveAssetUrl(activeLightboxItem.imageSrc)}
                alt={activeLightboxItem.alt}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Legenda Informativa */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center max-w-2xl w-full">
              <h3 className="text-base font-bold text-white mb-1">
                {activeLightboxItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeLightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
