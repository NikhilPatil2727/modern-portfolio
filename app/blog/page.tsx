import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="blog-display-heading text-3xl sm:text-4xl">
          Latest Blog Posts
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          System design, frontend notes, and practical engineering ideas I am learning in public.
        </p>
      </div>

      <div className="grid gap-5">
        {blogPosts.map((post) => (
          <Link key={post.title} href={post.href} aria-label={`Open ${post.title}`}>
            <article className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl dark:hover:border-white/20">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-md bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
                  {post.tag}
                </span>
                <span>{post.date}</span>
                <span aria-hidden="true">/</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <h2 className="blog-display-heading text-lg sm:text-xl">
                  {post.title}
                </h2>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
              <p className="mt-4 text-base leading-7 text-muted-foreground">{post.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
