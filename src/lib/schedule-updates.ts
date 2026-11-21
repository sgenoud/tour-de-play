import { getSchedule, type Schedule } from './schedule';

export function watchSchedule(update: (schedule: Schedule) => void) {
  const refresh = () => update(getSchedule());
  refresh();
  window.addEventListener('pageshow', refresh);
  document.addEventListener('visibilitychange', refresh);
}
