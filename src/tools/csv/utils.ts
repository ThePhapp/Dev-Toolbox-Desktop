export function parseCsv(input: string): string[][] {
  const rows: string[][] = [['']];
  let quoted = false;
  for (let index = 0; index < input.length; index++) {
    const character = input[index];
    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        rows.at(-1)![rows.at(-1)!.length - 1] += '"';
        index++;
      } else quoted = !quoted;
    } else if (character === ',' && !quoted) rows.at(-1)!.push('');
    else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && input[index + 1] === '\n') index++;
      rows.push(['']);
    } else rows.at(-1)![rows.at(-1)!.length - 1] += character;
  }
  if (quoted) throw new Error('Unclosed quoted field.');
  if (rows.at(-1)?.length === 1 && rows.at(-1)?.[0] === '') rows.pop();
  return rows;
}

export function csvToJson(input: string): string {
  const [headers, ...rows] = parseCsv(input);
  if (!headers?.length) return '[]';
  return JSON.stringify(
    rows.map((row) =>
      Object.fromEntries(
        headers.map((header, index) => [header, row[index] ?? '']),
      ),
    ),
    null,
    2,
  );
}

function escapeCell(value: unknown): string {
  const text =
    value == null
      ? ''
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function jsonToCsv(input: string): string {
  const value = JSON.parse(input) as unknown;
  if (!Array.isArray(value))
    throw new Error('JSON must be an array of objects.');
  const records = value as Record<string, unknown>[];
  const headers = [
    ...new Set(records.flatMap((record) => Object.keys(record))),
  ];
  return [
    headers.map(escapeCell).join(','),
    ...records.map((record) =>
      headers.map((header) => escapeCell(record[header])).join(','),
    ),
  ].join('\n');
}
