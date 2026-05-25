import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { PublicModelProfile } from "@/lib/model-profiles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export async function GET() {
  const admin = createSupabaseAdminClient();
  const publicConfig = getSupabasePublicConfig();
  const supabase = admin || (publicConfig.isConfigured ? createClient(publicConfig.url, publicConfig.anonKey) : null);

  if (!supabase) {
    return NextResponse.json({ ok: true, profiles: [] satisfies PublicModelProfile[], configured: false });
  }

  const { data, error } = await supabase
    .from("model_profiles")
    .select("id, artistic_name, city, state, instagram, category, bio, portfolio_url, main_photo_url")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message, profiles: [] }, { status: 500 });
  }

  return NextResponse.json({ ok: true, profiles: data || [], configured: true });
}
