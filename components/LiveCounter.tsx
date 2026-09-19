"use client";

import { useEffect, useRef, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [bump, setBump] = useState(false);
  const prevCount = useRef<number | null>(null);

  const bumpTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function fetchStats() {
    try {
      const res = await fetch("/api/waitlist/stats", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setCount((current) => {
        if (current !== null && data.total_signups > current) {
          setBump(true);
          if (bumpTimeout.current) clearTimeout(bumpTimeout.current);
          bumpTimeout.current = setTimeout(() => setBump(false), 260);
        }
        return data.total_signups;
      });
    } catch {
      // Silent — the counter just holds its last known value.
    }
  }

  useEffect(() => {
    let hidden = false;
    const onVis = () => {
      hidden = document.hidden;
      if (!hidden) fetchStats();
    };
    document.addEventListener("visibilitychange", onVis);

    fetchStats();

    const channel = supabaseBrowser
      .channel("waitlist-counter")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "waitlist_users" },
        () => {
          if (!document.hidden) fetchStats();
        }
      )
      .subscribe();

    const poll = setInterval(() => {
      if (!document.hidden) fetchStats();
    }, 15_000);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      supabaseBrowser.removeChannel(channel);
      clearInterval(poll);
      if (bumpTimeout.current) clearTimeout(bumpTimeout.current);
    };
  }, []);

  return (
    <section className="border-b border-line py-12 sm:py-16">
      <div className="container-engin max-w-4xl text-center">
        {count === null ? (
          <div className="mx-auto h-14 w-32 animate-pulse rounded-md bg-line sm:h-16 sm:w-40" aria-hidden />
        ) : (
          <p
            className={`tabular font-mono text-5xl font-semibold text-fg sm:text-6xl ${bump ? "animate-count-up" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {count.toLocaleString()}
          </p>
        )}
        <p className="mt-3 text-muted">
          {count === null ? "Loading builders…" : "builders are already in line."}
        </p>
      </div>
    </section>
  );
}
