import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getNewsArticle, news } from "@/content/news";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `${site.url}/noticias/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
      type: "article",
    },
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    image: `${site.url}${article.image}`,
    author: {
      "@type": "Organization",
      name: "Shine Girls",
    },
    publisher: {
      "@type": "Organization",
      name: "Shine Girls",
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/legacy/logo-shine-girls-root.jpg`,
      },
    },
  };

  return (
    <article className="bg-pearl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <Link href="/noticias" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar para notícias
          </Link>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-rose">{article.category}</p>
          <h1 className="font-display text-5xl leading-[1.02] text-ink md:text-6xl">{article.title}</h1>
          <p className="mt-6 text-lg leading-8 text-charcoal/72">{article.excerpt}</p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-charcoal/64">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-rose" aria-hidden />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-rose" aria-hidden />
              {article.readingTime}
            </span>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-mist shadow-soft">
          <Image src={article.image} alt={article.title} fill priority sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="container-shell pb-20">
        <div className="prose-sg mx-auto max-w-3xl rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          {article.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {article.sourceNote ? (
            <p className="rounded-[8px] bg-blush p-5 text-sm leading-7 text-wine">{article.sourceNote}</p>
          ) : null}
          <div className="mt-8 flex flex-col gap-3 border-t hairline pt-6 sm:flex-row">
            <Link href="/modelos" className="focus-ring rounded-full bg-rose px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-wine">
              Conhecer modelos
            </Link>
            <Link href="/contato" className="focus-ring rounded-full border hairline px-5 py-3 text-center text-sm font-semibold text-wine transition hover:border-rose hover:text-rose">
              Falar sobre parcerias
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
