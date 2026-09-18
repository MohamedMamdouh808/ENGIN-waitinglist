"use client";

import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Software should be built from intent, not guesswork.
        </h2>
        <div className="mt-10">
          <Button onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}>
            Join the waitlist
          </Button>
        </div>
        <p className="mt-12 font-mono text-sm tracking-tight text-muted">ENGIN</p>
      </div>
    </section>
  );
}
