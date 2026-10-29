import React, { useState } from 'react';
import { Book } from '../../types/library';
import { db } from '../../services/db';
import { Download, RotateCcw, Key, Check, Copy, Database } from 'lucide-react';

interface SystemDatabaseModalProps {
  isOpen: boolean;
  books: Book[];
  onClose: () => void;
  onDatabaseReset: () => void;
}

export const SystemDatabaseModal: React.FC<SystemDatabaseModalProps> = ({
  isOpen,
  books,
  onClose,
  onDatabaseReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Estatísticas por Gênero
  const genreStats = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleExportJSON = () => {
    const jsonStr = db.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biblioescola-database-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    const jsonStr = db.exportDatabaseJSON();
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      db.changeLibrarianPin(newPin);
      setPinMessage('Senha de 4 dígitos alterada com sucesso!');
      setNewPin('');
      setTimeout(() => setPinMessage(null), 3000);
    } else {
      setPinMessage('A senha precisa ter exatamente 4 números.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] max-h-[90vh] flex flex-col font-serif-vintage">
        
        {/* Faixa superior tricolor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Cabeçalho */}
        <div className="p-6 pb-4 border-b border-[#d4c9b2] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-[#1c1712]">
              Banco de Dados & Configurações
            </h2>
            <p className="italic text-xs text-[#877b69] mt-0.5">
              Acervo de {books.length.toLocaleString('pt-BR')} obras catalogadas em estrutura JSON
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#877b69] hover:text-[#a8563c] text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Distribuição por Gêneros */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#877b69] font-sans-custom mb-2">
              Distribuição do Acervo por Gêneros Literários
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(genreStats).map(([genre, count]) => (
                <div
                  key={genre}
                  className="p-2.5 bg-[#f6f1e8] border border-[#d4c9b2] flex items-center justify-between text-xs"
                >
                  <span className="text-[#1c1712] truncate">{genre}</span>
                  <span className="font-bold text-[#556b2f] shrink-0">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Exportação & Cópia */}
          <div className="p-4 bg-[#f6f1e8] border border-[#d4c9b2]">
            <h3 className="text-xs uppercase tracking-wider text-[#877b69] font-sans-custom mb-1">
              Backup & Exportação do Catálogo
            </h3>
            <p className="italic text-xs text-[#877b69] mb-3">
              Exportação integral de acervo, alunos leitores, histórico e regras em arquivo JSON.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="px-3.5 py-1.5 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar JSON Completo</span>
              </button>

              <button
                onClick={handleCopyJSON}
                className="px-3 py-1.5 bg-[#fcf8ef] hover:bg-[#ede6d6] border border-[#d4c9b2] text-[#1c1712] text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#556b2f]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Texto JSON'}</span>
              </button>
            </div>
          </div>

          {/* Alterar Senha de 4 dígitos */}
          <div className="p-4 bg-[#ede6d6]/60 border border-[#d4c9b2]">
            <h3 className="text-xs uppercase tracking-wider text-[#8f6f3e] font-sans-custom mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#b89155]" />
              <span>Senha PIN da Bibliotecária</span>
            </h3>
            <p className="italic text-xs text-[#877b69] mb-2.5">
              Senha atual configurada: <strong>{db.getLibrarianPin()}</strong>
            </p>

            <form onSubmit={handleUpdatePin} className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Novo PIN (4 dígitos)"
                className="px-3 py-1.5 bg-[#fcf8ef] border border-[#d4c9b2] text-xs font-mono text-center tracking-widest text-[#1c1712] w-36"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#1c1712] hover:bg-stone-800 text-[#fcf8ef] text-xs tracking-wider uppercase cursor-pointer"
              >
                Salvar PIN
              </button>
            </form>
            {pinMessage && (
              <p className="text-xs text-[#556b2f] italic mt-1.5">
                {pinMessage}
              </p>
            )}
          </div>

          {/* Restaurar Padrão */}
          <div className="pt-2 border-t border-[#d4c9b2] flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#a8563c] block not-italic">
                Restaurar Banco de Dados
              </span>
              <span className="text-[11px] text-[#877b69] italic">
                Recarrega o acervo original de 1.050+ obras e os perfis iniciais
              </span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Deseja realmente restaurar os dados originais?')) {
                  onDatabaseReset();
                  onClose();
                }
              }}
              className="px-3 py-1.5 bg-[#f8e5df] hover:bg-[#ebd5cf] text-[#a8563c] border border-[#a8563c]/30 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Catálogo</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
