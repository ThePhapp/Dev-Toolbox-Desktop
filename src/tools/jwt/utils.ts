import { decodeBase64 } from '../base64/utils';

function decodePart(value: string): unknown {
  const normalized = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(value.length / 4) * 4, '=');
  return JSON.parse(decodeBase64(normalized)) as unknown;
}

export function decodeJwt(token: string): {
  header: unknown;
  payload: unknown;
} {
  const parts = token.trim().split('.');
  if (parts.length !== 3)
    throw new Error('A JWT must contain three dot-separated parts.');
  return { header: decodePart(parts[0]), payload: decodePart(parts[1]) };
}
