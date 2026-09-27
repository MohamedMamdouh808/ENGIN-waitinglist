"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { WaitlistState } from "@/lib/types";

interface WaitlistFormProps {
  refCode: string | null;
  utmSource: string | null;
  onSuccess: (state: WaitlistState) => void;
}

export function WaitlistForm({ refCode, utmSource, onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [hideFromLeaderboard, setHideFromLeaderboard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ref: refCode ?? undefined,
          name: name.trim() ? name.trim() : undefined,
          hideFromLeaderboard: hideFromLeaderboard || undefined,
          utm_source: utmSource ?? undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message ?? "Something didn't go through. Try again.");
        return;
      }

      // API returns { already_registered: true, state } for returning emails
      // and { already_registered: false, state } for new signups — both are success
      if (data.state) {
        window.localStorage.setItem("engin_waitlist_email", email.trim().toLowerCase());
        onSuccess(data.state);
        return;
      }

      // Fallback if shape is unexpected
      setError(data.error?.message ?? "Something didn't go through. Try again.");
      return;
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3">
      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Input
          id="waitlist-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          error={error ?? undefined}
          aria-label="Email address"
        />
        <Button type="submit" disabled={loading} aria-busy={loading} className="shrink-0">
          {loading ? "Joining…" : "Join the waitlist"}
        </Button>
      </div>
      <Input
        id="waitlist-name"
        type="text"
        maxLength={40}
        autoComplete="nickname"
        placeholder="Your name (optional — shown on the leaderboard)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Your name, optional"
      />
      <label className="flex cursor-pointer items-center justify-center gap-2 text-xs text-muted">
        <input
          type="checkbox"
          checked={hideFromLeaderboard}
          onChange={(e) => setHideFromLeaderboard(e.target.checked)}
          className="h-4 w-4 accent-[#3E7BFA]"
        />
        Keep me off the public leaderboard
      </label>
    </form>
  );
}
