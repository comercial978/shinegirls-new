import type { MetadataRoute } from "next";
import { news } from "@/content/news";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/institucional", "/modelos", "/modelos/como-funciona", "/blog", "/noticias", "/atualizacoes-do-site", "/anunciantes", "/loja", "/contato"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const newsRoutes = news.map((article) => ({
    url: `${site.url}/noticias/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...postRoutes, ...newsRoutes];
}
