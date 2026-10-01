import { describe, expect, it } from 'vitest';
import { decodeBase64, encodeBase64 } from './base64/utils';
import { convertCases } from './case/utils';
import { convertColor } from './color/utils';
import { csvToJson, jsonToCsv } from './csv/utils';
import { diffLines } from './diff/utils';
import { formatJson, minifyJson, validateJson } from './json/utils';
import { decodeJwt } from './jwt/utils';
import { runPipeline } from './pipeline/operations';
import { parseTimestamp } from './timestamp/utils';
import { jsonToYaml, yamlToJson } from './yaml/utils';

describe('JSON utilities', () => {
  it('formats and minifies Unicode JSON', () => {
    const input = '{"message":"Xin chào","valid":true}';
    expect(formatJson(input)).toContain('\n  "message"');
    expect(minifyJson(input)).toBe(input);
  });

  it('reports invalid JSON', () => {
    expect(validateJson('{invalid}').valid).toBe(false);
  });
});

describe('Base64 utilities', () => {
  it('round trips Unicode text', () => {
    const input = 'Xin chào 👋';
    expect(decodeBase64(encodeBase64(input))).toBe(input);
  });
});

describe('JWT utilities', () => {
  it('decodes URL-safe token parts', () => {
    const result = decodeJwt(
      'eyJhbGciOiJub25lIn0.eyJuYW1lIjoiRGV2IFRvb2xib3gifQ.signature',
    );
    expect(result.payload).toEqual({ name: 'Dev Toolbox' });
  });
});

describe('text utilities', () => {
  it('converts identifier cases', () => {
    expect(convertCases('hello Dev Toolbox').snake_case).toBe(
      'hello_dev_toolbox',
    );
    expect(convertCases('hello Dev Toolbox').PascalCase).toBe(
      'HelloDevToolbox',
    );
  });

  it('produces added and removed diff lines', () => {
    const result = diffLines('one\ntwo', 'one\nthree');
    expect(result).toContainEqual({ type: 'remove', value: 'two' });
    expect(result).toContainEqual({ type: 'add', value: 'three' });
  });
});

describe('timestamp utilities', () => {
  it('supports seconds and ISO dates', () => {
    expect(parseTimestamp('0').toISOString()).toBe('1970-01-01T00:00:00.000Z');
    expect(parseTimestamp('2026-01-01').getUTCFullYear()).toBe(2026);
  });
});

describe('data converters', () => {
  it('round trips JSON and YAML', () => {
    const json = '{"name":"toolbox","enabled":true}';
    expect(JSON.parse(yamlToJson(jsonToYaml(json)))).toEqual(JSON.parse(json));
  });

  it('handles quoted CSV fields', () => {
    const csv = 'name,note\nAda,"Hello, world"';
    expect(JSON.parse(csvToJson(csv))).toEqual([
      { name: 'Ada', note: 'Hello, world' },
    ]);
    expect(jsonToCsv('[{"name":"Ada","note":"Hello, world"}]')).toContain(
      '"Hello, world"',
    );
  });

  it('converts hex colors', () => {
    expect(convertColor('#fff')).toEqual({
      hex: '#FFFFFF',
      rgb: 'rgb(255, 255, 255)',
      hsl: 'hsl(0, 0%, 100%)',
    });
  });
});

describe('tool pipeline', () => {
  it('executes operations in order', async () => {
    await expect(
      runPipeline('  hello world  ', ['trim', 'base64-encode']),
    ).resolves.toBe('aGVsbG8gd29ybGQ=');
  });

  it('rejects unknown operations', async () => {
    await expect(runPipeline('value', ['missing'])).rejects.toThrow(
      'Unknown pipeline operation',
    );
  });
});
