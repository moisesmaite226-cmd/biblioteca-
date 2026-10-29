import React from 'react';
import { Book, Student } from '../../types/library';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  student: Student;
  onClose: () => void;
  onRequestLoan: (bookId: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  student,
  onClose,
  onRequestLoan,
}) => {
  if (!book) return null;

  const isAvailable = book.availableCopies > 0;
  const isBlocked = student.isBlocked || student.responsibilityPoints <= 0;
  const isTreasure = book.loanCount <= 4;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Faixa superior tricolor dourado - verde oliva - dourado */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Botão Fechar Clássico */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 text-[#877b69] hover:text-[#a8563c] text-xl transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Lado Esquerdo: Capa e Localização */}
        <div className="w-full md:w-5/12 bg-[#ede6d6] flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#d4c9b2] shrink-0">
          <div className="relative w-40 aspect-[3/4] border border-[#d4c9b2] shadow-md overflow-hidden bg-[#f6f1e8]">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full mt-4 bg-[#fcf8ef] p-3 border border-[#d4c9b2] text-center">
            <span className="text-[10px] font-sans-custom tracking-[0.2em] uppercase text-[#8f6f3e] block">
              Localização Física
            </span>
            <div className="font-serif-vintage text-base font-normal text-[#1c1712] mt-0.5">
              {book.shelf}
            </div>
            <span className="text-[11px] font-serif-vintage italic text-[#877b69]">
              Setor de {book.genre}
            </span>
          </div>
        </div>

        {/* Lado Direito: Fichamento e Empréstimo */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#556b2f] bg-[#edf3e4] border border-[#c2d2b0] px-2 py-0.5 font-sans-custom">
                {book.genre}
              </span>
              {isTreasure && (
                <span className="text-[9px] font-serif-vintage italic text-[#8f6f3e] bg-[#fff5e6] border border-[#b89155]/30 px-2 py-0.5 flex items-center gap-1">
                  ✦ Tesouro da Semana
                </span>
              )}
            </div>

            <h2 className="font-serif-vintage text-xl sm:text-2xl font-normal text-[#1c1712] mt-1 leading-snug">
              {book.title}
            </h2>
            <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
              Por {book.author}
            </p>

            {/* Metadados no estilo Ficha Catalográfica */}
            <div className="grid grid-cols-3 gap-2 my-4 py-2.5 border-y border-[#d4c9b2] text-center">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#877b69] block font-sans-custom">Ano</span>
                <span className="font-serif-vintage text-sm text-[#1c1712]">{book.publishedYear}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#877b69] block font-sans-custom">Páginas</span>
                <span className="font-serif-vintage text-sm text-[#1c1712]">{book.pages}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#877b69] block font-sans-custom">Circulação</span>
                <span className="font-serif-vintage text-sm text-[#1c1712]">{book.loanCount} saídas</span>
              </div>
            </div>

            {/* Resumo */}
            <div>
              <h3 className="font-sans-custom text-[10px] uppercase tracking-[0.2em] text-[#877b69] mb-1">
                Sobre a Obra
              </h3>
              <p className="font-serif-vintage italic text-xs text-[#4a3f33] leading-relaxed max-h-32 overflow-y-auto pr-1">
                {book.synopsis}
              </p>
            </div>
          </div>

          {/* Rodapé da Ficha */}
          <div className="mt-5 pt-4 border-t border-[#d4c9b2]">
            {isBlocked && (
              <div className="mb-3 p-2.5 bg-[#f8e5df] border border-[#a8563c] flex items-center gap-2 text-xs text-[#a8563c] font-serif-vintage italic">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  Empréstimo pausado: pontos zerados por atraso. Devolva seu exemplar anterior para reativar!
                </span>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#877b69] block font-sans-custom">Estoque na Biblioteca</span>
                <div className="font-serif-vintage text-sm text-[#1c1712]">
                  {book.availableCopies} de {book.totalCopies} exemplares disponíveis
                </div>
              </div>

              <button
                onClick={() => onRequestLoan(book.id)}
                disabled={!isAvailable || isBlocked}
                className="px-4 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAvailable ? 'Retirar Livro' : 'Esgotado'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
