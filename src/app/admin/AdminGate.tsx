"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";

/**
 * Client-side sign-in check for the admin pages. The pages are static, so
 * this is only a convenience redirect — the real protection is the Worker
 * refusing every admin API call without a valid session cookie.
 */
export default function AdminGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    adminApi
      .session()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) router.replace("/admin/login");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="container-page section">
        <p className="text-sm text-navy-600">Checking your sign-in…</p>
      </div>
    );
  }
  return children;
}
