import { StarGlyph } from "@/components/Ornament";
import type { PrayerBoard as Board } from "@/lib/prayerTimes";

const JUMMAH_LABELS = ["First", "Second", "Third"] as const;

/**
 * Today's prayer board in the format a masjid actually posts: Adhan (when the
 * prayer window opens) alongside Iqamah (when the congregation stands).
 *
 * A real table, so the column structure carries semantics for screen readers
 * and stays easy to extend.
 */
export default function PrayerBoard({
  board,
  todayLabel,
  className = "",
  emphasis = false,
  showSunrise = false,
}: {
  board: Board;
  /** e.g. "Friday, August 14". */
  todayLabel?: string;
  className?: string;
  /** Larger type for the dedicated Prayer Times page. */
  emphasis?: boolean;
  showSunrise?: boolean;
}) {
  const timeSize = emphasis ? "text-base sm:text-lg" : "text-sm sm:text-base";

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-panel ring-1 ring-navy-900/5 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-navy-900/[0.07] bg-cream-100 px-4 py-3 sm:px-6">
        <p className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
          <StarGlyph className="h-4 w-4 shrink-0" />
          Salah Times
        </p>
        {todayLabel && (
          <p className="text-xs font-medium text-navy-700">{todayLabel}</p>
        )}
      </div>

      <table className="w-full text-left">
        <caption className="sr-only">
          Adhan and iqamah times{todayLabel ? ` for ${todayLabel}` : ""}
        </caption>
        <thead>
          <tr className="border-b border-navy-900/[0.07]">
            <th
              scope="col"
              className="px-3 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:px-6"
            >
              Salah
            </th>
            <th
              scope="col"
              className="px-2 py-2 text-right text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy-500 sm:px-4"
            >
              Adhan
            </th>
            <th
              scope="col"
              className="px-3 py-2 text-right text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-700 sm:px-6"
            >
              Iqamah
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-900/[0.06]">
          {board.rows.map((row) => (
            <tr key={row.name}>
              <th
                scope="row"
                className={`px-3 py-3 font-display font-semibold text-navy-900 sm:px-6 ${
                  emphasis ? "text-base sm:text-lg" : "text-sm sm:text-base"
                }`}
              >
                {row.name}
              </th>
              <td
                className={`whitespace-nowrap px-2 py-3 text-right tabular-nums text-navy-600 sm:px-4 ${timeSize}`}
              >
                {row.adhan ?? "—"}
              </td>
              <td className="px-3 py-3 text-right sm:px-6">
                <span
                  className={`whitespace-nowrap font-semibold tabular-nums text-navy-900 ${timeSize}`}
                >
                  {row.iqamah ?? "—"}
                </span>
                {/* Maghrib's iqamah is derived from its adhan, so the rule is
                    worth stating next to the resulting time. */}
                {row.iqamahNote && (
                  <span className="mt-0.5 block text-[0.625rem] leading-tight text-navy-500">
                    {row.iqamahNote}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(board.jummah.length > 0 || (showSunrise && board.sunrise)) && (
        <div className="space-y-3 border-t border-navy-900/[0.07] bg-cream-100 px-4 py-4 sm:px-6">
          {board.jummah.length > 0 && (
            <div>
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
                Jumu&apos;ah
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {board.jummah.map((slot, i) => (
                  <li
                    key={slot}
                    className="flex items-baseline gap-2 rounded-full bg-navy-900 px-3.5 py-1.5 text-xs text-cream-100"
                  >
                    <span className="text-gold-300">
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
            <p className="text-xs text-navy-700">
              <span className="font-semibold text-navy-900">Sunrise</span>{" "}
              <span className="tabular-nums">{board.sunrise}</span>
              <span className="text-navy-500"> · end of the Fajr window</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
