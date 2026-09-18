"use client";

import { useEffect, useState } from "react";

const CHECKS = [
  "Entity relationships",
  "Foreign keys",
  "Authentication guards",
  "Component bindings",
  "Required fields",
  "Ownership rules",
];

export function QualityGateStep() {
  const [visible, setVisible] = useState(0);
  const [flaggedResolved, setFlaggedResolved] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v < CHECKS.length ? v + 1 : v));
    }, 220);
    const resolve = setTimeout(() => setFlaggedResolved(true), CHECKS.length * 220 + 700);
    return () => {
      clearInterval(id);
      clearTimeout(resolve);
    };
  }, []);

  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-sm text-muted">
        ENGIN doesn't silently invent missing architecture.
      </p>
      <div className="rounded-sm border border-line bg-raised p-5 text-left">
        <p className="font-mono text-xs text-muted">quality_gates</p>
        <ul className="mt-3 space-y-2">
          {CHECKS.map((check, i) => (
            <li key={check} className="flex items-center gap-3 text-sm">
              <span
                className={`font-mono ${i < visible ? "text-ok" : "text-line"}`}
                aria-hidden="true"
              >
                {i < visible ? "✓" : "·"}
              </span>
              <span className={i < visible ? "text-fg" : "text-muted"}>{check}</span>
            </li>
          ))}
        </ul>

        {visible >= CHECKS.length && (
          <div className="mt-4 border-t border-line pt-4">
            {!flaggedResolved ? (
              <p className="text-sm text-warn">
                Ambiguous requirement detected — clarify booking conflict behavior.
              </p>
            ) : (
              <p className="text-sm text-ok">✓ Blueprint valid</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
