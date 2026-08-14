/**
 * Iqamah (congregation) times for Masjid Ibrahim.
 *
 * Transcribed from `iqamah_records1.csv` at the repo root, which is the source
 * of record. This is a CHANGE LOG, not one row per day: each entry's times
 * take effect on `effectiveFrom` and stay in effect until the next, more
 * recent entry. Entries are stored newest-first, which `getCurrentIqamah`
 * relies on.
 *
 * These are Iqamah times only — the moment the congregation lines up and the
 * prayer begins. Adhan (start) times live in `./salahTimes`, and `./prayerTimes`
 * joins the two into the board the site renders.
 *
 * To update, replace `iqamahRecords` below — nothing else needs to change.
 */

export const MASJID_TIMEZONE = "America/Chicago";

export type IqamahRecord = {
  /** ISO date (YYYY-MM-DD) these times take effect. */
  effectiveFrom: string;
  fajr: string;
  dhuhr: string;
  asr: string;
  /**
   * Maghrib is set as an offset, not a clock time — its Adhan moves daily and
   * the window is short. This is the number of minutes after the Adhan.
   */
  maghribOffsetMinutes: number;
  isha: string;
  /** Friday khutbah slots, in order. Empty when the period has no override. */
  jummah: string[];
};

/** 118 entries, 2026-01-15 through 2030-12-15, newest-first. */
export const iqamahRecords: IqamahRecord[] = [
  { effectiveFrom: "2030-12-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-12-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-11-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-11-03", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-10-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:15 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-10-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-09-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "06:00 PM", maghribOffsetMinutes: 5, isha: "08:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-09-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-08-15", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-08-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-07-15", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-07-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-05-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-05-01", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:40 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-04-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-04-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:20 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-03-10", fajr: "06:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-03-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-02-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-02-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:45 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-01-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:30 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2030-01-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-12-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-12-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-11-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-11-03", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-10-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:15 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-10-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-09-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "06:00 PM", maghribOffsetMinutes: 5, isha: "08:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-09-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-08-15", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-08-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-07-15", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-07-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-06-15", fajr: "05:30 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-06-01", fajr: "05:30 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-05-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-05-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-04-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-04-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:20 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-03-10", fajr: "06:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-03-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-02-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-02-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:45 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-01-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:30 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2029-01-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-12-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-12-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-11-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-11-03", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-10-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:15 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-10-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-09-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "06:00 PM", maghribOffsetMinutes: 5, isha: "08:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-09-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-08-15", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-08-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-07-15", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-07-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-06-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-06-01", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-05-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-05-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-04-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-04-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:20 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-03-10", fajr: "06:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-03-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-02-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-02-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:45 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-01-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:30 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2028-01-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-12-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-12-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-11-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-11-03", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-10-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:15 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-10-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-09-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "06:00 PM", maghribOffsetMinutes: 5, isha: "08:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-09-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-08-15", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-08-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-07-15", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-07-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-06-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-06-01", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-05-15", fajr: "05:35 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "10:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-05-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-04-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-04-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:20 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-03-10", fajr: "06:45 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-03-01", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-02-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-02-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:45 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-01-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:30 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2027-01-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-12-15", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-12-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-11-15", fajr: "06:00 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-11-03", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "04:15 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-10-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:15 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-10-01", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "05:30 PM", maghribOffsetMinutes: 5, isha: "08:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-09-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "06:00 PM", maghribOffsetMinutes: 5, isha: "08:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-09-01", fajr: "06:15 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-08-11", fajr: "06:10 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:25 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-08-10", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:35 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-07-15", fajr: "05:55 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-07-01", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:55 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-06-15", fajr: "05:45 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:55 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-06-01", fajr: "05:40 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:50 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-05-15", fajr: "05:40 AM", dhuhr: "02:00 PM", asr: "06:30 PM", maghribOffsetMinutes: 5, isha: "09:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-05-01", fajr: "05:50 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-04-15", fajr: "06:05 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:20 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-04-01", fajr: "06:20 AM", dhuhr: "02:00 PM", asr: "06:15 PM", maghribOffsetMinutes: 5, isha: "09:10 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-03-21", fajr: "06:35 AM", dhuhr: "02:00 PM", asr: "06:10 PM", maghribOffsetMinutes: 5, isha: "09:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-03-01", fajr: "06:10 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-02-18", fajr: "06:10 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-02-15", fajr: "06:10 AM", dhuhr: "02:00 PM", asr: "05:00 PM", maghribOffsetMinutes: 5, isha: "08:00 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-02-01", fajr: "06:20 AM", dhuhr: "02:00 PM", asr: "04:45 PM", maghribOffsetMinutes: 5, isha: "07:45 PM", jummah: ["01:30 PM", "02:30 PM"] },
  { effectiveFrom: "2026-01-15", fajr: "06:30 AM", dhuhr: "02:00 PM", asr: "04:30 PM", maghribOffsetMinutes: 5, isha: "07:30 PM", jummah: ["01:30 PM", "02:30 PM"] },
];

/**
 * Today's date at the masjid as YYYY-MM-DD. Uses the masjid's timezone rather
 * than the visitor's, so someone checking from another state still sees the
 * times that apply in Spring, Texas.
 */
export function getMasjidDateKey(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD, which sorts lexicographically.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MASJID_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * The iqamah record in effect for a given date: the most recent entry whose
 * `effectiveFrom` is on or before that date. Falls back to the oldest entry
 * for dates predating the dataset.
 */
export function getCurrentIqamah(date: Date | string = new Date()): IqamahRecord {
  const key = typeof date === "string" ? date : getMasjidDateKey(date);
  return (
    iqamahRecords.find((entry) => entry.effectiveFrom <= key) ??
    iqamahRecords[iqamahRecords.length - 1]
  );
}

/**
 * Scheduled future iqamah changes, soonest-first — entries whose
 * `effectiveFrom` is still ahead of the given date.
 */
export function getUpcomingChanges(
  date: Date | string = new Date(),
  limit = 4,
): IqamahRecord[] {
  const key = typeof date === "string" ? date : getMasjidDateKey(date);
  return iqamahRecords
    .filter((record) => record.effectiveFrom > key)
    .slice(-limit)
    .reverse();
}

export function formatMaghribOffset(minutes: number): string {
  return `${minutes} min after Adhan`;
}

/** Human-readable effective date, e.g. "August 11, 2026". */
export function formatEffectiveDate(effectiveFrom: string): string {
  const [year, month, day] = effectiveFrom.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
