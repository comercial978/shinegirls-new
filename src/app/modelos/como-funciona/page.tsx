import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Eye, HelpCircle, LockKeyhole, SearchCheck, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Como funciona o Casting Shine Girls | Cadastro de Modelos",
  description:
    "Entenda como funciona o cadastro para modelos, influenciadoras e criadoras de conteúdo no Casting Shine Girls. Crie seu perfil e entre para a curadoria.",
  alternates: {
    canonical: `${site.url}/modelos/como-funciona`,
  },
  openGraph: {
    title: "Como funciona o Casting Shine Girls | Cadastro de Modelos",
    description:
      "Crie seu perfil, envie suas informações e entre para a curadoria que conecta modelos, influenciadoras, moda, beleza e oportunidades profissionais.",
    url: `${site.url}/modelos/como-funciona`,
    images: [{ url: "/legacy/laysa-inverno.jpg", width: 1200, height: 900 }],
  },
};

const steps = [
  {
    title: "1. Você cria seu perfil",
    text: "Preencha seus dados principais, informe sua cidade, área de atuação, Instagram, portfólio e uma breve apresentação sobre você.",
    icon: UserPlus,
  },
  {
    title: "2. A curadoria analisa",
    text: "Nossa equipe avalia as informações enviadas para entender se o perfil está alinhado com a proposta da Shine Girls.",
    icon: SearchCheck,
  },
  {
    title: "3. Seu perfil pode ser aprovado",
    text: "Após a análise, perfis aprovados poderão fazer parte da vitrine Shine Girls e serem considerados para futuras divulgações, parcerias e oportunidades.",
    icon: BadgeCheck,
  },
  {
    title: "4. Você ganha mais visibilidade",
    text: "A proposta é criar uma presença digital mais profissional, conectando imagem, moda, beleza, conteúdo e posicionamento.",
    icon: Eye,
  },
];

const audience = [
  "Modelos",
  "Influenciadoras",
  "Misses",
  "Criadoras de conteúdo",
  "Mulheres ligadas à moda",
  "Profissionais de beleza",
  "Mulheres interessadas em publicidade, eventos e parcerias",
];

const benefits = [
  {
    title: "Mais posicionamento",
    text: "Ter um perfil organizado ajuda a apresentar sua imagem de forma mais profissional.",
  },
  {
    title: "Mais visibilidade",
    text: "A Shine Girls busca criar uma vitrine para conectar talentos femininos ao universo da moda, beleza e publicidade.",
  },
  {
    title: "Mais oportunidades",
    text: "Perfis aprovados poderão ser considerados para futuras ações, conteúdos, parcerias e divulgações.",
  },
];

const faq = [
  {
    question: "O cadastro é pago?",
    answer: "Neste momento, o cadastro é gratuito.",
  },
  {
    question: "Meu perfil aparece automaticamente no site?",
    answer: "Não. Todo cadastro passa por análise da curadoria Shine Girls antes de qualquer publicação.",
  },
  {
    question: "Preciso ser modelo profissional?",
    answer:
      "Não necessariamente. O casting também é voltado para influenciadoras, criadoras de conteúdo, misses, mulheres ligadas à moda, beleza, eventos e publicidade.",
  },
  {
    question: "O casting aceita menores de 18 anos?",
    answer: "Não. Nesta fase, o cadastro da Shine Girls é exclusivo para mulheres com 18 anos ou mais.",
  },
  {
    question: "Quais dados ficam públicos?",
    answer:
      "Apenas informações aprovadas para divulgação, como nome artístico, cidade, categoria, bio, Instagram ou portfólio. Dados sensíveis não serão exibidos publicamente.",
  },
  {
    question: "Como faço meu cadastro?",
    answer: "Basta acessar a página de modelos, clicar em criar cadastro e preencher suas informações.",
  },
];

