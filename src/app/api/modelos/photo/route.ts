import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const maxPhotoSize = 4 * 1024 * 1024;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization") || "";
  const [type, token] = authorization.split(" ");

  if (type.toLowerCase() !== "bearer" || !token) {
    return "";
  }

  return token;
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseAdminClient();

    if (!supabase) {
      return jsonError("Supabase nao esta configurado no servidor.", 500);
    }

    const token = getBearerToken(request);

    if (!token) {
      return jsonError("Sessao expirada. Entre novamente para enviar a foto.", 401);
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    const user = userData.user;

    if (userError || !user) {
      return jsonError("Sessao expirada. Entre novamente para enviar a foto.", 401);
    }

    const formData = await request.formData();
    const photo = formData.get("main_photo");

    if (!(photo instanceof File) || photo.size === 0) {
      return jsonError("Selecione uma foto para enviar.");
    }

    if (photo.size > maxPhotoSize) {
      return jsonError("A foto principal deve ter no maximo 4 MB.");
    }

    const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/dashboard-photo-${Date.now()}.${extension}`;
    const buffer = Buffer.from(await photo.arrayBuffer());

    const { error: uploadError } = await supabase.storage.from("model-photos").upload(path, buffer, {
      contentType: photo.type || "image/jpeg",
      upsert: true,
    });

    if (uploadError) {
      return jsonError(uploadError.message || "Nao foi possivel enviar a foto.", 500);
    }

    const { data } = supabase.storage.from("model-photos").getPublicUrl(path);

    return NextResponse.json({
      ok: true,
      publicUrl: data.publicUrl,
      message: "Foto enviada. Clique em salvar alteracoes para atualizar o perfil.",
    });
  } catch (error) {
    console.error("Model photo upload failed", error);
    return jsonError("Nao foi possivel enviar a foto agora. Tente novamente.", 500);
  }
}
