import React, { useState, useMemo } from 'react';
import { Book, Genre } from '../../types/library';
import { Search, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface CatalogExplorerProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const ALL_GENRES: (Genre | 'Todos')[] = [
  'Todos',
  'Literatura Brasileira',
  'Fantasia',
  'Ficção Científica',
  'Mistério',
  'Aventura',
  'Quadrinhos/Mangás',
  'Biografias',
  'Infantojuvenil',
  'Romance',
  'Poesia',
  'História & Sociedade',
];

export const CatalogExplorer: React.FC<CatalogExplorerProps> = ({ books, onSelectBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'Todos'>('Todos');
  const [sortBy, setSortBy] = useState<'popular' | 'treasures' | 'alpha' | 'available' | 'recent'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const filteredBooks = useMemo(() => {
    let result = books;

    if (selectedGenre !== 'Todos') {
      result = result.filter((b) => b.genre === selectedGenre);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q) ||
          b.isbn.includes(q)
      );
    }

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.loanCount - a.loanCount;
        case 'treasures':
          return a.loanCount - b.loanCount;
        case 'alpha':
          return a.title.localeCompare(b.title, 'pt-BR');
        case 'available':
          return b.availableCopies - a.availableCopies;
        case 'recent':
          return b.publishedYear - a.publishedYear;
        default:
          return 0;
      }
    });
  }, [books, selectedGenre, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const currentBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const handleGenreChange = (genre: Genre | 'Todos') => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <section id="catalogo-geral" className="mt-8">
      
      {/* Título da Seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 pb-3 border-b border-[#d4c9b2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-vintage italic text-lg text-[#556b2f]">✦</span>
            <h2 className="text-xl sm:text-2xl font-serif-vintage font-normal text-[#1c1712]">
              Fichamento Geral do Acervo · <em className="text-[#556b2f] italic">Obras Catalogadas</em>
            </h2>
          </div>
          <p className="text-xs text-[#877b69] font-serif-vintage italic mt-0.5">
            Consulta rápida e reserva de livros ({books.length.toLocaleString('pt-BR')} títulos catalogados)
          </p>
        </div>

        {/* Busca Rápida Clássica */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#877b69]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por título, autor..."
            className="w-full pl-9 pr-7 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] placeholder-[#877b69] focus:outline-none focus:border-[#556b2f] focus:bg-[#fcf8ef]"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#877b69] hover:text-[#a8563c] text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Gêneros em Abas Clássicas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#d4c9b2]">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {ALL_GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`shrink-0 px-3 py-1 text-xs font-serif-vintage transition-colors cursor-pointer border ${
                selectedGenre === genre
                  ? 'bg-[#556b2f] text-[#fcf8ef] border-[#556b2f] font-semibold'
                  : 'bg-[#fcf8ef] text-[#4a3f33] hover:bg-[#edf3e4] border-[#d4c9b2]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Ordenação */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <span className="text-[11px] text-[#877b69] font-serif-vintage italic">Ordem:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#fcf8ef] border border-[#d4c9b2] px-2 py-1 text-xs font-serif-vintage text-[#1c1712] focus:outline-none focus:border-[#556b2f] cursor-pointer"
          >
            <option value="popular">🔥 Mais Populares</option>
            <option value="treasures">✨ Tesouros Escondidos</option>
            <option value="alpha">🔤 Título (A-Z)</option>
            <option value="available">🟢 Exemplares Disponíveis</option>
            <option value="recent">📅 Ano de Publicação</option>
          </select>
        </div>
      </div>

      {/* Status da Busca */}
      <div className="flex items-center justify-between py-2.5 text-xs text-[#877b69] font-serif-vintage italic">
        <span>
          Listando <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'obra' : 'obras'}
          {selectedGenre !== 'Todos' && ` na seção de "${selectedGenre}"`}
        </span>
        <span>
          Página {currentPage} de {Math.max(1, totalPages)}
        </span>
      </div>

      {/* Grid de Livros Clássicos */}
      {currentBooks.length === 0 ? (
        <div className="bg-[#fcf8ef] border border-[#d4c9b2] p-10 text-center my-6">
          <BookOpen className="w-10 h-10 text-[#d4c9b2] mx-auto mb-2" />
          <h3 className="font-serif-vintage font-normal text-base text-[#1c1712]">Nenhum livro localizado</h3>
          <p className="text-xs text-[#877b69] font-serif-vintage italic mt-1">
            Tente pesquisar com outros termos ou altere a categoria literária.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 my-3">
          {currentBooks.map((book) => {
            const isAvailable = book.availableCopies > 0;
            const isTreasure = book.loanCount <= 4;
            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="bg-[#fcf8ef] border border-[#d4c9b2] hover:border-[#556b2f] transition-all cursor-pointer group flex flex-col overflow-hidden shadow-xs relative"
              >
                {/* Capa */}
                <div className="relative aspect-[3/4] bg-[#ede6d6] overflow-hidden border-b border-[#d4c9b2]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {isTreasure ? (
                    <div className="absolute top-2 left-2 bg-[#b89155] text-[#1c1712] text-[9px] font-bold px-1 py-0.2">
                      Tesouro
                    </div>
                  ) : null}

                  <div className="absolute bottom-1.5 right-1.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 ${
                        isAvailable
                          ? 'bg-[#556b2f] text-[#fcf8ef]'
                          : 'bg-[#a8563c] text-[#fcf8ef]'
                      }`}
                    >
                      {isAvailable ? `${book.availableCopies} disp.` : 'Esgotado'}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-2.5 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[#8f6f3e] block truncate font-sans-custom">
                      {book.genre}
                    </span>
                    <h3 className="font-serif-vintage text-xs font-normal text-[#1c1712] line-clamp-2 mt-0.5 group-hover:text-[#556b2f] transition-colors leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-[11px] text-[#877b69] font-serif-vintage italic truncate mt-0.5">
                      {book.author}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-[#d4c9b2] flex items-center justify-between text-[10px] text-[#877b69]">
                    <span className="truncate">{book.shelf}</span>
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paginação Clássica */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-8 mb-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#d4c9b2] bg-[#fcf8ef] text-[#1c1712] font-serif-vintage text-xs hover:bg-[#ede6d6] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 text-xs font-serif-vintage border transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#556b2f] text-[#fcf8ef] border-[#556b2f] font-bold'
                      : 'bg-[#fcf8ef] text-[#1c1712] hover:bg-[#ede6d6] border-[#d4c9b2]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#d4c9b2] bg-[#fcf8ef] text-[#1c1712] font-serif-vintage text-xs hover:bg-[#ede6d6] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <span>Próxima</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

    </section>
  );
};
