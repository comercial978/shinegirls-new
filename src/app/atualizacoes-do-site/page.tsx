import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, Rocket, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Atualizações do Site",
  description: "Histórico das principais atualizações realizadas no site Shine Girls, com data, hora e melhorias publicadas.",
  alternates: {
    canonical: `${site.url}/atualizacoes-do-site`,
  },
};

const updates = [
  {
    date: "16/07/2026",
    time: "12:48",
    title: "Experiência do Casting Shine Girls renovada",
    description:
      "A jornada para modelos foi reorganizada para tornar o cadastro mais visível, simples e seguro, desde a página inicial até o acompanhamento pela área logada.",
    items: [
      "Home com destaque para o casting",
      "Novos atalhos de cadastro no menu e no celular",
      "Cadastro organizado em três etapas",
      "Rascunho salvo com privacidade",
      "Termos, privacidade e autorização de imagem",
      "Perfis individuais e status mais claros",
    ],
  },
  {
    date: "13/07/2026",
    time: "11:15",
    title: "Página de atualizações criada",
    description:
      "Nova área pública para registrar as principais melhorias feitas no site Shine Girls com data, hora e resumo das entregas.",
    items: ["Histórico organizado por data", "Link no rodapé", "Página adicionada ao sitemap"],
  },
  {
    date: "09/07/2026",
    time: "12:17",
    title: "Nova seção de notícias para SEO",
    description:
      "Publicada a editoria de notícias com conteúdos sobre moda, modelos, tendências, influência digital e presença feminina.",
    items: ["Página /noticias", "Cinco notícias iniciais", "Schema.org NewsArticle", "URLs incluídas no sitemap"],
  },
  {
    date: "28/05/2026",
    time: "09:22",
    title: "Página explicativa do Casting Shine Girls",
    description:
      "Criada uma página para explicar como funciona o cadastro de modelos, influenciadoras e mulheres ligadas à moda, beleza e publicidade.",
    items: ["Rota /modelos/como-funciona", "FAQ completo", "CTA para cadastro", "SEO específico para casting"],
  },
  {
    date: "27/05/2026",
    time: "13:46",
    title: "Sitemap e robots ajustados para o domínio oficial",
    description:
      "Configuração técnica revisada para orientar a indexação do Google no domínio shinegirls.uaisoftware.com.br.",
    items: ["sitemap.xml atualizado", "robots.txt configurado", "Rotas públicas principais incluídas"],
  },
  {
    date: "27/05/2026",
    time: "10:37",
    title: "Revisão de acentuação e textos",
    description:
      "Correções de acentuação, gramática e pequenos ajustes editoriais para melhorar a leitura e a percepção profissional do site.",
    items: ["Textos revisados", "Acentuação corrigida", "Comunicação mais clara"],
  },
  {
    date: "27/05/2026",
    time: "10:11",
    title: "Foto institucional adicionada",
    description:
      "Atualização da página institucional com imagem da pasta original, preservando a essência visual e emocional da marca.",
    items: ["Foto institucional publicada", "Layout refinado", "Identidade Shine Girls preservada"],
  },
  {
    date: "27/05/2026",
    time: "09:57",
    title: "Página institucional Shine Girls",
    description:
      "Criada a página institucional com a mensagem de origem da marca e a ideia central: Nossa essência nasceu daqui.",
    items: ["Rota /institucional", "Manifesto da marca", "Narrativa de origem"],
  },
  {
    date: "25/05/2026",
    time: "14:33",
    title: "Upload de foto corrigido no dashboard",
    description:
      "Ajuste no envio de foto principal das modelos cadastradas, integrando dashboard, Supabase Storage e políticas de segurança.",
    items: ["Upload funcionando", "Foto salva no perfil", "Validação com Supabase"],
  },
  {
    date: "25/05/2026",
    time: "14:05",
    title: "Cadastro de modelos melhorado",
    description:
      "Correções no fluxo de cadastro para lidar melhor com e-mails já existentes, mensagens de sucesso e envio de foto.",
    items: ["Mensagens mais claras", "Tratamento de e-mail existente", "Cadastro com status pendente"],
  },
  {
    date: "25/05/2026",
    time: "12:22",
    title: "Área logada para modelos",
    description:
      "Implementado o cadastro, login e dashboard das modelos com Supabase, mantendo aprovação manual antes de qualquer publicação pública.",
    items: ["Cadastro e login", "Dashboard protegido", "Status pendente, aprovado ou reprovado", "Base preparada para curadoria"],
  },
];

export default function AtualizacoesDoSitePage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="Histórico"
            title="Atualizações do Site"
            text="Acompanhe as principais melhorias publicadas na plataforma Shine Girls, com data, hora e um resumo do que mudou."
          />
          <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-sm font-semibold text-wine">
              <Clock3 className="h-5 w-5 text-rose" aria-hidden />
              Horários em Brasília
            </div>
            <p className="mt-3 text-sm leading-7 text-charcoal/70">
              Este registro destaca as entregas mais importantes do projeto. Pequenos ajustes técnicos podem não aparecer nesta lista.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5">
          {updates.map((update, index) => (
            <article key={`${update.date}-${update.time}-${update.title}`} className="rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-3 text-sm font-semibold text-charcoal/64">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-rose" aria-hidden />
                      {update.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-rose" aria-hidden />
                      {update.time}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-ink">{update.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-charcoal/72 md:text-base">{update.description}</p>
                </div>
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blush px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-wine">
                  {index === 0 ? <Sparkles className="h-4 w-4" aria-hidden /> : <Rocket className="h-4 w-4" aria-hidden />}
                  {index === 0 ? "Atual" : "Publicado"}
                </div>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {update.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[8px] bg-pearl p-4 text-sm leading-6 text-charcoal/74">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[8px] bg-ink p-7 text-pearl md:p-10">
          <p className="font-display text-3xl leading-tight">Quer acompanhar as novidades principais?</p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-pearl/72">
            As novas páginas, recursos de SEO, melhorias no casting e ajustes importantes serão registrados aqui.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/noticias" className="focus-ring rounded-full bg-rose px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-wine">
              Ver notícias
            </Link>
            <Link href="/modelos/como-funciona" className="focus-ring rounded-full border border-white/18 px-5 py-3 text-center text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
              Como funciona o casting
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
