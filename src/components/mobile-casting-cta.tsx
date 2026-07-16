"use client";

import { UserPlus } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";

export function MobileCastingCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t hairline bg-pearl/96 p-3 backdrop-blur md:hidden">
      <TrackedLink
        href="/modelos/cadastro"
        eventName="clicou_criar_cadastro"
        eventData={{ origem: "cta_fixo_mobile" }}
        className="focus-ring mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-rose px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-wine"
      >
        <UserPlus className="h-4 w-4" aria-hidden />
        Entrar para o casting
      </TrackedLink>
    </div>
  );
}
