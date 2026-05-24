import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

export const metadata: Metadata = {
  title: "Mensagem enviada",
  description: "Obrigado por entrar em contato com a Shine Girls.",
};

export default function ObrigadoPage() {
  return (
    <section className="bg-pearl py-24">
      <div className="container-shell max-w-2xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose text-white">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </div>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-rose">Mensagem enviada</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink">Obrigada pelo contato.</h1>
        <p className="mt-5 text-base leading-8 text-charcoal/72">
          Recebemos sua mensagem e a equipe Shine Girls vai responder assim que possivel.
        </p>
        <div className="mt-8">
          <ButtonLink href="/">Voltar para Home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
