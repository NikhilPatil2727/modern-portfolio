import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ConsistentHashingVisualizer from "@/components/blog/ConsistentHashingVisualizer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-12 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
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
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Consistent Hashing — How Distributed Systems Find the Right Server
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <time dateTime="2025-05-07">May 7, 2025</time>
            <span aria-hidden="true">/</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="space-y-6 text-base leading-8 text-muted-foreground">
          <SectionTitle>Why Consistent Hashing Exists</SectionTitle>

          <p>
            <strong className="font-semibold text-foreground">The Problem It Solves:</strong>{" "}
            Imagine you have a distributed cache or database with N servers, and you distribute keys
            using simple modular hashing:
          </p>

          <pre className="overflow-x-auto rounded-2xl border border-border bg-muted/50 px-4 py-4 font-mono text-sm leading-7 text-foreground">
            <code>server = hash(key) % N</code>
          </pre>

          <p>
            This works fine until you add or remove a server. When N changes to N±1, almost every
            key remaps to a different server, causing a massive cache miss storm or data
            reshuffling.
          </p>

          <p>Example: With 3 servers → 4 servers, ~75% of keys move.</p>

          <SectionTitle>What Consistent Hashing Does</SectionTitle>

          <p>
            It arranges both servers and keys on a virtual ring (0 to 2³²). A key is assigned to
            the first server clockwise from its position on the ring.
          </p>

          <p>
            <strong className="font-semibold text-foreground">Key insight:</strong> When a server is
            added or removed, only ~K/N keys move instead of almost all of them.
          </p>

          <ConsistentHashingVisualizer />
          <p className="-mt-4 text-center text-sm text-muted-foreground">
            Click Next to walk through each step →
          </p>

          <SectionTitle>Core Benefits</SectionTitle>

          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[620px] border-collapse bg-card text-left text-sm">
              <thead className="bg-muted/60 text-foreground">
                <tr>
                  <th className="border-b border-border px-4 py-3 font-semibold"></th>
                  <th className="border-b border-border px-4 py-3 font-semibold">
                    Simple Hashing
                  </th>
                  <th className="border-b border-border px-4 py-3 font-semibold">
                    Consistent Hashing
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-foreground">
                    Add a server
                  </td>
                  <td className="border-b border-border px-4 py-3">Most keys reshuffle</td>
                  <td className="border-b border-border px-4 py-3">Only ~1/N keys move</td>
                </tr>
                <tr>
                  <td className="border-b border-border px-4 py-3 font-medium text-foreground">
                    Remove a server
                  </td>
                  <td className="border-b border-border px-4 py-3">Most keys reshuffle</td>
                  <td className="border-b border-border px-4 py-3">
                    Only that server&apos;s keys move
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-foreground">Node failure</td>
                  <td className="px-4 py-3">Cascading remaps</td>
                  <td className="px-4 py-3">Minimal disruption</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionTitle>Virtual Nodes (Vnodes)</SectionTitle>

          <p>
            Each physical server maps to multiple points on the ring (e.g. 150 virtual nodes). This
            ensures even load distribution and smoother rebalancing.
          </p>

          <SectionTitle>Where It&apos;s Used</SectionTitle>

          <ul className="list-disc space-y-2 pl-6">
            <li>Cassandra &amp; DynamoDB - partition data across nodes</li>
            <li>Redis Cluster - hash slot distribution</li>
            <li>CDN routing - map URLs to edge servers</li>
            <li>Memcached - distributed cache key routing</li>
          </ul>
        </div>
      </article>
    </>
  );
}
