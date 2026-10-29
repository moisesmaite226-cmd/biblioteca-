import React from 'react';
import { Sun, BookOpen } from 'lucide-react';

interface ThemeToggleProps {
  currentTheme: 'warm-white' | 'parchment';
  onToggleTheme: (theme: 'warm-white' | 'parchment') => void;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  onToggleTheme,
  compact = false,
}) => {
  return (
    <div
      className={`inline-flex items-center p-0.5 border border-[#d4c9b2] bg-[#f6f1e8] text-xs font-serif-vintage shadow-xs ${
        compact ? 'text-[11px]' : ''
      }`}
      role="group"
      aria-label="Controle de Tonalidade Visual"
    >
      <button
        type="button"
        onClick={() => onToggleTheme('warm-white')}
        className={`flex items-center gap-1.5 px-2.5 py-1 transition-all cursor-pointer ${
          currentTheme === 'warm-white'
            ? 'bg-[#ffffff] text-[#556b2f] font-bold shadow-xs border border-[#e4ded4]'
            : 'text-[#7a6f5e] hover:text-[#1c1712]'
        }`}
        title="Branco Acolhedor: luminosidade suave balanceada para leitura prolongada, sem ofuscamento"
      >
        <Sun className="w-3.5 h-3.5 text-[#556b2f]" />
        <span>Branco Suave</span>
      </button>

      <button
        type="button"
        onClick={() => onToggleTheme('parchment')}
        className={`flex items-center gap-1.5 px-2.5 py-1 transition-all cursor-pointer ${
          currentTheme === 'parchment'
            ? 'bg-[#556b2f] text-[#fcf8ef] font-bold shadow-xs'
            : 'text-[#7a6f5e] hover:text-[#1c1712]'
        }`}
        title="Pergaminho Vintage: tom amadeirado clássico de páginas de livro antigo"
      >
        <BookOpen className="w-3.5 h-3.5 text-[#b89155]" />
        <span>Pergaminho</span>
      </button>
    </div>
  );
};
