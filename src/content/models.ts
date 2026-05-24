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
    location: "Sao Paulo, SP",
    image: "/legacy/laysa-casual.jpg",
    summary:
      "Presenca editorial forte, beleza marcante e narrativa de moda ligada a autoestima, looks casuais e producoes sofisticadas.",
    highlight: "Editorial de moda, beleza e estilo pessoal",
  },
  {
    name: "Marcella Narhell",
    role: "Modelo",
    location: "Brasil",
    image: "/legacy/marcella-narhell.jpeg",
    summary:
      "Imagem de impacto para campanhas de moda, ensaios autorais e comunicacao visual com energia ousada.",
    highlight: "Ensaios, presenca digital e campanhas",
  },
  {
    name: "Barbara Santos",
    role: "Miss Sacramento 2024",
    location: "Minas Gerais",
    image: "/legacy/barbara-santos.jpg",
    summary:
      "Perfil associado a concursos, elegancia e trajetoria regional com potencial para projetos de marca e eventos.",
    highlight: "Beleza, concursos e visibilidade regional",
  },
  {
    name: "Renata Palis",
    role: "Modelo convidada",
    location: "Brasil",
    image: "/legacy/renata-palis.jpg",
    summary:
      "Arquivo legado preservado como parte da memoria visual da Shine Girls e da primeira fase editorial do projeto.",
    highlight: "Memoria de marca e portifolio",
  },
];
