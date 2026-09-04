import type { Metadata } from "next";
import Link from "next/link";
import { requireSession } from "@/lib/adminAuth";
import { getCalendarEvents } from "@/lib/calendarStore";
import { deleteEvent, logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await requireSession();
  const events = await getCalendarEvents();
  const { error } = await searchParams;

  return (
    <div className="container-page section">
      {error === "delete-failed" && (
        <p className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Couldn&apos;t delete that entry — storage may be unreachable. Please try again.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-eyebrow">This Week Admin</p>
          <h1 className="mt-2 font-display text-display-sm font-semibold text-navy-900">
            Calendar Entries
          </h1>
          <p className="mt-2 text-sm text-navy-600">
            Recurring Institute programs (Quran Maktab, WISE, YM Ibrahim)
            aren&apos;t listed here — they rarely change and live in code.
            This list is everything else on the This Week calendar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/new" className="btn-primary">
            Add Entry
          </Link>
          <form action={logout}>
            <button type="submit" className="btn-outline-navy">
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {events.length === 0 && (
          <p className="card p-6 text-sm text-navy-600">
            No ad-hoc entries yet. Click &ldquo;Add Entry&rdquo; to create the
            first one.
          </p>
        )}

        {events.map((event) => (
          <div
            key={event.slug}
            className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="min-w-0">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
                {event.recurrence === "weekly"
                  ? event.daysOfWeek.map((d) => DAY_LABELS[d]).join(", ")
                  : event.date}
                {event.time ? ` · ${event.time}` : ""}
                {event.flier ? " · Has flier" : ""}
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-navy-900">
                {event.title}
              </p>
              {event.location && (
                <p className="mt-0.5 text-sm text-navy-600">{event.location}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/${event.slug}/edit`}
                className="btn-outline-navy"
              >
                Edit
              </Link>
              <form action={deleteEvent}>
                <input type="hidden" name="slug" value={event.slug} />
                <button
                  type="submit"
                  className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
