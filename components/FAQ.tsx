"use client";

import { useState } from "react";

// DRAFT answers grounded in existing repo claims (README, hero, walkthrough,
// queue/referral mechanics). Team approval needed before treating as final —
///flag any line that overstates and it will be trimmed back to TODO.
const FAQS = [
  {
    q: "What is ENGIN?",
    a: "ENGIN turns plain-English product requirements into structured Blueprints and deterministically compiles them into working software — describe what you want, and get a real app. Same Blueprint, same build, every time.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. You describe your idea in words — like the restaurant booking example in the walkthrough above — and ENGIN handles the planning, building, and deployment. No setup, no code.",
  },
  {
    q: "How is this different from other AI tools?",
    a: "Most tools guess — the same prompt can give a different app every run. ENGIN validates your idea against fixed rules first, then builds deterministically with no AI in the build step, so the same Blueprint always produces the same app. You can inspect and audit every step.",
  },
  {
    q: "How long does it take?",
    a: "The walkthrough on this page takes about a minute and shows the 6 steps your idea goes through: Describe, Blueprint, quality gates, Compiler, Preview, Deploy. Early members build and preview real apps from there.",
  },
  {
    q: "What does it cost?",
    a: "Four tiers: Free ($0), Pro ($25/mo), Team ($75/mo), and Enterprise (custom). Every plan includes the deterministic 4-target build, the 3-Pane Studio, and Inspector Mode — Pro adds your own domain and clean-code export, Team adds org seats and approval workflows, Enterprise adds your own AI keys and single-tenant VPC. Pricing is early-access and final at launch; waitlist members lock in early perks.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "You get a queue position and a referral link. Every friend who joins with your link moves you 25 spots closer to the front. We'll email you when it's your turn — one email, no spam.",
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
