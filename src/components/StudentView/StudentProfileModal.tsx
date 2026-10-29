import React from 'react';
import { Student, Loan } from '../../types/library';
import { SYSTEM_BADGES } from '../../data/catalogGenerator';
import { ShieldCheck, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  student: Student;
  studentLoans: Loan[];
  onClose: () => void;
  onReturnLoan: (loanId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  student,
  studentLoans,
  onClose,
  onReturnLoan,
}) => {
  if (!isOpen) return null;

  const activeLoans = studentLoans.filter((l) => l.status !== 'returned');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.18)] max-h-[90vh] flex flex-col">
        
        {/* Faixa superior tricolor */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Ficha Header Estilo Ex-Libris */}
        <div className="p-6 md:p-8 bg-[#ede6d6] border-b border-[#d4c9b2] relative flex items-center gap-4">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-[#877b69] hover:text-[#a8563c] text-xl cursor-pointer"
          >
            ×
          </button>

          {/* Avatar Grande em Verde Oliva com borda Dourada */}
          <div className="w-16 h-16 rounded-full bg-[#556b2f] text-[#fcf8ef] grid place-items-center font-serif-vintage italic text-2xl border-2 border-[#b89155] shrink-0">
            {student.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-vintage text-2xl font-normal text-[#1c1712]">
                {student.name}
              </h2>
              <span className="font-serif-vintage text-xs bg-[#fcf8ef] text-[#556b2f] border border-[#d4c9b2] px-2 py-0.5 font-semibold">
                {student.grade}
              </span>
            </div>
            <p className="font-serif-vintage italic text-[#877b69] text-xs mt-0.5">
              Matrícula escolar ativa • Leitor registrado desde {new Date(student.joinedDate).toLocaleDateString('pt-BR')} • {student.booksReadCount} obras lidas
            </p>
          </div>
        </div>

        {/* Conteúdo com Ficha de Responsabilidade e Selos */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Resumo de Responsabilidade */}
          <div className="bg-[#f6f1e8] border border-[#d4c9b2] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ede6d6] border border-[#b89155] text-[#556b2f] grid place-items-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8f6f3e] block font-sans-custom">
                  Pontos de Responsabilidade
                </span>
                <div className="font-serif-vintage text-2xl font-normal text-[#1c1712]">
                  {student.responsibilityPoints} / 100 pontos
                </div>
                <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
                  Devolução no prazo confere +10 pontos. Atrasos reduzem 5 pontos por dia.
                </p>
              </div>
            </div>

            {student.isBlocked && (
              <span className="px-3 py-1 bg-[#f8e5df] border border-[#a8563c] text-[#a8563c] font-serif-vintage italic text-xs flex items-center gap-1.5 shrink-0">
                <AlertCircle className="w-4 h-4" />
                Novos empréstimos suspensos
              </span>
            )}
          </div>

          {/* Galeria de Selos */}
          <div>
            <div className="flex items-center justify-between mb-3 pb-1 border-b border-[#d4c9b2]">
              <h3 className="font-serif-vintage text-sm font-normal text-[#1c1712]">
                Selos Virtuais Conquistados
              </h3>
              <span className="text-xs font-serif-vintage italic text-[#877b69]">
                {student.badges.length} de {SYSTEM_BADGES.length} selos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {SYSTEM_BADGES.map((badge) => {
                const isUnlocked = student.badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3 border transition-all flex items-start gap-2.5 ${
                      isUnlocked
                        ? 'bg-[#fcf8ef] border-[#d4c9b2]'
                        : 'bg-[#ede6d6]/40 border-[#d4c9b2]/60 opacity-40'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                        isUnlocked
                          ? 'bg-[#556b2f] text-[#fcf8ef] border border-[#b89155]'
                          : 'bg-[#ede6d6] text-[#877b69] border-[#d4c9b2]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-serif-vintage text-xs font-semibold text-[#1c1712]">
                        {badge.title}
                      </h4>
                      <p className="font-serif-vintage italic text-[11px] text-[#877b69] mt-0.5 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Empréstimos Atuais com o Aluno */}
          <div>
            <h3 className="font-serif-vintage text-sm font-normal text-[#1c1712] mb-3 pb-1 border-b border-[#d4c9b2]">
              Obras Atualmente em Posse ({activeLoans.length})
            </h3>

            {activeLoans.length === 0 ? (
              <p className="font-serif-vintage italic text-xs text-[#877b69] bg-[#f6f1e8] p-4 border border-[#d4c9b2] text-center">
                Nenhum livro retirado no momento. Escolha uma obra no catálogo para iniciar uma leitura! 📖
              </p>
            ) : (
              <div className="space-y-2">
                {activeLoans.map((loan) => {
                  const isOverdue = loan.status === 'overdue';
                  return (
                    <div
                      key={loan.id}
                      className={`p-3 border flex items-center justify-between gap-4 ${
                        isOverdue
                          ? 'bg-[#f8e5df]/60 border-[#a8563c]/50'
                          : 'bg-[#f6f1e8] border-[#d4c9b2]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={loan.bookCover}
                          alt={loan.bookTitle}
                          className="w-8 h-12 object-cover border border-[#d4c9b2] shrink-0"
                        />
                        <div>
                          <h4 className="font-serif-vintage text-sm font-semibold text-[#1c1712]">
                            {loan.bookTitle}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-[#877b69] font-serif-vintage italic mt-0.5">
                            <Calendar className="w-3 h-3 text-[#b89155]" />
                            <span>
                              Prazo: {new Date(loan.dueDate).toLocaleDateString('pt-BR')}
                            </span>
                            {isOverdue && (
                              <span className="font-bold text-[#a8563c] not-italic">
                                ({loan.daysOverdue} dias de atraso)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onReturnLoan(loan.id)}
                        className="px-3 py-1.5 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                      >
                        Devolver Agora
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
