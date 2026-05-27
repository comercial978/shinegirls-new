import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isValidModelCategory, normalizeInstagram } from "@/lib/model-profiles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const maxPhotoSize = 4 * 1024 * 1024;

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isExistingUserError(message = "") {
  const normalized = message.toLowerCase();
  return normalized.includes("already") || normalized.includes("registered") || normalized.includes("exists");
}

function createSupabasePasswordClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();

    if (!supabase) {
      return jsonError("Supabase não está configurado no servidor.", 500);
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
      return jsonError("Preencha nome artístico, nome completo, e-mail e senha.");
    }

    if (!isValidEmail(email)) {
      return jsonError("Informe um e-mail válido. Exemplo: nome@dominio.com.br");
    }

    if (password.length < 8) {
      return jsonError("A senha deve ter pelo menos 8 caracteres.");
    }

    if (!isValidModelCategory(category)) {
      return jsonError("Selecione uma área de atuação válida.");
    }

    if (!isAdultConfirmed || !termsAccepted) {
      return jsonError("Confirme a idade mínima e aceite os termos para continuar.");
    }

    let userId = "";
    let createdUserId = "";

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
      const message = authError?.message || "";

      if (!isExistingUserError(message)) {
        return jsonError(message || "Não foi possível criar a conta.");
      }

      const passwordClient = createSupabasePasswordClient();
      if (!passwordClient) {
        return jsonError("Este e-mail já possui cadastro. Use a página Entrar ou recuperar senha.");
      }

      const { data: loginData, error: loginError } = await passwordClient.auth.signInWithPassword({ email, password });
      const existingUser = loginData.user;

      if (loginError || !existingUser) {
        return jsonError("Este e-mail já possui cadastro. Entre com sua senha ou use recuperar senha.");
      }

      userId = existingUser.id;
    } else {
      userId = authData.user.id;
      createdUserId = authData.user.id;
    }

    const { data: existingProfile } = await supabase.from("model_profiles").select("id").eq("id", userId).maybeSingle();

    if (existingProfile) {
      return NextResponse.json({
        ok: true,
        message: "Este e-mail já possui cadastro. Entre para acompanhar sua análise.",
      });
    }

    let mainPhotoUrl = "";

    if (photo instanceof File && photo.size > 0) {
      if (photo.size > maxPhotoSize) {
        if (createdUserId) {
          await supabase.auth.admin.deleteUser(createdUserId);
        }
        return jsonError("A foto principal deve ter no máximo 4 MB.");
      }

      const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${userId}/main-photo-${Date.now()}.${extension}`;
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
      id: userId,
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
      if (createdUserId) {
        await supabase.auth.admin.deleteUser(createdUserId);
      }
      return jsonError(profileError.message || "Não foi possível salvar o perfil.");
    }

    return NextResponse.json({
      ok: true,
      message: "Cadastro criado com sucesso. Agora entre para acompanhar sua análise.",
    });
  } catch (error) {
    console.error("Model signup failed", error);
    return jsonError("Não foi possível concluir o cadastro agora. Verifique os dados e tente novamente.", 500);
  }
}
