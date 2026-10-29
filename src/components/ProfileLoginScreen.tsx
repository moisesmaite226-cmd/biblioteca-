import React, { useState } from 'react';
import { Student } from '../types/library';
import { db } from '../services/db';
import { Search, Plus, X } from 'lucide-react';

import { ThemeToggle } from './ThemeToggle';

interface ProfileLoginScreenProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onSelectLibrarianWithPin: () => void;
  onAddNewStudent: (data: { name: string; grade: string; avatar: string }) => void;
  currentTheme: 'warm-white' | 'parchment';
  onToggleTheme: (theme: 'warm-white' | 'parchment') => void;
}

export const ProfileLoginScreen: React.FC<ProfileLoginScreenProps> = ({
  students,
  onSelectStudent,
  onSelectLibrarianWithPin,
  onAddNewStudent,
  currentTheme,
  onToggleTheme,
}) => {
  const [selectedRole, setSelectedRole] = useState<'none' | 'librarian' | 'student'>('none');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('7º Ano A');

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.grade.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const handleLibrarianSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (db.verifyLibrarianPin(pinInput)) {
      setPinError(null);
      onSelectLibrarianWithPin();
    } else {
      setPinError('Senha de 4 dígitos incorreta. Tente novamente.');
      setPinInput('');
    }
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    onAddNewStudent({
      name: newStudentName.trim(),
      grade: newStudentGrade,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });

    setNewStudentName('');
    setIsNewStudentModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 py-12 relative">
      
      {/* Alternador de Tonalidade Visual no Topo */}
      <div className="fixed top-4 right-4 z-40">
        <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
      </div>

      {/* Caixa de Login Estilo Ex-Libris Clássico com Verde Oliva */}
      <div className="relative w-full max-w-[480px] bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.12)] p-8 sm:p-10 text-center animate-fade-in">
        
        {/* Moldura dupla interna */}
        <div className="absolute inset-2 border border-[#d4c9b2] pointer-events-none" />

        {/* Faixa superior tricolor dourado - verde oliva - dourado */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        {/* Brasão Circular da Escola em Verde Oliva */}
        <div className="relative z-10 w-16 h-16 mx-auto mb-3.5 rounded-full bg-[#ede6d6] border-2 border-[#b89155] grid place-items-center font-serif-vintage italic text-xl text-[#556b2f] shadow-[inset_0_0_0_4px_#fcf8ef]">
          CUP
        </div>

        {/* Tag Ex Libris */}
        <div className="relative z-10 font-sans-custom text-[10px] tracking-[0.4em] uppercase text-[#8f6f3e] mb-3 pb-2.5 border-b border-[#d4c9b2]">
          Ex Libris
        </div>

        {/* Marca da Biblioteca */}
        <div className="relative z-10 font-serif-vintage text-[1.45rem] leading-snug font-normal text-[#1c1712] mb-1">
          Biblioteca do
          <em className="block text-[#556b2f] text-[1.75rem] not-italic font-medium font-serif-vintage mt-0.5">
            Colégio Unidade Polo
          </em>
        </div>

        <div className="relative z-10 font-serif-vintage italic text-[#877b69] text-xs mb-4">
          — entre para continuar —
        </div>

        {/* Ornamento Clássico com Traços */}
        <div className="relative z-10 flex items-center gap-3 my-4 text-[#b89155] text-xs tracking-[0.35em]">
          <div className="flex-1 h-px bg-[#d4c9b2]" />
          <span>✦ ✦ ✦</span>
          <div className="flex-1 h-px bg-[#d4c9b2]" />
        </div>

        {/* ESTADO 1: Seleção Inicial de Perfil */}
        {selectedRole === 'none' && (
          <div className="relative z-10">
            <div className="grid grid-cols-2 gap-3 mb-4">
              
              {/* Card Bibliotecária */}
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('librarian');
                  setPinError(null);
                  setPinInput('');
                }}
                className="group p-5 bg-[#f6f1e8] border border-[#d4c9b2] hover:bg-[#edf3e4] hover:border-[#556b2f] transition-all text-center relative cursor-pointer"
              >
                <span className="font-serif-vintage text-2xl text-[#556b2f] block mb-1.5 italic group-hover:scale-110 transition-transform">
                  ❦
                </span>
                <h3 className="font-serif-vintage font-normal text-base text-[#1c1712] mb-0.5">
                  Bibliotecária
                </h3>
                <small className="text-[#877b69] text-[11px] block font-sans-custom">
                  Administração & Estoque
                </small>
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-transparent group-hover:bg-[#556b2f] transition-colors" />
              </button>

              {/* Card Aluno */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className="group p-5 bg-[#f6f1e8] border border-[#d4c9b2] hover:bg-[#edf3e4] hover:border-[#556b2f] transition-all text-center relative cursor-pointer"
              >
                <span className="font-serif-vintage text-2xl text-[#556b2f] block mb-1.5 italic group-hover:scale-110 transition-transform">
                  ✦
                </span>
                <h3 className="font-serif-vintage font-normal text-base text-[#1c1712] mb-0.5">
                  Aluno(a)
                </h3>
                <small className="text-[#877b69] text-[11px] block font-sans-custom">
                  Consulta & Empréstimos
                </small>
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-transparent group-hover:bg-[#556b2f] transition-colors" />
              </button>

            </div>

            <p className="text-[11px] text-[#877b69] font-serif-vintage italic">
              Selecione sua função para acessar o acervo da escola.
            </p>
          </div>
        )}

        {/* ESTADO 2: Login da Bibliotecária (PIN 4 dígitos) */}
        {selectedRole === 'librarian' && (
          <div className="relative z-10 animate-fade-in max-w-[300px] mx-auto text-left">
            <form onSubmit={handleLibrarianSubmit}>
              <label className="block font-serif-vintage italic text-xs text-[#877b69] mb-1">
                Digite a senha da Bibliotecária (4 dígitos):
              </label>

              <input
                type="password"
                maxLength={4}
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value.replace(/\D/g, ''));
                  setPinError(null);
                }}
                placeholder="••••"
                className="w-full p-3 bg-[#f6f1e8] border border-[#d4c9b2] font-mono text-center text-lg tracking-[0.3em] text-[#1c1712] focus:outline-none focus:border-[#556b2f] focus:bg-[#fcf8ef] mb-2"
              />

              {pinError && (
                <div className="bg-[#f8e5df] border border-[#a8563c] text-[#a8563c] font-serif-vintage italic text-xs p-2 mb-2 text-center">
                  {pinError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-[0.15em] uppercase transition-colors cursor-pointer font-semibold shadow-xs"
              >
                Entrar no Painel
              </button>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setPinInput(db.getLibrarianPin());
                    onSelectLibrarianWithPin();
                  }}
                  className="text-[11px] font-serif-vintage italic text-[#8f6f3e] hover:underline"
                >
                  Dica de Teste: Usar senha padrão <strong>1234</strong>
                </button>
              </div>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => setSelectedRole('none')}
                  className="text-xs font-serif-vintage text-[#877b69] hover:text-[#a8563c] transition-colors"
                >
                  ← Voltar aos perfis
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ESTADO 3: Seleção do Aluno Leitor */}
        {selectedRole === 'student' && (
          <div className="relative z-10 animate-fade-in text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif-vintage text-xs text-[#1c1712]">
                Selecione o seu nome de leitor:
              </span>
              <button
                onClick={() => setIsNewStudentModalOpen(true)}
                className="text-[11px] font-bold text-[#556b2f] hover:text-[#3c4d1f] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Novo Aluno</span>
              </button>
            </div>

            {/* Busca Rápida de Aluno */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#877b69]" />
              <input
                type="text"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Filtrar por nome ou turma..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f6f1e8] border border-[#d4c9b2] text-[#1c1712] placeholder-[#877b69] focus:outline-none focus:border-[#556b2f]"
              />
            </div>

            {/* Lista Rolável de Alunos com Verde Oliva */}
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1 mb-3">
              {filteredStudents.map((stud) => {
                const isBlocked = stud.isBlocked || stud.responsibilityPoints <= 0;
                return (
                  <div
                    key={stud.id}
                    onClick={() => onSelectStudent(stud)}
                    className="p-2.5 bg-[#f6f1e8] hover:bg-[#edf3e4] border border-[#d4c9b2] hover:border-[#556b2f] transition-all cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#556b2f] text-[#fcf8ef] border border-[#b89155] grid place-items-center font-serif-vintage text-xs font-bold shrink-0">
                        {stud.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-serif-vintage text-sm font-semibold text-[#1c1712] group-hover:text-[#556b2f] transition-colors leading-tight">
                          {stud.name}
                        </div>
                        <div className="text-[10px] text-[#877b69] font-sans-custom mt-0.5">
                          {stud.grade} • {stud.booksReadCount} livros lidos
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isBlocked
                            ? 'bg-[#f8e5df] text-[#a8563c] border border-[#a8563c]/30'
                            : stud.responsibilityPoints < 100
                            ? 'bg-[#fff5e6] text-[#b89155] border border-[#b89155]/30'
                            : 'bg-[#edf3e4] text-[#556b2f] border border-[#c2d2b0]'
                        }`}
                      >
                        {stud.responsibilityPoints} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-2 border-t border-[#d4c9b2]">
              <button
                type="button"
                onClick={() => setSelectedRole('none')}
                className="text-xs font-serif-vintage text-[#877b69] hover:text-[#a8563c] transition-colors"
              >
                ← Voltar aos perfis
              </button>
            </div>
          </div>
        )}

        {/* Rodapé do Card com Controle de Tonalidade */}
        <div className="relative z-10 mt-6 pt-3.5 border-t border-[#d4c9b2]/60 flex items-center justify-between text-[10px] text-[#7a6f5e] font-sans-custom">
          <span>Tonalidade de leitura:</span>
          <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} compact />
        </div>

      </div>

      {/* Modal: Cadastrar Novo Aluno */}
      {isNewStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1712]/50 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-[#fcf8ef] border border-[#d4c9b2] shadow-[0_4px_28px_rgba(28,23,18,0.15)] p-6">
            <div className="absolute inset-2 border border-[#d4c9b2] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

            <button
              onClick={() => setIsNewStudentModalOpen(false)}
              className="absolute top-3 right-3 text-[#877b69] hover:text-[#a8563c] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 text-center pb-3">
              <h3 className="font-serif-vintage text-base font-normal text-[#1c1712]">
                Cadastrar Leitor
              </h3>
              <p className="font-serif-vintage italic text-xs text-[#877b69]">
                Matrícula de aluno na biblioteca escolar
              </p>
            </div>

            <form onSubmit={handleCreateStudent} className="relative z-10 space-y-3">
              <div>
                <label className="block font-serif-vintage italic text-xs text-[#877b69] mb-1">
                  Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ex: Helena Duarte"
                  className="w-full px-3 py-1.5 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
                />
              </div>

              <div>
                <label className="block font-serif-vintage italic text-xs text-[#877b69] mb-1">
                  Turma:
                </label>
                <select
                  value={newStudentGrade}
                  onChange={(e) => setNewStudentGrade(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#f6f1e8] border border-[#d4c9b2] text-xs text-[#1c1712] focus:outline-none focus:border-[#556b2f]"
                >
                  <option value="6º Ano A">6º Ano A</option>
                  <option value="6º Ano B">6º Ano B</option>
                  <option value="7º Ano A">7º Ano A</option>
                  <option value="7º Ano B">7º Ano B</option>
                  <option value="8º Ano A">8º Ano A</option>
                  <option value="8º Ano B">8º Ano B</option>
                  <option value="9º Ano A">9º Ano A</option>
                  <option value="1º Ano EM">1º Ano Ensino Médio</option>
                  <option value="2º Ano EM">2º Ano Ensino Médio</option>
                  <option value="3º Ano EM">3º Ano Ensino Médio</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewStudentModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-serif-vintage text-[#877b69] hover:text-[#1c1712]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-[0.1em] uppercase cursor-pointer"
                >
                  Concluir Matrícula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
