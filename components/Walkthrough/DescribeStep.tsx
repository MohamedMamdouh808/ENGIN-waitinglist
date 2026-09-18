"use client";

import { useEffect, useState } from "react";

const PROMPT =
  "I want a restaurant booking app where customers can browse restaurants, choose a table, and reserve a time.";

export function DescribeStep() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(PROMPT);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(PROMPT.slice(0, i));
      if (i >= PROMPT.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, []);

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
