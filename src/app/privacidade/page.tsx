import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Shine Girls coleta, usa e protege os dados enviados ao casting.",
};

export default function PrivacidadePage() {
  return (
    <section className="bg-pearl py-14 md:py-20">
      <article className="container-shell max-w-4xl">
        <ShieldCheck className="mb-5 h-8 w-8 text-rose" aria-hidden />
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">Privacidade e LGPD</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-ink md:text-6xl">Seus dados são tratados com cuidado.</h1>
        <p className="mt-5 text-sm leading-7 text-charcoal/68">Última atualização: 16 de julho de 2026.</p>

        <div className="prose-sg mt-10 rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          <h2>1. Dados coletados</h2>
          <p>Para analisar o cadastro, podemos coletar nome, e-mail, WhatsApp, cidade, estado, categoria, biografia, redes sociais, portfólio, foto e confirmações de consentimento.</p>

          <h2>2. Como os dados são usados</h2>
          <p>As informações são usadas para criar e proteger a conta, analisar o perfil, realizar contato profissional e avaliar possível participação em conteúdos, editoriais, campanhas, divulgações e parcerias da Shine Girls.</p>

          <h2>3. O que pode ficar público</h2>
          <p>Somente após aprovação poderão ser exibidos nome artístico, cidade e UF, categoria, biografia curta, foto, Instagram ou portfólio. E-mail, senha, WhatsApp e nome completo não são publicados.</p>

          <h2>4. Armazenamento e segurança</h2>
          <p>Contas, perfis e imagens são armazenados em serviços com controles de autenticação e acesso. Senhas são processadas pelo sistema de autenticação e não são salvas manualmente pela Shine Girls.</p>

          <h2>5. Compartilhamento</h2>
          <p>Dados pessoais não são vendidos. O acesso fica restrito aos serviços necessários à operação do site e à curadoria responsável, respeitando a finalidade informada no cadastro.</p>

          <h2>6. Seus direitos</h2>
          <p>Você pode solicitar confirmação de tratamento, correção, atualização, acesso ou exclusão de dados, além de retirar a autorização de publicação, quando aplicável.</p>

          <h2>7. Como solicitar</h2>
          <p>Use a <Link href="/contato" className="font-semibold text-wine underline">página de contato</Link> para exercer seus direitos ou esclarecer dúvidas. Consulte também os <Link href="/termos" className="font-semibold text-wine underline">Termos de Uso</Link>.</p>
        </div>
      </article>
    </section>
  );
}
