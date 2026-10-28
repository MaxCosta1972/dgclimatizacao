import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';
import { useSiteConfig } from '../context/SiteConfigContext';
import { resolveAssetUrl } from '../utils/assetUrl';

export const BeforeAfterSlider: React.FC = () => {
  const { config } = useSiteConfig();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-[#101820] border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 mb-16 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Informações da Comparação */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FFC928] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comparativo Real de Eficiência</span>
          </div>

          <h3
            className="text-xl sm:text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {config.beforeAfter.title}
          </h3>

          <p className="text-sm font-medium text-[#FFC928]/90 mb-4">
            {config.beforeAfter.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            {config.beforeAfter.description}
          </p>

          {/* Dica de interação */}
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <MoveHorizontal className="w-4 h-4 text-[#FFC928] shrink-0" />
            <span>Arraste a linha divisória horizontalmente para comparar o resultado</span>
          </div>
        </div>

        {/* Visualizador Deslizante Interativo */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-700/80 select-none shadow-xl cursor-ew-resize touch-none"
          >
            {/* Imagem "Depois" (base completa) */}
            <img
              src={resolveAssetUrl(config.beforeAfter.afterImage)}
              alt={config.beforeAfter.afterAlt}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            {/* Rótulo "Depois" */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-[#101820]/90 backdrop-blur-md border border-emerald-500/40 text-[11px] font-bold text-emerald-300 tracking-wide">
              {config.beforeAfter.afterLabel}
            </div>

            {/* Imagem "Antes" (recortada pelo slider) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={resolveAssetUrl(config.beforeAfter.beforeImage)}
                alt={config.beforeAfter.beforeAlt}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%'
                }}
                loading="lazy"
              />
              {/* Rótulo "Antes" */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-[#101820]/90 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 tracking-wide">
                {config.beforeAfter.beforeLabel}
              </div>
            </div>

            {/* Linha Divisória e Alça Central */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#101820] border-2 border-white flex items-center justify-center text-white shadow-lg pointer-events-auto">
                <MoveHorizontal className="w-4 h-4 text-[#FFC928]" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
