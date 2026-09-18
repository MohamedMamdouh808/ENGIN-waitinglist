const STEP_LABELS = [
  "Describe",
  "Blueprint",
  "Quality gates",
  "Compiler",
  "Preview",
  "Deploy",
];

export function WalkthroughProgress({ step }: { step: number }) {
  return (
    <div className="mx-auto mb-10 max-w-lg">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          {step + 1} / {STEP_LABELS.length}
        </span>
        <span className="text-sm text-fg">{STEP_LABELS[step]}</span>
      </div>
      <div className="mt-3 h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
