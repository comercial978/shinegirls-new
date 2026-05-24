import type { Metadata } from "next";
import { BarChart3, Image as ImageIcon, Megaphone, Users } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Anunciantes",
  description: "Espacos de publicidade e parcerias para marcas na Shine Girls.",
};

const formats = [
  { title: "Editorial patrocinado", icon: ImageIcon, text: "Conteudo com narrativa, imagem e contexto para marcas de moda, beleza e lifestyle." },
  { title: "Perfil de modelo", icon: Users, text: "Destaques para modelos, influenciadoras e profissionais que buscam vitrine digital." },
  { title: "Campanha social", icon: Megaphone, text: "Chamadas para Instagram, WhatsApp e landing pages de conversao." },
  { title: "Relatorio de performance", icon: BarChart3, text: "Estrutura preparada para mensurar leads, cliques e origem de trafego." },
];

export default function AnunciantesPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Publicidade"
          title="Marcas femininas precisam de contexto, nao apenas espaco de banner."
          text="A pagina antiga de anunciantes misturava ofertas e produtos. A nova proposta transforma publicidade em formatos claros de campanha."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {formats.map((format) => (
            <div key={format.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
              <format.icon className="mb-5 h-7 w-7 text-rose" aria-hidden />
              <h2 className="font-display text-2xl">{format.title}</h2>
              <p className="mt-4 text-sm leading-7 text-charcoal/70">{format.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container-shell mt-12 rounded-[8px] bg-ink p-8 text-pearl md:p-10">
        <h2 className="font-display text-3xl md:text-4xl">Pronta para uma campanha com a Shine Girls?</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-pearl/72">
          O contato comercial foi preservado, mas a experiencia agora aponta para parcerias mais sofisticadas e mensuraveis.
        </p>
        <div className="mt-7">
          <ButtonLink href="/contato" variant="light">
            Solicitar proposta
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
