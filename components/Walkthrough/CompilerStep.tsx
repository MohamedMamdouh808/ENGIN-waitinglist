const FILES = [
  "app/restaurants/",
  "app/bookings/",
  "components/",
  "api/",
  "database/",
];

const GENERATED = [
  "Routes generated",
  "Components generated",
  "Server logic generated",
  "Database schema generated",
];

export function CompilerStep() {
  return (
    <div className="mx-auto max-w-lg text-left">
      <p className="mb-4 text-center text-sm text-muted">
        The compiler turns the validated Blueprint into code, deterministically.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-line bg-raised p-5">
          <p className="font-mono text-xs text-muted">app/</p>
          <ul className="mt-3 space-y-1.5 font-mono text-sm text-accent-soft">
            {FILES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-sm border border-line bg-raised p-5">
          <p className="font-mono text-xs text-muted">build_output</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {GENERATED.map((g) => (
              <li key={g} className="flex items-center gap-2 text-fg">
                <span className="text-ok">✓</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        AI produces the Blueprint. The compiler produces the software.
      </p>
    </div>
  );
}
