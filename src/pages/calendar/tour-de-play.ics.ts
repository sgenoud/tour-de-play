import type { APIRoute } from 'astro';
import { calendarResponse } from '../../lib/calendar';
import { dates } from '../../lib/schedule';

export const GET: APIRoute = () => calendarResponse(dates);
