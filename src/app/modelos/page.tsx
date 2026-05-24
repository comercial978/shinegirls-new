import type { Metadata } from "next";
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
          title="Perfis femininos com apresentacao profissional."
          text="A antiga pagina de modelos foi reorganizada como portfolio editorial, com foco em clareza, imagem e potencial de parceria."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((model) => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
      </div>
    </section>
  );
}
