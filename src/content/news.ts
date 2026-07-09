export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readingTime: string;
  body: string[];
  sourceNote?: string;
};

export const news: NewsArticle[] = [
  {
    slug: "rosa-volta-como-cor-chave-da-moda-feminina",
    title: "Rosa volta como cor-chave da moda feminina em 2026",
    excerpt:
      "Do rosa suave ao pink mais marcante, a cor ganha uma leitura adulta, elegante e cheia de personalidade para editoriais, looks e campanhas.",
    category: "Tendência",
    date: "2026-07-09",
    image: "/legacy/brand-editorial.jpeg",
    readingTime: "3 min",
    body: [
      "O rosa voltou ao centro das conversas de moda, mas com uma leitura mais sofisticada. A cor aparece menos como excesso visual e mais como assinatura: tons blush, rosa antigo, pink pontual e combinações com preto, branco, jeans, vinho e neutros quentes.",
      "Para modelos e influenciadoras, essa tendência abre espaço para editoriais femininos sem parecer óbvia. O segredo está no equilíbrio: uma peça rosa pode conduzir o visual, enquanto maquiagem, cabelo e acessórios mantêm a imagem limpa e profissional.",
      "Na comunicação de marca, o rosa continua sendo um código emocional forte. Quando usado com direção visual, ele transmite feminilidade, presença e confiança, três elementos que conversam diretamente com a proposta da Shine Girls.",
    ],
    sourceNote: "Tendência observada em editoriais internacionais de moda primavera/verão 2026.",
  },
  {
    slug: "microinfluenciadoras-ganham-forca-em-campanhas-de-moda-e-beleza",
    title: "Microinfluenciadoras ganham força em campanhas de moda e beleza",
    excerpt:
      "Marcas procuram criadoras com comunidade real, boa imagem e capacidade de gerar confiança, não apenas grandes números.",
    category: "Influência",
    date: "2026-07-09",
    image: "/legacy/laysa-casual.jpg",
    readingTime: "4 min",
    body: [
      "O mercado de influência amadureceu. Em vez de olhar apenas para quantidade de seguidores, marcas de moda, beleza e lifestyle estão analisando consistência, linguagem visual, credibilidade e alinhamento com públicos específicos.",
      "Esse movimento favorece microinfluenciadoras, modelos regionais, misses, criadoras de conteúdo e mulheres com presença digital autêntica. Um perfil menor, mas bem posicionado, pode ter mais valor para uma ação local ou de nicho do que uma audiência grande e pouco conectada.",
      "Para quem deseja entrar no casting Shine Girls, a recomendação é cuidar da apresentação: bio clara, fotos recentes, cidade, área de atuação, links atualizados e um portfólio que mostre estilo, postura e personalidade.",
    ],
    sourceNote: "Tendência alinhada ao crescimento de parcerias de longo prazo entre marcas e criadores.",
  },
  {
    slug: "romantismo-moderno-renda-transparencia-e-texturas-leves",
    title: "Romantismo moderno: renda, transparência e texturas leves",
    excerpt:
      "A estética romântica volta repaginada com tecidos fluidos, camadas suaves e styling mais limpo para fotos, vídeos e campanhas.",
    category: "Moda",
    date: "2026-07-09",
    image: "/legacy/laysa-inverno.jpg",
    readingTime: "3 min",
    body: [
      "Renda, transparência, babados sutis e tecidos leves aparecem como sinais de uma feminilidade mais natural. A diferença está na edição: menos fantasia, mais direção de imagem. O look romântico de agora pede pele iluminada, cabelo com movimento e composição visual sem excesso.",
      "Para ensaios e campanhas, essa estética funciona muito bem porque cria textura na foto. Uma blusa de renda, uma saia fluida ou um vestido com movimento podem transformar um cenário simples em uma imagem editorial.",
      "A Shine Girls enxerga essa tendência como oportunidade para modelos que desejam construir uma imagem elegante, delicada e comercial, sem perder autenticidade.",
    ],
    sourceNote: "Tendência recorrente nas leituras de moda feminina para 2026.",
  },
  {
    slug: "portfolio-digital-vira-cartao-de-visita-para-modelos",
    title: "Portfólio digital vira cartão de visita para modelos",
    excerpt:
      "Um perfil bem organizado pode ser decisivo para marcas, fotógrafos e produtoras entenderem rapidamente o potencial de uma modelo.",
    category: "Casting",
    date: "2026-07-09",
    image: "/modelos/barbara-santos.jpg",
    readingTime: "4 min",
    body: [
      "O primeiro contato profissional quase sempre acontece no digital. Antes de uma reunião, convite ou parceria, marcas observam fotos, vídeos, postura, descrição do perfil, localização e coerência da imagem pública.",
      "Por isso, o portfólio digital se tornou parte central da carreira de modelos e influenciadoras. Não precisa ser complexo, mas precisa ser claro: nome artístico, cidade, área de atuação, Instagram, apresentação curta e fotos que mostrem versatilidade.",
      "O cadastro no Casting Shine Girls nasce com essa lógica. A curadoria analisa as informações enviadas e, quando o perfil é aprovado, pode apresentá-lo de forma mais organizada, segura e profissional.",
    ],
    sourceNote: "Conteúdo criado pela curadoria Shine Girls para orientar novas candidatas.",
  },
  {
    slug: "imagem-autoral-e-video-curto-definem-nova-presenca-digital",
    title: "Imagem autoral e vídeo curto definem a nova presença digital",
    excerpt:
      "Fotos bem escolhidas continuam importantes, mas vídeos curtos ajudam marcas a perceberem expressão, movimento e naturalidade.",
    category: "Presença digital",
    date: "2026-07-09",
    image: "/legacy/laysa-blazer.jpg",
    readingTime: "4 min",
    body: [
      "A presença digital de uma modelo não depende apenas de fotos bonitas. Cada vez mais, marcas querem entender como aquela pessoa se comunica em movimento: postura, expressão, naturalidade, voz, energia e capacidade de sustentar uma narrativa visual.",
      "Vídeos curtos, bastidores de ensaio, provas de look, transições simples e registros de eventos ajudam a mostrar personalidade. O ideal é manter uma estética coerente, com boa luz, enquadramento limpo e legenda objetiva.",
      "Para a Shine Girls, a melhor imagem é aquela que une beleza e posicionamento. A candidata não precisa parecer igual a todas as outras; precisa mostrar quem é, com cuidado, verdade e intenção profissional.",
    ],
    sourceNote: "Tendência conectada ao avanço de conteúdo curto em moda, beleza e publicidade.",
  },
];

export function getNewsArticle(slug: string) {
  return news.find((article) => article.slug === slug);
}
