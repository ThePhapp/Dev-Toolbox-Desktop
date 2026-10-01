import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { jsonToYaml, yamlToJson } from './utils';

export function YamlTool() {
  const [input, setInput] = useState(
    '{\n  "name": "Dev Toolbox",\n  "offline": true\n}',
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
        title="JSON ↔ YAML"
        description="Convert structured data between JSON and YAML."
      />
      <div className="tool-grid">
        <ToolPanel
          title="Input"
          actions={
            <>
              <Button onClick={() => run(yamlToJson)}>YAML → JSON</Button>
              <Button variant="primary" onClick={() => run(jsonToYaml)}>
                JSON → YAML
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
