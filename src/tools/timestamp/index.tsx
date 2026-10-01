import { useState } from 'react';
import {
  Button,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { parseTimestamp } from './utils';

export function TimestampTool() {
  const [input, setInput] = useState(() =>
    Math.floor(Date.now() / 1000).toString(),
  );
  const [date, setDate] = useState<Date>(() => new Date());
  const [error, setError] = useState('');
  const convert = () => {
    try {
      setDate(parseTimestamp(input));
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Invalid date');
    }
  };
  return (
    <>
      <ToolHeader
        title="Timestamp Converter"
        description="Convert Unix timestamps and date strings."
      />
      <ToolPanel
        title="Input"
        actions={
          <>
            <Button
              onClick={() => setInput(Math.floor(Date.now() / 1000).toString())}
            >
              Now
            </Button>
            <Button variant="primary" onClick={convert}>
              Convert
            </Button>
          </>
        }
      >
        <input
          className="wide-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </ToolPanel>
      <div className="stat-grid">
        <div className="stat">
          <span>Local</span>
          <strong>{date.toLocaleString()}</strong>
        </div>
        <div className="stat">
          <span>ISO 8601</span>
          <strong>{date.toISOString()}</strong>
        </div>
        <div className="stat">
          <span>Unix seconds</span>
          <strong>{Math.floor(date.getTime() / 1000)}</strong>
        </div>
        <div className="stat">
          <span>Milliseconds</span>
          <strong>{date.getTime()}</strong>
        </div>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
