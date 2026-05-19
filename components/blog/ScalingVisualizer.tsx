"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Network,
  RotateCcw,
  Server,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const comparisonRows = [
  ["Cost", "Cheap first, costly later", "More setup, better long-term control"],
  ["Complexity", "Simple", "More moving parts"],
  ["Performance", "One strong machine", "Work shared by many machines"],
  ["Scalability", "Limited by hardware", "Can keep adding machines"],
  ["Maintenance", "Easy", "Needs monitoring and routing"],
  ["Failure Handling", "One DB can stop everything", "One shard can fail separately"],
];

const shardColors = [
  "from-sky-400 via-cyan-300 to-blue-500",
  "from-emerald-400 via-teal-300 to-cyan-500",
  "from-amber-300 via-orange-300 to-rose-400",
];

const verticalSteps = [
  {
    title: "Start with one small database server",
    description: "The app has one database. It works well when traffic is small.",
  },
  {
    title: "Traffic grows",
    description: "More users create more reads and writes. The small server starts getting busy.",
  },
  {
    title: "Upgrade the same machine",
    description: "You add more CPU, RAM, and faster storage. This is vertical scaling.",
  },
  {
    title: "The server is stronger, but still alone",
    description: "Performance improves, but the system still depends on one machine.",
  },
];

const horizontalSteps = [
  {
    title: "Start with users sending requests",
    description: "Many users open the app and create database traffic.",
  },
  {
    title: "A load balancer receives traffic",
    description: "It spreads requests across multiple app servers.",
  },
  {
    title: "App servers check where data belongs",
    description: "Each app server uses a shard rule, like user A-M or N-Z.",
  },
  {
    title: "Data goes to different shards",
    description: "Each database shard stores only one part of the data.",
  },
  {
    title: "The system can grow by adding shards",
    description: "Instead of one database doing everything, many databases share the work.",
  },
];

export function VerticalScalingDiagram() {
  const [step, setStep] = useState(0);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="bg-muted/20 p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <RequestPill key={index} active={step >= 1} delay={index} />
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <ServerBox
            title="Before"
            subtitle="Small Server"
            cpu={step >= 1 ? "92% busy" : "2 Core"}
            ram={step >= 1 ? "88% used" : "4GB"}
            disk="100GB SSD"
            fill={step >= 1 ? 92 : 35}
            fillLabel={step >= 1 ? "Almost full" : "Healthy"}
            fillColor="from-amber-300 via-orange-300 to-rose-400"
            highlighted={step <= 1}
          />
          <div className="flex justify-center text-muted-foreground">
            <span
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                step >= 2
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background"
              }`}
            >
              upgrade
            </span>
          </div>
          <ServerBox
            title="After"
            subtitle="Bigger Server"
            cpu="32 Core"
            ram="128GB"
            disk="4TB NVMe"
            fill={step >= 2 ? 42 : 0}
            fillLabel={step >= 2 ? "More room" : "Not upgraded yet"}
            fillColor="from-sky-400 via-cyan-300 to-blue-500"
            strong={step >= 2}
            highlighted={step >= 2}
          />
        </div>
      </div>

      <StepControls steps={verticalSteps} step={step} setStep={setStep} />
    </div>
  );
}

function RequestPill({ active, delay }: { active: boolean; delay: number }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs transition-all duration-500 ${
        active
          ? "translate-y-1 border-foreground bg-background text-foreground"
          : "border-border bg-background/60 text-muted-foreground"
      }`}
      style={{ transitionDelay: `${delay * 90}ms` }}
    >
      request
    </span>
  );
}

function ServerBox({
  title,
  subtitle,
  cpu,
  ram,
  disk,
  fill,
  fillLabel,
  fillColor,
  strong = false,
  highlighted = false,
}: {
  title: string;
  subtitle: string;
  cpu: string;
  ram: string;
  disk: string;
  fill: number;
  fillLabel: string;
  fillColor: string;
  strong?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all duration-500",
        strong ? "border-foreground/20 bg-background" : "border-border bg-background/70",
        highlighted && "scale-[1.02] shadow-lg shadow-foreground/5",
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold text-foreground">
        <Server className="h-5 w-5" />
        {subtitle}
      </h3>
      <LiquidDatabase fill={fill} label={fillLabel} colorClass={fillColor} className="mt-3" />
      <div className="mt-3 space-y-2 text-sm">
        <Metric icon={Cpu} label="CPU" value={cpu} />
        <Metric icon={MemoryStick} label="RAM" value={ram} />
        <Metric icon={HardDrive} label="Storage" value={disk} />
      </div>
    </div>
  );
}

