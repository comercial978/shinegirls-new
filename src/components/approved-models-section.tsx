"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import type { PublicModelProfile } from "@/lib/model-profiles";

export function ApprovedModelsSection() {
  const [profiles, setProfiles] = useState<PublicModelProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadProfiles() {
      try {
        const response = await fetch("/api/modelos/approved", { cache: "no-store" });
        const result = (await response.json()) as { profiles?: PublicModelProfile[] };

        if (isMounted) {
          setProfiles(result.profiles || []);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfiles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mt-16 rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-rose">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Casting aprovado
          </p>
          <h2 className="font-display text-3xl text-ink md:text-4xl">Modelos aprovadas pela curadoria</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-charcoal/70">
            Apenas perfis aprovados aparecem publicamente. Dados sensíveis como e-mail e WhatsApp permanecem protegidos.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 flex items-center gap-3 rounded-[8px] bg-pearl p-5 text-sm text-charcoal/70">
          <Loader2 className="h-4 w-4 animate-spin text-rose" aria-hidden />
          Carregando perfis aprovados...
        </div>
      ) : profiles.length ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => {
            const externalUrl = profile.portfolio_url || profile.instagram;
            return (
              <article key={profile.id} className="overflow-hidden rounded-[8px] border hairline bg-pearl">
                <div className="aspect-[4/5] overflow-hidden bg-mist">
                  {profile.main_photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.main_photo_url} alt={`Foto de ${profile.artistic_name}`} className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center font-display text-3xl text-charcoal/36">
                      Shine Girls
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">{profile.category || "modelo"}</p>
                  <h3 className="mt-3 font-display text-2xl text-ink">{profile.artistic_name}</h3>
                  <p className="mt-1 text-sm font-medium text-charcoal/58">
                    {[profile.city, profile.state].filter(Boolean).join(" / ")}
                  </p>
                  {profile.bio ? <p className="mt-4 text-sm leading-7 text-charcoal/70">{profile.bio}</p> : null}
                  {externalUrl ? (
                    <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-wine" href={externalUrl} target="_blank" rel="noreferrer">
                      Ver portfólio
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-[8px] bg-pearl p-5 text-sm leading-7 text-charcoal/70">
          Ainda não há perfis aprovados publicados pelo banco. O casting editorial acima continua ativo enquanto a curadoria avalia novos cadastros.
        </div>
      )}
    </section>
  );
}
