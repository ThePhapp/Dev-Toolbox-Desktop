import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { decodeBase64, encodeBase64 } from './utils';

export function Base64Tool() {
  const [input, setInput] = useState('Hello, developer! 👋');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const run = (operation: (value: string) => string) => {
    try {
      setOutput(operation(input));
      setError('');
    } catch {
      setError('The input is not valid Base64 or UTF-8.');
    }
  };

  return (
    <>
      <ToolHeader
        title="Base64 Encoder"
        description="Encode or decode Unicode text without sending data anywhere."
      />
      <div className="tool-grid">
        <ToolPanel
          title="Input"
          actions={
            <>
              <Button onClick={() => run(decodeBase64)}>Decode</Button>
              <Button variant="primary" onClick={() => run(encodeBase64)}>
                Encode
              </Button>
            </>
          }
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </ToolPanel>
        <ToolPanel title="Output" actions={<CopyButton value={output} />}>
          <textarea value={output} readOnly />
        </ToolPanel>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
