import React from 'react';
import { Student } from '../types/library';
import { ThemeToggle } from './ThemeToggle';

interface ClassicalSidebarProps {
  currentView: 'student' | 'librarian';
  activeSection: string;
  onSelectSection: (section: string) => void;
  activeStudent: Student;
  isLibrarianLoggedIn: boolean;
  onSwitchProfile: () => void;
  onOpenExpressAdd: () => void;
  onOpenNewReaderModal?: () => void;
  onOpenDatabase: () => void;
  currentTheme: 'warm-white' | 'parchment';
  onToggleTheme: (theme: 'warm-white' | 'parchment') => void;
}

export const ClassicalSidebar: React.FC<ClassicalSidebarProps> = ({
  currentView,
  activeSection,
  onSelectSection,
  activeStudent,
  onSwitchProfile,
  onOpenExpressAdd,
  onOpenNewReaderModal,
  onOpenDatabase,
  currentTheme,
  onToggleTheme,
}) => {
  const isStudent = currentView === 'student';

  return (
    <aside className="w-full md:w-[270px] shrink-0 bg-[#ede6d6] border-b md:border-b-0 md:border-r border-[#d4c9b2] p-6 md:p-7 flex flex-col md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      
      {/* Marca Clássica com Brasão em Verde Oliva */}
      <div className="pb-5 border-b border-[#d4c9b2] mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fcf8ef] border-2 border-[#b89155] grid place-items-center font-serif-vintage italic text-base text-[#556b2f] shadow-[inset_0_0_0_3px_#ede6d6] shrink-0">
            CUP
          </div>
          <div>
            <h1 className="font-serif-vintage text-sm font-normal text-[#1c1712] leading-tight">
              Biblioteca · <em className="italic text-[#556b2f] font-serif-vintage block text-base">Colégio Unidade Polo</em>
            </h1>
            <small className="text-[9px] tracking-[0.3em] uppercase text-[#8f6f3e] block mt-1 font-sans-custom">
              Ex Libris
            </small>
          </div>
        </div>
      </div>

      {/* User Badge / Identificação do Usuário Ativo */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#d4c9b2]">
        <div className="w-11 h-11 rounded-full bg-[#556b2f] text-[#fcf8ef] grid place-items-center font-serif-vintage italic text-base shrink-0 border-[1.5px] border-[#b89155]">
          {isStudent ? activeStudent.name.slice(0, 2).toUpperCase() : 'BIB'}
        </div>
        <div className="overflow-hidden">
          <strong className="block font-serif-vintage font-normal text-sm text-[#1c1712] truncate">
            {isStudent ? activeStudent.name : 'Profª Ana (Bibliotecária)'}
          </strong>
          <div className="flex items-center gap-1.5 mt-0.5">
            <small className="text-[10px] text-[#877b69] truncate">
              {isStudent ? activeStudent.grade : 'Gestão do Acervo'}
            </small>
            {isStudent && (
              <span
                className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  activeStudent.isBlocked
                    ? 'bg-[#f8e5df] text-[#a8563c]'
                    : activeStudent.responsibilityPoints < 100
                    ? 'bg-[#fff5e6] text-[#b89155]'
                    : 'bg-[#edf3e4] text-[#556b2f] border border-[#c2d2b0]'
                }`}
              >
                {activeStudent.responsibilityPoints} pts
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navegação Estilo 'nav-item' da Referência */}
      <nav className="space-y-1 flex-1">
        
        {isStudent ? (
          <>
            <button
              onClick={() => onSelectSection('catalogo')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'catalogo'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#556b2f]">✦</span>
              <span>Catálogo Geral</span>
            </button>

            <button
              onClick={() => onSelectSection('populares')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'populares'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#b89155]">🔥</span>
              <span>Os Mais Populares</span>
            </button>

            <button
              onClick={() => onSelectSection('tesouros')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'tesouros'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#b89155]">✨</span>
              <span>Tesouros Escondidos</span>
            </button>

            <button
              onClick={() => onSelectSection('emprestimos')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'emprestimos'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#556b2f]">§</span>
              <span>Meus Empréstimos & Pontos</span>
            </button>

            <button
              onClick={() => onSelectSection('desafios')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'desafios'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#b89155]">🏆</span>
              <span>Conquistas & Desafio Escolar</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onSelectSection('estoque')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'estoque'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#556b2f]">❦</span>
              <span>Controle de Estoque & Empréstimos</span>
            </button>

            <button
              onClick={onOpenExpressAdd}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5 transition-all text-left cursor-pointer"
            >
              <span className="font-serif-vintage italic text-sm text-[#b89155]">✍️</span>
              <span>+ Cadastro Expresso de Livro</span>
            </button>

            {onOpenNewReaderModal && (
              <button
                onClick={onOpenNewReaderModal}
                className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5 transition-all text-left cursor-pointer"
              >
                <span className="font-serif-vintage italic text-sm text-[#556b2f]">👤</span>
                <span>+ Cadastrar Novo Leitor</span>
              </button>
            )}

            <button
              onClick={() => onSelectSection('alunos')}
              className={`w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom transition-all text-left border-b border-transparent cursor-pointer ${
                activeSection === 'alunos'
                  ? 'text-[#556b2f] border-b-[#556b2f] font-bold pl-2.5 bg-[#edf3e4]'
                  : 'text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5'
              }`}
            >
              <span className="font-serif-vintage italic text-sm text-[#556b2f]">👥</span>
              <span>Gestão de Alunos & Responsabilidade</span>
            </button>

            <button
              onClick={onOpenDatabase}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-xs font-sans-custom text-[#4a3f33] hover:text-[#556b2f] hover:pl-2.5 transition-all text-left cursor-pointer"
            >
              <span className="font-serif-vintage italic text-sm text-[#b89155]">💾</span>
              <span>Banco de Dados JSON & Backup</span>
            </button>
          </>
        )}

      </nav>

      {/* Footer da Sidebar com Alternador de Tonalidade */}
      <div className="pt-4 mt-6 border-t border-[#d4c9b2] space-y-3">
        <div>
          <span className="block text-[9px] uppercase tracking-[0.2em] text-[#7a6f5e] font-sans-custom mb-1.5 font-bold">
            Tonalidade Visual
          </span>
          <ThemeToggle currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
        </div>

        <button
          onClick={onSwitchProfile}
          className="w-full p-2.5 bg-transparent text-[#7a6f5e] hover:text-[#a8563c] border border-[#d4c9b2] hover:border-[#a8563c] font-sans-custom text-[11px] tracking-[0.12em] uppercase transition-colors cursor-pointer text-center block"
        >
          Trocar Perfil / Sair
        </button>
      </div>

    </aside>
  );
};
