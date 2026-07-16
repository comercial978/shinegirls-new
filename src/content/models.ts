export type ModelProfile = {
  name: string;
  role: string;
  location: string;
  image: string;
  summary: string;
  highlight: string;
  href?: string;
};

export const models: ModelProfile[] = [
  {
    name: "Laysa Padovani",
    role: "Modelo e influenciadora",
    location: "São Paulo, SP",
    image: "/legacy/laysa-casual.jpg",
    summary:
      "Presença editorial forte, beleza marcante e narrativa de moda ligada à autoestima, looks casuais e produções sofisticadas.",
    highlight: "Editorial de moda, beleza e estilo pessoal",
    href: "/modelos/laysa-padovani",
  },
  {
    name: "Melina Trida",
    role: "Modelo e presença editorial",
    location: "Brasil",
    image: "/institucional/melina-1024x819.png.webp",
    summary:
      "Presença ligada à origem visual da Shine Girls, reunindo beleza, estilo e a identidade feminina que marcou os primeiros editoriais da marca.",
    highlight: "Origem, beleza e identidade Shine Girls",
    href: "/modelos/melina-trida",
  },
  {
    name: "Barbara Santos",
    role: "Miss Sacramento 2024",
    location: "Minas Gerais",
    image: "/modelos/barbara-santos.jpg",
    summary:
      "Perfil associado a concursos, elegância e trajetória regional com potencial para projetos de marca e eventos.",
    highlight: "Beleza, concursos e visibilidade regional",
    href: "/modelos/barbara-santos",
  },
  {
    name: "Maria Eduarda",
    role: "Miss Goiás Teen 2025",
    location: "Goiânia, GO",
    image: "/modelos/maria-eduarda/maria-eduarda-01.jpg",
    summary:
      "Modelo, influenciadora digital e estudante de Jornalismo, une beleza, comunicação e presença diante das câmeras em moda, beleza e lifestyle.",
    highlight: "Miss Goiás Teen 2025",
    href: "/modelos/maria-eduarda",
  },
  {
    name: "Renata Palis",
    role: "Modelo convidada",
    location: "Brasil",
    image: "/legacy/renata-palis.jpg",
    summary:
      "Arquivo legado preservado como parte da memória visual da Shine Girls e da primeira fase editorial do projeto.",
    highlight: "Memória de marca e portfólio",
    href: "/modelos/renata-palis",
  },
];
