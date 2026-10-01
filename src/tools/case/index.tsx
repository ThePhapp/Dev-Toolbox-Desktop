import { useState } from 'react';
import { CopyButton, ToolHeader, ToolPanel } from '../../components/ToolUi';
import { convertCases } from './utils';

export function CaseTool() {
  const [input, setInput] = useState('Dev toolbox desktop');
  const results = convertCases(input);
  return (
    <>
      <ToolHeader
        title="Case Converter"
        description="Convert text to common developer naming conventions."
      />
      <ToolPanel title="Input">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolPanel>
      <div className="case-list">
        {Object.entries(results).map(([name, value]) => (
          <div key={name}>
            <span>{name}</span>
            <code>{value}</code>
            <CopyButton value={value} />
          </div>
        ))}
      </div>
    </>
  );
}
