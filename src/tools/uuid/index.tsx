import { useState } from 'react';
import {
  Button,
  CopyButton,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';

export function UuidTool() {
  const [count, setCount] = useState(5);
  const [values, setValues] = useState(() =>
    Array.from({ length: 5 }, () => crypto.randomUUID()),
  );
  const generate = () =>
    setValues(Array.from({ length: count }, () => crypto.randomUUID()));
  const output = values.join('\n');
  return (
    <>
      <ToolHeader
        title="UUID Generator"
        description="Generate cryptographically secure UUID v4 values."
      />
      <ToolPanel
        title="Options"
        actions={
          <>
            <CopyButton value={output} />
            <Button variant="primary" onClick={generate}>
              Generate
            </Button>
          </>
        }
      >
        <label className="field">
          Count{' '}
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(event) =>
              setCount(Math.min(100, Math.max(1, Number(event.target.value))))
            }
          />
        </label>
      </ToolPanel>
      <ToolPanel title="UUIDs">
        <textarea className="tall" value={output} readOnly />
      </ToolPanel>
    </>
  );
}
