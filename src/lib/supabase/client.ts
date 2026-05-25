"use client";

import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "@/lib/supabase/config";

export function createSupabaseBrowserClient() {
  const { url, anonKey, isConfigured } = getSupabasePublicConfig();

  if (!isConfigured) {
    return null;
  }

  return createClient(url, anonKey);
}
