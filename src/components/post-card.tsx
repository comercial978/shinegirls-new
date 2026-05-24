import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/content/posts";
import { formatDate } from "@/lib/utils";

export function PostCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  return (
    <article className="group grid overflow-hidden rounded-[8px] border hairline bg-white shadow-sm md:grid-cols-[0.9fr_1.1fr]">
      <Link href={`/blog/${post.slug}`} className="relative aspect-[4/3] overflow-hidden bg-mist md:aspect-auto">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority={priority}
          sizes="(min-width: 768px) 34vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose">
          {post.category} · {formatDate(post.date)}
        </p>
        <h3 className="mt-4 font-display text-3xl leading-tight text-ink">
          <Link href={`/blog/${post.slug}`} className="transition hover:text-wine">
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 text-sm leading-7 text-charcoal/70">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-wine">
          Ler editorial
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
