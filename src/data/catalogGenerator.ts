import { Book, Genre } from '../types/library';

// 25+ Livros reais clássicos e contemporâneos com capas de alta fidelidade
export const REAL_CURATED_BOOKS: Omit<Book, 'id' | 'createdAt'>[] = [
  // Literatura Brasileira
  {
    isbn: '9788572328227',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Literatura Brasileira',
    totalCopies: 6,
    availableCopies: 2,
    loanCount: 84,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Bentinho e Capitu crescem juntos em Matacavalos e se apaixonam. Porém, o ciúme obsessivo de Bento o faz suspeitar da fidelidade de sua amada com seu melhor amigo Escobar.',
    shelf: 'Estante LB-01',
    publishedYear: 1899,
    pages: 256,
    rating: 4.8,
  },
  {
    isbn: '9788535914849',
    title: 'Capitães da Areia',
    author: 'Jorge Amado',
    genre: 'Literatura Brasileira',
    totalCopies: 5,
    availableCopies: 1,
    loanCount: 78,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A comovente saga de um grupo de meninos abandonados que vivem num trapiche em Salvador, lutando pela sobrevivência e pela liberdade.',
    shelf: 'Estante LB-02',
    publishedYear: 1937,
    pages: 280,
    rating: 4.9,
  },
  {
    isbn: '9788532511010',
    title: 'A Hora da Estrela',
    author: 'Clarice Lispector',
    genre: 'Literatura Brasileira',
    totalCopies: 4,
    availableCopies: 4,
    loanCount: 4, // Tesouro escondido!
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A tocante jornada da jovem alagoana Macabéa no Rio de Janeiro, narrada pelo escritor fictício Rodrigo S.M. Uma reflexão profunda sobre a invisibilidade social.',
    shelf: 'Estante LB-03',
    publishedYear: 1977,
    pages: 96,
    isFeaturedTreasure: true,
    treasureTagline: 'Uma joia curta, poética e inesquecível de Clarice Lispector',
    rating: 4.7,
  },
  {
    isbn: '9788520925744',
    title: 'O Meu Pé de Laranja Lima',
    author: 'José Mauro de Vasconcelos',
    genre: 'Literatura Brasileira',
    totalCopies: 7,
    availableCopies: 3,
    loanCount: 92,
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A emocionante história do garoto Zezé e sua amizade com Minguinho, seu pé de laranja lima falante, repleta de afeto, imaginação e lições de vida.',
    shelf: 'Estante LB-04',
    publishedYear: 1968,
    pages: 192,
    rating: 4.9,
  },
  // Fantasia
  {
    isbn: '9788532530783',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    genre: 'Fantasia',
    totalCopies: 8,
    availableCopies: 1,
    loanCount: 145,
    coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Harry Potter descobre no seu 11º aniversário que é um bruxo e é convidado a estudar na Escola de Magia e Bruxaria de Hogwarts.',
    shelf: 'Estante FAN-01',
    publishedYear: 1997,
    pages: 224,
    rating: 4.9,
  },
  {
    isbn: '9788595084759',
    title: 'O Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasia',
    totalCopies: 5,
    availableCopies: 2,
    loanCount: 110,
    coverUrl: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Bilbo Bolseiro vivia em paz até a chegada do mago Gandalf e de treze anões dispostos a recuperar seu tesouro guardado pelo temível dragão Smaug.',
    shelf: 'Estante FAN-02',
    publishedYear: 1937,
    pages: 320,
    rating: 4.8,
  },
  {
    isbn: '9788578270698',
    title: 'Percy Jackson: O Ladrão de Raios',
    author: 'Rick Riordan',
    genre: 'Fantasia',
    totalCopies: 6,
    availableCopies: 1,
    loanCount: 128,
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Percy Jackson descobre ser filho do deus do mar Poseidon e precisa encontrar o raio-mestre roubado de Zeus para evitar uma guerra entre os deuses.',
    shelf: 'Estante FAN-03',
    publishedYear: 2005,
    pages: 400,
    rating: 4.8,
  },
  {
    isbn: '9788580575309',
    title: 'O Nome do Vento',
    author: 'Patrick Rothfuss',
    genre: 'Fantasia',
    totalCopies: 3,
    availableCopies: 3,
    loanCount: 2, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A infância trágica, a juventude itinerante e os estudos na Universidade de Kvothe, o mago mais lendário de seu mundo.',
    shelf: 'Estante FAN-04',
    publishedYear: 2007,
    pages: 656,
    isFeaturedTreasure: true,
    treasureTagline: 'Uma obra-prima da fantasia épica pronta para ser devorada',
    rating: 4.9,
  },
  // Ficção Científica
  {
    isbn: '9788535902778',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    genre: 'Ficção Científica',
    totalCopies: 4,
    availableCopies: 2,
    loanCount: 65,
    coverUrl: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Num futuro distópico, os livros são proibidos e os bombeiros têm como missão queimar qualquer volume encontrado.',
    shelf: 'Estante FC-01',
    publishedYear: 1953,
    pages: 216,
    rating: 4.7,
  },
  {
    isbn: '9788576572008',
    title: 'Duna',
    author: 'Frank Herbert',
    genre: 'Ficção Científica',
    totalCopies: 5,
    availableCopies: 1,
    loanCount: 95,
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    synopsis: 'No inóspito planeta desértico Arrakis, o jovem Paul Atreides enfrenta traições e destino cósmico pelo controle da especiaria mélange.',
    shelf: 'Estante FC-02',
    publishedYear: 1965,
    pages: 680,
    rating: 4.9,
  },
  {
    isbn: '9788532519986',
    title: 'Fundação',
    author: 'Isaac Asimov',
    genre: 'Ficção Científica',
    totalCopies: 3,
    availableCopies: 3,
    loanCount: 1, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Hari Seldon utiliza a psico-história para prever o colapso do Império Galáctico e planeja salvar o conhecimento da humanidade.',
    shelf: 'Estante FC-03',
    publishedYear: 1951,
    pages: 240,
    isFeaturedTreasure: true,
    treasureTagline: 'O pilar da ficção científica clássica esperando por você',
    rating: 4.8,
  },
  // Mistério
  {
    isbn: '9788525419835',
    title: 'O Cão dos Baskervilles',
    author: 'Arthur Conan Doyle',
    genre: 'Mistério',
    totalCopies: 5,
    availableCopies: 2,
    loanCount: 88,
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Sherlock Holmes e Dr. Watson investigam a lenda de uma fera espectral assassina que assombra a família Baskerville nos pântanos de Devon.',
    shelf: 'Estante MIS-01',
    publishedYear: 1902,
    pages: 224,
    rating: 4.8,
  },
  {
    isbn: '9788525064561',
    title: 'E Não Sobrou Nenhum',
    author: 'Agatha Christie',
    genre: 'Mistério',
    totalCopies: 7,
    availableCopies: 0,
    loanCount: 134,
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Dez estranhos são convidados para uma ilha misteriosa na costa inglesa e começam a morrer um por um de acordo com uma cantiga infantil.',
    shelf: 'Estante MIS-02',
    publishedYear: 1939,
    pages: 400,
    rating: 4.9,
  },
  {
    isbn: '9788571644786',
    title: 'O Nome da Rosa',
    author: 'Umberto Eco',
    genre: 'Mistério',
    totalCopies: 3,
    availableCopies: 3,
    loanCount: 3, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Em 1327, o frade franciscano William de Baskerville investiga assassinatos misteriosos numa opulenta abadia beneditina no norte da Itália.',
    shelf: 'Estante MIS-03',
    publishedYear: 1980,
    pages: 560,
    isFeaturedTreasure: true,
    treasureTagline: 'Um dos maiores enigmas literários de todos os tempos',
    rating: 4.7,
  },
  // Aventura
  {
    isbn: '9788537808382',
    title: 'A Ilha do Tesouro',
    author: 'Robert Louis Stevenson',
    genre: 'Aventura',
    totalCopies: 6,
    availableCopies: 3,
    loanCount: 62,
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    synopsis: 'O jovem Jim Hawkins encontra o mapa de um tesouro pirata e embarca rumo a mares distantes ao lado do ardiloso Long John Silver.',
    shelf: 'Estante AV-01',
    publishedYear: 1883,
    pages: 248,
    rating: 4.7,
  },
  {
    isbn: '9788572323918',
    title: 'Vinte Mil Léguas Submarinas',
    author: 'Júlio Verne',
    genre: 'Aventura',
    totalCopies: 5,
    availableCopies: 4,
    loanCount: 5, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
    synopsis: 'O Capitão Nemo viaja pelos mares profundos a bordo do submarino Nautilus revelando segredos incríveis do oceano.',
    shelf: 'Estante AV-02',
    publishedYear: 1870,
    pages: 352,
    isFeaturedTreasure: true,
    treasureTagline: 'Mergulhe no oceano inexplorado a bordo do Nautilus',
    rating: 4.8,
  },
  // Quadrinhos / Mangás
  {
    isbn: '9788542602784',
    title: 'Turma da Mônica: Laços',
    author: 'Vitor Cafaggi e Lu Cafaggi',
    genre: 'Quadrinhos/Mangás',
    totalCopies: 9,
    availableCopies: 1,
    loanCount: 160,
    coverUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Floquinho desapareceu. Para resgatar o cachorrinho verde, Cebolinha precisa de um plano infalível e da união de seus amigos inseparáveis.',
    shelf: 'Estante HQ-01',
    publishedYear: 2013,
    pages: 82,
    rating: 4.9,
  },
  {
    isbn: '9788542610239',
    title: 'Naruto - Livro 1',
    author: 'Masashi Kishimoto',
    genre: 'Quadrinhos/Mangás',
    totalCopies: 8,
    availableCopies: 2,
    loanCount: 142,
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Naruto Uzumaki é um jovem ninja hiperativo que busca o reconhecimento de sua aldeia e sonha em se tornar o Hokage supremo.',
    shelf: 'Estante HQ-02',
    publishedYear: 1999,
    pages: 192,
    rating: 4.8,
  },
  {
    isbn: '9788535921885',
    title: 'Persépolis',
    author: 'Marjane Satrapi',
    genre: 'Quadrinhos/Mangás',
    totalCopies: 4,
    availableCopies: 4,
    loanCount: 6, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A autobiografia comovente de Marjane Satrapi crescendo no Irã durante e após a Revolução Islâmica, com inteligência e humor.',
    shelf: 'Estante HQ-03',
    publishedYear: 2000,
    pages: 352,
    isFeaturedTreasure: true,
    treasureTagline: 'Uma história gráfica inesquecível de coragem e liberdade',
    rating: 4.9,
  },
  // Biografias
  {
    isbn: '9788501094391',
    title: 'O Diário de Anne Frank',
    author: 'Anne Frank',
    genre: 'Biografias',
    totalCopies: 6,
    availableCopies: 2,
    loanCount: 99,
    coverUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Os relatos íntimos e inspiradores de uma jovem judia escondida com sua família durante a ocupação nazista em Amsterdã.',
    shelf: 'Estante BIO-01',
    publishedYear: 1947,
    pages: 352,
    rating: 4.9,
  },
  {
    isbn: '9788535923698',
    title: 'Eu Sou Malala',
    author: 'Malala Yousafzai',
    genre: 'Biografias',
    totalCopies: 5,
    availableCopies: 3,
    loanCount: 74,
    coverUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A emocionante história da garota que defendeu o direito à educação das mulheres no Paquistão e sobreviveu a um atentado.',
    shelf: 'Estante BIO-02',
    publishedYear: 2013,
    pages: 360,
    rating: 4.8,
  },
  // Infantojuvenil
  {
    isbn: '9788595081512',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Infantojuvenil',
    totalCopies: 8,
    availableCopies: 3,
    loanCount: 155,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Um piloto perdido no deserto do Saara encontra um garotinho vindo de um asteroide distante que lhe ensina o verdadeiro valor do amor e da amizade.',
    shelf: 'Estante INF-01',
    publishedYear: 1943,
    pages: 96,
    rating: 5.0,
  },
  {
    isbn: '9788544001929',
    title: 'Extraordinário',
    author: 'R.J. Palacio',
    genre: 'Infantojuvenil',
    totalCopies: 7,
    availableCopies: 2,
    loanCount: 112,
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Auggie Pullman nasceu com uma deformidade facial e vai à escola regular pela primeira vez no 5º ano, ensinando lições de empatia a todos.',
    shelf: 'Estante INF-02',
    publishedYear: 2012,
    pages: 320,
    rating: 4.9,
  },
  // Poesia
  {
    isbn: '9788535921823',
    title: 'Sentimento do Mundo',
    author: 'Carlos Drummond de Andrade',
    genre: 'Poesia',
    totalCopies: 4,
    availableCopies: 4,
    loanCount: 2, // Tesouro escondido
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    synopsis: 'Escrito em meio às tensões da Segunda Guerra Mundial, reflete a compaixão e o engajamento de Drummond diante do sofrimento humano.',
    shelf: 'Estante POE-01',
    publishedYear: 1940,
    pages: 136,
    isFeaturedTreasure: true,
    treasureTagline: 'Versos tocantes e necessários para acalentar a mente',
    rating: 4.8,
  },
  // Romance
  {
    isbn: '9788572328229',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    genre: 'Romance',
    totalCopies: 5,
    availableCopies: 2,
    loanCount: 89,
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    synopsis: 'A relação turbulenta e espirituosa entre Elizabeth Bennet e o orgulhoso Sr. Darcy na Inglaterra do início do século XIX.',
    shelf: 'Estante ROM-01',
    publishedYear: 1813,
    pages: 424,
    rating: 4.8,
  }
];

