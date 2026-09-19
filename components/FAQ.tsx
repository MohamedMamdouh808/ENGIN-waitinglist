"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What is ENGIN, in simple terms?",
    a: "Tell ENGIN what you want in plain English — like “a restaurant booking app.” ENGIN turns it into a clear plan and builds the working software for you. Same idea, same app, every time.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You describe your idea in words. ENGIN handles the planning, building, and deployment. No coding or technical setup needed.",
  },
  {
    q: "How is this different from other AI tools?",
    a: "Other tools often guess. ENGIN validates your idea against fixed rules first, then builds deterministically — so the same plan always produces the same reliable app.",
  },
  {
    q: "How long does it take?",
    a: "Describe → get a preview in minutes. The walkthrough on this page shows the 6 steps. Early access members will be first to try the full build.",
  },
  {
    q: "How much will it cost?",
    a: "Joining the waitlist is free. Pricing will be shared with early members first — waitlisters get priority and early perks.",
  },
  {
    q: "What happens after I join?",
    a: "You get your queue position and a referral link. Each friend who joins with your link moves you 25 spots forward. We’ll email you when it’s your turn.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-2xl">
        <p className="font-mono text-xs text-accent-soft">faq</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Common questions</h2>
        <p className="mt-3 text-muted">Everything you need to know before you join.</p>

        <div className="mt-10 divide-y divide-line overflow-hidden rounded-md border border-line">
          {FAQS.map((item, i) => (
            <div key={item.q}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <span className="pr-4 text-sm font-medium text-fg">{item.q}</span>
                <span aria-hidden className="shrink-0 font-mono text-muted">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-line bg-raised px-4 py-4">
                  <p className="text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
