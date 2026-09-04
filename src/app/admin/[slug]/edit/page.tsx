import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/adminAuth";
import { getCalendarEvents } from "@/lib/calendarStore";
import EventForm from "@/app/admin/EventForm";

export const metadata: Metadata = {
  title: "Edit Calendar Entry",
  robots: { index: false, follow: false },
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireSession();
  const { slug } = await params;

  const events = await getCalendarEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <div className="container-page section max-w-2xl">
      <p className="section-eyebrow">This Week Admin</p>
      <h1 className="mt-2 font-display text-display-sm font-semibold text-navy-900">
        Edit Entry
      </h1>
      <div className="mt-8">
        <EventForm initialEvent={event} />
      </div>
    </div>
  );
}