// Gerador de Catálogo Dinâmico que atinge 1.050+ livros
export function generateFullCatalog(): Book[] {
  const books: Book[] = [];
  const genres: Genre[] = [
    'Fantasia',
    'Ficção Científica',
    'Romance',
    'Mistério',
    'Aventura',
    'Biografias',
    'Quadrinhos/Mangás',
    'Literatura Brasileira',
    'Infantojuvenil',
    'Poesia',
    'História & Sociedade',
  ];

  // Adiciona livros reais primeiro
  REAL_CURATED_BOOKS.forEach((book, index) => {
    books.push({
      ...book,
      id: `book-real-${index + 1}`,
      createdAt: new Date(Date.now() - (index * 86400000 * 4)).toISOString(),
    });
  });

  // Conjuntos de temas para sintetizar títulos literários ricos
  const titleTemplates: Record<Genre, { prefixes: string[]; stems: string[]; suffixes: string[] }> = {
    'Fantasia': {
      prefixes: ['A Lenda de', 'O Reino de', 'As Crônicas de', 'O Segredo de', 'A Chave de', 'A Profecia de', 'O Despertar de', 'A Ordem de'],
      stems: ['Eldoria', 'Valíria', 'Sombra Prateada', 'Cristal Eterno', 'Luz Estelar', 'Dragão Alado', 'Torre Alta', 'Bosque Ancestral'],
      suffixes: ['e os Guardiões', 'do Crepúsculo', 'Perdido', 'da Aurora', 'Renascido', 'dos Feitiços', 'e o Rei Sombrio'],
    },
    'Ficção Científica': {
      prefixes: ['Projeto', 'Estação', 'O Paradoxo de', 'Horizonte de', 'Além de', 'Protocolo', 'Memórias de'],
      stems: ['Andrômeda', 'Nebulosa Sete', 'Cibernética', 'Marte 2084', 'Singularidade', 'Quantum', 'Gravidade Zero'],
      suffixes: ['em Órbita', 'Renegado', 'Alpha', 'no Vazio Cósmico', 'do Futuro', 'e o Fim do Tempo'],
    },
    'Romance': {
      prefixes: ['Cartas para', 'Onde Moram', 'Entre', 'O Amor nos Tempos de', 'Promessas de', 'O Sol de'],
      stems: ['Primavera', 'Dois Mundos', 'Olhares Tímidos', 'Setembro', 'Ventos do Sul', 'Café com Poesia'],
      suffixes: ['e Silêncios', 'Inesperados', 'no Lago', 'ao Entardecer', 'que Nunca Esqueci'],
    },
    'Mistério': {
      prefixes: ['O Enigma de', 'O Caso do', 'Quem Matou', 'Segredos em', 'A Última Noite de', 'O Silêncio de'],
      stems: ['Quarto 13', 'Mansão Blackwood', 'Relógio Antigo', 'Farol Solitário', 'Passos na Névoa', 'Espelho Quebrado'],
      suffixes: ['Revelado', 'sem Pistas', 'da Meia-Noite', 'no Museu', 'nas Sombras'],
    },
    'Aventura': {
      prefixes: ['Expedição', 'Rumo a', 'A Trilha dos', 'Perdidos em', 'O Desafio do', 'Caçadores de'],
      stems: ['Monte Nebuloso', 'Selva Dourada', 'Terras Geladas', 'Canyon Profundo', 'Mares Desconhecidos'],
      suffixes: ['Selvagens', 'sem Retorno', 'Extremo', 'da Sobrevivência', 'e a Glória'],
    },
    'Biografias': {
      prefixes: ['A Vida de', 'Caminhos de', 'O Legado de', 'Vozes de', 'A Jornada de', 'A Força de'],
      stems: ['Cientistas Pioneiras', 'Grandes Líderes', 'Gênios Esquecidos', 'Educadores Inspiradores', 'Artistas Visionários'],
      suffixes: ['que Mudaram o Mundo', 'na História', 'e a Coragem', 'da Resistência'],
    },
    'Quadrinhos/Mangás': {
      prefixes: ['O Guerreiro de', 'Geração', 'Diários em Quadrinhos:', 'A Saga de', 'Heróis da', 'Espadachim de'],
      stems: ['Neo Tóquio', 'Cidade Luz', 'Capas e Espadas', 'Academia Ninja', 'Clube de Robótica', 'Multiverso'],
      suffixes: ['Volume 1', 'Volume 2', 'A Ascensão', 'Guerra Aberta', 'e o Novo Começo'],
    },
    'Literatura Brasileira': {
      prefixes: ['Veredas de', 'Causos de', 'No Chão de', 'Terra de', 'Contos do', 'O Sertão de'],
      stems: ['Minas Gerais', 'Agreste', 'Sertanejos', 'Canavial', 'Ribeirinhos', 'Litoral'],
      suffixes: ['e Suas Memórias', 'do Infinito', 'ao Luar', 'da Esperança'],
    },
    'Infantojuvenil': {
      prefixes: ['O Mistério da', 'O Clube dos', 'A Árvore dos', 'Amigos da', 'A Incrível Viagem do'],
      stems: ['Bicicleta Voadora', 'Pés Descalços', 'Livros Mágicos', 'Sorvete Quente', 'Passarinho Azul'],
      suffixes: ['na Escola', 'e os Segredos', 'do Bairro', 'que Sonhava Alto'],
    },
    'Poesia': {
      prefixes: ['Canto de', 'Versos para', 'Antologia de', 'Poemas sobre', 'Rimas de', 'Eco de'],
      stems: ['Passarinhos', 'Vento Suave', 'Amor e Mar', 'Folhas Secas', 'Pequenas Coisas'],
      suffixes: ['ao Vento', 'na Madrugada', 'da Alma', 'e Outros Poemas'],
    },
    'História & Sociedade': {
      prefixes: ['Raízes de', 'A Construção de', 'Civilizações de', 'O Século das', 'Povos de'],
      stems: ['América Antiga', 'Grandes Navegações', 'Revoluções Modernas', 'Cidades Globais', 'Memórias Vivas'],
      suffixes: ['e Suas Lições', 'em Perspectiva', 'pelo Tempo', 'da Cidadania'],
    },
  };

  const sampleAuthors = [
    'Helena Albuquerque', 'Rodrigo Barreto', 'Mariana Cavalcante', 'Thiago Duarte',
    'Camila Esteves', 'Felipe Guimarães', 'Larissa Holanda', 'Bruno Iunes',
    'Juliana Kramer', 'Lucas Menezes', 'Beatriz Nogueira', 'Gustavo Paiva',
    'Renata Queiroz', 'André Ribeiro', 'Carolina Silveira', 'Diego Tavares',
    'Vanessa Uchoa', 'Marcelo Valente', 'Aline Xavier', 'Daniel Zanetti'
  ];

  // Cores agradáveis e capas de fallback de alta qualidade temática
  const coverPalettes = [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
  ];

  const totalTarget = 1050;
  let currentId = books.length + 1;

  while (books.length < totalTarget) {
    const genre = genres[books.length % genres.length];
    const templates = titleTemplates[genre];

    const prefix = templates.prefixes[books.length % templates.prefixes.length];
    const stem = templates.stems[(books.length * 3) % templates.stems.length];
    const suffix = templates.suffixes[(books.length * 7) % templates.suffixes.length];
    const author = sampleAuthors[(books.length * 11) % sampleAuthors.length];

    const title = `${prefix} ${stem} ${suffix}`;
    const totalCopies = 2 + (books.length % 6);
    
    // Simula distribuição de popularidade:
    // ~10% muito populares (>60 saídas), ~60% médios (10-50 saídas), ~30% tesouros escondidos (0 a 4 saídas)
    let loanCount = 0;
    const popularityMod = books.length % 10;
    let isFeaturedTreasure = false;
    let treasureTagline: string | undefined = undefined;

    if (popularityMod === 0 || popularityMod === 1) {
      // Tesouro escondido (poucas ou nenhuma saída)
      loanCount = books.length % 4; // 0, 1, 2 ou 3 saídas
      if (loanCount <= 2 && books.length % 7 === 0) {
        isFeaturedTreasure = true;
        const taglines = [
          'Um livro incrível que ainda não foi descoberto pela turma!',
          'Quer ser o primeiro a desvendar essa história fantástica?',
          'Indicação especial da Bibliotecária desta semana',
          'História emocionante esperando pelo leitor certo na estante',
        ];
        treasureTagline = taglines[books.length % taglines.length];
      }
    } else if (popularityMod === 8 || popularityMod === 9) {
      // Super popular
      loanCount = 65 + (books.length % 95);
    } else {
      // Regular
      loanCount = 8 + (books.length % 45);
    }

    const availableCopies = Math.max(0, totalCopies - (books.length % totalCopies === 0 ? 1 : 0));
    const coverUrl = coverPalettes[books.length % coverPalettes.length];
    const shelfCode = `Estante ${genre.substring(0, 3).toUpperCase()}-${String(1 + (books.length % 12)).padStart(2, '0')}`;
    const year = 1970 + (books.length % 55);
    const pages = 120 + ((books.length * 13) % 400);

    books.push({
      id: `book-cat-${currentId}`,
      isbn: `97885${String(1000000 + currentId).slice(0, 8)}`,
      title,
      author,
      genre,
      totalCopies,
      availableCopies,
      loanCount,
      coverUrl,
      synopsis: `Uma empolgante leitura de ${genre.toLowerCase()} que conduz o leitor por reflexões fascinantes sobre imaginação, conhecimento e emoção. Recomendado para todas as idades.`,
      shelf: shelfCode,
      publishedYear: year,
      pages,
      isFeaturedTreasure,
      treasureTagline,
      rating: Number((4.2 + ((books.length % 8) * 0.1)).toFixed(1)),
      createdAt: new Date(Date.now() - (books.length * 3600000)).toISOString(),
    });

    currentId++;
  }

  return books;
}

