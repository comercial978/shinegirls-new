import type { Metadata } from "next";
import { ModelLoginForm } from "@/components/model-login-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Entrar como modelo",
  description: "Acesse sua area de modelo na Shine Girls.",
};

export default function EntrarModeloPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <SectionHeading
          eyebrow="Area da modelo"
          title="Entre para acompanhar seu cadastro."
          text="Atualize seus dados, acompanhe o status e mantenha seu perfil pronto para avaliacao da curadoria."
        />
        <ModelLoginForm />
      </div>
    </section>
  );
}
