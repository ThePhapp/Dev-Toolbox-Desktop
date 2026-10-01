import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { csvToJson, jsonToCsv } from './utils';

export function CsvTool() {
  const [input, setInput] = useState(
    'name,role\nAda,Engineer\nLinus,Maintainer',
  );
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const run = (operation: (value: string) => string) => {
    try {
      setOutput(operation(input));
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Conversion failed');
    }
  };
  return (
    <>
      <ToolHeader
        title="CSV ↔ JSON"
        description="Convert comma-separated data and JSON arrays."
      />
      <div className="tool-grid">
        <ToolPanel
          title="Input"
          actions={
            <>
              <Button onClick={() => run(jsonToCsv)}>JSON → CSV</Button>
              <Button variant="primary" onClick={() => run(csvToJson)}>
                CSV → JSON
              </Button>
            </>
          }
        >
          <textarea
            className="tall"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </ToolPanel>
        <ToolPanel title="Output" actions={<CopyButton value={output} />}>
          <textarea className="tall" value={output} readOnly />
        </ToolPanel>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
