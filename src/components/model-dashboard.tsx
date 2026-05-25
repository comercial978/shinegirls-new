"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, LogOut, Upload } from "lucide-react";
import { MODEL_CATEGORIES, type ModelProfileRecord, normalizeInstagram } from "@/lib/model-profiles";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type EditableProfile = Pick<ModelProfileRecord, "whatsapp" | "city" | "state" | "instagram" | "category" | "bio" | "portfolio_url" | "main_photo_url">;

const emptyEditableProfile: EditableProfile = {
  whatsapp: "",
  city: "",
  state: "",
  instagram: "",
  category: "modelo",
  bio: "",
  portfolio_url: "",
  main_photo_url: "",
};

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Recusado",
};

const maxPhotoSize = 4 * 1024 * 1024;

async function readPhotoUploadResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as { ok: boolean; publicUrl?: string; message?: string };
  }

  if (response.status === 413) {
    return { ok: false, message: "A foto principal deve ter no maximo 4 MB." };
  }

  return { ok: false, message: "Nao foi possivel enviar a foto agora. Tente novamente." };
}

export function ModelDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<ModelProfileRecord | null>(null);
  const [form, setForm] = useState<EditableProfile>(emptyEditableProfile);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const supabase = createSupabaseBrowserClient();

      if (!supabase) {
        setError("Supabase nao esta configurado.");
        setIsLoading(false);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        router.replace("/modelos/entrar");
        return;
      }

      setUserId(user.id);
      const { data, error: profileError } = await supabase.from("model_profiles").select("*").eq("id", user.id).single();

      if (profileError) {
        setError(profileError.message);
      } else {
        const loadedProfile = data as ModelProfileRecord;
        setProfile(loadedProfile);
        setForm({
          whatsapp: loadedProfile.whatsapp || "",
          city: loadedProfile.city || "",
          state: loadedProfile.state || "",
          instagram: loadedProfile.instagram || "",
          category: loadedProfile.category || "modelo",
          bio: loadedProfile.bio || "",
          portfolio_url: loadedProfile.portfolio_url || "",
          main_photo_url: loadedProfile.main_photo_url || "",
        });
      }

      setIsLoading(false);
    }

    loadProfile();
  }, [router]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    if (!supabase || !userId) {
      setError("Sessao indisponivel.");
      setIsSaving(false);
      return;
    }

    const payload = {
      whatsapp: form.whatsapp,
      city: form.city,
      state: form.state?.toUpperCase(),
      instagram: normalizeInstagram(form.instagram || ""),
      category: form.category,
      bio: form.bio,
      portfolio_url: form.portfolio_url,
      main_photo_url: form.main_photo_url,
      updated_at: new Date().toISOString(),
    };

    const { data, error: updateError } = await supabase.from("model_profiles").update(payload).eq("id", userId).select("*").single();

    if (updateError) {
      setError(updateError.message);
    } else {
      setProfile(data as ModelProfileRecord);
      setMessage("Perfil atualizado. A curadoria Shine Girls continua responsavel pela aprovacao publica.");
    }

    setIsSaving(false);
  }

  async function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;

    setError("");
    setMessage("");

    if (file.size > maxPhotoSize) {
      setError("A foto principal deve ter no maximo 4 MB.");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      setError("Sessao expirada. Entre novamente para enviar a foto.");
      return;
    }

    const formData = new FormData();
    formData.append("main_photo", file);

    setIsPhotoUploading(true);

    try {
      const response = await fetch("/api/modelos/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await readPhotoUploadResponse(response);

      if (!response.ok || !result.ok || !result.publicUrl) {
        setError(result.message || "Nao foi possivel enviar a foto.");
        return;
      }

      setForm((current) => ({ ...current, main_photo_url: result.publicUrl || "" }));
      setMessage(result.message || "Foto enviada. Clique em salvar alteracoes para atualizar o perfil.");
    } catch {
      setError("Nao foi possivel conectar ao servidor para enviar a foto.");
    } finally {
      setIsPhotoUploading(false);
    }
  }

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase?.auth.signOut();
    router.push("/modelos/entrar");
  }

  if (isLoading) {
    return (
      <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 text-sm text-charcoal/70">
          <Loader2 className="h-4 w-4 animate-spin text-rose" aria-hidden />
          Carregando area da modelo...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
        <p className="text-sm leading-7 text-charcoal/72">{error || "Perfil nao encontrado."}</p>
        <Link href="/modelos/cadastro" className="mt-5 inline-flex rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white">
          Criar cadastro
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">Status do cadastro</p>
        <h2 className="mt-4 font-display text-4xl text-ink">{statusLabels[profile.status] || profile.status}</h2>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">
          Seu perfil sera analisado pela curadoria Shine Girls antes de aparecer publicamente.
        </p>
        <div className="mt-6 rounded-[8px] bg-pearl p-4 text-sm leading-7 text-charcoal/72">
          <p className="font-semibold text-ink">{profile.artistic_name}</p>
          <p>{profile.email}</p>
          <p className="mt-3">Criado em {new Date(profile.created_at).toLocaleDateString("pt-BR")}</p>
        </div>
        <button onClick={handleLogout} className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full border hairline px-5 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
          <LogOut className="h-4 w-4" aria-hidden />
          Sair
        </button>
      </aside>

      <form onSubmit={handleSave} className="grid gap-5 rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            WhatsApp
            <input value={form.whatsapp || ""} onChange={(event) => setForm({ ...form, whatsapp: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            Instagram
            <input value={form.instagram || ""} onChange={(event) => setForm({ ...form, instagram: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            Cidade
            <input value={form.city || ""} onChange={(event) => setForm({ ...form, city: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            Estado
            <input value={form.state || ""} onChange={(event) => setForm({ ...form, state: event.target.value })} maxLength={2} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Area de atuacao
          <select value={form.category || "modelo"} onChange={(event) => setForm({ ...form, category: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3">
            {MODEL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Mini bio
          <textarea value={form.bio || ""} onChange={(event) => setForm({ ...form, bio: event.target.value })} className="focus-ring min-h-32 rounded-[8px] border hairline px-4 py-3" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Portfolio ou Instagram
          <input value={form.portfolio_url || ""} onChange={(event) => setForm({ ...form, portfolio_url: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Foto principal
          <span className="inline-flex items-center gap-2 rounded-[8px] border hairline px-4 py-3 text-sm">
            {isPhotoUploading ? <Loader2 className="h-4 w-4 animate-spin text-rose" aria-hidden /> : <Upload className="h-4 w-4 text-rose" aria-hidden />}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={isPhotoUploading} className="w-full text-sm disabled:cursor-not-allowed disabled:opacity-60" />
          </span>
          <span className="text-xs font-normal text-charcoal/56">Envie uma imagem vertical, com ate 4 MB.</span>
        </label>

        {message ? <p className="rounded-[8px] bg-green-50 p-4 text-sm text-green-800">{message}</p> : null}
        {error ? <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}

        <button
          type="submit"
          disabled={isSaving || isPhotoUploading}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Salvar alteracoes
        </button>
      </form>
    </div>
  );
}
