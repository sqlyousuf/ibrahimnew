"use client";

import { useEffect, useState } from "react";

/**
 * Opens the phone's share sheet for this page (WhatsApp, Messages, …), or
 * copies the link where there is no share sheet (most desktops).
 */
export default function SharePageButton({
  title,
  text,
  className = "btn-outline",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function share() {
    // Drop any query string (e.g. tracking tags) so the shared link is clean.
    const url = `${window.location.origin}${window.location.pathname}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        // The visitor closed the share sheet — nothing more to do.
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <button type="button" onClick={share} className={className} aria-live="polite">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
        <path d="m16 6-4-4-4 4" />
        <path d="M12 2v13" />
      </svg>
      {copied ? "Link copied" : "Share this page"}
    </button>
  );
}
