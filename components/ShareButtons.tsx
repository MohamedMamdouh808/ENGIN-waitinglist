"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const SHARE_TEXT = "I just joined the ENGIN waitlist — turn your idea into real software, no coding needed.";

export function ShareButtons({ link }: { link: string }) {
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  async function nativeShare() {
    try {
      await navigator.share({ text: SHARE_TEXT, url: link });
    } catch {
      // User cancelled — no error state needed.
    }
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${link}`)}`;
  const x = `https://x.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(link)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;

  if (canNativeShare) {
    return (
      <Button variant="secondary" onClick={nativeShare}>
        Share
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a href={whatsapp} target="_blank" rel="noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-line bg-raised px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent">
          WhatsApp
        </span>
      </a>
      <a href={x} target="_blank" rel="noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-line bg-raised px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent">
          X
        </span>
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <span className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-line bg-raised px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent">
          LinkedIn
        </span>
      </a>
    </div>
  );
}
