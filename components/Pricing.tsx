// Pricing/trust scaffold — structure only.
// TODO: client copy — no prices, tiers, or claims here are real.
// Fill in with approved pricing before launch; keep hidden until then
// (rendered with placeholder cards so layout can be reviewed).
import { Card } from "@/components/ui/Card";

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-4xl text-center">
        <p className="font-mono text-xs text-accent-soft">pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Simple pricing</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          TODO: client copy — one line on the pricing model. Waitlist members get early perks.
        </p>

        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {["Starter", "Builder", "Team"].map((tier) => (
            <Card key={tier}>
              <p className="font-mono text-sm text-accent-soft">{tier}</p>
              <p className="mt-2 text-2xl font-semibold text-fg">TODO price</p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>TODO: client copy — feature 1</li>
                <li>TODO: client copy — feature 2</li>
                <li>TODO: client copy — feature 3</li>
              </ul>
            </Card>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">TODO: client copy — billing note (monthly/annual, free tier?).</p>
      </div>
    </section>
  );
}
