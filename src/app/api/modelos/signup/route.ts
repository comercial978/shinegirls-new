import { NextResponse } from "next/server";
import { isValidModelCategory, normalizeInstagram } from "@/lib/model-profiles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const maxPhotoSize = 5 * 1024 * 1024;

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return jsonError("Supabase nao esta configurado no servidor.", 500);
  }

  const formData = await request.formData();
  const artisticName = text(formData, "artistic_name");
  const fullName = text(formData, "full_name");
  const email = text(formData, "email").toLowerCase();
  const password = text(formData, "password");
  const whatsapp = text(formData, "whatsapp");
  const city = text(formData, "city");
  const state = text(formData, "state").toUpperCase();
  const instagram = normalizeInstagram(text(formData, "instagram"));
  const category = text(formData, "category");
  const bio = text(formData, "bio");
  const portfolioUrl = text(formData, "portfolio_url");
  const isAdultConfirmed = formData.get("is_adult_confirmed") === "on";
  const termsAccepted = formData.get("terms_accepted") === "on";
  const photo = formData.get("main_photo");

  if (!artisticName || !fullName || !email || !password) {
    return jsonError("Preencha nome artistico, nome completo, e-mail e senha.");
  }

  if (password.length < 8) {
    return jsonError("A senha deve ter pelo menos 8 caracteres.");
  }

  if (!isValidModelCategory(category)) {
    return jsonError("Selecione uma area de atuacao valida.");
  }

  if (!isAdultConfirmed || !termsAccepted) {
    return jsonError("Confirme a idade minima e aceite os termos para continuar.");
  }

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      role: "model",
      artistic_name: artisticName,
    },
  });

  if (authError || !authData.user) {
    return jsonError(authError?.message || "Nao foi possivel criar a conta.");
  }

  let mainPhotoUrl = "";

  if (photo instanceof File && photo.size > 0) {
    if (photo.size > maxPhotoSize) {
      await supabase.auth.admin.deleteUser(authData.user.id);
      return jsonError("A foto principal deve ter no maximo 5 MB.");
    }

    const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${authData.user.id}/main-photo-${Date.now()}.${extension}`;
    const buffer = Buffer.from(await photo.arrayBuffer());

    const { error: uploadError } = await supabase.storage.from("model-photos").upload(path, buffer, {
      contentType: photo.type || "image/jpeg",
      upsert: true,
    });

    if (!uploadError) {
      const { data } = supabase.storage.from("model-photos").getPublicUrl(path);
      mainPhotoUrl = data.publicUrl;
    }
  }

  const { error: profileError } = await supabase.from("model_profiles").insert({
    id: authData.user.id,
    artistic_name: artisticName,
    full_name: fullName,
    email,
    whatsapp,
    city,
    state,
    instagram,
    category,
    bio,
    portfolio_url: portfolioUrl,
    main_photo_url: mainPhotoUrl,
    status: "pending",
    is_adult_confirmed: isAdultConfirmed,
    terms_accepted: termsAccepted,
  });

  if (profileError) {
    await supabase.auth.admin.deleteUser(authData.user.id);
    return jsonError(profileError.message || "Nao foi possivel salvar o perfil.");
  }

  return NextResponse.json({
    ok: true,
    message: "Cadastro criado com sucesso. Agora entre para acompanhar sua analise.",
  });
}
