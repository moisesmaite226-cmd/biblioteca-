/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useTransition } from 'react';
import { db } from './services/db';
import { Book, Loan, Student, SchoolGoal, Badge } from './types/library';
import { ProfileLoginScreen } from './components/ProfileLoginScreen';
import { ClassicalSidebar } from './components/ClassicalSidebar';
import { FriendlyReminderAlert } from './components/StudentView/FriendlyReminderAlert';
import { GamificationBar } from './components/StudentView/GamificationBar';
import { DynamicCarousels } from './components/StudentView/DynamicCarousels';
import { CatalogExplorer } from './components/StudentView/CatalogExplorer';
import { BookDetailModal } from './components/StudentView/BookDetailModal';
import { StudentProfileModal } from './components/StudentView/StudentProfileModal';
import { InventoryManager } from './components/LibrarianView/InventoryManager';
import { ExpressBookAddModal } from './components/LibrarianView/ExpressBookAddModal';
import { NewLoanModal } from './components/LibrarianView/NewLoanModal';
import { StudentsManager } from './components/LibrarianView/StudentsManager';
import { NewReaderModal } from './components/LibrarianView/NewReaderModal';
import { SystemDatabaseModal } from './components/LibrarianView/SystemDatabaseModal';
import { CelebrationToast } from './components/CelebrationToast';
import { PinLoginModal } from './components/PinLoginModal';
import { ThemeToggle } from './components/ThemeToggle';