// Alunos iniciais de teste com diferentes perfis pedagógicos e de responsabilidade
export const INITIAL_STUDENTS = [
  {
    id: 'stud-1',
    name: 'Sofia Lima',
    grade: '7º Ano B',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    responsibilityPoints: 100,
    isBlocked: false,
    booksReadCount: 14,
    badges: ['badge-iniciante', 'badge-devorador', 'badge-pontualidade', 'badge-fantasia'],
    readingStreakDays: 12,
    joinedDate: '2025-02-10',
  },
  {
    id: 'stud-2',
    name: 'Lucas Mendes',
    grade: '8º Ano A',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    responsibilityPoints: 75, // Perdeu 25 pontos (5 dias de atraso)
    isBlocked: false,
    booksReadCount: 6,
    badges: ['badge-iniciante', 'badge-aventura'],
    readingStreakDays: 3,
    joinedDate: '2025-02-15',
  },
  {
    id: 'stud-3',
    name: 'Beatriz Santos',
    grade: '6º Ano C',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    responsibilityPoints: 95,
    isBlocked: false,
    booksReadCount: 8,
    badges: ['badge-iniciante', 'badge-tesouro', 'badge-pontualidade'],
    readingStreakDays: 7,
    joinedDate: '2025-03-01',
  },
  {
    id: 'stud-4',
    name: 'Gabriel Oliveira',
    grade: '9º Ano A',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    responsibilityPoints: 0, // Chegou a zero! Temporariamente bloqueado
    isBlocked: true,
    booksReadCount: 4,
    badges: ['badge-iniciante'],
    readingStreakDays: 0,
    joinedDate: '2025-02-20',
  },
  {
    id: 'stud-5',
    name: 'Clara Ferreira',
    grade: '7º Ano A',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    responsibilityPoints: 100,
    isBlocked: false,
    booksReadCount: 11,
    badges: ['badge-iniciante', 'badge-misterio', 'badge-pontualidade'],
    readingStreakDays: 9,
    joinedDate: '2025-02-12',
  },
];

