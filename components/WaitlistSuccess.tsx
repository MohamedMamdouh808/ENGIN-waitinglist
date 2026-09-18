"use client";

import { ReferralCard } from "@/components/ReferralCard";
import { ShareButtons } from "@/components/ShareButtons";
import { REFERRAL_BOOST } from "@/lib/queue";
import type { WaitlistState } from "@/lib/types";

export function WaitlistSuccess({ state }: { state: WaitlistState }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
      <div>
        <p className="font-mono text-xs text-accent-soft">status: confirmed</p>
        <h3 className="mt-2 text-2xl font-semibold text-fg">You're in.</h3>
        <p className="tabular mt-4 text-5xl font-semibold text-fg">
          #{state.queue_position.toLocaleString()}
        </p>
        <p className="mt-1 text-muted">in line</p>
      </div>

      <p className="text-sm text-muted">
        Every successful referral moves you {REFERRAL_BOOST} positions closer to the front.
      </p>

      <ReferralCard link={state.referral_link} />
      <ShareButtons link={state.referral_link} />
    </div>
  );
}
