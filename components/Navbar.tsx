"use client";

import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { scrollToId } from "@/lib/scroll";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <div className="container-engin flex items-center justify-between py-4">
        <a
          href="#top"
          aria-label="ENGIN home"
          className="flex items-center gap-2 font-mono text-sm tracking-tight text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="inline-block h-2 w-2 rounded-sm bg-accent" aria-hidden="true" />
          ENGIN
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#how-it-works" className="hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            How it works
          </a>
          <a href="#leaderboard" className="hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Leaderboard
          </a>
          <a href="#faq" className="hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="secondary" className="text-xs" onClick={() => scrollToId("signup")}>
            Join the waitlist
          </Button>
        </div>
      </div>
    </header>
  );
}
