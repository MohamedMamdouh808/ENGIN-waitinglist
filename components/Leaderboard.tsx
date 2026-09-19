"use client";

import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "@/lib/types";

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/waitlist/leaderboard", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) setEntries(data.entries);
      } catch {
        // Leave the previous entries in place if a refresh fails.
      }
    }

    load();
    const poll = setInterval(() => {
      if (!document.hidden) load();
    }, 20_000);
    const onVis = () => {
      if (!document.hidden) load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelled = true;
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <section id="leaderboard" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-2xl">
        <p className="font-mono text-xs text-accent-soft">referral_leaderboard</p>
        <h2 id="leaderboard-heading" className="mt-3 text-3xl font-semibold tracking-tight text-fg">
          Who&apos;s moving up
        </h2>
        <p className="mt-3 text-muted">Invite friends. Each invite moves you forward. See who&apos;s ahead.</p>

        <ol
          aria-labelledby="leaderboard-heading"
          className="mt-10 divide-y divide-line overflow-hidden rounded-md border border-line"
        >
          {entries === null && (
            <li className="flex items-center gap-3 px-4 py-4 font-mono text-sm text-muted">
              <span className="h-4 w-4 animate-pulse rounded-full bg-line" aria-hidden />
              Loading leaderboard…
            </li>
          )}
          {entries?.length === 0 && (
            <li className="px-4 py-8 text-center text-muted">
              No referrals yet — be the first to invite and jump the queue.
            </li>
          )}
          {entries?.map((entry) => (
            <li
              key={`${entry.display_alias}-${entry.rank}`}
              className="flex items-center justify-between px-4 py-4"
            >
              <span className="flex items-center gap-4">
                <span className="tabular font-mono text-sm text-muted">#{entry.rank}</span>
                <span className="font-medium text-fg">{entry.display_alias}</span>
              </span>
              <span className="tabular font-mono text-sm text-accent-soft">
                {entry.referral_count} referral{entry.referral_count === 1 ? "" : "s"}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
