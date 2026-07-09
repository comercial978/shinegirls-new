import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/content/news";
import { formatDate } from "@/lib/utils";

export function NewsCard({ article, priority = false }: { article: NewsArticle; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-[8px] border hairline bg-white shadow-sm">
      <Link href={`/noticias/${article.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">
          {article.category} · {formatDate(article.date)}
        </p>
        <h3 className="mt-4 font-display text-3xl leading-tight text-ink">
          <Link href={`/noticias/${article.slug}`} className="transition hover:text-wine">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">{article.excerpt}</p>
        <Link href={`/noticias/${article.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
          Ler notícia
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
