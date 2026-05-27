import type { Metadata } from "next";
import { Gem, PackageCheck, ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Loja",
  description: "Nova frente de loja da Shine Girls, preparada para curadoria futura sem WooCommerce legado.",
};

export default function LojaPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="Nova loja"
          title="A loja será reconstruída do zero, com curadoria e identidade."
          text="O WooCommerce antigo foi ignorado por estratégia: havia catálogo importado, categorias duplicadas e baixa coerência de marca. Esta página deixa o terreno pronto para uma loja nova."
        />
        <div className="grid gap-4">
          {[
            { icon: ShoppingBag, title: "Drops selecionados", text: "Coleções menores, editoriais e alinhadas ao posicionamento da Shine Girls." },
            { icon: Gem, title: "Produtos com narrativa", text: "Menos catálogo genérico, mais desejo, imagem e recomendação." },
            { icon: PackageCheck, title: "Stack flexível", text: "Pronta para Shopify, Stripe, Mercado Pago, CMS headless ou afiliados premium." },
          ].map((item) => (
            <div key={item.title} className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
              <item.icon className="mb-4 h-7 w-7 text-rose" aria-hidden />
              <h2 className="font-display text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-charcoal/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="container-shell mt-12">
        <div className="rounded-[8px] bg-ink p-8 text-pearl md:p-10">
          <h2 className="font-display text-3xl">Quer ser avisada quando a nova curadoria abrir?</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-pearl/72">
            A base visual e técnica já está pronta para evoluir sem carregar o peso do e-commerce antigo.
          </p>
          <div className="mt-7">
            <ButtonLink href="/contato" variant="light">
              Entrar em contato
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
