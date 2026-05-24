import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/content/posts";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: post.image,
    author: {
      "@type": "Organization",
      name: "Shine Girls",
    },
  };

  return (
    <article className="bg-pearl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <header className="container-shell grid gap-10 py-14 md:py-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-rose">
            {post.category} · {formatDate(post.date)}
          </p>
          <h1 className="font-display text-5xl leading-[1.02] text-ink md:text-6xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-charcoal/72">{post.excerpt}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-mist shadow-soft">
          <Image src={post.image} alt={post.title} fill priority sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover" />
        </div>
      </header>
      <div className="container-shell pb-20">
        <div className="prose-sg mx-auto max-w-3xl rounded-[8px] border hairline bg-white p-7 shadow-sm md:p-10">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
