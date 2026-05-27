export type ModelProfile = {
  name: string;
  role: string;
  location: string;
  image: string;
  summary: string;
  highlight: string;
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
  },
  {
    name: "Marcella Narhell",
    role: "Modelo",
    location: "Brasil",
    image: "/legacy/marcella-narhell.jpeg",
    summary:
      "Imagem de impacto para campanhas de moda, ensaios autorais e comunicação visual com energia ousada.",
    highlight: "Ensaios, presença digital e campanhas",
  },
  {
    name: "Barbara Santos",
    role: "Miss Sacramento 2024",
    location: "Minas Gerais",
    image: "/modelos/barbara-santos.jpg",
    summary:
      "Perfil associado a concursos, elegância e trajetória regional com potencial para projetos de marca e eventos.",
    highlight: "Beleza, concursos e visibilidade regional",
  },
  {
    name: "Renata Palis",
    role: "Modelo convidada",
    location: "Brasil",
    image: "/legacy/renata-palis.jpg",
    summary:
      "Arquivo legado preservado como parte da memória visual da Shine Girls e da primeira fase editorial do projeto.",
    highlight: "Memória de marca e portfólio",
  },
];
