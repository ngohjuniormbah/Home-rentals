/** Format an amount as FCFA with thin-space grouping, e.g. "FCFA 85 000". */
export function formatCurrency(amount: number): string {
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `FCFA ${grouped}`;
}

/** "3d overdue" style helper. */
export function formatOverdue(days: number): string {
  return `${days}d overdue`;
}

/** Returns a greeting based on the local hour. */
export function greeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Whole-number percentage from a part / whole pair, guarding divide-by-zero. */
export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}
