"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

type TokenKind = "plain" | "keyword" | "string" | "comment" | "function";

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "import",
  "from",
  "export",
  "default",
  "async",
  "await",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "try",
  "catch",
  "finally",
  "new",
  "class",
]);

function tokenizeLine(line: string) {
  const tokens: Array<{ value: string; kind: TokenKind }> = [];
  let i = 0;

  while (i < line.length) {
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ value: line.slice(i), kind: "comment" });
      break;
    }

    if (line[i] === '"' || line[i] === "'" || line[i] === "`") {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length) {
        if (line[j] === "\\" && j + 1 < line.length) {
          j += 2;
          continue;
        }
        if (line[j] === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      tokens.push({ value: line.slice(i, j), kind: "string" });
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(line[i])) {
      let j = i + 1;
      while (j < line.length && /[A-Za-z0-9_$]/.test(line[j])) j += 1;
      const word = line.slice(i, j);
      const next = line.slice(j);
      if (KEYWORDS.has(word)) {
        tokens.push({ value: word, kind: "keyword" });
      } else if (/^\s*\(/.test(next)) {
        tokens.push({ value: word, kind: "function" });
      } else {
        tokens.push({ value: word, kind: "plain" });
      }
      i = j;
      continue;
    }

    tokens.push({ value: line[i], kind: "plain" });
    i += 1;
  }

  return tokens;
}

function tokenClass(kind: TokenKind) {
  if (kind === "keyword") return "text-rose-500 dark:text-rose-400";
  if (kind === "string") return "text-emerald-500 dark:text-emerald-400";
  if (kind === "comment") return "text-zinc-500 dark:text-zinc-400 italic";
  if (kind === "function") return "text-sky-500 dark:text-sky-400";
  return "text-amber-500 dark:text-amber-300";
}

export default function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = useMemo(() => code.replace(/\r\n/g, "\n").split("\n"), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 text-xs text-muted-foreground">
        <span className="font-mono">{language}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleCopy}
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <pre className="min-w-max px-4 py-4 font-mono text-sm leading-7">
          {lines.map((line, lineIndex) => (
            <div key={`code-line-${lineIndex}`}>
              {tokenizeLine(line).map((token, tokenIndex) => (
                <span key={`token-${lineIndex}-${tokenIndex}`} className={tokenClass(token.kind)}>
                  {token.value}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
