import { Book, Genre, Loan, Student, SchoolGoal, Badge } from '../types/library';
import { generateFullCatalog, INITIAL_STUDENTS, SYSTEM_BADGES } from '../data/catalogGenerator';

const STORAGE_KEYS = {
  BOOKS: 'biblio_books_v1',
  STUDENTS: 'biblio_students_v1',
  LOANS: 'biblio_loans_v1',
  PIN: 'biblio_librarian_pin_v1',
  SCHOOL_GOAL: 'biblio_school_goal_v1',
  ACTIVE_STUDENT_ID: 'biblio_active_student_id_v1',
  THEME: 'biblio_theme_v1',
};

// Seed inicial de empréstimos demonstrando as regras de negócio
function getInitialLoans(): Loan[] {
  const now = new Date();
  
  // 5 dias atrás (atrasado)
  const fiveDaysAgo = new Date(now.getTime() - 5 * 86400000).toISOString();
  const twelveDaysAgo = new Date(now.getTime() - 12 * 86400000).toISOString();

  // Empréstimo vencido há 22 dias (bloqueou Gabriel)
  const twentyTwoDaysAgo = new Date(now.getTime() - 22 * 86400000).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000).toISOString();

  // Empréstimo no prazo (Sofia)
  const fourDaysInFuture = new Date(now.getTime() + 4 * 86400000).toISOString();
  const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString();

  return [
    {
      id: 'loan-1',
      bookId: 'book-real-2', // Capitães da Areia
      bookTitle: 'Capitães da Areia',
      bookCover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      studentId: 'stud-2', // Lucas Mendes
      studentName: 'Lucas Mendes (8º Ano A)',
      loanDate: twelveDaysAgo,
      dueDate: fiveDaysAgo,
      returnDate: null,
      status: 'overdue',
      daysOverdue: 5,
      renewalCount: 0,
    },
    {
      id: 'loan-2',
      bookId: 'book-real-12', // E Não Sobrou Nenhum
      bookTitle: 'E Não Sobrou Nenhum',
      bookCover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
      studentId: 'stud-4', // Gabriel Oliveira
      studentName: 'Gabriel Oliveira (9º Ano A)',
      loanDate: thirtyDaysAgo,
      dueDate: twentyTwoDaysAgo,
      returnDate: null,
      status: 'overdue',
      daysOverdue: 22,
      renewalCount: 0,
    },
    {
      id: 'loan-3',
      bookId: 'book-real-7', // Percy Jackson
      bookTitle: 'Percy Jackson: O Ladrão de Raios',
      bookCover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      studentId: 'stud-1', // Sofia Lima
      studentName: 'Sofia Lima (7º Ano B)',
      loanDate: threeDaysAgo,
      dueDate: fourDaysInFuture,
      returnDate: null,
      status: 'active',
      daysOverdue: 0,
      renewalCount: 0,
    },
  ];
}

class LibraryDatabase {
  private books: Book[] = [];
  private students: Student[] = [];
  private loans: Loan[] = [];
  private librarianPin: string = '1234';
  private schoolGoal: SchoolGoal = {
    targetBooks: 1000,
    currentBooksRead: 542,
    year: 2026,
    topClasses: [
      { grade: '7º Ano B', booksRead: 148, color: 'bg-amber-500' },
      { grade: '8º Ano A', booksRead: 124, color: 'bg-emerald-500' },
      { grade: '6º Ano C', booksRead: 102, color: 'bg-indigo-500' },
      { grade: '9º Ano A', booksRead: 94, color: 'bg-rose-500' },
      { grade: '7º Ano A', booksRead: 74, color: 'bg-sky-500' },
    ],
  };
  private activeStudentId: string = 'stud-1';

  constructor() {
    this.init();
  }

