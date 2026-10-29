import React from 'react';
import { Student, SchoolGoal } from '../../types/library';
import { SYSTEM_BADGES } from '../../data/catalogGenerator';
import { ChevronRight, Sparkles } from 'lucide-react';

interface GamificationBarProps {
  student: Student;
  schoolGoal: SchoolGoal;
  onOpenProfile: () => void;
}

export const GamificationBar: React.FC<GamificationBarProps> = ({
  student,
  schoolGoal,
  onOpenProfile,
}) => {
  const percentageGoal = Math.min(
    100,
    Math.round((schoolGoal.currentBooksRead / schoolGoal.targetBooks) * 100)
  );

  let responsibilityTheme = {
    badgeColor: 'bg-[#edf3e4] text-[#556b2f] border border-[#c2d2b0]',
    barColor: 'bg-[#556b2f]',
    label: 'Pontual',
    description: 'Pontuação exemplar! Empréstimos liberados.',
  };

  if (student.responsibilityPoints === 0 || student.isBlocked) {
    responsibilityTheme = {
      badgeColor: 'bg-[#f8e5df] text-[#a8563c] border border-[#a8563c]/30',
      barColor: 'bg-[#a8563c]',
      label: 'Bloqueado',
      description: 'Devolva seu livro para restabelecer os pontos.',
    };
  } else if (student.responsibilityPoints < 70) {
    responsibilityTheme = {
      badgeColor: 'bg-[#fff5e6] text-[#b89155] border border-[#b89155]/30',
      barColor: 'bg-[#b89155]',
      label: 'Atenção',
      description: 'Devolva no prazo para atingir 100 pontos.',
    };
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      
      {/* 1. Pontos de Responsabilidade do Aluno */}
      <div className="bg-[#fcf8ef] border border-[#d4c9b2] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-sans-custom text-[10px] tracking-[0.25em] uppercase text-[#877b69] font-bold">
              Pontos de Responsabilidade
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 ${responsibilityTheme.badgeColor}`}
            >
              {responsibilityTheme.label}
            </span>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <div className="font-serif-vintage text-3xl font-normal text-[#1c1712]">
              {student.responsibilityPoints}
              <span className="text-sm font-serif-vintage italic text-[#877b69]"> / 100</span>
            </div>
            <span className="text-[11px] text-[#877b69] font-serif-vintage italic">
              -5pts/dia atraso • +10pts devolução
            </span>
          </div>

          <div className="w-full bg-[#ede6d6] h-1.5 mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${responsibilityTheme.barColor}`}
              style={{ width: `${student.responsibilityPoints}%` }}
            />
          </div>

          <p className="text-xs text-[#877b69] font-serif-vintage italic mt-2.5">
            {responsibilityTheme.description}
          </p>
        </div>

        <button
          onClick={onOpenProfile}
          className="mt-4 pt-3 border-t border-[#d4c9b2] flex items-center justify-between text-xs font-serif-vintage text-[#556b2f] hover:text-[#3c4d1f] transition-colors cursor-pointer"
        >
          <span>Consultar histórico de leituras</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Desafio da Escola (Meta Global 2026) */}
      <div className="bg-[#ede6d6] border border-[#d4c9b2] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-sans-custom text-[10px] tracking-[0.25em] uppercase text-[#8f6f3e] font-bold">
              Meta Anual {schoolGoal.year}
            </span>
            <span className="text-[10px] font-serif-vintage font-bold text-[#556b2f] bg-[#fcf8ef] border border-[#d4c9b2] px-2 py-0.5">
              {percentageGoal}% atingido
            </span>
          </div>

          <div className="mt-3">
            <div className="font-serif-vintage text-2xl font-normal text-[#1c1712]">
              {schoolGoal.currentBooksRead.toLocaleString('pt-BR')}
              <span className="text-xs font-serif-vintage italic text-[#877b69]"> de {schoolGoal.targetBooks} livros</span>
            </div>
            <p className="text-xs text-[#877b69] font-serif-vintage italic mt-1">
              "A leitura amplia horizontes na comunidade escolar."
            </p>
          </div>

          <div className="w-full bg-[#ddd3bf] h-1.5 mt-3 overflow-hidden">
            <div
              className="h-full bg-[#556b2f] transition-all duration-700"
              style={{ width: `${percentageGoal}%` }}
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#d4c9b2] flex items-center justify-between text-xs font-serif-vintage">
          <span className="text-[#877b69]">Turma Líder:</span>
          <span className="font-bold text-[#1c1712]">
            {schoolGoal.topClasses[0]?.grade || '7º Ano B'} ({schoolGoal.topClasses[0]?.booksRead} livros)
          </span>
        </div>
      </div>

      {/* 3. Conquistas & Medalhas do Aluno */}
      <div className="bg-[#fcf8ef] border border-[#d4c9b2] p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-sans-custom text-[10px] tracking-[0.25em] uppercase text-[#877b69] font-bold">
              Mural de Conquistas
            </span>
            <span className="text-[10px] font-bold text-[#b89155] bg-[#fff5e6] border border-[#b89155]/30 px-2 py-0.5">
              {student.booksReadCount} livros lidos
            </span>
          </div>

          <div className="mt-3">
            <div className="font-serif-vintage text-base font-normal text-[#1c1712]">
              {student.badges.length} de {SYSTEM_BADGES.length} Selos Conquistados
            </div>
            <p className="text-xs text-[#877b69] font-serif-vintage italic mt-0.5">
              Desbloqueie selos lendo clássicos e mantendo a pontualidade.
            </p>
          </div>

          {/* Mini prévia de selos clássicos em Verde Oliva */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {SYSTEM_BADGES.slice(0, 4).map((badge) => {
              const isUnlocked = student.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  title={`${badge.title}: ${badge.description}`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                    isUnlocked
                      ? 'bg-[#556b2f] text-[#fcf8ef] border-[#b89155]'
                      : 'bg-[#ede6d6] text-[#877b69] border-[#d4c9b2] opacity-40'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              );
            })}
            <div
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full border border-dashed border-[#d4c9b2] flex items-center justify-center text-[#877b69] hover:text-[#556b2f] hover:border-[#556b2f] transition-colors text-[10px] font-bold cursor-pointer"
              title="Ver todas as conquistas"
            >
              +{SYSTEM_BADGES.length - 4}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenProfile}
          className="mt-4 pt-3 border-t border-[#d4c9b2] flex items-center justify-between text-xs font-serif-vintage text-[#556b2f] hover:text-[#3c4d1f] transition-colors cursor-pointer"
        >
          <span>Abrir galeria de selos</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
