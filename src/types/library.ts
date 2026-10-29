export type Genre =
  | 'Fantasia'
  | 'Ficção Científica'
  | 'Romance'
  | 'Mistério'
  | 'Aventura'
  | 'Biografias'
  | 'Quadrinhos/Mangás'
  | 'Literatura Brasileira'
  | 'Infantojuvenil'
  | 'Poesia'
  | 'História & Sociedade';

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  genre: Genre;
  totalCopies: number;
  availableCopies: number;
  loanCount: number; // For "Mais Populares" vs "Tesouros Escondidos"
  coverUrl: string;
  synopsis: string;
  shelf: string; // e.g. "Estante B-03"
  publishedYear: number;
  pages: number;
  isFeaturedTreasure?: boolean; // Strategic recommendation
  treasureTagline?: string;
  rating?: number;
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string; // e.g. "7º Ano B"
  avatar: string;
  responsibilityPoints: number; // 0 to 100
  isBlocked: boolean; // if points == 0
  booksReadCount: number;
  badges: string[]; // Badge IDs
  readingStreakDays: number;
  joinedDate: string;
}

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  studentId: string;
  studentName: string;
  loanDate: string; // ISO
  dueDate: string; // ISO
  returnDate?: string | null;
  status: 'active' | 'returned' | 'overdue';
  daysOverdue?: number;
  renewalCount: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'progress' | 'genre' | 'punctuality' | 'discovery';
  unlockedAt?: string;
}

export interface SchoolGoal {
  targetBooks: number;
  currentBooksRead: number;
  year: number;
  topClasses: {
    grade: string;
    booksRead: number;
    color: string;
  }[];
}
