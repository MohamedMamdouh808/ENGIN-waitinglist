const RESTAURANTS = [
  { name: "Olive & Ash", note: "Tables from 6:00 PM" },
  { name: "Casa Marea", note: "Tables from 5:30 PM" },
];

export function PreviewStep() {
  return (
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-center text-sm text-muted">Your live preview — generated from your plan.</p>
      <div className="overflow-hidden rounded-md border border-line">
        <div className="flex items-center gap-1.5 border-b border-line bg-raised px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-2 font-mono text-xs text-muted">restaurant-booking.engin.dev</span>
        </div>
        <div className="bg-bg p-4 text-left">
          <p className="text-sm font-medium text-fg">Book a table</p>
          <div className="mt-3 space-y-2">
            {RESTAURANTS.map((r) => (
              <div
                key={r.name}
                className="flex items-center justify-between rounded-sm border border-line px-3 py-2.5"
              >
                <div>
                  <p className="text-sm text-fg">{r.name}</p>
                  <p className="text-xs text-muted">{r.note}</p>
                </div>
                <span className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white">
                  Reserve
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
