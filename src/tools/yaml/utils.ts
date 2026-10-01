import { parse, stringify } from 'yaml';

export function jsonToYaml(input: string): string {
  return stringify(JSON.parse(input) as unknown, { indent: 2 });
}

export function yamlToJson(input: string): string {
  return JSON.stringify(parse(input) as unknown, null, 2);
}
