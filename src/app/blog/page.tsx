import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Editoriais de moda, autoestima, modelos e oportunidades da Shine Girls.",
};

export default function BlogPage() {
  return (
    <section className="bg-pearl py-16 md:py-24">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Editorial"
          title="Conteudo curado do legado Shine Girls."
          text="Posts fracos, duplicados e puramente comerciais foram descartados. Ficaram temas que sustentam posicionamento e SEO."
        />
        <div className="mt-10 grid gap-6">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
