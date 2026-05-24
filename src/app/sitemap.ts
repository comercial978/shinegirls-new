import type { MetadataRoute } from "next";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/sobre", "/modelos", "/blog", "/anunciantes", "/loja", "/contato"].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...routes, ...postRoutes];
}
