"use client";

import { Button } from "@/components/ui/Button";
import { scrollToId } from "@/lib/scroll";

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-engin max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Your idea deserves real software.</h2>
        <p className="mx-auto mt-4 max-w-md text-muted">Join the waitlist — free, no spam, and invite friends to move forward faster.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={() => scrollToId("signup")}>Join the waitlist — free</Button>
          <Button variant="secondary" onClick={() => scrollToId("how-it-works")}>
            See how it works
          </Button>
        </div>
        <p className="mt-12 font-mono text-sm tracking-tight text-muted">ENGIN — Describe it. Build it. Ship it.</p>
      </div>
    </section>
  );
}
