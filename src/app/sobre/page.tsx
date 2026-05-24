import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { opportunities } from "@/content/strategy";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheca a nova fase da Shine Girls e a evolucao do projeto original.",
};

export default function SobrePage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="sticky top-24">
          <SectionHeading
            eyebrow="Quem somos"
            title="Uma evolucao premium para uma marca que nasceu da beleza feminina."
            text="O legado descrevia a Shine Girls como uma plataforma para divulgacao de modelos, moda, e-commerce e produtos femininos. A nova versao concentra essa energia em imagem, conteudo e parcerias."
          />
          <div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-[8px] bg-mist shadow-soft">
            <Image src="/legacy/brand-editorial.jpeg" alt="Arquivo visual Shine Girls" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="prose-sg rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          <p>
            A Shine Girls surgiu em 2019 com uma ideia simples: ouvir o universo feminino, dar visibilidade a modelos
            e criar um espaco digital onde beleza, moda e oportunidade comercial pudessem se encontrar.
          </p>
          <p>
            A auditoria encontrou uma marca com forte apelo emocional, mas presa a uma estrutura antiga: temas WordPress,
            WooCommerce, plugins de cache, loja importada, shortcodes e conteudo duplicado. A reconstrucao transforma
            esse material em uma experiencia editorial limpa, responsiva e preparada para crescer.
          </p>
          <h2>O que permanece</h2>
          <p>
            Permanecem a identidade feminina, o foco em modelos, a comunicacao de autoestima, a possibilidade de
            publicidade e o desejo de conectar pessoas, marcas e moda.
          </p>
          <h2>O que muda</h2>
          <p>
            Sai a dependencia de WordPress. Sai a loja herdada. Entra uma plataforma moderna, rapida, com arquitetura de
            componentes, SEO tecnico e espaco para um CMS ou e-commerce futuro quando a estrategia estiver madura.
          </p>
          <div className="mt-8 grid gap-3">
            {opportunities.map((item) => (
              <div key={item} className="rounded-[8px] bg-pearl p-4 text-sm leading-7 text-charcoal/76">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
