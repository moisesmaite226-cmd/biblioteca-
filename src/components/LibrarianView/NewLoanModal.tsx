import React, { useState } from 'react';
import { Book, Student } from '../../types/library';
import { BookOpen, AlertTriangle } from 'lucide-react';

interface NewLoanModalProps {
  isOpen: boolean;
  books: Book[];
  students: Student[];
  onClose: () => void;
  onCreateLoan: (bookId: string, studentId: string, days: number) => void;
  onOpenNewReader?: () => void;
}

export const NewLoanModal: React.FC<NewLoanModalProps> = ({
  isOpen,
  books,
  students,
  onClose,
  onCreateLoan,
  onOpenNewReader,
}) => {
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [durationDays, setDurationDays] = useState(7);
  const [bookSearch, setBookSearch] = useState('');

  if (!isOpen) return null;

  const availableBooks = books.filter(
    (b) =>
      b.availableCopies > 0 &&
      (b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
        b.isbn.includes(bookSearch))
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId);
  const isStudentBlocked = selectedStudent?.isBlocked || (selectedStudent && selectedStudent.responsibilityPoints <= 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookId || !selectedStudentId) return;
    if (isStudentBlocked) return;

    onCreateLoan(selectedBookId, selectedStudentId, durationDays);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] max-h-[90vh] flex flex-col">
        
        {/* Faixa superior tricolor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Cabeçalho */}
        <div className="p-6 pb-4 border-b border-[#d4c9b2] flex items-center justify-between">
          <div>
            <h2 className="font-serif-vintage text-xl font-normal text-[#1c1712]">
              Registrar Empréstimo no Balcão
            </h2>
            <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
              Associação de exemplar ao leitor cadastrado
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
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs italic text-[#877b69]">
                Aluno(a) Solicitante:
              </label>
              {onOpenNewReader && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenNewReader();
                  }}
                  className="text-[10px] text-[#556b2f] hover:underline cursor-pointer font-serif-vintage italic"
                >
                  + Cadastrar Novo Leitor
                </button>
              )}
            </div>
            <select
              required
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
            >
              <option value="">Selecione um aluno leitor...</option>
              {students.map((stud) => (
                <option key={stud.id} value={stud.id}>
                  {stud.name} ({stud.grade}) — {stud.responsibilityPoints} pts {stud.isBlocked ? '⚠️ BLOQUEADO' : '✓'}
                </option>
              ))}
            </select>

            {isStudentBlocked && (
              <div className="mt-2 p-2 bg-[#f8e5df] border border-[#a8563c] text-xs text-[#a8563c] italic flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Aluno bloqueado: 0 pontos de responsabilidade por atraso anterior.</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs italic text-[#877b69] mb-1">
              Exemplar do Acervo:
            </label>
            <input
              type="text"
              placeholder="Filtrar livro por título..."
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              className="w-full mb-1.5 px-3 py-1.5 text-xs bg-[#f6f1e8] border border-[#d4c9b2] text-[#1c1712]"
            />
            <select
              required
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              size={5}
              className="w-full px-3 py-1 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
            >
              {availableBooks.slice(0, 50).map((b) => (
                <option key={b.id} value={b.id} className="py-1">
                  {b.title} — {b.author} ({b.availableCopies} disp. em {b.shelf})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs italic text-[#877b69] mb-1">
              Prazo para Devolução:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { days: 7, label: '7 dias (Padrão)' },
                { days: 14, label: '14 dias (Estendido)' },
                { days: 21, label: '21 dias (Férias)' },
              ].map((opt) => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setDurationDays(opt.days)}
                  className={`py-1.5 px-2 border transition-all ${
                    durationDays === opt.days
                      ? 'bg-[#556b2f] text-[#fcf8ef] border-[#556b2f] font-bold'
                      : 'bg-[#f6f1e8] text-[#4a3f33] border-[#d4c9b2]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-serif-vintage text-[#877b69] hover:text-[#1c1712]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!selectedBookId || !selectedStudentId || !!isStudentBlocked}
              className="px-4 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Confirmar Empréstimo
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
