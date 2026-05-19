import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  ScalingComparisonTable,
  ShardCodeExample,
  ShardingArchitectureDiagram,
  VerticalScalingDiagram,
} from "@/components/blog/ScalingVisualizer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Vertical Scaling vs Horizontal Scaling (Sharding) | Nikhil Patil",
  description:
    "A beginner-friendly guide to vertical scaling, horizontal scaling, and database sharding.",
  openGraph: {
    title: "Vertical Scaling vs Horizontal Scaling (Sharding)",
    description: "A simple visual guide to how modern databases scale.",
    type: "article",
  },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="blog-display-heading mb-4 mt-12 text-3xl sm:text-4xl">
      {children}
    </h2>
  );
}

function SmallCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
      <ul className="list-disc space-y-2 pl-6">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function VerticalVsHorizontalScalingPage() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-12 text-foreground animate-in fade-in slide-in-from-bottom-3 duration-500">
      <Button asChild variant="ghost" className="-ml-3 mb-8 rounded-full">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>
      </Button>

      <header className="mb-10 border-b border-border pb-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {["Database", "Scaling", "Backend", "System Design"].map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md px-2.5 py-1">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="blog-display-heading text-4xl sm:text-5xl">
          Vertical Scaling vs Horizontal Scaling (Sharding)
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground">
          A beginner-friendly guide to how modern databases scale.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime="2026-05-19">May 19, 2026</time>
          <span aria-hidden="true">/</span>
          <span>10 min read</span>
        </div>
      </header>

      <div className="space-y-6 text-base leading-8 text-muted-foreground">
        <SectionTitle>Why Scaling Matters</SectionTitle>

        <p>
          Scaling means helping your app handle more users, more requests, and more data without
          becoming slow.
        </p>

        <p>
          In the beginning, one database is usually enough. It stores users, orders, posts, payments,
          and everything else.
        </p>

        <p>
          But when users grow, the same database has to answer more reads and writes every second.
          Eventually, one database becomes tired.
        </p>

        <blockquote className="rounded-2xl border-l-4 border-foreground bg-muted/40 px-5 py-4 font-medium text-foreground">
          Think of one database like one worker at a service desk. A small queue is okay. A huge
          queue becomes painful.
        </blockquote>

        <SectionTitle>Vertical Scaling</SectionTitle>

        <p>Vertical scaling means making one machine stronger.</p>

        <p>You keep one database server, but add better hardware:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>more CPU</li>
          <li>more RAM</li>
          <li>faster SSD or NVMe storage</li>
        </ul>

        <p>
          Simple analogy: one worker is doing all the work. Instead of hiring more workers, you make
          that worker stronger.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <SmallCard
            title="Pros"
            items={["Easy setup", "No architecture changes", "Simple maintenance"]}
          />
          <SmallCard
            title="Cons"
            items={["Hardware limits", "Expensive", "Single point of failure"]}
          />
        </div>

        <SectionTitle>Vertical Scaling Visualization</SectionTitle>

        <VerticalScalingDiagram />

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-medium text-foreground">
            Click Next to see the vertical scaling story step by step.
          </p>
          <p className="mt-2">
            Notice that the database becomes stronger, but it is still one machine.
          </p>
        </div>

        <p>
          This is a good first step. You can make the database faster without changing your whole
          system.
        </p>

        <p>
          The problem is that every machine has a limit. At some point, you cannot keep buying a
          bigger server forever.
        </p>

        <SectionTitle>Horizontal Scaling</SectionTitle>

        <p>Horizontal scaling means adding multiple machines.</p>

        <p>
          Instead of one big database doing everything, you split work across many servers. Traffic
          can be distributed, and data can be split into smaller parts.
        </p>

        <blockquote className="rounded-2xl border-l-4 border-foreground bg-muted/40 px-5 py-4 font-medium text-foreground">
          Instead of one super worker, hire many workers.
        </blockquote>

        <p>
          This is harder to build, but it can scale much further than one machine.
        </p>

        <SectionTitle>What Is Sharding?</SectionTitle>

        <p>
          Sharding means splitting data across multiple databases. Each database owns one part of the
          data.
        </p>

        <p>Example:</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-foreground">Users A-M</p>
            <p className="mt-2">Stored in DB1</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <p className="font-semibold text-foreground">Users N-Z</p>
            <p className="mt-2">Stored in DB2</p>
          </div>
        </div>

        <p>
          Now one database does not need to store every user. Each shard gets a smaller job.
        </p>

        <ShardCodeExample />

        <SectionTitle>Main Database Visualization</SectionTitle>

        <p>
          In a real system, users do not directly talk to database shards. Requests usually go
          through a load balancer and app servers first.
        </p>

        <ShardingArchitectureDiagram />

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-medium text-foreground">
            Click Next to follow one request through the horizontal scaling flow.
          </p>
          <p className="mt-2">
            The important idea is simple: traffic reaches app servers, and data is routed to the
            correct shard.
          </p>
        </div>

        <p>The app server checks where the data lives, then sends the request to the correct shard.</p>

        <p>
          This is why big systems can keep growing. They do not ask one database to do everything.
          They split the work.
        </p>

        <SectionTitle>Comparison Table</SectionTitle>

        <ScalingComparisonTable />

        <SectionTitle>Real-World Examples</SectionTitle>

        <p>Large companies use horizontal scaling ideas everywhere.</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong className="text-foreground">Instagram</strong> splits user and media data so one
            database does not carry everything.
          </li>
          <li>
            <strong className="text-foreground">Netflix</strong> runs many services and databases so
            streaming stays fast.
          </li>
          <li>
            <strong className="text-foreground">Amazon</strong> splits shopping, payments, search,
            and inventory into scalable systems.
          </li>
          <li>
            <strong className="text-foreground">YouTube</strong> distributes videos, comments, and
            recommendations across many machines.
          </li>
        </ul>

        <SectionTitle>Final Conclusion</SectionTitle>

        <p>Vertical scaling is great at the start.</p>

        <p>It is simple. It is easy to maintain. It lets you move fast.</p>

        <p>
          Horizontal scaling becomes important when your traffic and data grow beyond one machine.
          Sharding helps by giving each database a smaller job.
        </p>

        <blockquote className="rounded-2xl border-l-4 border-foreground bg-muted/40 px-5 py-4 font-medium text-foreground">
          Most startups begin vertically. Later, when scale becomes real, they move horizontally.
        </blockquote>
      </div>
    </article>
  );
}
