"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { logEvent } from "@/lib/events";

const SHARE_TEXT = "I just joined the ENGIN waitlist — turn your idea into real software, no coding needed.";

export function ShareButtons({
  link,
  queuePosition,
  email,
}: {
  link: string;
  queuePosition?: number;
  email?: string;
}) {
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const message =
    typeof queuePosition === "number" && queuePosition > 0
      ? `I'm #${queuePosition.toLocaleString()} in line for ENGIN — turn your idea into real software, no coding needed. Join with my link:`
      : SHARE_TEXT;

  function track(channel: string) {
    logEvent("share_click", { email, metadata: { channel, queue_position: queuePosition ?? null } });
  }

  async function nativeShare() {
    track("native");
    try {
      await navigator.share({ text: message, url: link });
    } catch {
      // User cancelled — no error state needed.
    }
  }

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${message} ${link}`)}`;
  const x = `https://x.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(link)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;

  const linkCls =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const pillCls =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-line bg-raised px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent";

  if (canNativeShare) {
    return (
      <Button variant="secondary" onClick={nativeShare}>
        Share — move up faster
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a href={whatsapp} target="_blank" rel="noreferrer" onClick={() => track("whatsapp")} className={linkCls}>
        <span className={pillCls}>WhatsApp</span>
      </a>
      <a href={x} target="_blank" rel="noreferrer" onClick={() => track("x")} className={linkCls}>
        <span className={pillCls}>X</span>
      </a>
      <a href={linkedin} target="_blank" rel="noreferrer" onClick={() => track("linkedin")} className={linkCls}>
        <span className={pillCls}>LinkedIn</span>
      </a>
    </div>
  );
}
