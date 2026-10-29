import React from 'react';
import { Loan, Student } from '../../types/library';
import { Sparkles, Calendar, BookOpen, AlertTriangle, ArrowRight, Heart } from 'lucide-react';

interface FriendlyReminderAlertProps {
  student: Student;
  overdueLoans: Loan[];
  onReturnBook: (loanId: string) => void;
}

export const FriendlyReminderAlert: React.FC<FriendlyReminderAlertProps> = ({
  student,
  overdueLoans,
  onReturnBook,
}) => {
  if (overdueLoans.length === 0) return null;

  const firstOverdue = overdueLoans[0];
  const isZeroPoints = student.responsibilityPoints <= 0 || student.isBlocked;

  return (
    <div className="mb-6 p-6 bg-[#fcf8ef] border border-[#d4c9b2] border-l-4 border-l-[#a8563c] shadow-xs relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f8e5df] border border-[#a8563c]/40 flex items-center justify-center shrink-0 text-[#a8563c]">
            <Heart className="w-6 h-6 fill-[#a8563c]/20" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a8563c] bg-[#f8e5df] border border-[#a8563c]/30 px-2.5 py-0.5">
                Lembrete Afetuoso da Biblioteca
              </span>
              {isZeroPoints ? (
                <span className="text-[10px] font-bold text-[#a8563c] bg-[#f8e5df] px-2 py-0.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Bloqueio Temporário
                </span>
              ) : (
                <span className="text-xs font-serif-vintage italic text-[#877b69]">
                  Pontos de Responsabilidade: <strong className="text-[#1c1712] font-semibold">{student.responsibilityPoints}/100</strong>
                </span>
              )}
            </div>

            <h3 className="text-lg font-serif-vintage font-normal text-[#1c1712] mt-1.5">
              Seu livro está com saudades da prateleira! Que tal devolver hoje? 📚✨
            </h3>

            <p className="text-xs text-[#4a3f33] mt-1 max-w-2xl leading-relaxed font-sans-custom">
              Olá, <strong>{student.name}</strong>! O livro <span className="font-semibold italic text-[#1c1712]">"{firstOverdue.bookTitle}"</span> está atrasado há {firstOverdue.daysOverdue} dias. 
              {isZeroPoints ? (
                <span className="text-[#a8563c] font-medium"> Seus pontos chegaram a 0. Devolva o livro no balcão para recuperar pontos e desbloquear novos empréstimos!</span>
              ) : (
                <span> Cada dia de atraso reduz 5 pontos. Devolva-o para restaurar sua pontuação máxima!</span>
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-[11px] text-[#877b69]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#b89155]" />
                <span>Devolução prevista: {new Date(firstOverdue.dueDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#b89155]" />
                <span>Local: Balcão de Atendimento</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Devolução Rápida em Verde Oliva */}
        <div className="shrink-0 w-full md:w-auto">
          <button
            onClick={() => onReturnBook(firstOverdue.id)}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b89155]" />
            <span>Devolver & Recuperar Pontos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
