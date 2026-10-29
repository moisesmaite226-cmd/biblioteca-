import React from 'react';
import { Student } from '../types/library';
import { BookOpen, ShieldCheck, UserCheck, Lock, LogOut, Sparkles, AlertCircle } from 'lucide-react';

interface NavbarProps {
  currentView: 'student' | 'librarian';
  onSelectView: (view: 'student' | 'librarian') => void;
  isLibrarianLoggedIn: boolean;
  onLibrarianLogout: () => void;
  activeStudent: Student;
  allStudents: Student[];
  onSelectActiveStudent: (studentId: string) => void;
  onOpenProfile: () => void;
  onSwitchProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  isLibrarianLoggedIn,
  onLibrarianLogout,
  activeStudent,
  allStudents,
  onSelectActiveStudent,
  onOpenProfile,
  onSwitchProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Nome da Escola (clicável para trocar de perfil ou início) */}
          <div
            onClick={onSwitchProfile}
            className="flex items-center gap-3 cursor-pointer group"
            title="Voltar para a tela de perfis"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-600/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900 font-serif">
                  Biblio<span className="text-amber-600">Escola</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                  Colégio Unidade Polo
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Biblioteca Escolar Viva & Comunitária
              </p>
            </div>
          </div>

          {/* Navegação Principal de Módulos */}
          <nav className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
            <button
              onClick={() => onSelectView('student')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'student'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4 text-amber-600" />
              <span>Espaço do Aluno</span>
            </button>

            <button
              onClick={() => onSelectView('librarian')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentView === 'librarian'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isLibrarianLoggedIn ? (
                <ShieldCheck className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-stone-400" />
              )}
              <span>Painel da Bibliotecária</span>
              {!isLibrarianLoggedIn && (
                <span className="text-[10px] bg-stone-200 text-stone-700 px-1.5 py-0.2 rounded font-mono">
                  PIN 4d
                </span>
              )}
            </button>
          </nav>

          {/* Ações da Direita */}
          <div className="flex items-center gap-3">
            {currentView === 'librarian' && isLibrarianLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 hidden md:inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Sessão Bibliotecária Ativa
                </span>
                <button
                  onClick={onLibrarianLogout}
                  className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-rose-600 p-2 rounded-xl hover:bg-stone-100 transition-colors"
                  title="Encerrar Sessão"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            ) : (
              /* Seletor de Aluno Ativo (Simulador Didático) */
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <div className="flex items-center justify-end gap-1.5">
                    <span className="text-xs font-bold text-stone-800">
                      {activeStudent.name}
                    </span>
                    {activeStudent.isBlocked ? (
                      <span className="inline-flex items-center text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        Bloqueado
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        {activeStudent.responsibilityPoints} pts
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500">{activeStudent.grade}</span>
                </div>

                {/* Seletor Dropdown rápido para testar perfis com atraso / normal */}
                <div className="relative group">
                  <button
                    onClick={onOpenProfile}
                    className="relative p-0.5 rounded-full ring-2 ring-amber-400 hover:ring-amber-500 transition-all cursor-pointer"
                    title="Ver perfil do aluno e conquistas"
                  >
                    <img
                      src={activeStudent.avatar}
                      alt={activeStudent.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    {activeStudent.isBlocked ? (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                        !
                      </span>
                    ) : (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 text-white rounded-full flex items-center justify-center text-[9px]">
                        ★
                      </span>
                    )}
                  </button>

                  {/* Menu flutuante de troca rápida de aluno para testes */}
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2.5 hidden group-hover:block transition-all z-50">
                    <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                      <span>Simular como Aluno:</span>
                      <Sparkles className="w-3 h-3 text-amber-500" />
                    </div>
                    {allStudents.map((stud) => (
                      <button
                        key={stud.id}
                        onClick={() => onSelectActiveStudent(stud.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          stud.id === activeStudent.id
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : 'hover:bg-stone-50 text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={stud.avatar}
                            alt={stud.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <div className="truncate max-w-[120px]">{stud.name}</div>
                            <div className="text-[10px] text-stone-400 font-normal">{stud.grade}</div>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            stud.isBlocked
                              ? 'bg-rose-100 text-rose-800'
                              : stud.responsibilityPoints < 100
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {stud.responsibilityPoints} pts
                        </span>
                      </button>
                    ))}
                    <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between px-2 text-[10px]">
                      <span className="text-stone-400">Clique para ver medalhas</span>
                      <button
                        onClick={onSwitchProfile}
                        className="font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer"
                      >
                        Tela de Perfis
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onSwitchProfile}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
                  title="Voltar à tela de seleção de perfis"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Trocar Perfil</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
