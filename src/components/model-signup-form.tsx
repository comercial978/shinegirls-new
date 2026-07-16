"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Eye, EyeOff, ImagePlus, Loader2, ShieldCheck } from "lucide-react";
import { MODEL_CATEGORIES } from "@/lib/model-profiles";
import { trackCastingEvent } from "@/lib/analytics";

type SubmitState = {
  type: "idle" | "success" | "error";
  message: string;
};

type FormValues = {
  full_name: string;
  email: string;
  password: string;
  category: string;
  artistic_name: string;
  whatsapp: string;
  city: string;
  state: string;
  instagram: string;
  portfolio_url: string;
  bio: string;
  is_adult_confirmed: boolean;
  terms_accepted: boolean;
  publication_authorized: boolean;
};

type FieldErrors = Partial<Record<keyof FormValues | "main_photo", string>>;

const initialValues: FormValues = {
  full_name: "",
  email: "",
  password: "",
  category: "modelo",
  artistic_name: "",
  whatsapp: "",
  city: "",
  state: "",
  instagram: "",
  portfolio_url: "",
  bio: "",
  is_adult_confirmed: false,
  terms_accepted: false,
  publication_authorized: false,
};

const steps = ["Sua conta", "Seu perfil", "Apresentação"];
const maxPhotoSize = 4 * 1024 * 1024;
const draftKey = "shinegirls-model-signup-draft-v1";
const ufOptions = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

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

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <span id={id} className="text-xs font-medium text-red-700">{message}</span> : null;
}

