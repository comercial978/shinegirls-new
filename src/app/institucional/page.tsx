import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Users, Wand2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Institucional",
  description: "Conheca a essencia da Shine Girls, uma marca criada para autoestima, beleza feminina e mulheres que brilham.",
};

const manifesto = [
  {
    title: "Autoestima como pratica",
    text: "O brilho nao aparece apenas nos dias faceis. Ele tambem nasce do cuidado diario, da pausa, da respiracao e da decisao de nao se abandonar.",
  },
  {
    title: "Liberdade para ser",
    text: "A Shine Girls preserva a ideia original de que cada mulher tem uma forma propria de existir, se expressar e ocupar espaco.",
  },
  {
    title: "Beleza com historia",
    text: "Mais do que imagem, a marca valoriza trajetorias, fases, sonhos, talentos e a energia unica de cada perfil feminino.",
  },
  {
    title: "Visibilidade com curadoria",
    text: "A nova plataforma transforma esse sentimento em casting, editorial, conteudo e oportunidades profissionais.",
  },
];

const rituals = [
  "Cuidar da imagem sem se comparar.",
  "Organizar a rotina para abrir espaco para si.",
  "Escolher companhias que respeitam sua energia.",
  "Ter metas, movimento e pensamentos mais gentis.",
  "Honrar a propria historia antes de buscar aprovacao externa.",
  "Lembrar que nenhuma fase define todo o seu brilho.",
];

const icons = [Heart, Sparkles, Wand2, Users];

export default function InstitucionalPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-pearl">
        <div className="absolute inset-0">
          <Image
            src="/legacy/brand-editorial.jpeg"
            alt="Essencia visual Shine Girls"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-42"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/24" />
        </div>
        <div className="container-shell relative grid min-h-[72svh] items-center py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-rose/50 bg-rose/18 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blush">
              Institucional
            </p>
            <h1 className="font-display text-5xl leading-[0.98] md:text-7xl">
              Nossa essencia nasceu daqui.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-pearl/78">
              Antes de ser uma plataforma, Shine Girls foi uma mensagem para garotas que brilham: mulheres reais,
              sensiveis, fortes, criativas e livres para serem felizes do proprio jeito.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Origem"
              title="Garotas que brilham: o sentimento que deu nome ao projeto."
              text="O arquivo institucional antigo revela uma marca nascida de autoestima, acolhimento e desejo de falar com um publico feminino de maneira proxima."
            />
            <div className="relative mt-10 aspect-[5/4] overflow-hidden rounded-[8px] bg-white shadow-soft ring-1 ring-rose/10">
              <Image
                src="/institucional/melina-1024x819.png.webp"
                alt="Melina, origem institucional Shine Girls"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          <div className="prose-sg rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
            <p>
              No texto original, Mel apresenta a Shine Girls como uma conversa direta com mulheres que vivem fases,
              insegurancas, sonhos e vontade de se expressar. A marca nasce desse lugar humano: um convite para se
              cuidar, nao se comparar e reconhecer a propria luz.
            </p>
            <p>
              A nova Shine Girls preserva essa raiz emocional, mas evolui a forma. O que antes era um manifesto
              espontaneo agora se transforma em uma plataforma editorial, profissional e preparada para conectar
              modelos, influenciadoras, marcas e anunciantes.
            </p>
            <h2>O que a marca acredita</h2>
            <p>
              Cada mulher tem uma historia, uma presenca e um brilho que nao precisa caber em rotulos. A Shine Girls
              existe para dar visibilidade a essa singularidade com beleza, responsabilidade e curadoria.
            </p>
            <div className="mt-8 rounded-[8px] bg-pearl p-5">
              <p className="font-display text-3xl leading-tight text-ink">
                Brilhe garota, porque sua historia e so sua.
              </p>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">
                Uma leitura atual da mensagem original: autoestima, liberdade, imagem e oportunidade caminhando juntas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Manifesto"
              title="A beleza da Shine Girls e editorial, mas tambem emocional."
              text="O reposicionamento premium nao apaga a origem. Ele organiza a mensagem em pilares claros para a nova fase da marca."
            />
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {manifesto.map((item, index) => {
              const Icon = icons[index];
              return (
                <article key={item.title} className="rounded-[8px] border hairline bg-pearl p-6 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-rose" aria-hidden />
                  <h2 className="font-display text-2xl leading-tight text-ink">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-charcoal/70">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-16 md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="Cuidado"
            title="Autoestima tambem se constroi em pequenos rituais."
            text="A antiga carta falava de quarto organizado, cabelo hidratado, respiracao, estudo, movimento e pensamentos positivos. A nova plataforma traduz isso em uma cultura de autocuidado e presenca."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {rituals.map((item) => (
              <div key={item} className="rounded-[8px] border hairline bg-white p-5 text-sm leading-7 text-charcoal/74 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-pearl md:py-24">
        <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-blush">Nova fase</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Do manifesto ao casting: uma plataforma para mulheres que querem aparecer com proposito.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-pearl/72">
              A Shine Girls segue feminina, rosa, sensivel e visual. Agora tambem e mais rapida, profissional,
              responsiva e pronta para curadoria de modelos, conteudo e parcerias.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link href="/modelos" className="focus-ring rounded-[8px] bg-pearl p-6 text-ink transition hover:bg-blush">
              <h3 className="font-display text-2xl">Conhecer modelos</h3>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">Veja o casting editorial e os perfis aprovados pela curadoria.</p>
            </Link>
            <Link href="/contato" className="focus-ring rounded-[8px] border border-white/14 p-6 transition hover:border-blush">
              <h3 className="font-display text-2xl">Falar com a Shine Girls</h3>
              <p className="mt-3 text-sm leading-7 text-pearl/70">Abra conversa para campanhas, parcerias e oportunidades comerciais.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
