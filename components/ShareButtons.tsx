"use client";

import { Button } from "@/components/ui/Button";

const SHARE_TEXT = "I just joined the ENGIN waitlist — a deterministic compiler for software.";

export function ShareButtons({ link }: { link: string }) {
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  async function nativeShare() {
    try {
      await navigator.share({ text: SHARE_TEXT, url: link });
    } catch {
      // User cancelled — no error state needed.
    }
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${link}`)}`;
  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(link)}`;
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
      <a href={whatsapp} target="_blank" rel="noreferrer">
        <Button variant="secondary" className="px-4 py-2 text-xs">
          WhatsApp
        </Button>
      </a>
      <a href={x} target="_blank" rel="noreferrer">
        <Button variant="secondary" className="px-4 py-2 text-xs">
          X
        </Button>
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer">
        <Button variant="secondary" className="px-4 py-2 text-xs">
          LinkedIn
        </Button>
      </a>
    </div>
  );
}
