import club from '../../club.json';

export const dates = [...new Set(club.dates)].sort();
export const startTimeLabel = club.startTime.replace(':', ' h ');

const localDay = new Intl.DateTimeFormat('sv-SE', {
  timeZone: club.timeZone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const frenchDate = new Intl.DateTimeFormat('fr-CH', {
  timeZone: 'UTC',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function getSchedule(now = new Date()) {
  const today = localDay.format(now);
  const previousMonth = new Date(`${today.slice(0, 7)}-01T00:00:00Z`);
  previousMonth.setUTCMonth(previousMonth.getUTCMonth() - 1);

  return {
    today,
    visibleFrom: previousMonth.toISOString().slice(0, 10),
    next: dates.find((date) => date >= today),
  };
}

export type Schedule = ReturnType<typeof getSchedule>;

export function formatDate(date: string) {
  const label = frenchDate.format(new Date(`${date}T00:00:00Z`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function meetingSlug(date: string) {
  return `tour-de-play-${date}`;
}
