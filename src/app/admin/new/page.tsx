import type { Metadata } from "next";
import { requireSession } from "@/lib/adminAuth";
import EventForm from "@/app/admin/EventForm";

export const metadata: Metadata = {
  title: "Add Calendar Entry",
  robots: { index: false, follow: false },
};

export default async function NewEventPage() {
  await requireSession();

  return (
    <div className="container-page section max-w-2xl">
      <p className="section-eyebrow">This Week Admin</p>
      <h1 className="mt-2 font-display text-display-sm font-semibold text-navy-900">
        Add Entry
      </h1>
      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
