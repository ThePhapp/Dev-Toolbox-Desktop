function bytesToBinary(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
}

export function encodeBase64(input: string): string {
  return btoa(bytesToBinary(new TextEncoder().encode(input)));
}

export function decodeBase64(input: string): string {
  const binary = atob(input.replace(/\s/g, ''));
  return new TextDecoder(undefined, { fatal: true }).decode(
    Uint8Array.from(binary, (character) => character.charCodeAt(0)),
  );
}
