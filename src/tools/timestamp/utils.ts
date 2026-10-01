export function parseTimestamp(value: string): Date {
  const trimmed = value.trim();
  const numeric = Number(trimmed);
  const date =
    trimmed !== '' && Number.isFinite(numeric)
      ? new Date(trimmed.length <= 10 ? numeric * 1000 : numeric)
      : new Date(trimmed);
  if (Number.isNaN(date.getTime()))
    throw new Error('Enter a valid Unix timestamp or date.');
  return date;
}
