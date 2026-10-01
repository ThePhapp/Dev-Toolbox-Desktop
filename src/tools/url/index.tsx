import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';

export function UrlTool() {
  const [input, setInput] = useState('https://example.com/search?q=dev tools');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const run = (operation: (value: string) => string) => {
    try {
      setOutput(operation(input));
      setError('');
    } catch {
      setError('Malformed percent-encoded input.');
    }
  };

  return (
    <>
      <ToolHeader
        title="URL Encoder"
        description="Encode or decode URL components instantly."
      />
      <ToolPanel
        title="Value"
        actions={
          <>
            <Button onClick={() => run(decodeURIComponent)}>Decode</Button>
            <Button variant="primary" onClick={() => run(encodeURIComponent)}>
              Encode
            </Button>
            <CopyButton value={output} />
          </>
        }
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolPanel>
      <ToolPanel title="Result">
        <textarea value={output} readOnly />
      </ToolPanel>
      <ErrorNotice message={error} />
    </>
  );
}