  private init() {
    try {
      const storedBooks = localStorage.getItem(STORAGE_KEYS.BOOKS);
      if (storedBooks) {
        this.books = JSON.parse(storedBooks);
      } else {
        this.books = generateFullCatalog();
        this.saveBooks();
      }

      const storedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (storedStudents) {
        this.students = JSON.parse(storedStudents);
      } else {
        this.students = INITIAL_STUDENTS;
        this.saveStudents();
      }

      const storedLoans = localStorage.getItem(STORAGE_KEYS.LOANS);
      if (storedLoans) {
        this.loans = JSON.parse(storedLoans);
      } else {
        this.loans = getInitialLoans();
        this.saveLoans();
      }

      const storedPin = localStorage.getItem(STORAGE_KEYS.PIN);
      if (storedPin) {
        this.librarianPin = storedPin;
      }

      const storedGoal = localStorage.getItem(STORAGE_KEYS.SCHOOL_GOAL);
      if (storedGoal) {
        this.schoolGoal = JSON.parse(storedGoal);
      }

      const storedActiveStudent = localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_ID);
      if (storedActiveStudent && this.students.some(s => s.id === storedActiveStudent)) {
        this.activeStudentId = storedActiveStudent;
      }
    } catch (e) {
      console.warn('Erro ao carregar dados do LocalStorage, usando defaults em memória', e);
      this.books = generateFullCatalog();
      this.students = INITIAL_STUDENTS;
      this.loans = getInitialLoans();
    }
  }

  private saveBooks() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(this.books));
    } catch (e) {
      console.error('LocalStorage overflow or error saving books', e);
    }
  }

  private saveStudents() {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(this.students));
    } catch (e) {
      console.error('Error saving students', e);
    }
  }

  private saveLoans() {
    try {
      localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(this.loans));
    } catch (e) {
      console.error('Error saving loans', e);
    }
  }

  // --- LIVROS ---
  public getBooks(): Book[] {
    return this.books;
  }

  public getBookById(id: string): Book | undefined {
    return this.books.find((b) => b.id === id);
  }

  public addBook(bookData: {
    title: string;
    author: string;
    genre: Genre;
    totalCopies: number;
    synopsis?: string;
    coverUrl?: string;
  }): Book {
    const newId = `book-user-${Date.now()}`;
    const cover = bookData.coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
    const newBook: Book = {
      id: newId,
      isbn: `97885${Math.floor(1000000 + Math.random() * 9000000)}`,
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      genre: bookData.genre,
      totalCopies: Math.max(1, Number(bookData.totalCopies) || 1),
      availableCopies: Math.max(1, Number(bookData.totalCopies) || 1),
      loanCount: 0,
      coverUrl: cover,
      synopsis: bookData.synopsis?.trim() || `Livro adicionado ao acervo escolar. Obra recomendada para aprofundamento em ${bookData.genre}.`,
      shelf: `Estante ${bookData.genre.substring(0, 3).toUpperCase()}-EX`,
      publishedYear: new Date().getFullYear(),
      pages: 180,
      rating: 5.0,
      createdAt: new Date().toISOString(),
    };

    this.books.unshift(newBook);
    this.saveBooks();
    return newBook;
  }

  public updateBook(id: string, updates: Partial<Book>): Book | null {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return null;
    this.books[index] = { ...this.books[index], ...updates };
    this.saveBooks();
    return this.books[index];
  }

  public deleteBook(id: string): boolean {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    this.books.splice(index, 1);
    this.saveBooks();
    return true;
  }

  // --- CARROSSÉIS ESTATÍSTICOS ---
  public getPopularBooks(limit = 10): Book[] {
    return [...this.books]
      .sort((a, b) => b.loanCount - a.loanCount)
      .slice(0, limit);
  }

  public getHiddenTreasures(limit = 10): Book[] {
    // Pega livros com poucas saídas (loanCount <= 5) e alta avaliação ou marcados como tesouro
    const candidates = this.books.filter((b) => b.loanCount <= 4);
    // Prioriza os que têm sinopses ricas ou foram marcados
    return [...candidates]
      .sort((a, b) => {
        if (a.isFeaturedTreasure && !b.isFeaturedTreasure) return -1;
        if (!a.isFeaturedTreasure && b.isFeaturedTreasure) return 1;
        return a.loanCount - b.loanCount;
      })
      .slice(0, limit);
  }

  // --- ALUNOS ---
  public getStudents(): Student[] {
    return this.students;
  }

  public getStudentById(id: string): Student | undefined {
    return this.students.find((s) => s.id === id);
  }

  public getActiveStudent(): Student {
    const student = this.students.find((s) => s.id === this.activeStudentId);
    return student || this.students[0];
  }

  public setActiveStudent(id: string): void {
    if (this.students.some((s) => s.id === id)) {
      this.activeStudentId = id;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
    }
  }

  public updateStudent(id: string, updates: Partial<Student>): Student | null {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) return null;
    this.students[index] = { ...this.students[index], ...updates };
    
    // Atualiza estado de bloqueio se pontos baterem 0
    if (this.students[index].responsibilityPoints <= 0) {
      this.students[index].responsibilityPoints = 0;
      this.students[index].isBlocked = true;
    } else {
      this.students[index].isBlocked = false;
    }

    this.saveStudents();
    return this.students[index];
  }

  public addStudent(data: { name: string; grade: string; avatar?: string }): Student {
    const newStudent: Student = {
      id: `stud-${Date.now()}`,
      name: data.name.trim(),
      grade: data.grade.trim(),
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      responsibilityPoints: 100,
      isBlocked: false,
      booksReadCount: 0,
      badges: ['badge-iniciante'],
      readingStreakDays: 1,
      joinedDate: new Date().toISOString().slice(0, 10),
    };

    this.students.push(newStudent);
    this.saveStudents();
    return newStudent;
  }

  // --- EMPRÉSTIMOS E REGRAS DE NEGÓCIO ---
  public getLoans(): Loan[] {
    // Atualiza status de atraso dinamicamente
    const now = new Date();
    return this.loans.map((loan) => {
      if (loan.status === 'returned') return loan;
      const dueDate = new Date(loan.dueDate);
      if (now > dueDate) {
        const diffMs = now.getTime() - dueDate.getTime();
        const daysOverdue = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return {
          ...loan,
          status: 'overdue',
          daysOverdue,
        };
      }
      return {
        ...loan,
        status: 'active',
        daysOverdue: 0,
      };
    });
  }

  public createLoan(bookId: string, studentId: string, days = 7): { success: boolean; message: string; loan?: Loan } {
    const student = this.getStudentById(studentId);
    if (!student) {
      return { success: false, message: 'Aluno não encontrado no cadastro.' };
    }

    if (student.isBlocked || student.responsibilityPoints <= 0) {
      return {
        success: false,
        message: `${student.name} está com 0 pontos de responsabilidade. É necessário devolver o livro pendente para liberar novos empréstimos!`,
      };
    }

    const book = this.getBookById(bookId);
    if (!book) {
      return { success: false, message: 'Livro não encontrado.' };
    }

    if (book.availableCopies <= 0) {
      return { success: false, message: 'Todos os exemplares deste livro estão emprestados no momento.' };
    }

    const now = new Date();
    const dueDate = new Date(now.getTime() + days * 86400000);

    const newLoan: Loan = {
      id: `loan-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      bookCover: book.coverUrl,
      studentId: student.id,
      studentName: `${student.name} (${student.grade})`,
      loanDate: now.toISOString(),
      dueDate: dueDate.toISOString(),
      returnDate: null,
      status: 'active',
      daysOverdue: 0,
      renewalCount: 0,
    };

    // Atualiza livro
    book.availableCopies = Math.max(0, book.availableCopies - 1);
    book.loanCount += 1;
    this.saveBooks();

    this.loans.unshift(newLoan);
    this.saveLoans();

    return { success: true, message: `Empréstimo registrado com sucesso! Devolução até ${dueDate.toLocaleDateString('pt-BR')}.`, loan: newLoan };
  }

  public returnLoan(loanId: string): {
    success: boolean;
    message: string;
    pointsEarned: number;
    newPoints: number;
    unlockedBadges: Badge[];
  } {
    const loanIndex = this.loans.findIndex((l) => l.id === loanId);
    if (loanIndex === -1) {
      return { success: false, message: 'Empréstimo não encontrado.', pointsEarned: 0, newPoints: 0, unlockedBadges: [] };
    }

    const loan = this.loans[loanIndex];
    if (loan.status === 'returned') {
      return { success: false, message: 'Este livro já foi devolvido anteriormente.', pointsEarned: 0, newPoints: 0, unlockedBadges: [] };
    }

    const now = new Date();
    const dueDate = new Date(loan.dueDate);
    const wasOverdue = now > dueDate;
    const diffDays = wasOverdue ? Math.ceil((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    // Atualiza status do empréstimo
    loan.status = 'returned';
    loan.returnDate = now.toISOString();

    // Devolve exemplar ao livro
    const book = this.getBookById(loan.bookId);
    if (book) {
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
      this.saveBooks();
    }

    // Atualiza aluno e pontos de responsabilidade
    let pointsAwarded = 0;
    const unlockedBadges: Badge[] = [];
    const student = this.getStudentById(loan.studentId);

    if (student) {
      student.booksReadCount += 1;

      if (!wasOverdue) {
        // Devolveu no prazo: +10 pontos de pontualidade (máximo 100)
        pointsAwarded = 10;
        student.responsibilityPoints = Math.min(100, student.responsibilityPoints + 10);
      } else {
        // Estava atrasado: recupera status e ganha bônus de incentivo por ter devolvido (+15 pts)
        pointsAwarded = 15;
        student.responsibilityPoints = Math.min(100, Math.max(15, student.responsibilityPoints + 15));
      }

      // Se estava bloqueado, agora que devolveu o livro pendente, desbloqueia!
      if (student.responsibilityPoints > 0) {
        student.isBlocked = false;
      }

      // Checa badges
      // 1. Leitor Iniciante (1 livro lido)
      if (student.booksReadCount >= 1 && !student.badges.includes('badge-iniciante')) {
        student.badges.push('badge-iniciante');
        const b = SYSTEM_BADGES.find((b) => b.id === 'badge-iniciante');
        if (b) unlockedBadges.push(b);
      }

      // 2. Devorador de Livros (10 livros lidos)
      if (student.booksReadCount >= 10 && !student.badges.includes('badge-devorador')) {
        student.badges.push('badge-devorador');
        const b = SYSTEM_BADGES.find((b) => b.id === 'badge-devorador');
        if (b) unlockedBadges.push(b);
      }

      // 3. Descobridor de Tesouros (se o livro foi um tesouro)
      if (book && (book.isFeaturedTreasure || book.loanCount <= 5) && !student.badges.includes('badge-tesouro')) {
        student.badges.push('badge-tesouro');
        const b = SYSTEM_BADGES.find((b) => b.id === 'badge-tesouro');
        if (b) unlockedBadges.push(b);
      }

      // 4. Guardião da Pontualidade (se chegou a 100 pontos)
      if (student.responsibilityPoints === 100 && !student.badges.includes('badge-pontualidade')) {
        student.badges.push('badge-pontualidade');
        const b = SYSTEM_BADGES.find((b) => b.id === 'badge-pontualidade');
        if (b) unlockedBadges.push(b);
      }

      this.saveStudents();
    }

    // Incrementa meta da escola
    this.schoolGoal.currentBooksRead += 1;
    this.saveSchoolGoal();
    this.saveLoans();

    const returnMsg = wasOverdue
      ? `Livro devolvido com sucesso! Obrigado por trazer o livro de volta à biblioteca. Recuperou +${pointsAwarded} pontos de responsabilidade!`
      : `Parabéns pela pontualidade! Livro devolvido e +${pointsAwarded} pontos creditados no perfil!`;

    return {
      success: true,
      message: returnMsg,
      pointsEarned: pointsAwarded,
      newPoints: student ? student.responsibilityPoints : 100,
      unlockedBadges,
    };
  }

  public renewLoan(loanId: string, additionalDays = 7): { success: boolean; message: string } {
    const loan = this.loans.find((l) => l.id === loanId);
    if (!loan) return { success: false, message: 'Empréstimo não encontrado.' };
    if (loan.status === 'returned') return { success: false, message: 'Livro já devolvido.' };

    const currentDue = new Date(loan.dueDate);
    const newDueDate = new Date(currentDue.getTime() + additionalDays * 86400000);
    loan.dueDate = newDueDate.toISOString();
    loan.renewalCount = (loan.renewalCount || 0) + 1;
    loan.status = 'active';
    loan.daysOverdue = 0;

    this.saveLoans();
    return { success: true, message: `Empréstimo renovado com sucesso até ${newDueDate.toLocaleDateString('pt-BR')}!` };
  }

  // --- METAS GLOBAIS ---
  public getSchoolGoal(): SchoolGoal {
    return this.schoolGoal;
  }

  private saveSchoolGoal() {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHOOL_GOAL, JSON.stringify(this.schoolGoal));
    } catch (e) {
      console.error('Error saving goal', e);
    }
  }

  // --- PIN DA BIBLIOTECÁRIA ---
  public verifyLibrarianPin(enteredPin: string): boolean {
    return this.librarianPin === enteredPin;
  }

  public changeLibrarianPin(newPin: string): boolean {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      this.librarianPin = newPin;
      localStorage.setItem(STORAGE_KEYS.PIN, newPin);
      return true;
    }
    return false;
  }

  public getLibrarianPin(): string {
    return this.librarianPin;
  }

  // --- RESET E EXPORTAÇÃO ---
  public resetToDefaultCatalog(): void {
    localStorage.removeItem(STORAGE_KEYS.BOOKS);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.LOANS);
    this.books = generateFullCatalog();
    this.students = INITIAL_STUDENTS;
    this.loans = getInitialLoans();
    this.saveBooks();
    this.saveStudents();
    this.saveLoans();
  }

  public exportDatabaseJSON(): string {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        totalBooks: this.books.length,
        books: this.books,
        students: this.students,
        loans: this.loans,
        schoolGoal: this.schoolGoal,
      },
      null,
      2
    );
  }

  public getTheme(): 'warm-white' | 'parchment' {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'parchment' || saved === 'warm-white') {
      return saved;
    }
    return 'warm-white'; // Padrão: Branco agradável aos olhos (conforto visual)
  }

  public setTheme(theme: 'warm-white' | 'parchment'): void {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}

// Busca automática de capa (Google Books API real com fallback confiável)
export async function searchBookCoverOnline(title: string, author?: string): Promise<{
  coverUrl: string;
  source: 'google-books' | 'open-library' | 'fallback';
  foundSynopsis?: string;
  pageCount?: number;
}> {
  const cleanTitle = title.trim();
  const cleanAuthor = author?.trim() || '';

  if (!cleanTitle) {
    return {
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      source: 'fallback',
    };
  }

  // 1. Tenta API do Google Books (gratuita e sem necessidade de chave para leitura simples)
  try {
    const query = cleanAuthor
      ? `intitle:${encodeURIComponent(cleanTitle)}+inauthor:${encodeURIComponent(cleanAuthor)}`
      : encodeURIComponent(cleanTitle);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&printType=books`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const volumeInfo = item.volumeInfo || {};
        const imageLinks = volumeInfo.imageLinks || {};
        
        let cover = imageLinks.thumbnail || imageLinks.smallThumbnail;
        if (cover) {
          // Força HTTPS e zoom de melhor qualidade
          cover = cover.replace('http://', 'https://');
          if (cover.includes('&zoom=')) {
            cover = cover.replace('&zoom=1', '&zoom=2');
          }
          return {
            coverUrl: cover,
            source: 'google-books',
            foundSynopsis: volumeInfo.description,
            pageCount: volumeInfo.pageCount,
          };
        }
      }
    }
  } catch (err) {
    console.log('Google Books fetch skipped or timed out, trying OpenLibrary fallback');
  }

  // 2. Tenta Open Library Covers
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const searchUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(cleanTitle)}&limit=1`;
    const olRes = await fetch(searchUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (olRes.ok) {
      const olData = await olRes.json();
      if (olData.docs && olData.docs.length > 0 && olData.docs[0].cover_i) {
        const coverId = olData.docs[0].cover_i;
        return {
          coverUrl: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
          source: 'open-library',
          pageCount: olData.docs[0].number_of_pages_median,
        };
      }
    }
  } catch (err) {
    console.log('OpenLibrary fetch skipped');
  }

  // 3. Fallback estético com belas capas literárias do Unsplash
  const fallbacks = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
  ];
  const charCodeSum = cleanTitle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const selectedFallback = fallbacks[charCodeSum % fallbacks.length];

  return {
    coverUrl: selectedFallback,
    source: 'fallback',
  };
}

export const db = new LibraryDatabase();
