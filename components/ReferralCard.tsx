"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ReferralCard({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="card w-full max-w-md p-4">
      <p className="font-mono text-xs text-muted">your_referral_link — share to move forward</p>
      <div className="mt-2 flex items-center gap-2">
        <code className="flex-1 truncate rounded-md bg-bg px-3 py-2 font-mono text-sm text-accent-soft">{link}</code>
        <Button variant="secondary" className="shrink-0 px-3 py-2 text-xs" onClick={copy} aria-live="polite">
          {copied ? "Copied ✓" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
