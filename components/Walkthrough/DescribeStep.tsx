"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { TYPING_INTERVAL_MS } from "@/lib/constants";

const PROMPT =
  "I want a restaurant booking app where customers can browse restaurants, choose a table, and reserve a time.";

export function DescribeStep() {
  const [typed, setTyped] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setTyped(PROMPT);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(id);
    }, TYPING_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-sm text-muted">Start with what you want to build.</p>
      <div className="rounded-sm border border-line bg-raised p-5">
        <p className="mb-3 font-mono text-xs text-muted">describe your product</p>
        <p className="min-h-[4.5rem] text-left text-fg">
          {typed}
          <span className="animate-blink text-accent">|</span>
        </p>
      </div>
    </div>
  );
}
