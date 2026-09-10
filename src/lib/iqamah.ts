/**
 * The masjid's timezone, and the date-key helper that pins "today" to it
 * regardless of a visitor's own timezone.
 *
 * Prayer time data itself (Adhan and Iqamah) used to live in this file and
 * `./salahTimes` as static, manually-transcribed tables. Both are now
 * fetched live from Masjidal (`./masjidal`, joined in `./prayerTimes`) — see
 * that file for why.
 */

export const MASJID_TIMEZONE = "America/Chicago";

/**
 * Today's date at the masjid as YYYY-MM-DD. Uses the masjid's timezone rather
 * than the visitor's, so someone checking from another state still sees the
 * times that apply in Spring, Texas.
 */
export function getMasjidDateKey(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD, which sorts lexicographically.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MASJID_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
