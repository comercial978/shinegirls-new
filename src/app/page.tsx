import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Eye, Megaphone, SearchCheck, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { AnalyticsEvent } from "@/components/analytics-event";
import { ModelCard } from "@/components/model-card";
import { NewsCard } from "@/components/news-card";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { models } from "@/content/models";
import { news } from "@/content/news";
import { posts } from "@/content/posts";
import { pillars } from "@/content/strategy";

const castingSteps = [
  { title: "Crie seu perfil", text: "Conte quem você é e apresente sua imagem profissional.", icon: UserPlus },
  { title: "Passe pela curadoria", text: "Cada cadastro é analisado antes de qualquer publicação.", icon: SearchCheck },
  { title: "Ganhe presença", text: "Perfis aprovados integram uma vitrine feminina organizada.", icon: Eye },
  { title: "Acesse oportunidades", text: "Seja considerada para conteúdos, campanhas e parcerias.", icon: Sparkles },
];

export default function HomePage() {
  const featuredPosts = posts.slice(0, 3);
  const featuredNews = news.slice(0, 3);

  return (
    <>
      <AnalyticsEvent name="visitou_home" />
      <section className="relative overflow-hidden bg-ink text-pearl">
        <div className="absolute inset-0">
          <Image
            src="/legacy/laysa-inverno.jpg"
            alt="Modelo em editorial de moda Shine Girls"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/18" />
        </div>
        <div className="container-shell relative grid min-h-[calc(100svh-128px)] items-center gap-10 py-14 lg:grid-cols-[1.08fr_0.72fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-rose/50 bg-rose/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blush">
              Casting aberto · Cadastro gratuito
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">
              Faça sua imagem ganhar presença profissional.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/82">
              Crie seu perfil e participe da curadoria Shine Girls para modelos, influenciadoras, misses e criadoras de conteúdo. Seus dados de contato permanecem protegidos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/modelos/cadastro"
                eventName="clicou_criar_cadastro"
                eventData={{ origem: "hero_home" }}
                className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine"
              >
                Quero entrar para o casting
              </TrackedLink>
              <TrackedLink
                href="/modelos/como-funciona"
                eventName="clicou_casting"
                eventData={{ origem: "hero_home", destino: "como_funciona" }}
                className="focus-ring inline-flex items-center justify-center rounded-full border border-white/24 px-6 py-3 text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush"
              >
                Ver como funciona
              </TrackedLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-pearl/72">
              Cadastro gratuito · Perfis publicados somente após análise · E-mail e WhatsApp não ficam públicos
            </p>
          </div>

          <div className="hidden border-l border-white/18 pl-8 lg:grid lg:gap-5">
            {castingSteps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[32px_1fr] gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/12 text-xs font-bold text-blush">{index + 1}</span>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-pearl/66">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Por que participar"
            title="Sua imagem apresentada com intenção, cuidado e profissionalismo."
            text="A Shine Girls reúne talentos femininos em uma vitrine editorial preparada para aproximar perfis, conteúdo e oportunidades de marca."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((item, index) => {
              const icons = [Eye, ShieldCheck, Megaphone];
              const Icon = icons[index];
              return (
                <article key={item.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-rose" aria-hidden />
                  <h2 className="font-display text-2xl">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-charcoal/72">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Casting"
              title="Talentos femininos em destaque"
              text="Conheça modelos, influenciadoras e misses que transformam imagem, comunicação e presença em possibilidades profissionais."
            />
            <TrackedLink
              href="/modelos"
              eventName="clicou_casting"
              eventData={{ origem: "home_modelos" }}
              className="focus-ring inline-flex items-center justify-center rounded-full border hairline px-5 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine"
            >
              Conhecer o casting
            </TrackedLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {models.slice(0, 4).map((model) => (
              <ModelCard key={model.name} model={model} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-20">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Jornada transparente"
            title="Quatro passos para fazer parte"
            text="O cadastro é simples, gratuito e não gera publicação automática. A curadoria avalia cada perfil antes de apresentá-lo ao público."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {castingSteps.map((step, index) => (
              <article key={step.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between">
                  <step.icon className="h-6 w-6 text-rose" aria-hidden />
                  <span className="text-xs font-bold text-charcoal/44">0{index + 1}</span>
                </div>
                <h2 className="font-display text-2xl text-ink">{step.title}</h2>
                <p className="mt-3 text-sm leading-7 text-charcoal/70">{step.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/modelos/cadastro"
              eventName="clicou_criar_cadastro"
              eventData={{ origem: "passos_home" }}
              className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine"
            >
              Criar meu perfil
            </TrackedLink>
            <Link href="/modelos/como-funciona" className="focus-ring inline-flex items-center justify-center rounded-full border hairline px-6 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
              Entender todos os detalhes
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Editorial"
              title="Moda, autoestima e presença"
              text="Conteúdo para quem quer desenvolver imagem, repertório e posicionamento no universo feminino."
            />
            <div className="mt-8 grid gap-3 text-sm text-charcoal/72">
              {["Referências de moda e beleza", "Orientações para modelos e criadoras", "Tendências de imagem e presença digital"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-sage" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {featuredPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Notícias"
              title="Tendências para modelos, moda e presença digital"
              text="Informação atual para acompanhar o mercado, fortalecer sua imagem e descobrir novas possibilidades profissionais."
            />
            <Link href="/noticias" className="focus-ring inline-flex items-center justify-center rounded-full border hairline px-5 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
              Ver notícias
            </Link>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredNews.map((article, index) => (
              <NewsCard key={article.slug} article={article} priority={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-pearl md:py-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="border-b border-white/14 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
              <UserPlus className="mb-5 h-7 w-7 text-blush" aria-hidden />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blush">Quero fazer parte</p>
              <h2 className="mt-4 font-display text-4xl leading-tight">Apresente seu talento à curadoria Shine Girls.</h2>
              <p className="mt-5 text-sm leading-7 text-pearl/72">Para modelos, influenciadoras, misses e criadoras de conteúdo maiores de 18 anos.</p>
              <TrackedLink
                href="/modelos/cadastro"
                eventName="clicou_criar_cadastro"
                eventData={{ origem: "cta_final_home" }}
                className="focus-ring mt-7 inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine"
              >
                Entrar para o casting
              </TrackedLink>
            </div>
            <div className="lg:pl-4">
              <Megaphone className="mb-5 h-7 w-7 text-blush" aria-hidden />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blush">Quero contratar ou anunciar</p>
              <h2 className="mt-4 font-display text-4xl leading-tight">Conecte sua marca a talentos femininos.</h2>
              <p className="mt-5 text-sm leading-7 text-pearl/72">Para marcas, agências e parceiros que buscam campanhas, conteúdo e presença qualificada.</p>
              <Link href="/anunciantes" className="focus-ring mt-7 inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
                Conhecer oportunidades
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
