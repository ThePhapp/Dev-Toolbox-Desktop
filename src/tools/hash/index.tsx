import { useState } from 'react';
import {
  Button,
  CopyButton,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { createHash, type HashAlgorithm } from './utils';

export function HashTool() {
  const [input, setInput] = useState('Dev Toolbox');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [output, setOutput] = useState('');
  return (
    <>
      <ToolHeader
        title="Hash Generator"
        description="Create SHA hashes with the Web Crypto API."
      />
      <ToolPanel
        title="Input"
        actions={
          <>
            <select
              value={algorithm}
              onChange={(event) =>
                setAlgorithm(event.target.value as HashAlgorithm)
              }
            >
              <option>SHA-1</option>
              <option>SHA-256</option>
              <option>SHA-384</option>
              <option>SHA-512</option>
            </select>
            <Button
              variant="primary"
              onClick={() => void createHash(input, algorithm).then(setOutput)}
            >
              Generate
            </Button>
          </>
        }
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolPanel>
      <ToolPanel title="Digest" actions={<CopyButton value={output} />}>
        <div className="mono-value">{output || 'Hash appears here'}</div>
      </ToolPanel>
    </>
  );
}
