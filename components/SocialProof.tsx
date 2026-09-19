export function SocialProof() {
  return (
    <section className="border-b border-line py-16 sm:py-20">
      <div className="container-engin max-w-4xl">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="card p-6 text-center">
            <p className="font-mono text-2xl font-semibold text-accent">No-code</p>
            <p className="mt-2 text-sm text-muted">Just describe your idea in plain English. No setup, no code.</p>
          </div>
          <div className="card p-6 text-center">
            <p className="font-mono text-2xl font-semibold text-accent">Reliable</p>
            <p className="mt-2 text-sm text-muted">Same plan → same app. Validated before building, not guessed.</p>
          </div>
          <div className="card p-6 text-center">
            <p className="font-mono text-2xl font-semibold text-accent">Fast</p>
            <p className="mt-2 text-sm text-muted">From idea to live preview in minutes. Share and move up the queue.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2 font-mono text-xs text-muted">
          <span className="rounded-full border border-line bg-raised px-3 py-1">Free to join</span>
          <span className="rounded-full border border-line bg-raised px-3 py-1">No spam</span>
          <span className="rounded-full border border-line bg-raised px-3 py-1">25 spots per referral</span>
        </div>
      </div>
    </section>
  );
}
