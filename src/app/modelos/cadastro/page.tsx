import type { Metadata } from "next";
import { ModelSignupForm } from "@/components/model-signup-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Cadastro de modelo",
  description: "Crie seu perfil para participar da curadoria Shine Girls.",
};

export default function CadastroModeloPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionHeading
          eyebrow="Casting Shine Girls"
          title="Crie seu perfil para a curadoria."
          text="Envie suas informacoes profissionais e aguarde aprovacao antes de qualquer exibicao publica."
        />
        <ModelSignupForm />
      </div>
    </section>
  );
}
