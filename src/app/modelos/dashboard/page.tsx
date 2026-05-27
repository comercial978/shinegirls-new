import type { Metadata } from "next";
import { ModelDashboard } from "@/components/model-dashboard";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Dashboard da modelo",
  description: "Área protegida para modelos cadastradas na Shine Girls.",
};

export default function DashboardModeloPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Dashboard"
          title="Seu perfil Shine Girls."
          text="Edite suas informações profissionais e acompanhe o status da curadoria."
        />
        <div className="mt-10">
          <ModelDashboard />
        </div>
      </div>
    </section>
  );
}
