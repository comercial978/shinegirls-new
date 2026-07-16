"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, CircleDashed, Clock3, Loader2, LogOut, Upload } from "lucide-react";
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
  pending: "Em análise",
  approved: "Aprovado",
  rejected: "Ajustes solicitados",
};

const statusDescriptions: Record<string, string> = {
  pending: "Seu perfil foi recebido e está aguardando a avaliação da curadoria Shine Girls.",
  approved: "Seu perfil foi aprovado e já pode integrar a vitrine pública da Shine Girls.",
  rejected: "A curadoria identificou que o perfil precisa de ajustes antes de uma nova análise.",
};

const ufOptions = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

const maxPhotoSize = 4 * 1024 * 1024;

async function readPhotoUploadResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return (await response.json()) as { ok: boolean; publicUrl?: string; message?: string };
  }

  if (response.status === 413) {
    return { ok: false, message: "A foto principal deve ter no máximo 4 MB." };
  }

  return { ok: false, message: "Não foi possível enviar a foto agora. Tente novamente." };
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
        setError("Supabase não está configurado.");
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
      setError("Sessão indisponível.");
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
      setMessage("Perfil atualizado. A curadoria Shine Girls continua responsável pela aprovação pública.");
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
      setError("A foto principal deve ter no máximo 4 MB.");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      setError("Sessão expirada. Entre novamente para enviar a foto.");
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
        setError(result.message || "Não foi possível enviar a foto.");
        return;
      }

      setForm((current) => ({ ...current, main_photo_url: result.publicUrl || "" }));
      setMessage(result.message || "Foto enviada. Clique em salvar alterações para atualizar o perfil.");
    } catch {
      setError("Não foi possível conectar ao servidor para enviar a foto.");
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
          Carregando área da modelo...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
        <p className="text-sm leading-7 text-charcoal/72">{error || "Perfil não encontrado."}</p>
        <Link href="/modelos/cadastro" className="mt-5 inline-flex rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white">
          Criar cadastro
        </Link>
      </div>
    );
  }

  const isProfileIncomplete = !profile.city || !profile.state || !profile.category || !profile.bio;
  const visibleStatus = profile.status === "pending" && isProfileIncomplete ? "Cadastro incompleto" : statusLabels[profile.status] || profile.status;
  const visibleDescription = profile.status === "pending" && isProfileIncomplete
    ? "Complete cidade, estado e mini bio para deixar sua apresentação pronta para análise."
    : statusDescriptions[profile.status];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">Status do cadastro</p>
        <h2 className="mt-4 font-display text-4xl text-ink">{visibleStatus}</h2>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">
          {visibleDescription} Nenhum perfil aparece publicamente sem aprovação.
        </p>
        <div className="mt-6 grid gap-3" aria-label="Etapas do cadastro">
          <div className="flex items-center gap-3 rounded-[8px] bg-pearl p-3 text-sm text-charcoal/72">
            {isProfileIncomplete ? <CircleDashed className="h-5 w-5 text-rose" aria-hidden /> : <CheckCircle2 className="h-5 w-5 text-sage" aria-hidden />}
            Cadastro {isProfileIncomplete ? "a completar" : "completo"}
          </div>
          <div className="flex items-center gap-3 rounded-[8px] bg-pearl p-3 text-sm text-charcoal/72">
            {profile.status === "pending" ? <Clock3 className="h-5 w-5 text-rose" aria-hidden /> : <CheckCircle2 className="h-5 w-5 text-sage" aria-hidden />}
            {profile.status === "pending" ? "Em análise pela curadoria" : "Análise concluída"}
          </div>
          <div className="flex items-center gap-3 rounded-[8px] bg-pearl p-3 text-sm text-charcoal/72">
            {profile.status === "approved" ? <CheckCircle2 className="h-5 w-5 text-sage" aria-hidden /> : <CircleDashed className="h-5 w-5 text-charcoal/42" aria-hidden />}
            {profile.status === "approved" ? "Perfil aprovado" : profile.status === "rejected" ? "Aguardando ajustes" : "Aguardando decisão"}
          </div>
        </div>
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
            <select value={form.state || ""} onChange={(event) => setForm({ ...form, state: event.target.value })} className="focus-ring min-h-12 rounded-[8px] border hairline bg-white px-4 py-3">
              <option value="">Selecione a UF</option>
              {ufOptions.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Área de atuação
          <select value={form.category || "modelo"} onChange={(event) => setForm({ ...form, category: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3">
            {MODEL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          <span className="flex items-center justify-between gap-4"><span>Mini bio</span><span className="text-xs font-normal text-charcoal/52">{form.bio?.length || 0}/700</span></span>
          <textarea value={form.bio || ""} onChange={(event) => setForm({ ...form, bio: event.target.value })} maxLength={700} className="focus-ring min-h-32 rounded-[8px] border hairline px-4 py-3" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Portfólio ou Instagram
          <input value={form.portfolio_url || ""} onChange={(event) => setForm({ ...form, portfolio_url: event.target.value })} className="focus-ring rounded-[8px] border hairline px-4 py-3" />
        </label>

        <label className="grid gap-2 text-sm font-medium text-charcoal/78">
          Foto principal
          {form.main_photo_url ? (
            <span className="block w-32 overflow-hidden rounded-[8px] bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.main_photo_url} alt="Foto principal atual" className="aspect-[4/5] h-auto w-full object-cover" />
            </span>
          ) : null}
          <span className="inline-flex items-center gap-2 rounded-[8px] border hairline px-4 py-3 text-sm">
            {isPhotoUploading ? <Loader2 className="h-4 w-4 animate-spin text-rose" aria-hidden /> : <Upload className="h-4 w-4 text-rose" aria-hidden />}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={isPhotoUploading} className="w-full text-sm disabled:cursor-not-allowed disabled:opacity-60" />
          </span>
          <span className="text-xs font-normal text-charcoal/56">Envie uma imagem vertical, com até 4 MB.</span>
        </label>

        {message ? <p className="rounded-[8px] bg-green-50 p-4 text-sm text-green-800">{message}</p> : null}
        {error ? <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}

        <button
          type="submit"
          disabled={isSaving || isPhotoUploading}
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