export function ModelSignupForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const savedDraft = window.localStorage.getItem(draftKey);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft) as { step?: number; values?: Partial<FormValues> };
          setValues((current) => ({ ...current, ...parsed.values, password: "" }));
          setStep(Math.min(Math.max(parsed.step || 0, 0), 2));
        }
      } catch {
        window.localStorage.removeItem(draftKey);
      } finally {
        setHasLoadedDraft(true);
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!hasLoadedDraft || state.type === "success") return;
    const safeValues = { ...values, password: "" };
    window.localStorage.setItem(draftKey, JSON.stringify({ step, values: safeValues }));
  }, [hasLoadedDraft, state.type, step, values]);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function updateValue<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function trackStart() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackCastingEvent("iniciou_cadastro");
  }

  function validateStep(stepToValidate: number) {
    const nextErrors: FieldErrors = {};

    if (stepToValidate === 0) {
      if (!values.full_name.trim()) nextErrors.full_name = "Informe seu nome completo.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Informe um e-mail válido.";
      if (values.password.length < 8) nextErrors.password = "Use pelo menos 8 caracteres.";
      if (!values.category) nextErrors.category = "Selecione sua área de atuação.";
    }

    if (stepToValidate === 1) {
      if (!values.artistic_name.trim()) nextErrors.artistic_name = "Informe seu nome artístico ou como deseja ser apresentada.";
      if (!values.city.trim()) nextErrors.city = "Informe sua cidade.";
      if (!values.state) nextErrors.state = "Selecione seu estado.";
      if (values.portfolio_url && !/^https?:\/\//i.test(values.portfolio_url)) nextErrors.portfolio_url = "Comece o endereço com https://";
    }

    if (stepToValidate === 2) {
      if (!values.is_adult_confirmed) nextErrors.is_adult_confirmed = "A Shine Girls aceita cadastros apenas de maiores de 18 anos.";
      if (!values.terms_accepted) nextErrors.terms_accepted = "Leia e aceite os Termos e a Política de Privacidade.";
      if (!values.publication_authorized) nextErrors.publication_authorized = "A autorização é necessária para enviar o perfil à curadoria.";
      if (photo && photo.size > maxPhotoSize) nextErrors.main_photo = "A foto deve ter no máximo 4 MB.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      trackCastingEvent("erro_no_formulario", { etapa: stepToValidate + 1, quantidade: Object.keys(nextErrors).length });
      return false;
    }

    return true;
  }

  function goForward() {
    if (!validateStep(step)) return;
    if (step === 0) trackCastingEvent("concluiu_etapa_1");
    if (step === 1) trackCastingEvent("concluiu_etapa_2");
    setStep((current) => Math.min(current + 1, 2));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedPhoto = event.target.files?.[0] || null;
    setPhoto(selectedPhoto);
    setErrors((current) => ({ ...current, main_photo: undefined }));

    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(selectedPhoto ? URL.createObjectURL(selectedPhoto) : "");

    if (selectedPhoto) {
      trackCastingEvent("enviou_foto", { tamanho_kb: Math.round(selectedPhoto.size / 1024) });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) {
      goForward();
      return;
    }
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setState({ type: "idle", message: "" });

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        if (value) formData.append(key, "on");
      } else {
        formData.append(key, value);
      }
    });
    if (photo) formData.append("main_photo", photo);

    try {
      const response = await fetch("/api/modelos/signup", { method: "POST", body: formData });
      const result = await readSignupResponse(response);

      if (!response.ok || !result.ok) {
        const message = result.message || "Não foi possível criar o cadastro.";
        setState({ type: "error", message });
        trackCastingEvent("erro_no_formulario", { etapa: 3, origem: "servidor" });
        return;
      }

      window.localStorage.removeItem(draftKey);
      setState({
        type: "success",
        message: result.message || "Seu perfil foi recebido pela Shine Girls.",
      });
      trackCastingEvent("enviou_cadastro");
    } catch {
      setState({ type: "error", message: "Não foi possível conectar ao servidor. Tente novamente em instantes." });
      trackCastingEvent("erro_no_formulario", { etapa: 3, origem: "conexao" });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (state.type === "success") {
    return (
      <div className="rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-9" role="status">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-green-100 text-green-800">
          <Check className="h-6 w-6" aria-hidden />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-rose">Cadastro recebido</p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-ink">Agora seu perfil passa pela curadoria.</h2>
        <p className="mt-5 text-sm leading-7 text-charcoal/72">
          Seu perfil foi recebido pela Shine Girls e não será publicado automaticamente. Você poderá acompanhar o status pela sua conta.
        </p>
        <p className="mt-4 rounded-[8px] bg-pearl p-4 text-sm leading-7 text-charcoal/72">{state.message}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/modelos/entrar" className="focus-ring inline-flex items-center justify-center rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine">
            Entrar e acompanhar
          </Link>
          <Link href="/modelos" className="focus-ring inline-flex items-center justify-center rounded-full border hairline px-6 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
            Voltar ao casting
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "focus-ring min-h-12 rounded-[8px] border hairline bg-white px-4 py-3 text-base text-ink placeholder:text-charcoal/42";

  return (
    <form className="rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-8" onSubmit={handleSubmit} onFocus={trackStart} noValidate>
      <div className="mb-8" aria-label={`Etapa ${step + 1} de 3: ${steps[step]}`}>
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/58">
          <span>Etapa {step + 1} de 3</span>
          <span>{steps[step]}</span>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-hidden>
          {steps.map((label, index) => (
            <div key={label} className={`h-2 rounded-full ${index <= step ? "bg-rose" : "bg-mist"}`} />
          ))}
        </div>
      </div>

      {step === 0 ? (
        <fieldset className="grid gap-5">
          <legend className="mb-2 font-display text-3xl text-ink">Sua conta</legend>
          <p className="-mt-3 text-sm leading-7 text-charcoal/68">Use um e-mail acessível. Sua senha e seus contatos não serão exibidos publicamente.</p>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Nome completo <span className="text-rose">(obrigatório)</span></span>
            <input name="full_name" value={values.full_name} onChange={(event) => updateValue("full_name", event.target.value)} className={inputClass} autoComplete="name" aria-invalid={Boolean(errors.full_name)} aria-describedby="full-name-error" />
            <FieldError id="full-name-error" message={errors.full_name} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>E-mail <span className="text-rose">(obrigatório)</span></span>
            <input name="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} type="email" inputMode="email" className={inputClass} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />
            <FieldError id="email-error" message={errors.email} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Senha <span className="text-rose">(obrigatório)</span></span>
            <span className="relative">
              <input name="password" value={values.password} onChange={(event) => updateValue("password", event.target.value)} type={showPassword ? "text" : "password"} minLength={8} className={`${inputClass} w-full pr-12`} autoComplete="new-password" aria-invalid={Boolean(errors.password)} aria-describedby="password-help password-error" />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="focus-ring absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-charcoal/62" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}>
                {showPassword ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
              </button>
            </span>
            <span id="password-help" className="text-xs font-normal text-charcoal/58">Use pelo menos 8 caracteres. A senha não é salva no rascunho.</span>
            <FieldError id="password-error" message={errors.password} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Área de atuação <span className="text-rose">(obrigatório)</span></span>
            <select name="category" value={values.category} onChange={(event) => updateValue("category", event.target.value)} className={inputClass} aria-describedby="category-error">
              {MODEL_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
            <FieldError id="category-error" message={errors.category} />
          </label>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="grid gap-5">
          <legend className="mb-2 font-display text-3xl text-ink">Seu perfil</legend>
          <p className="-mt-3 text-sm leading-7 text-charcoal/68">Essas informações ajudam a curadoria a entender sua apresentação e sua área de atuação.</p>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Nome artístico <span className="text-rose">(obrigatório)</span></span>
            <input name="artistic_name" value={values.artistic_name} onChange={(event) => updateValue("artistic_name", event.target.value)} className={inputClass} aria-invalid={Boolean(errors.artistic_name)} aria-describedby="artistic-name-error" />
            <FieldError id="artistic-name-error" message={errors.artistic_name} />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              <span>Cidade <span className="text-rose">(obrigatório)</span></span>
              <input name="city" value={values.city} onChange={(event) => updateValue("city", event.target.value)} className={inputClass} autoComplete="address-level2" aria-invalid={Boolean(errors.city)} aria-describedby="city-error" />
              <FieldError id="city-error" message={errors.city} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              <span>Estado <span className="text-rose">(obrigatório)</span></span>
              <select name="state" value={values.state} onChange={(event) => updateValue("state", event.target.value)} className={inputClass} autoComplete="address-level1" aria-invalid={Boolean(errors.state)} aria-describedby="state-error">
                <option value="">Selecione a UF</option>
                {ufOptions.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
              </select>
              <FieldError id="state-error" message={errors.state} />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>WhatsApp <span className="text-charcoal/50">(opcional)</span></span>
            <input name="whatsapp" value={values.whatsapp} onChange={(event) => updateValue("whatsapp", formatWhatsApp(event.target.value))} inputMode="numeric" type="tel" className={inputClass} autoComplete="tel" placeholder="(00) 00000-0000" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Instagram <span className="text-charcoal/50">(opcional)</span></span>
            <input name="instagram" value={values.instagram} onChange={(event) => updateValue("instagram", event.target.value)} className={inputClass} placeholder="@seuperfil" autoCapitalize="none" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span>Portfólio <span className="text-charcoal/50">(opcional)</span></span>
            <input name="portfolio_url" value={values.portfolio_url} onChange={(event) => updateValue("portfolio_url", event.target.value)} type="url" inputMode="url" className={inputClass} placeholder="https://..." aria-invalid={Boolean(errors.portfolio_url)} aria-describedby="portfolio-error" />
            <FieldError id="portfolio-error" message={errors.portfolio_url} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-charcoal/78">
            <span className="flex items-center justify-between gap-4"><span>Mini bio <span className="text-charcoal/50">(opcional)</span></span><span className="text-xs font-normal text-charcoal/52">{values.bio.length}/700</span></span>
            <textarea name="bio" value={values.bio} onChange={(event) => updateValue("bio", event.target.value)} className={`${inputClass} min-h-36 resize-y`} maxLength={700} placeholder="Conte brevemente sua trajetória, experiência e interesses profissionais." />
          </label>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="grid gap-6">
          <legend className="mb-2 font-display text-3xl text-ink">Apresentação e envio</legend>
          <p className="-mt-4 text-sm leading-7 text-charcoal/68">Revise as informações, envie uma foto vertical e confirme as autorizações.</p>

          <div className="grid gap-5 sm:grid-cols-[160px_1fr] sm:items-start">
            <div className="aspect-[4/5] overflow-hidden rounded-[8px] bg-mist">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="Prévia da foto principal" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center px-4 text-center text-sm text-charcoal/52">
                  <ImagePlus className="mb-2 h-7 w-7 text-rose" aria-hidden />
                  Foto vertical
                </div>
              )}
            </div>
            <label className="grid gap-2 text-sm font-medium text-charcoal/78">
              <span>Foto principal <span className="text-charcoal/50">(opcional)</span></span>
              <input name="main_photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className={`${inputClass} file:mr-3 file:rounded-full file:border-0 file:bg-blush file:px-3 file:py-2 file:text-sm file:font-semibold file:text-wine`} aria-describedby="photo-help photo-error" />
              <span id="photo-help" className="text-xs font-normal leading-5 text-charcoal/58">Prefira uma imagem vertical, nítida, com o rosto visível e até 4 MB. No celular, você pode usar a câmera ou a galeria.</span>
              <FieldError id="photo-error" message={errors.main_photo} />
            </label>
          </div>

          <div className="rounded-[8px] border hairline bg-pearl p-5 text-sm leading-6 text-charcoal/74">
            <p className="font-semibold text-ink">Revise antes de enviar</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div><dt className="text-xs uppercase text-charcoal/48">Nome</dt><dd className="font-medium">{values.artistic_name}</dd></div>
              <div><dt className="text-xs uppercase text-charcoal/48">Categoria</dt><dd className="font-medium capitalize">{values.category}</dd></div>
              <div><dt className="text-xs uppercase text-charcoal/48">Localização</dt><dd className="font-medium">{values.city} / {values.state}</dd></div>
              <div><dt className="text-xs uppercase text-charcoal/48">Contato público</dt><dd className="font-medium">Nenhum dado sensível</dd></div>
            </dl>
          </div>

          <div className="grid gap-4 rounded-[8px] border hairline bg-white p-5 text-sm leading-6 text-charcoal/74">
            <label className="flex items-start gap-3">
              <input checked={values.is_adult_confirmed} onChange={(event) => updateValue("is_adult_confirmed", event.target.checked)} name="is_adult_confirmed" type="checkbox" className="mt-1 h-4 w-4 accent-rose" aria-describedby="adult-error" />
              <span>Confirmo que tenho 18 anos ou mais. <span className="text-rose">(obrigatório)</span><FieldError id="adult-error" message={errors.is_adult_confirmed} /></span>
            </label>
            <label className="flex items-start gap-3">
              <input checked={values.terms_accepted} onChange={(event) => updateValue("terms_accepted", event.target.checked)} name="terms_accepted" type="checkbox" className="mt-1 h-4 w-4 accent-rose" aria-describedby="terms-error" />
              <span>Li e aceito os <Link href="/termos" target="_blank" className="font-semibold text-wine underline">Termos de Uso</Link> e a <Link href="/privacidade" target="_blank" className="font-semibold text-wine underline">Política de Privacidade</Link>. <span className="text-rose">(obrigatório)</span><FieldError id="terms-error" message={errors.terms_accepted} /></span>
            </label>
            <label className="flex items-start gap-3">
              <input checked={values.publication_authorized} onChange={(event) => updateValue("publication_authorized", event.target.checked)} name="publication_authorized" type="checkbox" className="mt-1 h-4 w-4 accent-rose" aria-describedby="publication-error" />
              <span>Autorizo a análise e, somente se meu perfil for aprovado, a publicação da minha imagem e das informações profissionais indicadas para divulgação. <span className="text-rose">(obrigatório)</span><FieldError id="publication-error" message={errors.publication_authorized} /></span>
            </label>
          </div>

          <p className="flex items-start gap-2 rounded-[8px] bg-blush/45 p-4 text-sm leading-6 text-charcoal/74">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-wine" aria-hidden />
            Seus dados serão usados apenas para análise, contato profissional e possível participação no casting. Telefone e e-mail não serão exibidos publicamente.
          </p>
        </fieldset>
      ) : null}

      {state.message ? <p role="alert" className="mt-6 rounded-[8px] bg-red-50 p-4 text-sm text-red-800">{state.message}</p> : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((current) => Math.max(current - 1, 0))} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full border hairline px-6 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">
            <ChevronLeft className="h-4 w-4" aria-hidden /> Voltar
          </button>
        ) : (
          <Link href="/modelos/entrar" className="focus-ring inline-flex min-h-12 items-center justify-center rounded-full border hairline px-6 py-3 text-sm font-semibold text-ink transition hover:border-rose hover:text-wine">Já tenho cadastro</Link>
        )}

        {step < 2 ? (
          <button type="button" onClick={goForward} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose px-7 py-3 text-sm font-semibold text-white transition hover:bg-wine">
            Continuar <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button type="submit" disabled={isSubmitting} className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose px-7 py-3 text-sm font-semibold text-white transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
            Enviar perfil para análise
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-xs leading-5 text-charcoal/52">Seu progresso é salvo neste dispositivo. Por segurança, senha e foto não são armazenadas no rascunho.</p>
    </form>
  );
}
