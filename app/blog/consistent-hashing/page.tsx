import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ConsistentHashingVisualizer from "@/components/blog/ConsistentHashingVisualizer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="blog-display-heading mb-4 mt-12 text-3xl sm:text-4xl">
      {children}
    </h2>
  );
}

export default function ConsistentHashingPage() {
  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-12 text-foreground animate-in fade-in slide-in-from-bottom-3 duration-500">
        <Button asChild variant="ghost" className="-ml-3 mb-8 rounded-full">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </Button>

        <header className="mb-10 border-b border-border pb-8">
          <Badge variant="secondary" className="mb-4 rounded-md px-2.5 py-1">
            System Design
          </Badge>
          <h1 className="blog-display-heading text-4xl sm:text-5xl">
            Consistent Hashing — How Distributed Systems Find the Right Server
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime="2025-05-07">May 7, 2025</time>
            <span aria-hidden="true">/</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="space-y-6 text-base leading-8 text-muted-foreground">
          <SectionTitle>Consistent Hashing — Simple Explanation for Developers</SectionTitle>

          <SectionTitle>Why Consistent Hashing Exists</SectionTitle>

          <p>Imagine your app has multiple servers.</p>

          <p>Example:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Server A</li>
            <li>Server B</li>
            <li>Server C</li>
          </ul>

          <p>Now you need to decide:</p>

          <blockquote className="rounded-2xl border-l-4 border-foreground bg-muted/40 px-5 py-4 font-medium text-foreground">
            “Which server should store this user’s data or cache?”
          </blockquote>

          <p>A simple way is:</p>

          <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/50 px-4 py-4 font-mono text-sm leading-7 text-foreground">
            <code>server = hash(key) % N</code>
          </pre>

          <p>Where:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">key</code> = user
              id, session id, cache key, etc.
            </li>
            <li>
              <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">N</code> = number of
              servers
            </li>
          </ul>

          <SectionTitle>The Big Problem 🚨</SectionTitle>

          <p>This works fine until servers change.</p>

          <p>Suppose:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>You had 3 servers</li>
            <li>Now you add 1 more server</li>
          </ul>

          <p>So N changes:</p>

          <p className="rounded-2xl border border-border bg-card px-5 py-4 text-center text-2xl font-semibold text-foreground">
            3 → 4
          </p>

          <p>Now almost every key gets mapped to a different server.</p>

          <p>That means:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>cache misses increase</li>
            <li>data reshuffling happens</li>
            <li>system becomes slow</li>
            <li>databases/network get overloaded</li>
          </ul>

          <p>Even adding or removing 1 server can move most of the data.</p>

          <SectionTitle>What Consistent Hashing Does</SectionTitle>

          <p>Consistent Hashing solves this problem smartly.</p>

          <p>
            Instead of directly using{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">% N</code>, it creates
            a virtual circle (ring).
          </p>

          <p>Both:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>servers</li>
            <li>keys</li>
          </ul>

          <p>are placed on this ring using hashing.</p>

          <p>Then:</p>

          <blockquote className="rounded-2xl border-l-4 border-foreground bg-muted/40 px-5 py-4 font-medium text-foreground">
            A key belongs to the first server found while moving clockwise.
          </blockquote>

          <SectionTitle>The Main Benefit</SectionTitle>

          <p>When a server:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>joins</li>
            <li>leaves</li>
            <li>crashes</li>
          </ul>

          <p>only a small portion of keys move.</p>

          <p>Not everything.</p>

          <SectionTitle>Example</SectionTitle>

          <p>Adding 1 server:</p>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[420px] border-collapse bg-card text-left text-sm">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-semibold">Method</th>
                  <th className="border-b border-border px-4 py-3 font-semibold">Keys Moved</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-foreground">
                    Simple Hashing
                  </td>
                  <td className="border-b border-border px-4 py-3">~90%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Consistent Hashing</td>
                  <td className="px-4 py-3">~10%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>So the system stays:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>stable</li>
            <li>fast</li>
            <li>scalable</li>
          </ul>

          <ConsistentHashingVisualizer />

          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-medium text-foreground">
              Click Next to walk through each step one by one! Here&apos;s what each step shows you:
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-6">
              <li>
                <strong className="text-foreground">Step 1</strong> — The empty ring is created
                (all hash values 0→360° in a circle)
              </li>
              <li>
                <strong className="text-foreground">Step 2</strong> — Each server gets hashed and
                placed at a fixed spot on the ring
              </li>
              <li>
                <strong className="text-foreground">Step 3</strong> — Your request key{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">user:42</code>{" "}
                gets hashed and lands somewhere on the ring
              </li>
              <li>
                <strong className="text-foreground">Step 4</strong> — Walk clockwise from the
                key&apos;s position until you hit the first server
              </li>
              <li>
                <strong className="text-foreground">Step 5</strong> — That server (Server B) is the
                answer — it owns this key
              </li>
            </ol>
          </div>
        </div>
      </article>
    </>
  );
}
