import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Dispatches",
  description: "Essays and explainers on deep space exploration."
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="py-12">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-telemetry">Dispatches</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">Reading from the edge</h1>
      <div className="mt-10 space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-lg border border-hairline bg-panel p-6 transition hover:border-signal/50">
            <p className="font-mono text-xs text-dim">{p.date}</p>
            <h2 className="mt-1 font-display text-xl group-hover:text-signal">{p.title}</h2>
            <p className="mt-2 text-sm text-dim">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
