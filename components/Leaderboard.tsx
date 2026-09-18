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
    const poll = setInterval(load, 20_000);
    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, []);

  return (
    <section id="leaderboard" className="border-b border-line py-24">
      <div className="mx-auto max-w-2xl px-6">
        <p className="font-mono text-xs text-accent-soft">referral_leaderboard</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg">Who's moving up</h2>
        <p className="mt-3 text-muted">
          Invite builders. Earn referral credit. Move up the queue.
        </p>

        <ol className="mt-10 divide-y divide-line border-y border-line">
          {entries === null && (
            <li className="py-4 font-mono text-sm text-muted">Loading leaderboard…</li>
          )}
          {entries?.length === 0 && (
            <li className="py-4 text-muted">No referrals yet — be the first.</li>
          )}
          {entries?.map((entry) => (
            <li key={entry.rank} className="flex items-center justify-between py-4">
              <span className="flex items-center gap-4">
                <span className="tabular font-mono text-sm text-muted">
                  #{entry.rank}
                </span>
                <span className="text-fg">{entry.display_alias}</span>
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
