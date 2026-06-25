"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { terminalCommands } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const WELCOME: Line[] = [
  { type: "output", text: "thales@portfolio:~$ sistema iniciado." },
  { type: "output", text: "digite 'help' para ver os comandos disponíveis." },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [{ type: "input", text: cmd }];

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const found = terminalCommands[cmd];
    if (found) {
      found.output.forEach((o) => newLines.push({ type: "output", text: o }));
      if (found.action === "scroll" && found.target) {
        document
          .querySelector(found.target)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      newLines.push({
        type: "output",
        text: `comando não encontrado: "${cmd}". digite 'help'.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-xl rounded-2xl border-2 border-ink bg-ink shadow-[6px_6px_0_0_var(--ink)] cursor-text"
    >
      <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose" />
        <span className="h-2.5 w-2.5 rounded-full bg-butter" />
        <span className="h-2.5 w-2.5 rounded-full bg-mint" />
        <span className="ml-2 font-mono text-[11px] text-paper/50">
          terminal — thales@portfolio
        </span>
      </div>

      <div
        ref={scrollRef}
        className="h-56 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed sm:text-sm"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={line.type === "input" ? "text-mint" : "text-paper/80"}
          >
            {line.type === "input" ? (
              <span className="text-lilac">$ {line.text}</span>
            ) : (
              line.text
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-lilac">$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal interativo — digite um comando"
            className="flex-1 bg-transparent text-paper outline-none caret-mint"
          />
        </div>
      </div>
    </div>
  );
}
