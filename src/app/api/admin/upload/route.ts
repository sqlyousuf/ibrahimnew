import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { hasValidSession } from "@/lib/adminAuth";

// Vercel's serverless functions cap the request body at roughly 4.5MB
// regardless of framework config, so this is a hard ceiling, not just a
// friendly suggestion — enforced both here and client-side in EventForm so
// the admin gets a clear message before waiting on an upload that can't
// succeed.
export const MAX_FLIER_BYTES = 4 * 1024 * 1024;

/**
 * Proxies flier uploads through this server rather than letting the browser
 * upload directly to Vercel Blob. Vercel Blob's documented direct-upload
 * flow (a client token + a browser-to-Blob PUT) is currently broken by a
 * CORS bug on Vercel's own infrastructure — confirmed via their community
 * forum, not something fixable from application code — so this proxies
 * instead, landing on Vercel's ~4.5MB function-body ceiling rather than the
 * unlimited size direct uploads would otherwise allow. Revisit direct
 * uploads once that's fixed upstream.
 */
export async function POST(request: Request): Promise<NextResponse> {
  if (!(await hasValidSession())) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "The flier must be an image file" }, { status: 400 });
  }
  if (file.size > MAX_FLIER_BYTES) {
    return NextResponse.json(
      { error: `That image is too large — please use one under ${MAX_FLIER_BYTES / (1024 * 1024)}MB.` },
      { status: 413 },
    );
  }

  const extMatch = /\.([a-zA-Z0-9]+)$/.exec(file.name);
  const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";

  try {
    const blob = await put(`fliers/${randomUUID()}.${ext}`, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
    });
    return NextResponse.json({ src: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    );
  }
}
