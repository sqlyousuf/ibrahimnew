"use client";

import { StarGlyph } from "@/components/Ornament";
import { usePrayerData } from "@/lib/liveData";
import {
  findNextPrayer,
  formatCountdown,
  useMasjidMinute,
} from "@/lib/nextPrayer";
import type { PrayerRow } from "@/lib/prayerTimes";

const JUMMAH_LABELS = ["First", "Second", "Third"] as const;

// Rendered while the times load, so the board's shape is in the prebuilt
// HTML and nothing shifts when the data lands.
const PLACEHOLDER_ROWS: PrayerRow[] = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(
  (name) => ({ name, adhan: null, iqamah: null, iqamahNote: null }),
);

/** A soft shimmer standing in for a time that hasn't loaded yet. */
function TimePlaceholder({ wide = false }: { wide?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-3.5 animate-pulse rounded-full bg-cream-100/10 align-middle ${
        wide ? "w-16" : "w-14"
      }`}
    />
  );
}

/**
 * Today's prayer board in the format a masjid actually posts: Adhan (when the
 * prayer window opens) alongside Iqamah (when the congregation stands).
 *
 * The site is static, so the times are fetched in the browser straight from
 * Masjidal (shared with the phone prayer bar — see liveData.ts); the "next salah"
 * spotlight and row highlight are decided against the masjid's clock. Rows
 * and the spotlight reserve their space up front so nothing jumps when the
 * data lands.
 *
 * A real table, so the column structure carries semantics for screen readers
 * and stays easy to extend.
 */
export default function PrayerBoard({
  className = "",
  emphasis = false,
  showSunrise = false,
}: {
  className?: string;
  /** Larger type for the dedicated Prayer Times page. */
  emphasis?: boolean;
  showSunrise?: boolean;
}) {
  const data = usePrayerData();
  const board = data?.board;
  const rows = board?.rows ?? PLACEHOLDER_ROWS;
  const todayLabel = data?.todayLabel;
  const loading = data === undefined;
  const minute = useMasjidMinute();
  const next = minute === null || !board ? null : findNextPrayer(board.rows, minute);
  const nameSize = emphasis ? "text-[1.375rem] sm:text-2xl" : "text-xl sm:text-[1.375rem]";
  const timeSize = emphasis ? "text-base sm:text-lg" : "text-[0.9375rem] sm:text-base";

  return (
    <div className={`card-night overflow-hidden ${className}`}>
      {/* ------------------------------------------------------ Masthead */}
      <div className="relative flex items-center justify-between gap-3 px-5 pt-5 sm:px-7 sm:pt-6">
        <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-gold-300">
          <StarGlyph className="h-3.5 w-3.5 shrink-0" />
          Salah Times
        </p>
        {todayLabel && (
          <p className="text-[0.6875rem] font-medium tracking-wide text-cream-100/60">
            {todayLabel}
          </p>
        )}
      </div>

      {/* ------------------------------------------------------ Spotlight */}
      <div
        className="relative mx-5 mt-4 min-h-[6.25rem] rounded-2xl border border-gold-300/15 bg-gradient-to-br from-gold-300/[0.09] via-transparent to-transparent px-4 py-4 sm:mx-7 sm:px-5"
        aria-live="polite"
      >
        {next ? (
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-cream-100/60">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-soft-pulse rounded-full bg-gold-300" />
                </span>
                {next.tomorrow ? "Tomorrow" : "Next salah"}
              </p>
              <p className="text-foil mt-1 font-display text-[2.75rem] font-semibold italic leading-[1.05] sm:text-5xl">
                {next.row.name}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-cream-100/55">
                {next.phase === "before-adhan" ? "Adhan in" : "Iqamah in"}
              </p>
              <p className="mt-1 font-display text-[1.75rem] font-semibold leading-none tabular-nums text-cream-50 sm:text-[2rem]">
                {formatCountdown(next.minutesUntil)}
              </p>
              <p className="mt-1.5 text-[0.6875rem] tabular-nums text-gold-200/80">
                Iqamah {next.row.iqamah ?? next.row.adhan}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[4.25rem] items-center">
            <p className="font-display text-2xl italic text-cream-100/70">
              {loading
                ? "Today’s five daily salah"
                : "Times are unavailable right now — please call the masjid."}
            </p>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------- Table */}
      <table className="relative mt-3 w-full text-left">
        <caption className="sr-only">
          Adhan and iqamah times{todayLabel ? ` for ${todayLabel}` : ""}
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              className="py-2.5 pl-5 pr-2 text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-cream-100/45 sm:pl-7"
            >
              Salah
            </th>
            <th
              scope="col"
              className="px-2 py-2.5 text-right text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-cream-100/45"
            >
              Adhan
            </th>
            <th
              scope="col"
              className="py-2.5 pl-2 pr-5 text-right text-[0.5625rem] font-semibold uppercase tracking-[0.24em] text-gold-300 sm:pr-7"
            >
              Iqamah
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isNext = next?.row.name === row.name && !next.tomorrow;
            return (
              <tr
                key={row.name}
                aria-current={isNext ? "time" : undefined}
                className={`relative border-t border-gold-300/[0.08] transition-colors duration-700 ${
                  isNext
                    ? "bg-gradient-to-r from-gold-300/[0.14] via-gold-300/[0.05] to-transparent"
                    : ""
                }`}
              >
                <th
                  scope="row"
                  className={`relative py-3.5 pl-5 pr-2 font-display font-semibold sm:pl-7 ${nameSize} ${
                    isNext ? "text-gold-200" : "text-cream-50"
                  }`}
                >
                  {isNext && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-gold-200 to-gold-500"
                    />
                  )}
                  {row.name}
                </th>
                <td
                  className={`whitespace-nowrap px-2 py-3.5 text-right tabular-nums text-cream-100/55 ${timeSize}`}
                >
                  {loading ? <TimePlaceholder /> : (row.adhan ?? "—")}
                </td>
                <td className="py-3.5 pl-2 pr-5 text-right sm:pr-7">
                  <span
                    className={`whitespace-nowrap font-semibold tabular-nums ${timeSize} ${
                      isNext ? "text-gold-100" : "text-cream-50"
                    }`}
                  >
                    {loading ? <TimePlaceholder wide /> : (row.iqamah ?? "—")}
                  </span>
                  {/* Maghrib's iqamah is derived from its adhan, so the rule is
                      worth stating next to the resulting time. */}
                  {row.iqamahNote && (
                    <span className="mt-0.5 block text-[0.625rem] leading-tight text-cream-100/45">
                      {row.iqamahNote}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {board && (board.jummah.length > 0 || (showSunrise && board.sunrise)) && (
        <div className="relative space-y-3 border-t border-gold-300/[0.12] bg-black/20 px-5 py-4 sm:px-7">
          {board.jummah.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <p className="font-display text-xl font-semibold italic text-gold-200">
                Jumu&apos;ah
              </p>
              <ul className="flex flex-wrap gap-2">
                {board.jummah.map((slot, i) => (
                  <li
                    key={slot}
                    className="flex items-baseline gap-2 rounded-full border border-gold-300/25 bg-gold-300/[0.06] px-3.5 py-1.5 text-xs text-cream-100"
                  >
                    <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-300">
                      {JUMMAH_LABELS[i] ?? `${i + 1}`}
                    </span>
                    <span className="font-semibold tabular-nums">{slot}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not a prayer — it marks the end of the Fajr window. */}
          {showSunrise && board.sunrise && (
            <p className="text-xs text-cream-100/65">
              <span className="font-semibold text-cream-50">Sunrise</span>{" "}
              <span className="tabular-nums">{board.sunrise}</span>
              <span className="text-cream-100/45"> · end of the Fajr window</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
