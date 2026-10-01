export function formatJson(input: string, spaces = 2): string {
  return JSON.stringify(JSON.parse(input) as unknown, null, spaces);
}

export function minifyJson(input: string): string {
  return JSON.stringify(JSON.parse(input) as unknown);
}

export function validateJson(input: string): {
  valid: boolean;
  error?: string;
} {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
}
