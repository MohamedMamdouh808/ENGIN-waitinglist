"use client";

import { useEffect, useState } from "react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistSuccess } from "@/components/WaitlistSuccess";
import type { WaitlistState } from "@/lib/types";

export function SignupSection({
  initialRefCode,
  initialUtmSource,
}: {
  initialRefCode: string | null;
  initialUtmSource: string | null;
}) {
  const [waitlistState, setWaitlistState] = useState<WaitlistState | null>(null);
  const [checkedReturning, setCheckedReturning] = useState(false);

  // Returning visitor: restore state from the email they signed up with.
  // The server stays the source of truth for the actual position.
  useEffect(() => {
    const savedEmail = window.localStorage.getItem("engin_waitlist_email");
    if (!savedEmail) {
      setCheckedReturning(true);
      return;
    }

    fetch(`/api/waitlist/me?email=${encodeURIComponent(savedEmail)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.found) setWaitlistState(data.state);
      })
      .catch((err) => {
        console.warn("[waitlist] returning-user lookup failed", err);
      })
      .finally(() => setCheckedReturning(true));
  }, []);

  return (
    <section id="signup" className="border-b border-line py-16 sm:py-24">
      <div className="container-engin max-w-2xl text-center">
        {!checkedReturning ? (
          <div className="mx-auto h-40 max-w-md animate-pulse rounded-md bg-line" aria-hidden />
        ) : waitlistState ? (
          <WaitlistSuccess state={waitlistState} />
        ) : (
          <>
            <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">Get early access.</h2>
            <p className="mx-auto mt-4 max-w-md text-muted">One email. No spam — just your spot in line.</p>
            <div className="mt-8">
              <WaitlistForm refCode={initialRefCode} utmSource={initialUtmSource} onSuccess={setWaitlistState} />
            </div>
            {initialRefCode && (
              <p className="mt-4 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent-soft">
                Joining via referral {initialRefCode} — they&apos;ll move 25 spots forward when you join
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
