import { useRef, useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { formatJson, minifyJson } from './utils';

const sample =
  '{"name":"dev-toolbox","offline":true,"tools":["json","jwt","uuid"]}';

export function JsonTool() {
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const transform = (operation: (value: string) => string) => {
    try {
      setOutput(operation(input));
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Invalid JSON');
    }
  };

  const loadFile = async (file?: File) => {
    if (!file) return;
    setInput(await file.text());
    setOutput('');
    setError('');
  };

  const saveOutput = () => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(
      new Blob([output], { type: 'application/json' }),
    );
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <ToolHeader
        title="JSON Formatter"
        description="Validate, format, and minify JSON locally."
      />
      <input
        ref={fileInput}
        hidden
        type="file"
        accept=".json,application/json,text/plain"
        onChange={(event) => void loadFile(event.target.files?.[0])}
      />
      <div
        className="tool-grid"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void loadFile(event.dataTransfer.files[0]);
        }}
      >
        <ToolPanel
          title="Input"
          actions={
            <>
              <Button onClick={() => fileInput.current?.click()}>Open</Button>
              <Button onClick={() => transform(minifyJson)}>Minify</Button>
              <Button variant="primary" onClick={() => transform(formatJson)}>
                Format
              </Button>
            </>
          }
        >
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
          />
        </ToolPanel>
        <ToolPanel
          title="Output"
          actions={
            <>
              <Button disabled={!output} onClick={saveOutput}>
                Save
              </Button>
              <CopyButton value={output} />
            </>
          }
        >
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON appears here"
            spellCheck={false}
          />
        </ToolPanel>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
