const ENTITIES = ["User", "Restaurant", "Table", "Reservation"];
const ROUTES = ["/", "/restaurants", "/restaurants/:id", "/bookings"];
const RULES = ["Authenticated users can reserve", "A table cannot have overlapping reservations"];

export function BlueprintStep() {
  return (
    <div className="mx-auto max-w-lg text-left">
      <p className="mb-4 text-center text-sm text-muted">
        Plain English becomes a structured specification.
      </p>
      <div className="rounded-sm border border-line bg-raised p-5">
        <p className="font-mono text-xs text-accent-soft">app</p>
        <p className="mb-4 mt-1 text-fg">Restaurant Booking</p>

        <BlueprintGroup label="Entities" items={ENTITIES} />
        <BlueprintGroup label="Routes" items={ROUTES} mono />
        <BlueprintGroup label="Rules" items={RULES} />
      </div>
    </div>
  );
}

function BlueprintGroup({
  label,
  items,
  mono = false,
}: {
  label: string;
  items: string[];
  mono?: boolean;
}) {
  return (
    <div className="mt-4 border-t border-line pt-4 first:mt-0 first:border-0 first:pt-0">
      <p className="font-mono text-xs text-muted">{label.toLowerCase()}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={`text-sm text-fg ${mono ? "font-mono text-accent-soft" : ""}`}
          >
            <span className="mr-2 text-accent">·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
