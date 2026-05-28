import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, LogIn, UserPlus } from "lucide-react";
import { ApprovedModelsSection } from "@/components/approved-models-section";
import { ModelCard } from "@/components/model-card";
import { SectionHeading } from "@/components/section-heading";
import { models } from "@/content/models";

export const metadata: Metadata = {
  title: "Modelos",
  description: "Casting editorial da Shine Girls com modelos e influenciadoras em destaque.",
};

export default function ModelosPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Casting"
          title="Perfis femininos com apresentação profissional."
          text="A antiga página de modelos foi reorganizada como portfólio editorial, com foco em clareza, imagem e potencial de parceria."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>

        <section className="mt-16 overflow-hidden rounded-[8px] border hairline bg-ink text-pearl shadow-soft">
          <div className="grid gap-8 p-7 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-blush">Faça parte do casting Shine Girls</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">Crie seu perfil e entre para a curadoria.</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-pearl/74">
                Crie seu perfil, envie suas informações e aguarde aprovação da curadoria Shine Girls.
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-pearl/62">
                Seus dados serão usados apenas para análise de cadastro, contato profissional e possível participação no casting Shine Girls.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row md:flex-col">
              <Link href="/modelos/cadastro" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine">
                <UserPlus className="h-4 w-4" aria-hidden />
                Criar cadastro
              </Link>
              <Link href="/modelos/entrar" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-pearl px-6 py-3 text-sm font-semibold text-ink transition hover:bg-blush">
                <LogIn className="h-4 w-4" aria-hidden />
                Entrar
              </Link>
              <Link href="/modelos/como-funciona" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/18 px-6 py-3 text-sm font-semibold text-pearl transition hover:border-blush hover:text-blush">
                <HelpCircle className="h-4 w-4" aria-hidden />
                Entenda como funciona
              </Link>
            </div>
          </div>
        </section>

        <ApprovedModelsSection />
      </div>
    </section>
  );
}
