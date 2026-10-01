import { Base64Tool } from './base64';
import { CaseTool } from './case';
import { DiffTool } from './diff';
import { HashTool } from './hash';
import { JsonTool } from './json';
import { JwtTool } from './jwt';
import { QrTool } from './qr';
import { RegexTool } from './regex';
import { TimestampTool } from './timestamp';
import type { ToolDefinition } from './types';
import { UrlTool } from './url';
import { UuidTool } from './uuid';

export const tools: ToolDefinition[] = [
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Format, validate, and minify JSON',
    category: 'Data',
    keywords: ['validator', 'prettify'],
    icon: '{ }',
    component: JsonTool,
  },
  {
    id: 'base64',
    name: 'Base64 Codec',
    description: 'Encode and decode Base64 text',
    category: 'Encode',
    keywords: ['decode', 'binary'],
    icon: '64',
    component: Base64Tool,
  },
  {
    id: 'url',
    name: 'URL Codec',
    description: 'Encode and decode URL components',
    category: 'Encode',
    keywords: ['percent', 'uri'],
    icon: '%',
    component: UrlTool,
  },
  {
    id: 'jwt',
    name: 'JWT Decoder',
    description: 'Inspect token headers and payloads',
    category: 'Data',
    keywords: ['token', 'auth'],
    icon: 'JW',
    component: JwtTool,
  },
  {
    id: 'uuid',
    name: 'UUID Generator',
    description: 'Generate secure UUID v4 values',
    category: 'Generate',
    keywords: ['guid', 'random'],
    icon: 'ID',
    component: UuidTool,
  },
  {
    id: 'hash',
    name: 'Hash Generator',
    description: 'Generate SHA message digests',
    category: 'Generate',
    keywords: ['sha', 'checksum'],
    icon: '#',
    component: HashTool,
  },
  {
    id: 'timestamp',
    name: 'Timestamp Converter',
    description: 'Convert Unix and ISO dates',
    category: 'Data',
    keywords: ['epoch', 'date', 'time'],
    icon: 'TS',
    component: TimestampTool,
  },
  {
    id: 'regex',
    name: 'Regex Tester',
    description: 'Test JavaScript regular expressions',
    category: 'Text',
    keywords: ['regexp', 'match'],
    icon: '.*',
    component: RegexTool,
  },
  {
    id: 'diff',
    name: 'Text Diff',
    description: 'Compare two blocks of text',
    category: 'Text',
    keywords: ['compare', 'changes'],
    icon: '±',
    component: DiffTool,
  },
  {
    id: 'case',
    name: 'Case Converter',
    description: 'Convert identifier naming styles',
    category: 'Text',
    keywords: ['camel', 'snake', 'kebab'],
    icon: 'Aa',
    component: CaseTool,
  },
  {
    id: 'qr',
    name: 'QR Code Generator',
    description: 'Create downloadable QR images',
    category: 'Generate',
    keywords: ['barcode', 'image'],
    icon: 'QR',
    component: QrTool,
  },
];

export function searchTools(query: string): ToolDefinition[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return tools;
  return tools.filter((tool) =>
    [tool.name, tool.description, tool.category, ...tool.keywords]
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );
}
