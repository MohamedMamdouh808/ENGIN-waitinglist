"use client";

import { useEffect, useState } from "react";

const STAGES = ["Build", "Validate", "Deploy"];

export function DeployStep() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setDone((d) => (d < STAGES.length ? d + 1 : d));
    }, 350);
    return () => clearInterval(id);
  }, []);

  const live = done >= STAGES.length;

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-sm border border-line bg-raised p-5">
        <ul className="flex justify-center gap-8">
          {STAGES.map((stage, i) => (
            <li key={stage} className="flex flex-col items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-xs ${
                  i < done
                    ? "border-ok text-ok"
                    : "border-line text-muted"
                }`}
              >
                {i < done ? "✓" : i + 1}
              </span>
              <span className={`text-sm ${i < done ? "text-fg" : "text-muted"}`}>{stage}</span>
            </li>
          ))}
        </ul>

        {live && (
          <div className="mt-6 border-t border-line pt-5 text-center">
            <p className="text-fg">Your application is live.</p>
            <p className="mt-1 font-mono text-sm text-accent-soft">restaurant-booking.engin.dev</p>
          </div>
        )}
      </div>

      {live && (
        <div className="mt-8 text-center">
          <p className="text-lg text-fg">That's ENGIN.</p>
          <p className="mt-2 font-mono text-sm text-muted">
            Describe it. Specify it. Compile it. Ship it.
          </p>
        </div>
      )}
    </div>
  );
}
