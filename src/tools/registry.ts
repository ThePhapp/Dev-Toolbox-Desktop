import { lazy } from 'react';
import type { ToolDefinition } from './types';

const JsonTool = lazy(() =>
  import('./json').then((module) => ({ default: module.JsonTool })),
);
const Base64Tool = lazy(() =>
  import('./base64').then((module) => ({ default: module.Base64Tool })),
);
const UrlTool = lazy(() =>
  import('./url').then((module) => ({ default: module.UrlTool })),
);
const JwtTool = lazy(() =>
  import('./jwt').then((module) => ({ default: module.JwtTool })),
);
const UuidTool = lazy(() =>
  import('./uuid').then((module) => ({ default: module.UuidTool })),
);
const HashTool = lazy(() =>
  import('./hash').then((module) => ({ default: module.HashTool })),
);
const TimestampTool = lazy(() =>
  import('./timestamp').then((module) => ({ default: module.TimestampTool })),
);
const RegexTool = lazy(() =>
  import('./regex').then((module) => ({ default: module.RegexTool })),
);
const DiffTool = lazy(() =>
  import('./diff').then((module) => ({ default: module.DiffTool })),
);
const CaseTool = lazy(() =>
  import('./case').then((module) => ({ default: module.CaseTool })),
);
const QrTool = lazy(() =>
  import('./qr').then((module) => ({ default: module.QrTool })),
);
const YamlTool = lazy(() =>
  import('./yaml').then((module) => ({ default: module.YamlTool })),
);
const CsvTool = lazy(() =>
  import('./csv').then((module) => ({ default: module.CsvTool })),
);
const SqlTool = lazy(() =>
  import('./sql').then((module) => ({ default: module.SqlTool })),
);
const CronTool = lazy(() =>
  import('./cron').then((module) => ({ default: module.CronTool })),
);
const MarkdownTool = lazy(() =>
  import('./markdown').then((module) => ({ default: module.MarkdownTool })),
);
const ColorTool = lazy(() =>
  import('./color').then((module) => ({ default: module.ColorTool })),
);
const PipelineTool = lazy(() =>
  import('./pipeline').then((module) => ({ default: module.PipelineTool })),
);

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
  {
    id: 'yaml',
    name: 'JSON ↔ YAML',
    description: 'Convert JSON and YAML documents',
    category: 'Data',
    keywords: ['convert', 'config'],
    icon: 'Y',
    component: YamlTool,
  },
  {
    id: 'csv',
    name: 'CSV ↔ JSON',
    description: 'Convert tabular CSV and JSON arrays',
    category: 'Data',
    keywords: ['convert', 'table'],
    icon: 'CV',
    component: CsvTool,
  },
  {
    id: 'sql',
    name: 'SQL Formatter',
    description: 'Format queries across SQL dialects',
    category: 'Data',
    keywords: ['query', 'database'],
    icon: 'SQ',
    component: SqlTool,
  },
  {
    id: 'cron',
    name: 'Cron Builder',
    description: 'Build five-field cron schedules',
    category: 'Generate',
    keywords: ['schedule', 'job'],
    icon: 'CR',
    component: CronTool,
  },
  {
    id: 'markdown',
    name: 'Markdown Preview',
    description: 'Preview sanitized Markdown locally',
    category: 'Text',
    keywords: ['md', 'render'],
    icon: 'MD',
    component: MarkdownTool,
  },
  {
    id: 'color',
    name: 'Color Converter',
    description: 'Convert HEX colors to RGB and HSL',
    category: 'Generate',
    keywords: ['hex', 'rgb', 'hsl'],
    icon: '●',
    component: ColorTool,
  },
  {
    id: 'pipeline',
    name: 'Tool Pipeline',
    description: 'Chain reusable text transformations',
    category: 'Data',
    keywords: ['workflow', 'chain', 'compose'],
    icon: '→',
    component: PipelineTool,
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