export default function App() {
  const [, startTransition] = useTransition();

  // Tonalidade visual: 'warm-white' (Branco Acolhedor / Olhos Confortáveis) vs 'parchment' (Pergaminho Clássico)
  const [currentTheme, setCurrentTheme] = useState<'warm-white' | 'parchment'>(() => db.getTheme());

  // Inicia na tela clássica de perfis, fiel ao site de referência
  const [isInProfileSelection, setIsInProfileSelection] = useState(true);
  const [currentView, setCurrentView] = useState<'student' | 'librarian'>('student');
  const [activeSection, setActiveSection] = useState<string>('catalogo');
  const [isLibrarianLoggedIn, setIsLibrarianLoggedIn] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  // Dados do banco
  const [books, setBooks] = useState<Book[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [schoolGoal, setSchoolGoal] = useState<SchoolGoal>(db.getSchoolGoal());
  const [activeStudent, setActiveStudent] = useState<Student>(db.getActiveStudent());

  // Modais
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<Book | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isExpressAddOpen, setIsExpressAddOpen] = useState(false);
  const [isNewLoanOpen, setIsNewLoanOpen] = useState(false);
  const [isNewReaderOpen, setIsNewReaderOpen] = useState(false);
  const [isDatabaseModalOpen, setIsDatabaseModalOpen] = useState(false);

  // Notificações e Celebrações
  const [celebration, setCelebration] = useState<{
    message: string;
    pointsEarned?: number;
    unlockedBadges?: Badge[];
  } | null>(null);

  // Carrega dados iniciais do banco
  const refreshData = () => {
    startTransition(() => {
      setBooks([...db.getBooks()]);
      setLoans([...db.getLoans()]);
      setStudents([...db.getStudents()]);
      setSchoolGoal({ ...db.getSchoolGoal() });
      setActiveStudent({ ...db.getActiveStudent() });
    });
  };

  useEffect(() => {
    refreshData();
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleToggleTheme = (newTheme: 'warm-white' | 'parchment') => {
    db.setTheme(newTheme);
    setCurrentTheme(newTheme);
  };

  // Login de Aluno a partir da Tela de Perfis
  const handleStudentLoginFromProfiles = (student: Student) => {
    db.setActiveStudent(student.id);
    setActiveStudent(student);
    setCurrentView('student');
    setActiveSection('catalogo');
    setIsInProfileSelection(false);
    setCelebration({
      message: `Bem-vindo(a), ${student.name}! Bons estudos e ótimas leituras na BiblioEscola! 📚`,
    });
  };

  // Login da Bibliotecária direto com validação de PIN
  const handleLibrarianLoginSuccess = () => {
    setIsLibrarianLoggedIn(true);
    setCurrentView('librarian');
    setActiveSection('estoque');
    setIsInProfileSelection(false);
    setCelebration({
      message: 'Bem-vinda, Bibliotecária! Painel de gestão e acervo liberado.',
    });
  };

  // Cadastro de Novo Aluno na Tela de Perfis
  const handleAddNewStudent = (data: { name: string; grade: string; avatar: string }) => {
    const createdStudent = db.addStudent(data);
    refreshData();
    db.setActiveStudent(createdStudent.id);
    setActiveStudent(createdStudent);
    setIsInProfileSelection(false);
    setCurrentView('student');
    setActiveSection('catalogo');
    setCelebration({
      message: `Perfil do aluno ${createdStudent.name} criado com sucesso! +100 pontos de responsabilidade concedidos.`,
    });
  };

  // Devolução de livro (com recuperação de pontos e checagem de conquistas)
  const handleReturnLoan = (loanId: string) => {
    const result = db.returnLoan(loanId);
    refreshData();
    if (result.success) {
      setCelebration({
        message: result.message,
        pointsEarned: result.pointsEarned,
        unlockedBadges: result.unlockedBadges,
      });
    }
  };

  // Renovação de prazo
  const handleRenewLoan = (loanId: string) => {
    const result = db.renewLoan(loanId);
    refreshData();
    if (result.success) {
      setCelebration({
        message: result.message,
      });
    }
  };

  // Registro de novo empréstimo
  const handleCreateLoan = (bookId: string, studentId: string, days: number) => {
    const result = db.createLoan(bookId, studentId, days);
    refreshData();
    if (result.success) {
      setCelebration({
        message: result.message,
      });
    } else {
      alert(result.message);
    }
  };

  // Adição expressa de livro pela Bibliotecária
  const handleAddExpressBook = (newBookData: any) => {
    const created = db.addBook(newBookData);
    refreshData();
    setCelebration({
      message: `Livro "${created.title}" cadastrado com sucesso no acervo!`,
    });
  };

  // Cadastro de Novo Leitor no Balcão pela Bibliotecária
  const handleRegisterReaderByLibrarian = (data: { name: string; grade: string }) => {
    const createdStudent = db.addStudent({
      name: data.name,
      grade: data.grade,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    });
    refreshData();
    setCelebration({
      message: `Leitor(a) ${createdStudent.name} (${createdStudent.grade}) matriculado(a) com sucesso com 100 pontos de responsabilidade!`,
    });
  };

  // Ajuste pedagógico de pontos pela Bibliotecária
  const handleUpdateStudentPoints = (studentId: string, deltaPoints: number) => {
    const student = db.getStudentById(studentId);
    if (student) {
      const nextPoints = Math.max(0, Math.min(100, student.responsibilityPoints + deltaPoints));
      db.updateStudent(studentId, {
        responsibilityPoints: nextPoints,
        isBlocked: nextPoints <= 0,
      });
      refreshData();
    }
  };

  // Empréstimo solicitado pelo aluno no catálogo
  const handleRequestStudentLoan = (bookId: string) => {
    if (activeStudent.isBlocked || activeStudent.responsibilityPoints <= 0) {
      alert('Empréstimo bloqueado: você possui pontos zerados por atraso. Devolva o livro anterior na biblioteca para recuperar!');
      return;
    }
    const result = db.createLoan(bookId, activeStudent.id, 7);
    refreshData();
    if (result.success) {
      setSelectedBookForDetail(null);
      setCelebration({
        message: `Parabéns, ${activeStudent.name}! O livro foi emprestado. Prazo de 7 dias para devolução.`,
      });
    } else {
      alert(result.message);
    }
  };

  // Restauração do catálogo original
  const handleDatabaseReset = () => {
    db.resetToDefaultCatalog();
    refreshData();
    setCelebration({
      message: 'Catálogo de 1.050+ livros e regras restaurados com sucesso!',
    });
  };

  // Empréstimos do aluno ativo
  const activeStudentLoans = loans.filter((l) => l.studentId === activeStudent.id);
  const overdueActiveLoans = activeStudentLoans.filter((l) => l.status === 'overdue');

  // Carrosséis
  const popularBooks = db.getPopularBooks(12);
  const hiddenTreasures = db.getHiddenTreasures(12);

  // SE ESTIVER NA TELA DE LOGIN / SELEÇÃO DE PERFIS
  if (isInProfileSelection) {
    return (
      <div className="min-h-screen bg-[var(--papel)]">
        <ProfileLoginScreen
          students={students}
          onSelectStudent={handleStudentLoginFromProfiles}
          onSelectLibrarianWithPin={handleLibrarianLoginSuccess}
          onAddNewStudent={handleAddNewStudent}
          currentTheme={currentTheme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Modal de PIN extra caso acionado externamente */}
        <PinLoginModal
          isOpen={isPinModalOpen}
          onSuccess={handleLibrarianLoginSuccess}
          onClose={() => setIsPinModalOpen(false)}
        />
      </div>
    );
  }

  // APLICAÇÃO PRINCIPAL (ESTILO CLÁSSICO: SIDEBAR + MAIN)
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--papel)] text-[#1c1712]">
      
      {/* 1. Sidebar Clássica Ex-Libris */}
      <ClassicalSidebar
        currentView={currentView}
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        activeStudent={activeStudent}
        isLibrarianLoggedIn={isLibrarianLoggedIn}
        onSwitchProfile={() => setIsInProfileSelection(true)}
        onOpenExpressAdd={() => setIsExpressAddOpen(true)}
        onOpenNewReaderModal={() => setIsNewReaderOpen(true)}
        onOpenDatabase={() => setIsDatabaseModalOpen(true)}
        currentTheme={currentTheme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Área Principal de Leitura e Gestão */}
      <main className="flex-1 p-5 sm:p-8 lg:p-12 max-w-[1200px] overflow-x-hidden">
        
        {/* Tag da Escola */}
        <div className="flex items-center gap-2.5 font-sans-custom text-[10px] tracking-[0.35em] uppercase text-[#8f6f3e] mb-3">
          <span className="w-6 h-px bg-[#b89155]" />
          <span>Biblioteca Escolar Comunitária · Colégio Unidade Polo</span>
        </div>

        {/* Cabeçalho da Página com Linha Fina */}
        <div className="mb-8 pb-5 border-b border-[#d4c9b2] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif-vintage text-2xl sm:text-3xl font-normal text-[#1c1712] leading-tight">
              {currentView === 'student' ? (
                <>
                  Acervo Literário · <em className="italic text-[#556b2f]">Espaço do Aluno</em>
                </>
              ) : (
                <>
                  Gestão & Estoque · <em className="italic text-[#556b2f]">Painel da Bibliotecária</em>
                </>
              )}
            </h2>
            <p className="font-serif-vintage italic text-[#877b69] text-xs sm:text-sm mt-1">
              {currentView === 'student'
                ? 'Mais de 1.050 obras disponíveis para empréstimo e incentivo à leitura'
                : 'Alimentação expressa, controle de circulação e acompanhamento de responsabilidade'}
            </p>
          </div>

          {/* Botões de Ação Rápida & Alternador de Tonalidade */}
          <div className="flex flex-wrap items-center gap-2.5">
            <ThemeToggle currentTheme={currentTheme} onToggleTheme={handleToggleTheme} compact />

            {currentView === 'librarian' ? (
              <>
                <button
                  onClick={() => setIsExpressAddOpen(true)}
                  className="px-3.5 py-2 bg-[#556b2f] hover:bg-[#3c4d1f] text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  + Cadastrar Livro
                </button>
                <button
                  onClick={() => setIsNewLoanOpen(true)}
                  className="px-3.5 py-2 bg-[#1c1712] hover:bg-stone-800 text-[#fcf8ef] font-serif-vintage text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  + Empréstimo
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3.5 py-2 bg-[#fcf8ef] border border-[#d4c9b2] hover:border-[#556b2f] text-[#1c1712] font-serif-vintage text-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Meus Selos & Ficha</span>
                <span className="font-bold text-[#556b2f]">({activeStudent.responsibilityPoints} pts)</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
           CONTEÚDO DO MÓDULO DO ALUNO
           ========================================================================= */}
        {currentView === 'student' && (
          <div className="space-y-10">
            
            {/* Alerta Afetuoso e Não Punitivo para Atrasos */}
            <FriendlyReminderAlert
              student={activeStudent}
              overdueLoans={overdueActiveLoans}
              onReturnBook={handleReturnLoan}
            />

            {/* Gamificação & Desafio Escolar 2026 */}
            <GamificationBar
              student={activeStudent}
              schoolGoal={schoolGoal}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />

            {/* Seções em Destaque: Mais Populares e Tesouros Escondidos */}
            <DynamicCarousels
              popularBooks={popularBooks}
              treasureBooks={hiddenTreasures}
              onSelectBook={(book) => setSelectedBookForDetail(book)}
            />

            {/* Catálogo Geral com mais de 1000 livros, filtros e busca rápida */}
            <CatalogExplorer
              books={books}
              onSelectBook={(book) => setSelectedBookForDetail(book)}
            />

          </div>
        )}

        {/* =========================================================================
           CONTEÚDO DO MÓDULO DA BIBLIOTECÁRIA
           ========================================================================= */}
        {currentView === 'librarian' && (
          <div className="space-y-10">
            
            {/* Gestor de Estoque, KPIs e Tabela de Empréstimos */}
            <InventoryManager
              books={books}
              loans={loans}
              students={students}
              onOpenExpressAdd={() => setIsExpressAddOpen(true)}
              onOpenNewLoan={() => setIsNewLoanOpen(true)}
              onOpenNewReader={() => setIsNewReaderOpen(true)}
              onReturnLoan={handleReturnLoan}
              onRenewLoan={handleRenewLoan}
              onOpenDatabaseModal={() => setIsDatabaseModalOpen(true)}
            />

            {/* Gestão de Alunos & Auditoria de Pontos de Responsabilidade */}
            <StudentsManager
              students={students}
              onUpdatePoints={handleUpdateStudentPoints}
              onOpenNewReaderModal={() => setIsNewReaderOpen(true)}
            />

          </div>
        )}

      </main>

      {/* --- MODAIS DO SISTEMA --- */}

      {/* Modal de Detalhes do Livro */}
      <BookDetailModal
        book={selectedBookForDetail}
        student={activeStudent}
        onClose={() => setSelectedBookForDetail(null)}
        onRequestLoan={handleRequestStudentLoan}
      />

      {/* Modal de Perfil do Aluno com Selos */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        student={activeStudent}
        studentLoans={activeStudentLoans}
        onClose={() => setIsProfileModalOpen(false)}
        onReturnLoan={handleReturnLoan}
      />

      {/* Cadastro Expresso de Livro (Google Books API) */}
      <ExpressBookAddModal
        isOpen={isExpressAddOpen}
        onClose={() => setIsExpressAddOpen(false)}
        onBookAdded={handleAddExpressBook}
      />

      {/* Novo Empréstimo no Balcão */}
      <NewLoanModal
        isOpen={isNewLoanOpen}
        books={books}
        students={students}
        onClose={() => setIsNewLoanOpen(false)}
        onCreateLoan={handleCreateLoan}
        onOpenNewReader={() => setIsNewReaderOpen(true)}
      />

      {/* Cadastro de Novo Leitor no Balcão (Bibliotecária) */}
      <NewReaderModal
        isOpen={isNewReaderOpen}
        onClose={() => setIsNewReaderOpen(false)}
        onRegister={handleRegisterReaderByLibrarian}
      />

      {/* Modal do Banco de Dados & Configurações */}
      <SystemDatabaseModal
        isOpen={isDatabaseModalOpen}
        books={books}
        onClose={() => setIsDatabaseModalOpen(false)}
        onDatabaseReset={handleDatabaseReset}
      />

      {/* Toast de Celebração e Confetes */}
      <CelebrationToast
        message={celebration?.message || null}
        pointsEarned={celebration?.pointsEarned}
        unlockedBadges={celebration?.unlockedBadges}
        onClose={() => setCelebration(null)}
      />

    </div>
  );
}
