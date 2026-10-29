import React, { useState } from 'react';
import { Book, Loan, Student } from '../../types/library';
import {
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Plus,
  Search,
  Database,
  UserPlus,
} from 'lucide-react';

interface InventoryManagerProps {
  books: Book[];
  loans: Loan[];
  students: Student[];
  onOpenExpressAdd: () => void;
  onOpenNewLoan: () => void;
  onOpenNewReader?: () => void;
  onReturnLoan: (loanId: string) => void;
  onRenewLoan: (loanId: string) => void;
  onOpenDatabaseModal: () => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  books,
  loans,
  students,
  onOpenExpressAdd,
  onOpenNewLoan,
  onOpenNewReader,
  onReturnLoan,
  onRenewLoan,
  onOpenDatabaseModal,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'overdue' | 'active' | 'returned'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // KPIs
  const totalBooksCount = books.length;
  const totalCopies = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopies = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const activeLoans = loans.filter((l) => l.status === 'active' || l.status === 'overdue');
  const overdueLoans = loans.filter((l) => l.status === 'overdue');

  // Filtragem
  const filteredLoans = loans.filter((loan) => {
    if (activeTab === 'overdue' && loan.status !== 'overdue') return false;
    if (activeTab === 'active' && loan.status !== 'active') return false;
    if (activeTab === 'returned' && loan.status !== 'returned') return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        loan.bookTitle.toLowerCase().includes(q) ||
        loan.studentName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">

      {/* --- STATS GRID NO ESTILO EXATO DA REFERÊNCIA --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-[#d4c9b2] bg-[#fcf8ef]">
        
        {/* Total de Títulos */}
        <div className="p-5 md:p-6 border-r border-[#d4c9b2]">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#877b69] font-bold block mb-2 font-sans-custom">
            Total de Títulos
          </span>
          <div className="font-serif-vintage text-3xl font-normal text-[#1c1712]">
            {totalBooksCount.toLocaleString('pt-BR')}
          </div>
          <small className="font-serif-vintage italic text-xs text-[#877b69] block mt-1">
            {totalCopies.toLocaleString('pt-BR')} exemplares físicos
          </small>
        </div>

        {/* Disponíveis */}
        <div className="p-5 md:p-6 border-r border-[#d4c9b2]">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#877b69] font-bold block mb-2 font-sans-custom">
            Disponíveis
          </span>
          <div className="font-serif-vintage text-3xl font-normal text-[#556b2f]">
            {availableCopies.toLocaleString('pt-BR')}
          </div>
          <small className="font-serif-vintage italic text-xs text-[#877b69] block mt-1">
            Prontos para empréstimo
          </small>
        </div>

        {/* Empréstimos Ativos */}
        <div className="p-5 md:p-6 border-r border-[#d4c9b2]">
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#877b69] font-bold block mb-2 font-sans-custom">
            Em Circulação
          </span>
          <div className="font-serif-vintage text-3xl font-normal text-[#1c1712]">
            {activeLoans.length}
          </div>
          <small className="font-serif-vintage italic text-xs text-[#877b69] block mt-1">
            Em mãos de alunos
          </small>
        </div>

        {/* Em Atraso */}
        <div className={`p-5 md:p-6 ${overdueLoans.length > 0 ? 'bg-[#f8e5df]/40' : ''}`}>
          <span className="text-[10px] tracking-[0.22em] uppercase text-[#877b69] font-bold block mb-2 font-sans-custom">
            Em Atraso
          </span>
          <div className={`font-serif-vintage text-3xl font-normal ${overdueLoans.length > 0 ? 'text-[#a8563c]' : 'text-[#1c1712]'}`}>
            {overdueLoans.length}
          </div>
          <small className="font-serif-vintage italic text-xs text-[#877b69] block mt-1">
            {overdueLoans.length > 0 ? 'Aguardando devolução' : 'Nenhum atraso'}
          </small>
        </div>

      </div>

      {/* --- BARRA DE GESTÃO DO BALCÃO --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#fcf8ef] border border-[#d4c9b2]">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenExpressAdd}
            className="px-3.5 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Cadastrar Livro Expresso</span>
          </button>

          <button
            onClick={onOpenNewLoan}
            className="px-3.5 py-2 bg-[#1c1712] hover:bg-stone-800 text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#b89155]" />
            <span>+ Novo Empréstimo no Balcão</span>
          </button>

          {onOpenNewReader && (
            <button
              onClick={onOpenNewReader}
              className="px-3.5 py-2 bg-[#f6f1e8] hover:bg-[#ede6d6] border border-[#d4c9b2] text-[#556b2f] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#556b2f]" />
              <span>+ Cadastrar Leitor</span>
            </button>
          )}
        </div>

        <button
          onClick={onOpenDatabaseModal}
          className="px-3 py-2 bg-[#f6f1e8] border border-[#d4c9b2] hover:bg-[#ede6d6] text-[#1c1712] font-serif-vintage text-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5 text-[#556b2f]" />
          <span>Banco de Dados ({totalBooksCount} livros)</span>
        </button>
      </div>

      {/* --- TABELA DE CONTROLE DE EMPRÉSTIMOS --- */}
      <div className="p-6 bg-[#fcf8ef] border border-[#d4c9b2]">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#d4c9b2]">
          <div>
            <h3 className="font-serif-vintage text-lg font-normal text-[#1c1712]">
              Registro de Circulação & Empréstimos
            </h3>
            <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
              Controle de prazos, devoluções e pontos de responsabilidade
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center border border-[#d4c9b2] bg-[#f6f1e8] p-0.5 text-xs font-serif-vintage">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 transition-colors ${
                  activeTab === 'all' ? 'bg-[#556b2f] text-[#fcf8ef]' : 'text-[#877b69] hover:text-[#1c1712]'
                }`}
              >
                Todos ({loans.length})
              </button>
              <button
                onClick={() => setActiveTab('overdue')}
                className={`px-2.5 py-1 transition-colors ${
                  activeTab === 'overdue' ? 'bg-[#a8563c] text-[#fcf8ef]' : 'text-[#877b69] hover:text-[#1c1712]'
                }`}
              >
                Atrasados ({overdueLoans.length})
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-2.5 py-1 transition-colors ${
                  activeTab === 'active' ? 'bg-[#556b2f] text-[#fcf8ef]' : 'text-[#877b69] hover:text-[#1c1712]'
                }`}
              >
                No Prazo
              </button>
              <button
                onClick={() => setActiveTab('returned')}
                className={`px-2.5 py-1 transition-colors ${
                  activeTab === 'returned' ? 'bg-[#556b2f] text-[#fcf8ef]' : 'text-[#877b69] hover:text-[#1c1712]'
                }`}
              >
                Devolvidos
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#877b69]" />
              <input
                type="text"
                placeholder="Buscar livro ou aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-7 pr-2.5 py-1 text-xs bg-[#f6f1e8] border border-[#d4c9b2] text-[#1c1712] focus:outline-none focus:border-[#556b2f] w-40"
              />
            </div>
          </div>
        </div>

        {/* Tabela */}
        {filteredLoans.length === 0 ? (
          <div className="py-10 text-center font-serif-vintage italic text-xs text-[#877b69]">
            Nenhum empréstimo encontrado para os critérios selecionados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#d4c9b2] text-[10px] font-bold uppercase tracking-wider text-[#877b69] font-sans-custom">
                  <th className="py-2.5 px-3">Livro</th>
                  <th className="py-2.5 px-3">Aluno</th>
                  <th className="py-2.5 px-3">Data Empréstimo</th>
                  <th className="py-2.5 px-3">Prazo Devolução</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4c9b2]/60 text-xs font-serif-vintage">
                {filteredLoans.map((loan) => {
                  const isReturned = loan.status === 'returned';
                  const isOverdue = loan.status === 'overdue';

                  return (
                    <tr key={loan.id} className="hover:bg-[#ede6d6]/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={loan.bookCover}
                            alt={loan.bookTitle}
                            className="w-7 h-10 object-cover border border-[#d4c9b2] shrink-0"
                          />
                          <div>
                            <span className="font-semibold text-[#1c1712] block max-w-[200px] truncate">
                              {loan.bookTitle}
                            </span>
                            <span className="text-[10px] text-[#877b69] font-sans-custom">
                              ID: {loan.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-[#1c1712]">
                        {loan.studentName}
                      </td>

                      <td className="py-3 px-3 text-[#877b69]">
                        {new Date(loan.loanDate).toLocaleDateString('pt-BR')}
                      </td>

                      <td className="py-3 px-3 font-semibold">
                        <span className={isOverdue ? 'text-[#a8563c]' : 'text-[#1c1712]'}>
                          {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        {isReturned ? (
                          <span className="text-[10px] text-[#877b69] bg-[#ede6d6] px-2 py-0.5">
                            Devolvido
                          </span>
                        ) : isOverdue ? (
                          <span className="text-[10px] font-bold text-[#a8563c] bg-[#f8e5df] border border-[#a8563c]/30 px-2 py-0.5">
                            Atrasado ({loan.daysOverdue}d)
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#556b2f] bg-[#edf3e4] border border-[#c2d2b0] px-2 py-0.5">
                            No Prazo
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right">
                        {!isReturned ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onReturnLoan(loan.id)}
                              className="px-2.5 py-1 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] text-[11px] tracking-wider uppercase cursor-pointer"
                              title="Registrar devolução e creditar pontos de responsabilidade"
                            >
                              Devolver
                            </button>
                            <button
                              onClick={() => onRenewLoan(loan.id)}
                              className="px-2 py-1 bg-[#f6f1e8] hover:bg-[#ede6d6] border border-[#d4c9b2] text-[#1c1712] text-[11px] cursor-pointer"
                              title="Renovar por mais 7 dias"
                            >
                              +7d
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[#877b69] italic">
                            Concluído
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
