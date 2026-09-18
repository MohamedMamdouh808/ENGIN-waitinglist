"use client";

import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight text-fg">
          <span className="inline-block h-2 w-2 bg-accent" aria-hidden="true" />
          ENGIN
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#how-it-works" className="hover:text-fg">
            How it works
          </a>
          <a href="#leaderboard" className="hover:text-fg">
            Leaderboard
          </a>
        </nav>
        <Button variant="secondary" className="text-xs" onClick={() => scrollToId("signup")}>
          Join the waitlist
        </Button>
      </div>
    </header>
  );
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
