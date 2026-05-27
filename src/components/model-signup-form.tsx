"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MODEL_CATEGORIES } from "@/lib/model-profiles";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

const maxPhotoSize = 4 * 1024 * 1024;

async function readSignupResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as { ok: boolean; message?: string };
  }

  if (response.status === 413) {
    return { ok: false, message: "A foto está muito pesada. Envie uma imagem com até 4 MB." };
  }

  return { ok: false, message: "Não foi possível criar o cadastro agora. Tente novamente em instantes." };
}

export function ModelSignupForm() {
  const [state, setState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const photo = formData.get("main_photo");

    if (photo instanceof File && photo.size > maxPhotoSize) {
      setState({ type: "error", message: "A foto está muito pesada. Envie uma imagem com até 4 MB." });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/modelos/signup", {
        method: "POST",
        body: formData,
      });
      const result = await readSignupResponse(response);

      if (!response.ok || !result.ok) {
        setState({ type: "error", message: result.message || "Não foi possível criar o cadastro." });
        return;
      }

      form.reset();
      setState({
        type: "success",
        message: result.message || "Cadastro criado com sucesso. Entre para acompanhar sua análise.",
      });
    } catch {
      setState({ type: "error", message: "Não foi possível conectar ao servidor. Tente novamente em instantes." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="grid gap-5 rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-8" onSubmit={handleSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Nome artístico
          <input name="artistic_name" className="focus-ring rounded-[8px] border hairline px-4 py-3" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Nome completo
          <input name="full_name" className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="name" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          E-mail
          <input name="email" type="email" className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="email" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Senha
          <input name="password" type="password" minLength={8} className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="new-password" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          WhatsApp
          <input name="whatsapp" className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="tel" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Instagram
          <input name="instagram" className="focus-ring rounded-[8px] border hairline px-4 py-3" placeholder="@perfil" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Cidade
          <input name="city" className="focus-ring rounded-[8px] border hairline px-4 py-3" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Estado
          <input name="state" className="focus-ring rounded-[8px] border hairline px-4 py-3" maxLength={2} placeholder="SP" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        Área de atuação
        <select name="category" className="focus-ring rounded-[8px] border hairline px-4 py-3" defaultValue="modelo" required>
          {MODEL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        Mini bio
        <textarea name="bio" className="focus-ring min-h-32 rounded-[8px] border hairline px-4 py-3" maxLength={700} />
      </label>

      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        Link de portfólio ou Instagram
        <input name="portfolio_url" type="url" className="focus-ring rounded-[8px] border hairline px-4 py-3" placeholder="https://..." />
      </label>

      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        Foto principal
        <input name="main_photo" type="file" accept="image/*" className="focus-ring rounded-[8px] border hairline px-4 py-3" />
        <span className="text-xs font-normal text-charcoal/56">Opcional. Envie uma imagem vertical, com até 4 MB.</span>
      </label>

      <div className="grid gap-3 rounded-[8px] bg-pearl p-4 text-sm leading-6 text-charcoal/72">
        <label className="flex gap-3">
          <input name="is_adult_confirmed" type="checkbox" required className="mt-1" />
          Confirmo que tenho 18 anos ou mais.
        </label>
        <label className="flex gap-3">
          <input name="terms_accepted" type="checkbox" required className="mt-1" />
          Aceito os termos e a política de privacidade da Shine Girls.
        </label>
        <p>Seus dados serão usados apenas para análise de cadastro, contato profissional e possível participação no casting Shine Girls.</p>
      </div>

      {state.message ? (
        <p className={state.type === "success" ? "rounded-[8px] bg-green-50 p-4 text-sm text-green-800" : "rounded-[8px] bg-red-50 p-4 text-sm text-red-800"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Criar cadastro
        </button>
        <Link href="/modelos/entrar" className="focus-ring rounded-full border hairline px-6 py-3 text-center text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
          Já tenho cadastro
        </Link>
      </div>
    </form>
  );
}
