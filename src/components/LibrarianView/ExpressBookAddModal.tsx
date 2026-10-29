import React, { useState, useEffect } from 'react';
import { Genre } from '../../types/library';
import { searchBookCoverOnline } from '../../services/db';
import { Search, Sparkles, Check, Loader2, Image as ImageIcon } from 'lucide-react';

interface ExpressBookAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAdded: (newBook: any) => void;
}

const GENRE_OPTIONS: Genre[] = [
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

export const ExpressBookAddModal: React.FC<ExpressBookAddModalProps> = ({
  isOpen,
  onClose,
  onBookAdded,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<Genre>('Literatura Brasileira');
  const [quantity, setQuantity] = useState<number>(3);
  const [synopsis, setSynopsis] = useState('');

  // Estado da Busca Automática de Capa
  const [coverUrl, setCoverUrl] = useState('');
  const [isSearchingCover, setIsSearchingCover] = useState(false);
  const [coverSource, setCoverSource] = useState<'google-books' | 'open-library' | 'fallback' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setAuthor('');
      setGenre('Literatura Brasileira');
      setQuantity(3);
      setSynopsis('');
      setCoverUrl('');
      setCoverSource(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!title.trim() || title.trim().length < 3) return;

    const timer = setTimeout(() => {
      handleSearchCover();
    }, 800);

    return () => clearTimeout(timer);
  }, [title, author]);

  const handleSearchCover = async () => {
    if (!title.trim()) return;
    setIsSearchingCover(true);
    try {
      const result = await searchBookCoverOnline(title, author);
      setCoverUrl(result.coverUrl);
      setCoverSource(result.source);
      if (result.foundSynopsis && !synopsis) {
        setSynopsis(result.foundSynopsis.slice(0, 240) + '...');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearchingCover(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    const newBook = {
      title,
      author,
      genre,
      totalCopies: quantity,
      synopsis,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    };

    onBookAdded(newBook);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] max-h-[92vh] flex flex-col">
        
        {/* Faixa superior tricolor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Cabeçalho */}
        <div className="p-6 pb-4 border-b border-[#d4c9b2] flex items-center justify-between">
          <div>
            <h2 className="font-serif-vintage text-xl font-normal text-[#1c1712]">
              Cadastro Expresso de Livro
            </h2>
            <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
              Alimentação ágil com busca automática de capa e dados via Google Books API
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#877b69] hover:text-[#a8563c] text-xl cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 font-serif-vintage">
          
          <div>
            <label className="block text-xs italic text-[#877b69] mb-1">
              Título da Obra:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dom Casmurro, Harry Potter..."
              className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
            />
          </div>

          <div>
            <label className="block text-xs italic text-[#877b69] mb-1">
              Autor(a):
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Machado de Assis, Clarice Lispector..."
              className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs italic text-[#877b69] mb-1">
                Gênero Literário:
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value as Genre)}
                className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
              >
                {GENRE_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs italic text-[#877b69] mb-1">
                Quantidade de Exemplares:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
              />
            </div>
          </div>

          {/* Pré-visualização da Capa Buscada Automaticamente */}
          <div className="p-3.5 bg-[#f6f1e8] border border-[#d4c9b2]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#8f6f3e] flex items-center gap-1.5 font-sans-custom uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#b89155]" />
                Busca Automática de Capa
              </span>

              <button
                type="button"
                onClick={handleSearchCover}
                disabled={isSearchingCover || !title.trim()}
                className="text-xs text-[#556b2f] hover:underline flex items-center gap-1 disabled:opacity-50 cursor-pointer"
              >
                {isSearchingCover ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Buscando...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-3 h-3" />
                    <span>Buscar Agora</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-14 h-20 bg-[#ede6d6] border border-[#d4c9b2] overflow-hidden shrink-0 flex items-center justify-center">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt="Pré-visualização da capa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-[#877b69]" />
                )}
              </div>

              <div className="text-xs text-[#877b69] font-serif-vintage italic">
                {isSearchingCover ? (
                  <p className="text-[#556b2f]">Consultando acervo do Google Books...</p>
                ) : coverUrl ? (
                  <div>
                    <span className="text-[#556b2f] font-bold block not-italic">
                      ✓ Capa oficial localizada!
                    </span>
                    <span className="text-[11px]">Fonte: {coverSource === 'google-books' ? 'Google Books API' : 'Catálogo Literário'}</span>
                  </div>
                ) : (
                  <p>Digite o título acima. A capa é identificada automaticamente na internet.</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs italic text-[#877b69] mb-1">
              Breve Sinopse:
            </label>
            <textarea
              rows={2}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="Resumo ou anotação para despertar o interesse dos alunos..."
              className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-serif-vintage text-[#877b69] hover:text-[#1c1712]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase cursor-pointer"
            >
              Salvar no Acervo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
