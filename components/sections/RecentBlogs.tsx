import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/ui/cool-mode";
import { blogPosts } from "@/data/blogs";

export default function RecentBlogs() {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="blog-display-heading text-3xl sm:text-4xl">
            Recent writing
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground text-balance">
            Short, practical notes on system design, React, and the engineering ideas I keep coming
            back to.
          </p>
        </div>

        <div className="grid gap-5">
          {recentPosts.map((post) => (
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
                  <h3 className="blog-display-heading text-2xl">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.description}</p>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <CoolMode>
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/blog">
                More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CoolMode>
        </div>
      </div>
    </section>
  );
}
