import type { APIRoute } from 'astro';
import { calendarResponse } from '../../lib/calendar';
import { dates, meetingSlug } from '../../lib/schedule';

export function getStaticPaths() {
  return dates.map((date) => ({
    params: { meeting: meetingSlug(date) },
    props: { date },
  }));
}

export const GET: APIRoute = ({ props }) => calendarResponse([props.date]);
