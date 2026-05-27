import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Gem, Megaphone, Store, Users } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ModelCard } from "@/components/model-card";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { models } from "@/content/models";
import { posts } from "@/content/posts";
import { pillars } from "@/content/strategy";

export default function HomePage() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-pearl">
        <div className="absolute inset-0">
          <Image
            src="/legacy/laysa-inverno.jpg"
            alt="Editorial Shine Girls"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-48"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/16" />
        </div>
        <div className="container-shell relative grid min-h-[calc(100svh-64px)] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.78fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-rose/50 bg-rose/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blush">
              Moda · Modelos · Publicidade
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">
              A nova vitrine da beleza feminina no digital.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/78">
              Shine Girls evolui para uma plataforma premium de visibilidade, conteúdo e parcerias para modelos,
              influenciadoras e marcas que falam com o universo feminino.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/modelos" variant="light">
                Conhecer modelos
              </ButtonLink>
              <ButtonLink href="/anunciantes" variant="outline" className="border-rose/55 text-pearl hover:border-blush hover:text-blush">
                Anunciar na Shine
              </ButtonLink>
            </div>
          </div>
          <div className="hidden self-end rounded-[8px] border border-white/14 bg-white/10 p-5 backdrop-blur md:block">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ["30", "páginas auditadas"],
                ["17", "posts curados"],
                ["135", "produtos legados descartados"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[8px] bg-white/10 p-4">
                  <p className="font-display text-3xl">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-pearl/64">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Reposicionamento"
            title="A essência foi preservada. O excesso ficou no legado."
            text="A auditoria mostrou uma marca com apelo feminino, conteúdo de modelos, moda, autoestima e publicidade, mas soterrada por WordPress, WooCommerce, dropshipping, shortcodes e plugins."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {pillars.map((item, index) => {
              const icons = [Users, Gem, Megaphone];
              const Icon = icons[index];
              return (
                <div key={item.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-rose" aria-hidden />
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-charcoal/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Casting"
              title="Modelos em destaque"
              text="Perfis reorganizados como portfólio, não como cópia bruta de posts antigos."
            />
            <ButtonLink href="/modelos" variant="outline">
              Ver casting
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <ModelCard key={model.name} model={model} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <SectionHeading
              eyebrow="Editorial"
              title="Moda, autoestima e presença"
              text="O blog foi reduzido ao que fortalece a marca: looks, modelos, beleza e oportunidades comerciais."
            />
            <div className="mt-8 grid gap-3 text-sm text-charcoal/72">
              {["Conteúdo com headings claros", "Imagens com carregamento otimizado", "URLs limpas e metadata dinâmica"].map((item) => (
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

      <section className="bg-ink py-20 text-pearl">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blush">Loja futura</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A loja antiga sai de cena. A nova pode nascer como curadoria.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-pearl/72">
              WooCommerce, AliDropship e catálogos importados foram tratados como legado técnico. A nova estratégia
              abre espaço para uma loja autoral, com drops selecionados, afiliados premium ou parcerias.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/loja" className="rounded-[8px] bg-pearl p-6 text-ink transition hover:bg-blush">
              <Store className="mb-5 h-7 w-7 text-rose" aria-hidden />
              <h3 className="font-display text-2xl">Nova loja</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">Página estratégica pronta para evoluir sem herdar WooCommerce.</p>
            </Link>
            <Link href="/contato" className="rounded-[8px] border border-white/14 p-6 transition hover:border-blush">
              <Megaphone className="mb-5 h-7 w-7 text-blush" aria-hidden />
              <h3 className="font-display text-2xl">Campanhas</h3>
              <p className="mt-3 text-sm leading-7 text-pearl/70">Espaço para anunciantes, marcas e parcerias comerciais.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
