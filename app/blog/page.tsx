import Link from "next/link";

export default function BlogPage() {
  const post = {
    title: "Complete Guide to React Hooks",
    description: "A complete beginner-to-advanced guide on mastering React Hooks, from useState and...",
    date: "Jul 15, 2025",
    href: "/blog/react",
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="mb-8 text-5xl font-bold tracking-tight">Latest Blog Posts</h1>
      <Link key={post.title} href={post.href} aria-label={`Open ${post.title}`}>
        <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
          <h2 className="mb-3 text-4xl font-semibold leading-tight text-zinc-900">{post.title}</h2>
          <p className="mb-6 text-xl leading-relaxed text-zinc-500">{post.description}</p>
          <p className="text-lg text-zinc-500">{post.date}</p>
        </article>
      </Link>
    </section>
  );
}
