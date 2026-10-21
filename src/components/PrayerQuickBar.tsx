"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePrayerData } from "@/lib/liveData";
import { findNextPrayer, useMasjidMinute } from "@/lib/nextPrayer";

const PRAYER_HREF = "/prayer-times";

const NAMES = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

/** Drops the meridiem so five prayers fit across a 375px phone. */
function compact(time: string | null | undefined, loading: boolean): string {
  if (loading) return "··";
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
 * Reads the same /api/prayer request as the prayer board (liveData.ts), so
 * a page never fetches the times twice.
 */
export default function PrayerQuickBar() {
  const pathname = usePathname();
  const data = usePrayerData();
  const loading = data === undefined;
  const rows = NAMES.map(
    (name) => data?.board.rows.find((row) => row.name === name) ?? { name, adhan: null, iqamah: null },
  );
  const minute = useMasjidMinute();
  const next = minute === null || !data ? null : findNextPrayer(data.board.rows, minute);

  // Redundant on the page it points at.
  if (pathname === PRAYER_HREF) return null;

  return (
    <>
      {/* Reserves layout space so the bar never covers the end of the page. */}
      <div aria-hidden="true" className="h-[5.75rem] lg:hidden" />

      <div className="prayer-quick-bar fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-500 ease-entrance lg:hidden">
        <div className="relative border-t border-gold-300/20 bg-navy-975/[0.92] shadow-[0_-18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-150">
          <span aria-hidden="true" className="rule-gold absolute inset-x-0 top-0" />
          <div className="pb-[env(safe-area-inset-bottom)]">
            <Link
              href={PRAYER_HREF}
              className="block px-2.5 pb-2 pt-1.5"
              aria-label="Today's adhan and iqamah times — open the full salah schedule"
            >
              {/* The legend is styled exactly like the two rows below it, so
                  the muted line reads as Adhan and the bold line as Iqamah
                  without needing a label on every chip. */}
              <span className="mb-1.5 flex items-baseline justify-between gap-2 px-1.5">
                <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-gold-300">
                  Today
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="text-[0.5625rem] uppercase tracking-[0.14em] text-cream-100/50">
                    Adhan
                  </span>
                  <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.14em] text-cream-50">
                    Iqamah
                  </span>
                  <span aria-hidden="true" className="text-[0.625rem] text-gold-300">
                    &rarr;
                  </span>
                </span>
              </span>

              <span className="flex items-stretch gap-1">
                {rows.map((row) => {
                  const isNext = next?.row.name === row.name && !next.tomorrow;
                  return (
                    <span
                      key={row.name}
                      className={`flex flex-1 flex-col items-center justify-center rounded-xl px-0.5 py-1.5 transition-colors duration-700 ${
                        isNext
                          ? "bg-gradient-to-b from-gold-300/25 to-gold-500/10 ring-1 ring-gold-300/50"
                          : "bg-white/[0.04] ring-1 ring-white/[0.05]"
                      }`}
                    >
                      <span
                        className={`font-display text-[0.8125rem] font-semibold italic leading-none ${
                          isNext ? "text-gold-100" : "text-gold-300/90"
                        }`}
                      >
                        {row.name}
                      </span>
                      <span className="mt-1 text-[0.625rem] leading-none tabular-nums text-cream-100/50">
                        {compact(row.adhan, loading)}
                      </span>
                      <span className="mt-0.5 text-[0.8125rem] font-bold leading-none tabular-nums text-cream-50">
                        {compact(row.iqamah, loading)}
                      </span>
                    </span>
                  );
                })}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
