import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AtSign, BriefcaseBusiness, Camera, CheckCircle2, HeartHandshake, Images, Star, Users } from "lucide-react";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Maria Eduarda Gonçalves Ribeiro | Miss Goiás Teen 2025",
  description:
    "Perfil de Maria Eduarda Gonçalves Ribeiro, Miss Goiás Teen 2025, modelo, influenciadora digital e estudante de Jornalismo em Goiânia.",
  alternates: {
    canonical: `${site.url}/modelos/maria-eduarda`,
  },
  openGraph: {
    title: "Maria Eduarda Gonçalves Ribeiro | Miss Goiás Teen 2025",
    description:
      "Conheça o perfil de Maria Eduarda para moda, beleza, publicidade, eventos, conteúdo digital e parcerias.",
    images: [{ url: "/modelos/maria-eduarda/maria-eduarda-01.jpg" }],
    type: "profile",
  },
};

const gallery = [
  "/modelos/maria-eduarda/maria-eduarda-01.jpg",
  "/modelos/maria-eduarda/maria-eduarda-02.jpg",
  "/modelos/maria-eduarda/maria-eduarda-03.jpg",
  "/modelos/maria-eduarda/maria-eduarda-04.jpg",
  "/modelos/maria-eduarda/maria-eduarda-05.jpg",
  "/modelos/maria-eduarda/maria-eduarda-06.jpg",
  "/modelos/maria-eduarda/maria-eduarda-07.jpg",
  "/modelos/maria-eduarda/maria-eduarda-08.jpg",
  "/modelos/maria-eduarda/maria-eduarda-09.jpg",
];

const segments = ["Moda", "Beleza", "Eventos", "Publicidade", "Jornalismo", "Conteúdo digital"];

const timeline = [
  {
    title: "Por volta dos 15 anos",
    text: "Início da trajetória na moda, com participação em desfiles, produções fotográficas e concursos de beleza.",
  },
  {
    title: "Experiência nas passarelas",
    text: "Desenvolvimento de presença cênica, elegância, postura e maturidade diante das câmeras.",
  },
  {
    title: "Miss Goiânia 2024",
    text: "Participação no tradicional concurso representando o Setor Sul da capital goiana.",
  },
  {
    title: "Miss Goiás Teen 2025",
    text: "Título que ampliou sua projeção e fortaleceu sua representatividade no universo fashion e cultural de Goiás.",
  },
  {
    title: "Jornalismo e comunicação",
    text: "Formação em Jornalismo como complemento à atuação digital, artística e comercial.",
  },
  {
    title: "Nova geração",
    text: "Uma modelo que une moda, comunicação, influência digital e inspiração para outras jovens.",
  },
];

const differentials = [
  "Título de Miss Goiás Teen 2025",
  "Representatividade em Goiânia e no cenário goiano",
  "Experiência em desfiles, produções fotográficas e concursos",
  "Formação em Jornalismo e boa comunicação",
  "Atuação como modelo e influenciadora digital",
  "Potencial para campanhas de moda, beleza e lifestyle",
];

const sponsorItems = [
  "Divulgação da marca em conteúdos aprovados",
  "Produção de imagens com produtos ou serviços",
  "Presença em ensaios, campanhas e materiais digitais",
  "Menções em publicações e ações especiais",
  "Possibilidade de logotipo na página da modelo",
  "Conteúdo especial contando a história da parceria",
];

