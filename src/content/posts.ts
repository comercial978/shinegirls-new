export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "laysa-padovani-moda-casual",
    title: "A moda casual ganha vida com Laysa Padovani",
    excerpt:
      "Uma leitura moderna sobre estilo casual, presença digital e como transformar looks simples em narrativa de marca.",
    category: "Moda",
    date: "2023-06-21",
    image: "/legacy/laysa-casual.jpg",
    body: [
      "A moda casual da Shine Girls nasce da ideia de que beleza e conforto podem ocupar o mesmo espaço. O look deixa de ser apenas roupa e passa a comunicar atitude, ritmo de vida e personalidade.",
      "Laysa Padovani representa essa fase editorial da marca: uma imagem feminina forte, contemporânea e acessível, conectada à autoestima e à presença visual nas redes.",
      "Na nova plataforma, esse conteúdo ganha leitura mais limpa: menos excesso promocional, mais curadoria, história e direção visual.",
    ],
  },
  {
    slug: "blazer-cinza-inspiracao",
    title: "Blazer cinza: elegância para atualizar o visual",
    excerpt:
      "Como uma peça clássica pode criar uma imagem sofisticada sem perder leveza.",
    category: "Looks",
    date: "2023-06-18",
    image: "/legacy/laysa-blazer.jpg",
    body: [
      "O blazer cinza funciona como uma ponte entre o casual e o sofisticado. Ele organiza o visual, alonga a silhueta e transmite segurança.",
      "A proposta da Shine Girls é inspirar combinações que valorizem a mulher sem engessar sua expressão. O styling precisa servir a pessoa, não o contrário.",
    ],
  },
  {
    slug: "beleza-inverno-laysa",
    title: "Beleza de inverno: casacos, textura e presença",
    excerpt:
      "Uma narrativa visual sobre tons frios, cabelo ruivo e o magnetismo dos looks de inverno.",
    category: "Autoestima",
    date: "2023-07-03",
    image: "/legacy/laysa-inverno.jpg",
    body: [
      "A estética de inverno da Shine Girls combina textura, contraste e delicadeza. O frio aparece como linguagem visual: casacos, gola alta, pele iluminada e uma paleta mais cinematográfica.",
      "O novo site preserva essa sensibilidade, mas reduz a poluição do WordPress antigo para que a imagem respire e a história apareça.",
    ],
  },
  {
    slug: "melina-trida-origem-shine-girls",
    title: "Melina Trida e a essência da Shine Girls",
    excerpt:
      "Beleza, estilo e memória visual em um perfil ligado à origem da identidade Shine Girls.",
    category: "Garotas que Brilham",
    date: "2026-07-16",
    image: "/institucional/melina-1024x819.png.webp",
    body: [
      "Melina Trida faz parte da memória visual que ajudou a construir a identidade da Shine Girls: feminina, elegante e conectada à beleza e ao estilo.",
      "Seu perfil representa a origem editorial da marca e permanece como parte da história que inspira a nova fase da plataforma.",
    ],
  },
  {
    slug: "barbara-santos-modelo",
    title: "Barbara Santos, modelo e Miss Sacramento 2024",
    excerpt:
      "Trajetória, concurso e visibilidade regional em um perfil pensado para marcas.",
    category: "Influenciadoras",
    date: "2024-01-07",
    image: "/modelos/barbara-santos.jpg",
    body: [
      "Barbara Santos foi registrada no legado como Miss Sacramento 2024 e participante do Miss Minas Gerais 2024.",
      "Na nova Shine Girls, esse tipo de perfil passa a ter melhor contexto, chamada clara e apresentação adequada para publicidade, eventos e parcerias.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
