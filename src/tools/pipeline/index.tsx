import { useState } from 'react';
import {
  Button,
  CopyButton,
  ErrorNotice,
  ToolHeader,
  ToolPanel,
} from '../../components/ToolUi';
import { pipelineOperations, runPipeline } from './operations';

export function PipelineTool() {
  const [input, setInput] = useState(
    '  {"message":"hello pipeline","valid":true}  ',
  );
  const [steps, setSteps] = useState(['trim', 'json-format']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const run = async () => {
    try {
      setOutput(await runPipeline(input, steps));
      setError('');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Pipeline failed');
    }
  };
  const move = (index: number, offset: number) => {
    const next = [...steps];
    const target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSteps(next);
  };
  return (
    <>
      <ToolHeader
        title="Tool Pipeline"
        description="Chain reusable operations into a repeatable local workflow."
      />
      <div className="pipeline-layout">
        <ToolPanel
          title="Steps"
          actions={
            <Button
              onClick={() =>
                setSteps((current) => [...current, pipelineOperations[0].id])
              }
            >
              Add step
            </Button>
          }
        >
          <div className="pipeline-steps">
            {steps.map((step, index) => (
              <div key={`${index}-${step}`}>
                <span>{index + 1}</span>
                <select
                  value={step}
                  onChange={(event) =>
                    setSteps((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? event.target.value : item,
                      ),
                    )
                  }
                >
                  {pipelineOperations.map((operation) => (
                    <option value={operation.id} key={operation.id}>
                      {operation.name}
                    </option>
                  ))}
                </select>
                <Button onClick={() => move(index, -1)} disabled={index === 0}>
                  ↑
                </Button>
                <Button
                  onClick={() => move(index, 1)}
                  disabled={index === steps.length - 1}
                >
                  ↓
                </Button>
                <Button
                  onClick={() =>
                    setSteps((current) =>
                      current.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </ToolPanel>
        <div>
          <ToolPanel
            title="Input"
            actions={
              <Button
                variant="primary"
                onClick={() => void run()}
                disabled={!steps.length}
              >
                Run pipeline
              </Button>
            }
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </ToolPanel>
          <ToolPanel title="Output" actions={<CopyButton value={output} />}>
            <textarea value={output} readOnly />
          </ToolPanel>
        </div>
      </div>
      <ErrorNotice message={error} />
    </>
  );
}
