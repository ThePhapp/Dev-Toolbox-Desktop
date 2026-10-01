import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useMemo, useState } from 'react';
import { ToolHeader, ToolPanel } from '../../components/ToolUi';

const sample =
  '# Markdown preview\n\nWrite **Markdown** on the left and preview it safely.\n\n- Local rendering\n- GitHub-style text\n\n```ts\nconst privateByDefault = true;\n```';

export function MarkdownTool() {
  const [input, setInput] = useState(sample);
  const html = useMemo(
    () => DOMPurify.sanitize(marked.parse(input) as string),
    [input],
  );
  return (
    <>
      <ToolHeader
        title="Markdown Preview"
        description="Render sanitized Markdown locally as you type."
      />
      <div className="tool-grid">
        <ToolPanel title="Markdown">
          <textarea
            className="tall"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </ToolPanel>
        <ToolPanel title="Preview">
          <article
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ToolPanel>
      </div>
    </>
  );
}
