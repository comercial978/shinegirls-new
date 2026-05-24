import Image from "next/image";
import { Camera } from "lucide-react";
import type { ModelProfile } from "@/content/models";

export function ModelCard({ model }: { model: ModelProfile }) {
  return (
    <article className="group overflow-hidden rounded-[8px] border hairline bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden bg-mist">
        <Image
          src={model.image}
          alt={`Retrato de ${model.name}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-rose">
          <Camera className="h-4 w-4" aria-hidden />
          {model.highlight}
        </div>
        <h3 className="font-display text-2xl text-ink">{model.name}</h3>
        <p className="mt-1 text-sm font-medium text-charcoal/58">
          {model.role} · {model.location}
        </p>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">{model.summary}</p>
      </div>
    </article>
  );
}
