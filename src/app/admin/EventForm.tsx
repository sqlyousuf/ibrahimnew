"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { saveEvent } from "@/app/admin/actions";
import type { CalendarEvent } from "@/lib/site";

const DAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-navy-900/15 px-3.5 py-2.5 text-sm text-navy-900 outline-none transition focus:border-gold-500";
const labelClass = "text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-gold-700";

export default function EventForm({ initialEvent }: { initialEvent?: CalendarEvent }) {
  const [state, formAction, pending] = useActionState(saveEvent, undefined);
  const [recurrence, setRecurrence] = useState<"weekly" | "once">(
    initialEvent?.recurrence ?? "weekly",
  );
  const [removeFlier, setRemoveFlier] = useState(false);
  const hasExistingFlier = !!initialEvent?.flier && !removeFlier;

  return (
    <form action={formAction} className="card space-y-5 p-6 sm:p-8">
      {initialEvent && (
        <input type="hidden" name="originalSlug" value={initialEvent.slug} />
      )}

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={initialEvent?.title}
          className={fieldClass}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>When</legend>
        <div className="mt-2 flex gap-5">
          <label className="flex items-center gap-2 text-sm text-navy-800">
            <input
              type="radio"
              name="recurrence"
              value="weekly"
              checked={recurrence === "weekly"}
              onChange={() => setRecurrence("weekly")}
            />
            Recurring (weekly)
          </label>
          <label className="flex items-center gap-2 text-sm text-navy-800">
            <input
              type="radio"
              name="recurrence"
              value="once"
              checked={recurrence === "once"}
              onChange={() => setRecurrence("once")}
            />
            One-off (specific date)
          </label>
        </div>

        {recurrence === "weekly" ? (
          <div className="mt-3 flex flex-wrap gap-3">
            {DAYS.map((day) => (
              <label
                key={day.value}
                className="flex items-center gap-1.5 rounded-full border border-navy-900/15 px-3 py-1.5 text-xs font-semibold text-navy-800"
              >
                <input
                  type="checkbox"
                  name="daysOfWeek"
                  value={day.value}
                  defaultChecked={
                    initialEvent?.recurrence === "weekly" &&
                    initialEvent.daysOfWeek.includes(day.value)
                  }
                />
                {day.label}
              </label>
            ))}
          </div>
        ) : (
          <input
            type="date"
            name="date"
            required
            defaultValue={initialEvent?.recurrence === "once" ? initialEvent.date : undefined}
            className={`${fieldClass} mt-3 max-w-xs`}
          />
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="time" className={labelClass}>
            Time (optional)
          </label>
          <input
            id="time"
            name="time"
            type="text"
            placeholder="7:00 PM – 8:30 PM"
            defaultValue={initialEvent?.time}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location (optional)
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={initialEvent?.location}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initialEvent?.description}
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass}>Flier (optional)</label>

        {hasExistingFlier && initialEvent?.flier && (
          <div className="mt-2 flex items-center gap-4">
            <div className="relative h-20 w-16 overflow-hidden rounded-md ring-1 ring-navy-900/10">
              <Image
                src={initialEvent.flier.src}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-navy-700">
              <input
                type="checkbox"
                checked={removeFlier}
                onChange={(e) => setRemoveFlier(e.target.checked)}
              />
              Remove this flier
            </label>
            <input type="hidden" name="existingFlierSrc" value={initialEvent.flier.src} />
            <input type="hidden" name="existingFlierAlt" value={initialEvent.flier.alt} />
          </div>
        )}

        <input
          name="flier"
          type="file"
          accept="image/*"
          className="mt-2 block w-full text-sm text-navy-700"
        />
        <label htmlFor="flierAlt" className={`${labelClass} mt-3 block`}>
          Flier description (for accessibility — required if uploading a flier)
        </label>
        <input
          id="flierAlt"
          name="flierAlt"
          type="text"
          placeholder="Describe what the flier says/shows"
          defaultValue={initialEvent?.flier?.alt}
          className={fieldClass}
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={pending} className="btn-primary">
          {pending ? "Saving…" : initialEvent ? "Save Changes" : "Create Entry"}
        </button>
        <a href="/admin" className="btn-outline-navy">
          Cancel
        </a>
      </div>
    </form>
  );
}
