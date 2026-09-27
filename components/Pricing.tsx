// Pricing — DRAFT numbers for deck/demo purposes.
// TODO: client copy — prices, tiers, and features below are SAMPLE data,
// not approved pricing. Confirm real numbers with the team before launch.
import { Card } from "@/components/ui/Card";

const TIERS: {
  name: string;
  price: string;
  per?: string;
  tagline: string;
  featured?: boolean;
  features: string[];
}[] = [
  {
    name: "Starter",
    price: "Free",
    tagline: "For trying your first idea.",
    features: [
      "1 project from plain-English description",
      "Inspect the Blueprint for every build",
      "Live preview link to share",
      "Community waitlist queue",
    ],
  },
  {
    name: "Builder",
    price: "$19",
    per: "/mo",
    tagline: "For shipping real products.",
    featured: true,
    features: [
      "Unlimited Blueprints + rebuilds",
      "Audit every step before deploy",
      "Priority build queue",
      "Custom domain on deploy",
      "25-spot referral boosts carry over",
    ],
  },
  {
    name: "Team",
    price: "$49",
    per: "/mo",
    tagline: "For building together.",
    features: [
      "Everything in Builder",
      "Shared workspace, 5 seats",
      "Review gates before ship",
      "Preview per branch",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-4xl text-center">
        <p className="font-mono text-xs text-accent-soft">pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Simple pricing</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Start free. Upgrade when you&apos;re ready to ship. Waitlist members lock in early perks.
        </p>
        <p className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-warn/30 bg-warn/10 px-3 py-1 font-mono text-xs text-warn">
          SAMPLE PRICING — final numbers TBD
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={tier.featured ? "border-accent/50 ring-1 ring-accent/30" : ""}
            >
              <p className="font-mono text-sm text-accent-soft">{tier.name}</p>
              <p className="mt-2 text-2xl font-semibold text-fg">
                {tier.price}
                {tier.per && <span className="text-sm font-normal text-muted">{tier.per}</span>}
              </p>
              <p className="mt-1 text-sm text-muted">{tier.tagline}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-ok">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">Prices in USD. Cancel anytime.</p>
      </div>
    </section>
  );
}