const fullBio = [
  "Maria Eduarda Gonçalves Ribeiro é modelo, influenciadora digital e estudante de Jornalismo, natural do cenário cultural e fashion de Goiás. Atuando em Goiânia, construiu sua imagem unindo beleza, comunicação, elegância e presença diante das câmeras.",
  "Sua trajetória no universo da moda começou ainda na adolescência, por volta dos 15 anos, quando passou a participar de desfiles, produções fotográficas e concursos de beleza. Desde então, vem desenvolvendo experiência nas passarelas e no mercado de criação de conteúdo, especialmente nos segmentos de moda, beleza e lifestyle.",
  "Em 2024, Maria Eduarda participou do tradicional concurso Miss Goiânia, representando o Setor Sul da capital goiana. Durante a edição Miss Goiânia 2025, conquistou o título de Miss Goiás Teen 2025, reconhecimento que ampliou sua projeção e a tornou representante da beleza e da juventude goiana em eventos e competições do segmento.",
  "Paralelamente à carreira de modelo, Maria Eduarda investe em sua formação como jornalista. A escolha pela comunicação complementa sua atuação artística e digital, fortalecendo sua capacidade de se expressar, contar histórias, produzir conteúdo e se conectar com diferentes públicos.",
  "Com carisma, determinação e uma presença marcante, Maria Eduarda representa uma nova geração de modelos que vai além das passarelas. Sua trajetória reúne moda, comunicação e influência digital, abrindo espaço para trabalhos publicitários, campanhas de beleza, editoriais, eventos, projetos audiovisuais e parcerias com marcas.",
  "Como Miss Goiás Teen 2025, ela carrega não apenas um título, mas também o compromisso de representar Goiás com profissionalismo, autenticidade e inspiração para outras jovens que desejam construir seu próprio caminho.",
];

