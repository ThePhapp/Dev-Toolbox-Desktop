import { useMemo, useState } from 'react';
import { ToolHeader, ToolPanel } from '../../components/ToolUi';
import { diffLines } from './utils';

export function DiffTool() {
  const [before, setBefore] = useState(
    'const app = "toolbox";\nconst version = 1;\nconsole.log(app);',
  );
  const [after, setAfter] = useState(
    'const app = "dev-toolbox";\nconst version = 2;\nconsole.log(app);',
  );
  const lines = useMemo(() => diffLines(before, after), [after, before]);
  return (
    <>
      <ToolHeader title="Text Diff" description="Compare text line by line." />
      <div className="tool-grid">
        <ToolPanel title="Original">
          <textarea
            value={before}
            onChange={(event) => setBefore(event.target.value)}
          />
        </ToolPanel>
        <ToolPanel title="Changed">
          <textarea
            value={after}
            onChange={(event) => setAfter(event.target.value)}
          />
        </ToolPanel>
      </div>
      <ToolPanel title="Difference">
        <div className="diff-view">
          {lines.map((line, index) => (
            <div className={line.type} key={index}>
              <span>
                {line.type === 'add' ? '+' : line.type === 'remove' ? '−' : ' '}
              </span>
              {line.value || ' '}
            </div>
          ))}
        </div>
      </ToolPanel>
    </>
  );
}
