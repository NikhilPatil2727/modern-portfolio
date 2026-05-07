"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Draw the ring",
    description: "Start with a circular hash space from 0 to 2³².",
  },
  {
    title: "Hash servers onto the ring",
    description: "Server A, Server B, and Server C land at fixed points.",
  },
  {
    title: 'Hash key "user:42" onto the ring',
    description: "The key gets its own position on the same hash ring.",
  },
  {
    title: "Walk clockwise to find the nearest server",
    description: "Move clockwise from the key until the first server appears.",
  },
  {
    title: "Server B owns the key",
    description: 'The first clockwise server from "user:42" is Server B.',
  },
];

type Point = {
  label: string;
  angle: number;
  color: string;
  type: "server" | "key";
};

const servers: Point[] = [
  { label: "Server A", angle: 315, color: "#14b8a6", type: "server" },
  { label: "Server B", angle: 68, color: "#8b5cf6", type: "server" },
  { label: "Server C", angle: 205, color: "#fb7185", type: "server" },
];

const keyPoint: Point = {
  label: "user:42",
  angle: 18,
  color: "#f59e0b",
  type: "key",
};

function polarToCartesian(center: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: center + radius * Math.cos(radians),
    y: center + radius * Math.sin(radians),
  };
}

function drawPoint(
  context: CanvasRenderingContext2D,
  point: Point,
  center: number,
  radius: number,
  scale: number,
) {
  const position = polarToCartesian(center, radius, point.angle);
  const labelPosition = polarToCartesian(center, radius + 34 * scale, point.angle);

  context.save();
  context.beginPath();
  context.arc(position.x, position.y, 10 * scale, 0, Math.PI * 2);
  context.fillStyle = point.color;
  context.shadowColor = point.color;
  context.shadowBlur = 18 * scale;
  context.fill();
  context.restore();

  context.save();
  context.fillStyle = point.color;
  context.font = `${point.type === "key" ? 700 : 600} ${13 * scale}px Inter, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(point.label, labelPosition.x, labelPosition.y);
  context.restore();
}

function drawArrow(
  context: CanvasRenderingContext2D,
  center: number,
  radius: number,
  scale: number,
) {
  context.save();
  context.strokeStyle = "#f59e0b";
  context.lineWidth = 4 * scale;
  context.lineCap = "round";
  context.setLineDash([8 * scale, 8 * scale]);
  context.beginPath();
  context.arc(
    center,
    center,
    radius,
    ((keyPoint.angle - 90) * Math.PI) / 180,
    ((servers[1].angle - 90) * Math.PI) / 180,
  );
  context.stroke();
  context.setLineDash([]);

  const arrowPosition = polarToCartesian(center, radius, 56);
  context.translate(arrowPosition.x, arrowPosition.y);
  context.rotate(((56 + 75) * Math.PI) / 180);
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(-12 * scale, -6 * scale);
  context.lineTo(-12 * scale, 6 * scale);
  context.closePath();
  context.fillStyle = "#f59e0b";
  context.fill();
  context.restore();
}

export default function ConsistentHashingVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [width, setWidth] = useState(720);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(280, Math.floor(entry.contentRect.width)));
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = Math.min(width, 430);
    const pixelRatio = window.devicePixelRatio || 1;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = size * pixelRatio;
    canvas.height = size * pixelRatio;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, size, size);

    const center = size / 2;
    const scale = size / 560;
    const radius = center - 82 * scale;

    context.save();
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.strokeStyle = "rgba(113, 113, 122, 0.32)";
    context.lineWidth = 4 * scale;
    context.stroke();
    context.restore();

    context.save();
    context.fillStyle = "rgba(113, 113, 122, 0.78)";
    context.font = `${13 * scale}px Inter, sans-serif`;
    context.textAlign = "center";
    context.fillText("Hash ring: 0 to 2³²", center, center - 8 * scale);
    context.fillText("Keys move clockwise", center, center + 14 * scale);
    context.restore();

    if (step >= 1) {
      servers.forEach((server) => drawPoint(context, server, center, radius, scale));
    }

    if (step >= 2) {
      drawPoint(context, keyPoint, center, radius, scale);
    }

    if (step >= 3) {
      drawArrow(context, center, radius, scale);
    }

    if (step >= 4) {
      const serverB = polarToCartesian(center, radius, servers[1].angle);

      context.save();
      context.beginPath();
      context.arc(serverB.x, serverB.y, 21 * scale, 0, Math.PI * 2);
      context.strokeStyle = "#8b5cf6";
      context.lineWidth = 4 * scale;
      context.stroke();
      context.restore();

      context.save();
      context.fillStyle = "#8b5cf6";
      context.font = `700 ${18 * scale}px Inter, sans-serif`;
      context.textAlign = "center";
      context.fillText("Server B owns user:42", center, size - 30 * scale);
      context.restore();
    }
  }, [step, width]);

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div ref={wrapperRef} className="flex justify-center bg-muted/20 px-3 py-3 sm:py-4">
        <canvas ref={canvasRef} aria-label="Consistent hashing ring step-by-step visualization" />
      </div>

      <div className="space-y-3 border-t border-border px-4 py-3 sm:px-5">
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
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                index <= step ? "bg-foreground" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
