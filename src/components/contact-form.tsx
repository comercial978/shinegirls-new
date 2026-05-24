"use client";

import { useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { site } from "@/content/site";

const whatsappNumber = "5534988977879";

type ContactPayload = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

function buildMessage(payload: ContactPayload) {
  return [
    "Novo contato pelo site Shine Girls",
    "",
    `Nome: ${payload.nome}`,
    `E-mail: ${payload.email}`,
    `Assunto: ${payload.assunto}`,
    "",
    payload.mensagem,
  ].join("\n");
}

export function ContactForm() {
  const [lastMessage, setLastMessage] = useState("");

  const fallbackEmailHref = useMemo(() => {
    const subject = encodeURIComponent("Novo contato pelo site Shine Girls");
    const body = encodeURIComponent(lastMessage || "Ola, gostaria de falar com a Shine Girls.");
    return `mailto:${site.email}?subject=${subject}&body=${body}`;
  }, [lastMessage]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      nome: String(formData.get("nome") || ""),
      email: String(formData.get("email") || ""),
      assunto: String(formData.get("assunto") || "Contato"),
      mensagem: String(formData.get("mensagem") || ""),
    };
    const message = buildMessage(payload);
    const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setLastMessage(message);
    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-8">
      <form className="grid gap-4" onSubmit={handleSubmit}>
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
          Enviar pelo WhatsApp
        </button>
      </form>

      {lastMessage ? (
        <div className="mt-5 rounded-[8px] bg-pearl p-5 text-sm leading-7 text-charcoal/72">
          <p className="font-semibold text-ink">A mensagem foi preparada.</p>
          <p className="mt-1">Se o WhatsApp nao abrir automaticamente, use uma das opcoes abaixo.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-4 py-2 font-semibold text-white transition hover:bg-wine"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lastMessage)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Abrir WhatsApp
            </a>
            <a
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border hairline px-4 py-2 font-semibold text-ink transition hover:border-rose hover:text-wine"
              href={fallbackEmailHref}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Enviar por e-mail
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