export default function MariaEduardaPage() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Maria Eduarda Gonçalves Ribeiro | Miss Goiás Teen 2025",
    url: `${site.url}/modelos/maria-eduarda`,
    mainEntity: {
      "@type": "Person",
      name: "Maria Eduarda Gonçalves Ribeiro",
      jobTitle: "Modelo, influenciadora digital e Miss Goiás Teen 2025",
      image: `${site.url}/modelos/maria-eduarda/maria-eduarda-01.jpg`,
      description:
        "Modelo, influenciadora digital, estudante de Jornalismo e Miss Goiás Teen 2025 em Goiânia.",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />

      <section className="bg-ink text-pearl">
        <div className="container-shell grid min-h-[calc(100svh-64px)] gap-10 py-12 md:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="mb-5 inline-flex rounded-full border border-rose/50 bg-rose/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blush">
              Perfil Shine Girls
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">Maria Eduarda Gonçalves Ribeiro</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-pearl/84">
              Miss Goiás Teen 2025, modelo, influenciadora digital e estudante de Jornalismo.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-pearl/68">
              Beleza, comunicação, elegância e presença diante das câmeras em uma trajetória construída no cenário
              cultural e fashion de Goiás, com atuação em Goiânia e potencial para marcas de moda, beleza e lifestyle.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {segments.map((segment) => (
                <span key={segment} className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-pearl/76">
                  {segment}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/contato?modelo=maria-eduarda&tipo=campanha" className="focus-ring rounded-full bg-rose px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-wine">
                Contratar para campanha
              </Link>
              <Link href="/contato?modelo=maria-eduarda&tipo=parceria" className="focus-ring rounded-full bg-pearl px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-blush">
                Propor parceria
              </Link>
              <a href={`mailto:${site.email}?subject=Solicitar%20m%C3%ADdia%20kit%20-%20Maria%20Eduarda`} className="focus-ring rounded-full border border-white/18 px-6 py-3 text-center text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
                Solicitar mídia kit
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-pearl/70">
              <span className="inline-flex items-center gap-2">
                <Camera className="h-4 w-4 text-blush" aria-hidden />
                Portfólio visual
              </span>
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-blush" aria-hidden />
                Goiânia, Goiás
              </span>
              <a href={site.instagram} className="inline-flex items-center gap-2 transition hover:text-white">
                <AtSign className="h-4 w-4 text-blush" aria-hidden />
                Instagram Shine Girls
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-mist shadow-soft ring-1 ring-white/12">
              <Image
                src="/modelos/maria-eduarda/maria-eduarda-01.jpg"
                alt="Retrato profissional de Maria Eduarda, modelo Shine Girls"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Resumo profissional</p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
              Beleza, comunicação e influência digital em uma trajetória com propósito.
            </h2>
          </div>
          <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
            <p className="text-base leading-8 text-charcoal/74">
              Maria Eduarda Gonçalves Ribeiro é modelo, influenciadora digital e estudante de Jornalismo, natural do
              cenário cultural e fashion de Goiás. Atuando em Goiânia, construiu sua imagem unindo beleza, comunicação,
              elegância e presença diante das câmeras.
            </p>
            <Link href="#trajetoria" className="mt-6 inline-flex text-sm font-semibold text-wine transition hover:text-rose">
              Conheça a trajetória completa
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Portfólio</p>
              <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">Galeria visual</h2>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal/64">
              <Images className="h-5 w-5 text-rose" aria-hidden />
              Fotos para análise editorial e comercial
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <div key={image} className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-mist shadow-sm">
                <Image
                  src={image}
                  alt={`Foto ${index + 1} do portfólio de Maria Eduarda`}
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trajetoria" className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Linha do tempo</p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">Minha trajetória</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/70">
              A trajetória de Maria Eduarda reúne concursos de beleza, passarelas, produção de conteúdo, comunicação e
              representatividade jovem no mercado de moda e beleza de Goiás.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {timeline.map((item) => (
              <article key={item.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                <Star className="mb-5 h-5 w-5 text-rose" aria-hidden />
                <h3 className="font-display text-2xl leading-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Biografia</p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">História completa</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/70">
              Uma leitura editorial da trajetória de Maria Eduarda para marcas, produtores, fotógrafos e parceiros.
            </p>
          </div>
          <div className="prose-sg rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
            {fullBio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[8px] border hairline bg-pearl p-7 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Valor para marcas</p>
            <h2 className="font-display text-4xl leading-tight text-ink">Oportunidades de colaboração</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/72">
              Com carisma, determinação e presença marcante, Maria Eduarda representa uma nova geração de modelos que vai
              além das passarelas. Seu perfil abre espaço para trabalhos publicitários, campanhas de beleza, editoriais,
              eventos, projetos audiovisuais e parcerias com marcas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contato?modelo=maria-eduarda&tipo=evento" className="focus-ring rounded-full bg-rose px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-wine">
                Convidar para evento
              </Link>
              <Link href="/contato?modelo=maria-eduarda&tipo=ensaio" className="focus-ring rounded-full border hairline bg-white px-5 py-3 text-center text-sm font-semibold text-wine transition hover:border-rose hover:text-rose">
                Agendar ensaio ou desfile
              </Link>
            </div>
          </div>

          <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Diferenciais</p>
            <h2 className="font-display text-4xl leading-tight text-ink">Diferenciais profissionais</h2>
            <div className="mt-7 grid gap-3">
              {differentials.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-[8px] bg-pearl p-4 text-sm leading-6 text-charcoal/74">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Patrocínio</p>
            <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">Seja uma marca parceira</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/72">
              Empresas e profissionais podem apoiar uma trajetória que representa beleza, juventude, comunicação,
              elegância e valorização da moda regional goiana.
            </p>
            <p className="mt-4 text-sm leading-7 text-charcoal/72">
              Como Miss Goiás Teen 2025, Maria Eduarda carrega não apenas um título, mas também o compromisso de
              representar Goiás com profissionalismo, autenticidade e inspiração para outras jovens.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {sponsorItems.map((item) => (
              <div key={item} className="rounded-[8px] border hairline bg-white p-5 text-sm leading-7 text-charcoal/74 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-pearl md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blush">Plataforma Shine Girls</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Talentos, histórias e oportunidades para moda, beleza e publicidade.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-pearl/72">
              A Shine Girls conecta modelos, profissionais da moda, marcas e oportunidades, valorizando histórias
              autênticas e talentos que buscam crescimento profissional.
            </p>
          </div>
          <div className="grid gap-4">
            <Link href="/contato?modelo=maria-eduarda&tipo=proposta" className="focus-ring rounded-[8px] bg-pearl p-6 text-ink transition hover:bg-blush">
              <HeartHandshake className="mb-5 h-6 w-6 text-rose" aria-hidden />
              <h3 className="font-display text-2xl">Falar com a Shine Girls</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">Envie uma proposta comercial para Maria Eduarda ou para o casting.</p>
            </Link>
            <Link href="/modelos/cadastro" className="focus-ring rounded-[8px] border border-white/14 p-6 transition hover:border-blush">
              <Users className="mb-5 h-6 w-6 text-blush" aria-hidden />
              <h3 className="font-display text-2xl">Também deseja apresentar sua trajetória?</h3>
              <p className="mt-3 text-sm leading-7 text-pearl/70">Cadastre seu perfil e faça parte da nossa plataforma de talentos.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