export default function ComoFuncionaCastingPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-pearl">
        <div className="absolute inset-0">
          <Image src="/legacy/laysa-inverno.jpg" alt="Casting Shine Girls" fill priority sizes="100vw" className="object-cover opacity-44" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/18" />
        </div>
        <div className="container-shell relative grid min-h-[calc(100svh-64px)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.75fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-rose/50 bg-rose/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blush">
              Casting Shine Girls
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">Faça parte do Casting Shine Girls</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/78">
              A Shine Girls está criando uma curadoria profissional para reunir modelos, influenciadoras e mulheres ligadas ao universo da moda, beleza, eventos e publicidade. O cadastro é o
              primeiro passo para conhecermos melhor seu perfil e avaliarmos futuras oportunidades de divulgação, parcerias e ações da marca.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/modelos/cadastro" className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine">
                Criar meu cadastro
              </Link>
              <Link href="#como-funciona" className="focus-ring inline-flex items-center justify-center rounded-full border border-white/22 px-6 py-3 text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
                Entender como funciona
              </Link>
            </div>
          </div>
          <div className="hidden rounded-[8px] border border-white/14 bg-white/10 p-5 backdrop-blur md:block">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blush">Como funciona o Casting Shine Girls?</p>
            <p className="mt-5 font-display text-3xl leading-tight">
              Crie seu perfil, envie suas informações e entre para a curadoria que conecta modelos, influenciadoras, moda, beleza e oportunidades profissionais.
            </p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-pearl py-16 md:py-24">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Processo</p>
            <h2 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">Como funciona</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                <step.icon className="mb-5 h-7 w-7 text-rose" aria-hidden />
                <h3 className="font-display text-2xl leading-tight text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Perfil ideal</p>
            <h2 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">Quem pode se cadastrar?</h2>
            <p className="mt-5 text-base leading-8 text-charcoal/70">
              O casting é voltado para mulheres maiores de 18 anos que desejam construir ou fortalecer sua presença profissional no universo da imagem.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {audience.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-[8px] border hairline bg-pearl p-4 text-sm font-medium text-charcoal/78">
                <Sparkles className="h-4 w-4 shrink-0 text-rose" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-20">
        <div className="container-shell grid gap-5 lg:grid-cols-2">
          <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-9">
            <ShieldCheck className="mb-5 h-7 w-7 text-rose" aria-hidden />
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Cadastro não significa aprovação automática</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/70">
              Todos os perfis passam por análise da curadoria Shine Girls. O objetivo é manter uma vitrine organizada, segura e alinhada com a proposta da marca. Nenhum perfil é publicado
              automaticamente.
            </p>
          </div>
          <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-9">
            <LockKeyhole className="mb-5 h-7 w-7 text-rose" aria-hidden />
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">Seus dados são tratados com cuidado</h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/70">
              As informações enviadas serão usadas apenas para análise de cadastro, contato profissional e possível participação em ações, divulgações e oportunidades relacionadas à Shine Girls.
            </p>
            <p className="mt-4 rounded-[8px] bg-pearl p-4 text-sm leading-7 text-charcoal/72">
              Dados pessoais como telefone e e-mail não serão exibidos publicamente sem autorização.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Benefícios</p>
            <h2 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">Por que fazer parte?</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((item) => (
              <article key={item.title} className="rounded-[8px] border hairline bg-pearl p-6 shadow-sm">
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <HelpCircle className="mb-5 h-8 w-8 text-rose" aria-hidden />
            <h2 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">Perguntas frequentes</h2>
          </div>
          <div className="grid gap-4">
            {faq.map((item) => (
              <article key={item.question} className="rounded-[8px] border hairline bg-white p-5 shadow-sm">
                <h3 className="text-base font-semibold text-ink">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-pearl md:py-24">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blush">Próximo passo</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">Pronta para ser vista com mais profissionalismo?</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-pearl/72">
              Crie seu perfil no Casting Shine Girls e dê o primeiro passo para fazer parte da nossa curadoria.
            </p>
          </div>
          <Link href={`${site.url}/modelos`} className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine">
            Criar meu cadastro agora
          </Link>
        </div>
      </section>
    </>
  );
}
