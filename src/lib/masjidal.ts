/**
 * Server-side client for Masjidal's Timings API — the masjid's live source of
 * record for Salah (Adhan) and Iqamah times, replacing the CSV-derived
 * static tables this file used to sit alongside.
 *
 * Auth is the Server Key (`MASJIDAL_SERVER_KEY`), scoped to server-to-server
 * calls only — never send it to the browser, which is why only the Worker
 * calls this. The API versions its response
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
 * — network error, non-2xx, bad JSON — rather than throwing, so a Masjidal
 * outage degrades to "times unavailable" instead of a crashed response.
 * Runs in the Cloudflare Worker (worker/index.ts), which owns caching.
 */
export async function fetchMasjidalRange(
  apiKey: string,
  startDateKey: string,
  endDateKey: string,
): Promise<MasjidalDayTimings[] | null> {
  try {
    const url = `${MASJIDAL_API_BASE}/timings?start_date=${startDateKey}&end_date=${endDateKey}`;
    const res = await fetch(url, {
      headers: { "x-api-key": apiKey, Accept: MASJIDAL_ACCEPT },
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
