import { ViewTransition } from "react";
import type { ReactNode } from "react";

/**
 * Wraps a page's content so route changes read as one continuous film
 * instead of a hard cut. Untyped navigations (browser back/forward,
 * anything not carrying a transitionTypes prop) get React's default
 * crossfade ("auto"). Links tagged nav-forward/nav-back — the site's header
 * nav, see Header.tsx — get the directional slide defined in globals.css.
 *
 * Must be used inside each page.tsx, not the root layout: layouts persist
 * across navigations, so their enter/exit never fire.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "auto",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "auto",
      }}
    >
      {children}
    </ViewTransition>
  );
}
