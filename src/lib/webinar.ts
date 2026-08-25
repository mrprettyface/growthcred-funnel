/**
 * The live class, in one place.
 *
 * Everything the webinar page and the registration form display comes from
 * here, so moving the date is a one-line change rather than a hunt through
 * copy. `slug` is what lands in `webinar_registrations.webinar`, so give each
 * new class its own slug and the old registrations stay separable.
 *
 * Times are South African (SAST, UTC+2). The calendar link uses UTC.
 */
export const WEBINAR = {
  slug: "ai-80-2026-09-02",
  title: "Can AI do your job for you — even if it’s complicated?",
  dayLabel: "Wed 2 September 2026",
  timeLabel: "12:00–13:00 SAST",
  shortWhen: "Wednesday 2 September · 12:00",
  where: "Live on Zoom",
  /** UTC instants for the calendar link: 12:00 SAST is 10:00 UTC. */
  startUtc: "20260902T100000Z",
  endUtc: "20260902T110000Z",
} as const;

/** "Add to calendar" link. Works on Google Calendar, desktop and mobile. */
export function calendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `GrowthCred live class — ${WEBINAR.title}`,
    dates: `${WEBINAR.startUtc}/${WEBINAR.endUtc}`,
    details:
      "Free 60-minute live class with Phila Ngwenya. The joining link is in your email; a reminder comes on WhatsApp an hour before.",
    location: WEBINAR.where,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
