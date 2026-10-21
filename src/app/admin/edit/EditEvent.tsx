"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EventForm from "@/app/admin/EventForm";
import { adminApi } from "@/lib/adminApi";
import type { CalendarEvent } from "@/lib/site";

export default function EditEvent() {
  const slug = useSearchParams().get("slug");
  // undefined = loading, null = not found / failed.
  const [event, setEvent] = useState<CalendarEvent | null | undefined>(undefined);

  useEffect(() => {
    adminApi
      .events()
      .then((events) => setEvent(events.find((e) => e.slug === slug) ?? null))
      .catch(() => setEvent(null));
  }, [slug]);

  if (event === undefined) return <p className="text-sm text-navy-600">Loading…</p>;
  if (event === null) {
    return (
      <p className="card p-6 text-sm text-navy-600">
        That entry doesn&apos;t exist anymore.{" "}
        <Link href="/admin" className="link-underline font-semibold text-gold-700">
          Back to the list
        </Link>
      </p>
    );
  }
  return <EventForm initialEvent={event} />;
}
