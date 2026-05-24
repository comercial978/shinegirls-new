import type { Metadata } from "next";
import { AtSign, Mail, MessageCircle } from "lucide-react";
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
          <form className="mt-8 grid gap-4" action={`https://formsubmit.co/${site.email}`} method="POST">
            <input type="hidden" name="_subject" value="Novo contato pelo site Shine Girls" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`${site.url}/obrigado`} />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              Nome
              <input className="focus-ring rounded-[8px] border hairline bg-white px-4 py-3" name="nome" autoComplete="name" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              E-mail
              <input className="focus-ring rounded-[8px] border hairline bg-white px-4 py-3" name="email" type="email" autoComplete="email" required />
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              Assunto
              <select className="focus-ring rounded-[8px] border hairline bg-white px-4 py-3" name="assunto" defaultValue="Parcerias">
                <option value="Parcerias">Parcerias</option>
                <option value="Anunciar no site">Anunciar no site</option>
                <option value="Modelos">Modelos</option>
                <option value="Imprensa">Imprensa</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              Mensagem
              <textarea className="focus-ring min-h-36 rounded-[8px] border hairline bg-white px-4 py-3" name="mensagem" required />
            </label>
            <button className="focus-ring rounded-full bg-ink px-6 py-3 text-sm font-semibold text-pearl transition hover:bg-wine" type="submit">
              Enviar mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
