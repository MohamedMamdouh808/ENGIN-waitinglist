"use client";

import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <p className="font-mono text-xs text-accent-soft">deterministic_compiler // software</p>
        <h1 className="mt-6 text-5xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-6xl">
          Describe the software.
          <br />
          ENGIN compiles it.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          ENGIN turns plain-English product requirements into structured
          Blueprints, validates them against a fixed set of rules, and
          deterministically compiles them into working software.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={() => scrollToId("signup")}>Join the waitlist</Button>
          <Button variant="secondary" onClick={() => scrollToId("how-it-works")}>
            See how ENGIN works ↓
          </Button>
        </div>
        <p className="mt-6 font-mono text-xs text-muted">
          Same Blueprint. Same build.
        </p>
      </div>
    </section>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
