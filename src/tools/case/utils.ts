export function words(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim()
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

export function convertCases(input: string) {
  const parts = words(input);
  const cap = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
  return {
    camelCase: parts.map((word, index) => (index ? cap(word) : word)).join(''),
    PascalCase: parts.map(cap).join(''),
    snake_case: parts.join('_'),
    'kebab-case': parts.join('-'),
    CONSTANT_CASE: parts.join('_').toUpperCase(),
    'Title Case': parts.map(cap).join(' '),
  };
}
