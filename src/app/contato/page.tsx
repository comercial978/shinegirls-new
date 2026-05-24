import type { Metadata } from "next";
import { AtSign, Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Shine Girls para modelos, publicidade, parcerias e imprensa.",
};

export default function ContatoPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos falar sobre imagem, campanha ou parceria."
          text="O contato legado foi preservado e reorganizado para atender modelos, anunciantes e marcas."
        />
        <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          <div className="grid gap-4">
            <a href={`mailto:${site.email}`} className="focus-ring flex items-center gap-4 rounded-[8px] bg-pearl p-5 transition hover:bg-blush">
              <Mail className="h-6 w-6 text-rose" aria-hidden />
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-charcoal/56">E-mail</span>
                <span className="font-medium">{site.email}</span>
              </span>
            </a>
            <a href="https://wa.me/5534988977879" className="focus-ring flex items-center gap-4 rounded-[8px] bg-pearl p-5 transition hover:bg-blush">
              <MessageCircle className="h-6 w-6 text-rose" aria-hidden />
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-charcoal/56">WhatsApp</span>
                <span className="font-medium">{site.whatsapp}</span>
              </span>
            </a>
            <a href={site.instagram} className="focus-ring flex items-center gap-4 rounded-[8px] bg-pearl p-5 transition hover:bg-blush">
              <AtSign className="h-6 w-6 text-rose" aria-hidden />
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-charcoal/56">Instagram</span>
                <span className="font-medium">@shinegirls.com.br</span>
              </span>
            </a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
