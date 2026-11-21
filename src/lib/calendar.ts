import club from '../../club.json';
import { meetingSlug } from './schedule';

const offsetFormatter = new Intl.DateTimeFormat('en', {
  timeZone: club.timeZone,
  timeZoneName: 'longOffset',
});
const encoder = new TextEncoder();

function localOffset(date: Date) {
  const zone = offsetFormatter.formatToParts(date).find((part) => part.type === 'timeZoneName');
  return zone?.value.slice(3) || '+00:00';
}

function startsAt(date: string) {
  const localTime = `${date}T${club.startTime}:00`;
  const estimate = new Date(`${localTime}${localOffset(new Date(`${localTime}Z`))}`);
  return new Date(`${localTime}${localOffset(estimate)}`);
}

function timestamp(date: Date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
}

function escapeText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/([,;])/g, '\\$1');
}

function foldLine(line: string) {
  let folded = '';
  let bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) {
      folded += '\r\n ';
      bytes = 1;
    }
    folded += character;
    bytes += size;
  }
  return folded;
}

export function calendarResponse(dates: readonly string[]) {
  if (!dates.length) return new Response(null, { status: 404 });

  const stamp = timestamp(new Date());
  const summary = escapeText(`Soirée jeux de société · ${club.name}`);
  const location = escapeText(`${club.venue}, ${club.street}, ${club.postalCode} ${club.town}`);
  const description = escapeText(`${club.welcome}\n${club.admission} · ${club.age}\n${club.refreshments}`);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tour de Play//Soirees jeux de societe//FR',
    `X-WR-CALNAME:${escapeText(club.name)}`,
    ...dates.flatMap((date) => [
      'BEGIN:VEVENT',
      `UID:${meetingSlug(date)}@tour-de-play`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${timestamp(startsAt(date))}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
  ];
  return new Response(`${lines.map(foldLine).join('\r\n')}\r\n`, {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
}
