const STEP_LABELS = [
  "Describe",
  "Blueprint",
  "Quality gates",
  "Compiler",
  "Preview",
  "Deploy",
];

export function WalkthroughProgress({ step }: { step: number }) {
  const pct = ((step + 1) / STEP_LABELS.length) * 100;
  return (
    <div className="mx-auto mb-10 max-w-lg" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEP_LABELS.length} aria-label="Walkthrough progress">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          {step + 1} / {STEP_LABELS.length}
        </span>
        <span className="text-sm font-medium text-fg">{STEP_LABELS[step]}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-1.5 rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
