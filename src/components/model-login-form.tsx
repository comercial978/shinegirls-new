"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function ModelLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase não está configurado.");
      return;
    }

    setIsSubmitting(true);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (loginError) {
      setError(loginError.message);
      return;
    }

    router.push("/modelos/dashboard");
    router.refresh();
  }

  async function handleResetPassword() {
    setError("");
    setMessage("");

    if (!email) {
      setError("Informe seu e-mail para recuperar a senha.");
      return;
    }

    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError("Supabase não está configurado.");
      return;
    }

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/modelos/dashboard`,
    });

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMessage("Enviamos um link de recuperação para o seu e-mail.");
  }

  return (
    <form className="grid gap-5 rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-8" onSubmit={handleLogin}>
      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        E-mail
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="email" required />
      </label>
      <label className="grid gap-2 text-sm font-medium text-charcoal/78">
        Senha
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="focus-ring rounded-[8px] border hairline px-4 py-3" autoComplete="current-password" required />
      </label>

      {error ? <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}
      {message ? <p className="rounded-[8px] bg-green-50 p-4 text-sm text-green-800">{message}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-pearl transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        Entrar
      </button>

      <div className="flex flex-col gap-3 text-sm text-charcoal/68 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={handleResetPassword} className="focus-ring rounded-full text-left font-semibold text-wine">
          Recuperar senha
        </button>
        <Link href="/modelos/cadastro" className="focus-ring rounded-full font-semibold text-wine">
          Criar cadastro
        </Link>
      </div>
    </form>
  );
}
