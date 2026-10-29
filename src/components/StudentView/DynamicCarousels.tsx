import React, { useRef } from 'react';
import { Book } from '../../types/library';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DynamicCarouselsProps {
  popularBooks: Book[];
  treasureBooks: Book[];
  onSelectBook: (book: Book) => void;
}

export const DynamicCarousels: React.FC<DynamicCarouselsProps> = ({
  popularBooks,
  treasureBooks,
  onSelectBook,
}) => {
  const popularRef = useRef<HTMLDivElement>(null);
  const treasureRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const offset = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 mb-12">

      {/* --- CARROSSEL 1: OS MAIS POPULARES --- */}
      <section>
        <div className="flex items-end justify-between mb-4 pb-2 border-b border-[#d4c9b2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-vintage italic text-base text-[#b89155]">🔥</span>
              <h2 className="text-xl sm:text-2xl font-serif-vintage font-normal text-[#1c1712]">
                Os Mais Populares · <em className="text-[#556b2f] italic">Mais Lidos</em>
              </h2>
            </div>
            <p className="text-xs text-[#877b69] font-serif-vintage italic mt-0.5">
              Obras com maior circulação e preferência entre os leitores da escola
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll(popularRef, 'left')}
              className="w-8 h-8 border border-[#d4c9b2] bg-[#fcf8ef] hover:bg-[#ede6d6] text-[#1c1712] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(popularRef, 'right')}
              className="w-8 h-8 border border-[#d4c9b2] bg-[#fcf8ef] hover:bg-[#ede6d6] text-[#1c1712] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={popularRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar scroll-smooth"
        >
          {popularBooks.map((book, index) => {
            const isAvailable = book.availableCopies > 0;
            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="w-52 shrink-0 snap-start bg-[#fcf8ef] border border-[#d4c9b2] hover:border-[#556b2f] transition-all cursor-pointer group flex flex-col overflow-hidden relative shadow-xs"
              >
                {/* Capa */}
                <div className="relative aspect-[3/4] bg-[#ede6d6] overflow-hidden border-b border-[#d4c9b2]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1c1712]/90 text-[#fcf8ef] px-1.5 py-0.5">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#556b2f]/95 text-[#fcf8ef] text-[10px] px-1.5 py-0.5 font-bold">
                    {book.loanCount} saídas
                  </div>
                </div>

                {/* Info Clássica */}
                <div className="p-3.5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#8f6f3e] block font-sans-custom">
                      {book.genre}
                    </span>
                    <h3 className="font-serif-vintage text-sm font-normal text-[#1c1712] line-clamp-1 mt-0.5 group-hover:text-[#556b2f] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-[#877b69] font-serif-vintage italic line-clamp-1">{book.author}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#d4c9b2] flex items-center justify-between text-[10px]">
                    <span className="text-[#877b69] truncate">{book.shelf}</span>
                    <span
                      className={`font-semibold px-1.5 py-0.2 ${
                        isAvailable
                          ? 'bg-[#edf3e4] text-[#556b2f]'
                          : 'bg-[#f8e5df] text-[#a8563c]'
                      }`}
                    >
                      {isAvailable ? `${book.availableCopies} disp.` : 'Emprestado'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CARROSSEL 2: TESOUROS ESCONDIDOS --- */}
      <section className="bg-[#ede6d6]/60 border border-[#d4c9b2] p-6 relative">
        <div className="flex items-end justify-between mb-4 pb-2 border-b border-[#d4c9b2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-vintage italic text-base text-[#556b2f]">✨</span>
              <h2 className="text-xl sm:text-2xl font-serif-vintage font-normal text-[#1c1712]">
                Tesouros Escondidos · <em className="text-[#8f6f3e] italic">Indicação da Semana</em>
              </h2>
            </div>
            <p className="text-xs text-[#877b69] font-serif-vintage italic mt-0.5">
              Livros incríveis que querem um leitor! Seja o descobridor destas joias literárias
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll(treasureRef, 'left')}
              className="w-8 h-8 border border-[#d4c9b2] bg-[#fcf8ef] hover:bg-[#ede6d6] text-[#1c1712] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll(treasureRef, 'right')}
              className="w-8 h-8 border border-[#d4c9b2] bg-[#fcf8ef] hover:bg-[#ede6d6] text-[#1c1712] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={treasureRef}
          className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x no-scrollbar scroll-smooth"
        >
          {treasureBooks.map((book) => {
            const isAvailable = book.availableCopies > 0;
            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="w-60 shrink-0 snap-start bg-[#fcf8ef] border border-[#d4c9b2] hover:border-[#556b2f] transition-all cursor-pointer group flex flex-col overflow-hidden shadow-xs relative"
              >
                {/* Tarja Clássica */}
                <div className="bg-[#f6f1e8] px-3 py-1 text-[9px] font-serif-vintage italic text-[#8f6f3e] border-b border-[#d4c9b2] truncate">
                  ✦ {book.treasureTagline || 'Aguardando um leitor na estante'}
                </div>

                <div className="p-3 flex gap-2.5">
                  <div className="w-16 aspect-[3/4] bg-[#ede6d6] overflow-hidden shrink-0 border border-[#d4c9b2]">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col justify-between overflow-hidden">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#556b2f]">
                        {book.genre}
                      </span>
                      <h3 className="font-serif-vintage text-xs font-normal text-[#1c1712] line-clamp-2 mt-0.5 leading-snug group-hover:text-[#556b2f] transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-[11px] text-[#877b69] font-serif-vintage italic truncate mt-0.5">{book.author}</p>
                    </div>

                    <div className="text-[10px] text-[#877b69] font-serif-vintage italic mt-1">
                      {book.pages} páginas
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 bg-[#f6f1e8] border-t border-[#d4c9b2] flex items-center justify-between text-[10px] mt-auto">
                  <span className="text-[#877b69]">{book.shelf}</span>
                  <span
                    className={`font-semibold px-1.5 py-0.2 ${
                      isAvailable ? 'text-[#556b2f]' : 'text-[#877b69]'
                    }`}
                  >
                    {isAvailable ? 'Disponível' : 'Em consulta'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
