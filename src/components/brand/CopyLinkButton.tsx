"use client";

import { useEffect, useState } from "react";

/**
 * Copies an absolute URL for a brand asset. The href is stored relative so it
 * works on every deployment preview; the absolute form is built in the browser
 * from the current origin.
 */
export default function CopyLinkButton({
  path,
  label = "Copy link",
  className = "btn-outline-navy",
}: {
  path: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    const url = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked (older browsers, insecure context).
      // Falling back to a prompt still lets the visitor grab the URL.
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <button type="button" onClick={copy} className={className} aria-live="polite">
      {copied ? "Copied!" : label}
    </button>
  );
}
