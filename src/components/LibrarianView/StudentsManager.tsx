import React, { useState } from 'react';
import { Student } from '../../types/library';
import { Users, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';

interface StudentsManagerProps {
  students: Student[];
  onUpdatePoints: (studentId: string, deltaPoints: number) => void;
  onOpenNewReaderModal?: () => void;
}

export const StudentsManager: React.FC<StudentsManagerProps> = ({
  students,
  onUpdatePoints,
  onOpenNewReaderModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fcf8ef] border border-[#d4c9b2] p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#d4c9b2]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif-vintage italic text-base text-[#556b2f]">✦</span>
            <h3 className="font-serif-vintage font-normal text-lg text-[#1c1712]">
              Fichas de Leitores & Pontos de Responsabilidade
            </h3>
          </div>
          <p className="font-serif-vintage italic text-xs text-[#877b69] mt-0.5">
            Acompanhamento pedagógico de circulação, devoluções e incentivos ({students.length} leitores matriculados)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onOpenNewReaderModal && (
            <button
              onClick={onOpenNewReaderModal}
              className="px-3.5 py-1.5 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Cadastrar Leitor</span>
            </button>
          )}

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar leitor por nome ou turma..."
            className="px-3 py-1.5 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] placeholder-[#877b69] focus:outline-none focus:border-[#556b2f] w-full sm:w-56"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#d4c9b2] text-[10px] font-bold uppercase tracking-wider text-[#877b69] font-sans-custom">
              <th className="py-2.5 px-3">Leitor(a)</th>
              <th className="py-2.5 px-3">Turma</th>
              <th className="py-2.5 px-3">Pontos de Responsabilidade</th>
              <th className="py-2.5 px-3">Leituras Concluídas</th>
              <th className="py-2.5 px-3">Situação</th>
              <th className="py-2.5 px-3 text-right">Incentivo Pedagógico</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#d4c9b2]/60 text-xs font-serif-vintage">
            {filteredStudents.map((stud) => {
              const isBlocked = stud.isBlocked || stud.responsibilityPoints <= 0;
              return (
                <tr key={stud.id} className="hover:bg-[#ede6d6]/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#556b2f] text-[#fcf8ef] border border-[#b89155] grid place-items-center text-xs font-bold shrink-0">
                        {stud.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-[#1c1712]">{stud.name}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[#4a3f33]">
                    {stud.grade}
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-[#ede6d6] h-1.5 overflow-hidden shrink-0">
                        <div
                          className={`h-full ${
                            stud.responsibilityPoints >= 80
                              ? 'bg-[#556b2f]'
                              : stud.responsibilityPoints > 30
                              ? 'bg-[#b89155]'
                              : 'bg-[#a8563c]'
                          }`}
                          style={{ width: `${stud.responsibilityPoints}%` }}
                        />
                      </div>
                      <span className="font-bold text-[#1c1712]">
                        {stud.responsibilityPoints}/100
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <span className="text-[#877b69]">
                      {stud.booksReadCount} livros
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    {isBlocked ? (
                      <span className="text-[10px] font-bold text-[#a8563c] bg-[#f8e5df] border border-[#a8563c]/30 px-2 py-0.5">
                        Bloqueado (0 pts)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#556b2f] bg-[#edf3e4] border border-[#c2d2b0] px-2 py-0.5">
                        Regular
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onUpdatePoints(stud.id, 10)}
                        className="px-2 py-1 bg-[#edf3e4] hover:bg-[#dbe6ce] text-[#556b2f] border border-[#c2d2b0] text-[10px] font-bold cursor-pointer"
                        title="Bonificar +10 pontos pedagógicos"
                      >
                        +10 pts
                      </button>
                      <button
                        onClick={() => onUpdatePoints(stud.id, -10)}
                        className="px-2 py-1 bg-[#f8e5df] hover:bg-[#ebd5cf] text-[#a8563c] border border-[#a8563c]/30 text-[10px] font-bold cursor-pointer"
                        title="Aplicar desconto de 10 pontos"
                      >
                        -10 pts
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
