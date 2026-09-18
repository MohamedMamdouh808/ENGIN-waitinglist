"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { WaitlistState } from "@/lib/types";

interface WaitlistFormProps {
  refCode: string | null;
  onSuccess: (state: WaitlistState) => void;
}

export function WaitlistForm({ refCode, onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, ref: refCode ?? undefined }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error?.message ?? "Something didn't go through. Try again.");
        return;
      }

      window.localStorage.setItem("engin_waitlist_email", email.trim().toLowerCase());
      onSuccess(data.state);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <Input
        id="waitlist-email"
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error ?? undefined}
        aria-label="Email address"
      />
      <Button type="submit" disabled={loading} className="shrink-0">
        {loading ? "Joining…" : "Join the waitlist"}
      </Button>
    </form>
  );
}
