import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";
import type { HandleUploadBody } from "@vercel/blob/client";
import { hasValidSession } from "@/lib/adminAuth";

/**
 * Issues short-lived client tokens for flier uploads, so the browser can
 * upload straight to Vercel Blob instead of routing the file through a
 * Server Action — Server Actions cap request bodies at 1MB by default (and
 * Vercel's own function payload limit sits around 4.5MB regardless), which
 * a real photographed flier blows past easily. Every token request is
 * gated on the same admin session cookie everything else in /admin uses.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!(await hasValidSession())) {
          throw new Error("Not authenticated");
        }
        if (!pathname.startsWith("fliers/")) {
          throw new Error("Invalid upload path");
        }
        return {
          allowedContentTypes: ["image/*"],
          addRandomSuffix: false,
          allowOverwrite: false,
          maximumSizeInBytes: 15 * 1024 * 1024,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
