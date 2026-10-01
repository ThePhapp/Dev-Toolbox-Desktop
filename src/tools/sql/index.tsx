import { format, type SqlLanguage } from 'sql-formatter';
import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';

const languages: SqlLanguage[] = [
  'sql',
  'mysql',
  'postgresql',
  'sqlite',
  'transactsql',
];

export function SqlTool() {
  const [input, setInput] = useState(
    'select u.id,u.name,count(o.id) as orders from users u left join orders o on o.user_id=u.id where u.active=true group by u.id,u.name order by orders desc;',
  );
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState<SqlLanguage>('sql');
  const [error, setError] = useState('');
  const run = () => {
    try {
      setOutput(format(input, { language, keywordCase: 'upper' }));
      setError('');
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : 'Could not format SQL',
      );
    }
  };
  return (
    <>
      <ToolHeader
        title="SQL Formatter"
        description="Format common SQL dialects with consistent keyword casing."
      />
      <div className="tool-grid">
        <ToolPanel
          title="Query"
          actions={
            <>
              <select
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value as SqlLanguage)
                }
              >
                {languages.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <Button variant="primary" onClick={run}>
                Format
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
        <ToolPanel title="Formatted" actions={<CopyButton value={output} />}>
          <textarea className="tall" value={output} readOnly />
        </ToolPanel>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
