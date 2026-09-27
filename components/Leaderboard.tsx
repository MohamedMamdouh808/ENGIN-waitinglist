"use client";

import { useEffect, useState } from "react";
import { POLL_LEADERBOARD_MS } from "@/lib/constants";
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
      } catch (err) {
        // Leave the previous entries in place if a refresh fails.
        console.warn("[waitlist] leaderboard fetch failed", err);
      }
    }

    load();
    const poll = setInterval(() => {
      if (!document.hidden) load();
    }, POLL_LEADERBOARD_MS);
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
        <p className="font-mono text-xs text-accent-soft">open_leaderboard</p>
        <h2 id="leaderboard-heading" className="mt-3 text-3xl font-semibold tracking-tight text-fg">
          Everyone&apos;s in line
        </h2>
        <p className="mt-3 text-muted">
          Every signup shows up here. Invite friends to climb — names are optional, emails stay private.
        </p>

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
              No one&apos;s here yet — join and be first in line.
            </li>
          )}
          {entries?.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between px-4 py-4">
              <span className="flex items-center gap-4">
                <span className="tabular font-mono text-sm text-muted">#{entry.rank}</span>
                <span className="font-medium text-fg">{entry.label}</span>
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
