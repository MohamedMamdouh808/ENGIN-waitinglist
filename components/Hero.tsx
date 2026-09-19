"use client";

import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/scroll";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div className="relative container-engin max-w-4xl py-20 text-center sm:py-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-raised px-3 py-1 font-mono text-xs text-accent-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
          No code needed — just describe your idea
        </p>
        <h1 className="mt-6 text-[clamp(32px,6vw,60px)] font-semibold leading-[1.05] tracking-tight text-fg">
          Describe the software.
          <br />
          <span className="text-accent">ENGIN builds it.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          Turn your idea into real, working software — no coding, no guesswork. Just tell ENGIN what you want.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button onClick={() => scrollToId("signup")}>Join the waitlist — free</Button>
          <Button variant="secondary" onClick={() => scrollToId("how-it-works")}>
            See how it works
            <span aria-hidden>→</span>
          </Button>
        </div>
        <p className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-muted">
          <span className="hidden sm:inline">✓ No spam</span>
          <span className="hidden sm:inline">•</span>
          <span>Same idea. Same app. Every time.</span>
        </p>
      </div>
    </section>
  );
}
