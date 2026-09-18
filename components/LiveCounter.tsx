"use client";

import { useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [bump, setBump] = useState(false);
  const prevCount = useRef<number | null>(null);

  async function fetchStats() {
    try {
      const res = await fetch("/api/waitlist/stats", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setCount((current) => {
        if (current !== null && data.total_signups > current) {
          setBump(true);
          setTimeout(() => setBump(false), 260);
        }
        return data.total_signups;
      });
    } catch {
      // Silent — the counter just holds its last known value.
    }
  }

  useEffect(() => {
    fetchStats();

    // Realtime is the primary path; polling is the fallback so the
    // counter never goes stale if the realtime channel drops.
    const channel = supabaseBrowser
      .channel("waitlist-counter")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "waitlist_users" },
        () => fetchStats()
      )
      .subscribe();

    const poll = setInterval(fetchStats, 15_000);

    return () => {
      supabaseBrowser.removeChannel(channel);
      clearInterval(poll);
    };
  }, []);

  return (
    <section className="border-b border-line py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p
          key={count ?? "loading"}
          className={`tabular font-mono text-5xl font-semibold text-fg sm:text-6xl ${
            bump ? "animate-count-up" : ""
          }`}
          aria-live="polite"
        >
          {count === null ? "—" : count.toLocaleString()}
        </p>
        <p className="mt-3 text-muted">builders are already in line.</p>
      </div>
    </section>
  );
}
