import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, LogIn, ShieldCheck, UserPlus } from "lucide-react";
import { ApprovedModelsSection } from "@/components/approved-models-section";
import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { TrackedLink } from "@/components/tracked-link";
import { models } from "@/content/models";

export const metadata: Metadata = {
  title: "Casting de modelos",
  description: "Conheça o casting editorial da Shine Girls ou crie seu perfil gratuito para participar da curadoria.",
};

function CastingCallout({ compact = false }: { compact?: boolean }) {
  return (
    <section className="overflow-hidden rounded-[8px] border hairline bg-ink text-pearl shadow-soft">
      <div className={`grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] ${compact ? "md:p-8" : "md:p-10"}`}>
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blush">Casting aberto · Cadastro gratuito</p>
          <h2 className={`font-display leading-tight ${compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"}`}>
            Faça parte do casting Shine Girls.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-pearl/76">
            Crie seu perfil, envie suas informações e aguarde a análise da curadoria. Nenhum perfil é publicado automaticamente.
          </p>
          <p className="mt-4 flex items-start gap-2 text-sm leading-7 text-pearl/66">
            <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-blush" aria-hidden />
            E-mail e WhatsApp permanecem protegidos e não aparecem na vitrine pública.
          </p>
        </div>
        <div className="flex flex-col justify-end gap-3 sm:flex-row md:flex-col">
          <TrackedLink
            href="/modelos/cadastro"
            eventName="clicou_criar_cadastro"
            eventData={{ origem: compact ? "fim_casting" : "topo_casting" }}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine"
          >
            <UserPlus className="h-4 w-4" aria-hidden />
            Criar meu perfil
          </TrackedLink>
          <Link href="/modelos/entrar" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-pearl px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blush">
            <LogIn className="h-4 w-4" aria-hidden />
            Já tenho cadastro
          </Link>
          <Link href="/modelos/como-funciona" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
            <HelpCircle className="h-4 w-4" aria-hidden />
            Entenda como funciona
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ModelosPage() {
  return (
    <section className="bg-pearl py-14 md:py-20">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Casting Shine Girls"
          title="Talentos femininos com apresentação profissional."
          text="Conheça perfis aprovados e editoriais da marca ou dê o primeiro passo para participar da nossa curadoria."
        />

        <div className="mt-8">
          <CastingCallout />
        </div>

        <ApprovedModelsSection />

        <section className="mt-16" aria-labelledby="arquivo-editorial-title">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-rose">Perfis editoriais e memória da marca</p>
            <h2 id="arquivo-editorial-title" className="font-display text-4xl leading-tight text-ink md:text-5xl">Histórias que fazem parte da Shine Girls</h2>
            <p className="mt-4 text-sm leading-7 text-charcoal/72">
              Esta seleção reúne perfis editoriais atuais e registros preservados da trajetória da marca. O casting aprovado pelo banco aparece separadamente acima.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <ModelCard key={model.name} model={model} />
            ))}
          </div>
        </section>

        <div className="mt-16">
          <CastingCallout compact />
        </div>
      </div>
    </section>
  );
}
