"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PrayerBoard } from "@/lib/prayerTimes";

const PRAYER_HREF = "/prayer-times";

/** Drops the meridiem so five prayers fit across a 375px phone. */
function compact(time: string | null): string {
  return time ? time.replace(/\s*(AM|PM)$/i, "") : "—";
}

/**
 * Persistent phone-only prayer bar.
 *
 * Shows today's actual adhan and iqamah times rather than just a link — the
 * whole point is that a phone visitor never has to navigate or tap to answer
 * "when is the next prayer". Sits at the bottom so it reads as a companion to
 * the sticky header rather than a competing top bar, and hides while the
 * phone menu is open (see `data-menu-open` on <html>).
 *
 * The board is resolved on the server and passed in, so the times are in the
 * initial HTML with no hydration flash.
 */
export default function PrayerQuickBar({ board }: { board: PrayerBoard }) {
  const pathname = usePathname();

  // Redundant on the page it points at.
  if (pathname === PRAYER_HREF) return null;

  return (
    <>
      {/* Reserves layout space so the bar never covers the end of the page. */}
      <div aria-hidden="true" className="h-[5.75rem] lg:hidden" />

      <div className="prayer-quick-bar fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-entrance lg:hidden">
        <div className="border-t border-gold-500/30 bg-navy-950/95 backdrop-blur-md">
          <div className="pb-[env(safe-area-inset-bottom)]">
            <Link
              href={PRAYER_HREF}
              className="block px-3 py-2"
              aria-label="Today's adhan and iqamah times — open the full salah schedule"
            >
              {/* The legend is styled exactly like the two rows below it, so
                  the muted line reads as Adhan and the bold line as Iqamah
                  without needing a label on every chip. */}
              <span className="mb-1.5 flex items-baseline justify-between gap-2 px-1">
                <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
                  Today
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="text-[0.5625rem] uppercase tracking-[0.1em] text-cream-100/60">
                    Adhan
                  </span>
                  <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.1em] text-white">
                    Iqamah
                  </span>
                  <span aria-hidden="true" className="text-[0.625rem] text-gold-300">
                    &rarr;
                  </span>
                </span>
              </span>

              <span className="flex items-stretch gap-1">
                {board.rows.map((row) => (
                  <span
                    key={row.name}
                    className="flex flex-1 flex-col items-center justify-center rounded-lg bg-white/[0.07] px-0.5 py-1"
                  >
                    <span className="text-[0.5rem] font-semibold uppercase tracking-[0.06em] text-gold-300/90">
                      {row.name}
                    </span>
                    <span className="mt-0.5 text-[0.625rem] leading-none tabular-nums text-cream-100/60">
                      {compact(row.adhan)}
                    </span>
                    <span className="mt-0.5 text-[0.8125rem] font-semibold leading-none tabular-nums text-white">
                      {compact(row.iqamah)}
                    </span>
                  </span>
                ))}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
