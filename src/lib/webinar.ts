/** Session details are confirmed on registration. No invented calendar date. */
export const WEBINAR = {
  slug: "online-ai-next-session",
  title: "Give AI the context your business needs",
  dayLabel: "Date confirmed on registration",
  timeLabel: "Time confirmed on registration",
  shortWhen: "our next online class",
  where: "Online · Joining details confirmed on registration",
  dateOnly: "Next online session",
  startUtc: "",
  endUtc: "",
} as const;
export function hasFutureSession(start:string, now=Date.now()):boolean {
  const iso=start.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
  const timestamp=Date.parse(iso);
  return Number.isFinite(timestamp)&&timestamp>now;
}
/** An undated or expired session must never create a misleading calendar event. */
export function calendarUrl(): string {
  if(!hasFutureSession(WEBINAR.startUtc))return 'https://growthcred.co.za/contact';
  const params=new URLSearchParams({action:'TEMPLATE',text:`GrowthCred live class — ${WEBINAR.title}`,dates:`${WEBINAR.startUtc}/${WEBINAR.endUtc}`,details:'Online AI class with GrowthCred.',location:WEBINAR.where});
  return `https://calendar.google.com/calendar/render?${params}`;
}
