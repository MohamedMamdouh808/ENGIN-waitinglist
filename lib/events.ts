// Fire-and-forget client helper for first-party product events.
// Never throws; failures are console-visible only.
export type EventName =
  | "walkthrough_started"
  | "walkthrough_finished"
  | "signup"
  | "share_click";

export function logEvent(name: EventName, data?: { email?: string; metadata?: Record<string, unknown> }) {
  try {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, ...data }),
      keepalive: true,
    }).catch((err) => console.warn("[events] log failed", name, err));
  } catch (err) {
    console.warn("[events] log failed", name, err);
  }
}
