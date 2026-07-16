import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do site e do Casting Shine Girls.",
};

export default function TermosPage() {
  return (
    <section className="bg-pearl py-14 md:py-20">
      <article className="container-shell max-w-4xl">
        <FileCheck2 className="mb-5 h-8 w-8 text-rose" aria-hidden />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">Transparência</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-ink md:text-6xl">Termos de Uso</h1>
        <p className="mt-5 text-sm leading-7 text-charcoal/68">Última atualização: 16 de julho de 2026.</p>

        <div className="prose-sg mt-10 rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          <h2>1. Sobre a Shine Girls</h2>
          <p>A Shine Girls é uma plataforma editorial e de curadoria de talentos femininos ligada aos universos de moda, beleza, influência, eventos e publicidade.</p>

          <h2>2. Cadastro no casting</h2>
          <p>O cadastro é gratuito e destinado exclusivamente a pessoas com 18 anos ou mais. O envio das informações não garante aprovação, publicação, contratação ou participação em campanhas.</p>

          <h2>3. Curadoria e publicação</h2>
          <p>Todos os perfis passam por análise. Somente perfis aprovados poderão ser publicados, utilizando apenas informações profissionais autorizadas, como nome artístico, cidade, categoria, biografia, foto, Instagram ou portfólio.</p>

          <h2>4. Imagem e informações profissionais</h2>
          <p>Ao enviar o cadastro, a candidata declara ter direito de uso sobre as fotos e informações fornecidas. A autorização de publicação vale apenas para apresentação editorial e profissional relacionada à Shine Girls e pode ser revogada mediante solicitação.</p>

          <h2>5. Responsabilidades</h2>
          <p>A candidata se compromete a fornecer dados verdadeiros, manter sua conta protegida e não enviar conteúdo que viole direitos de terceiros. A Shine Girls pode solicitar ajustes, recusar ou retirar perfis que não estejam alinhados à proposta da plataforma.</p>

          <h2>6. Privacidade</h2>
          <p>O tratamento dos dados segue a <Link href="/privacidade" className="font-semibold text-wine underline">Política de Privacidade</Link>. E-mail, telefone e outros dados sensíveis não são exibidos publicamente.</p>

          <h2>7. Contato</h2>
          <p>Dúvidas, correções ou pedidos de retirada podem ser enviados pela <Link href="/contato" className="font-semibold text-wine underline">página de contato</Link>.</p>
        </div>
      </article>
    </section>
  );
}