// Lista de conquistas e selos para gamificação
export const SYSTEM_BADGES = [
  {
    id: 'badge-iniciante',
    title: 'Leitor Iniciante',
    description: 'Devolveu seu primeiro livro e deu o pontapé inicial na biblioteca!',
    iconName: 'BookOpen',
    category: 'progress' as const,
  },
  {
    id: 'badge-devorador',
    title: 'Devorador de Livros',
    description: 'Leu mais de 10 livros no ano letivo. Uma verdadeira máquina de ler!',
    iconName: 'Flame',
    category: 'progress' as const,
  },
  {
    id: 'badge-misterio',
    title: 'Mestre do Suspense',
    description: 'Desvendou enigmas em 3 ou mais livros do gênero Mistério.',
    iconName: 'Search',
    category: 'genre' as const,
  },
  {
    id: 'badge-fantasia',
    title: 'Explorador de Mundos',
    description: 'Viajou por terras mágicas em pelo menos 3 livros de Fantasia.',
    iconName: 'Sparkles',
    category: 'genre' as const,
  },
  {
    id: 'badge-aventura',
    title: 'Aventureiro Nato',
    description: 'Encarou jornadas perigosas e desbravou livros de Aventura.',
    iconName: 'Compass',
    category: 'genre' as const,
  },
  {
    id: 'badge-tesouro',
    title: 'Descobridor de Tesouros',
    description: 'Leu um livro da seção "Tesouros Escondidos" e deu carinho a uma obra.',
    iconName: 'Gem',
    category: 'discovery' as const,
  },
  {
    id: 'badge-pontualidade',
    title: 'Guardião da Pontualidade',
    description: 'Manteve 100 pontos de responsabilidade devolvendo livros rigorosamente no prazo!',
    iconName: 'ShieldCheck',
    category: 'punctuality' as const,
  },
];
