"use client";

import { ReferralCard } from "@/components/ReferralCard";
import { ShareButtons } from "@/components/ShareButtons";
import { REFERRAL_BOOST } from "@/lib/queue";
import type { WaitlistState } from "@/lib/types";

export function WaitlistSuccess({ state }: { state: WaitlistState }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-ok/10 px-3 py-1 font-mono text-xs font-medium text-ok">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
          status: confirmed
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-fg">You&apos;re in — nice!</h3>
        <p className="tabular mt-4 text-5xl font-semibold tracking-tight text-fg">#{state.queue_position.toLocaleString()}</p>
        <p className="mt-1 text-muted">in line — share to move forward</p>
      </div>

      <p className="rounded-md border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-muted">
        Every friend who joins with your link moves you <strong className="font-semibold text-accent-soft">{REFERRAL_BOOST} spots</strong> closer to the front.
      </p>

      <ReferralCard link={state.referral_link} />
      <ShareButtons link={state.referral_link} />
      <p className="font-mono text-xs text-muted">We&apos;ll email you when it&apos;s your turn. No spam.</p>
    </div>
  );
}
