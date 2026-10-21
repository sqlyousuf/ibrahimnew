"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";
import type { CalendarEvent } from "@/lib/site";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    adminApi
      .events()
      .then(setEvents)
      .catch((err: Error) => setError(err.message));
  }, []);

  useEffect(load, [load]);

  async function remove(slug: string, title: string) {
    if (!window.confirm(`Delete “${title}” from the calendar?`)) return;
    setDeleting(slug);
    setError(null);
    try {
      await adminApi.deleteEvent(slug);
      setEvents((current) => current?.filter((e) => e.slug !== slug) ?? null);
    } catch {
      setError("Couldn’t delete that entry — please try again.");
    } finally {
      setDeleting(null);
    }
  }

  async function signOut() {
    await adminApi.logout().catch(() => {});
    router.replace("/admin/login");
  }

  return (
    <div className="container-page section">
      {error && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
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
          <button type="button" onClick={signOut} className="btn-outline-navy">
            Sign Out
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {events === null && <p className="text-sm text-navy-600">Loading entries…</p>}

        {events?.length === 0 && (
          <p className="card p-6 text-sm text-navy-600">
            No ad-hoc entries yet. Click &ldquo;Add Entry&rdquo; to create the
            first one.
          </p>
        )}

        {events?.map((event) => (
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
              <p className="mt-1 font-display text-[1.5rem] font-semibold leading-tight text-navy-900">
                {event.title}
              </p>
              {event.location && (
                <p className="mt-0.5 text-sm text-navy-600">{event.location}</p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href={`/admin/edit?slug=${encodeURIComponent(event.slug)}`}
                className="btn-outline-navy"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => remove(event.slug, event.title)}
                disabled={deleting === event.slug}
                className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                {deleting === event.slug ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
