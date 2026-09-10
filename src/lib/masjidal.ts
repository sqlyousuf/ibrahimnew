/**
 * Server-side client for Masjidal's Timings API — the masjid's live source of
 * record for Salah (Adhan) and Iqamah times, replacing the CSV-derived
 * static tables this file used to sit alongside.
 *
 * Auth is the Server Key (`MASJIDAL_SERVER_KEY`), scoped to server-to-server
 * calls only — never send it to the browser. The API versions its response
 * shape via a vendor media type in `Accept` rather than a URL segment.
 */

const MASJIDAL_API_BASE = "https://api.masjidal.com";
const MASJIDAL_ACCEPT = "application/vnd.masjidal.com.v1+json";

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

type TimingsResponse = {
  data?: { timings?: MasjidalDayTimings[] };
};

/**
 * Fetches timings for a date range (inclusive). Returns null on any failure
 * — missing key, network error, non-2xx, bad JSON — rather than throwing, so
 * a Masjidal outage degrades to "times unavailable" instead of a crashed
 * page. Cached via Next's fetch cache on a 30-minute revalidate, matching
 * the rest of the site's prayer-time freshness window; a brief outage during
 * that window is masked by the last good cached response.
 */
async function fetchMasjidalRange(
  startDateKey: string,
  endDateKey: string,
): Promise<MasjidalDayTimings[] | null> {
  const key = process.env.MASJIDAL_SERVER_KEY;
  if (!key) {
    console.error("MASJIDAL_SERVER_KEY is not set");
    return null;
  }

  try {
    const url = `${MASJIDAL_API_BASE}/timings?start_date=${startDateKey}&end_date=${endDateKey}`;
    const res = await fetch(url, {
      headers: { "x-api-key": key, Accept: MASJIDAL_ACCEPT },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error(`Masjidal API returned ${res.status} for ${url}`);
      return null;
    }

    const body: TimingsResponse = await res.json();
    return body.data?.timings ?? null;
  } catch (error) {
    console.error("Masjidal API fetch failed", error);
    return null;
  }
}

/** Timings for a single day, keyed YYYY-MM-DD in the masjid's timezone. */
export async function fetchMasjidalDay(
  dateKey: string,
): Promise<MasjidalDayTimings | null> {
  const days = await fetchMasjidalRange(dateKey, dateKey);
  return days?.[0] ?? null;
}

/** Timings for `count` consecutive days starting at `startDateKey`. */
export async function fetchMasjidalWeek(
  startDateKey: string,
  count = 7,
): Promise<MasjidalDayTimings[] | null> {
  const [y, m, d] = startDateKey.split("-").map(Number);
  const startUTC = Date.UTC(y, m - 1, d);
  const endUTC = startUTC + (count - 1) * 86_400_000;
  const endDateKey = new Date(endUTC).toISOString().slice(0, 10);
  return fetchMasjidalRange(startDateKey, endDateKey);
}
