import { useState } from 'react';
import {
  Button,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { decodeJwt } from './utils';

const demo =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRldiBUb29sYm94IiwiaWF0IjoxNTE2MjM5MDIyfQ.signature';

export function JwtTool() {
  const [input, setInput] = useState(demo);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const decode = () => {
    try {
      setOutput(JSON.stringify(decodeJwt(input), null, 2));
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Invalid JWT');
    }
  };
  return (
    <>
      <ToolHeader
        title="JWT Decoder"
        description="Inspect JWT headers and payloads locally. Signature verification is not performed."
      />
      <ToolPanel
        title="Token"
        actions={
          <Button variant="primary" onClick={decode}>
            Decode
          </Button>
        }
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolPanel>
      <ToolPanel title="Decoded">
        <pre className="output-block">
          {output || 'Decoded token appears here'}
        </pre>
      </ToolPanel>
      <ErrorNotice message={error} />
    </>
  );
}
