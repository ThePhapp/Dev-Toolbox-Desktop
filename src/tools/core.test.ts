import { describe, expect, it } from 'vitest';
import { decodeBase64, encodeBase64 } from './base64/utils';
import { convertCases } from './case/utils';
import { diffLines } from './diff/utils';
import { formatJson, minifyJson, validateJson } from './json/utils';
import { decodeJwt } from './jwt/utils';
import { parseTimestamp } from './timestamp/utils';

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
