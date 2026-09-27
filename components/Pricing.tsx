// Pricing tiers and per-tier features are transcribed from the product docs:
//
//   ENGIN_PRD_v1.7.docx — Screen 5 "Settings, Billing & Team Control":
//     "Self-service controls for Free ($0), Pro ($25), Team ($75), and
//      Enterprise ($500+) tiers."
//   ENGIN_PRD_v1.7.docx — Phased Development Roadmap:
//     Phase 1 (months 1-3)  V1 Alpha / Greenfield MVP
//     Phase 2 (months 4-6)  Pro Production Engine & Monetization
//     Phase 3 (months 7-12) Enterprise & Ecosystem Expansion
//   ENGIN_Doc6_Feature_Matrix_v1.2.docx — §4.5 (team governance),
//     §4.1 (preview/Inspector), §4.2 (fixed 4-target output)
//
// IMPORTANT — how to read the phase tags:
//   Only ONE feature is explicitly tier-gated anywhere in the docs: custom
//   domain mapping, PRD line 67, "(Pro Tier feature)". Everything else is
//   placed in a tier by *inference* from the phase roadmap, so each item
//   carries the phase it actually lands in. Nothing here is a delivered
//   entitlement — the product is pre-launch.
//
//   `gov` marks Feature Matrix §4.5 governance features, which carry no
//   month range in the roadmap. They are labelled "Team governance" rather
//   than assigned an invented phase.
import { Card } from "@/components/ui/Card";

type Phase = 1 | 2 | 3 | "gov";

interface Feature {
  label: string;
  phase?: Phase;
}

const PHASE_TAG: Record<Phase, string> = {
  1: "P1",
  2: "P2",
  3: "P3",
  gov: "Governance",
};

const PHASE_LEGEND =
  "P1 = months 1-3 · P2 = months 4-6 · P3 = months 7-12. Governance = team controls from the feature matrix.";

const TIERS: {
  name: string;
  price: string;
  per?: string;
  phaseLabel: string;
  tagline: string;
  featured?: boolean;
  contact?: boolean;
  features: Feature[];
}[] = [
  {
    name: "Free",
    price: "$0",
    phaseLabel: "Phase 1 · months 1-3",
    tagline: "Everything you need to get a real app built and running.",
    features: [
      { label: "Describe your app in plain language (30+ languages)" },
      { label: "Deterministic 4-target build — Web, Mobile, Server, Database" },
      { label: "3-Pane Studio: Copilot, Blueprint, live preview" },
      { label: "Quality Gate Engine (relational & auth checks)" },
      { label: "Live Web + iPhone preview" },
      { label: "Inspector Mode — audit every output target" },
      { label: "Subdomain hosting" },
    ],
  },
  {
    name: "Pro",
    price: "$25",
    per: "/mo",
    phaseLabel: "Phase 2 · months 4-6",
    tagline: "Ship it on your own domain, with the code yours to keep.",
    featured: true,
    features: [
      { label: "Intent-gated custom domain + automated SSL", phase: 2 },
      { label: "1-click clean-code export (.zip / GitHub sync)", phase: 2 },
      { label: "Self-healing loop — auto-patches compile errors", phase: 2 },
      { label: "Non-breaking database schema evolution", phase: 2 },
      { label: "Zero-downtime cloud redeploys", phase: 2 },
      { label: "Everything in Free" },
    ],
  },
  {
    name: "Team",
    price: "$75",
    per: "/mo",
    phaseLabel: "Phase 2-3",
    tagline: "Build together, with admin control over what ships.",
    features: [
      { label: "Everything in Pro" },
      { label: "Organization & seat model", phase: "gov" },
      { label: "Roles: Owner, Admin, Editor, Viewer", phase: "gov" },
      { label: "Approval-Mode Sync — admin sign-off on diffs", phase: "gov" },
      { label: "App Hard Lock", phase: "gov" },
      { label: "Work-window time fencing", phase: "gov" },
      { label: "Multi-player studio, live cursors", phase: 3 },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    phaseLabel: "Phase 3 · months 7-12",
    tagline: "Your infrastructure, your keys, your compliance bar.",
    contact: true,
    features: [
      { label: "Everything in Team" },
      { label: "Bring your own AI keys", phase: 3 },
      { label: "Custom compiler AST injectors", phase: 3 },
      { label: "SOC2 Type II readiness", phase: 3 },
      { label: "Single-tenant VPC deployments", phase: 3 },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-5xl text-center">
        <p className="font-mono text-xs text-accent-soft">pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Simple pricing</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Start free. Upgrade when you&apos;re ready to ship on your own domain.
        </p>
        <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent-soft">
          Early-access pricing — final at launch. Waitlist members lock in early perks.
        </p>

        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={
                tier.featured
                  ? "border-accent/50 ring-1 ring-accent/30"
                  : tier.contact
                    ? "border-line/80 bg-raised/60"
                    : ""
              }
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-sm text-accent-soft">{tier.name}</p>
                <p className="font-mono text-[10px] text-muted">{tier.phaseLabel}</p>
              </div>
              <p className="mt-2 text-2xl font-semibold text-fg">
                {tier.price}
                {tier.per && <span className="text-sm font-normal text-muted">{tier.per}</span>}
              </p>
              <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {tier.features.map((f) => (
                  <li key={f.label} className="flex gap-2">
                    <span aria-hidden className="text-ok">
                      ✓
                    </span>
                    <span>
                      {f.label}
                      {f.phase && (
                        <span className="ml-1 font-mono text-[10px] text-muted/80">
                          {PHASE_TAG[f.phase]}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {tier.contact && (
                <a
                  href="mailto:hello@engin.dev?subject=ENGIN%20Enterprise"
                  className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-line bg-bg px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Talk to us
                </a>
              )}
            </Card>
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-muted">{PHASE_LEGEND}</p>
        <p className="mt-2 font-mono text-xs text-muted">Prices in USD. Cancel anytime.</p>
      </div>
    </section>
  );
}
