import { decodeBase64, encodeBase64 } from '../base64/utils';
import { formatJson, minifyJson } from '../json/utils';

export interface PipelineOperation {
  id: string;
  name: string;
  run: (input: string) => string | Promise<string>;
}

export const pipelineOperations: PipelineOperation[] = [
  { id: 'json-format', name: 'JSON: format', run: formatJson },
  { id: 'json-minify', name: 'JSON: minify', run: minifyJson },
  { id: 'base64-encode', name: 'Base64: encode', run: encodeBase64 },
  { id: 'base64-decode', name: 'Base64: decode', run: decodeBase64 },
  { id: 'url-encode', name: 'URL: encode', run: encodeURIComponent },
  { id: 'url-decode', name: 'URL: decode', run: decodeURIComponent },
  {
    id: 'uppercase',
    name: 'Text: uppercase',
    run: (input) => input.toUpperCase(),
  },
  {
    id: 'lowercase',
    name: 'Text: lowercase',
    run: (input) => input.toLowerCase(),
  },
  { id: 'trim', name: 'Text: trim', run: (input) => input.trim() },
];

export async function runPipeline(
  input: string,
  operationIds: string[],
): Promise<string> {
  let output = input;
  for (const id of operationIds) {
    const operation = pipelineOperations.find((item) => item.id === id);
    if (!operation) throw new Error(`Unknown pipeline operation: ${id}`);
    output = await operation.run(output);
  }
  return output;
}
