import { Suspense } from "react";
import type { Metadata } from "next";
import AdminGate from "@/app/admin/AdminGate";
import EditEvent from "@/app/admin/edit/EditEvent";

export const metadata: Metadata = {
  title: "Edit Calendar Entry",
  robots: { index: false, follow: false },
};

/**
 * `/admin/edit?slug=…` — a query parameter rather than a `[slug]` route,
 * since the site is a static export and entries are created at runtime.
 */
export default function EditEventPage() {
  return (
    <AdminGate>
      <div className="container-page section max-w-2xl">
        <p className="section-eyebrow">This Week Admin</p>
        <h1 className="mt-2 font-display text-display-sm font-semibold text-navy-900">
          Edit Entry
        </h1>
        <div className="mt-8">
          <Suspense fallback={<p className="text-sm text-navy-600">Loading…</p>}>
            <EditEvent />
          </Suspense>
        </div>
      </div>
    </AdminGate>
  );
}
