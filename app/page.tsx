"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveCounter } from "@/components/LiveCounter";
import { WalkthroughContainer } from "@/components/Walkthrough/WalkthroughContainer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistSuccess } from "@/components/WaitlistSuccess";
import { Leaderboard } from "@/components/Leaderboard";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import type { WaitlistState } from "@/lib/types";

export default function Home() {
  const [refCode, setRefCode] = useState<string | null>(null);
  const [waitlistState, setWaitlistState] = useState<WaitlistState | null>(null);
  const [checkedReturning, setCheckedReturning] = useState(false);

  // Pick up ?ref=CODE from the URL, and restore a returning visitor's
  // state from the email they signed up with — the server is still the
  // source of truth for the actual position.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setRefCode(ref.toUpperCase());

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
      .catch(() => {})
      .finally(() => setCheckedReturning(true));
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveCounter />

        <section id="how-it-works" className="border-b border-line py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-16 text-center">
              <p className="font-mono text-xs text-accent-soft">how_engin_works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                See what happens between your idea and the software.
              </h2>
            </div>
            <WalkthroughContainer />
          </div>
        </section>

        <section id="signup" className="border-b border-line py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            {!checkedReturning ? null : waitlistState ? (
              <WaitlistSuccess state={waitlistState} />
            ) : (
              <>
                <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                  Get early access.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted">
                  One email. No spam, no surveys — just your spot in line.
                </p>
                <div className="mt-8">
                  <WaitlistForm refCode={refCode} onSuccess={setWaitlistState} />
                </div>
                {refCode && (
                  <p className="mt-4 font-mono text-xs text-muted">
                    Joining via referral {refCode}
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        <Leaderboard />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
