import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { NewsCard } from "@/components/news-card";
import { SectionHeading } from "@/components/section-heading";
import { news } from "@/content/news";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Notícias de Moda, Modelos e Tendências",
  description:
    "Notícias e tendências sobre moda, modelos, influência digital, beleza e casting feminino pela curadoria Shine Girls.",
  alternates: {
    canonical: `${site.url}/noticias`,
  },
};

export default function NoticiasPage() {
  const [featured, ...articles] = news;

  return (
    <section className="bg-pearl">
      <div className="container-shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            eyebrow="Notícias"
            title="Moda, modelos e tendências em leitura Shine Girls."
            text="Uma editoria criada para acompanhar movimentos de moda, influência, beleza e presença digital com curadoria feminina, profissional e indexável."
          />
          <Link
            href="/modelos/como-funciona"
            className="focus-ring justify-self-start rounded-full border hairline bg-white px-5 py-3 text-sm font-semibold text-wine shadow-sm transition hover:border-rose hover:text-rose lg:justify-self-end"
          >
            Entenda o casting
          </Link>
        </div>

        <article className="mt-12 grid overflow-hidden rounded-[8px] border hairline bg-white shadow-soft lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[360px] bg-mist">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-blush px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-wine">
              <Sparkles className="h-4 w-4" aria-hidden />
              Destaque
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">{featured.category}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">{featured.title}</h2>
            <p className="mt-5 text-base leading-8 text-charcoal/72">{featured.excerpt}</p>
            <Link href={`/noticias/${featured.slug}`} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-wine">
              Ler notícia completa
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => (
            <NewsCard key={article.slug} article={article} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
