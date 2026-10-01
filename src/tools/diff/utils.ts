export interface DiffLine {
  type: 'same' | 'add' | 'remove';
  value: string;
}

export function diffLines(before: string, after: string): DiffLine[] {
  const left = before.split('\n');
  const right = after.split('\n');
  const table = Array.from({ length: left.length + 1 }, () =>
    Array<number>(right.length + 1).fill(0),
  );
  for (let i = left.length - 1; i >= 0; i--)
    for (let j = right.length - 1; j >= 0; j--)
      table[i][j] =
        left[i] === right[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      result.push({ type: 'same', value: left[i] });
      i++;
      j++;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      result.push({ type: 'remove', value: left[i++] });
    } else {
      result.push({ type: 'add', value: right[j++] });
    }
  }
  while (i < left.length) result.push({ type: 'remove', value: left[i++] });
  while (j < right.length) result.push({ type: 'add', value: right[j++] });
  return result;
}
