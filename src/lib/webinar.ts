/**
 * The live class the site registers people for.
 *
 * Every live-class component reads this file: the registration page, the seat
 * forms, the share block, the Event markup in src/seo/routes.ts and the Google
 * Calendar link below. One session at a time, by design — when this one has
 * run, replace these values with the next one rather than adding a second set.
 *
 * Dates here are Phila's, from the 11 November 2026 JCCI brief. `startUtc` is
 * the one that matters: it drives the countdown, the calendar link and whether
 * the page still sells a seat. 18:00 SAST is 16:00 UTC (SAST is UTC+2 all year,
 * with no daylight saving).
 */
export const WEBINAR = {
  slug: "jcci-ai-2026-11-18",
  title: "Prompts Don’t Save Time. Systems Do.",
  dayLabel: "Wednesday 18 November",
  timeLabel: "18:00 SAST",
  shortWhen: "18 November",
  where: "Live on Microsoft Teams",
  dateOnly: "Wed 18 Nov",
  startUtc: "20261118T160000Z",
  endUtc: "20261118T170000Z",
} as const;
export function hasFutureSession(start:string, now=Date.now()):boolean {
  const iso=start.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
  const timestamp=Date.parse(iso);
  return Number.isFinite(timestamp)&&timestamp>now;
}
/** Milliseconds until the session starts, or 0 once it has started or passed. */
export function msUntilStart(now=Date.now()):number {
  const iso=WEBINAR.startUtc.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
  const timestamp=Date.parse(iso);
  if(!Number.isFinite(timestamp))return 0;
  return Math.max(0, timestamp-now);
}
/** True once the session has started: the page stops selling a seat at it. */
export function sessionHasPassed(now=Date.now()):boolean {
  return !hasFutureSession(WEBINAR.startUtc, now);
}
/** An undated or expired session must never create a misleading calendar event. */
export function calendarUrl(): string {
  if(!hasFutureSession(WEBINAR.startUtc))return 'https://growthcred.co.za/contact';
  const params=new URLSearchParams({action:'TEMPLATE',text:`GrowthCred live class — ${WEBINAR.title}`,dates:`${WEBINAR.startUtc}/${WEBINAR.endUtc}`,details:'Online AI class with GrowthCred.',location:WEBINAR.where});
  return `https://calendar.google.com/calendar/render?${params}`;
}
/** The same event as an Outlook "add to calendar" link. */
export function outlookCalendarUrl(): string {
  if(!hasFutureSession(WEBINAR.startUtc))return 'https://growthcred.co.za/contact';
  const iso=(s:string)=>s.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
  const params=new URLSearchParams({path:'/calendar/action/compose',rru:'addevent',subject:`GrowthCred live class — ${WEBINAR.title}`,startdt:iso(WEBINAR.startUtc),enddt:iso(WEBINAR.endUtc),body:'Online AI class with GrowthCred.',location:WEBINAR.where});
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params}`;
}
