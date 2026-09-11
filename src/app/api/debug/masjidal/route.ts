import { NextResponse } from "next/server";

/**
 * Temporary diagnostic route — remove once the live Masjidal integration is
 * confirmed working. Reveals whether the key is present (never its value)
 * and what Masjidal's API actually returns when called from Vercel's own
 * runtime, so a live failure can be diagnosed without relaying dashboard
 * screenshots back and forth.
 */
export async function GET(): Promise<NextResponse> {
  const key = process.env.MASJIDAL_SERVER_KEY;
  const diagnostics: Record<string, unknown> = {
    keyPresent: Boolean(key),
    keyLength: key?.length ?? 0,
    keyPrefix: key ? key.slice(0, 10) : null,
    keySuffix: key ? key.slice(-4) : null,
  };

  if (!key) {
    return NextResponse.json(diagnostics, { status: 200 });
  }

  try {
    const url = "https://api.masjidal.com/timings";
    const res = await fetch(url, {
      headers: {
        "x-api-key": key,
        Accept: "application/vnd.masjidal.com.v1+json",
      },
      cache: "no-store",
    });
    const bodyText = await res.text();
    diagnostics.fetchOk = res.ok;
    diagnostics.status = res.status;
    diagnostics.bodyPreview = bodyText.slice(0, 300);
  } catch (error) {
    diagnostics.fetchError =
      error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
