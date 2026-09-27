"use client";

import { useState } from "react";

// TODO: client copy — answers below are placeholders, not approved claims.
// Replace each `a` before launch. Do not ship invented pricing or timelines.
const FAQS = [
  {
    q: "What is ENGIN?",
    a: "TODO: client copy — one plain-English sentence on what ENGIN does.",
  },
  {
    q: "Do I need to know how to code?",
    a: "TODO: client copy — confirm whether coding is needed.",
  },
  {
    q: "How long does it take?",
    a: "TODO: client copy — do not invent timelines; confirm with the team.",
  },
  {
    q: "What does it cost?",
    a: "TODO: client copy — do not invent pricing; confirm with the team.",
  },
  {
    q: "What happens after I join the waitlist?",
    a: "TODO: client copy — confirm the post-signup flow (queue, referrals, email).",
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
