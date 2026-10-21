/**
 * Client for Masjidal's public timings feed — the masjid's live source of
 * record for Salah (Adhan) and Iqamah times.
 *
 * This is the same keyless, public endpoint Masjidal's own embeddable
 * widgets use (it's what the masjid's previous WordPress site displayed),
 * served with `Access-Control-Allow-Origin: *`. So the browser calls it
 * directly: no API key, no server, nothing of ours in the path.
 */

import { site } from "./site";

const MASJIDAL_RANGE_URL = "https://masjidal.com/api/v1/time/range";

export type MasjidalDayTimings = {
  date: string;
  hijri_date: string;
  hijri_month: string;
  salah: {
    fajr: string;
    sunrise: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  iqamah: {
    fajr: string;
    zuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jummah1: string;
    jummah2: string;
    jummah3: string;
  };
};

type RangeResponse = {
  status?: string;
  data?: {
    salah?: Array<Record<string, string>>;
    iqamah?: Array<Record<string, string>>;
  };
};

/**
 * The feed writes "6:22AM" (and occasionally "1:30 PM"); the rest of the
 * site expects "6:22 AM". Non-times ("N/A", "") pass through untouched.
 */
function normalizeTime(value: string | undefined): string {
  const time = (value ?? "").trim();
  const match = time.match(/^(\d{1,2}:\d{2})\s*(AM|PM)$/i);
  return match ? `${match[1]} ${match[2].toUpperCase()}` : time;
}

/**
 * Timings for a date range (inclusive), one entry per day in order.
 * Returns null on any failure — network error, non-2xx, bad JSON, a
 * mismatched response — rather than throwing, so a Masjidal outage
 * degrades to "times unavailable" instead of a broken page.
 */
export async function fetchMasjidalRange(
  startDateKey: string,
  endDateKey: string,
): Promise<MasjidalDayTimings[] | null> {
  try {
    const url = `${MASJIDAL_RANGE_URL}?masjid_id=${site.masjidal.masjidId}&from_date=${startDateKey}&to_date=${endDateKey}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const body: RangeResponse = await res.json();
    const salah = body.data?.salah;
    const iqamah = body.data?.iqamah;
    if (body.status !== "success" || !salah?.length || salah.length !== iqamah?.length) {
      return null;
    }

    return salah.map((day, i) => {
      const iq = iqamah[i];
      return {
        date: day.date,
        hijri_date: day.hijri_date,
        hijri_month: day.hijri_month,
        salah: {
          fajr: normalizeTime(day.fajr),
          sunrise: normalizeTime(day.sunrise),
          zuhr: normalizeTime(day.zuhr),
          asr: normalizeTime(day.asr),
          maghrib: normalizeTime(day.maghrib),
          isha: normalizeTime(day.isha),
        },
        iqamah: {
          fajr: normalizeTime(iq.fajr),
          zuhr: normalizeTime(iq.zuhr),
          asr: normalizeTime(iq.asr),
          maghrib: normalizeTime(iq.maghrib),
          isha: normalizeTime(iq.isha),
          jummah1: normalizeTime(iq.jummah1),
          jummah2: normalizeTime(iq.jummah2),
          jummah3: normalizeTime(iq.jummah3),
        },
      };
    });
  } catch {
    return null;
  }
}
