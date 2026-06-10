import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const base = "https://deepvoid.vercel.app"; // change after deploy
  const staticPages = ["", "/missions", "/exoplanets", "/blog"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date()
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date)
  }));
  return [...staticPages, ...posts];
}
