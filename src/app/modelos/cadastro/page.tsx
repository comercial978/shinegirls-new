import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { ModelSignupForm } from "@/components/model-signup-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Cadastro de modelo",
  description: "Crie seu perfil para participar da curadoria Shine Girls.",
  robots: { index: false, follow: false },
};

export default function CadastroModeloPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <div>
          <SectionHeading
            eyebrow="Casting Shine Girls"
            title="Crie seu perfil para a curadoria."
            text="O cadastro é gratuito, leva poucos minutos e nunca gera publicação automática."
          />
          <div className="mt-8 grid gap-4 rounded-[8px] border hairline bg-white p-5 text-sm leading-7 text-charcoal/72 shadow-sm">
            {["Três etapas curtas e objetivas", "Dados de contato protegidos", "Acompanhamento pela área da modelo"].map((item) => (
              <p key={item} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-sage" aria-hidden />{item}</p>
            ))}
            <p className="flex items-start gap-3 border-t hairline pt-4"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-rose" aria-hidden />Cadastro exclusivo para mulheres maiores de 18 anos.</p>
          </div>
        </div>
        <ModelSignupForm />
      </div>
    </section>
  );
}
