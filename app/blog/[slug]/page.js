import { getAllPosts, getPost } from "@/lib/posts";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import NewsletterSignup from "@/components/NewsletterSignup";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function PostPage({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl py-12">
      <p className="font-mono text-xs text-dim">{post.date}</p>
      <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight">{post.title}</h1>
      <div className="prose-void mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
      <div className="mt-12 space-y-8">
        <AdSlot size="banner" />
        <NewsletterSignup />
      </div>
    </article>
  );
}