function LiquidDatabase({
  fill,
  label,
  colorClass,
  className,
}: {
  fill: number;
  label: string;
  colorClass: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-muted/30 p-2.5", className)}>
      <div className="relative mx-auto h-20 w-24 overflow-hidden rounded-[50%/14%] border border-border bg-background shadow-inner sm:h-24 sm:w-28">
        <div className="absolute left-0 right-0 top-0 z-20 h-4 rounded-[50%] border border-border bg-background/80" />
        <motion.div
          className={cn("absolute bottom-0 left-0 right-0 bg-gradient-to-t", colorClass)}
          initial={{ height: "0%" }}
          animate={{ height: `${fill}%` }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <motion.div
            className="absolute -top-2 left-[-20%] h-4 w-[140%] rounded-[50%] bg-white/35"
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-x-3 top-4 h-3 rounded-full bg-white/20 blur-sm"
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center">
          <Database className="h-5 w-5 text-foreground" />
          <p className="mt-1 font-mono text-base font-semibold text-foreground">{fill}%</p>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  );
}

export function ShardingArchitectureDiagram() {
  const [step, setStep] = useState(0);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="bg-muted/20 p-3 sm:p-4">
        <div className="mx-auto max-w-xl space-y-2.5 text-center">
          <DiagramNode icon={Users} title="Users" text="Many people use the app" active={step >= 0} />
          <Connector active={step >= 1} />
          <DiagramNode
            icon={Network}
            title="Load Balancer"
            text="Sends traffic to app servers"
            active={step >= 1}
          />
          <Connector active={step >= 2} />
          <div className="grid gap-3 sm:grid-cols-2">
            <DiagramNode icon={Server} title="App 1" text="Checks shard rule" active={step >= 2} />
            <DiagramNode icon={Server} title="App 2" text="Routes request" active={step >= 2} />
          </div>
          <Connector active={step >= 3} />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Shard 1", "Users A-M", "62% full"],
              ["Shard 2", "Users N-Z", "48% full"],
              ["Shard 3", "Orders", "73% full"],
            ].map(([title, range, fill], index) => {
              const numericFill = Number(fill.replace("% full", ""));

              return (
              <div
                key={title}
                className={cn(
                  "rounded-2xl border bg-background p-3 text-left transition-all duration-500",
                  step >= 3
                    ? "border-foreground/20 shadow-lg shadow-foreground/5"
                    : "border-border opacity-60",
                  step >= 4 && index === 2 && "scale-[1.03]",
                )}
              >
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Database className="h-5 w-5" />
                  {title}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{range}</p>
                <LiquidDatabase
                  fill={step >= 3 ? numericFill : 0}
                  label={step >= 3 ? fill : "waiting"}
                  colorClass={shardColors[index]}
                  className="mt-2"
                />
                <p className="mt-1 text-xs text-muted-foreground">{fill}</p>
              </div>
              );
            })}
          </div>
        </div>
      </div>

      <StepControls steps={horizontalSteps} step={step} setStep={setStep} />
    </div>
  );
}

function DiagramNode({
  icon: Icon,
  title,
  text,
  active = false,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-background p-3 transition-all duration-500",
        active ? "border-foreground/20 shadow-lg shadow-foreground/5" : "border-border opacity-60",
      )}
    >
      <Icon className="mx-auto h-5 w-5 text-foreground" />
      <p className="mt-1 font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Connector({ active = false }: { active?: boolean }) {
  return (
    <div className="mx-auto h-5 w-px overflow-hidden bg-border">
      <div
        className={cn(
          "h-full w-full origin-top bg-foreground transition-transform duration-500",
          active ? "scale-y-100" : "scale-y-0",
        )}
      />
    </div>
  );
}

function StepControls({
  steps,
  step,
  setStep,
}: {
  steps: Array<{ title: string; description: string }>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="space-y-2.5 border-t border-border px-4 py-3 sm:px-5">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setStep(0)}
          aria-label="Reset visualization"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setStep((currentStep) => Math.max(0, currentStep - 1))}
          disabled={step === 0}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => setStep((currentStep) => Math.min(steps.length - 1, currentStep + 1))}
          disabled={step === steps.length - 1}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Step {step + 1} of {steps.length}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          {steps[step].title}
        </h3>
        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          {steps[step].description}
        </p>
      </div>

      <div className="mx-auto flex max-w-sm gap-1.5">
        {steps.map((item, index) => (
          <span
            key={item.title}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              index <= step ? "bg-foreground" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function ScalingComparisonTable() {
  const [active, setActive] = useState<"vertical" | "horizontal">("vertical");

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <p className="font-semibold text-foreground">Comparison</p>
        <div className="rounded-lg bg-muted p-1">
          <button
            type="button"
            onClick={() => setActive("vertical")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active === "vertical" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            Vertical
          </button>
          <button
            type="button"
            onClick={() => setActive("horizontal")}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active === "horizontal" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            Horizontal
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead className="bg-muted/60 text-foreground">
            <tr>
              <th className="border-b border-border px-4 py-3 font-semibold">Area</th>
              <th className={cn("border-b border-border px-4 py-3 font-semibold", active === "vertical" && "bg-background")}>
                Vertical Scaling
              </th>
              <th className={cn("border-b border-border px-4 py-3 font-semibold", active === "horizontal" && "bg-background")}>
                Horizontal Scaling
              </th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {comparisonRows.map(([area, vertical, horizontal]) => (
              <tr key={area}>
                <td className="border-b border-border px-4 py-3 font-medium text-foreground">{area}</td>
                <td className={cn("border-b border-border px-4 py-3", active === "vertical" && "bg-muted/30 text-foreground")}>
                  {vertical}
                </td>
                <td className={cn("border-b border-border px-4 py-3", active === "horizontal" && "bg-muted/30 text-foreground")}>
                  {horizontal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ShardCodeExample() {
  const [copied, setCopied] = useState(false);
  const code = `function pickShard(userName) {
  const firstLetter = userName[0].toUpperCase();

  if (firstLetter <= "M") return "DB_SHARD_1";
  return "DB_SHARD_2";
}`;

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs text-muted-foreground">
        <span className="font-mono">shard-router.js</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={copyCode}
          aria-label="Copy code"
          title="Copy code"
          className="h-7 w-7"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7 text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
