import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera, MapPin, Megaphone, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { models } from "@/content/models";
import { site } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };

function modelFromSlug(slug: string) {
  return models.find((model) => model.href === `/modelos/${slug}` && slug !== "maria-eduarda");
}

export function generateStaticParams() {
  return models
    .filter((model) => model.href && model.href !== "/modelos/maria-eduarda")
    .map((model) => ({ slug: model.href!.split("/").pop()! }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = modelFromSlug(slug);
  if (!model) return {};

  return {
    title: `${model.name} | Casting Shine Girls`,
    description: model.summary,
    alternates: { canonical: `${site.url}${model.href}` },
    openGraph: {
      title: `${model.name} | Casting Shine Girls`,
      description: model.summary,
      url: `${site.url}${model.href}`,
      images: [{ url: model.image }],
    },
  };
}

export default async function ModelProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const model = modelFromSlug(slug);
  if (!model) notFound();

  const isArchive = model.highlight.toLowerCase().includes("memória");

  return (
    <>
      <section className="bg-pearl py-14 md:py-20">
        <div className="container-shell">
          <Link href="/modelos" className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-wine">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Voltar ao casting
          </Link>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-mist shadow-soft">
              <Image src={model.image} alt={`Retrato de ${model.name}`} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-rose"><Camera className="h-4 w-4" aria-hidden />{isArchive ? "Arquivo editorial" : "Perfil Shine Girls"}</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.98] text-ink md:text-7xl">{model.name}</h1>
              <p className="mt-5 text-lg font-medium text-charcoal/76">{model.role}</p>
              <p className="mt-3 flex items-center gap-2 text-sm text-charcoal/66"><MapPin className="h-4 w-4 text-rose" aria-hidden />{model.location}</p>
              <p className="mt-7 max-w-2xl text-base leading-8 text-charcoal/74">{model.summary}</p>
              <div className="mt-8 rounded-[8px] border hairline bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose">Destaque</p>
                <p className="mt-3 font-display text-2xl text-ink">{model.highlight}</p>
              </div>
              {isArchive ? (
                <p className="mt-5 flex items-start gap-2 text-sm leading-7 text-charcoal/64"><ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-sage" aria-hidden />Este perfil integra a memória editorial da marca e não representa necessariamente disponibilidade atual para trabalhos.</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 text-pearl md:py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.45fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blush">Projetos e parcerias</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Fale com a Shine Girls sobre oportunidades profissionais.</h2>
          </div>
          <Link href="/contato" className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-rose px-6 py-3 text-sm font-semibold text-white transition hover:bg-wine">
            <Megaphone className="h-4 w-4" aria-hidden /> Entrar em contato
          </Link>
        </div>
      </section>
    </>
  );
}
