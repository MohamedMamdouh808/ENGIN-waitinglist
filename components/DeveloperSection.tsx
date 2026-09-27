"use client";

import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/scroll";

export function DeveloperSection() {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <div className="container-engin max-w-3xl text-center">
        <p className="font-mono text-xs text-accent-soft">for_developers</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">
          Built for developers who don&apos;t trust black boxes.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
          Same spec in, same architecture out. Inspect the Blueprint, audit every step, and see
          exactly what gets built. The build step uses no AI, so results don&apos;t drift between
          runs.
        </p>
        <div className="mt-8">
          <Button variant="secondary" onClick={() => scrollToId("how-it-works")}>
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}
