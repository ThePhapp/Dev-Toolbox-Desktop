import { useMemo, useState } from 'react';
import {
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { convertColor } from './utils';

export function ColorTool() {
  const [input, setInput] = useState('#6DE3AD');
  const result = useMemo(() => {
    try {
      return { color: convertColor(input), error: '' };
    } catch (reason) {
      return {
        color: null,
        error: reason instanceof Error ? reason.message : 'Invalid color',
      };
    }
  }, [input]);
  return (
    <>
      <ToolHeader
        title="Color Converter"
        description="Convert hexadecimal colors to RGB and HSL."
      />
      <ToolPanel title="Color">
        <div className="color-editor">
          <input
            type="color"
            value={result.color?.hex ?? '#000000'}
            onChange={(event) => setInput(event.target.value)}
          />
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </div>
      </ToolPanel>
      {result.color && (
        <div
          className="color-results"
          style={{ '--preview': result.color.hex } as React.CSSProperties}
        >
          <div className="color-swatch" />
          {Object.entries(result.color).map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <code>{value}</code>
              <CopyButton value={value} />
            </div>
          ))}
        </div>
      )}
      <ErrorNotice message={result.error} />
    </>
  );
}
