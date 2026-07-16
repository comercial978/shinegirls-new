import { track } from "@vercel/analytics";

export type CastingEvent =
  | "visitou_home"
  | "clicou_casting"
  | "clicou_criar_cadastro"
  | "iniciou_cadastro"
  | "concluiu_etapa_1"
  | "concluiu_etapa_2"
  | "enviou_foto"
  | "enviou_cadastro"
  | "erro_no_formulario";

export function trackCastingEvent(event: CastingEvent, data?: Record<string, string | number | boolean | null>) {
  try {
    track(event, data);
  } catch {
    // Analytics must never interrupt the casting journey.
  }
}
