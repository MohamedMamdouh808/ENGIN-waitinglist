"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveCounter } from "@/components/LiveCounter";
import { WalkthroughContainer } from "@/components/Walkthrough/WalkthroughContainer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { WaitlistSuccess } from "@/components/WaitlistSuccess";
import { Leaderboard } from "@/components/Leaderboard";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
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
      <main id="main">
        <Hero />
        <LiveCounter />

        <section id="how-it-works" className="border-b border-line py-16 sm:py-24">
          <div className="container-engin max-w-3xl">
            <div className="mb-12 text-center sm:mb-16">
              <p className="font-mono text-xs text-accent-soft">how_engin_works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                See what happens between your idea and the software.
              </h2>
              <p className="mt-3 text-muted">No jargon. Just 6 simple steps.</p>
            </div>
            <WalkthroughContainer />
          </div>
        </section>

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
                  <WaitlistForm refCode={refCode} onSuccess={setWaitlistState} />
                </div>
                {refCode && (
                  <p className="mt-4 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-xs text-accent-soft">
                    Joining via referral {refCode} — they&apos;ll move 25 spots forward when you join
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        <Leaderboard />
        <SocialProof />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
