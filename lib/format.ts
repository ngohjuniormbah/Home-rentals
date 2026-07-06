// Amounts are shown in FCFA (Central African CFA franc) to match the
// existing product; swap the locale/currency here if needed.

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount) + " FCFA";
}

export function formatCompact(amount: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "07-2026" -> "July 2026" */
export function formatBillingPeriod(period: string): string {
  const [mm, yyyy] = period.split("-");
  const idx = parseInt(mm, 10) - 1;
  return `${MONTHS[idx] ?? mm} ${yyyy}`;
}

export function currentBillingPeriod(date = new Date()): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${mm}-${date.getFullYear()}`;
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Days until the next rent due date given a day-of-month.
 * Negative means overdue.
 */
export function daysUntilDue(dueDay: number, from = new Date()): number {
  const year = from.getFullYear();
  const month = from.getMonth();
  let due = new Date(year, month, dueDay);
  if (from.getDate() > dueDay) {
    due = new Date(year, month + 1, dueDay);
  }
  const diff = due.getTime() - new Date(year, month, from.getDate()).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
