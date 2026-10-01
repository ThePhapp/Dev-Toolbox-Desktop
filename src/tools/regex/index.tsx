import { useMemo, useState } from 'react';
import { ErrorNotice, ToolHeader, ToolPanel } from '../../components/ToolUi';

export function RegexTool() {
  const [pattern, setPattern] = useState(
    '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b',
  );
  const [flags, setFlags] = useState('gi');
  const [text, setText] = useState(
    'Contact hello@example.com or team@devtoolbox.app',
  );
  const result = useMemo(() => {
    try {
      const regex = new RegExp(
        pattern,
        flags.includes('g') ? flags : `${flags}g`,
      );
      const matches = Array.from(text.matchAll(regex));
      return { matches, error: '' };
    } catch (reason) {
      return {
        matches: [],
        error: reason instanceof Error ? reason.message : 'Invalid expression',
      };
    }
  }, [flags, pattern, text]);
  return (
    <>
      <ToolHeader
        title="Regex Tester"
        description="Test JavaScript regular expressions and inspect matches."
      />
      <div className="regex-row">
        <span>/</span>
        <input
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
        />
        <span>/</span>
        <input
          className="flags"
          value={flags}
          onChange={(event) => setFlags(event.target.value)}
          aria-label="Regex flags"
        />
      </div>
      <ToolPanel title="Test text">
        <textarea
          className="tall"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </ToolPanel>
      <ToolPanel title={`${result.matches.length} matches`}>
        <div className="match-list">
          {result.matches.map((match, index) => (
            <div key={`${match.index}-${index}`}>
              <code>{match[0]}</code>
              <span>index {match.index}</span>
            </div>
          ))}
        </div>
      </ToolPanel>
      <ErrorNotice message={result.error} />
    </>
  );
}
